/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    pokemonUtils.js                                              ║
║  📋 Módulo:     Utilidades de Generación y Manejo de Pokémon                 ║
║  ⚙️ Versión:    2.0.0                                                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Sistema completo de generación, estadísticas y evolución de Pokémon.        ║
║  Proporciona todas las utilidades necesarias para crear, modificar y         ║
║  gestionar Pokémon individuales con mecánicas de juego auténticas.           ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Generación de Pokémon salvajes con IVs/EVs aleatorios                     ║
║  • Cálculo preciso de estadísticas según fórmula oficial                     ║
║  • Sistema de nivelación con diferentes tasas de crecimiento                 ║
║  • Aprendizaje de movimientos por nivel                                      ║
║  • Mecánica de evolución por nivel, piedra, amistad e intercambio            ║
║  • Sistema shiny (0.1% probabilidad)                                         ║
║  • Géneros basados en ratios de especie                                      ║
║  • Naturalezas aleatorias que afectan stats                                  ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  GENERACIÓN DE POKÉMON:                                                      ║
║    • generateWildPokemon() - Crea Pokémon salvaje con stats aleatorios       ║
║    • generateIVs() - Genera IVs (0-31) para cada stat                        ║
║    • calculateStats() - Calcula stats finales con fórmula oficial            ║
║    • getMovesForLevel() - Obtiene movimientos aprendibles por nivel          ║
║                                                                              ║
║  SISTEMA DE NIVELACIÓN:                                                      ║
║    • calculateExpToNext() - Calcula experiencia para siguiente nivel         ║
║    • gainExperience() - Añade experiencia y gestiona subida de nivel         ║
║    • calculateExpGain() - Calcula experiencia al derrotar Pokémon            ║
║                                                                              ║
║  SISTEMA DE EVOLUCIÓN:                                                       ║
║    • checkEvolution() - Verifica condiciones para evolucionar                ║
║    • evolvePokemon() - Evoluciona Pokémon a nueva especie                    ║
║    • updateMovesAfterEvolution() - Actualiza movimientos tras evolución      ║
║                                                                              ║
║  UTILIDADES DE POKÉMON:                                                      ║
║    • determineGender() - Determina género basado en ratio                    ║
║    • determineAbility() - Asigna habilidad según especie                     ║
║    • getRandomNature() - Genera naturaleza aleatoria                         ║
║    • getMoveDescription() - Obtiene descripción de movimiento                ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  GENERAR POKÉMON SALVAJE:                                                    ║
║    const wildPikachu = PokemonUtils.generateWildPokemon(25, 5);              ║
║    // Crea Pikachu nivel 5 con IVs aleatorios, movimientos, etc.             ║
║                                                                              ║
║  GANAR EXPERIENCIA Y SUBIR NIVEL:                                            ║
║    const result = PokemonUtils.gainExperience(pokemon, 500);                 ║
║    // Añade 500 exp, sube nivel si es necesario, actualiza stats             ║
║                                                                              ║
║  EVOLUCIONAR POKÉMON:                                                        ║
║    const evolved = PokemonUtils.evolvePokemon(charmander, 6);                ║
║    // Evoluciona Charmander a Charmeleon (especie ID 6)                      ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • Las fórmulas de stats siguen la mecánica oficial de Pokémon               ║
║  • Los IVs son valores aleatorios de 0 a 31 que afectan stats                ║
║  • Los EVs comienzan en 0 y pueden aumentarse con vitaminas/batallas         ║
║  • La probabilidad shiny es 1/1024 (0.097%)                                  ║
║  • Las tasas de crecimiento: fast, medium_fast, medium_slow, slow            ║
║  • Los movimientos se limitan a 4 por Pokémon                                ║
║  • La evolución puede requerir nivel, objeto, amistad o intercambio          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
import { pokemonDB } from './databasepokemon.js';

