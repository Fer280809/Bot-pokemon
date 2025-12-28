/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    gameEngine.js                                                ║
║  📋 Módulo:     Motor Principal del Juego                                    ║
║  ⚙️ Versión:    2.0.0                                                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Sistema central que coordina todos los componentes del juego Pokémon.       ║
║  Gestiona la exploración, batallas, logros, sistema de guardado y estado     ║
║  general del juego. Actúa como el núcleo que integra todos los subsistemas.  ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Sistema completo de exploración y movimiento                              ║
║  • Gestión de encuentros aleatorios (salvajes y entrenadores)                ║
║  • Sistema de batallas con múltiples acciones                                ║
║  • Sistema de logros con recompensas automáticas                             ║
║  • Guardado automático y manual                                              ║
║  • Recuperación de datos corruptos desde backup                              ║
║  • Gestión de requisitos para ubicaciones                                    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  EXPLORACIÓN Y MOVIMIENTO:                                                   ║
║    • movePlayer() - Mueve al jugador a nueva ubicación                       ║
║    • exploreLocation() - Explora ubicación actual                            ║
║    • specialExploration() - Exploración especial (pesca, etc.)               ║
║                                                                              ║
║  SISTEMA DE BATALLA:                                                         ║
║    • startBattleFromEncounter() - Inicia batalla desde encuentro             ║
║    • executeBattleAction() - Ejecuta acción en batalla                       ║
║    • processBattleResults() - Procesa resultados de batalla                  ║
║                                                                              ║
║  SISTEMA DE LOGROS:                                                          ║
║    • unlockAchievement() - Desbloquea logros con recompensas                 ║
║    • getAchievementData() - Obtiene datos de logros específicos              ║
║                                                                              ║
║  GUARDADO Y RECUPERACIÓN:                                                    ║
║    • manualSave() - Guardado manual del juego                                ║
║    • loadGame() - Carga partida con verificación de integridad               ║
║                                                                              ║
║  UTILIDADES:                                                                 ║
║    • getGameState() - Obtiene estado completo del juego                      ║
║    • checkLocationRequirements() - Verifica requisitos de ubicación          ║
║    • getConnectedLocations() - Obtiene ubicaciones accesibles                ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  MOVER JUGADOR Y EXPLORAR:                                                   ║
║    const result = await gameEngine.movePlayer('user123', 'route_1');         ║
║    if (result.encounter && result.encounter.type === 'wild') {               ║
║      const battle = await gameEngine.startBattleFromEncounter('user123');    ║
║    }                                                                         ║
║                                                                              ║
║  GUARDAR Y CARGAR:                                                           ║
║    await gameEngine.manualSave('user123');                                   ║
║    const savedGame = await gameEngine.loadGame('user123');                   ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • Los encuentros activos se almacenan en memoria volátil                    ║
║  • El sistema de guardado automático se activa tras acciones importantes     ║
║  • Las batallas requieren Pokémon en el equipo para iniciarse                ║
║  • Los logros otorgan recompensas automáticamente                            ║
║  • El sistema verifica integridad de datos al cargar partidas                ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import userDB from './userDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ IMPORTACIONES DE SISTEMAS EXTERNOS ============
// Importar dinámicamente o crear implementaciones básicas
let explorationSystem, battleSystem, saveManager;

// Clase PokemonUtils local (reemplaza la importación faltante)
class PokemonUtils {
    static gainExperience(pokemon, exp) {
        pokemon.experience = (pokemon.experience || 0) + exp;
        
        // Lógica simplificada de nivel
        const expNeeded = (pokemon.level || 1) * 100;
        if (pokemon.experience >= expNeeded) {
            pokemon.level = (pokemon.level || 1) + 1;
            pokemon.experience -= expNeeded;
            pokemon.canEvolve = this.checkEvolution(pokemon);
            return { leveledUp: true, newLevel: pokemon.level };
        }
        return { leveledUp: false };
    }
    
    static checkEvolution(pokemon) {
        // Lógica básica de evolución
        const evolutionLevels = { 
            'bulbasaur': 16, 'ivysaur': 32, 
            'charmander': 16, 'charmeleon': 36,
            'squirtle': 16, 'wartortle': 36 
        };
        return evolutionLevels[pokemon.species] <= (pokemon.level || 1);
    }
}

// Clase ExplorationSystem local
class ExplorationSystem {
    constructor() {
        this.locationsCache = null;
    }
    
