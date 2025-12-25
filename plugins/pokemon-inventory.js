import userDB from '../lib/userDatabase.js'
import itemsDB from '../lib/items.json' assert { type: 'json' }

let handler = async (m, { conn, usedPrefix }) => {
    let user = await userDB.getUser(m.sender)
    let inv = user.inventory || {}
    
    let txt = `🎒 *MOCHILA DE ENTRENADOR* 🎒\n`
    txt += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    txt += `💰 *Saldo:* $${user.currency?.money || 0}\n\n`

    // Categoría: Poké Balls
    let balls = Object.keys(inv).filter(id => id.includes('ball'))
    if (balls.length > 0) {
        txt += `🔴 *POKÉ BALLS:*\n`
        balls.forEach(id => {
            txt += ` ▪️ ${id.toUpperCase()}: x${inv[id]}\n`
        })
        txt += `\n`
    }

    // Categoría: Pociones y Estados
    let healing = Object.keys(inv).filter(id => id.includes('potion') || id.includes('heal') || id.includes('antidote'))
    if (healing.length > 0) {
        txt += `🧪 *CURACIÓN:*\n`
        healing.forEach(id => {
            txt += ` ▪️ ${id.charAt(0).toUpperCase() + id.slice(1)}: x${inv[id]}\n`
        })
        txt += `\n`
    }

    // Categoría: Objetos Clave / Medallas
    let badges = user.progress?.badges || []
    if (badges.length > 0) {
        txt += `🏅 *MEDALLAS:*\n`
        badges.forEach(id => {
            let item = itemsDB.items.medals[id] || { name: id }
            txt += ` 💠 ${item.name}\n`
        })
    }

    if (Object.keys(inv).length === 0) txt += `_Tu mochila está vacía..._`

    txt += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    txt += `💡 *Usa:* \`.use [item]\` para consumir.`
    
    await conn.reply(m.chat, txt, m)
}

handler.command = /^(inv|mochila|inventario)$/i
export default handler
