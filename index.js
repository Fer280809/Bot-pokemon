process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './settings.js'
import './plugins/_allfake.js'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import { AstaJadiBot } from './plugins/sockets-serbot.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import pino from 'pino'
import Pino from 'pino'
import path, { join } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import store from './lib/store.js'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import('@whiskeysockets/baileys')
import readline from 'readline'
import NodeCache from 'node-cache'
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

let { say } = cfonts
console.log(chalk.magentaBright('\nвҡЎ Iniciando Sistema...'))
say('Asta Bot', {
  font: 'block',
  align: 'center',
  gradient: ['red', 'magenta']
})
say('Sistema Multi-Plugins Activado', {
  font: 'console',
  align: 'center',
  colors: ['cyan']
})
say('By Fernando', {
  font: 'tiny',
  align: 'center',
  colors: ['yellow', 'green']
})

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}

global.timestamp = { start: new Date }
const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#!./-]')

// ============ INICIALIZACIÓN SISTEMA POKÉMON OPTIMIZADA ============
// Inicializar estructura global si no existe
if (!global.pokemonSystem) {
    global.pokemonSystem = {
        gameEngine: null,
        userDB: null,
        saveManager: null,
        battles: new Map(),
        cooldowns: new Map(),
        wildEncounters: new Map(),
        isReady: false,
        initPromise: null
    };
    
    console.log(chalk.cyan('🎮 Sistema Pokémon: Estructura global inicializada'));
}

// Función para cargar módulos Pokémon en segundo plano
const loadPokemonModules = async () => {
    if (global.pokemonSystem.isReady) {
        return true;
    }
    
    // Si ya hay una inicialización en proceso, esperar
    if (global.pokemonSystem.initPromise) {
        return global.pokemonSystem.initPromise;
    }
    
    global.pokemonSystem.initPromise = (async () => {
        try {
            console.log(chalk.cyan('🎮 Cargando sistema Pokémon...'));
            
            // Verificar que los archivos existan
            const pokemonLibPath = path.join(__dirname, 'lib');
            const requiredFiles = ['gameEngine.js', 'userDatabase.js', 'saveManager.js'];
            
            for (const file of requiredFiles) {
                const filePath = path.join(pokemonLibPath, file);
                if (!existsSync(filePath)) {
                    console.log(chalk.yellow(`⚠️  Archivo Pokémon no encontrado: ${file}`));
                    console.log(chalk.yellow(`   Ruta: ${filePath}`));
                    // Crear directorio lib si no existe
                    if (!existsSync(pokemonLibPath)) {
                        mkdirSync(pokemonLibPath, { recursive: true });
                        console.log(chalk.green(`✅ Directorio /lib creado`));
                    }
                }
            }
            
            // Cargar módulos con manejo de errores robusto
            let gameEngine, userDB, saveManager;
            let modulesLoaded = 0;
            
            try {
                const gameEngineModule = await import('./lib/gameEngine.js');
                gameEngine = gameEngineModule.default || gameEngineModule;
                global.pokemonSystem.gameEngine = gameEngine;
                modulesLoaded++;
                console.log(chalk.green('✅ GameEngine cargado'));
            } catch (gameError) {
                console.error(chalk.red('❌ Error cargando GameEngine:'), gameError.message);
                // Crear instancia básica para evitar errores
                global.pokemonSystem.gameEngine = {
                    initialize: async () => ({ success: false, error: 'Módulo no disponible' }),
                    getGameState: async () => ({ success: false, error: 'Sistema Pokémon no disponible' })
                };
            }
            
            try {
                const userDBModule = await import('./lib/userDatabase.js');
                userDB = userDBModule.default || userDBModule;
                global.pokemonSystem.userDB = userDB;
                modulesLoaded++;
                console.log(chalk.green('✅ UserDatabase cargado'));
            } catch (userDBError) {
                console.error(chalk.red('❌ Error cargando UserDatabase:'), userDBError.message);
                global.pokemonSystem.userDB = null;
            }
            
            try {
                const saveManagerModule = await import('./lib/saveManager.js');
                saveManager = saveManagerModule.default || saveManagerModule;
                global.pokemonSystem.saveManager = saveManager;
                modulesLoaded++;
                console.log(chalk.green('✅ SaveManager cargado'));
            } catch (saveError) {
                console.error(chalk.red('❌ Error cargando SaveManager:'), saveError.message);
                global.pokemonSystem.saveManager = {
                    autoSave: async () => ({ success: true }),
                    start: () => console.log('SaveManager básico iniciado')
                };
            }
            
            // Inicializar GameEngine si se cargó
            if (gameEngine && typeof gameEngine.initialize === 'function') {
                try {
                    await gameEngine.initialize();
                    console.log(chalk.green('✅ GameEngine inicializado'));
                } catch (initError) {
                    console.error(chalk.red('❌ Error inicializando GameEngine:'), initError.message);
                }
            }
            
            // Iniciar SaveManager si tiene método start
            if (saveManager && typeof saveManager.start === 'function') {
                try {
                    saveManager.start();
                    console.log(chalk.cyan('🔄 SaveManager iniciado'));
                } catch (startError) {
                    console.error(chalk.red('❌ Error iniciando SaveManager:'), startError.message);
                }
            }
            
            global.pokemonSystem.isReady = modulesLoaded > 0;
            
            if (global.pokemonSystem.isReady) {
                console.log(chalk.bold.green('🎮 Sistema Pokémon completamente cargado y listo'));
                console.log(chalk.cyan(`📊 Módulos cargados: ${modulesLoaded}/3`));
            } else {
                console.log(chalk.yellow('⚠️  Sistema Pokémon parcialmente cargado'));
                console.log(chalk.yellow('ℹ️  Algunos comandos Pokémon pueden no funcionar'));
            }
            
            return global.pokemonSystem.isReady;
            
        } catch (error) {
            console.error(chalk.red('❌ Error crítico en sistema Pokémon:'), error);
            global.pokemonSystem.isReady = false;
            return false;
        } finally {
            global.pokemonSystem.initPromise = null;
        }
    })();
    
    return global.pokemonSystem.initPromise;
};

