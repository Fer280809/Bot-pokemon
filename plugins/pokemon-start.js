// pokemon-start.js - Comando de inicio de aventura Pokémon
import { pokemons, utils } from '../lib/databasepokemon.js'

let handler = async (m, { 
    conn, 
    text, 
    usedPrefix, 
    command, 
    user, 
    pokemonAvailable, 
    isPokemonCommand,
    setPokemonCooldown 
}) => {
    
    // Verificar si el sistema Pokémon está disponible
    if (!pokemonAvailable) {
        return m.reply('❌ El sistema Pokémon no está disponible en este momento. Intenta más tarde.')
    }

    try {
        // Obtener usuario de la base de datos
        let userData = global.db.data.users[m.sender]
        
        // Verificar si ya tiene un Pokémon inicial
        if (userData.pokemon && userData.pokemon.starters && userData.pokemon.starters.length > 0) {
            return m.reply('❌ Ya eres un entrenador Pokémon. ¡Tu aventura ya comenzó!')
        }

        // Menú de selección si no hay texto
        if (!text || !['1','2','3','4'].includes(text.trim())) {
            let msg = `🌟 *¡BIENVENIDO AL MUNDO POKÉMON!* 🌟\n\n`
            msg += `Hola, soy el *Profesor Oak*.\n`
            msg += `Elige a tu primer Pokémon:\n\n`
            msg += `1. 🌿 *Bulbasaur* (Planta/Veneno)\n`
            msg += `2. 🔥 *Charmander* (Fuego)\n`
            msg += `3. 💧 *Squirtle* (Agua)\n`
            msg += `4. ⚡ *Pikachu* (Eléctrico)\n\n`
            msg += `*Ejemplo:* ${usedPrefix}${command} 2`
            return m.reply(msg)
        }

        // Asignar Pokémon según elección
        const starters = { 
            '1': { id: 1, name: 'Bulbasaur', type: 'Planta/Veneno' }, 
            '2': { id: 4, name: 'Charmander', type: 'Fuego' }, 
            '3': { id: 7, name: 'Squirtle', type: 'Agua' }, 
            '4': { id: 25, name: 'Pikachu', type: 'Eléctrico' }
        }
        
        const selected = starters[text]
        if (!selected) return m.reply('❌ Opción no válida. Usa 1, 2, 3 o 4.')

        // Verificar que el Pokémon existe en la base de datos
        const pokemonData = pokemons[selected.id]
        if (!pokemonData) {
            return m.reply('❌ Error: Pokémon no encontrado en la base de datos.')
        }

        // Generar stats para nivel 5
        const ivs = utils.generateIVs ? utils.generateIVs() : Array(6).fill(15)
        const stats = utils.calculateStats ? 
            utils.calculateStats(pokemonData.stats, 5, ivs) : 
            { hp: 20, attack: 10, defense: 10, spAttack: 10, spDefense: 10, speed: 10 }

        const starter = {
            id: selected.id,
            name: pokemonData.name,
            nickname: pokemonData.name,
            level: 5,
            currentHp: stats.hp || 20,
            maxHp: stats.hp || 20,
            stats: stats,
            moves: pokemonData.moves ? pokemonData.moves.slice(0, 2) : ['placaje', 'gruñido'],
            xp: 0,
            xpToNext: 100,
            type: selected.type,
            ivs: ivs,
            evs: Array(6).fill(0),
            caughtAt: new Date().toISOString()
        }

        // Inicializar datos Pokémon si no existen
        if (!userData.pokemon) {
            userData.pokemon = {
                trainerId: Date.now().toString(36) + Math.random().toString(36).substr(2),
                starters: [],
                team: [],
                pc: [],
                pokedex: [],
                badges: [],
                money: 1000,
                items: {
                    pokeballs: { normal: 5, great: 0, ultra: 0 },
                    potions: { normal: 3, super: 0, hyper: 0 },
                    revives: 0,
                    berries: []
                },
                location: "pueblo_paleta",
                battles: { wins: 0, losses: 0, catches: 0 },
                lastActive: Date.now(),
                isBattling: false,
                battleId: null,
                cooldowns: {}
            }
        }

        // Asignar el Pokémon inicial
        userData.pokemon.starters = [selected.id]
        userData.pokemon.team = [starter]
        userData.pokemon.pokedex = [selected.id]
        userData.pokemon.money = 1000
        userData.pokemon.location = "pueblo_paleta"

        // Guardar cambios
        global.db.write()

        // Mensaje de éxito
        let success = `🎉 *¡FELICIDADES, ${m.pushName || 'entrenador'}!*\n\n`
        success += `Has elegido a *${starter.name}* (${selected.type}) como tu Pokémon inicial.\n`
        success += `📊 *Nivel:* 5\n`
        success += `❤️ *HP:* ${starter.currentHp}/${starter.maxHp}\n`
        success += `💰 *Dinero:* $${userData.pokemon.money}\n`
        success += `📍 *Ubicación:* Pueblo Paleta\n\n`
        success += `🎒 *Recibiste:*\n`
        success += `• 5x Pokéball Normal\n`
        success += `• 3x Poción Normal\n\n`
        success += `*Comandos disponibles:*\n`
        success += `• ${usedPrefix}equipo - Ver tu equipo\n`
        success += `• ${usedPrefix}mochila - Ver tu inventario\n`
        success += `• ${usedPrefix}explorar - Buscar Pokémon salvajes\n`
        success += `• ${usedPrefix}pokedex - Ver tu Pokédex\n\n`
        success += `*¡Que comience tu aventura Pokémon!* 🌟`

        // Establecer cooldown si la función existe
        if (setPokemonCooldown) {
            setPokemonCooldown('starter', 60) // 1 minuto de cooldown
        }

        await m.reply(success)

    } catch (error) {
        console.error('Error en pokemon-start:', error)
        await m.reply('❌ Ocurrió un error al iniciar tu aventura Pokémon. Intenta nuevamente.')
    }
}

// Usar comandos que SÍ están en la lista del handler
handler.help = ['starter [1-4]']
handler.tags = ['pokemon', 'rpg']
handler.command = ['starter', 'iniciarpokemon'] // Estos están en pokemonCommands
handler.group = true

export default handler
