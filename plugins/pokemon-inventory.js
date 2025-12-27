import userDB from '../lib/userDatabase.js'
import itemsDB from '../lib/items.json' assert { type: 'json' }

let handler = async (m, { conn, usedPrefix }) => {
    let user = await userDB.getUser(m.sender)
    let inv = user.inventory || {}
    let money = user.currency?.money || 0

    let txt = `🎒 *MOCHILA DE ENTRENADOR* 🎒\n`
    txt += `╔══════════════════════╗\n`
    txt += `║ 💰 *DINERO:* $${money.toLocaleString().padEnd(10)} ║\n`
    txt += `╚══════════════════════╝\n\n`

    // Definimos las categorías exactas según tu items.json
    const categories = [
        { name: '🔴 POKÉ BALLS', pattern: ['pokeball', 'greatball', 'ultraball', 'masterball', 'safariball'] },
        { name: '🧪 CURACIÓN', pattern: ['potion', 'superpotion', 'hyperpotion', 'maxpotion', 'fullrestore'] },
        { name: '💊 ESTADOS', pattern: ['antidote', 'burnheal', 'iceheal', 'awakening', 'paralyzeheal', 'fullheal'] },
        { name: '✨ ESPECIALES', pattern: ['rare_candy', 'ether', 'elixir', 'revive', 'max_revive'] }
    ]

    let totalItems = 0
    
    categories.forEach(cat => {
        // Filtramos items que el usuario tiene y pertenecen a esta categoría
        let itemsInCat = Object.keys(inv).filter(id => cat.pattern.includes(id) && inv[id] > 0)
        
        if (itemsInCat.length > 0) {
            txt += `┏━━〔 ${cat.name} 〕━━┓\n`
            itemsInCat.forEach(id => {
                totalItems++
                // Buscamos el nombre bonito en el JSON, si no, usamos el ID
                let itemData = itemsDB.items.pokemart_elite.items.includes(id) ? id.replace(/_/g, ' ') : id
                txt += `┃ 🔹 ${id.toUpperCase().padEnd(12)} x${inv[id]}\n`
            })
            txt += `┗━━━━━━━━━━━━━━━━━━━━┛\n\n`
        }
    })

    if (totalItems === 0) {
        txt += `_Tu mochila está vacía. ¡Ve a una tienda!_\n\n`
    }

    txt += `📋 *INSTRUCCIONES:*\n`
    txt += `Para usar un objeto escribe:\n`
    txt += `👉 \`${usedPrefix}use [ID] [N° POKÉMON]\`\n`
    txt += `Ej: \`${usedPrefix}use potion 1\``
    
    await conn.reply(m.chat, txt, m)
}

handler.command = ['inv'],['mochila'],['inventario']
export default handler
