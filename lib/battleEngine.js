/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                                      ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    battleEngine.js                                              ║
║  📋 Módulo:     Sistema Central de Batallas Pokémon                          ║
║  ⚙️ Versión:    2.1.0                                                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Sistema completo de batallas turn-based que gestiona encuentros salvajes    ║
║  y combates contra entrenadores. Implementa mecánicas oficiales de Pokémon   ║
║  incluyendo tipos, STAB, críticos, captura y recompensas.                    ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Batallas salvajes con posibilidad de captura                              ║
║  • Combates contra entrenadores con IA básica                                ║
║  • Sistema de tipos completo (18 tipos)                                      ║
║  • Cálculo de daño con STAB, críticos y efectividad                          ║
║  • Sistema de captura con diferentes Poké Balls                              ║
║  • Gestión de estados en batalla (quemado, paralizado, etc.)                 ║
║  • Timer automático para evitar batallas infinitas                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  🆕 INICIO DE BATALLAS:                                                      ║
║    • startWildBattle()      - Inicia encuentro con Pokémon salvaje           ║
║    • startTrainerBattle()   - Inicia combate contra entrenador               ║
║                                                                              ║
║  ⚔️ ACCIONES DE BATALLA:                                                     ║
║    • executeAttack()        - Ejecuta movimiento de ataque                   ║
║    • executeCatch()         - Intenta capturar Pokémon salvaje               ║
║    • executeRun()           - Intenta huir de la batalla                     ║
║    • executeSwitch()        - Cambia el Pokémon activo                       ║
║    • executeItem()          - Usa objeto en batalla                          ║
║                                                                              ║
║  🧮 CÁLCULOS DE BATALLA:                                                     ║
║    • calculateDamage()      - Calcula daño con todos los modificadores       ║
║    • calculateCatchRate()   - Calcula probabilidad de captura                ║
║    • calculateFleeChance()  - Calcula probabilidad de huida                  ║
║    • getTypeEffectiveness() - Determina efectividad de tipos                 ║
║                                                                              ║
║  🤖 IA Y TURNOS AUTOMÁTICOS:                                                 ║
║    • executeWildPokemonTurn()- Turno automático de Pokémon salvaje           ║
║    • executeOpponentTurn()  - Turno automático de entrenador                 ║
║                                                                              ║
║  📊 GESTIÓN DE ESTADO:                                                       ║
║    • getBattleState()       - Obtiene estado actual de la batalla            ║
║    • prepareBattleTeam()    - Prepara equipo para batalla                    ║
║    • calculateBattleRewards()- Calcula recompensas al ganar                  ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  1. Iniciar batalla salvaje:                                                 ║
║     const battle = await battleSystem.startWildBattle(                       ║
║       playerTeam, wildPikachu, { location: 'Bosque Verde' }                  ║
║     );                                                                       ║
║                                                                              ║
║  2. Realizar un ataque:                                                      ║
║     const result = await battleSystem.executeTurn(                           ║
║       battleId, playerId, 'attack', { moveIndex: 0 }                         ║
║     );                                                                       ║
║                                                                              ║
║  3. Intentar capturar:                                                       ║
║     const catchResult = await battleSystem.executeTurn(                      ║
║       battleId, playerId, 'catch', { ballType: 'ultraball' }                 ║
║     );                                                                       ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • Las batallas se autoclean después de 30 segundos de terminar              ║
║  • El tiempo máximo por batalla es de 5 minutos                              ║
║  • No se puede huir de batallas contra entrenadores                          ║
║  • Los Pokémon debilitados no pueden ser cambiados                           ║
║  • Los movimientos sin PP no pueden usarse                                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
import { pokemonDB } from './databasepokemon.js';
import { calculateExpGain, gainExperience } from './pokemonUtils.js';

class BattleSystem {
    constructor() {
        this.activeBattles = new Map();
        this.battleLogs = new Map();
        this.maxBattleDuration = 300000; // 5 minutos
    }

    // ===== INICIAR BATALLAS =====

