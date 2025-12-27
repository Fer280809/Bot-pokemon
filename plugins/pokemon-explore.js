import gameEngine from '../lib/gameEngine.js'
import battleSystem from '../lib/battleEngine.js'
import userDB from '../lib/userDatabase.js'

// Objeto en memoria para rastrear en qué menú está cada usuario durante la batalla
// Esto evita saturar la base de datos con cambios de "pestaña"
if (!global.pokemonSess) global.pokemonSess = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = await userDB.getUser(m.sender)
    let battle = Array.from(battleSystem.activeBattles.values()).find(b => b.playerId === m.sender)
    
    // --- 1. LÓGICA SI NO HAY BATALLA (INICIAR) ---
    if (!battle) {
        const encounter = await gameEngine.exploreLocation(m.sender)
        if (!encounter.success) {
            return m.reply(`🍃 Has explorado pero no encontraste nada... (Suerte: ${encounter.currentChance}%)`)
        }
        
        // Iniciamos batalla
        battle = await battleSystem.startBattle(m.sender, encounter)
        global.pokemonSess[m.sender] = { view: 'MAIN', lastMsg: null }
        return renderUI(conn, m, battle)
    }

    // --- 2. LÓGICA DENTRO DE BATALLA ---
    let sess = global.pokemonSess[m.sender] || { view: 'MAIN', lastMsg: null }
    let input = text?.trim().toLowerCase()

    // Intentar borrar el mensaje anterior para limpiar el chat
    if (m.quoted && m.quoted.fromMe) {
        try { await conn.sendMessage(m.chat, { delete: m.quoted.vname ? m.quoted : { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } }) } catch (e) { console.log("Error al borrar:", e) }
    }

    // NAVEGACIÓN POR MENÚS
    switch (sess.view) {
        case 'MAIN':
            if (input === '1') { sess.view = 'ATTACKS'; return renderUI(conn, m, battle) }
            if (input === '2') { sess.view = 'BAG'; return renderUI(conn, m, battle) }
            if (input === '3') { sess.view = 'TEAM'; return renderUI(conn, m, battle) }
            if (input === '4') {
                battleSystem.activeBattles.delete(battle.id)
                delete global.pokemonSess[m.sender]
                return m.reply('🏃 Has escapado del combate.')
            }
            break;

        case 'ATTACKS':
            if (input === '5' || input === 'v' || input === 'volver') { sess.view = 'MAIN'; return renderUI(conn, m, battle) }
            let moveIdx = parseInt(input) - 1
            if (moveIdx >= 0 && moveIdx < 4) {
                const res = await battleSystem.executeTurn(battle.id, { type: 'move', moveIndex: moveIdx })
                sess.view = 'MAIN' // Volver al principal tras atacar
                return renderUI(conn, m, res.battle)
            }
            break;

        case 'BAG':
            if (input === '5' || input === 'v') { sess.view = 'MAIN'; return renderUI(conn, m, battle) }
            // Ejemplo de uso de item (puedes expandir según tu items.json)
            if (input === '1' && user.inventory.pokeball > 0) {
                const res = await battleSystem.executeTurn(battle.id, { type: 'item', itemId: 'pokeball' })
                sess.view = 'MAIN'
                return renderUI(conn, m, res.battle)
            }
            break;

        case 'TEAM':
            if (input === '5' || input === 'v') { sess.view = 'MAIN'; return renderUI(conn, m, battle) }
            // Cambio de Pokémon
            let pkIdx = parseInt(input) - 1
            if (pkIdx >= 0 && pkIdx < user.team.length) {
                const res = await battleSystem.executeTurn(battle.id, { type: 'switch', pokemonIndex: pkIdx })
                sess.view = 'MAIN'
                return renderUI(conn, m, res.battle)
            }
            break;
    }

    // Si el usuario escribe algo inválido, refrescamos el menú actual
    return renderUI(conn, m, battle)
}

// --- FUNCIÓN MAESTRA DE RENDERIZADO ---
async function renderUI(conn, m, battle) {
    const sess = global.pokemonSess[m.sender]
    const user = await userDB.getUser(m.sender)
    const playerPk = battle.playerPokemon
    const enemyPk = battle.wildPokemon || battle.opponentPokemon
    
    // Encabezado de HP (Siempre visible)
    let header = `⚔️ *COMBATE POKÉMON* ⚔️\n`
    header += `╔══════════════════════╗\n`
    header += `║ 🔴 *${enemyPk.name.toUpperCase()}* [Lv. ${enemyPk.level}]\n`
    header += `║ HP: ${drawBar(enemyPk.hp, enemyPk.maxHp)} ${enemyPk.hp}\n`
    header += `╠══════════════════════╣\n`
    header += `║ 🔵 *${playerPk.name.toUpperCase()}* [Lv. ${playerPk.level}]\n`
    header += `║ HP: ${drawBar(playerPk.hp, playerPk.maxHp)} ${playerPk.hp}\n`
    header += `╚══════════════════════╝\n\n`

    let body = ''
    let footer = ''

    if (sess.view === 'MAIN') {
        body = `💬 _${battle.log[battle.log.length - 1] || '¿Qué debe hacer ' + playerPk.name + '?'}_ \n\n`
        body += `1️⃣ *ATACAR* 2️⃣ *MOCHILA*\n`
        body += `3️⃣ *EQUIPO* 4️⃣ *HUIR*\n`
        footer = `💡 _Escribe el número de tu opción_`
    } 
    
    else if (sess.view === 'ATTACKS') {
        body = `💥 *ELIGE UN MOVIMIENTO:*\n`
        playerPk.moves.forEach((m, i) => {
            body += `${i + 1}. ${m.name || m}\n`
        })
        body += `5. 🔙 *VOLVER*\n`
        footer = `💡 _Usa .explore [1-4]_`
    } 
    
    else if (sess.view === 'BAG') {
        const inv = user.inventory || {}
        body = `🎒 *TU MOCHILA:*\n`
        body += `1. 🔴 Poké Ball: x${inv.pokeball || 0}\n`
        body += `2. 🧪 Poción: x${inv.potion || 0}\n`
        body += `3. ✨ Superball: x${inv.greatball || 0}\n`
        body += `5. 🔙 *VOLVER*\n`
        footer = `💡 _Usa .explore [número] para usar_`
    } 
    
    else if (sess.view === 'TEAM') {
        body = `👥 *TU EQUIPO:*\n`
        user.team.forEach((pk, i) => {
            body += `${i + 1}. ${pk.name} [${pk.hp}/${pk.maxHp} HP] ${i === 0 ? '(En combate)' : ''}\n`
        })
        body += `5. 🔙 *VOLVER*\n`
        footer = `💡 _Escribe el número para cambiar Pokémon_`
    }

    // Si la batalla terminó, limpiar sesión
    if (battle.state === 'finished' || battle.state === 'won' || battle.state === 'lost') {
        delete global.pokemonSess[m.sender]
        header = `🏁 *FIN DEL COMBATE*\n`
        body = `📝 ${battle.log.join('\n')}`
        footer = `\nUse *.map* para continuar.`
    }

    return conn.reply(m.chat, header + body + '\n' + footer, m)
}

// Generador de barras dinámicas por color
function drawBar(cur, max) {
    const perc = Math.max(0, Math.min(10, Math.round((cur / max) * 10)))
    let color = perc > 5 ? '🟩' : perc > 2 ? '🟧' : '🟥'
    return color.repeat(perc) + '⬜'.repeat(10 - perc)
}

handler.command = ['explore', 'hunt', 'explorar', 'pk', 'atakar']
export default handler
