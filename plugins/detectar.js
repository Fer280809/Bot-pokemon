import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
}

// Almacén de errores
const errorLog = []
const MAX_ERRORS_STORED = 100

// Sistema de monitoreo de errores
class ErrorMonitor {
    constructor() {
        this.errors = new Map()
        this.pluginStats = new Map()
        this.setupGlobalErrorHandlers()
    }

    setupGlobalErrorHandlers() {
        // Capturar errores no manejados
        process.on('uncaughtException', (error, origin) => {
            this.logError('UNCAUGHT_EXCEPTION', null, error, { origin })
        })

        process.on('unhandledRejection', (reason, promise) => {
            this.logError('UNHANDLED_REJECTION', null, reason, { promise: promise.toString() })
        })
    }

    logError(type, pluginName, error, metadata = {}) {
        const errorEntry = {
            id: `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            plugin: pluginName || 'DESCONOCIDO',
            message: error?.message || error?.toString() || 'Error desconocido',
            stack: error?.stack || 'Sin stack trace',
            timestamp: new Date().toISOString(),
            metadata,
            severity: this.determineSeverity(error)
        }

        errorLog.unshift(errorEntry)
        if (errorLog.length > MAX_ERRORS_STORED) {
            errorLog.pop()
        }

        // Actualizar estadísticas
        const pluginKey = pluginName || 'DESCONOCIDO'
        const stats = this.pluginStats.get(pluginKey) || { count: 0, lastError: null }
        stats.count++
        stats.lastError = errorEntry.timestamp
        this.pluginStats.set(pluginKey, stats)

        // Log en consola con colores
        console.error(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)
        console.error(`${colors.red}❌ ERROR DETECTADO${colors.reset}`)
        console.error(`${colors.yellow}📦 Plugin:${colors.reset} ${pluginName || 'DESCONOCIDO'}`)
        console.error(`${colors.yellow}🔍 Tipo:${colors.reset} ${type}`)
        console.error(`${colors.yellow}💬 Mensaje:${colors.reset} ${errorEntry.message}`)
        console.error(`${colors.yellow}⚠️ Severidad:${colors.reset} ${errorEntry.severity}`)
        console.error(`${colors.yellow}🕐 Hora:${colors.reset} ${new Date(errorEntry.timestamp).toLocaleString()}`)
        if (error?.stack) {
            console.error(`${colors.cyan}📋 Stack Trace:${colors.reset}`)
            console.error(error.stack)
        }
        console.error(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`)

        return errorEntry
    }

    determineSeverity(error) {
        const message = error?.message?.toLowerCase() || ''
        const stack = error?.stack?.toLowerCase() || ''
        
        if (message.includes('cannot read') || message.includes('undefined')) return '🔴 CRÍTICO'
        if (message.includes('timeout') || message.includes('econnrefused')) return '🟡 MEDIO'
        if (message.includes('warning') || stack.includes('deprecated')) return '🟢 BAJO'
        if (message.includes('syntax') || message.includes('unexpected')) return '🔴 CRÍTICO'
        
        return '🟡 MEDIO'
    }

    analyzeError(error) {
        const message = error?.message || ''
        const stack = error?.stack || ''
        const analysis = {
            type: 'DESCONOCIDO',
            cause: 'No se pudo determinar',
            solution: 'Revisar el código manualmente',
            affectedFiles: []
        }

        // Análisis de tipos de error comunes
        if (message.includes('Cannot read property') || message.includes('Cannot read properties of undefined')) {
            analysis.type = 'NULL_REFERENCE'
            analysis.cause = 'Intento de acceder a una propiedad de un objeto undefined/null'
            analysis.solution = 'Agregar validación: if (objeto) { ... } o usar objeto?.propiedad'
        }
        else if (message.includes('is not a function')) {
            analysis.type = 'NOT_A_FUNCTION'
            analysis.cause = 'Intento de llamar algo que no es una función'
            analysis.solution = 'Verificar que la variable sea una función antes de llamarla'
        }
        else if (message.includes('ECONNREFUSED') || message.includes('ETIMEDOUT')) {
            analysis.type = 'CONNECTION_ERROR'
            analysis.cause = 'Error de conexión a API externa o servicio'
            analysis.solution = 'Verificar conectividad, URL correcta y timeout adecuado'
        }
        else if (message.includes('Unexpected token') || message.includes('SyntaxError')) {
            analysis.type = 'SYNTAX_ERROR'
            analysis.cause = 'Error de sintaxis en el código'
            analysis.solution = 'Revisar sintaxis del código, puede ser JSON inválido'
        }
        else if (message.includes('MODULE_NOT_FOUND') || message.includes('Cannot find module')) {
            analysis.type = 'MODULE_NOT_FOUND'
            analysis.cause = 'Módulo o dependencia no encontrada'
            analysis.solution = 'Instalar dependencia con: npm install [nombre-modulo]'
        }
        else if (message.includes('ENOENT') || message.includes('no such file')) {
            analysis.type = 'FILE_NOT_FOUND'
            analysis.cause = 'Archivo o directorio no existe'
            analysis.solution = 'Verificar que la ruta del archivo sea correcta'
        }

        // Extraer archivos afectados del stack trace
        const fileMatches = stack.match(/at\s+(?:.*?\s+)?\(?([^:]+):(\d+):(\d+)\)?/g)
        if (fileMatches) {
            analysis.affectedFiles = fileMatches.slice(0, 5).map(match => {
                const parts = match.match(/\(([^:]+):(\d+):(\d+)\)/) || match.match(/at\s+([^:]+):(\d+):(\d+)/)
                if (parts) {
                    return {
                        file: path.basename(parts[1]),
                        line: parts[2],
                        column: parts[3],
                        fullPath: parts[1]
                    }
                }
                return null
            }).filter(Boolean)
        }

        return analysis
    }