    async loadLocations() {
        if (this.locationsCache) return this.locationsCache;
        
        try {
            const locationsPath = path.join(__dirname, '../game_data/locations.json');
            if (fs.existsSync(locationsPath)) {
                this.locationsCache = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
            } else {
                // Crear ubicaciones por defecto
                this.locationsCache = {
                    'pueblo_paleta': {
                        id: 'pueblo_paleta',
                        name: 'Pueblo Paleta',
                        type: 'town',
                        connections: ['ruta_1'],
                        description: 'Un tranquilo pueblo donde comienzan las aventuras.',
                        requirements: null
                    },
                    'ruta_1': {
                        id: 'ruta_1',
                        name: 'Ruta 1',
                        type: 'route',
                        connections: ['pueblo_paleta', 'ciudad_verde'],
                        description: 'Una ruta tranquila con Pokémon salvajes.',
                        requirements: null,
                        wildPokemon: ['pidgey', 'rattata', 'caterpie', 'weedle']
                    },
                    'ciudad_verde': {
                        id: 'ciudad_verde',
                        name: 'Ciudad Verde',
                        type: 'city',
                        connections: ['ruta_1', 'ruta_2'],
                        description: 'Una ciudad con el primer gimnasio Pokémon.',
                        requirements: null
                    }
                };
                
                // Guardar archivo por defecto
                fs.writeFileSync(locationsPath, JSON.stringify(this.locationsCache, null, 2));
            }
            return this.locationsCache;
        } catch (error) {
            console.error('Error loading locations:', error);
            return {};
        }
    }
    
    async movePlayer(user, destinationId) {
        const locations = await this.loadLocations();
        const destination = locations[destinationId];
        
        if (!destination) {
            return { success: false, error: 'Ubicación no encontrada' };
        }
        
        // Verificar conexión desde ubicación actual
        const currentLocation = locations[user.progress?.location || 'pueblo_paleta'];
        if (currentLocation && !currentLocation.connections?.includes(destinationId)) {
            return { 
                success: false, 
                error: 'No puedes llegar directamente a esa ubicación desde tu posición actual' 
            };
        }
        
        // Verificar requisitos
        const requirementsCheck = this.checkRequirements(user, destination);
        if (!requirementsCheck.success) {
            return requirementsCheck;
        }
        
        // Mover jugador
        user.progress.location = destinationId;
        
        // Registrar como visitada
        if (!user.progress.visitedLocations.includes(destinationId)) {
            user.progress.visitedLocations.push(destinationId);
        }
        
        // Incrementar pasos
        user.stats.steps = (user.stats.steps || 0) + 1;
        
        return {
            success: true,
            location: destination,
            canExplore: destination.type === 'route' || destination.type === 'cave',
            message: `Has llegado a ${destination.name}`
        };
    }
    
    async exploreLocation(user) {
        const locations = await this.loadLocations();
        const currentLocation = locations[user.progress.location || 'pueblo_paleta'];
        
        if (!currentLocation || (currentLocation.type !== 'route' && currentLocation.type !== 'cave')) {
            return { 
                success: false, 
                error: 'No puedes explorar en esta ubicación' 
            };
        }
        
        // Generar encuentro aleatorio
        const encounter = await this.generateRandomEncounter(user);
        
        // Incrementar pasos
        user.stats.steps = (user.stats.steps || 0) + 1;
        
        return {
            success: true,
            encounter: encounter,
            location: currentLocation
        };
    }
    
