/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    explorationSystem.js                                         ║
║  📋 Módulo:     Sistema de Exploración y Encuentros Aleatorios               ║
║  ⚙️ Versión:    1.0.0                                                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Este módulo gestiona todo el sistema de exploración del juego, incluyendo   ║
║  el movimiento entre ubicaciones, encuentros aleatorios con Pokémon salvajes ║
║  y entrenadores, y métodos especiales de exploración como pesca.             ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Sistema de movimiento entre ubicaciones con verificación de conexiones    ║
║  • Encuentros aleatorios basados en porcentajes (nada, salvaje, entrenador)  ║
║  • Exploración activa con aumento progresivo de probabilidad de encuentro    ║
║  • Métodos especiales: pesca, golpear árboles, romper rocas, safari          ║
║  • Verificación de requisitos (medallas, items, banderas de historia)        ║
║  • Eventos especiales basados en tiempo, clima y progreso                    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  SISTEMA DE MOVIMIENTO:                                                      ║
║    • movePlayer() - Mueve al jugador a una nueva ubicación                   ║
║    • isConnected() - Verifica si dos ubicaciones están conectadas            ║
║    • checkRequirements() - Comprueba requisitos para acceder a ubicación     ║
║                                                                              ║
║  SISTEMA DE ENCUENTROS ALEATORIOS:                                           ║
║    • generateRandomEncounter() - Genera encuentro aleatorio en ubicación     ║
║    • generateWildEncounter() - Genera encuentro con Pokémon salvaje          ║
║    • generateTrainerEncounter() - Genera encuentro con entrenador            ║
║    • determineEncounterType() - Determina tipo de encuentro por porcentajes  ║
║                                                                              ║
║  SISTEMA DE EXPLORACIÓN ACTIVA:                                              ║
║    • exploreLocation() - Explora la ubicación actual (comando activo)        ║
║    • specialExploration() - Exploración con métodos especiales               ║
║    • fishForPokemon() - Sistema de pesca de Pokémon                          ║
║                                                                              ║
║  UTILIDADES:                                                                 ║
║    • selectWildPokemon() - Selecciona Pokémon salvaje basado en tasas        ║
║    • calculateWildPokemonLevel() - Calcula nivel de Pokémon salvaje          ║
║    • canExploreLocation() - Verifica si ubicación es explorable              ║
║    • registerPokedexSighting() - Registra avistamiento en Pokédex            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  Ejemplo 1: Movimiento a nueva ubicación                                     ║
║    const result = await explorationSystem.movePlayer(user, 'route_1');       ║
║    if (result.success) {                                                     ║
║      console.log(`Te has movido a: ${result.location}`);                     ║
║    } else {                                                                  ║
║      console.log(`Error: ${result.error}`);                                  ║
║    }                                                                         ║
║                                                                              ║
║  Ejemplo 2: Exploración activa                                               ║
║    const exploration = await explorationSystem.exploreLocation(user);        ║
║    if (exploration.encounter) {                                              ║
║      console.log(`¡Encontraste: ${exploration.encounter.type}!`);            ║
║    } else {                                                                  ║
║      console.log(exploration.message);                                       ║
║    }                                                                         ║
║                                                                              ║
║  Ejemplo 3: Pesca de Pokémon                                                 ║
║    const fishing = await explorationSystem.specialExploration(user, 'fish'); ║
║    if (fishing.encounter) {                                                  ║
║      console.log(`¡Pescaste un ${fishing.encounter.pokemon.name}!`);         ║
║    }                                                                         ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • Las ubicaciones se cargan desde ./locations.json                          ║
║  • Los encuentros salvajes se generan con pokemonUtils.js                    ║
║  • Los entrenadores se cargan desde ./trainers.json                          ║
║  • Los items se cargan desde ./items.json                                    ║
║  • La exploración activa aumenta la probabilidad de encuentro cada vez       ║
║  • Los métodos especiales requieren items específicos (cañas, etc.)          ║
║  • Los eventos especiales pueden modificar encuentros (tiempo, clima)        ║
║  • El sistema mantiene caché de encuentros y estados de exploración          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pokemonDB } from './databasepokemon.js';
import { generateWildPokemon } from './pokemonUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar datos de ubicaciones
const LOCATIONS_DATA = JSON.parse(fs.readFileSync('./locations.json', 'utf8'));