    getStats() {
        return {
            totalErrors: errorLog.length,
            byPlugin: Object.fromEntries(this.pluginStats),
            recent: errorLog.slice(0, 10)
        }
    }
}

// Instancia global del monitor
const monitor = new ErrorMonitor()

// Función para escanear plugins y detectar errores potenciales
async function scanPlugins(pluginsPath) {
    const results = {
        total: 0,
        withIssues: 0,
        plugins: []
    }

    try {
        const files = fs.readdirSync(pluginsPath)
        
        for (const file of files) {
            if (!file.endsWith('.js')) continue
            
            results.total++
            const filePath = path.join(pluginsPath, file)
            const issues = []

            try {
                const content = fs.readFileSync(filePath, 'utf-8')
                
                // Detectar problemas comunes
                if (!content.includes('try') && !content.includes('catch')) {
                    issues.push({
                        type: '⚠️ Sin manejo de errores',
                        severity: 'MEDIO',
                        detail: 'No se detectaron bloques try-catch'
                    })
                }

                if (content.includes('await') && !content.match(/async\s+(?:function|\()/)) {
                    issues.push({
                        type: '🔴 Await sin async',
                        severity: 'CRÍTICO',
                        detail: 'Uso de await fuera de función async'
                    })
                }

                if (content.match(/\.\w+\(/g) && !content.includes('?.')) {
                    const matches = content.match(/\w+\.\w+\(/g)
                    if (matches && matches.length > 5) {
                        issues.push({
                            type: '🟡 Posibles null references',
                            severity: 'MEDIO',
                            detail: 'Múltiples accesos a propiedades sin validación'
                        })
                    }
                }

                if (content.includes('setTimeout') || content.includes('setInterval')) {
                    if (!content.includes('clearTimeout') && !content.includes('clearInterval')) {
                        issues.push({
                            type: '🟡 Memory leak potencial',
                            severity: 'MEDIO',
                            detail: 'Timers sin limpieza'
                        })
                    }
                }

                // Detectar dependencias faltantes
                const imports = content.match(/import .+ from ['"](.+)['"]/g) || []
                for (const imp of imports) {
                    const module = imp.match(/from ['"](.+)['"]/)?.[1]
                    if (module && !module.startsWith('.') && !module.startsWith('/')) {
                        try {
                            await import(module)
                        } catch (e) {
                            issues.push({
                                type: '🔴 Módulo no instalado',
                                severity: 'CRÍTICO',
                                detail: `Dependencia "${module}" no encontrada`
                            })
                        }
                    }
                }

            } catch (scanError) {
                issues.push({
                    type: '🔴 Error al escanear',
                    severity: 'CRÍTICO',
                    detail: scanError.message
                })
            }

            if (issues.length > 0) {
                results.withIssues++
                results.plugins.push({
                    name: file,
                    path: filePath,
                    issues
                })
            }
        }
    } catch (error) {
        console.error('Error escaneando plugins:', error)
    }

    return results
}

// Handler del comando
const handler = async (m, { conn, text, usedPrefix, command }) => {
    await m.react('🔍')

    try {
        const args = text?.trim().toLowerCase().split(' ') || []
        const subcommand = args[0] || 'list'

        // 🔹 LISTAR ERRORES RECIENTES
        if (subcommand === 'list' || !subcommand) {
            if (errorLog.length === 0) {
                return conn.reply(m.chat, `╭━━━━━━✅━━━━━━╮
│ *ESTADO DEL SISTEMA*
╰━━━━━━✅━━━━━━╯

✨ *¡Todo funcionando correctamente!*

📊 No hay errores registrados
🎯 Sistema estable
🟢 Estado: OPERATIVO

_Usa ${usedPrefix}error scan para analizar plugins_`, m)
            }

            const recent = errorLog.slice(0, 10)
            let msg = `╭━━━━━━❌━━━━━━╮
│ *ERRORES RECIENTES*
╰━━━━━━❌━━━━━━╯

📊 *Total de errores:* ${errorLog.length}
🔄 *Mostrando:* ${recent.length} más recientes

`

            recent.forEach((err, i) => {
                const time = new Date(err.timestamp).toLocaleTimeString()
                msg += `━━━━━━━━━━━━━━━━━━
${i + 1}. ${err.severity}
🔹 *ID:* \`${err.id}\`
📦 *Plugin:* ${err.plugin}
🔍 *Tipo:* ${err.type}
💬 *Error:* ${err.message.substring(0, 80)}${err.message.length > 80 ? '...' : ''}
🕐 *Hora:* ${time}

`
            })

            msg += `━━━━━━━━━━━━━━━━━━

*Comandos disponibles:*
• ${usedPrefix}error list - Ver lista
• ${usedPrefix}error detail [id] - Ver detalle
• ${usedPrefix}error stats - Estadísticas
• ${usedPrefix}error scan - Escanear plugins
• ${usedPrefix}error clear - Limpiar registro

_Usa ${usedPrefix}error detail [id] para más info_`

            await conn.reply(m.chat, msg, m)
            await m.react('✅')
            return
        }

        // 🔹 VER DETALLE DE ERROR
        if (subcommand === 'detail') {
            const errorId = args[1]
            if (!errorId) {
                return conn.reply(m.chat, `❌ *Falta el ID del error*\n\n📝 Uso: ${usedPrefix}error detail [id]\n\nEjemplo: ${usedPrefix}error detail ERR-123456...`, m)
            }

            const error = errorLog.find(e => e.id === errorId || e.id.includes(errorId))
            if (!error) {
                return conn.reply(m.chat, `❌ *Error no encontrado*\n\n🔍 ID: ${errorId}\n\n_Usa ${usedPrefix}error list para ver IDs disponibles_`, m)
            }

            const analysis = monitor.analyzeError({ message: error.message, stack: error.stack })
            const time = new Date(error.timestamp).toLocaleString()

            let msg = `╭━━━━━━🔍━━━━━━╮
│ *DETALLE DEL ERROR*
╰━━━━━━🔍━━━━━━╯

🆔 *ID:* \`${error.id}\`
${error.severity}
📦 *Plugin:* ${error.plugin}
🔍 *Tipo:* ${error.type}
🕐 *Fecha:* ${time}

━━━━━━━━━━━━━━━━━━
💬 *MENSAJE DE ERROR:*
━━━━━━━━━━━━━━━━━━
\`\`\`
${error.message}
\`\`\`

━━━━━━━━━━━━━━━━━━
🧠 *ANÁLISIS INTELIGENTE:*
━━━━━━━━━━━━━━━━━━
🔸 *Tipo detectado:* ${analysis.type}
🔸 *Causa probable:* ${analysis.cause}
🔸 *Solución sugerida:* ${analysis.solution}
`

            if (analysis.affectedFiles.length > 0) {
                msg += `\n━━━━━━━━━━━━━━━━━━
📁 *ARCHIVOS AFECTADOS:*
━━━━━━━━━━━━━━━━━━
`
                analysis.affectedFiles.forEach(f => {
                    msg += `📄 ${f.file}:${f.line}:${f.column}\n`
                })
            }

            if (error.stack && error.stack.length < 1000) {
                msg += `\n━━━━━━━━━━━━━━━━━━
📋 *STACK TRACE:*
━━━━━━━━━━━━━━━━━━
\`\`\`
${error.stack.substring(0, 800)}
\`\`\`
`
            }

            await conn.reply(m.chat, msg, m)
            await m.react('✅')
            return
        }

        // 🔹 ESTADÍSTICAS
        if (subcommand === 'stats') {
            const stats = monitor.getStats()
            const pluginStats = Object.entries(stats.byPlugin).sort((a, b) => b[1].count - a[1].count)

            let msg = `╭━━━━━━📊━━━━━━╮
│ *ESTADÍSTICAS*
╰━━━━━━📊━━━━━━╯

📊 *Total de errores:* ${stats.totalErrors}
📦 *Plugins con errores:* ${pluginStats.length}

━━━━━━━━━━━━━━━━━━
🔝 *TOP PLUGINS CON ERRORES:*
━━━━━━━━━━━━━━━━━━

`

            pluginStats.slice(0, 10).forEach((stat, i) => {
                const [plugin, data] = stat
                const lastError = new Date(data.lastError).toLocaleString()
                msg += `${i + 1}. 📦 *${plugin}*
   ❌ Errores: ${data.count}
   🕐 Último: ${lastError}

`
            })

            msg += `━━━━━━━━━━━━━━━━━━
_Actualizado: ${new Date().toLocaleString()}_`

            await conn.reply(m.chat, msg, m)
            await m.react('✅')
            return
        }

        // 🔹 ESCANEAR PLUGINS
        if (subcommand === 'scan') {
            await conn.reply(m.chat, `🔍 *Escaneando plugins...*\n\n⏳ Esto puede tardar unos segundos...`, m)
            
            const pluginsPath = path.join(process.cwd(), 'plugins')
            const results = await scanPlugins(pluginsPath)

            let msg = `╭━━━━━━🔍━━━━━━╮
│ *ESCANEO DE PLUGINS*
╰━━━━━━🔍━━━━━━╯

📊 *Total escaneados:* ${results.total}
${results.withIssues > 0 ? '⚠️' : '✅'} *Con problemas:* ${results.withIssues}
${results.total - results.withIssues > 0 ? '✅' : ''} *Sin problemas:* ${results.total - results.withIssues}

`

            if (results.withIssues > 0) {
                msg += `━━━━━━━━━━━━━━━━━━
⚠️ *PLUGINS CON PROBLEMAS:*
━━━━━━━━━━━━━━━━━━

`
                results.plugins.slice(0, 10).forEach((plugin, i) => {
                    msg += `${i + 1}. 📦 *${plugin.name}*\n`
                    plugin.issues.forEach(issue => {
                        msg += `   ${issue.type}\n   └─ ${issue.detail}\n`
                    })
                    msg += `\n`
                })

                if (results.plugins.length > 10) {
                    msg += `\n_...y ${results.plugins.length - 10} plugins más con problemas_\n`
                }
            } else {
                msg += `✨ *¡Todos los plugins están en buen estado!*\n\n🎯 No se detectaron problemas críticos`
            }

            await conn.reply(m.chat, msg, m)
            await m.react('✅')
            return
        }

        // 🔹 LIMPIAR REGISTRO
        if (subcommand === 'clear') {
            const count = errorLog.length
            errorLog.length = 0
            monitor.pluginStats.clear()
            
            await conn.reply(m.chat, `╭━━━━━━🗑️━━━━━━╮
│ *REGISTRO LIMPIADO*
╰━━━━━━🗑️━━━━━━╯

✅ Se eliminaron ${count} errores
🔄 Estadísticas reiniciadas
🎯 Sistema listo para nuevo monitoreo

_El registro de errores ha sido limpiado_`, m)
            await m.react('✅')
            return
        }

        // Comando no reconocido
        await conn.reply(m.chat, `❌ *Subcomando no reconocido*

*Comandos disponibles:*
• ${usedPrefix}error list - Lista de errores
• ${usedPrefix}error detail [id] - Ver detalle
• ${usedPrefix}error stats - Estadísticas
• ${usedPrefix}error scan - Escanear plugins
• ${usedPrefix}error clear - Limpiar registro

📖 Ejemplo: ${usedPrefix}error stats`, m)

    } catch (e) {
        await m.react('❌')
        console.error('Error en comando error:', e)
        monitor.logError('COMMAND_ERROR', 'error-detector.js', e)
        await conn.reply(m.chat, `❌ *Error ejecutando comando*\n\n💬 ${e.message}`, m)
    }
}

handler.help = ['error']
handler.tags = ['owner']
handler.command = ['error', 'errors', 'errorlog', 'debug']
handler.rowner = true

export default handler

// Exportar el monitor para que otros plugins puedan usarlo
export { monitor, ErrorMonitor }