    async generateRandomEncounter(user) {
        const locations = await this.loadLocations();
        const currentLocation = locations[user.progress.location || 'pueblo_paleta'];
        const wildPokemon = currentLocation.wildPokemon || [];
        
        if (wildPokemon.length === 0) {
            return { type: 'nothing', message: 'No hay Pokémon salvajes aquí' };
        }
        
        // 50% de chance de encuentro
        if (Math.random() > 0.5) {
            return { type: 'nothing', message: 'No encuentras nada interesante' };
        }
        
        // Seleccionar Pokémon aleatorio
        const pokemonName = wildPokemon[Math.floor(Math.random() * wildPokemon.length)];
        
        // Generar datos del Pokémon salvaje
        const wildPokemonData = {
            id: `wild_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
            species: pokemonName,
            level: Math.floor(Math.random() * 5) + 2, // Nivel 2-6
            currentHP: 20,
            maxHP: 20,
            moves: ['Placaje'],
            isShiny: Math.random() < 0.001 // 0.1% chance de shiny
        };
        
        return {
            type: 'wild',
            pokemon: wildPokemonData,
            message: `¡Un ${wildPokemonData.name} salvaje apareció!`
        };
    }
    
    async specialExploration(user, method) {
        // Métodos: 'fish', 'headbutt', 'rock_smash'
        const methods = {
            'fish': { chance: 0.7, message: 'Has lanzado la caña de pescar...' },
            'headbutt': { chance: 0.6, message: 'Sacudes el árbol vigorosamente...' },
            'rock_smash': { chance: 0.5, message: 'Rompes la roca con fuerza...' }
        };
        
        const methodInfo = methods[method];
        if (!methodInfo) {
            return { success: false, error: 'Método de exploración no válido' };
        }
        
        // Verificar si tiene el item necesario
        if (method === 'fish' && !user.inventory?.old_rod) {
            return { success: false, error: 'Necesitas una caña de pescar' };
        }
        
        // Incrementar pasos
        user.stats.steps = (user.stats.steps || 0) + 1;
        
        // Chance de éxito
        if (Math.random() > methodInfo.chance) {
            return { 
                success: true, 
                encounter: { type: 'nothing' },
                message: `${methodInfo.message} No encuentras nada.`
            };
        }
        
        // Generar encuentro especial
        const specialPokemon = method === 'fish' 
            ? ['magikarp', 'goldeen', 'tentacool']
            : ['spearow', 'heracross', 'aipom'];
        
        const pokemonName = specialPokemon[Math.floor(Math.random() * specialPokemon.length)];
        
        const wildPokemonData = {
            id: `wild_${method}_${Date.now()}`,
            name: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
            species: pokemonName,
            level: Math.floor(Math.random() * 10) + 5, // Nivel 5-14
            currentHP: 30,
            maxHP: 30,
            moves: ['Placaje'],
            specialEncounter: true,
            method: method
        };
        
        return {
            success: true,
            encounter: {
                type: 'wild',
                pokemon: wildPokemonData,
                method: method
            },
            message: `${methodInfo.message} ¡Aparece un ${wildPokemonData.name}!`
        };
    }
    
    checkRequirements(user, destination) {
        // Verificar requisitos básicos
        if (!destination.requirements) {
            return { success: true };
        }
        
        const requirements = destination.requirements;
        
        // Verificar medallas
        if (requirements.badges) {
            const userBadges = user.progress?.badges?.length || 0;
            if (userBadges < requirements.badges) {
                return { 
                    success: false, 
                    requirement: `Necesitas al menos ${requirements.badges} medalla(s)`,
                    userHas: userBadges
                };
            }
        }
        
        // Verificar Pokémon específico
        if (requirements.pokemon) {
            const hasPokemon = user.team?.some(p => p.species === requirements.pokemon) ||
                              Object.keys(user.pc?.boxes || {}).some(box => 
                                  user.pc.boxes[box]?.slots?.some(p => p?.species === requirements.pokemon)
                              );
            if (!hasPokemon) {
                return { 
                    success: false, 
                    requirement: `Necesitas un ${requirements.pokemon}` 
                };
            }
        }
        
        // Verificar objeto
        if (requirements.item) {
            const hasItem = user.inventory?.[requirements.item] > 0;
            if (!hasItem) {
                return { 
                    success: false, 
                    requirement: `Necesitas ${requirements.item}` 
                };
            }
        }
        
        return { success: true };
    }
}

// Clase BattleSystem local
class BattleSystem {
    constructor() {
        this.activeBattles = new Map();
    }
    
    async startWildBattle(playerTeam, wildPokemon, options = {}) {
        const battleId = `battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Asegurar que playerTeam tenga estructura correcta
        const validTeam = playerTeam.map(pokemon => ({
            ...pokemon,
            currentHP: pokemon.currentHP || pokemon.maxHP || 20,
            maxHP: pokemon.maxHP || 20,
            level: pokemon.level || 5,
            moves: pokemon.moves || ['Placaje']
        }));
        
        const battle = {
            id: battleId,
            type: 'wild',
            playerTeam: validTeam,
            opponent: wildPokemon,
            currentTurn: 'player',
            playerActive: 0,
            opponentHP: wildPokemon.currentHP || wildPokemon.maxHP || 20,
            opponentMaxHP: wildPokemon.maxHP || 20,
            status: 'active',
            startTime: Date.now(),
            location: options.location,
            turns: 0
        };
        
        this.activeBattles.set(battleId, battle);
        
        return {
            battleId,
            message: `¡Comienza la batalla contra ${wildPokemon.name} salvaje!`,
            battle: {
                playerTeam: validTeam.map(p => ({ name: p.name, level: p.level, hp: `${p.currentHP}/${p.maxHP}` })),
                opponent: {
                    name: wildPokemon.name,
                    level: wildPokemon.level,
                    hp: `${wildPokemon.currentHP || wildPokemon.maxHP || 20}/${wildPokemon.maxHP || 20}`
                }
            }
        };
    }
    
    async startTrainerBattle(playerTeam, trainerData, options = {}) {
        const battleId = `trainer_battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Crear equipo del entrenador si no existe
        const trainerTeam = trainerData.team || [{
            name: 'Pidgey',
            species: 'pidgey',
            level: 7,
            currentHP: 24,
            maxHP: 24,
            moves: ['Placaje', 'Tornado']
        }];
        
        const battle = {
            id: battleId,
            type: 'trainer',
            playerTeam: playerTeam,
            trainer: trainerData,
            trainerTeam: trainerTeam,
            currentTurn: 'player',
            playerActive: 0,
            trainerActive: 0,
            trainerHP: trainerTeam[0].currentHP,
            trainerMaxHP: trainerTeam[0].maxHP,
            status: 'active',
            startTime: Date.now(),
            location: options.location,
            turns: 0
        };
        
        this.activeBattles.set(battleId, battle);
        
        return {
            battleId,
            message: `${trainerData.name} quiere pelear!`,
            battle: {
                playerTeam: playerTeam.map(p => ({ name: p.name, level: p.level, hp: `${p.currentHP}/${p.maxHP}` })),
                opponent: {
                    name: trainerData.name,
                    pokemon: trainerTeam.map(p => ({ name: p.name, level: p.level }))
                }
            }
        };
    }
    
    async executeTurn(battleId, userId, action, data = {}) {
        const battle = this.activeBattles.get(battleId);
        if (!battle) {
            return { success: false, error: 'Batalla no encontrada' };
        }
        
        battle.turns++;
        
        let result = { success: true };
        
        switch (action) {
            case 'attack':
                result = await this.handleAttack(battle, data.moveIndex);
                break;
                
            case 'catch':
                result = await this.handleCatch(battle, data.ballType);
                break;
                
            case 'switch':
                result = await this.handleSwitch(battle, data.pokemonIndex);
                break;
                
            case 'run':
                result = await this.handleRun(battle);
                break;
                
            case 'use_item':
                result = await this.handleUseItem(battle, data.itemId);
                break;
                
            default:
                return { success: false, error: 'Acción no válida' };
        }
        
        // Verificar si la batalla terminó
        if (result.battleEnded) {
            this.activeBattles.delete(battleId);
        } else {
            // Cambiar turno si no terminó
            battle.currentTurn = battle.currentTurn === 'player' ? 'opponent' : 'player';
            
            // Si es turno del oponente, ejecutar su acción
            if (battle.currentTurn === 'opponent' && !result.battleEnded) {
                await this.executeOpponentTurn(battle);
                
                // Verificar si el jugador perdió después del turno del oponente
                const playerPokemon = battle.playerTeam[battle.playerActive];
                if (playerPokemon.currentHP <= 0) {
                    result = {
                        battleEnded: true,
                        result: 'lose',
                        message: `${playerPokemon.name} se debilitó. ¡Has perdido la batalla!`
                    };
                    this.activeBattles.delete(battleId);
                }
            }
        }
        
        return {
            ...result,
            battleId,
            currentTurn: battle.currentTurn,
            playerActive: battle.playerActive,
            playerTeam: battle.playerTeam.map(p => ({
                name: p.name,
                level: p.level,
                hp: `${p.currentHP}/${p.maxHP}`,
                status: p.status
            })),
            opponentHP: battle.type === 'wild' 
                ? `${battle.opponentHP}/${battle.opponentMaxHP}`
                : `${battle.trainerHP}/${battle.trainerMaxHP}`
        };
    }
    
    async handleAttack(battle, moveIndex) {
        const playerPokemon = battle.playerTeam[battle.playerActive];
        const move = playerPokemon.moves?.[moveIndex] || 'Placaje';
        
        let damage = Math.floor(Math.random() * 10) + 5;
        
        if (battle.type === 'wild') {
            battle.opponentHP = Math.max(0, battle.opponentHP - damage);
            
            if (battle.opponentHP <= 0) {
                return {
                    battleEnded: true,
                    result: 'win',
                    message: `¡${playerPokemon.name} usó ${move} y derrotó al ${battle.opponent.name} salvaje!`,
                    rewards: {
                        exp: battle.opponent.level * 10,
                        money: Math.floor(Math.random() * 100) + 50
                    }
                };
            }
            
            return {
                message: `${playerPokemon.name} usó ${move} y causó ${damage} de daño.`,
                opponentHP: battle.opponentHP
            };
            
        } else { // Trainer battle
            battle.trainerHP = Math.max(0, battle.trainerHP - damage);
            
            if (battle.trainerHP <= 0) {
                // Pasar al siguiente Pokémon del entrenador si hay
                battle.trainerActive++;
                if (battle.trainerActive >= battle.trainerTeam.length) {
                    return {
                        battleEnded: true,
                        result: 'win',
                        message: `¡Has derrotado a ${battle.trainer.name}!`,
                        rewards: {
                            money: battle.trainer.reward || 500,
                            badge: battle.trainer.badge
                        }
                    };
                } else {
                    const nextPokemon = battle.trainerTeam[battle.trainerActive];
                    battle.trainerHP = nextPokemon.currentHP;
                    battle.trainerMaxHP = nextPokemon.maxHP;
                    
                    return {
                        message: `¡${battle.trainer.name} envía a ${nextPokemon.name}!`,
                        opponentHP: battle.trainerHP
                    };
                }
            }
            
            return {
                message: `${playerPokemon.name} usó ${move} y causó ${damage} de daño.`,
                opponentHP: battle.trainerHP
            };
        }
    }
    
    async handleCatch(battle, ballType = 'pokeball') {
        if (battle.type !== 'wild') {
            return { success: false, error: 'Solo puedes capturar Pokémon salvajes' };
        }
        
        const catchRate = { pokeball: 0.3, greatball: 0.5, ultraball: 0.7, masterball: 1.0 }[ballType] || 0.3;
        const hpPercentage = battle.opponentHP / battle.opponentMaxHP;
        const catchChance = catchRate * (1 - hpPercentage * 0.5);
        
        if (Math.random() < catchChance) {
            return {
                battleEnded: true,
                result: 'caught',
                message: `¡Felicidades! Atrapaste a ${battle.opponent.name} con una ${ballType}!`,
                pokemon: battle.opponent,
                ballUsed: ballType
            };
        } else {
            return {
                message: `¡Oh no! ${battle.opponent.name} escapó de la ${ballType}.`
            };
        }
    }
    
    async handleSwitch(battle, pokemonIndex) {
        if (pokemonIndex < 0 || pokemonIndex >= battle.playerTeam.length) {
            return { success: false, error: 'Índice de Pokémon inválido' };
        }
        
        const newPokemon = battle.playerTeam[pokemonIndex];
        if (newPokemon.currentHP <= 0) {
            return { success: false, error: 'Ese Pokémon está debilitado' };
        }
        
        battle.playerActive = pokemonIndex;
        
        return {
            message: `¡Adelante ${newPokemon.name}!`,
            switchedTo: newPokemon.name
        };
    }
    
    async handleRun(battle) {
        if (battle.type === 'trainer') {
            return { success: false, error: 'No puedes huir de una batalla contra entrenador' };
        }
        
        const runChance = 0.8; // 80% de éxito
        if (Math.random() < runChance) {
            return {
                battleEnded: true,
                result: 'fled',
                message: 'Escapaste con éxito de la batalla.'
            };
        } else {
            return {
                message: 'No pudiste escapar...'
            };
        }
    }
    
    async handleUseItem(battle, itemId) {
        // Implementación básica de uso de items
        const itemEffects = {
            'potion': { heal: 20 },
            'superpotion': { heal: 50 },
            'hyperpotion': { heal: 200 },
            'revive': { revive: true }
        };
        
        const effect = itemEffects[itemId];
        if (!effect) {
            return { success: false, error: 'Item no válido' };
        }
        
        const pokemon = battle.playerTeam[battle.playerActive];
        
        if (effect.revive && pokemon.currentHP <= 0) {
            pokemon.currentHP = Math.floor(pokemon.maxHP / 2);
            return {
                message: `Usaste ${itemId}. ¡${pokemon.name} se ha revivido!`,
                healed: true
            };
        } else if (effect.heal) {
            const newHP = Math.min(pokemon.maxHP, pokemon.currentHP + effect.heal);
            const healed = newHP - pokemon.currentHP;
            pokemon.currentHP = newHP;
            return {
                message: `Usaste ${itemId}. ${pokemon.name} recuperó ${healed} HP.`,
                healed: true,
                amountHealed: healed
            };
        }
        
        return { success: false, error: 'No se pudo usar el item' };
    }
    
    async executeOpponentTurn(battle) {
        if (battle.type === 'wild') {
            // Pokémon salvaje ataca
            const damage = Math.floor(Math.random() * 8) + 3;
            const playerPokemon = battle.playerTeam[battle.playerActive];
            playerPokemon.currentHP = Math.max(0, playerPokemon.currentHP - damage);
            
            return {
                message: `${battle.opponent.name} salvaje atacó y causó ${damage} de daño.`
            };
        } else {
            // Entrenador ataca
            const trainerPokemon = battle.trainerTeam[battle.trainerActive];
            const damage = Math.floor(Math.random() * 10) + 5;
            const playerPokemon = battle.playerTeam[battle.playerActive];
            playerPokemon.currentHP = Math.max(0, playerPokemon.currentHP - damage);
            
            return {
                message: `${trainerPokemon.name} de ${battle.trainer.name} atacó y causó ${damage} de daño.`
            };
        }
    }
}

class GameEngine {
    constructor() {
        this.activeEncounters = new Map();
        this.questManager = new Map();
        this.eventManager = new Map();
        this.initialized = false;
    }
    
    async initialize() {
        if (this.initialized) return true;
        
        try {
            // Inicializar sistemas
            explorationSystem = new ExplorationSystem();
            battleSystem = new BattleSystem();
            
            // Intentar cargar saveManager si existe
            try {
                const saveModule = await import('./saveManager.js');
                saveManager = saveModule.default || saveModule;
            } catch (error) {
                console.log('SaveManager no disponible, usando sistema básico');
                saveManager = this.createBasicSaveManager();
            }
            
            this.initialized = true;
            console.log('✅ GameEngine inicializado correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error inicializando GameEngine:', error);
            return false;
        }
    }
    
    createBasicSaveManager() {
        return {
            autoSave: async (userId, reason) => {
                console.log(`[AutoSave] ${userId} - ${reason}`);
                return { success: true };
            }
        };
    }

    // ===== EXPLORACIÓN Y MOVIMIENTO =====

    /**
     * Mover jugador a nueva ubicación
     */
    async movePlayer(userId, destinationId) {
        await this.initialize();
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        // Mover jugador
        const moveResult = await explorationSystem.movePlayer(user, destinationId);
        if (!moveResult.success) return moveResult;

        // Actualizar usuario
        await userDB.updateUser(userId, user);

        // Generar encuentro automático si es ruta
        let encounter = null;
        if (moveResult.canExplore) {
            encounter = await explorationSystem.generateRandomEncounter(user);
            
            if (encounter && encounter.type !== 'nothing') {
                // Guardar encuentro activo
                this.activeEncounters.set(userId, {
                    ...encounter,
                    location: destinationId,
                    timestamp: Date.now()
                });
            }
        }

        // Guardar después de movimiento
        if (saveManager) {
            await saveManager.autoSave(userId, 'move');
        }

        return {
            ...moveResult,
            encounter: encounter,
            activeEncounter: encounter && encounter.type !== 'nothing'
        };
    }

    /**
     * Explorar ubicación actual
     */
    async exploreLocation(userId) {
        await this.initialize();
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const exploreResult = await explorationSystem.exploreLocation(user);
        
        if (exploreResult.encounter) {
            // Guardar encuentro activo
            this.activeEncounters.set(userId, {
                ...exploreResult.encounter,
                location: user.progress?.location || 'pueblo_paleta',
                timestamp: Date.now()
            });
        }

        // Actualizar usuario
        await userDB.updateUser(userId, user);

        return exploreResult;
    }

    /**
     * Exploración especial (pesca, etc.)
     */
    async specialExploration(userId, method) {
        await this.initialize();
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const result = await explorationSystem.specialExploration(user, method);
        
        if (result.encounter) {
            this.activeEncounters.set(userId, {
                ...result.encounter,
                location: user.progress?.location || 'pueblo_paleta',
                timestamp: Date.now(),
                method: method
            });
        }

        await userDB.updateUser(userId, user);
        return result;
    }

    // ===== SISTEMA DE BATALLA =====

    /**
     * Iniciar batalla desde encuentro
     */
    async startBattleFromEncounter(userId) {
        await this.initialize();
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const encounter = this.activeEncounters.get(userId);
        if (!encounter) {
            return { success: false, error: 'No hay encuentro activo' };
        }

        // Verificar que el equipo no esté vacío
        if (!user.team || user.team.length === 0) {
            return { success: false, error: 'No tienes Pokémon en tu equipo' };
        }

        let battleResult;

        if (encounter.type === 'wild') {
            // Batalla salvaje
            battleResult = await battleSystem.startWildBattle(
                user.team,
                encounter.pokemon,
                {
                    location: encounter.location
                }
            );
        } else if (encounter.type === 'trainer') {
            // Batalla contra entrenador
            battleResult = await battleSystem.startTrainerBattle(
                user.team,
                encounter.trainer,
                {
                    location: encounter.location
                }
            );
        } else {
            return { success: false, error: 'Tipo de encuentro no válido' };
        }

        // Guardar referencia de batalla
        this.activeEncounters.set(userId, {
            ...encounter,
            battleId: battleResult.battleId
        });

        return {
            success: true,
            battle: battleResult,
            encounter: encounter
        };
    }

    /**
     * Ejecutar acción en batalla
     */
    async executeBattleAction(userId, action, data = {}) {
        await this.initialize();
        const encounter = this.activeEncounters.get(userId);
        if (!encounter || !encounter.battleId) {
            return { success: false, error: 'No hay batalla activa' };
        }

        const battleResult = await battleSystem.executeTurn(
            encounter.battleId,
            userId,
            action,
            data
        );

        // Si la batalla terminó, procesar resultados
        if (battleResult.battleEnded) {
            await this.processBattleResults(userId, battleResult, encounter);
            
            // Eliminar encuentro activo
            this.activeEncounters.delete(userId);
        }

        return battleResult;
    }

    /**
     * Procesar resultados de batalla
     */
    async processBattleResults(userId, battleResult, encounter) {
        const user = await userDB.getUser(userId, true);
        if (!user) return;

        // Inicializar stats si no existen
        user.stats = user.stats || {
            battles: 0,
            wins: 0,
            losses: 0,
            winStreak: 0,
            bestWinStreak: 0,
            catches: 0,
            fails: 0,
            shinyCatches: 0,
            trainersDefeated: 0,
            gymsDefeated: 0,
            steps: 0,
            locations: 1,
            moneyEarned: 0,
            moneySpent: 0
        };

        // Actualizar estadísticas
        user.stats.battles++;
        
        if (battleResult.result === 'win') {
            user.stats.wins++;
            user.stats.winStreak++;
            if (user.stats.winStreak > user.stats.bestWinStreak) {
                user.stats.bestWinStreak = user.stats.winStreak;
            }
        } else if (battleResult.result === 'lose') {
            user.stats.losses++;
            user.stats.winStreak = 0;
        }

        // Procesar recompensas
        if (battleResult.rewards) {
            // Dinero
            if (battleResult.rewards.money) {
                user.money = (user.money || 0) + battleResult.rewards.money;
                user.stats.moneyEarned = (user.stats.moneyEarned || 0) + battleResult.rewards.money;
            }

            // Experiencia
            if (battleResult.rewards.exp && encounter.type === 'wild') {
                const playerPokemon = user.team?.[0]; // Pokémon que participó
                if (playerPokemon) {
                    const expResult = PokemonUtils.gainExperience(
                        playerPokemon,
                        battleResult.rewards.exp
                    );
                    
                    // Verificar evolución
                    if (playerPokemon.canEvolve) {
                        battleResult.evolutionAvailable = true;
                        battleResult.evolutionPokemon = playerPokemon;
                    }
                }
            }

            // Medalla (si es líder de gimnasio)
            if (battleResult.rewards.badge) {
                user.progress = user.progress || { badges: [] };
                if (!user.progress.badges.includes(battleResult.rewards.badge)) {
                    user.progress.badges.push(battleResult.rewards.badge);
                    
                    // Logro: Primer gimnasio
                    if (user.progress.badges.length === 1) {
                        this.unlockAchievement(user, 'first_gym');
                    }
                    
                    // Logro: Todas las medallas
                    if (user.progress.badges.length >= 8) {
                        this.unlockAchievement(user, 'all_badges');
                    }
                }
            }

            // TM
            if (battleResult.rewards.tm) {
                await userDB.addItem(userId, battleResult.rewards.tm, 1);
            }
        }

        // Si es entrenador, marcarlo como derrotado
        if (encounter.type === 'trainer' && battleResult.result === 'win') {
            user.progress = user.progress || { defeatedTrainers: [] };
            if (!user.progress.defeatedTrainers.includes(encounter.trainer.id)) {
                user.progress.defeatedTrainers.push(encounter.trainer.id);
                user.stats.trainersDefeated = (user.stats.trainersDefeated || 0) + 1;
            }
        }

        // Si fue captura, agregar Pokémon al equipo/PC
        if (battleResult.result === 'caught' && encounter.type === 'wild') {
            const addResult = await userDB.addPokemonToTeam(userId, encounter.pokemon);
            
            if (!addResult.success && addResult.options) {
                // Ofrecer opciones si el equipo está lleno
                battleResult.catchOptions = addResult.options;
            }
        }

        // Guardar después de batalla
        await userDB.updateUser(userId, user);
        if (saveManager) {
            await saveManager.autoSave(userId, 'battle');
        }
    }

    // ===== SISTEMA DE LOGROS =====

    /**
     * Desbloquear logro
     */
    unlockAchievement(user, achievementId) {
        user.achievements = user.achievements || { unlocked: [], progress: {} };
        
        if (!user.achievements.unlocked.includes(achievementId)) {
            user.achievements.unlocked.push(achievementId);
            
            const achievement = this.getAchievementData(achievementId);
            if (achievement) {
                // Otorgar recompensa
                if (achievement.reward) {
                    if (achievement.reward.money) {
                        user.money = (user.money || 0) + achievement.reward.money;
                    }
                    if (achievement.reward.item) {
                        user.inventory = user.inventory || {};
                        user.inventory[achievement.reward.item] = 
                            (user.inventory[achievement.reward.item] || 0) + 
                            (achievement.reward.quantity || 1);
                    }
                }
                
                return {
                    unlocked: true,
                    achievement: achievement,
                    message: `¡Logro desbloqueado: ${achievement.name}!`
                };
            }
        }
        
        return { unlocked: false };
    }

    /**
     * Obtener datos de logro
     */
    getAchievementData(achievementId) {
        const achievements = {
            'first_gym': {
                id: 'first_gym',
                name: 'Primer Gimnasio',
                description: 'Derrota a tu primer Líder de Gimnasio',
                reward: { money: 1000, item: 'rare_candy', quantity: 1 }
            },
            'all_badges': {
                id: 'all_badges',
                name: 'Maestro de Gimnasios',
                description: 'Obtén las 8 medallas de Kanto',
                reward: { money: 10000, item: 'masterball', quantity: 1 }
            },
            'pokedex_50': {
                id: 'pokedex_50',
                name: 'Coleccionista',
                description: 'Atrapa 50 especies diferentes de Pokémon',
                reward: { money: 5000, item: 'exp_share', quantity: 1 }
            },
            'first_shiny': {
                id: 'first_shiny',
                name: 'Cazador de Shiny',
                description: 'Encuentra tu primer Pokémon shiny',
                reward: { money: 5000, item: 'shiny_charm', quantity: 1 }
            },
            'league_champion': {
                id: 'league_champion',
                name: 'Campeón de la Liga',
                description: 'Conviértete en el Campeón de la Liga Pokémon',
                reward: { money: 50000, item: 'champion_trophy', quantity: 1 }
            }
        };

        return achievements[achievementId];
    }

    // ===== SISTEMA DE GUARDADO Y RECUPERACIÓN =====

    /**
     * Guardar juego manualmente
     */
    async manualSave(userId) {
        await this.initialize();
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        await userDB.updateUser(userId, user);
        if (saveManager) {
            await saveManager.autoSave(userId, 'manual');
        }

        return { 
            success: true, 
            message: 'Juego guardado correctamente.',
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Cargar partida guardada
     */
    async loadGame(userId) {
        await this.initialize();
        const user = await userDB.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        // Verificar integridad si saveManager está disponible
        if (saveManager && saveManager.verifyDataIntegrity) {
            const integrity = saveManager.verifyDataIntegrity(userId);
            if (!integrity.valid && integrity.needsRecovery) {
                // Intentar recuperar de backup
                const recovery = await saveManager.recoverFromBackup(userId);
                if (!recovery.success) {
                    return { 
                        success: false, 
                        error: 'Datos corruptos. No se pudo recuperar la partida.'
                    };
                }
            }
        }

        return {
            success: true,
            user: user,
            location: user.progress?.location || 'pueblo_paleta',
            teamSize: user.team?.length || 0,
            badges: user.progress?.badges?.length || 0,
            pokedex: user.pokedex?.stats || { seen: 0, caught: 0, shinySeen: 0, shinyCaught: 0 }
        };
    }

    // ===== UTILIDADES =====

    /**
     * Obtener estado actual del juego
     */
    async getGameState(userId) {
        await this.initialize();
        const user = await userDB.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const encounter = this.activeEncounters.get(userId);
        const location = user.progress?.location || 'pueblo_paleta';

        return {
            success: true,
            user: {
                name: user.username || 'Entrenador',
                money: user.money || 0,
                location: location,
                badges: user.progress?.badges || [],
                team: (user.team || []).map(p => ({
                    name: p.name || 'Pokémon',
                    level: p.level || 1,
                    hp: `${p.currentHP || 20}/${p.maxHP || 20}`,
                    status: p.status || 'OK'
                }))
            },
            activeEncounter: encounter ? {
                type: encounter.type,
                opponent: encounter.type === 'wild' ? encounter.pokemon?.name : encounter.trainer?.name,
                battleId: encounter.battleId
            } : null,
            stats: {
                battles: user.stats?.battles || 0,
                wins: user.stats?.wins || 0,
                losses: user.stats?.losses || 0,
                catches: user.stats?.catches || 0,
                trainersDefeated: user.stats?.trainersDefeated || 0,
                playtime: user.stats?.playtime || 0
            },
            pokedex: user.pokedex?.stats || { seen: 0, caught: 0, shinySeen: 0, shinyCaught: 0 }
        };
    }

    /**
     * Verificar requisitos para ubicación
     */
    async checkLocationRequirements(userId, destinationId) {
        await this.initialize();
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        // Cargar ubicación
        const locations = await explorationSystem.loadLocations();
        const destination = locations[destinationId];
        
        if (!destination) {
            return { success: false, error: 'Ubicación no existe' };
        }

        // Verificar requisitos
        return explorationSystem.checkRequirements(user, destination);
    }

    /**
     * Obtener ubicaciones conectadas
     */
    async getConnectedLocations(userId) {
        await this.initialize();
        const user = await userDB.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const currentLocation = user.progress?.location || 'pueblo_paleta';
        const locations = await explorationSystem.loadLocations();
        const location = locations[currentLocation];

        if (!location) return { success: false, error: 'Ubicación no encontrada' };

        const connected = location.connections || [];
        const accessible = [];

        for (const destId of connected) {
            const dest = locations[destId];
            if (dest) {
                const requirements = explorationSystem.checkRequirements(user, dest);
                accessible.push({
                    id: destId,
                    name: dest.name,
                    type: dest.type,
                    accessible: requirements.success,
                    requirement: requirements.requirement
                });
            }
        }

        return {
            success: true,
            current: {
                id: currentLocation,
                name: location.name,
                type: location.type,
                description: location.description
            },
            connected: accessible
        };
    }
    
    /**
     * Obtener encuentro activo
     */
    getActiveEncounter(userId) {
        return this.activeEncounters.get(userId) || null;
    }
    
    /**
     * Cancelar encuentro activo
     */
    cancelEncounter(userId) {
        return this.activeEncounters.delete(userId);
    }
    
    /**
     * Limpiar encuentros antiguos
     */
    cleanupOldEncounters(maxAge = 300000) { // 5 minutos
        const now = Date.now();
        let cleaned = 0;
        
        for (const [userId, encounter] of this.activeEncounters.entries()) {
            if (now - (encounter.timestamp || 0) > maxAge) {
                this.activeEncounters.delete(userId);
                cleaned++;
            }
        }
        
        return cleaned;
    }
}

// Exportar instancia global del juego
const gameEngine = new GameEngine();
export default gameEngine;