    /**
     * Iniciar batalla salvaje
     */
    async startWildBattle(playerTeam, wildPokemon, options = {}) {
        const battleId = `wild_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const battle = {
            id: battleId,
            type: 'wild',
            turn: 0,
            playerTeam: this.prepareBattleTeam(playerTeam),
            wildPokemon: this.prepareWildPokemon(wildPokemon),
            state: 'active',
            canFlee: true,
            fleeAttempts: 0,
            rewards: {
                exp: 0,
                money: 0,
                items: []
            },
            log: [`¡Un ${wildPokemon.name} salvaje apareció!`],
            startedAt: Date.now(),
            location: options.location || 'unknown'
        };

        this.activeBattles.set(battleId, battle);
        this.startBattleTimer(battleId);

        return {
            battleId,
            battleState: this.getBattleState(battleId),
            actions: ['attack', 'catch', 'run', 'switch', 'item']
        };
    }

    /**
     * Iniciar batalla con entrenador
     */
    async startTrainerBattle(playerTeam, trainer, options = {}) {
        const battleId = `trainer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const battle = {
            id: battleId,
            type: 'trainer',
            trainer: trainer,
            turn: 0,
            playerTeam: this.prepareBattleTeam(playerTeam),
            opponentTeam: this.prepareTrainerTeam(trainer.team),
            currentPlayer: 0,
            currentOpponent: 0,
            state: 'active',
            canFlee: false, // No se puede huir de entrenadores
            rewards: {
                exp: 0,
                money: trainer.reward?.money || 100,
                badge: trainer.reward?.badge,
                tm: trainer.reward?.tm,
                items: []
            },
            log: [`${trainer.name}: "${trainer.dialogue?.start || '¡Te reto a una batalla!'}"`],
            startedAt: Date.now(),
            location: options.location || 'unknown'
        };

        this.activeBattles.set(battleId, battle);
        this.startBattleTimer(battleId);

        return {
            battleId,
            battleState: this.getBattleState(battleId),
            actions: ['attack', 'switch', 'item']
        };
    }

    // ===== EJECUTAR ACCIONES =====

    /**
     * Ejecutar turno de batalla
     */
    async executeTurn(battleId, playerId, action, data = {}) {
        const battle = this.activeBattles.get(battleId);
        if (!battle) {
            return { success: false, error: 'Batalla no encontrada' };
        }

        if (battle.state !== 'active') {
            return { success: false, error: 'La batalla ha terminado' };
        }

        battle.turn++;
        let result;

        switch (action) {
            case 'attack':
                result = await this.executeAttack(battle, data.moveIndex, data.target);
                break;
                
            case 'catch':
                result = await this.executeCatch(battle, data.ballType);
                break;
                
            case 'run':
                result = await this.executeRun(battle);
                break;
                
            case 'switch':
                result = await this.executeSwitch(battle, data.pokemonIndex);
                break;
                
            case 'item':
                result = await this.executeItem(battle, data.itemId, data.target);
                break;
                
            default:
                return { success: false, error: 'Acción no válida' };
        }

        // Si la batalla terminó
        if (result.battleEnded) {
            battle.state = 'finished';
            battle.result = result.result;
            
            // Calcular recompensas
            if (result.result === 'win') {
                this.calculateBattleRewards(battle);
            }
            
            // Limpiar batalla después de 30 segundos
            setTimeout(() => {
                this.activeBattles.delete(battleId);
                this.battleLogs.delete(battleId);
            }, 30000);
        }

        // Actualizar batalla
        this.activeBattles.set(battleId, battle);

        return {
            success: true,
            turn: battle.turn,
            action: action,
            result: result,
            battleState: this.getBattleState(battleId),
            battleEnded: result.battleEnded,
            rewards: battle.rewards
        };
    }

