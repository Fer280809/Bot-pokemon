import pokemonDB from '../lib/databasepokemon.js'
import userDB from '../lib/userDatabase.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = await userDB.getUser(m.sender)
    
    // 1. Validar si ya tiene un equipo (Evita trampas)
    if (user.team && user.team.length > 0) {
        return m.reply('❌ Ya eres un entrenador Pokémon. ¡Tu aventura ya comenzó!')
    }

    // 2. Menú de selección si no hay texto
    if (!text || !['1','2','3','4'].includes(text)) {
        let msg = `🌟 *¡BIENVENIDO AL MUNDO POKÉMON!* 🌟\n`
        msg += `╔══════════════════════╗\n`
        msg += `║ Hola, soy el *Profesor Oak*. ║\n`
        msg += `║ Elige a tu compañero:     ║\n`
        msg += `╠══════════════════════╣\n`
        msg += `║ 1. 🌿 Bulbasaur          ║\n`
        msg += `║ 2. 🔥 Charmander         ║\n`
        msg += `║ 3. 💧 Squirtle           ║\n`
        msg += `║ 4. ⚡ Pikachu            ║\n`
        msg += `╚══════════════════════╝\n\n`
        msg += `👉 *Usa:* \`${usedPrefix + command} [número]\` para elegir.`
        return conn.reply(m.chat, msg, m)
    }

    // 3. Lógica de asignación
    const ids = { '1': 1, '2': 4, '3': 7, '4': 25 }
    const selectedId = ids[text]
    
    // Generamos el Pokémon con stats de nivel 5 desde tu DB
    const pokemonData = pokemonDB.pokemons[selectedId]
    const stats = pokemonDB.utils.calculateStats(pokemonData.stats, 5, pokemonDB.utils.generateIVs())
    
    const starter = {
        speciesId: selectedId,
        name: pokemonData.name,
        level: 5,
        hp: stats.hp,
        maxHp: stats.hp,
        stats: stats,
        moves: pokemonData.moves.slice(0, 2), // Empezar con 2 movimientos
        xp: 0,
        status: 'normal'
    }

    // 4. Actualizar Base de Datos
    user.team = [starter]
    user.inventory = { 'pokeball': 5, 'potion': 1 }
    user.currency = { money: 500 }
    user.progress = { 
        location: 'pueblo_paleta', 
        badges: [],
        pokedex: [selectedId]
    }
    
    await userDB.saveUser(m.sender)

    let success = `✨ *¡EXCELENTE ELECCIÓN!* ✨\n\n`
    success += `Has recibido a *${starter.name}* nivel 5.\n`
    success += `🎒 *Mochila:* 5x Pokéballs y 1x Poción.\n`
    success += `💰 *Dinero:* $500.\n\n`
    success += `📍 Estás en *Pueblo Paleta*. Usa *.map* para ver tus alrededores.`
    
    return conn.reply(m.chat, success, m)
}

handler.command = /^(start|pk|comenzar)$/i
export default handler