class ExplorationSystem {
    constructor() {
        this.encounterCache = new Map();
        this.explorationStates = new Map();
        this.encounterRates = {
            nothing: 30,      // 30% de no encontrar nada
            wild: 50,         // 50% de encuentro salvaje
            trainer: 20       // 20% de encuentro con entrenador
        };
    }

    // ===== SISTEMA DE MOVIMIENTO =====

    /**
     * Mover jugador a nueva ubicación
     */
    async movePlayer(user, destinationId) {
        const currentLocation = user.progress.location;
        const destination = LOCATIONS_DATA[destinationId];
        
        if (!destination) {
            return { success: false, error: 'Ubicación no existe' };
        }

        // Verificar si está conectada
        if (!this.isConnected(currentLocation, destinationId)) {
            return { success: false, error: 'No puedes llegar ahí desde tu ubicación actual' };
        }

        // Verificar requisitos
        const requirementsCheck = this.checkRequirements(user, destination);
        if (!requirementsCheck.success) {
            return requirementsCheck;
        }

        // Mover jugador
        user.progress.location = destinationId;
        
        // Registrar visita si es nueva ubicación
        if (!user.progress.visitedLocations.includes(destinationId)) {
            user.progress.visitedLocations.push(destinationId);
            user.stats.locations++;
        }

        // Incrementar pasos
        user.stats.steps++;

        return {
            success: true,
            location: destinationId,
            description: destination.description,
            services: destination.services || {},
            canExplore: destination.type === 'route' || destination.type === 'dungeon'
        };
    }

    /**
     * Verificar si dos ubicaciones están conectadas
     */
    isConnected(fromId, toId) {
        const fromLocation = LOCATIONS_DATA[fromId];
        if (!fromLocation) return false;
        
        return fromLocation.connections.includes(toId);
    }

    /**
     * Verificar requisitos para acceder a ubicación
     */
    checkRequirements(user, location) {
        const requirements = location.requirements || [];
        
        for (const requirement of requirements) {
            // Verificar medallas
            if (requirement.startsWith('badge_')) {
                if (!user.progress.badges.includes(requirement)) {
                    const badgeName = this.getBadgeName(requirement);
                    return {
                        success: false,
                        error: `Necesitas la medalla ${badgeName} para acceder a esta zona.`,
                        requirement: {
                            type: 'badge',
                            id: requirement,
                            name: badgeName
                        }
                    };
                }
            }
            
            // Verificar items (HMs principalmente)
            else if (requirement.startsWith('hm') || requirement.startsWith('item_')) {
                if (!user.inventory[requirement] || user.inventory[requirement] <= 0) {
                    const itemName = this.getItemName(requirement);
                    return {
                        success: false,
                        error: `Necesitas ${itemName} para acceder a esta zona.`,
                        requirement: {
                            type: 'item',
                            id: requirement,
                            name: itemName
                        }
                    };
                }
            }
            
            // Verificar progreso de historia
            else if (requirement.startsWith('story_')) {
                const storyFlag = requirement.replace('story_', '');
                if (!user.progress.storyFlags[storyFlag]) {
                    return {
                        success: false,
                        error: 'Debes completar un evento previo para acceder aquí.',
                        requirement: {
                            type: 'story',
                            flag: storyFlag
                        }
                    };
                }
            }
        }
        
        return { success: true };
    }

    // ===== SISTEMA DE ENCUENTROS ALEATORIOS =====

    /**
     * Generar encuentro aleatorio en ubicación actual
     */
    async generateRandomEncounter(user, forceType = null) {
        const locationId = user.progress.location;
        const location = LOCATIONS_DATA[locationId];
        
        if (!location || !location.wild_pokemon) {
            return { type: 'nothing', message: 'No hay encuentros disponibles aquí.' };
        }

        // Determinar tipo de encuentro
        let encounterType;
        if (forceType) {
            encounterType = forceType;
        } else {
            encounterType = this.determineEncounterType();
        }

        switch (encounterType) {
            case 'wild':
                return await this.generateWildEncounter(location, user);
                
            case 'trainer':
                return await this.generateTrainerEncounter(location, user);
                
            case 'nothing':
            default:
                return {
                    type: 'nothing',
                    message: 'Exploras el área pero no encuentras nada interesante...'
                };
        }
    }

