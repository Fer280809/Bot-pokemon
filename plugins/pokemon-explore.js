import gameEngine from './lib/gameEngine.js';
import battleSystem from './lib/battleEngine.js';
import userDB from './lib/userDatabase.js';

if (!global.pokemonSess) global.pokemonSess = {};

let handler = async (m, { conn, text, usedPrefix, command, isBotAdmin }) => {
    let userId = m.sender;
    let user = await userDB.getUser(userId);
    
    if (!user) {
        // Crear usuario si no existe
        const createResult = await userDB.createUser(userId, m.name || "Entrenador");
        if (!createResult.success) {
            return m.reply('❌ Error al crear usuario. Usa *.start* para comenzar.');
        }
        user = createResult.user;
    }

    // Verificar que tenga Pokémon en equipo
    if (user.team.length === 0) {
        return m.reply('❌ No tienes Pokémon en tu equipo. Usa *.start* para comenzar.');
    }

    let session = global.pokemonSess[userId];
    let battle = null;
    
    // Buscar batalla activa en gameEngine
    const gameState = await gameEngine.getGameState(userId);
    if (gameState.activeEncounter && gameState.activeEncounter.battleId) {
        battle = battleSystem.getBattleState(gameState.activeEncounter.battleId);
    }

    // --- 1. INICIAR NUEVA BATALLA ---
    if (!battle || battle.state !== 'active') {
        const exploreResult = await gameEngine.exploreLocation(userId);
        
        if (!exploreResult.success || !exploreResult.encounter) {
            return m.reply(`🍃 Has explorado pero no encontraste nada...`);
        }
        
        // Iniciar batalla desde encuentro
        const battleStart = await gameEngine.startBattleFromEncounter(userId);
        if (!battleStart.success) {
            return m.reply(`❌ ${battleStart.error}`);
        }
        
        battle = battleStart.battle.battleState;
        global.pokemonSess[userId] = { 
            view: 'MAIN', 
            timestamp: Date.now(),
            battleId: battle.id,
            chatId: m.chat
        };
        
        return renderBattleUI(conn, m, battle, 'MAIN');
    }

    // --- 2. BATALLA ACTIVA ---
    let input = text?.trim().toLowerCase();
    let currentSess = global.pokemonSess[userId];
    
    if (currentSess.chatId !== m.chat) {
        return m.reply(`⚠️ Ya estás en batalla en otro chat. Usa *.endbattle* para terminarla.`);
    }

    // Limpiar mensaje anterior si es admin
    if (currentSess.lastMsg && m.isGroup && isBotAdmin) {
        try {
            await conn.sendMessage(m.chat, { 
                delete: { 
                    remoteJid: m.chat, 
                    fromMe: true, 
                    id: currentSess.lastMsg 
                } 
            });
        } catch (e) {}
    }

    // Procesar acción
    let result;
    switch (currentSess.view) {
        case 'MAIN':
            if (input === '1') { 
                currentSess.view = 'ATTACKS'; 
                return renderBattleUI(conn, m, battle, 'ATTACKS'); 
            }
            if (input === '2') { 
                currentSess.view = 'BAG'; 
                return renderBattleUI(conn, m, battle, 'BAG'); 
            }
            if (input === '3') { 
                currentSess.view = 'TEAM'; 
                return renderBattleUI(conn, m, battle, 'TEAM'); 
            }
            if (input === '4') {
                // Intentar huir
                result = await gameEngine.executeBattleAction(userId, 'run');
                if (result.success && result.battleEnded) {
                    delete global.pokemonSess[userId];
                    return m.reply('🏃 Has escapado del combate.');
                }
                break;
            }
            break;

        case 'ATTACKS':
            if (input === '5' || input === 'v') { 
                currentSess.view = 'MAIN'; 
                return renderBattleUI(conn, m, battle, 'MAIN'); 
            }
            let moveIdx = parseInt(input) - 1;
            if (moveIdx >= 0 && moveIdx < 4) {
                result = await gameEngine.executeBattleAction(userId, 'attack', {
                    moveIndex: moveIdx
                });
                currentSess.view = 'MAIN';
                battle = result.battle?.battleState || battle;
                return renderBattleUI(conn, m, battle, 'MAIN');
            }
            break;

        case 'BAG':
            if (input === '5' || input === 'v') { 
                currentSess.view = 'MAIN'; 
                return renderBattleUI(conn, m, battle, 'MAIN'); 
            }
            if (input === '1' && user.inventory.pokeball > 0) {
                result = await gameEngine.executeBattleAction(userId, 'catch', {
                    ballType: 'pokeball'
                });
                currentSess.view = 'MAIN';
                battle = result.battle?.battleState || battle;
                return renderBattleUI(conn, m, battle, 'MAIN');
            }
            break;
    }

    // Refrescar UI si input inválido
    return renderBattleUI(conn, m, battle, currentSess.view);
}

