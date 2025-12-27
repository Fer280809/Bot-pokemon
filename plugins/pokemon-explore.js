import gameEngine from '../lib/gameEngine.js'
import battleSystem from '../lib/battleEngine.js'
import userDB from '../lib/userDatabase.js'

if (!global.pokemonSess) global.pokemonSess = {}

let handler = async (m, { conn, text, usedPrefix, command, isBotAdmin }) => {
    let user = await userDB.getUser(m.sender)
    let battle = Array.from(battleSystem.activeBattles.values()).find(b => b.playerId === m.sender)
    
    // Verificar batalla en otro chat
    if (battle && battle.chatId !== m.chat) {
        return m.reply(`⚠️ Ya estás en batalla en otro chat. Usa *.endbattle* para terminarla.`)
    }
    
    // Limpiar sesiones expiradas
    const sess = global.pokemonSess[m.sender]
    if (sess && Date.now() - sess.timestamp > 300000) {
        delete global.pokemonSess[m.sender]
        if (battle) battleSystem.activeBattles.delete(battle.id)
        battle = null
    }

    // --- 1. INICIAR NUEVA BATALLA ---
    if (!battle) {
        const encounter = await gameEngine.exploreLocation(m.sender)
        if (!encounter.success) {
            return m.reply(`🍃 Has explorado pero no encontraste nada... (Suerte: ${encounter.currentChance}%)`)
        }
        
        battle = await battleSystem.startBattle(m.sender, encounter)
        battle.chatId = m.chat // Guardar chat actual
        global.pokemonSess[m.sender] = { 
            view: 'MAIN', 
            timestamp: Date.now(),
            userData: user
        }
        return renderUI(conn, m, battle)
    }

    // --- 2. BATALLA ACTIVA ---
    let input = text?.trim().toLowerCase()
    let currentSess = global.pokemonSess[m.sender]
    
    // Actualizar timestamp
    currentSess.timestamp = Date.now()

    // Limpiar mensaje anterior solo si somos admin
    if (currentSess.lastMsg && m.isGroup && isBotAdmin) {
        try {
            await conn.sendMessage(m.chat, { 
                delete: { 
                    remoteJid: m.chat, 
                    fromMe: true, 
                    id: currentSess.lastMsg 
                } 
            })
        } catch (e) {}
    }

    // NAVEGACIÓN POR MENÚS
    switch (currentSess.view) {
        case 'MAIN':
            if (input === '1') { 
                currentSess.view = 'ATTACKS'; 
                return renderUI(conn, m, battle) 
            }
            if (input === '2') { 
                currentSess.view = 'BAG'; 
                return renderUI(conn, m, battle) 
            }
            if (input === '3') { 
                currentSess.view = 'TEAM'; 
                return renderUI(conn, m, battle) 
            }
            if (input === '4') {
                battleSystem.activeBattles.delete(battle.id)
                delete global.pokemonSess[m.sender]
                return m.reply('🏃 Has escapado del combate.')
            }
            break;

        case 'ATTACKS':
            if (input === '5' || input === 'v' || input === 'volver') { 
                currentSess.view = 'MAIN'; 
                return renderUI(conn, m, battle) 
            }
            let moveIdx = parseInt(input) - 1
            if (moveIdx >= 0 && moveIdx < 4) {
                const res = await battleSystem.executeTurn(battle.id, { type: 'move', moveIndex: moveIdx })
                currentSess.view = 'MAIN'
                return renderUI(conn, m, res.battle)
            }
            break;

        case 'BAG':
            if (input === '5' || input === 'v') { 
                currentSess.view = 'MAIN'; 
                return renderUI(conn, m, battle) 
            }
            if (input === '1' && user.inventory.pokeball > 0) {
                const res = await battleSystem.executeTurn(battle.id, { type: 'item', itemId: 'pokeball' })
                currentSess.view = 'MAIN'
                return renderUI(conn, m, res.battle)
            }
            break;

        case 'TEAM':
            if (input === '5' || input === 'v') { 
                currentSess.view = 'MAIN'; 
                return renderUI(conn, m, battle) 
            }
            let pkIdx = parseInt(input) - 1
            if (pkIdx >= 0 && pkIdx < user.team.length) {
                const res = await battleSystem.executeTurn(battle.id, { type: 'switch', pokemonIndex: pkIdx })
                currentSess.view = 'MAIN'
                return renderUI(conn, m, res.battle)
            }
            break;
    }

    // Si input inválido, refrescar
    return renderUI(conn, m, battle)
}

