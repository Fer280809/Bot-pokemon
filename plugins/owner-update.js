import fetch from "node-fetch"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

let handler = async (m, { conn, usedPrefix, text }) => {
  try {
    // Verificar si es owner
    if (!global.owner.includes(m.sender.split('@')[0])) {
      return m.reply('🚫 Este comando solo está disponible para el owner del bot.')
    }

    const REPO_URL = 'https://github.com/Fer280809/Bot-pokemon'
    const REPO_GIT_URL = 'https://github.com/Fer280809/Bot-pokemon.git'
    const botDir = process.cwd()

    // Función para ejecutar comandos con mejor manejo de errores
    const execCmd = async (cmd, ignoreErrors = false) => {
      try {
        const { stdout, stderr } = await execAsync(cmd, { cwd: botDir })
        return { stdout: stdout.trim(), stderr: stderr.trim() }
      } catch (error) {
        if (ignoreErrors) {
          return { stdout: '', stderr: error.message }
        }
        throw error
      }
    }

    // Si no hay argumento, mostrar ramas disponibles
    if (!text || text.trim() === '') {
      await m.react('🔍')
      
      try {
        // Verificar si es repositorio Git
        try {
          await execCmd('git rev-parse --git-dir')
        } catch {
          return m.reply(`❌ *Este directorio no es un repositorio Git*\n\nPara usar este comando, el bot debe estar en:\n${REPO_URL}\n\nClona el repositorio primero con:\n\`git clone ${REPO_GIT_URL}\``)
        }

        // Obtener rama actual
        const { stdout: ramaActual } = await execCmd('git branch --show-current')
        
        // Obtener todas las ramas remotas
        await execCmd('git fetch origin --prune', true)
        const { stdout: ramasRemotas } = await execCmd('git branch -r', true)
        
        // Procesar ramas remotas
        const ramas = ramasRemotas
          .split('\n')
          .map(r => r.trim())
          .filter(r => r && !r.includes('HEAD') && r.startsWith('origin/'))
          .map(r => r.replace('origin/', ''))
        
        if (ramas.length === 0) {
          return m.reply('❌ No se encontraron ramas remotas.')
        }

        // Obtener información de cada rama
        let listaRamas = `🌿 *RAMAS DISPONIBLES*\n\n`
        listaRamas += `📦 *Repositorio:* ${REPO_URL}\n`
        listaRamas += `📍 *Rama actual:* \`${ramaActual}\`\n\n`
        
        for (const rama of ramas.slice(0, 10)) { // Limitar a 10 ramas
          try {
            const { stdout: lastCommit } = await execCmd(`git log origin/${rama} -1 --pretty=format:"%s" 2>/dev/null || echo "Sin información"`, true)
            const { stdout: commitDate } = await execCmd(`git log origin/${rama} -1 --pretty=format:"%cr" 2>/dev/null || echo "Sin fecha"`, true)
            const esActual = rama === ramaActual
            
            listaRamas += `${esActual ? '🔹' : '▫️'} *${rama}*\n`
            listaRamas += `   📝 ${lastCommit.substring(0, 50)}${lastCommit.length > 50 ? '...' : ''}\n`
            listaRamas += `   🕐 ${commitDate}\n\n`
          } catch (e) {
            listaRamas += `${rama === ramaActual ? '🔹' : '▫️'} *${rama}*\n\n`
          }
        }

        if (ramas.length > 10) {
          listaRamas += `... y ${ramas.length - 10} ramas más\n\n`
        }

        listaRamas += `\n💡 *Uso:*\n`
        listaRamas += `• \`${usedPrefix}update\` - Ver ramas\n`
        listaRamas += `• \`${usedPrefix}update main\` - Actualizar rama principal\n`
        listaRamas += `• \`${usedPrefix}update <rama>\` - Cambiar y actualizar`

        await m.react('✅')
        return m.reply(listaRamas)

      } catch (error) {
        await m.react('❌')
        return m.reply(`❌ *Error al obtener ramas*\n\n${error.message}`)
      }
    }

    // Si hay argumento, proceder con la actualización
    const ramaDeseada = text.trim()
    
    await m.react('🕒')
    
    const msgInicial = await conn.sendMessage(m.chat, { 
      text: `🔄 *Iniciando actualización*\n\n🌿 Rama: ${ramaDeseada}\n⏳ Esto puede tomar 1-2 minutos...` 
    }, { quoted: m })

    const backupDir = `${botDir}/backup_update_${Date.now()}`
    const backupCustomDir = `${botDir}/custom_files_${Date.now()}`

    // Función para actualizar el mensaje
    const actualizarMensaje = async (texto) => {
      try {
        await conn.sendMessage(m.chat, { 
          text: texto, 
          edit: msgInicial.key 
        })
      } catch (e) {
        console.log('No se pudo editar mensaje:', e.message)
      }
    }

    // Paso 1: Verificar que es un repositorio Git
    await actualizarMensaje(`🔄 *Verificando repositorio...*`)
    
    try {
      await execCmd('git rev-parse --git-dir')
    } catch {
      await m.react('❌')
      await actualizarMensaje(`❌ *No es un repositorio Git*`)
      return
    }

    // Paso 2: Identificar archivos personalizados (untracked files)
    await actualizarMensaje(`🔄 *Buscando archivos personalizados...*`)
    
    const { stdout: untrackedFiles } = await execCmd('git status --porcelain | grep "^??" | cut -c4-', true)
    const filesToBackup = untrackedFiles.split('\n').filter(f => f.trim()).slice(0, 20) // Limitar a 20 archivos
    
    if (filesToBackup.length > 0) {
      await actualizarMensaje(`🔄 *Detectados ${filesToBackup.length} archivos personalizados*\n\nGuardando respaldo...`)
      
      // Crear directorio para archivos personalizados
      await execCmd(`mkdir -p "${backupCustomDir}"`)
      
      for (const file of filesToBackup) {
        if (file.trim()) {
          try {
            await execCmd(`cp -r "${botDir}/${file}" "${backupCustomDir}/${file}" 2>/dev/null || true`)
          } catch (e) {
            console.log(`No se pudo respaldar ${file}:`, e.message)
          }
        }
      }
      
      await actualizarMensaje(`🔄 *Archivos personales respaldados:*\n${filesToBackup.map(f => `• ${f}`).join('\n').substring(0, 300)}...`)
    }

    // Paso 3: Crear backup general
    await actualizarMensaje(`🔄 *Creando respaldo general...*`)

    await execCmd(`mkdir -p "${backupDir}"`)

    const backupFiles = ['database.json', 'settings.js', 'sessions', '.env', 'lib/', 'plugins/']
    for (const file of backupFiles) {
      try {
        await execCmd(`cp -r "${botDir}/${file}" "${backupDir}/${file}" 2>/dev/null || true`)
      } catch (e) {
        console.log(`No se pudo respaldar ${file}:`, e.message)
      }
    }

    // Paso 4: Verificar si la rama existe
    await actualizarMensaje(`🔄 *Verificando rama ${ramaDeseada}...*`)
    
    try {
      await execCmd('git fetch origin --prune', true)
      const { stdout: ramasRemotas } = await execCmd('git branch -r', true)
      const ramaExiste = ramasRemotas.includes(`origin/${ramaDeseada}`)
      
      if (!ramaExiste) {
        await m.react('❌')
        await actualizarMensaje(`❌ *Rama no encontrada*\n\nLa rama "${ramaDeseada}" no existe.`)
        return
      }
    } catch (e) {
      console.log('Error verificando rama:', e.message)
    }

    // Paso 5: Limpiar archivos que causan conflicto
    await actualizarMensaje(`🔄 *Limpiando archivos conflictivos...*`)
    
    if (filesToBackup.length > 0) {
      // Mover archivos personalizados temporalmente
      for (const file of filesToBackup) {
        if (file.trim()) {
          try {
            await execCmd(`mv "${botDir}/${file}" "${botDir}/${file}.bak" 2>/dev/null || true`)
          } catch (e) {
            // Si no se puede mover, intentar eliminar
            try {
              await execCmd(`rm -rf "${botDir}/${file}" 2>/dev/null || true`)
            } catch (e2) {}
          }
        }
      }
    }

    // Paso 6: Guardar cambios locales
    await actualizarMensaje(`🔄 *Guardando cambios locales...*`)
    
    try {
      await execCmd('git stash push -m "backup_auto_update"')
    } catch (e) {
      console.log('No se pudo hacer stash:', e.message)
    }

    // Paso 7: Obtener rama actual
    const { stdout: ramaActual } = await execCmd('git branch --show-current', true)
    const cambioRama = ramaActual !== ramaDeseada

    // Paso 8: Actualizar
    await actualizarMensaje(`🔄 *Actualizando código...*`)
    
    try {
      if (cambioRama) {
        // Cambiar de rama
        await execCmd(`git checkout ${ramaDeseada}`)
      }
      
      // Hacer pull
      const { stdout: pullResult } = await execCmd(`git pull origin ${ramaDeseada} --no-rebase`)
      
      if (pullResult.includes('error') || pullResult.includes('fatal')) {
        throw new Error('Error en git pull: ' + pullResult)
      }

      // Paso 9: Restaurar archivos personalizados si existen
      if (filesToBackup.length > 0) {
        await actualizarMensaje(`🔄 *Restaurando archivos personales...*`)
        
        // Primero eliminar backups temporales
        for (const file of filesToBackup) {
          if (file.trim()) {
            try {
              await execCmd(`rm -rf "${botDir}/${file}.bak" 2>/dev/null || true`)
            } catch (e) {}
          }
        }
        
        // Restaurar desde el respaldo
        for (const file of filesToBackup) {
          if (file.trim()) {
            try {
              await execCmd(`cp -r "${backupCustomDir}/${file}" "${botDir}/${file}" 2>/dev/null || true`)
            } catch (e) {
              console.log(`No se pudo restaurar ${file}:`, e.message)
            }
          }
        }
      }

      // Paso 10: Verificar si hay que actualizar dependencias
      const packageChanged = pullResult.toLowerCase().includes('package.json')
      
      if (packageChanged) {
        await actualizarMensaje(`🔄 *Actualizando dependencias...*`)
        
        try {
          await execCmd('npm install --legacy-peer-deps', true)
        } catch (e) {
          console.log('Error en npm install:', e.message)
          try {
            await execCmd('npm install --force', true)
          } catch (e2) {
            console.log('Error en npm install --force:', e2.message)
          }
        }
      }

      // Paso 11: Restaurar configuraciones importantes
      await actualizarMensaje(`🔄 *Restaurando configuraciones...*`)
      
      const restoreConfig = async (file) => {
        try {
          await execCmd(`[ -f "${backupDir}/${file}" ] && cp "${backupDir}/${file}" "${botDir}/${file}"`, true)
        } catch (e) {}
      }
      
      await restoreConfig('database.json')
      await restoreConfig('settings.js')
      await restoreConfig('.env')
      
      // Restaurar sessions si existe
      try {
        await execCmd(`[ -d "${backupDir}/sessions" ] && cp -r "${backupDir}/sessions" "${botDir}/"`, true)
      } catch (e) {}

      // Paso 12: Información final
      const { stdout: commitHash } = await execCmd('git log -1 --pretty=format:"%h"', true)
      const { stdout: commitMsg } = await execCmd('git log -1 --pretty=format:"%s"', true)
      const { stdout: ramaFinal } = await execCmd('git branch --show-current', true)

      const mensajeFinal = `
✅ *ACTUALIZACIÓN COMPLETADA*

📦 *Repositorio:* Bot-pokemon
🌿 *Rama:* \`${ramaFinal}\`
${cambioRama ? `🔀 Cambiada desde: \`${ramaActual}\`\n` : ''}
📝 *Último commit:*
   🔹 ${commitHash}
   👤 ${commitMsg}

${filesToBackup.length > 0 ? `📁 *Archivos personales restaurados:* ${filesToBackup.length}\n` : ''}
${packageChanged ? '📦 *Dependencias actualizadas*\n' : ''}

⚠️ *Pasos recomendados:*
1. Verifica que todo funciona
2. Usa \`.menu\` para probar comandos
3. Si hay problemas, usa \`.report\`

💾 *Backups creados:*
   • ${backupDir}
   ${filesToBackup.length > 0 ? `• ${backupCustomDir}` : ''}

Los backups se eliminarán automáticamente en 5 minutos.
      `.trim()

      await m.react('✅')
      await actualizarMensaje(mensajeFinal)

      // Limpiar backups después de 5 minutos
      setTimeout(async () => {
        try {
          await execCmd(`rm -rf "${backupDir}"`, true)
          if (filesToBackup.length > 0) {
            await execCmd(`rm -rf "${backupCustomDir}"`, true)
          }
        } catch (e) {
          console.log('No se pudieron eliminar backups:', e.message)
        }
      }, 300000)

    } catch (error) {
      // ERROR: Restaurar todo
      await actualizarMensaje(`❌ *Error en actualización*\n\nRestaurando versión anterior...`)
      
      try {
        // Restaurar desde backup general
        await execCmd(`cp -r "${backupDir}/." "${botDir}/" 2>/dev/null || true`)
        
        // Restaurar archivos personalizados
        if (filesToBackup.length > 0) {
          for (const file of filesToBackup) {
            if (file.trim()) {
              try {
                await execCmd(`cp -r "${backupCustomDir}/${file}" "${botDir}/${file}" 2>/dev/null || true`)
              } catch (e) {}
            }
          }
        }
        
        // Restaurar rama si fue cambiada
        if (cambioRama && ramaActual) {
          await execCmd(`git checkout ${ramaActual}`, true)
        }
        
        await execCmd('git reset --hard HEAD', true)
        
        await m.react('❌')
        await actualizarMensaje(
          `❌ *Actualización fallida*\n\nSe restauró la versión anterior.\n\nError: ${error.message}\n\n📍 Backups guardados en:\n• ${backupDir}\n${filesToBackup.length > 0 ? `• ${backupCustomDir}` : ''}`
        )
        
      } catch (restoreError) {
        await m.react('💀')
        await actualizarMensaje(
          `💀 *Error crítico*\n\nNo se pudo restaurar. Backups en:\n• ${backupDir}\n${filesToBackup.length > 0 ? `• ${backupCustomDir}` : ''}\n\nContacta al desarrollador.`
        )
      }
    }

  } catch (error) {
    await m.react('✖️')
    await conn.sendMessage(m.chat, { 
      text: `⚠️ *Error inesperado*\n\n${error.message}` 
    }, { quoted: m })
  }
}

handler.help = ['actualizar', 'update', 'upgrade']
handler.tags = ['owner']
handler.command = ['actualizar', 'update', 'upgrade']
handler.group = false
handler.owner = true
handler.admin = false
handler.botAdmin = false

export default handler
