import userDB from '../lib/userDatabase.js'
import pokemonDB from '../lib/databasepokemon.js'

let handler = async (m, { conn }) => {
    let user = await userDB.getUser(m.sender)
    
    // Si el usuario no ha iniciado su aventura
    if (!user.team || user.team.length === 0) {
        return m.reply('❌ No tienes un perfil de entrenador activo. ¡Usa .start para comenzar!')
    }

    // Datos del usuario
    const name = m.pushName || 'Entrenador'
    const money = user.currency?.money || 0
    const caught = user.progress?.pokedex?.length || 0
    const seen = user.progress?.pokedex_seen?.length || caught // Si no llevas registro de vistos, usamos capturados
    const badges = user.progress?.badges || []

    // Configuración de Medallas de Kanto (ID de medalla -> Emoji)
    // He mapeado las 8 medallas clásicas de Kanto
    const kantoBadges = [
        { id: 'badge_boulder', emoji: '🎖️' }, // Roca
        { id: 'badge_cascade', emoji: '🏅' }, // Cascada
        { id: 'badge_thunder', emoji: '🥇' }, // Trueno
        { id: 'badge_rainbow', emoji: '🥈' }, // Arcoiris
        { id: 'badge_soul', emoji: '🥉' },    // Alma
        { id: 'badge_marsh', emoji: '💎' },   // Pantano
        { id: 'badge_volcano', emoji: '🔥' }, // Volcán
        { id: 'badge_earth', emoji: '🌍' }    // Tierra
    ]

    // Construcción de la línea de medallas
    let badgeLine = kantoBadges.map(b => badges.includes(b.id) ? b.emoji : '✖️').join(' ')

    let profile = `👤 *PERFIL DE ENTRENADOR* 👤\n`
    profile += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    profile += `📝 *Nombre:* ${name}\n`
    profile += `💰 *Dinero:* $${money.toLocaleString()}\n`
    profile += `📍 *Ubicación actual:* ${user.progress.location.replace('_', ' ').toUpperCase()}\n`
    profile += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    
    profile += `📊 *ESTADÍSTICAS POKÉDEX*\n`
    profile += `✅ *Capturados:* ${caught}\n`
    profile += `👁️ *Avistados:* ${seen}\n`
    profile += `⭐ *Equipo:* ${user.team.length} / 6\n`
    profile += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    
    profile += `🏅 *ESTUCHE DE MEDALLAS*\n`
    profile += `${badgeLine}\n`
    profile += `￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣\n`
    
    // Pie con el Pokémon principal
    if (user.team[0]) {
        profile += `✨ *Compañero actual:* ${user.team[0].name} (Nivel ${user.team[0].level})`
    }

    await conn.reply(m.chat, profile, m)
}

handler.command = /^(profile|perfil|entrenador)$/i
export default handler