    /**
     * Ejecutar ataque
     */
    async executeAttack(battle, moveIndex, target = 0) {
        const playerPokemon = battle.playerTeam[battle.currentPlayer || 0];
        let opponentPokemon;

        if (battle.type === 'wild') {
            opponentPokemon = battle.wildPokemon;
        } else {
            opponentPokemon = battle.opponentTeam[battle.currentOpponent || 0];
        }

        // Verificar Pokémon válidos
        if (!playerPokemon || !opponentPokemon || playerPokemon.currentHP <= 0) {
            return { 
                success: false, 
                error: 'Pokémon no disponible',
                battleEnded: false 
            };
        }

        // Verificar movimiento
        if (moveIndex < 0 || moveIndex >= playerPokemon.moves.length) {
            return { 
                success: false, 
                error: 'Movimiento no válido',
                battleEnded: false 
            };
        }

        const move = playerPokemon.moves[moveIndex];
        
        // Verificar PP
        if (move.currentPP <= 0) {
            return { 
                success: false, 
                error: 'El movimiento no tiene PP',
                battleEnded: false 
            };
        }

        // Usar PP
        move.currentPP--;

        // Calcular daño
        const damageResult = this.calculateDamage(
            playerPokemon,
            opponentPokemon,
            move
        );

        // Aplicar daño
        opponentPokemon.currentHP = Math.max(0, opponentPokemon.currentHP - damageResult.damage);

        // Registrar en log
        battle.log.push(
            `${playerPokemon.name} usó ${move.name}! ` +
            `${damageResult.message} ` +
            `Causó ${damageResult.damage} puntos de daño.`
        );

        // Verificar si el oponente fue derrotado
        if (opponentPokemon.currentHP <= 0) {
            opponentPokemon.isFainted = true;
            battle.log.push(`¡${opponentPokemon.name} se debilitó!`);

            // Verificar si la batalla terminó
            if (battle.type === 'wild') {
                return {
                    success: true,
                    damage: damageResult,
                    opponentFainted: true,
                    battleEnded: true,
                    result: 'win',
                    message: `¡Has derrotado a ${opponentPokemon.name}!`
                };
            } else {
                // Batalla contra entrenador
                const nextOpponent = this.getNextAvailablePokemon(battle.opponentTeam);
                if (nextOpponent === -1) {
                    // Todos los Pokémon del entrenador debilitados
                    return {
                        success: true,
                        damage: damageResult,
                        opponentFainted: true,
                        battleEnded: true,
                        result: 'win',
                        message: `¡Has derrotado a ${battle.trainer.name}!`
                    };
                } else {
                    // Cambiar al siguiente Pokémon del entrenador
                    battle.currentOpponent = nextOpponent;
                    battle.log.push(`¡${battle.trainer.name} envía a ${battle.opponentTeam[nextOpponent].name}!`);
                    
                    // El entrenador ataca de vuelta
                    return await this.executeOpponentTurn(battle);
                }
            }
        }

        // Si no terminó, el oponente ataca (si es entrenador)
        if (battle.type === 'trainer') {
            return await this.executeOpponentTurn(battle);
        }

        // En batalla salvaje, el Pokémon salvaje ataca
        return await this.executeWildPokemonTurn(battle);
    }

    /**
     * Intentar capturar Pokémon salvaje
     */
    async executeCatch(battle, ballType = 'pokeball') {
        if (battle.type !== 'wild') {
            return { 
                success: false, 
                error: 'Solo puedes capturar Pokémon salvajes',
                battleEnded: false 
            };
        }

        const wildPokemon = battle.wildPokemon;
        const catchResult = this.calculateCatchRate(wildPokemon, ballType);

        battle.log.push(`Usaste una ${this.getBallName(ballType)}!`);

        if (catchResult.success) {
            // Captura exitosa
            battle.state = 'finished';
            battle.result = 'caught';
            
            return {
                success: true,
                caught: true,
                shakes: catchResult.shakes,
                battleEnded: true,
                result: 'caught',
                pokemon: wildPokemon,
                message: `¡Lo atrapaste! ¡${wildPokemon.name} fue atrapado!`
            };
        } else {
            // La captura falló
            battle.log.push(`¡Oh no! El Pokémon escapó.`);
            
            // El Pokémon salvaje ataca después del fallo
            return await this.executeWildPokemonTurn(battle);
        }
    }

    /**
     * Intentar huir
     */
    async executeRun(battle) {
        if (!battle.canFlee) {
            return { 
                success: false, 
                error: 'No puedes huir de esta batalla',
                battleEnded: false 
            };
        }

        battle.fleeAttempts++;
        const fleeChance = this.calculateFleeChance(battle);

        if (Math.random() * 100 <= fleeChance) {
            // Huida exitosa
            battle.state = 'finished';
            battle.result = 'fled';
            
            return {
                success: true,
                fled: true,
                battleEnded: true,
                result: 'fled',
                message: 'Has huido de la batalla.'
            };
        } else {
            // Huida fallida
            battle.log.push('¡No pudiste huir!');
            
            // El Pokémon salvaje ataca
            return await this.executeWildPokemonTurn(battle);
        }
    }