async function renderUI(conn, m, battle) {
    const sess = global.pokemonSess[m.sender]
    if (!sess) return
    
    // Cache de datos de usuario
    let user = sess.userData
    if (!user || Date.now() - sess.lastUserUpdate > 60000) {
        user = await userDB.getUser(m.sender)
        sess.userData = user
        sess.lastUserUpdate = Date.now()
    }
    
    const playerPk = battle.playerPokemon
    const enemyPk = battle.wildPokemon || battle.opponentPokemon
    
    // Encabezado
    let header = `⚔️ *COMBATE POKÉMON* ⚔️\n`
    header += `╔══════════════════════╗\n`
    header += `║ 🔴 ${enemyPk.name.toUpperCase()} Lv.${enemyPk.level}\n`
    header += `║ ${drawBar(enemyPk.hp, enemyPk.maxHp)} ${enemyPk.hp}/${enemyPk.maxHp}HP\n`
    header += `╠══════════════════════╣\n`
    header += `║ 🔵 ${playerPk.name.toUpperCase()} Lv.${playerPk.level}\n`
    header += `║ ${drawBar(playerPk.hp, playerPk.maxHp)} ${playerPk.hp}/${playerPk.maxHp}HP\n`
    header += `╚══════════════════════╝\n\n`

    let body = '', footer = ''

    if (sess.view === 'MAIN') {
        body = `💬 ${battle.log[battle.log.length - 1] || '¿Qué debe hacer ' + playerPk.name + '?'}\n\n`
        body += `1️⃣ ATACAR • 2️⃣ MOCHILA\n`
        body += `3️⃣ EQUIPO • 4️⃣ HUIR\n`
        footer = `📝 Escribe el número`
    } 
    else if (sess.view === 'ATTACKS') {
        body = `💥 *ATAQUES DISPONIBLES:*\n`
        playerPk.moves.forEach((move, i) => {
            body += `${i + 1}. ${move.name} ${move.pp ? `[${move.pp}]` : ''}\n`
        })
        body += `5. 🔙 VOLVER\n`
        footer = `⚡ Selecciona 1-4 para atacar`
    }
    else if (sess.view === 'BAG') {
        body = `🎒 *MOCHILA:*\n`
        const inv = user.inventory || {}
        body += `1. 🔴 Poké Ball: x${inv.pokeball || 0}\n`
        body += `2. 🧪 Poción: x${inv.potion || 0}\n`
        body += `3. ⚡ Revivir: x${inv.revive || 0}\n`
        body += `4. ✨ Ultra Ball: x${inv.ultraball || 0}\n`
        body += `5. 🔙 VOLVER\n`
        footer = `🎯 Usa 1-4 para usar item`
    }
    else if (sess.view === 'TEAM') {
        body = `👥 *EQUIPO (${user.team.length}/6):*\n`
        user.team.forEach((pk, i) => {
            const status = pk.hp <= 0 ? '💀' : pk.hp < pk.maxHp * 0.3 ? '⚠️' : '✅'
            body += `${i + 1}. ${status} ${pk.name} Lv.${pk.level} [${pk.hp}/${pk.maxHp}HP]\n`
        })
        body += `5. 🔙 VOLVER\n`
        footer = `🔄 Escribe 1-${Math.min(6, user.team.length)} para cambiar`
    }

    // Fin de batalla
    if (['finished', 'won', 'lost'].includes(battle.state)) {
        delete global.pokemonSess[m.sender]
        battleSystem.activeBattles.delete(battle.id)
        
        header = `🏁 *BATALLA TERMINADA*\n`
        body = `📊 Resultado: ${battle.state === 'won' ? '🏆 VICTORIA' : '💔 DERROTA'}\n`
        body += battle.log.slice(-3).join('\n')
        footer = `\n🎮 Usa *.explore* para buscar otra batalla`
    }

    const msg = await conn.reply(m.chat, header + body + '\n' + footer, m)
    sess.lastMsg = msg.key.id
    return msg
}

function drawBar(cur, max) {
    const width = 10
    const perc = Math.max(0, Math.min(width, Math.round((cur / max) * width)))
    if (perc >= 8) return '🟩'.repeat(perc) + '⬜'.repeat(width - perc)
    if (perc >= 4) return '🟨'.repeat(perc) + '⬜'.repeat(width - perc)
    return '🟥'.repeat(perc) + '⬜'.repeat(width - perc)
}

handler.command = ['explore', 'hunt', 'explorar', 'pk', 'atacar']
handler.tags = ['rpg', 'games']
handler.help = ['explore', 'hunt', 'explorar', 'pk', 'atacar'].map(cmd => 
    `${cmd} - Inicia/continúa una batalla Pokémon`
)

export default handler
