import gameEngine from '../lib/gameEngine.js'
import userDB from '../lib/userDatabase.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const mapData = await gameEngine.getConnectedLocations(m.sender)
    if (!mapData.success) return m.reply(`❌ Error: ${mapData.error}`)

    const { current, connected } = mapData

    // --- LÓGICA DE VIAJE ---
    if (text) {
        const index = parseInt(text) - 1
        if (connected[index]) {
            const dest = connected[index]
            if (!dest.accessible) {
                return m.reply(`🔒 *ACCESO BLOQUEADO*\n\nNecesitas: ${dest.requirement}`)
            }
            
            // Actualizar ubicación en DB
            const user = await userDB.getUser(m.sender)
            user.progress.location = dest.id
            await userDB.saveUser(m.sender)
            
            // Recursividad para mostrar el nuevo mapa después de viajar
            return handler(m, { conn, text: '', usedPrefix, command })
        }
    }

    // --- DISEÑO DE LA UI ---
    let ui = `📍 *ESTÁS EN: ${current.name.toUpperCase()}*\n`
    ui += `╔══════════════════════╗\n`
    ui += `║ ${current.description.match(/.{1,20}/g).join('\n║ ')}\n`
    ui += `╚══════════════════════╝\n\n`
    
    ui += `🛤️ *CONEXIONES DISPONIBLES:*\n`
    connected.forEach((loc, i) => {
        const icon = loc.type === 'town' ? '🏘️' : loc.type === 'route' ? '🛣️' : '⛰️'
        const lock = loc.accessible ? '✅' : '🔒'
        ui += `${i + 1}. ${lock} ${icon} *${loc.name}*\n`
    })

    ui += `\n✈️ *PARA VIAJAR:* \`${usedPrefix + command} [número]\`\n`
    ui += `🔎 *PARA EXPLORAR:* \`.explore\``
    
    return conn.reply(m.chat, ui, m)
}

handler.command = /^(map|mapa|viajar|ir)$/i
export default handler