    /**
     * Cambiar Pokémon
     */
    async executeSwitch(battle, newIndex) {
        if (newIndex < 0 || newIndex >= battle.playerTeam.length) {
            return { 
                success: false, 
                error: 'Pokémon no válido',
                battleEnded: false 
            };
        }

        const newPokemon = battle.playerTeam[newIndex];
        
        if (newPokemon.currentHP <= 0) {
            return { 
                success: false, 
                error: 'Este Pokémon está debilitado',
                battleEnded: false 
            };
        }

        if (battle.currentPlayer === newIndex) {
            return { 
                success: false, 
                error: 'Ya está en batalla',
                battleEnded: false 
            };
        }

        // Cambiar Pokémon
        const oldPokemon = battle.playerTeam[battle.currentPlayer];
        battle.currentPlayer = newIndex;
        
        battle.log.push(
            `¡Has cambiado a ${oldPokemon.name} por ${newPokemon.name}!`
        );

        // El oponente ataca después del cambio
        if (battle.type === 'wild') {
            return await this.executeWildPokemonTurn(battle);
        } else {
            return await this.executeOpponentTurn(battle);
        }
    }

    // ===== CÁLCULOS DE BATALLA =====

    /**
     * Calcular daño del ataque
     */
    calculateDamage(attacker, defender, move) {
        const moveData = pokemonDB.moves[move.name];
        if (!moveData) {
            return {
                damage: 0,
                message: 'Movimiento no encontrado',
                critical: false,
                effective: 1
            };
        }

        // Determinar si es ataque físico o especial
        const isPhysical = this.isPhysicalMove(moveData.type);
        const attackStat = isPhysical ? attacker.currentStats.atk : attacker.currentStats.spa;
        const defenseStat = isPhysical ? defender.currentStats.def : defender.currentStats.spd;

        // Daño base
        let damage = (((2 * attacker.level / 5 + 2) * (moveData.power || 40) * attackStat / defenseStat) / 50) + 2;

        // STAB (Same Type Attack Bonus)
        if (attacker.types.includes(moveData.type)) {
            damage *= 1.5;
        }

        // Efectividad de tipos
        const effectiveness = this.getTypeEffectiveness(moveData.type, defender.types);
        damage *= effectiveness.multiplier;

        // Golpe crítico (6.25%)
        const isCritical = Math.random() < 0.0625;
        if (isCritical) {
            damage *= 1.5;
        }

        // Variación aleatoria (85%-100%)
        damage *= (0.85 + Math.random() * 0.15);

        // Redondear
        damage = Math.floor(damage);

        // Mínimo 1 de daño
        damage = Math.max(1, damage);

        return {
            damage: damage,
            message: effectiveness.message,
            critical: isCritical,
            effective: effectiveness.multiplier
        };
    }

    /**
     * Calcular tasa de captura
     */
    calculateCatchRate(pokemon, ballType) {
        const ballRates = {
            'pokeball': 1.0,
            'greatball': 1.5,
            'ultraball': 2.0,
            'masterball': 255.0
        };

        const ballRate = ballRates[ballType] || 1.0;
        
        // Estado del Pokémon
        let statusRate = 1.0;
        if (pokemon.status === 'sleep' || pokemon.status === 'freeze') {
            statusRate = 2.5;
        } else if (pokemon.status === 'paralysis' || pokemon.status === 'burn' || pokemon.status === 'poison') {
            statusRate = 1.5;
        }

        // Porcentaje de HP restante
        const hpRate = (3 * pokemon.maxHP - 2 * pokemon.currentHP) / (3 * pokemon.maxHP);

        // Tasa de captura base del Pokémon
        const species = pokemonDB.pokemons[pokemon.speciesId];
        const catchRate = species?.catchRate || 45;

        // Fórmula de captura
        const a = catchRate * ballRate * hpRate * statusRate;
        const b = (65536 / Math.pow(255 / a, 0.1875));

        // Determinar número de shakes
        let shakes = 0;
        for (let i = 0; i < 4; i++) {
            if (Math.random() * 65536 < b) {
                shakes++;
            } else {
                break;
            }
        }

        // Captura exitosa si hay 4 shakes
        const success = shakes === 4;

        return {
            success: success,
            shakes: shakes,
            catchRate: a,
            shakeThreshold: b
        };
    }

    /**
     * Calcular probabilidad de huida
     */
    calculateFleeChance(battle) {
        const playerPokemon = battle.playerTeam[battle.currentPlayer || 0];
        const wildPokemon = battle.wildPokemon;

        if (!playerPokemon || !wildPokemon) return 0;

        // Fórmula de huida
        const a = playerPokemon.currentStats.spe * 128 / wildPokemon.currentStats.spe;
        const b = battle.fleeAttempts * 30;
        
        return Math.min(100, a + b);
    }