// Iniciar carga de módulos Pokémon después de un breve delay
setTimeout(() => {
    loadPokemonModules().then(success => {
        if (success) {
            // Iniciar limpieza automática del sistema Pokémon
            startPokemonCleanup();
        }
    });
}, 3000); // 3 segundos de delay para que el sistema principal se estabilice
// =========================================================

// Base de datos optimizada
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'))
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this)
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
      }
    }, 1 * 1000))
  }
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

const { state, saveCreds } = await useMultiFileAuthState(global.sessions)
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const { version } = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumber
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))
let opcion

if (methodCodeQR) {
  opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${sessions}/creds.json`)) {
  do {
    opcion = await question(chalk.bold.white("Seleccione una opción:\n") + chalk.blueBright("1. Con código QR\n") + chalk.cyan("2. Con código de 8 dígitos\n➤➤➤ "))
    if (!/^[1-2]$/.test(opcion)) {
      console.log(chalk.bold.redBright(`✘ No se permiten números que no sean 1 o 2`))
    }
  } while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${sessions}/creds.json`))
}

console.info = () => {}

// Opciones de conexión optimizadas para la versión xyz/bails
const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile,
  browser: ["Ubuntu", "Chrome", "20.0.04"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: false,
  generateHighQualityLinkPreview: true,
  syncFullHistory: false,
  getMessage: async (key) => {
    try {
      let jid = jidNormalizedUser(key.remoteJid)
      let msg = await store.loadMessage(jid, key.id)
      return msg?.message || ""
    } catch {
      return ""
    }
  },
  msgRetryCounterCache,
  userDevicesCache,
  defaultQueryTimeoutMs: undefined,
  cachedGroupMetadata: (jid) => globalThis.conn.chats[jid] ?? {},
  version,
  keepAliveIntervalMs: 30000,
  maxIdleTimeMs: 45000,
  connectTimeoutMs: 30000,
}

global.conn = makeWASocket(connectionOptions)
conn.ev.on("creds.update", saveCreds)

