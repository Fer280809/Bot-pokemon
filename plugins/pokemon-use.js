import userDB from '../lib/userDatabase.js'
import itemsDB from '../lib/items.json' assert { type: 'json' }

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = await userDB.getUser(m.sender)
    
    // 1. Validar entrada: .use pocion 1 (objeto y posición en el equipo)
    let [itemName, targetIdx] = text.split(' ')
    if (!itemName) return m.reply(`💡 *Modo de uso:* \`${usedPrefix + command} [nombre_item] [numero_pokemon]\`\nEjemplo: \`${usedPrefix + command} potion 1\``)

    itemName = itemName.toLowerCase()
    let pokemonIdx = (parseInt(targetIdx) - 1) || 0 // Por defecto el primer Pokémon
    let pk = user.team[pokemonIdx]

    if (!pk) return m.reply('❌ No tienes ese Pokémon en tu equipo.')
    if (!user.inventory[itemName] || user.inventory[itemName] <= 0) {
        return m.reply(`❌ No tienes *${itemName}* en tu mochila.`)
    }

    // 2. Definir efectos de los objetos (basado en nombres comunes)
    let healAmount = 0
    let isCure = false
    let itemNameClean = ''

    if (itemName.includes('potion')) {
        itemNameClean = 'Poción'
        healAmount = 20
        if (itemName.includes('super')) { healAmount = 50; itemNameClean = 'Superpoción' }
        if (itemName.includes('hyper')) { healAmount = 200; itemNameClean = 'Hiperpoción' }
        if (itemName.includes('max')) { healAmount = 999; itemNameClean = 'Poción Máxima' }
    } else if (itemName.includes('antidote') || itemName.includes('heal')) {
        isCure = true
        itemNameClean = 'Antídoto/Cura'
    } else {
        return m.reply('❌ Este objeto no se puede usar directamente desde la mochila o no tiene efecto de curación.')
    }

    // 3. Aplicar efecto
    if (healAmount > 0) {
        if (pk.hp >= pk.maxHp) return m.reply(`😊 *${pk.name}* ya tiene la vida al máximo.`)
        
        let oldHp = pk.hp
        pk.hp = Math.min(pk.maxHp, pk.hp + healAmount)
        let recovered = pk.hp - oldHp
        
        // Descontar de inventario
        user.inventory[itemName] -= 1
        await userDB.saveUser(m.sender)

        let msg = `✨ *¡OBJETO USADO!* ✨\n`
        msg += `╔══════════════════════╗\n`
        msg += `║ Usaste: ${itemNameClean}\n`
        msg += `║ Objetivo: ${pk.name}\n`
        msg += `║ Recuperado: +${recovered} HP\n`
        msg += `╠══════════════════════╣\n`
        msg += `║ Vida actual: ${pk.hp}/${pk.maxHp}\n`
        msg += `╚══════════════════════╝`
        return conn.reply(m.chat, msg, m)
    }

    if (isCure) {
        // Aquí podrías resetear estados como 'poison', 'burn', etc.
        pk.status = 'normal'
        user.inventory[itemName] -= 1
        await userDB.saveUser(m.sender)
        return m.reply(`✨ Usaste ${itemNameClean} en *${pk.name}*. ¡Ahora se siente mucho mejor!`)
    }
}

handler.command = /^(use|usar)$/i
export default handler
