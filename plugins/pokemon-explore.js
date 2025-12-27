/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    explore.js                                                   ║
║  📋 Módulo:     Sistema de Exploración y Batallas Pokémon                    ║
║  ⚙️ Versión:    2.0.0                                                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Comando principal para explorar el mundo Pokémon y participar en batallas   ║
║  por turnos contra Pokémon salvajes. Sistema interactivo con menús,          ║
║  estadísticas en tiempo real y gestión completa del combate.                 ║
║                                                                              ║
║  ⚠️  IMPORTANTE: Este comando NO crea usuarios. Para comenzar la aventura,   ║
║      el jugador debe usar primero el comando *.start*                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  INICIO:                                                                     ║
║    • Verifica si el usuario existe (creado con .start)                       ║
║    • Si no existe, redirige a usar .start                                    ║
║                                                                              ║
║  EXPLORACIÓN:                                                                ║
║    • Busca encuentros aleatorios en la ubicación actual                      ║
║    • Encuentros: Pokémon salvaje (70%) / Nada (25%) / Entrenador (5%)        ║
║                                                                              ║
║  BATALLA:                                                                    ║
║    • Sistema por turnos con 4 opciones principales                           ║
║    • Menús interactivos: Ataques / Mochila / Equipo / Huir                   ║
║    • Cálculos de daño: STAB, críticos, efectividad de tipos                  ║
║    • Sistema de captura con diferentes Poké Balls                            ║
║                                                                              ║
║  INTERFAZ:                                                                   ║
║    • Barras de vida visuales con colores (🟩🟨🟥)                           ║
║    • Auto-limpieza de mensajes en grupos (si el bot es admin)                ║
║    • Sesiones por usuario con timeout de 5 minutos                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎮 COMANDOS RELACIONADOS:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  PRINCIPALES:                                                                ║
║    • .start     - Comenzar aventura (crea usuario)                           ║
║    • .explore   - Explorar y buscar batallas (ESTE COMANDO)                  ║
║    • .team      - Ver tu equipo Pokémon                                      ║
║                                                                              ║
║  DURANTE BATALLA:                                                            ║
║    • [1-4]      - Seleccionar opción del menú                                ║
║    • [número]   - Seleccionar ataque/item/Pokémon                            ║
║    • v / 5      - Volver al menú principal                                   ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • El usuario DEBE usar .start antes de poder usar .explore                  ║
║  • Las sesiones de batalla expiran después de 5 minutos de inactividad       ║
║  • No se puede tener batallas simultáneas en diferentes chats                ║
║  • La limpieza de mensajes solo funciona si el bot es administrador          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// IMPORTANTE: Verifica que estos archivos existan en tu estructura
import gameEngine from '../lib/gameEngine.js'
import battleSystem from '../lib/battleEngine.js'
import userDB from '../lib/userDatabase.js'

// Sistema de sesiones global
if (!global.pokemonSess) global.pokemonSess = {}

