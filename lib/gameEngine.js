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
import userDB from './userDatabase.js';
import explorationSystem from './explorationSystem.js';
import battleSystem from './battleSystem.js';
import saveManager from './saveManager.js';
import PokemonUtils from './pokemonUtils.js';

class GameEngine {
    constructor() {
        this.activeEncounters = new Map();
        this.questManager = new Map();
        this.eventManager = new Map();
    }

    // ===== EXPLORACIÓN Y MOVIMIENTO =====

    /**
     * Mover jugador a nueva ubicación
     */
    async movePlayer(userId, destinationId) {
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
        await saveManager.autoSave(userId, 'move');

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
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const exploreResult = await explorationSystem.exploreLocation(user);
        
        if (exploreResult.encounter) {
            // Guardar encuentro activo
            this.activeEncounters.set(userId, {
                ...exploreResult.encounter,
                location: user.progress.location,
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
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const result = await explorationSystem.specialExploration(user, method);
        
        if (result.encounter) {
            this.activeEncounters.set(userId, {
                ...result.encounter,
                location: user.progress.location,
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
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const encounter = this.activeEncounters.get(userId);
        if (!encounter) {
            return { success: false, error: 'No hay encuentro activo' };
        }

        // Verificar que el equipo no esté vacío
        if (user.team.length === 0) {
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
                user.money += battleResult.rewards.money;
                user.stats.moneyEarned += battleResult.rewards.money;
            }

            // Experiencia
            if (battleResult.rewards.exp && encounter.type === 'wild') {
                const playerPokemon = user.team[0]; // Pokémon que participó
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
            if (!user.progress.defeatedTrainers.includes(encounter.trainer.id)) {
                user.progress.defeatedTrainers.push(encounter.trainer.id);
                user.stats.trainersDefeated++;
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
        await saveManager.autoSave(userId, 'battle');
    }

    // ===== SISTEMA DE LOGROS =====

    /**
     * Desbloquear logro
     */
    unlockAchievement(user, achievementId) {
        if (!user.achievements.unlocked.includes(achievementId)) {
            user.achievements.unlocked.push(achievementId);
            
            const achievement = this.getAchievementData(achievementId);
            if (achievement) {
                // Otorgar recompensa
                if (achievement.reward) {
                    if (achievement.reward.money) {
                        user.money += achievement.reward.money;
                    }
                    if (achievement.reward.item) {
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
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        await userDB.updateUser(userId, user);
        await saveManager.autoSave(userId, 'manual');

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
        const user = await userDB.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        // Verificar integridad
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

        return {
            success: true,
            user: user,
            location: user.progress.location,
            teamSize: user.team.length,
            badges: user.progress.badges.length,
            pokedex: user.pokedex.stats
        };
    }

    // ===== UTILIDADES =====

    /**
     * Obtener estado actual del juego
     */
    async getGameState(userId) {
        const user = await userDB.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const encounter = this.activeEncounters.get(userId);
        const location = user.progress.location;

        return {
            success: true,
            user: {
                name: user.username,
                money: user.money,
                location: location,
                badges: user.progress.badges,
                team: user.team.map(p => ({
                    name: p.name,
                    level: p.level,
                    hp: `${p.currentHP}/${p.maxHP}`,
                    status: p.status
                }))
            },
            activeEncounter: encounter ? {
                type: encounter.type,
                opponent: encounter.type === 'wild' ? encounter.pokemon.name : encounter.trainer?.name,
                battleId: encounter.battleId
            } : null,
            stats: {
                battles: user.stats.battles,
                wins: user.stats.wins,
                losses: user.stats.losses,
                catches: user.stats.catches,
                trainersDefeated: user.stats.trainersDefeated,
                playtime: user.stats.playtime
            },
            pokedex: user.pokedex.stats
        };
    }

    /**
     * Verificar requisitos para ubicación
     */
    async checkLocationRequirements(userId, destinationId) {
        const user = await userDB.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        // Cargar ubicación
        const locations = JSON.parse(fs.readFileSync('./locations.json', 'utf8'));
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
        const user = await userDB.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        const currentLocation = user.progress.location;
        const locations = JSON.parse(fs.readFileSync('./locations.json', 'utf8'));
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
}

// Exportar instancia global del juego
const gameEngine = new GameEngine();
export default gameEngine;