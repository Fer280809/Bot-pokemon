import userDB from '../lib/userDatabase.js'

let handler = async (m, { conn, usedPrefix }) => {
    let user = await userDB.getUser(m.sender)
    let inv = user.inventory || {}
    let money = user.currency?.money || 0

    let txt = `🎒 *MOCHILA DE ENTRENADOR* 🎒\n`
    txt += `╔══════════════════════╗\n`
    txt += `║ 💰 Saldo: $${money.toLocaleString().padEnd(12)} ║\n`
    txt += `╚══════════════════════╝\n\n`

    const categories = [
        { name: '🔴 POKÉ BALLS', filter: (id) => id.includes('ball') },
        { name: '🧪 BOTIQUÍN', filter: (id) => id.includes('potion') || id.includes('antidote') || id.includes('heal') },
        { name: '✨ OBJETOS ESPECIALES', filter: (id) => !id.includes('ball') && !id.includes('potion') && !id.includes('badge') && !id.includes('heal') && !id.includes('antidote') }
    ]

    let hasItems = false
    categories.forEach(cat => {
        let items = Object.keys(inv).filter(cat.filter).filter(id => inv[id] > 0)
        if (items.length > 0) {
            hasItems = true
            txt += `【 ${cat.name} 】\n`
            items.forEach(id => {
                let name = id.replace(/_/g, ' ').toUpperCase()
                txt += ` ▪️ ${name.padEnd(15)} x${inv[id]}\n`
            })
            txt += `\n`
        }
    })

    if (!hasItems) txt += `_Tu mochila está completamente vacía..._\n\n`

    txt += `╔══════════════════════╗\n`
    txt += `║ 💡 Usa: .use [nombre]  ║\n`
    txt += `╚══════════════════════╝`
    
    await conn.reply(m.chat, txt, m)
}

handler.command = /^(inv|mochila|inventario)$/i
export default handler
