// explore.js - Comando de inicio de aventura Pokémon
import { pokemons, utils } from '../lib/databasepokemon.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        // Obtener usuario de la base de datos global (ajusta según tu estructura)
        let user = global.db.data.users[m.sender] || {}
        
        // 1. Validar si ya tiene un equipo (Evita trampas)
        if (user.team && user.team.length > 0) {
            return m.reply('❌ Ya eres un entrenador Pokémon. ¡Tu aventura ya comenzó!')
        }

        // 2. Menú de selección si no hay texto
        if (!text || !['1','2','3','4'].includes(text.trim())) {
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
            msg += `👉 *Usa:* \`${usedPrefix + command} [número]\` para elegir.\n`
            msg += `👉 *Ejemplo:* \`${usedPrefix + command} 1\``
            return m.reply(msg)
        }

        // 3. Lógica de asignación
        const starters = { 
            '1': { id: 1, name: 'Bulbasaur' }, 
            '2': { id: 4, name: 'Charmander' }, 
            '3': { id: 7, name: 'Squirtle' }, 
            '4': { id: 25, name: 'Pikachu' }
        }
        
        const selected = starters[text]
        if (!selected) return m.reply('❌ Opción no válida. Usa 1, 2, 3 o 4.')

        // Verificar que el Pokémon existe en la base de datos
        const pokemonData = pokemons[selected.id]
        if (!pokemonData) {
            return m.reply('❌ Error: Pokémon no encontrado en la base de datos.')
        }

        // Generar stats para nivel 5
        const ivs = utils.generateIVs ? utils.generateIVs() : Array(6).fill(15) // Valores por defecto si no existe
        const stats = utils.calculateStats ? 
            utils.calculateStats(pokemonData.stats, 5, ivs) : 
            { hp: 20, attack: 10, defense: 10, spAttack: 10, spDefense: 10, speed: 10 } // Valores por defecto

        const starter = {
            speciesId: selected.id,
            name: pokemonData.name,
            nickname: pokemonData.name,
            level: 5,
            hp: stats.hp || 20,
            maxHp: stats.hp || 20,
            stats: stats,
            moves: pokemonData.moves ? pokemonData.moves.slice(0, 2) : ['tackle', 'growl'],
            xp: 0,
            xpToNextLevel: 100,
            status: 'normal',
            caughtDate: new Date().toISOString()
        }

        // 4. Actualizar Base de Datos del usuario
        user.team = [starter]
        user.inventory = { 
            pokeball: 5, 
            potion: 1,
            berries: 0,
            revive: 0
        }
        user.currency = { 
            money: 500,
            coins: 0 
        }
        user.pokemonProgress = { 
            location: 'pueblo_paleta', 
            badges: [],
            pokedex: [selected.id],
            battlesWon: 0,
            pokemonCaught: 0
        }
        
        // Guardar en la base de datos global
        global.db.data.users[m.sender] = user
        await global.db.write().catch(() => {})

        // 5. Mensaje de éxito con imagen
        let success = `✨ *¡EXCELENTE ELECCIÓN!* ✨\n\n`
        success += `¡Felicidades ${m.pushName || 'entrenador'}!\n`
        success += `Has recibido a *${starter.name}* nivel 5.\n`
        success += `❤️ *HP:* ${starter.hp}/${starter.maxHp}\n`
        success += `🎒 *Mochila:* 5x Pokéballs y 1x Poción.\n`
        success += `💰 *Dinero:* $500.\n\n`
        success += `📍 Estás en *Pueblo Paleta*.\n`
        success += `📋 *Comandos disponibles:*\n`
        success += `• ${usedPrefix}map - Ver mapa\n`
        success += `• ${usedPrefix}team - Ver tu equipo\n`
        success += `• ${usedPrefix}bag - Ver mochila\n`
        success += `• ${usedPrefix}explore - Buscar Pokémon salvajes\n\n`
        success += `*¡Que comience tu aventura!* 🎮`

        // Intentar enviar con imagen si existe
        try {
            // Puedes agregar una imagen del Pokémon si tienes
            // await conn.sendFile(m.chat, pokemonData.image, 'pokemon.jpg', success, m)
            await m.reply(success)
        } catch (e) {
            await m.reply(success)
        }

    } catch (error) {
        console.error('Error en comando explore:', error)
        await m.reply('❌ Ocurrió un error al iniciar la aventura. Intenta nuevamente.')
    }
}

handler.help = ['explore', 'pk', 'start']
handler.tags = ['pokemon', 'rpg']
handler.command = ['pk', 'comenzar', 'startpokemon']
handler.group = true

export default handler