// ============ SECCIÓN CORREGIDA DEL CÓDIGO ============
if (!fs.existsSync(`./${sessions}/creds.json`)) {
  if (opcion === '2' || methodCode) {
    console.log(chalk.yellow('[ ✓ ] Modo código de emparejamiento activado'))
    
    // Sistema de espera mejorado para xyz/bails
    const waitForConnection = () => {
      return new Promise((resolve) => {
        console.log(chalk.cyan('[ ⏳ ] Preparando conexión para código...'))
        
        let attempts = 0
        const maxAttempts = 15
        
        const checkInterval = setInterval(() => {
          attempts++
          
          if (conn && conn.authState && conn.authState.creds) {
            clearInterval(checkInterval)
            console.log(chalk.green('[ ✓ ] Conexión lista para código'))
            resolve(true)
          } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval)
            console.log(chalk.red('[ ✘ ] Tiempo de espera agotado'))
            resolve(false)
          } else if (attempts % 3 === 0) {
            console.log(chalk.yellow(`[ ⏱️ ] Esperando conexión... (${attempts}/${maxAttempts})`))
          }
        }, 2000)
      })
    }

    if (!conn.authState.creds.registered) {
      let addNumber
      if (!!phoneNumber) {
        addNumber = phoneNumber.replace(/[^0-9]/g, '')
      } else {
        do {
          phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`[ 📱 ] Ingrese el número de WhatsApp (ej: 5213312345678).\n${chalk.bold.magentaBright('➤➤➤ ')}`)))
          phoneNumber = phoneNumber.replace(/\D/g, '')
          if (!phoneNumber.startsWith('+')) {
            phoneNumber = `+${phoneNumber}`
          }
        } while (!await isValidPhoneNumber(phoneNumber))
        rl.close()
        addNumber = phoneNumber.replace(/\D/g, '')
      }

      // Esperar a que la conexión esté lista
      const isConnected = await waitForConnection()
      
      if (!isConnected) {
        console.log(chalk.red('\n[ ✘ ] No se pudo establecer la conexión'))
        console.log(chalk.yellow('[ 💡 ] Soluciones:'))
        console.log(chalk.cyan('1. Reinicia el bot: npm start'))
        console.log(chalk.cyan('2. Usa el método QR (Opción 1)'))
        console.log(chalk.cyan('3. Verifica tu conexión a internet'))
        process.exit(1)
      }

      // Intentar obtener el código con reintentos
      let codeGenerated = false
      let attempts = 0
      const maxRetries = 3
      
      while (!codeGenerated && attempts < maxRetries) {
        attempts++
        try {
          console.log(chalk.yellow(`[ 🔄 ] Generando código (Intento ${attempts}/${maxRetries})...`))
          
          // IMPORTANTE: Para xyz/bails, el número debe estar SIN el signo +
          const cleanNumber = addNumber.replace('+', '')
          
          let codeBot = await conn.requestPairingCode(cleanNumber)
          
          if (!codeBot || codeBot.trim() === '') {
            throw new Error('Código vacío recibido')
          }
          
          // Formatear código: XXXX-XXXX
          codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
          
          console.log(chalk.bold.white(chalk.bgMagenta(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)))
          console.log(chalk.bold.white(chalk.bgMagenta(`┃       🔗 CÓDIGO DE VINCULACIÓN    ┃`)))
          console.log(chalk.bold.white(chalk.bgMagenta(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)))
          console.log(chalk.bold.white(chalk.bgGreen(`        ${codeBot}        `)))
          console.log(chalk.yellow(`\n📱 Pasos para vincular:`))
          console.log(chalk.cyan(`1. Abre WhatsApp en tu teléfono`))
          console.log(chalk.cyan(`2. Ve a Ajustes → Dispositivos vinculados`))
          console.log(chalk.cyan(`3. Toca "Vincular un dispositivo"`))
          console.log(chalk.cyan(`4. Ingresa este código: ${codeBot}`))
          console.log(chalk.green(`\n⏰ El código expira en 5 minutos\n`))
          
          codeGenerated = true
          
        } catch (error) {
          console.error(chalk.red(`✘ Error (Intento ${attempts}/${maxRetries}): ${error.message}`))
          
          if (attempts < maxRetries) {
            console.log(chalk.yellow(`[ ⏱️ ] Esperando 5 segundos para reintentar...`))
            await new Promise(resolve => setTimeout(resolve, 5000))
          } else {
            console.log(chalk.red('\n[ ✘ ] No se pudo generar el código después de varios intentos'))
            console.log(chalk.yellow(`[ 💡 ] Soluciones rápidas:`))
            console.log(chalk.cyan(`1. Usa el método QR (Opción 1)`))
            console.log(chalk.cyan(`2. Verifica que el número sea válido`))
            console.log(chalk.cyan(`3. Espera 10 minutos e intenta de nuevo`))
            console.log(chalk.cyan(`4. Reinstala las dependencias: rm -rf node_modules && npm install`))
          }
        }
      }
    }
  }
}
// ============ FIN SECCIÓN CORREGIDA ============