    /**
     * Determinar tipo de encuentro basado en porcentajes
     */
    determineEncounterType() {
        const random = Math.random() * 100;
        let cumulative = 0;

        for (const [type, rate] of Object.entries(this.encounterRates)) {
            cumulative += rate;
            if (random <= cumulative) {
                return type;
            }
        }

        return 'nothing';
    }

    /**
     * Generar encuentro con Pokémon salvaje
     */
    async generateWildEncounter(location, user) {
        const wildPokemonList = location.wild_pokemon;
        
        if (!wildPokemonList || wildPokemonList.length === 0) {
            return {
                type: 'nothing',
                message: 'No hay Pokémon salvajes en esta área.'
            };
        }

        // Seleccionar Pokémon basado en tasas
        const selectedPokemon = this.selectWildPokemon(wildPokemonList);
        
        // Determinar nivel (basado en progreso del jugador)
        const level = this.calculateWildPokemonLevel(
            selectedPokemon.level, 
            user.progress.badges.length
        );

        // Generar Pokémon salvaje
        const wildPokemon = generateWildPokemon(
            selectedPokemon.id,
            level,
            {
                originalTrainer: 'Salvaje',
                caughtLocation: location.name,
                isWild: true
            }
        );

        // Actualizar Pokédex (visto)
        this.registerPokedexSighting(user, selectedPokemon.id, location.name);

        return {
            type: 'wild',
            pokemon: wildPokemon,
            encounterData: {
                location: location.name,
                time: new Date().toISOString(),
                isShiny: wildPokemon.isShiny
            },
            actions: ['attack', 'catch', 'run', 'item']
        };
    }

    /**
     * Generar encuentro con entrenador
     */
    async generateTrainerEncounter(location, user) {
        const trainers = location.trainers || [];
        
        if (trainers.length === 0) {
            // Si no hay entrenadores, convertir en encuentro salvaje
            return await this.generateWildEncounter(location, user);
        }

        // Filtrar entrenadores no derrotados
        const availableTrainers = trainers.filter(trainer => 
            !user.progress.defeatedTrainers.includes(trainer.id)
        );

        if (availableTrainers.length === 0) {
            // Todos derrotados, convertir en encuentro salvaje
            return await this.generateWildEncounter(location, user);
        }

        // Seleccionar entrenador aleatorio
        const randomIndex = Math.floor(Math.random() * availableTrainers.length);
        const trainerData = availableTrainers[randomIndex];

        // Cargar datos completos del entrenador
        const trainer = await this.loadTrainerData(trainerData.id);
        
        if (!trainer) {
            return await this.generateWildEncounter(location, user);
        }

        return {
            type: 'trainer',
            trainer: trainer,
            encounterData: {
                location: location.name,
                time: new Date().toISOString(),
                canFlee: false, // No se puede huir de entrenadores
                mandatory: true
            },
            dialogue: trainer.dialogue?.start || "¡Te reto a una batalla Pokémon!",
            actions: ['attack', 'switch', 'item']
        };
    }

    // ===== SISTEMA DE EXPLORACIÓN ACTIVA =====

    /**
     * Explorar ubicación actual (comando activo)
     */
    async exploreLocation(user, options = {}) {
        const locationId = user.progress.location;
        const location = LOCATIONS_DATA[locationId];
        
        if (!location) {
            return { success: false, error: 'Ubicación no válida' };
        }

        // Verificar si se puede explorar
        if (!this.canExploreLocation(location)) {
            return {
                success: false,
                message: 'No hay nada que explorar aquí.',
                suggestion: 'Visita una ruta o cueva para encontrar Pokémon salvajes.'
            };
        }

        // Incrementar contador de exploración
        const explorationKey = `${user._id}_${locationId}`;
        const explorationCount = this.explorationStates.get(explorationKey) || 0;
        this.explorationStates.set(explorationKey, explorationCount + 1);

        // Aumentar probabilidad de encuentro después de múltiples exploraciones
        const encounterChance = Math.min(
            95, // Máximo 95%
            30 + (explorationCount * 15) // Aumenta 15% por cada exploración fallida
        );

        // Determinar si hay encuentro
        const hasEncounter = Math.random() * 100 <= encounterChance;

        if (!hasEncounter) {
            return {
                success: true,
                encounter: null,
                message: this.getExplorationMessage(location, false),
                nextChance: Math.min(95, encounterChance + 15),
                actions: ['explore_again', 'move', 'rest']
            };
        }

        // Generar encuentro
        const encounter = await this.generateRandomEncounter(user);

        // Reiniciar contador si se encontró algo
        if (encounter.type !== 'nothing') {
            this.explorationStates.delete(explorationKey);
        }

        return {
            success: true,
            encounter: encounter,
            message: this.getExplorationMessage(location, true, encounter.type),
            actions: this.getEncounterActions(encounter.type)
        };
    }