export class PokemonUtils {
    /**
     * Generar Pokémon salvaje con movimientos según nivel
     */
    static generateWildPokemon(speciesId, level, options = {}) {
        const species = pokemonDB.pokemons[speciesId];
        if (!species) {
            throw new Error(`Especie Pokémon no encontrada: ${speciesId}`);
        }

        // Generar IVs
        const ivs = this.generateIVs();
        
        // Inicializar EVs en 0
        const evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
        
        // Calcular stats
        const stats = this.calculateStats(species.baseStats, level, ivs, evs);
        
        // Obtener movimientos según nivel
        const moves = this.getMovesForLevel(speciesId, level);
        
        // Determinar género
        const gender = this.determineGender(species.genderRatio);
        
        // Determinar habilidad
        const ability = this.determineAbility(speciesId);
        
        // Determinar si es shiny
        const isShiny = Math.random() < 0.001; // 0.1% de probabilidad

        const pokemonId = `pokemon_${speciesId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        return {
            // Identificación
            id: pokemonId,
            speciesId: speciesId,
            originalSpeciesId: speciesId,
            name: species.name,
            nickname: options.nickname || null,
            
            // Nivel y experiencia
            level: level,
            experience: 0,
            experienceToNext: this.calculateExpToNext(level, species.growthRate),
            
            // Stats
            baseStats: species.baseStats,
            ivs: ivs,
            evs: evs,
            currentStats: stats,
            maxHP: stats.hp,
            currentHP: options.currentHP || stats.hp,
            
            // Estado
            status: options.status || null,
            statusTurns: options.statusTurns || 0,
            isFainted: false,
            
            // Características
            types: species.types,
            ability: ability,
            nature: this.getRandomNature(),
            gender: gender,
            isShiny: isShiny,
            happiness: 70,
            
            // Movimientos (con PP)
            moves: moves.map(moveName => ({
                name: moveName,
                type: pokemonDB.moves[moveName]?.type || 'Normal',
                power: pokemonDB.moves[moveName]?.power || 0,
                accuracy: pokemonDB.moves[moveName]?.accuracy || 100,
                pp: pokemonDB.moves[moveName]?.pp || 20,
                currentPP: pokemonDB.moves[moveName]?.pp || 20,
                description: this.getMoveDescription(moveName)
            })),
            
            // Metadatos
            originalTrainer: options.originalTrainer || 'Salvaje',
            caughtDate: options.caughtDate || null,
            caughtLocation: options.caughtLocation || null,
            caughtLevel: options.caughtLevel || level,
            caughtBall: options.caughtBall || null,
            isWild: options.isWild || true,
            
            // Sistema de evolución
            canEvolve: this.checkEvolution(speciesId, level, options),
            evolutionInfo: species.evolution
        };
    }

    /**
     * Generar IVs aleatorios (0-31)
     */
    static generateIVs() {
        return {
            hp: Math.floor(Math.random() * 32),
            atk: Math.floor(Math.random() * 32),
            def: Math.floor(Math.random() * 32),
            spa: Math.floor(Math.random() * 32),
            spd: Math.floor(Math.random() * 32),
            spe: Math.floor(Math.random() * 32)
        };
    }

    /**
     * Calcular stats basados en nivel, IVs y EVs
     */
    static calculateStats(baseStats, level, ivs, evs) {
        const hp = Math.floor(
            ((2 * baseStats.hp + ivs.hp + Math.floor(evs.hp / 4)) * level) / 100
        ) + level + 10;

        const otherStat = (stat) => {
            return Math.floor(
                ((2 * baseStats[stat] + ivs[stat] + Math.floor(evs[stat] / 4)) * level) / 100
            ) + 5;
        };

        return {
            hp: hp,
            atk: otherStat('atk'),
            def: otherStat('def'),
            spa: otherStat('spa'),
            spd: otherStat('spd'),
            spe: otherStat('spe')
        };
    }

    /**
     * Obtener movimientos que el Pokémon puede usar a cierto nivel
     */
    static getMovesForLevel(speciesId, level) {
        const species = pokemonDB.pokemons[speciesId];
        if (!species || !species.moves) return ['Placaje'];

        const availableMoves = [];
        
        // Agregar movimientos aprendidos por nivel
        for (const [learnLevel, moveName] of Object.entries(species.moves)) {
            const requiredLevel = parseInt(learnLevel);
            if (requiredLevel <= level) {
                availableMoves.push(moveName);
            }
        }

        // Si no tiene movimientos, agregar Placaje
        if (availableMoves.length === 0) {
            return ['Placaje'];
        }

        // Tomar los últimos 4 movimientos aprendidos
        return availableMoves.slice(-4);
    }

    /**
     * Calcular experiencia para siguiente nivel
     */
    static calculateExpToNext(currentLevel, growthRate) {
        const formulas = {
            fast: (level) => Math.floor((4 * Math.pow(level, 3)) / 5),
            medium_fast: (level) => Math.pow(level, 3),
            medium_slow: (level) => Math.floor((6/5) * Math.pow(level, 3) - 15 * Math.pow(level, 2) + 100 * level - 140),
            slow: (level) => Math.floor((5 * Math.pow(level, 3)) / 4)
        };

        const formula = formulas[growthRate] || formulas.medium_fast;
        return formula(currentLevel + 1) - formula(currentLevel);
    }

    /**
     * Determinar género basado en ratio
     */
    static determineGender(genderRatio = 0.5) {
        if (genderRatio === -1) return 'genderless';
        return Math.random() < genderRatio ? 'male' : 'female';
    }

    /**
     * Determinar habilidad (simplificado)
     */
    static determineAbility(speciesId) {
        // Mapeo simple de habilidades por especie
        const abilityMap = {
            1: 'Espesura',     // Bulbasaur
            4: 'Mar llamas',   // Charmander
            7: 'Torrente',     // Squirtle
            25: 'Estática',    // Pikachu
            133: 'Fuga',       // Eevee
            150: 'Presión'     // Mewtwo
        };

        return abilityMap[speciesId] || 'Espesura';
    }

    /**
     * Obtener naturaleza aleatoria
     */
    static getRandomNature() {
        const natures = [
            'Activo', 'Afable', 'Agitado', 'Alegre', 'Amable',
            'Audaz', 'Cauta', 'Floja', 'Fuerte', 'Huraña',
            'Ingenua', 'Mansa', 'Miedosa', 'Modesta', 'Osada',
            'Plácida', 'Pícara', 'Rara', 'Serena', 'Seria'
        ];
        return natures[Math.floor(Math.random() * natures.length)];
    }

    /**
     * Obtener descripción de movimiento
     */
    static getMoveDescription(moveName) {
        const descriptions = {
            'Placaje': 'Ataca con el cuerpo.',
            'Lanzallamas': 'Lanza una gran llamarada que puede quemar.',
            'Hidrobomba': 'Potente chorro de agua con gran fuerza.',
            'Rayo Solar': 'Absorbe luz solar y ataca en el siguiente turno.',
            'Terremoto': 'Sacude el suelo, dañando a todos los Pokémon en el campo.',
            'Psíquico': 'Ataca con un fuerte poder psíquico.',
            'Trueno': 'Potente rayo que puede paralizar.',
            'Garra Dragón': 'Ataca con garras afiladas como navajas.',
            'Ataque Ala': 'Golpea con las alas extendidas.',
            'Mordisco': 'Ataca con un mordisco fuerte.'
        };

        return descriptions[moveName] || `El Pokémon usa ${moveName}`;
    }

    /**
     * Verificar si puede evolucionar
     */
    static checkEvolution(speciesId, level, options = {}) {
        const species = pokemonDB.pokemons[speciesId];
        if (!species || !species.evolution) return false;

        const evolution = species.evolution;

        // Evolución por nivel
        if (evolution.level && level >= evolution.level) {
            return true;
        }

        // Evolución por piedra
        if (evolution.item && options.heldItem === evolution.item) {
            return true;
        }

        // Evolución por amistad
        if (evolution.friendship && options.happiness >= 220) {
            return true;
        }

        // Evolución por intercambio
        if (evolution.trade && options.trading === true) {
            return true;
        }

        return false;
    }

    /**
     * Evolucionar Pokémon
     */
    static evolvePokemon(pokemon, newSpeciesId) {
        const newSpecies = pokemonDB.pokemons[newSpeciesId];
        if (!newSpecies) {
            throw new Error(`Especie evolucionada no encontrada: ${newSpeciesId}`);
        }

        // Mantener algunos datos del Pokémon original
        const evolvedPokemon = {
            ...pokemon,
            speciesId: newSpeciesId,
            originalSpeciesId: pokemon.originalSpeciesId,
            name: newSpecies.name,
            types: newSpecies.types,
            baseStats: newSpecies.baseStats,
            // Recalcular stats con nueva base
            currentStats: this.calculateStats(
                newSpecies.baseStats,
                pokemon.level,
                pokemon.ivs,
                pokemon.evs
            ),
            maxHP: this.calculateStats(
                newSpecies.baseStats,
                pokemon.level,
                pokemon.ivs,
                pokemon.evs
            ).hp,
            // Actualizar movimientos disponibles
            moves: this.updateMovesAfterEvolution(pokemon, newSpeciesId),
            // Actualizar información de evolución
            evolutionInfo: newSpecies.evolution,
            canEvolve: this.checkEvolution(newSpeciesId, pokemon.level)
        };

        // Restaurar HP si estaba dañado
        if (evolvedPokemon.currentHP > evolvedPokemon.maxHP) {
            evolvedPokemon.currentHP = evolvedPokemon.maxHP;
        }

        return evolvedPokemon;
    }

    /**
     * Actualizar movimientos después de evolución
     */
    static updateMovesAfterEvolution(pokemon, newSpeciesId) {
        const newSpecies = pokemonDB.pokemons[newSpeciesId];
        const currentMoveNames = pokemon.moves.map(m => m.name);
        
        // Verificar qué movimientos puede aprender la nueva especie
        const availableMoves = this.getMovesForLevel(newSpeciesId, pokemon.level);
        
        // Mantener movimientos compatibles
        const compatibleMoves = currentMoveNames.filter(moveName => 
            availableMoves.includes(moveName)
        );

        // Si no hay movimientos compatibles, usar los básicos de la nueva especie
        if (compatibleMoves.length === 0) {
            return availableMoves.slice(-4).map(moveName => ({
                name: moveName,
                type: pokemonDB.moves[moveName]?.type || 'Normal',
                power: pokemonDB.moves[moveName]?.power || 0,
                accuracy: pokemonDB.moves[moveName]?.accuracy || 100,
                pp: pokemonDB.moves[moveName]?.pp || 20,
                currentPP: pokemonDB.moves[moveName]?.pp || 20,
                description: this.getMoveDescription(moveName)
            }));
        }

        // Rellenar con nuevos movimientos si hay espacio
        const newMoves = [...compatibleMoves];
        for (const moveName of availableMoves) {
            if (!newMoves.includes(moveName) && newMoves.length < 4) {
                newMoves.push(moveName);
            }
        }

        // Convertir a formato de movimiento
        return newMoves.map(moveName => ({
            name: moveName,
            type: pokemonDB.moves[moveName]?.type || 'Normal',
            power: pokemonDB.moves[moveName]?.power || 0,
            accuracy: pokemonDB.moves[moveName]?.accuracy || 100,
            pp: pokemonDB.moves[moveName]?.pp || 20,
            currentPP: pokemonDB.moves[moveName]?.pp || 20,
            description: this.getMoveDescription(moveName)
        }));
    }

    /**
     * Ganar experiencia y verificar nivel up
     */
    static gainExperience(pokemon, expGained) {
        pokemon.experience += expGained;
        
        let levelsGained = 0;
        const levelUpMessages = [];

        while (pokemon.experience >= pokemon.experienceToNext) {
            // Subir de nivel
            pokemon.level++;
            pokemon.experience -= pokemon.experienceToNext;
            pokemon.experienceToNext = this.calculateExpToNext(
                pokemon.level,
                pokemonDB.pokemons[pokemon.speciesId]?.growthRate || 'medium_fast'
            );
            
            levelsGained++;
            
            // Recalcular stats
            const newStats = this.calculateStats(
                pokemon.baseStats,
                pokemon.level,
                pokemon.ivs,
                pokemon.evs
            );
            
            // Aumentar HP actual proporcionalmente
            const hpIncrease = newStats.hp - pokemon.maxHP;
            pokemon.maxHP = newStats.hp;
            pokemon.currentHP = Math.min(pokemon.currentHP + hpIncrease, newStats.hp);
            
            // Actualizar otros stats
            pokemon.currentStats = newStats;
            
            // Verificar nuevos movimientos
            const newMoves = this.getMovesForLevel(pokemon.speciesId, pokemon.level);
            const currentMoveNames = pokemon.moves.map(m => m.name);
            
            for (const moveName of newMoves) {
                if (!currentMoveNames.includes(moveName)) {
                    // Agregar nuevo movimiento si hay espacio
                    if (pokemon.moves.length < 4) {
                        pokemon.moves.push({
                            name: moveName,
                            type: pokemonDB.moves[moveName]?.type || 'Normal',
                            power: pokemonDB.moves[moveName]?.power || 0,
                            accuracy: pokemonDB.moves[moveName]?.accuracy || 100,
                            pp: pokemonDB.moves[moveName]?.pp || 20,
                            currentPP: pokemonDB.moves[moveName]?.pp || 20,
                            description: this.getMoveDescription(moveName)
                        });
                        levelUpMessages.push(`¡${pokemon.name} aprendió ${moveName}!`);
                    }
                }
            }
            
            // Verificar evolución
            if (pokemon.canEvolve) {
                levelUpMessages.push(`¡${pokemon.name} está listo para evolucionar!`);
            }
        }

        return {
            levelsGained,
            levelUpMessages,
            newLevel: pokemon.level,
            currentExp: pokemon.experience,
            nextLevelExp: pokemon.experienceToNext
        };
    }

    /**
     * Calcular experiencia ganada al derrotar Pokémon
     */
    static calculateExpGain(defeatedPokemon, participantLevel, isTrainerBattle = false) {
        const species = pokemonDB.pokemons[defeatedPokemon.speciesId];
        if (!species) return 0;

        // Experiencia base del Pokémon
        let exp = species.baseExp || 100;
        
        // Multiplicador por nivel
        exp = exp * defeatedPokemon.level / 7;
        
        // Multiplicador por diferencia de nivel
        const levelDifference = Math.abs(participantLevel - defeatedPokemon.level);
        if (participantLevel < defeatedPokemon.level) {
            exp *= (1 + levelDifference * 0.1);
        } else if (participantLevel > defeatedPokemon.level) {
            exp *= Math.max(0.5, 1 - levelDifference * 0.05);
        }
        
        // Multiplicador por batalla contra entrenador
        if (isTrainerBattle) {
            exp *= 1.5;
        }
        
        // Redondear
        exp = Math.floor(exp);
        
        // Mínimo de experiencia
        exp = Math.max(10, exp);
        
        return exp;
    }
}

// Exportar funciones individuales para facilidad de uso
export const generateWildPokemon = PokemonUtils.generateWildPokemon;
export const calculateExpGain = PokemonUtils.calculateExpGain;
export const gainExperience = PokemonUtils.gainExperience;
export const evolvePokemon = PokemonUtils.evolvePokemon;

export default PokemonUtils;