let handler = async (m, { conn, text, usedPrefix, command, isBotAdmin }) => {
    let userId = m.sender
    
    // ===== PASO 1: VERIFICAR USUARIO EXISTENTE =====
    let user = await userDB.getUser(userId)
    
    if (!user) {
        return m.reply(
            `❌ *¡No eres un entrenador Pokémon aún!*\n\n` +
            `Para comenzar tu aventura, usa el comando:\n` +
            `» *${usedPrefix}start*\n\n` +
            `¡Elige a tu primer compañero Pokémon y comienza tu viaje!`
        )
    }

    // ===== PASO 2: VERIFICAR EQUIPO VACÍO =====
    if (!user.team || user.team.length === 0) {
        return m.reply(
            `❌ *¡No tienes Pokémon en tu equipo!*\n\n` +
            `Usa el comando:\n` +
            `» *${usedPrefix}start*\n\n` +
            `Para elegir tu Pokémon inicial y comenzar.`
        )
    }

    // ===== PASO 3: GESTIÓN DE SESIONES =====
    let battle = null
    let session = global.pokemonSess[userId]
    
    // Limpiar sesiones expiradas (5 minutos)
    if (session && Date.now() - session.timestamp > 300000) {
        delete global.pokemonSess[userId]
        session = null
        
        // También limpiar batalla en sistema si existe
        if (session?.battleId) {
            // Aquí deberías tener un método para terminar batallas
            // battleSystem.endBattle(session.battleId)
        }
    }

    // Buscar batalla activa
    if (session?.battleId) {
        const gameState = await gameEngine.getGameState(userId)
        if (gameState.activeEncounter && gameState.activeEncounter.battleId) {
            battle = battleSystem.getBattleState(gameState.activeEncounter.battleId)
        }
    }

    // ===== PASO 4: VERIFICAR BATALLA EN OTRO CHAT =====
    if (session && session.chatId !== m.chat) {
        return m.reply(
            `⚠️ *Ya estás en batalla en otro chat.*\n\n` +
            `Chat actual: *${m.chat}*\n` +
            `Chat de batalla: *${session.chatId}*\n\n` +
            `Usa *${usedPrefix}endbattle* para terminar la batalla anterior.`
        )
    }

    // ===== PASO 5: INICIAR NUEVA EXPLORACIÓN =====
    if (!battle || battle.state !== 'active') {
        // Explorar ubicación actual
        const exploreResult = await gameEngine.exploreLocation(userId)
        
        if (!exploreResult.success) {
            return m.reply(`❌ Error al explorar: ${exploreResult.error}`)
        }
        
        if (!exploreResult.encounter || exploreResult.encounter.type === 'nothing') {
            return m.reply(
                `🍃 *Has explorado el área...*\n\n` +
                `No encontraste nada interesante esta vez.\n` +
                `Sigue explorando para encontrar Pokémon salvajes.\n\n` +
                `📍 Ubicación: *${user.progress?.location || 'Desconocida'}*`
            )
        }

        // Iniciar batalla desde el encuentro
        const battleStart = await gameEngine.startBattleFromEncounter(userId)
        if (!battleStart.success) {
            return m.reply(`❌ Error al iniciar batalla: ${battleStart.error}`)
        }

        // Crear/actualizar sesión
        global.pokemonSess[userId] = {
            view: 'MAIN',
            timestamp: Date.now(),
            battleId: battleStart.battle.battleId,
            chatId: m.chat,
            lastMsg: null,
            userData: user
        }

        battle = battleStart.battle.battleState
        return renderBattleUI(conn, m, battle, 'MAIN', userId)
    }

    // ===== PASO 6: BATALLA ACTIVA - PROCESAR ACCIÓN =====
    let input = text?.trim().toLowerCase()
    let currentSession = global.pokemonSess[userId]
    
    // Actualizar timestamp de actividad
    currentSession.timestamp = Date.now()

    // Limpiar mensaje anterior (solo si es admin en grupo)
    if (currentSession.lastMsg && m.isGroup && isBotAdmin) {
        try {
            await conn.sendMessage(m.chat, { 
                delete: { 
                    remoteJid: m.chat, 
                    fromMe: true, 
                    id: currentSession.lastMsg 
                } 
            })
        } catch (e) {
            console.log('No se pudo eliminar mensaje anterior (posiblemente no admin)')
        }
    }

    // ===== NAVEGACIÓN POR MENÚS =====
    let result
    switch (currentSession.view) {
        case 'MAIN':
            // Menú principal
            if (input === '1') { 
                currentSession.view = 'ATTACKS'
                return renderBattleUI(conn, m, battle, 'ATTACKS', userId)
            }
            if (input === '2') { 
                currentSession.view = 'BAG'
                return renderBattleUI(conn, m, battle, 'BAG', userId)
            }
            if (input === '3') { 
                currentSession.view = 'TEAM'
                return renderBattleUI(conn, m, battle, 'TEAM', userId)
            }
            if (input === '4') {
                // Intentar huir
                result = await gameEngine.executeBattleAction(userId, 'run')
                if (result.success && result.battleEnded) {
                    delete global.pokemonSess[userId]
                    return m.reply('🏃 *¡Has escapado exitosamente del combate!*')
                }
                // Si no pudo huir, actualizar battle state
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            break

        case 'ATTACKS':
            // Menú de ataques
            if (input === '5' || input === 'v' || input === 'volver') { 
                currentSession.view = 'MAIN'
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            
            let moveIndex = parseInt(input) - 1
            if (moveIndex >= 0 && moveIndex < 4) {
                result = await gameEngine.executeBattleAction(userId, 'attack', {
                    moveIndex: moveIndex
                })
                currentSession.view = 'MAIN'
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            break

        case 'BAG':
            // Menú de mochila
            if (input === '5' || input === 'v' || input === 'volver') { 
                currentSession.view = 'MAIN'
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            
            // Opción 1: Poké Ball
            if (input === '1' && user.inventory?.pokeball > 0) {
                result = await gameEngine.executeBattleAction(userId, 'catch', {
                    ballType: 'pokeball'
                })
                currentSession.view = 'MAIN'
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            
            // Opción 2: Poción
            if (input === '2' && user.inventory?.potion > 0) {
                result = await gameEngine.executeBattleAction(userId, 'item', {
                    itemId: 'potion'
                })
                currentSession.view = 'MAIN'
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            
            // Opción 3: Revivir
            if (input === '3' && user.inventory?.revive > 0) {
                result = await gameEngine.executeBattleAction(userId, 'item', {
                    itemId: 'revive'
                })
                currentSession.view = 'MAIN'
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            
            // Opción 4: Ultra Ball
            if (input === '4' && user.inventory?.ultraball > 0) {
                result = await gameEngine.executeBattleAction(userId, 'catch', {
                    ballType: 'ultraball'
                })
                currentSession.view = 'MAIN'
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            break

        case 'TEAM':
            // Menú de equipo
            if (input === '5' || input === 'v' || input === 'volver') { 
                currentSession.view = 'MAIN'
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            
            let pokemonIndex = parseInt(input) - 1
            if (pokemonIndex >= 0 && pokemonIndex < user.team.length) {
                result = await gameEngine.executeBattleAction(userId, 'switch', {
                    pokemonIndex: pokemonIndex
                })
                currentSession.view = 'MAIN'
                battle = result.battle?.battleState || battle
                return renderBattleUI(conn, m, battle, 'MAIN', userId)
            }
            break
    }

    // ===== PASO 7: INPUT INVÁLIDO - REFRESCAR INTERFAZ =====
    return renderBattleUI(conn, m, battle, currentSession.view, userId)
}

// ===== FUNCIÓN PARA RENDERIZAR LA INTERFAZ =====
async function renderBattleUI(conn, m, battle, view, userId) {
    const session = global.pokemonSess[userId]
    if (!session) return
    
    // Obtener datos actualizados del usuario
    let user = await userDB.getUser(userId)
    if (!user) return
    
    // Determinar Pokémon activo y oponente
    let playerPokemon = user.team[0] // Pokémon principal
    let opponentPokemon = battle.wildPokemon || battle.opponentPokemon
    
    // ===== CONSTRUIR ENCABEZADO =====
    let header = `⚔️ *COMBATE POKÉMON* ⚔️\n`
    header += `╔══════════════════════╗\n`
    
    // Pokémon oponente
    if (opponentPokemon) {
        header += `║ 🔴 ${opponentPokemon.name?.toUpperCase() || 'OPONENTE'} Lv.${opponentPokemon.level || '?'}\n`
        if (opponentPokemon.currentHP !== undefined) {
            header += `║ ${drawBar(opponentPokemon.currentHP, opponentPokemon.maxHP || opponentPokemon.hp)} ${opponentPokemon.currentHP}/${opponentPokemon.maxHP || opponentPokemon.hp}HP\n`
        }
    } else {
        header += `║ 🔴 ??? Lv.??\n`
        header += `║ ${drawBar(0, 100)} 0/100HP\n`
    }
    
    header += `╠══════════════════════╣\n`
    
    // Pokémon del jugador
    if (playerPokemon) {
        header += `║ 🔵 ${playerPokemon.name?.toUpperCase() || 'TU POKÉMON'} Lv.${playerPokemon.level || '?'}\n`
        if (playerPokemon.currentHP !== undefined) {
            header += `║ ${drawBar(playerPokemon.currentHP, playerPokemon.maxHP || playerPokemon.hp)} ${playerPokemon.currentHP}/${playerPokemon.maxHP || playerPokemon.hp}HP\n`
        } else if (playerPokemon.hp !== undefined) {
            header += `║ ${drawBar(playerPokemon.hp, playerPokemon.maxHp || 100)} ${playerPokemon.hp}/${playerPokemon.maxHp || 100}HP\n`
        }
    } else {
        header += `║ 🔵 ??? Lv.??\n`
        header += `║ ${drawBar(0, 100)} 0/100HP\n`
    }
    
    header += `╚══════════════════════╝\n\n`

    // ===== CONSTRUIR CUERPO SEGÚN VISTA =====
    let body = ''
    let footer = ''

    switch (view) {
        case 'MAIN':
            body = `💬 ${battle.log?.[battle.log.length - 1] || '¿Qué debe hacer tu Pokémon?'}\n\n`
            body += `1️⃣ ATACAR • 2️⃣ MOCHILA\n`
            body += `3️⃣ EQUIPO • 4️⃣ HUIR\n`
            footer = `📝 *Escribe el número (1-4)*`
            break

        case 'ATTACKS':
            body = `💥 *ATAQUES DISPONIBLES:*\n`
            if (playerPokemon?.moves && Array.isArray(playerPokemon.moves)) {
                playerPokemon.moves.forEach((move, i) => {
                    if (i < 4) { // Máximo 4 movimientos
                        body += `${i + 1}. ${move.name || move}\n`
                    }
                })
                // Completar con movimientos por defecto si hay menos de 4
                for (let i = (playerPokemon.moves.length || 0); i < 4; i++) {
                    body += `${i + 1}. [Vacío]\n`
                }
            } else {
                body += `1. Placaje\n2. Gruñido\n3. [Vacío]\n4. [Vacío]\n`
            }
            body += `5. 🔙 VOLVER\n`
            footer = `⚡ *Selecciona 1-4 para atacar*`
            break

        case 'BAG':
            body = `🎒 *MOCHILA:*\n`
            const inventory = user.inventory || {}
            body += `1. 🔴 Poké Ball: x${inventory.pokeball || 0}\n`
            body += `2. 🧪 Poción: x${inventory.potion || 0}\n`
            body += `3. ⚡ Revivir: x${inventory.revive || 0}\n`
            body += `4. ✨ Ultra Ball: x${inventory.ultraball || 0}\n`
            body += `5. 🔙 VOLVER\n`
            footer = `🎯 *Usa 1-4 para usar item*`
            break

        case 'TEAM':
            body = `👥 *EQUIPO (${user.team?.length || 0}/6):*\n`
            if (user.team && user.team.length > 0) {
                user.team.forEach((pokemon, i) => {
                    if (i < 6) { // Máximo 6 Pokémon
                        const currentHP = pokemon.currentHP || pokemon.hp || 0
                        const maxHP = pokemon.maxHP || pokemon.maxHp || 100
                        const percentage = (currentHP / maxHP) * 100
                        
                        let status = '✅'
                        if (currentHP <= 0) status = '💀'
                        else if (percentage < 30) status = '🟥'
                        else if (percentage < 50) status = '🟨'
                        
                        body += `${i + 1}. ${status} ${pokemon.name || 'Pokémon'} Lv.${pokemon.level || '?'} [${currentHP}/${maxHP}HP]\n`
                    }
                })
            } else {
                body += `No tienes Pokémon en tu equipo.\n`
            }
            body += `5. 🔙 VOLVER\n`
            footer = `🔄 *Escribe 1-${Math.min(6, user.team?.length || 0)} para cambiar Pokémon*`
            break
    }

    // ===== VERIFICAR SI LA BATALLA TERMINÓ =====
    if (battle.state === 'finished' || battle.result) {
        // Mensaje de fin de batalla
        header = `🏁 *BATALLA TERMINADA*\n\n`
        
        if (battle.result === 'win') {
            body = `📊 *Resultado:* 🏆 VICTORIA\n\n`
        } else if (battle.result === 'lose') {
            body = `📊 *Resultado:* 💔 DERROTA\n\n`
        } else if (battle.result === 'caught') {
            body = `📊 *Resultado:* 🎣 CAPTURA EXITOSA\n\n`
        } else if (battle.result === 'fled') {
            body = `📊 *Resultado:* 🏃 HUÍDA EXITOSA\n\n`
        } else {
            body = `📊 *Resultado:* FINALIZADA\n\n`
        }
        
        // Mostrar últimos logs
        if (battle.log && battle.log.length > 0) {
            const recentLogs = battle.log.slice(-3)
            body += `📜 *Últimas acciones:*\n`
            recentLogs.forEach(log => {
                body += `• ${log}\n`
            })
        }
        
        footer = `\n🎮 *Usa* \`${usedPrefix}explore\` *para buscar otra batalla*`
        
        // Limpiar sesión
        delete global.pokemonSess[userId]
    }

    // ===== ENVIAR MENSAJE =====
    const msg = await conn.reply(m.chat, header + body + '\n' + footer, m)
    
    // Guardar ID del mensaje para posible limpieza
    if (session) {
        session.lastMsg = msg.key.id
    }
    
    return msg
}

// ===== FUNCIÓN PARA DIBUJAR BARRAS DE VIDA =====
function drawBar(current, max) {
    if (max <= 0) max = 100
    if (current < 0) current = 0
    
    const width = 10
    const percentage = current / max
    const filled = Math.max(0, Math.min(width, Math.round(percentage * width)))
    
    if (percentage >= 0.8) {
        return '🟩'.repeat(filled) + '⬜'.repeat(width - filled)
    } else if (percentage >= 0.3) {
        return '🟨'.repeat(filled) + '⬜'.repeat(width - filled)
    } else {
        return '🟥'.repeat(filled) + '⬜'.repeat(width - filled)
    }
}

// ===== CONFIGURACIÓN DEL HANDLER =====
handler.command = ['explore', 'hunt', 'explorar', 'pk', 'atacar', 'battle']
handler.tags = ['rpg', 'games', 'pokemon']
handler.help = [
    'explore - Buscar Pokémon salvajes para batallar',
    'hunt - Alternativa para explore',
    'explorar - Versión en español',
    'pk - Abreviatura de Pokémon',
    'atacar - Continuar batalla activa',
    'battle - Iniciar/continuar batalla'
]

// Exportar handler
export default handler