    // ===== UTILIDADES =====

    /**
     * Preparar equipo para batalla
     */
    prepareBattleTeam(team) {
        return team.map(pokemon => ({
            ...pokemon,
            originalHP: pokemon.currentHP,
            moves: pokemon.moves.map(move => ({
                ...move,
                originalPP: move.currentPP
            }))
        }));
    }

    /**
     * Preparar Pokémon salvaje
     */
    prepareWildPokemon(pokemon) {
        return {
            ...pokemon,
            originalHP: pokemon.currentHP
        };
    }

    /**
     * Preparar equipo de entrenador
     */
    prepareTrainerTeam(team) {
        return team.map(pokemon => ({
            ...pokemon,
            originalHP: pokemon.stats?.hp || pokemon.currentHP,
            currentHP: pokemon.stats?.hp || pokemon.currentHP,
            maxHP: pokemon.stats?.hp || pokemon.currentHP,
            moves: pokemon.moves || ['Placaje'],
            isFainted: false
        }));
    }

    /**
     * Determinar efectividad de tipos
     */
    getTypeEffectiveness(moveType, defenderTypes) {
        let multiplier = 1;
        let message = '';

        for (const defenderType of defenderTypes) {
            const typeInfo = pokemonDB.typeChart[defenderType];
            if (!typeInfo) continue;

            if (typeInfo.weak.includes(moveType)) {
                multiplier *= 2;
                message = '¡Es muy eficaz!';
            } else if (typeInfo.super.includes(moveType)) {
                multiplier *= 0.5;
                message = 'No es muy eficaz...';
            } else if (typeInfo.immune.includes(moveType)) {
                multiplier = 0;
                message = 'No afecta a...';
            }
        }

        if (multiplier > 1) {
            message = '¡Es muy eficaz!';
        } else if (multiplier < 1 && multiplier > 0) {
            message = 'No es muy eficaz...';
        } else if (multiplier === 0) {
            message = 'No afecta a...';
        }

        return { multiplier, message };
    }

    /**
     * Determinar si movimiento es físico
     */
    isPhysicalMove(moveType) {
        const physicalTypes = [
            'Normal', 'Lucha', 'Volador', 'Veneno', 'Tierra',
            'Roca', 'Bicho', 'Fantasma', 'Acero'
        ];
        return physicalTypes.includes(moveType);
    }