    /**
     * Explorar en busca de Pokémon específicos (pesca, safari, etc.)
     */
    async specialExploration(user, method) {
        const locationId = user.progress.location;
        const location = LOCATIONS_DATA[locationId];
        
        if (!location) {
            return { success: false, error: 'Ubicación no válida' };
        }

        switch (method) {
            case 'fish':
                return await this.fishForPokemon(user, location);
                
            case 'headbutt':
                return await this.headbuttTree(user, location);
                
            case 'rock_smash':
                return await this.smashRock(user, location);
                
            case 'safari':
                return await this.safariZoneEncounter(user, location);
                
            default:
                return { success: false, error: 'Método de exploración no válido' };
        }
    }

    // ===== MÉTODOS ESPECIALES DE EXPLORACIÓN =====

    /**
     * Pescar Pokémon
     */
    async fishForPokemon(user, location) {
        // Verificar si tiene caña
        const hasOldRod = user.inventory.old_rod > 0;
        const hasGoodRod = user.inventory.good_rod > 0;
        const hasSuperRod = user.inventory.super_rod > 0;
        
        if (!hasOldRod && !hasGoodRod && !hasSuperRod) {
            return { 
                success: false, 
                error: 'Necesitas una caña de pescar para pescar.' 
            };
        }

        // Determinar calidad de caña
        let rodQuality = 'old';
        if (hasSuperRod) rodQuality = 'super';
        else if (hasGoodRod) rodQuality = 'good';

        // Verificar si hay agua
        const hasWater = location.type === 'route' && location.description?.includes('agua');
        if (!hasWater) {
            return { 
                success: false, 
                error: 'No hay agua para pescar aquí.' 
            };
        }

        // Probabilidades basadas en caña
        const catchRates = {
            old: { common: 70, uncommon: 25, rare: 5 },
            good: { common: 40, uncommon: 45, rare: 15 },
            super: { common: 20, uncommon: 50, rare: 30 }
        };

        const rates = catchRates[rodQuality];
        const random = Math.random() * 100;
        
        let rarity;
        if (random <= rates.common) rarity = 'common';
        else if (random <= rates.common + rates.uncommon) rarity = 'uncommon';
        else rarity = 'rare';

        // Obtener lista de Pokémon pescables
        const fishablePokemon = this.getFishablePokemon(location, rarity);
        
        if (fishablePokemon.length === 0) {
            return {
                success: true,
                encounter: null,
                message: '¡Has pescado! Pero no mordió nada...',
                actions: ['fish_again', 'stop']
            };
        }

        // Seleccionar Pokémon
        const randomIndex = Math.floor(Math.random() * fishablePokemon.length);
        const pokemonData = fishablePokemon[randomIndex];
        
        // Nivel basado en caña
        const levelRange = rodQuality === 'super' ? [25, 40] : 
                          rodQuality === 'good' ? [15, 30] : [5, 15];
        
        const level = levelRange[0] + Math.floor(Math.random() * (levelRange[1] - levelRange[0] + 1));

        // Generar Pokémon
        const wildPokemon = generateWildPokemon(
            pokemonData.id,
            level,
            {
                originalTrainer: 'Salvaje',
                caughtLocation: `${location.name} (Pesca)`,
                isWild: true
            }
        );

        // Registrar en Pokédex
        this.registerPokedexSighting(user, pokemonData.id, location.name);

        return {
            success: true,
            encounter: {
                type: 'wild',
                pokemon: wildPokemon,
                method: 'fishing',
                rod: rodQuality,
                actions: ['attack', 'catch', 'run']
            },
            message: `¡Has pescado un ${wildPokemon.name}!`,
            actions: ['attack', 'catch', 'run']
        };
    }

    // ===== UTILIDADES =====

