import { smsg } from "./lib/simple.js"
import { format } from "util"
import { fileURLToPath } from "url"
import path, { join } from "path"
import fs, { unwatchFile, watchFile } from "fs"
import chalk from "chalk"
import fetch from "node-fetch"
import ws from "ws"
// Importación necesaria para la nueva detección de admins
import { jidNormalizedUser, areJidsSameUser } from '@whiskeysockets/baileys'

// ============ SISTEMA POKÉMON ============
// Importación de los núcleos del sistema Pokémon
import gameEngine from './lib/gameEngine.js'
import userDB from './lib/userDatabase.js'
import saveManager from './lib/saveManager.js'
// =========================================

const isNumber = x => typeof x === "number" && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

// Variable global para el sistema Pokémon
global.pokemonSystem = {
    gameEngine: null,
    userDB: null,
    saveManager: null,
    battles: new Map(), // Mapa de batallas activas
    cooldowns: new Map() // Mapa de cooldowns por usuario
}

export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    this.uptime = this.uptime || Date.now()
    if (!chatUpdate) return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return
    
    // ============ INICIALIZACIÓN SISTEMA POKÉMON ============
    // Inicializar sistema Pokémon si no está cargado
    if (!global.pokemonSystem.gameEngine) {
        try {
            global.pokemonSystem.gameEngine = gameEngine
            global.pokemonSystem.userDB = userDB
            global.pokemonSystem.saveManager = saveManager
            
            console.log(chalk.green('✅ Sistema Pokémon inicializado correctamente'))
            
            // Iniciar el save manager
            if (saveManager && typeof saveManager.start === 'function') {
                saveManager.start()
                console.log(chalk.cyan('🔄 Save Manager iniciado'))
            }
        } catch (error) {
            console.error(chalk.red('❌ Error al inicializar sistema Pokémon:'), error)
        }
    }
    // =========================================================
    
    if (global.db.data == null)
        await global.loadDatabase()
    
    try {
        m = smsg(this, m) || m
        if (!m) return
        m.exp = 0
        
        try {
            const user = global.db.data.users[m.sender]
            if (typeof user !== "object") {
                global.db.data.users[m.sender] = {}
            }
            if (user) {
                if (!("name" in user)) user.name = m.name
                if (!("exp" in user) || !isNumber(user.exp)) user.exp = 0
                if (!("coin" in user) || !isNumber(user.coin)) user.coin = 0
                if (!("bank" in user) || !isNumber(user.bank)) user.bank = 0
                if (!("level" in user) || !isNumber(user.level)) user.level = 0
                if (!("health" in user) || !isNumber(user.health)) user.health = 100
                if (!("genre" in user)) user.genre = ""
                if (!("birth" in user)) user.birth = ""
                if (!("marry" in user)) user.marry = ""
                if (!("description" in user)) user.description = ""
                if (!("packstickers" in user)) user.packstickers = null
                if (!("premium" in user)) user.premium = false
                if (!("premiumTime" in user)) user.premiumTime = 0
                if (!("banned" in user)) user.banned = false
                if (!("bannedReason" in user)) user.bannedReason = ""
                if (!("commands" in user) || !isNumber(user.commands)) user.commands = 0
                if (!("afk" in user) || !isNumber(user.afk)) user.afk = -1
                if (!("afkReason" in user)) user.afkReason = ""
                if (!("warn" in user) || !isNumber(user.warn)) user.warn = 0
                
                // ============ INICIALIZACIÓN DATOS POKÉMON ============
                if (!("pokemon" in user)) {
                    user.pokemon = {
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
                // ======================================================
            } else {
                global.db.data.users[m.sender] = {
                    name: m.name,
                    exp: 0,
                    coin: 0,
                    bank: 0,
                    level: 0,
                    health: 100,
                    genre: "",
                    birth: "",
                    marry: "",
                    description: "",
                    packstickers: null,
                    premium: false,
                    premiumTime: 0,
                    banned: false,
                    bannedReason: "",
                    commands: 0,
                    afk: -1,
                    afkReason: "",
                    warn: 0,
                    // ============ DATOS POKÉMON POR DEFECTO ============
                    pokemon: {
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
                    // ====================================================
                }
            }
            
            const chat = global.db.data.chats[m.chat]
            if (typeof chat !== "object") {
                global.db.data.chats[m.chat] = {}
            }
            if (chat) {
                if (!("isBanned" in chat)) chat.isBanned = false
                if (!("isMute" in chat)) chat.isMute = false;
                if (!("welcome" in chat)) chat.welcome = false
                if (!("sWelcome" in chat)) chat.sWelcome = ""
                if (!("sBye" in chat)) chat.sBye = ""
                if (!("detect" in chat)) chat.detect = true
                if (!("primaryBot" in chat)) chat.primaryBot = null
                if (!("modoadmin" in chat)) chat.modoadmin = false
                if (!("antiLink" in chat)) chat.antiLink = true
                if (!("nsfw" in chat)) chat.nsfw = false
                if (!("economy" in chat)) chat.economy = true;
                if (!("gacha" in chat)) chat.gacha = true
                // ============ CONFIGURACIÓN POKÉMON PARA CHATS ============
                if (!("pokemonEnabled" in chat)) chat.pokemonEnabled = true
                if (!("pokemonBattles" in chat)) chat.pokemonBattles = true
                if (!("pokemonTrading" in chat)) chat.pokemonTrading = true
                // ==========================================================
            } else {
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    isMute: false,
                    welcome: false,
                    sWelcome: "",
                    sBye: "",
                    detect: true,
                    primaryBot: null,
                    modoadmin: false,
                    antiLink: true,
                    nsfw: false,
                    economy: true,
                    gacha: true,
                    // ============ CONFIGURACIÓN POKÉMON POR DEFECTO ============
                    pokemonEnabled: true,
                    pokemonBattles: true,
                    pokemonTrading: true
                    // ==========================================================
                }
            }
            
            const settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== "object") {
                global.db.data.settings[this.user.jid] = {}
            }
            if (settings) {
                if (!("self" in settings)) settings.self = false
                if (!("restrict" in settings)) settings.restrict = true
                if (!("jadibotmd" in settings)) settings.jadibotmd = true
                if (!("antiPrivate" in settings)) settings.antiPrivate = false
                if (!("gponly" in settings)) settings.gponly = false
                // ============ CONFIGURACIÓN POKÉMON PARA BOT ============
                if (!("pokemonSystem" in settings)) settings.pokemonSystem = true
                if (!("pokemonAutoSave" in settings)) settings.pokemonAutoSave = true
                if (!("pokemonBattleTimeout" in settings)) settings.pokemonBattleTimeout = 300000 // 5 minutos
                // ========================================================
            } else {
                global.db.data.settings[this.user.jid] = {
                    self: false,
                    restrict: true,
                    jadibotmd: true,
                    antiPrivate: false,
                    gponly: false,
                    // ============ CONFIGURACIÓN POKÉMON POR DEFECTO ============
                    pokemonSystem: true,
                    pokemonAutoSave: true,
                    pokemonBattleTimeout: 300000
                    // ==========================================================
                }
            }
        } catch (e) {
            console.error(e)
        }
        
        if (typeof m.text !== "string") m.text = ""
        
        const user = global.db.data.users[m.sender]
        try {
            const actual = user.name || ""
            const nuevo = m.pushName || await this.getName(m.sender)
            if (typeof nuevo === "string" && nuevo.trim() && nuevo !== actual) {
                user.name = nuevo
            }
        } catch {}
        
        const chat = global.db.data.chats[m.chat]
        const settings = global.db.data.settings[this.user.jid]
        const isROwner = [...global.owner.map((number) => number)].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender) || user.premium == true
        const isOwners = [this.user.jid, ...global.owner.map((number) => number + "@s.whatsapp.net")].includes(m.sender)
        
        // ============ MIDDLEWARE DE ESTADO POKÉMON ============
        // Verificar si el usuario está en batalla
        if (user.pokemon && user.pokemon.isBattling) {
            // Comandos permitidos durante batalla
            const allowedCommands = ['.atacar', '.huir', '.rendirse', '.mochila', '.pokemon', '.equipo', '.usar']
            const isAllowed = allowedCommands.some(cmd => m.text.startsWith(cmd))
            
            if (!isAllowed) {
                // Verificar tiempo de batalla
                const battle = global.pokemonSystem.battles.get(user.pokemon.battleId)
                if (battle) {
                    const battleStart = battle.startTime || Date.now()
                    const battleDuration = Date.now() - battleStart
                    const timeout = settings.pokemonBattleTimeout || 300000
                    
                    if (battleDuration > timeout) {
                        // Finalizar batalla por timeout
                        user.pokemon.isBattling = false
                        user.pokemon.battleId = null
                        global.pokemonSystem.battles.delete(user.pokemon.battleId)
                        
                        await this.reply(m.chat, `⏰ La batalla ha finalizado por tiempo límite.`, m)
                    } else {
                        return this.reply(m.chat, `❌ *${user.name}*, estás en medio de una batalla Pokémon!\nUsa los comandos de batalla o *.huir* para salir.`, m)
                    }
                } else {
                    user.pokemon.isBattling = false
                    user.pokemon.battleId = null
                }
            }
        }
        
        // Verificar cooldowns
        if (user.pokemon && user.pokemon.cooldowns) {
            const now = Date.now()
            const cooldownKeys = Object.keys(user.pokemon.cooldowns)
            
            for (const key of cooldownKeys) {
                if (user.pokemon.cooldowns[key] < now) {
                    delete user.pokemon.cooldowns[key]
                }
            }
        }
        // ======================================================
        
        if (settings.self && !isOwners) return
        if (settings.gponly && !isOwners && !m.chat.endsWith('g.us') && !/code|p|ping|qr|estado|status|infobot|botinfo|report|reportar|invite|join|logout|suggest|help|menu/gim.test(m.text)) return
        
        if (opts["queque"] && m.text && !(isPrems)) {
            const queque = this.msgqueque,
                time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys) return
        m.exp += Math.ceil(Math.random() * 10)
        let usedPrefix

        // INICIO DE NUEVA LÓGICA ROBUSTA DE ADMINS
        const groupMetadata = m.isGroup 
            ? (global.cachedGroupMetadata 
                ? await global.cachedGroupMetadata(m.chat).catch((_) => null) 
                : await this.groupMetadata(m.chat).catch((_) => null)) || {} 
            : {}
            
        const participants = Array.isArray(groupMetadata?.participants) ? groupMetadata.participants : []

        // Funciones auxiliares para normalizar IDs
        const decode = (j) => this.decodeJid(j)
        const norm = (j) => jidNormalizedUser(decode(j))
        const numOnly = (j) => String(decode(j)).split('@')[0].replace(/[^0-9]/g, '')

        // Identificación robusta del propio Bot
        const meIdRaw = this.user?.id || this.user?.jid 
        const meLidRaw = (this.user?.lid || conn?.user?.lid || '').toString().replace(/:.*/, '') || null 
        const botNum = numOnly(meIdRaw)

        const botCandidates = [
            decode(meIdRaw),
            jidNormalizedUser(decode(meIdRaw)),
            botNum,
            meLidRaw && `${meLidRaw}@lid`,
            meLidRaw && jidNormalizedUser(`${meLidRaw}@lid`),
            meLidRaw && `${meLidRaw}@s.whatsapp.net`
        ].filter(Boolean)

        const senderCandidates = [decode(m.sender), jidNormalizedUser(decode(m.sender)), numOnly(m.sender)]

        // Mapeo de participantes para búsqueda rápida y segura
        const participantsMap = {}
        for (const p of participants) {
            const raw = p.jid || p.id
            const dj = decode(raw)
            const nj = jidNormalizedUser(dj)
            const no = numOnly(dj)
            participantsMap[dj] = p
            participantsMap[nj] = p
            participantsMap[no] = p
        }

        const pick = (cands) => {
            for (const k of cands) if (participantsMap[k]) return participantsMap[k]
            return participants.find((p) => cands.some((c) => areJidsSameUser(norm(p.jid || p.id), jidNormalizedUser(decode(c))))) || null
        }

        // Asignación con nombres compatibles con el resto de handler.js
        const userGroup = m.isGroup ? pick(senderCandidates) || {} : {}
        const botGroup = m.isGroup ? pick(botCandidates) || {} : {}

        const isRAdmin = userGroup?.admin === 'superadmin'
        const isAdmin = isRAdmin || userGroup?.admin === 'admin' || userGroup?.admin === true
        const isBotAdmin = botGroup?.admin === 'admin' || botGroup?.admin === 'superadmin' || botGroup?.admin === true
        
        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "./plugins")
        
        for (const name in global.plugins) {
            const plugin = global.plugins[name]
            if (!plugin) continue
            if (plugin.disabled) continue
            const __filename = join(___dirname, name)
            
            if (typeof plugin.all === "function") {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename,
                        user,
                        chat,
                        settings,
                        // ============ INYECCIÓN SISTEMA POKÉMON ============
                        gameEngine: global.pokemonSystem.gameEngine,
                        userDB: global.pokemonSystem.userDB,
                        saveManager: global.pokemonSystem.saveManager,
                        pokemonSystem: global.pokemonSystem
                        // ====================================================
                    })
                } catch (err) {
                    console.error(err)
                }
            }
            
            if (!opts["restrict"])
                if (plugin.tags && plugin.tags.includes("admin")) {
                    continue
                }
            
            const strRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
            const pluginPrefix = plugin.customPrefix || conn.prefix || global.prefix
            const match = (pluginPrefix instanceof RegExp ?
                [
                    [pluginPrefix.exec(m.text), pluginPrefix]
                ] :
                Array.isArray(pluginPrefix) ?
                pluginPrefix.map(prefix => {
                    const regex = prefix instanceof RegExp ?
                        prefix : new RegExp(strRegex(prefix))
                    return [regex.exec(m.text), regex]
                }) : typeof pluginPrefix === "string" ?
                [
                    [new RegExp(strRegex(pluginPrefix)).exec(m.text), new RegExp(strRegex(pluginPrefix))]
                ] :
                [
                    [
                        [], new RegExp
                    ]
                ]).find(prefix => prefix[1])
            
            if (typeof plugin.before === "function") {
                if (await plugin.before.call(this, m, {
                        match,
                        conn: this,
                        participants,
                        groupMetadata,
                        userGroup,
                        botGroup,
                        isROwner,
                        isOwner,
                        isRAdmin,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename,
                        user,
                        chat,
                        settings,
                        // ============ INYECCIÓN SISTEMA POKÉMON ============
                        gameEngine: global.pokemonSystem.gameEngine,
                        userDB: global.pokemonSystem.userDB,
                        saveManager: global.pokemonSystem.saveManager,
                        pokemonSystem: global.pokemonSystem
                        // ====================================================
                    })) {
                    continue
                }
            }
            
            if (typeof plugin !== "function") {
                continue
            }
            
            if ((usedPrefix = (match[0] || "")[0])) {
                const noPrefix = m.text.replace(usedPrefix, "")
                let [command, ...args] = noPrefix.trim().split(" ").filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split(" ").slice(1)
                let text = _args.join(" ")
                command = (command || "").toLowerCase()
                const fail = plugin.fail || global.dfail
                const isAccept = plugin.command instanceof RegExp ?
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ?
                    plugin.command.some(cmd => cmd instanceof RegExp ?
                        cmd.test(command) : cmd === command) :
                    typeof plugin.command === "string" ?
                    plugin.command === command : false
                global.comando = command

                if ((m.id.startsWith("NJX-") || (m.id.startsWith("BAE5") && m.id.length === 16) || (m.id.startsWith("B24E") && m.id.length === 20))) return

                // Primary by: Alex 🐼
                if (global.db.data.chats[m.chat].primaryBot && global.db.data.chats[m.chat].primaryBot !== this.user.jid) {
                    const primaryBotConn = global.conns.find(conn => conn.user.jid === global.db.data.chats[m.chat].primaryBot && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)
                    const participants = m.isGroup ? (await this.groupMetadata(m.chat).catch(() => ({
                        participants: []
                    }))).participants : []
                    const primaryBotInGroup = participants.some(p => p.jid === global.db.data.chats[m.chat].primaryBot)
                    if (primaryBotConn && primaryBotInGroup || global.db.data.chats[m.chat].primaryBot === global.conn.user.jid) {
                        throw !1
                    } else {
                        global.db.data.chats[m.chat].primaryBot = null
                    }
                } else {}

                if (!isAccept) continue
                m.plugin = name
                
                if (isAccept) {
                    global.db.data.users[m.sender].commands = (global.db.data.users[m.sender].commands || 0) + 1
                }
                
                if (chat) {
                    const botId = this.user.jid
                    const primaryBotId = chat.primaryBot
                    
                    // ============ VERIFICACIÓN SISTEMA POKÉMON HABILITADO ============
                    const pokemonCommands = ['pokedex', 'pokemon', 'equipo', 'capturar', 'batallar', 'mochila', 'tienda', 'viajar', 'entrenar', 'ruta']
                    const isPokemonCommand = pokemonCommands.includes(command)
                    
                    if (isPokemonCommand && !chat.pokemonEnabled && !isROwner) {
                        return this.reply(m.chat, `❌ El sistema Pokémon está deshabilitado en este grupo.\nUsa *${usedPrefix}pokemon on* para activarlo.`, m)
                    }
                    // ================================================================
                    
                    if (name !== "group-banchat.js" && chat?.isBanned && !isROwner) {
                        if (!primaryBotId || primaryBotId === botId) {
                            const aviso = `⚠️ El bot *${botname}* está desactivado en este grupo.\n\n> 🔹 Un *administrador* puede activarlo usando el comando:\n> » *${usedPrefix}bot on*`.trim()
                            await m.reply(aviso)
                            return
                        }
                    }
                    
                    if (m.text && user.banned && !isROwner) {
                        const mensaje = `🚫 *Acceso Denegado* 🚫\nꕙ Has sido *baneado/a* y no puedes usar comandos en este bot.\n\n> ⚡ *Razón:* ${user.bannedReason}\n> 🛡️ *Si crees que esto es un error*, y el bot es oficial, presenta tu caso ante un *moderador* para revisión.`.trim()
                        if (!primaryBotId || primaryBotId === botId) {
                            m.reply(mensaje)
                            return
                        }
                    }
                }
                
                const adminMode = chat.modoadmin || false
                const wa = plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || pluginPrefix || m.text.slice(0, 1) === pluginPrefix || plugin.command
                if (adminMode && !isOwner && m.isGroup && !isAdmin && wa) return
                
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
                    fail("owner", m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) {
                    fail("rowner", m, this)
                    continue
                }
                if (plugin.owner && !isOwner) {
                    fail("owner", m, this)
                    continue
                }
                if (plugin.premium && !isPrems) {
                    fail("premium", m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) {
                    fail("group", m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) {
                    fail("botAdmin", m, this)
                    continue
                } else if (plugin.admin && !isAdmin) {
                    fail("admin", m, this)
                    continue
                }
                if (plugin.private && m.isGroup) {
                    fail("private", m, this)
                    continue
                }
                
                m.isCommand = true
                m.exp += plugin.exp ? parseInt(plugin.exp) : 10
                
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    userGroup,
                    botGroup,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename,
                    user,
                    chat,
                    settings,
                    // ============ INYECCIÓN SISTEMA POKÉMON ============
                    gameEngine: global.pokemonSystem.gameEngine,
                    userDB: global.pokemonSystem.userDB,
                    saveManager: global.pokemonSystem.saveManager,
                    pokemonSystem: global.pokemonSystem,
                    isPokemonCommand: isPokemonCommand || false
                    // ====================================================
                }
                
                try {
                    await plugin.call(this, m, extra)
                    
                    // ============ SISTEMA DE GUARDADO POKÉMON ============
                    // Guardar datos Pokémon después de comandos relacionados
                    if (isPokemonCommand && settings.pokemonAutoSave && global.pokemonSystem.saveManager) {
                        try {
                            // Marcar usuario para guardado
                            await global.pokemonSystem.saveManager.queueSave(m.sender, user.pokemon)
                            
                            // También guardar en la base de datos global
                            global.db.write()
                            
                            // Actualizar último activo
                            user.pokemon.lastActive = Date.now()
                            
                        } catch (saveError) {
                            console.error(chalk.red('❌ Error al guardar datos Pokémon:'), saveError)
                        }
                    }
                    // =====================================================
                    
                } catch (err) {
                    m.error = err
                    console.error(err)
                } finally {
                    if (typeof plugin.after === "function") {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(err)
    } finally {
        if (opts["queque"] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        
        let user, stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
            }
        }
        
        try {
            if (!opts["noprint"]) await (await import("./lib/print.js")).default(m, this)
        } catch (err) {
            console.warn(err)
            console.log(m.message)
        }
    }

    global.dfail = (type, m, conn) => {
        const msg = {
            rowner: `💠 *Acceso denegado* 💠\nEl comando *${comando}* solo puede ser usado por los *creadores del bot*.`,
            owner: `💠 *Acceso denegado* 💠\nEl comando *${comando}* solo puede ser usado por los *desarrolladores del bot*.`,
            mods: `🛡️ *Permiso insuficiente* 🛡️\nEl comando *${comando}* solo puede ser usado por los *moderadores del bot*.`,
            premium: `⭐ *Exclusivo Premium* ⭐\nEl comando *${comando}* solo puede ser usado por *usuarios premium*.`,
            group: `👥 *Solo en grupos* 👥\nEl comando *${comando}* solo puede ejecutarse dentro de un *grupo*.`,
            private: `📩 *Solo privado* 📩\nEl comando *${comando}* solo puede usarse en *chat privado* con el bot.`,
            admin: `⚠️ *Requiere permisos de admin* ⚠️\nEl comando *${comando}* solo puede ser usado por los *administradores del grupo*.`,
            botAdmin: `🤖 *Necesito permisos* 🤖\nPara ejecutar *${comando}*, el bot debe ser *administrador del grupo*.`,
            restrict: `⛔ *Funcionalidad desactivada* ⛔\nEsta característica está *temporalmente deshabilitada*.`
        } [type]
        if (msg) return conn.reply(m.chat, msg, m, rcanal).then(_ => m.react('✖️'))
    }
    
    let file = global.__filename(import.meta.url, true)
    watchFile(file, async () => {
        unwatchFile(file)
        console.log(chalk.magenta("Se actualizo 'handler.js'"))
        if (global.reloadHandler) console.log(await global.reloadHandler())
    })
}
