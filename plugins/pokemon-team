import userDB from '../lib/userDatabase.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = await userDB.getUser(m.sender)
    let team = user.team || []

    if (team.length === 0) return m.reply('❌ No tienes un equipo. Usa .start')

    // Lógica de cambio de posición (.invpk 2)
    if (text && !isNaN(text)) {
        let i = parseInt(text) - 1
        if (i > 0 && i < team.length) {
            let temp = team[0]
            team[0] = team[i]
            team[i] = temp
            await userDB.saveUser(m.sender)
            return m.reply(`✅ *${team[0].name}* ahora es tu Pokémon principal.`)
        }
    }

    let txt = `👥 *GESTOR DE EQUIPO* 👥\n`
    txt += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`

    team.forEach((pk, i) => {
        let hpBar = drawBar(pk.hp, pk.maxHp)
        let xpBar = drawBar(pk.xp || 0, 100, '🟦') // Barra azul para XP
        
        txt += `${i === 0 ? '⭐' : '▪️'} *${i + 1}. ${pk.name.toUpperCase()}* [Lv. ${pk.level}]\n`
        txt += `   ❤️ HP: ${hpBar} ${pk.hp}/${pk.maxHp}\n`
        txt += `   🔷 XP: ${xpBar} ${pk.xp || 0}%\n`
        
        if (i === 0) { // Solo mostrar movimientos del principal para no saturar
            txt += `   ⚔️ *MOVIMIENTOS:* ${pk.moves.join(' | ')}\n`
        }
        txt += `\n`
    })

    txt += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    txt += `👉 Escribe \`${usedPrefix + command} [número]\` para cambiar al líder.\n`
    txt += `👉 Escribe \`.poke [número]\` para ver stats base.`
    
    await conn.reply(m.chat, txt, m)
}

function drawBar(cur, max, color = null) {
    let perc = Math.max(0, Math.min(10, Math.round((cur / max) * 10)))
    if (!color) {
        color = perc > 5 ? '🟩' : perc > 2 ? '🟧' : '🟥'
    }
    return color.repeat(perc) + '⬜'.repeat(10 - perc)
}

handler.command = /^(invpk|equipo|team)$/i
export default handler