    /**
     * Seleccionar Pokémon salvaje basado en tasas
     */
    selectWildPokemon(wildPokemonList) {
        // Calcular total de tasas
        const totalRate = wildPokemonList.reduce((sum, p) => sum + p.rate, 0);
        
        // Selección aleatoria ponderada
        let random = Math.random() * totalRate;
        let cumulative = 0;

        for (const pokemon of wildPokemonList) {
            cumulative += pokemon.rate;
            if (random <= cumulative) {
                return pokemon;
            }
        }

        // Fallback
        return wildPokemonList[0];
    }

    /**
     * Calcular nivel de Pokémon salvaje
     */
    calculateWildPokemonLevel(levelRange, badgesCount) {
        const [min, max] = levelRange;
        
        // Aumentar nivel basado en medallas
        const badgeBonus = badgesCount * 2;
        
        // Nivel base aleatorio
        const baseLevel = min + Math.floor(Math.random() * (max - min + 1));
        
        // Aplicar bonus
        const finalLevel = Math.min(max + 5, baseLevel + badgeBonus);
        
        return Math.max(min, finalLevel);
    }

    /**
     * Verificar si se puede explorar la ubicación
     */
    canExploreLocation(location) {
        const explorableTypes = ['route', 'dungeon', 'cave', 'forest', 'mountain'];
        return explorableTypes.includes(location.type);
    }

    /**
     * Obtener mensaje de exploración
     */
    getExplorationMessage(location, foundSomething, encounterType = null) {
        const baseMessages = {
            route: [
                "Recorres el camino...",
                "Exploras la ruta...",
                "Caminas entre la hierba alta..."
            ],
            forest: [
                "Te adentras en el bosque...",
                "Escuchas el crujir de las hojas...",
                "Exploras entre los árboles..."
            ],
            cave: [
                "Avanzas por la cueva oscura...",
                "Escuchas eco en las paredes rocosas...",
                "Exploras las profundidades..."
            ],
            dungeon: [
                "Exploras la mazmorra...",
                "Avanzas con cautela...",
                "Revisas cada rincón..."
            ]
        };

        const messages = baseMessages[location.type] || baseMessages.route;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        if (!foundSomething) {
            const nothingMessages = [
                "No encuentras nada interesante.",
                "Todo parece tranquilo.",
                "No hay señales de Pokémon.",
                "El área está desierta por ahora."
            ];
            return `${randomMessage} ${nothingMessages[Math.floor(Math.random() * nothingMessages.length)]}`;
        }

        const foundMessages = {
            wild: [
                "¡Un Pokémon salvaje apareció!",
                "¡Te encuentras con un Pokémon!",
                "¡Un Pokémon sale de la hierba!",
                "¡Aparece un Pokémon salvaje!"
            ],
            trainer: [
                "¡Un entrenador te desafía!",
                "¡Un entrenador quiere luchar!",
                "Te encuentras con otro entrenador.",
                "¡Recibes un desafío!"
            ]
        };

        const typeMessages = foundMessages[encounterType] || ["¡Encuentras algo!"];
        const foundMessage = typeMessages[Math.floor(Math.random() * typeMessages.length)];

        return `${randomMessage} ${foundMessage}`;
    }

    /**
     * Obtener acciones disponibles para el encuentro
     */
    getEncounterActions(encounterType) {
        const baseActions = {
            wild: ['attack', 'catch', 'run', 'item', 'pokemon'],
            trainer: ['attack', 'switch', 'item', 'pokemon'],
            nothing: ['explore_again', 'move', 'rest', 'check_inventory']
        };

        return baseActions[encounterType] || baseActions.nothing;
    }

    /**
     * Obtener nombre de medalla
     */
    getBadgeName(badgeId) {
        const badgeNames = {
            'badge_boulder': 'Medalla Roca',
            'badge_cascade': 'Medalla Cascada',
            'badge_marsh': 'Medalla Pantano',
            'badge_thunder': 'Medalla Trueno',
            'badge_earth': 'Medalla Tierra'
        };
        return badgeNames[badgeId] || badgeId;
    }

    /**
     * Obtener nombre de item
     */
    getItemName(itemId) {
        // Cargar datos de items
        try {
            const itemsData = JSON.parse(fs.readFileSync('./items.json', 'utf8'));
            
            // Buscar en todas las categorías
            for (const category of Object.values(itemsData.items)) {
                if (category[itemId]) {
                    return category[itemId].name || itemId;
                }
            }
        } catch (error) {
            console.error('Error cargando items:', error);
        }
        
        return itemId;
    }