conn.isInit = false
conn.well = false

if (!opts['test']) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(() => {})
  }, 60 * 1000)
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  global.stopped = connection
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error)
    global.timestamp.connect = new Date
  }
  if (global.db.data == null) loadDatabase()
  if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
    if (opcion == '1' || methodCodeQR) {
      console.log(chalk.green.bold(`[ 📱 ] Escanea este código QR`))
    }
  }
  if (connection === "open") {
    const userName = conn.user.name || conn.user.verifiedName || "Usuario"
    await joinChannels(conn).catch(() => {})
    console.log(chalk.bold.greenBright(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(chalk.bold.greenBright(`┃   ✅ BOT CONECTADO EXITOSAMENTE   ┃`))
    console.log(chalk.bold.greenBright(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log(chalk.cyan(`👤 Usuario: ${userName}`))
    console.log(chalk.cyan(`📱 Número: ${conn.user.id.split(':')[0]}`))
    console.log(chalk.cyan(`⚡ Estado: Activo y funcionando`))
    console.log(chalk.gray(`⏰ Hora: ${new Date().toLocaleString('es-MX')}\n`))
    
    // Mostrar estado del sistema Pokémon
    if (global.pokemonSystem?.isReady) {
      console.log(chalk.bold.magenta(`🎮 Sistema Pokémon: ACTIVO ✅`))
      console.log(chalk.magenta(`   • GameEngine: ${global.pokemonSystem.gameEngine ? '✅' : '❌'}`))
      console.log(chalk.magenta(`   • UserDB: ${global.pokemonSystem.userDB ? '✅' : '❌'}`))
      console.log(chalk.magenta(`   • SaveManager: ${global.pokemonSystem.saveManager ? '✅' : '❌'}`))
    } else {
      console.log(chalk.yellow(`🎮 Sistema Pokémon: INACTIVO o cargando...`))
    }
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
  if (connection === "close") {
    if ([401, 440, 428, 405].includes(reason)) {
      console.log(chalk.red(`⚠ (${code}) › Sesión principal cerrada.`))
    }
    console.log(chalk.yellow("🔄 Reconectando el Bot..."))
    await global.reloadHandler(true).catch(console.error)
  }
}

process.on('uncaughtException', console.error)
let isInit = true
let handler = await import('./handler.js')

global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try {
      global.conn.ws.close()
    } catch {}
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }
  conn.handler = handler.handler.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

process.on('unhandledRejection', (reason) => {
  console.error("⚠ Rechazo no manejado:", reason)
})

// SubBots
global.rutaJadiBot = join(__dirname, `./${jadi}`)
if (global.AstaJadibts) {
  if (!existsSync(global.rutaJadiBot)) {
    mkdirSync(global.rutaJadiBot, { recursive: true })
    console.log(chalk.bold.cyan(`✅ Carpeta ${jadi} creada`))
  }
  const readRutaJadiBot = readdirSync(rutaJadiBot)
  if (readRutaJadiBot.length > 0) {
    const creds = 'creds.json'
    for (const gjbts of readRutaJadiBot) {
      const botPath = join(rutaJadiBot, gjbts)
      const readBotPath = readdirSync(botPath)
      if (readBotPath.includes(creds)) {
        AstaJadiBot({ pathAstaJadiBot: botPath, m: null, conn, args: '', usedPrefix: '/', command: 'serbot' })
      }
    }
  }
}

// Sistema de carga de plugins OPTIMIZADO - 5 Carpetas
const pluginFolders = ['./plugins', './plugins2', './plugins3', './plugins4', './plugins5']
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}

async function filesInit() {
  console.log(chalk.bold.cyan('\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'))
  console.log(chalk.bold.cyan('┃      CARGANDO PLUGINS...          ┃'))
  console.log(chalk.bold.cyan('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'))

  const allLoadPromises = []
  const folderStats = {}

  for (const folder of pluginFolders) {
    const folderPath = join(__dirname, folder)
    if (!existsSync(folderPath)) {
      console.log(chalk.gray(`⚠ ${folder} no existe`))
      continue
    }

    folderStats[folder] = 0
    const files = readdirSync(folderPath).filter(pluginFilter)

    for (const filename of files) {
      const file = global.__filename(join(folderPath, filename))
      allLoadPromises.push(
        import(file)
          .then(module => {
            global.plugins[filename] = module.default || module
            folderStats[folder]++
            return { folder, filename, success: true }
          })
          .catch(e => {
            console.error(chalk.red(`✘ ${folder}/${filename}: ${e.message}`))
            delete global.plugins[filename]
            return { folder, filename, success: false }
          })
      )
    }
  }

  await Promise.all(allLoadPromises)

  let total = 0
  for (const [folder, count] of Object.entries(folderStats)) {
    if (count > 0) {
      console.log(chalk.green(`✅ ${folder}: ${count} plugins`))
      total += count
    }
  }

  console.log(chalk.bold.green(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
  console.log(chalk.bold.green(`┃  ⚡ TOTAL: ${total} PLUGINS ⚡  ┃`))
  console.log(chalk.bold.green(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`))
  
  // Cargar plugin Pokémon si existe
  await loadPokemonPlugin();
}

// Cargar plugin Pokémon si existe
async function loadPokemonPlugin() {
  const pokemonPluginPath = join(__dirname, 'plugins', 'pokemon.js');
  if (existsSync(pokemonPluginPath)) {
    try {
      const pokemonPlugin = await import(pokemonPluginPath);
      global.plugins['pokemon.js'] = pokemonPlugin.default || pokemonPlugin;
      console.log(chalk.green('✅ Plugin Pokémon cargado'));
    } catch (error) {
      console.error(chalk.red('❌ Error cargando plugin Pokémon:'), error);
    }
  } else {
    console.log(chalk.yellow('ℹ️  Plugin Pokémon no encontrado, se usará sistema integrado'));
  }
}

filesInit().catch(console.error)

// Recarga optimizada de plugins
global.reload = async (_ev, filename) => {
  if (!pluginFilter(filename)) return

  for (const folder of pluginFolders) {
    const folderPath = join(__dirname, folder)
    if (!existsSync(folderPath)) continue

    const dir = global.__filename(join(folderPath, filename), true)

    if (existsSync(dir)) {
      const isUpdate = filename in global.plugins

      if (isUpdate) {
        console.log(chalk.yellow(`🔄 ${folder}/${filename}`))
      } else {
        console.log(chalk.green(`➕ ${folder}/${filename}`))
      }

      const err = syntaxerror(readFileSync(dir), filename, {
        sourceType: 'module',
        allowAwaitOutsideFunction: true,
      })

      if (err) {
        console.error(chalk.red(`✘ Syntax error: ${filename}`))
        delete global.plugins[filename]
      } else {
        try {
          const module = await import(`${global.__filename(dir)}?update=${Date.now()}`)
          global.plugins[filename] = module.default || module
        } catch (e) {
          console.error(chalk.red(`✘ ${filename}: ${e.message}`))
          delete global.plugins[filename]
        }
      }
      return
    }
  }

  if (filename in global.plugins) {
    console.log(chalk.red(`🗑️ ${filename}`))
    delete global.plugins[filename]
  }
}

Object.freeze(global.reload)

// Observar todas las carpetas
for (const folder of pluginFolders) {
  const folderPath = join(__dirname, folder)
  if (existsSync(folderPath)) {
    watch(folderPath, global.reload)
  }
}

await global.reloadHandler()

// ============ FUNCIONES DE LIMPIEZA SISTEMA POKÉMON ============
function startPokemonCleanup() {
  // Limpiar batallas inactivas cada 5 minutos
  setInterval(() => {
    if (global.pokemonSystem?.battles) {
      const now = Date.now();
      let cleaned = 0;
      
      for (const [battleId, battle] of global.pokemonSystem.battles.entries()) {
        if (battle.startTime && (now - battle.startTime) > 300000) { // 5 minutos
          global.pokemonSystem.battles.delete(battleId);
          cleaned++;
        }
      }
      
      if (cleaned > 0) {
        console.log(chalk.yellow(`🗑️  Pokémon: Limpiadas ${cleaned} batallas inactivas`));
      }
    }
  }, 5 * 60 * 1000);

  // Limpiar cooldowns expirados cada 1 minuto
  setInterval(() => {
    if (global.pokemonSystem?.cooldowns) {
      const now = Date.now();
      let cleaned = 0;
      
      for (const [userId, cooldowns] of global.pokemonSystem.cooldowns.entries()) {
        const expired = [];
        for (const [action, expiry] of Object.entries(cooldowns)) {
          if (expiry < now) {
            expired.push(action);
          }
        }
        
        for (const action of expired) {
          delete cooldowns[action];
          cleaned++;
        }
        
        if (Object.keys(cooldowns).length === 0) {
          global.pokemonSystem.cooldowns.delete(userId);
        }
      }
      
      if (cleaned > 0) {
        console.log(chalk.yellow(`🗑️  Pokémon: Limpiados ${cleaned} cooldowns expirados`));
      }
    }
  }, 60 * 1000);

  // Limpiar encuentros salvajes antiguos cada 3 minutos
  setInterval(() => {
    if (global.pokemonSystem?.wildEncounters) {
      const now = Date.now();
      let cleaned = 0;
      
      for (const [userId, encounter] of global.pokemonSystem.wildEncounters.entries()) {
        if (encounter.timestamp && (now - encounter.timestamp) > 180000) { // 3 minutos
          global.pokemonSystem.wildEncounters.delete(userId);
          cleaned++;
        }
      }
      
      if (cleaned > 0) {
        console.log(chalk.yellow(`🗑️  Pokémon: Limpiados ${cleaned} encuentros salvajes antiguos`));
      }
    }
  }, 3 * 60 * 1000);

  // Limpiar GameEngine interno cada 10 minutos
  setInterval(() => {
    if (global.pokemonSystem?.gameEngine?.cleanupOldEncounters) {
      try {
        const cleaned = global.pokemonSystem.gameEngine.cleanupOldEncounters();
        if (cleaned > 0) {
          console.log(chalk.yellow(`🗑️  Pokémon GameEngine: Limpiados ${cleaned} encuentros antiguos`));
        }
      } catch (error) {
        console.error(chalk.red('❌ Error limpiando GameEngine:'), error);
      }
    }
  }, 10 * 60 * 1000);

  console.log(chalk.cyan('🔄 Sistema de limpieza Pokémon iniciado'));
}

// Backup automático de datos Pokémon cada 1 hora
setInterval(async () => {
  if (global.pokemonSystem?.saveManager?.createSystemBackup) {
    try {
      const result = await global.pokemonSystem.saveManager.createSystemBackup();
      if (result.success) {
        console.log(chalk.cyan(`💾 Backup Pokémon completado: ${result.backupId}`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error en backup Pokémon:'), error);
    }
  }
}, 60 * 60 * 1000);

// ============ MONITOREO DEL SISTEMA POKÉMON ============
// Mostrar estadísticas del sistema Pokémon cada 30 minutos
setInterval(() => {
  if (global.pokemonSystem?.isReady) {
    const stats = {
      battles: global.pokemonSystem.battles?.size || 0,
      cooldowns: global.pokemonSystem.cooldowns?.size || 0,
      wildEncounters: global.pokemonSystem.wildEncounters?.size || 0,
      isReady: global.pokemonSystem.isReady
    };
    
    console.log(chalk.magenta('📊 Estadísticas Pokémon:'));
    console.log(chalk.magenta(`   • Batallas activas: ${stats.battles}`));
    console.log(chalk.magenta(`   • Usuarios con cooldown: ${stats.cooldowns}`));
    console.log(chalk.magenta(`   • Encuentros salvajes: ${stats.wildEncounters}`));
    console.log(chalk.magenta(`   • Sistema listo: ${stats.isReady ? '✅' : '❌'}`));
  }
}, 30 * 60 * 1000);
// =======================================================

// Limpieza de archivos temporales (cada 10 minutos)
setInterval(async () => {
  const tmpDir = join(__dirname, 'tmp')
  try {
    if (existsSync(tmpDir)) {
      const filenames = readdirSync(tmpDir)
      for (const file of filenames) {
        try {
          const filePath = join(tmpDir, file)
          const stats = statSync(filePath)
          const now = Date.now()
          const fileAge = now - stats.mtimeMs
          if (fileAge > 5 * 60 * 1000) {
            unlinkSync(filePath)
          }
        } catch {}
      }
    }
  } catch {}
}, 10 * 60 * 1000)

async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127)
        })
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false))
      })
    ])
  }))
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  const s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
  Object.freeze(global.support)
}

_quickTest().catch(console.error)

async function isValidPhoneNumber(number) {
  try {
    number = number.replace(/\s+/g, '')
    if (number.startsWith('+521')) {
      number = number.replace('+521', '+52')
    } else if (number.startsWith('+52') && number[4] === '1') {
      number = number.replace('+52 1', '+52')
    }
    const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
    return phoneUtil.isValidNumber(parsedNumber)
  } catch {
    return false
  }
}

async function joinChannels(sock) {
  for (const value of Object.values(global.ch)) {
    if (typeof value === 'string' && value.endsWith('@newsletter')) {
      await sock.newsletterFollow(value).catch(() => {})
    }
  }
}

// ============ MANEJO DE CIERRE GRACIOSO CON SISTEMA POKÉMON ============
async function gracefulShutdown() {
  console.log(chalk.yellow('\n⚠️  Cerrando graciosamente...'));
  
  // Detener saveManager si existe
  if (global.pokemonSystem?.saveManager?.stop) {
    try {
      await global.pokemonSystem.saveManager.stop();
      console.log(chalk.green('✅ SaveManager Pokémon detenido'));
    } catch (error) {
      console.error(chalk.red('❌ Error deteniendo SaveManager:'), error);
    }
  }
  
  // Guardar datos de GameEngine si es posible
  if (global.pokemonSystem?.gameEngine) {
    try {
      // Limpiar encuentros activos
      if (global.pokemonSystem.gameEngine.cleanupOldEncounters) {
        const cleaned = global.pokemonSystem.gameEngine.cleanupOldEncounters(0); // Limpiar todos
        console.log(chalk.yellow(`🗑️  Pokémon: Limpiados ${cleaned} encuentros al cerrar`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error limpiando GameEngine:'), error);
    }
  }
  
  // Guardar base de datos
  if (global.db.data) {
    try {
      await global.db.write();
      console.log(chalk.green('✅ Base de datos guardada'));
    } catch (error) {
      console.error(chalk.red('❌ Error guardando base de datos:'), error);
    }
  }
  
  // Guardar datos Pokémon si userDB tiene método de guardado
  if (global.pokemonSystem?.userDB?.processSaveQueue) {
    try {
      await global.pokemonSystem.userDB.processSaveQueue();
      console.log(chalk.green('✅ Datos Pokémon guardados'));
    } catch (error) {
      console.error(chalk.red('❌ Error guardando datos Pokémon:'), error);
    }
  }
}

// Manejar señales de cierre
process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n⚠️  Recibida señal SIGINT'));
  await gracefulShutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(chalk.yellow('\n⚠️  Recibida señal SIGTERM'));
  await gracefulShutdown();
  process.exit(0);
});

process.on('beforeExit', async () => {
  console.log(chalk.yellow('\n⚠️  El proceso está por finalizar'));
  await gracefulShutdown();
});

// ============ INFORMACIÓN DE INICIO COMPLETA ============
console.log(chalk.bold.cyan('\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'));
console.log(chalk.bold.cyan('┃      SISTEMA INICIALIZADO          ┃'));
console.log(chalk.bold.cyan('┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));
console.log(chalk.cyan(`📅 Fecha: ${new Date().toLocaleString('es-MX')}`));
console.log(chalk.cyan(`📁 Directorio: ${__dirname}`));
console.log(chalk.cyan(`⚙️  Puerto: ${PORT}`));
console.log(chalk.cyan(`🔧 Modo: ${opcion === '1' ? 'QR' : 'Código'}`));

// Mostrar estado final del sistema Pokémon
setTimeout(() => {
  if (global.pokemonSystem) {
    console.log(chalk.bold.magenta('\n🎮 ESTADO SISTEMA POKÉMON:'));
    console.log(chalk.magenta(`   • Ready: ${global.pokemonSystem.isReady ? '✅' : '🔄'}`));
    console.log(chalk.magenta(`   • GameEngine: ${global.pokemonSystem.gameEngine ? '✅' : '❌'}`));
    console.log(chalk.magenta(`   • UserDB: ${global.pokemonSystem.userDB ? '✅' : '❌'}`));
    console.log(chalk.magenta(`   • SaveManager: ${global.pokemonSystem.saveManager ? '✅' : '❌'}`));
    
    if (global.pokemonSystem.isReady) {
      console.log(chalk.bold.green('   ¡Sistema Pokémon listo para usar! 🚀'));
    } else {
      console.log(chalk.yellow('   El sistema Pokémon se está cargando en segundo plano...'));
    }
  }
}, 5000);