async function renderBattleUI(conn, m, battle, view) {
    const userId = m.sender;
    const sess = global.pokemonSess[userId];
    
    let user = await userDB.getUser(userId);
    let playerPokemon = user.team[0]; // Pokémon activo
    let opponentPokemon = battle.wildPokemon || battle.opponentPokemon;
    
    // Encabezado
    let header = `⚔️ *COMBATE POKÉMON* ⚔️\n`;
    header += `╔══════════════════════╗\n`;
    header += `║ 🔴 ${opponentPokemon?.name?.toUpperCase() || 'OPONENTE'} Lv.${opponentPokemon?.level || '?'}\n`;
    
    if (opponentPokemon?.currentHP) {
        header += `║ ${drawBar(opponentPokemon.currentHP, opponentPokemon.maxHP)} ${opponentPokemon.currentHP}/${opponentPokemon.maxHP}HP\n`;
    }
    
    header += `╠══════════════════════╣\n`;
    header += `║ 🔵 ${playerPokemon?.name?.toUpperCase() || 'TU POKÉMON'} Lv.${playerPokemon?.level || '?'}\n`;
    
    if (playerPokemon?.currentHP) {
        header += `║ ${drawBar(playerPokemon.currentHP, playerPokemon.maxHP)} ${playerPokemon.currentHP}/${playerPokemon.maxHP}HP\n`;
    }
    
    header += `╚══════════════════════╝\n\n`;

    let body = '', footer = '';

    switch (view) {
        case 'MAIN':
            body = `💬 ${battle.log?.[battle.log.length - 1] || '¿Qué debe hacer tu Pokémon?'}\n\n`;
            body += `1️⃣ ATACAR • 2️⃣ MOCHILA\n`;
            body += `3️⃣ EQUIPO • 4️⃣ HUIR\n`;
            footer = `📝 Escribe el número (1-4)`;
            break;
            
        case 'ATTACKS':
            body = `💥 *ATAQUES DISPONIBLES:*\n`;
            if (playerPokemon?.moves) {
                playerPokemon.moves.forEach((move, i) => {
                    body += `${i + 1}. ${move.name || move}\n`;
                });
            } else {
                body += `1. Placaje\n2. Gruñido\n`;
            }
            body += `5. 🔙 VOLVER\n`;
            footer = `⚡ Selecciona 1-4 para atacar`;
            break;
            
        case 'BAG':
            body = `🎒 *MOCHILA:*\n`;
            body += `1. 🔴 Poké Ball: x${user.inventory?.pokeball || 0}\n`;
            body += `2. 🧪 Poción: x${user.inventory?.potion || 0}\n`;
            body += `3. ⚡ Revivir: x${user.inventory?.revive || 0}\n`;
            body += `4. ✨ Ultra Ball: x${user.inventory?.ultraball || 0}\n`;
            body += `5. 🔙 VOLVER\n`;
            footer = `🎯 Usa 1-4 para usar item`;
            break;
    }

    // Verificar si la batalla terminó
    if (battle.state === 'finished' || battle.result) {
        delete global.pokemonSess[userId];
        
        header = `🏁 *BATALLA TERMINADA*\n`;
        body = `📊 Resultado: ${battle.result === 'win' ? '🏆 VICTORIA' : '💔 DERROTA'}\n`;
        
        if (battle.log) {
            body += battle.log.slice(-3).join('\n');
        }
        
        footer = `\n🎮 Usa *.explore* para buscar otra batalla`;
    }

    const msg = await conn.reply(m.chat, header + body + '\n' + footer, m);
    
    if (sess) {
        sess.lastMsg = msg.key.id;
        sess.timestamp = Date.now();
    }
    
    return msg;
}

function drawBar(cur, max) {
    const width = 10;
    const perc = Math.max(0, Math.min(width, Math.round((cur / max) * width)));
    
    if (perc >= 8) return '🟩'.repeat(perc) + '⬜'.repeat(width - perc);
    if (perc >= 4) return '🟨'.repeat(perc) + '⬜'.repeat(width - perc);
    return '🟥'.repeat(perc) + '⬜'.repeat(width - perc);
}

handler.command = ['explore', 'hunt', 'explorar', 'pk', 'atacar'];
handler.tags = ['rpg', 'games'];
handler.help = ['explore', 'hunt', 'explorar', 'pk', 'atacar'].map(cmd => 
    `${cmd} - Inicia/continúa una batalla Pokémon`
);

export default handler;