    /**
     * Registrar avistamiento en Pokédex
     */
    registerPokedexSighting(user, speciesId, locationName) {
        if (!user.pokedex.entries[speciesId]) {
            user.pokedex.entries[speciesId] = 0;
            user.pokedex.stats.seen++;
        }
        
        // 0 = no visto, 1 = visto, 2 = atrapado
        if (user.pokedex.entries[speciesId] < 1) {
            user.pokedex.entries[speciesId] = 1;
        }
    }

    /**
     * Obtener Pokémon pescables
     */
    getFishablePokemon(location, rarity) {
        // Esta función debería cargar datos específicos de pesca
        // Por ahora, devolvemos los Pokémon salvajes de la ubicación filtrados
        const wildPokemon = location.wild_pokemon || [];
        
        // Simular diferentes tasas por rareza
        return wildPokemon.filter(pokemon => {
            // En un sistema real, esto vendría de una base de datos
            const rarityMap = {
                common: pokemon.rate > 30,
                uncommon: pokemon.rate > 10 && pokemon.rate <= 30,
                rare: pokemon.rate <= 10
            };
            
            return rarityMap[rarity];
        });
    }

    /**
     * Cargar datos de entrenador
     */
    async loadTrainerData(trainerId) {
        try {
            const trainersData = JSON.parse(fs.readFileSync('./trainers.json', 'utf8'));
            return trainersData.trainers[trainerId] || null;
        } catch (error) {
            console.error('Error cargando entrenador:', error);
            return null;
        }
    }

    // ===== SISTEMA DE EVENTOS ESPECIALES =====

    /**
     * Verificar eventos especiales en ubicación
     */
    checkSpecialEvents(user, location) {
        const events = [];
        const now = new Date();

        // Evento basado en hora del día
        const hour = now.getHours();
        if (hour >= 20 || hour < 6) {
            events.push({
                type: 'time',
                name: 'Noche',
                effect: 'Aumenta aparición de Pokémon nocturnos',
                multiplier: 1.5
            });
        }

        // Evento basado en clima (simulado)
        const weather = this.getWeather(location);
        if (weather !== 'normal') {
            events.push({
                type: 'weather',
                name: this.getWeatherName(weather),
                effect: 'Afecta tipos de Pokémon que aparecen',
                weather: weather
            });
        }

        // Eventos de historia
        if (location.special_events) {
            for (const event of location.special_events) {
                if (this.checkEventConditions(user, event)) {
                    events.push({
                        type: 'story',
                        name: event.name,
                        effect: event.effect,
                        rewards: event.rewards
                    });
                }
            }
        }

        return events;
    }

    /**
     * Obtener clima de ubicación
     */
    getWeather(location) {
        const weatherTypes = ['normal', 'rain', 'sunny', 'snow', 'fog'];
        // Simular clima basado en tipo de ubicación
        const weatherMap = {
            route: ['normal', 'rain', 'sunny'],
            forest: ['normal', 'rain', 'fog'],
            cave: ['normal'],
            mountain: ['normal', 'snow']
        };

        const possibleWeather = weatherMap[location.type] || ['normal'];
        return possibleWeather[Math.floor(Math.random() * possibleWeather.length)];
    }

    getWeatherName(weather) {
        const names = {
            normal: 'Normal',
            rain: 'Lluvia',
            sunny: 'Soleado',
            snow: 'Nieve',
            fog: 'Niebla'
        };
        return names[weather] || weather;
    }

    checkEventConditions(user, event) {
        // Verificar condiciones del evento
        const conditions = event.conditions || {};
        
        // Verificar medallas
        if (conditions.badges) {
            if (user.progress.badges.length < conditions.badges) {
                return false;
            }
        }

        // Verificar Pokémon en equipo
        if (conditions.pokemon_in_party) {
            const hasPokemon = user.team.some(p => 
                p.speciesId === conditions.pokemon_in_party
            );
            if (!hasPokemon) return false;
        }

        // Verificar items
        if (conditions.items) {
            for (const itemId of conditions.items) {
                if (!user.inventory[itemId] || user.inventory[itemId] <= 0) {
                    return false;
                }
            }
        }

        return true;
    }
}

// Exportar instancia global
const explorationSystem = new ExplorationSystem();
export default explorationSystem;