    /**
     * Obtener siguiente Pokémon disponible
     */
    getNextAvailablePokemon(team) {
        for (let i = 0; i < team.length; i++) {
            if (team[i].currentHP > 0 && !team[i].isFainted) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Ejecutar turno del Pokémon salvaje
     */
    async executeWildPokemonTurn(battle) {
        const wildPokemon = battle.wildPokemon;
        const playerPokemon = battle.playerTeam[battle.currentPlayer || 0];

        if (!wildPokemon || !playerPokemon) {
            return { battleEnded: false };
        }

        // Seleccionar movimiento aleatorio
        const moveIndex = Math.floor(Math.random() * wildPokemon.moves.length);
        const move = wildPokemon.moves[moveIndex];

        // Calcular daño
        const damageResult = this.calculateDamage(wildPokemon, playerPokemon, move);

        // Aplicar daño
        playerPokemon.currentHP = Math.max(0, playerPokemon.currentHP - damageResult.damage);

        // Registrar en log
        battle.log.push(
            `${wildPokemon.name} usó ${move.name}! ` +
            `${damageResult.message} ` +
            `Causó ${damageResult.damage} puntos de daño.`
        );

        // Verificar si el jugador fue derrotado
        if (playerPokemon.currentHP <= 0) {
            playerPokemon.isFainted = true;
            battle.log.push(`¡${playerPokemon.name} se debilitó!`);

            // Verificar si hay más Pokémon disponibles
            const nextPlayer = this.getNextAvailablePokemon(battle.playerTeam);
            if (nextPlayer === -1) {
                // Todos los Pokémon debilitados
                return {
                    success: true,
                    damage: damageResult,
                    playerFainted: true,
                    battleEnded: true,
                    result: 'lose',
                    message: '¡Todos tus Pokémon se han debilitado!'
                };
            } else {
                // Cambiar al siguiente Pokémon
                battle.currentPlayer = nextPlayer;
                battle.log.push(`¡Envías a ${battle.playerTeam[nextPlayer].name}!`);
            }
        }

        return {
            success: true,
            damage: damageResult,
            playerFainted: playerPokemon.currentHP <= 0,
            battleEnded: false
        };
    }

    /**
     * Ejecutar turno del entrenador
     */
    async executeOpponentTurn(battle) {
        const opponentPokemon = battle.opponentTeam[battle.currentOpponent || 0];
        const playerPokemon = battle.playerTeam[battle.currentPlayer || 0];

        if (!opponentPokemon || !playerPokemon) {
            return { battleEnded: false };
        }

        // IA simple: seleccionar movimiento aleatorio
        const moveIndex = Math.floor(Math.random() * opponentPokemon.moves.length);
        const move = { name: opponentPokemon.moves[moveIndex] };

        // Calcular daño
        const damageResult = this.calculateDamage(opponentPokemon, playerPokemon, move);

        // Aplicar daño
        playerPokemon.currentHP = Math.max(0, playerPokemon.currentHP - damageResult.damage);

        // Registrar en log
        battle.log.push(
            `${opponentPokemon.name} usó ${move.name}! ` +
            `${damageResult.message} ` +
            `Causó ${damageResult.damage} puntos de daño.`
        );

        // Verificar si el jugador fue derrotado
        if (playerPokemon.currentHP <= 0) {
            playerPokemon.isFainted = true;
            battle.log.push(`¡${playerPokemon.name} se debilitó!`);

            // Verificar si hay más Pokémon disponibles
            const nextPlayer = this.getNextAvailablePokemon(battle.playerTeam);
            if (nextPlayer === -1) {
                // Todos los Pokémon debilitados
                return {
                    success: true,
                    damage: damageResult,
                    playerFainted: true,
                    battleEnded: true,
                    result: 'lose',
                    message: '¡Todos tus Pokémon se han debilitado!'
                };
            } else {
                // Cambiar al siguiente Pokémon
                battle.currentPlayer = nextPlayer;
                battle.log.push(`¡Envías a ${battle.playerTeam[nextPlayer].name}!`);
            }
        }

        return {
            success: true,
            damage: damageResult,
            playerFainted: playerPokemon.currentHP <= 0,
            battleEnded: false
        };
    }

    /**
     * Calcular recompensas de batalla
     */
    calculateBattleRewards(battle) {
        if (battle.type === 'wild' && battle.result === 'win') {
            // Experiencia por derrotar Pokémon salvaje
            const playerPokemon = battle.playerTeam[battle.currentPlayer];
            const wildPokemon = battle.wildPokemon;
            
            battle.rewards.exp = calculateExpGain(
                wildPokemon,
                playerPokemon.level,
                false
            );
            
            // Dinero aleatorio
            battle.rewards.money = Math.floor(Math.random() * 100) + 50;
        }
    }

    /**
     * Obtener estado de batalla
     */
    getBattleState(battleId) {
        const battle = this.activeBattles.get(battleId);
        if (!battle) return null;

        const state = {
            id: battle.id,
            type: battle.type,
            turn: battle.turn,
            state: battle.state,
            canFlee: battle.canFlee,
            log: battle.log.slice(-5), // Últimos 5 mensajes
            startedAt: battle.startedAt
        };

        if (battle.type === 'wild') {
            state.playerPokemon = battle.playerTeam[battle.currentPlayer || 0];
            state.wildPokemon = battle.wildPokemon;
        } else {
            state.playerPokemon = battle.playerTeam[battle.currentPlayer || 0];
            state.opponentPokemon = battle.opponentTeam[battle.currentOpponent || 0];
            state.trainer = battle.trainer;
        }

        return state;
    }

    /**
     * Obtener nombre de pokéball
     */
    getBallName(ballType) {
        const ballNames = {
            'pokeball': 'Poké Ball',
            'greatball': 'Super Ball',
            'ultraball': 'Ultra Ball',
            'masterball': 'Master Ball',
            'safariball': 'Safari Ball'
        };
        return ballNames[ballType] || ballType;
    }

    /**
     * Timer para batallas largas
     */
    startBattleTimer(battleId) {
        setTimeout(() => {
            const battle = this.activeBattles.get(battleId);
            if (battle && battle.state === 'active') {
                battle.state = 'timeout';
                battle.result = 'timeout';
                battle.log.push('La batalla ha terminado por tiempo.');
            }
        }, this.maxBattleDuration);
    }
}

// Exportar instancia global
const battleSystem = new BattleSystem();
export default battleSystem;
