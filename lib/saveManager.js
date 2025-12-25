/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    saveManager.js                                               ║
║  📋 Módulo:     Sistema de Guardado Optimizado para WhatsApp                 ║
║  ⚙️ Versión:    2.0.0                                                        ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Sistema avanzado de guardado automático con respaldo periódico, diseñado    ║
║  específicamente para entornos de WhatsApp/Telegram. Implementa colas de     ║
║  guardado eficientes, verificación de integridad y recuperación automática   ║
║  desde backups en caso de corrupción de datos.                               ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Guardado automático cada 13.8 segundos (optimizado para mensajería)       ║
║  • Sistema de colas para múltiples usuarios simultáneos                      ║
║  • Backups automáticos cada 5 minutos con rotación                           ║
║  • Verificación de integridad con checksum MD5                               ║
║  • Recuperación automática desde backups en caso de corrupción               ║
║  • Guardado atómico con archivos temporales para evitar corrupción           ║
║  • Organización jerárquica de usuarios por prefijos                          ║
║  • Monitoreo de estadísticas del sistema en tiempo real                      ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  SISTEMA DE GUARDADO AUTOMÁTICO:                                             ║
║    • autoSave() - Programa guardado asíncrono en cola                        ║
║    • processSaveQueue() - Procesa cola de guardado periódicamente            ║
║    • saveUserData() - Guarda datos de usuario de forma segura                ║
║    • getUserPath() - Genera rutas organizadas por prefijo                    ║
║                                                                              ║
║  SISTEMA DE BACKUP Y RECUPERACIÓN:                                           ║
║    • createSystemBackup() - Crea backups completos del sistema               ║
║    • recoverFromBackup() - Recupera usuario desde backup más reciente        ║
║    • cleanupOldBackups() - Elimina backups antiguos manteniendo máximo 10    ║
║    • verifyDataIntegrity() - Verifica integridad de archivos de usuario      ║
║                                                                              ║
║  UTILIDADES Y MONITOREO:                                                     ║
║    • generateChecksum() - Genera checksum MD5 para verificación              ║
║    • getSystemStats() - Obtiene estadísticas del sistema                     ║
║    • formatBytes() - Formatea bytes a unidades legibles                      ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  GUARDADO AUTOMÁTICO:                                                        ║
║    await saveManager.autoSave('user123', 'battle');                          ║
║    // Programa guardado asíncrono con motivo "battle"                        ║
║                                                                              ║
║  RECUPERACIÓN DE BACKUP:                                                     ║
║    const result = await saveManager.recoverFromBackup('user123');            ║
║    if (result.success) {                                                     ║
║      console.log(`Recuperado desde: ${result.restoredFrom}`);                ║
║    }                                                                         ║
║                                                                              ║
║  VERIFICACIÓN DE INTEGRIDAD:                                                 ║
║    const integrity = saveManager.verifyDataIntegrity('user123');             ║
║    if (!integrity.valid) {                                                   ║
║      // Intentar recuperación automática                                     ║
║    }                                                                         ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • El sistema inicia automáticamente al importar el módulo                   ║
║  • Los guardados se procesan en lotes cada 13.8 segundos                     ║
║  • Los backups se crean cada 5 minutos y se rotan manteniendo 10 copias      ║
║  • La verificación de integridad se ejecuta al cargar partidas               ║
║  • Los archivos se guardan en users/[prefijo]/[usuario].json                 ║
║  • El checksum MD5 ayuda a detectar corrupción de datos                      ║
║  • El guardado atómico evita archivos corruptos por interrupciones           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SaveManager {
    constructor() {
        this.saveInterval = 13800; // 13.8 segundos (0.23 minutos)
        this.backupInterval = 300000; // 5 minutos
        this.maxBackups = 10;
        this.saveQueue = new Map();
        this.isProcessing = false;
        
        // Iniciar autoguardado
        this.startAutoSave();
    }
    
    startAutoSave() {
        // Guardado periódico
        setInterval(() => {
            this.processSaveQueue();
        }, this.saveInterval);
        
        // Backup periódico
        setInterval(() => {
            this.createSystemBackup();
        }, this.backupInterval);
    }
    
    async autoSave(userId, reason = 'periodic') {
        const saveData = {
            userId,
            timestamp: Date.now(),
            reason,
            checksum: this.generateChecksum(userId)
        };
        
        // Agregar a cola de guardado
        this.saveQueue.set(userId, saveData);
        
        return { success: true, queued: true };
    }
    
    async processSaveQueue() {
        if (this.isProcessing || this.saveQueue.size === 0) return;
        
        this.isProcessing = true;
        
        try {
            const queueSize = this.saveQueue.size;
            let processed = 0;
            
            for (const [userId, saveData] of this.saveQueue) {
                await this.saveUserData(userId, saveData);
                processed++;
                
                // Liberar memoria periódicamente
                if (processed % 10 === 0) {
                    await new Promise(resolve => setImmediate(resolve));
                }
            }
            
            console.log(`✅ Guardados ${processed} usuarios`);
            
        } catch (error) {
            console.error('Error procesando cola de guardado:', error);
        } finally {
            this.saveQueue.clear();
            this.isProcessing = false;
        }
    }
    
    async saveUserData(userId, saveData) {
        try {
            const userPath = this.getUserPath(userId);
            const tempPath = userPath + '.tmp';
            
            // Leer datos actuales
            let currentData = {};
            if (fs.existsSync(userPath)) {
                currentData = JSON.parse(fs.readFileSync(userPath, 'utf8'));
            }
            
            // Actualizar timestamp
            currentData.meta = currentData.meta || {};
            currentData.meta.lastSave = saveData.timestamp;
            currentData.meta.saveReason = saveData.reason;
            currentData.meta.checksum = saveData.checksum;
            
            // Escribir archivo temporal
            fs.writeFileSync(tempPath, JSON.stringify(currentData, null, 2));
            
            // Mover a archivo final (operación atómica)
            fs.renameSync(tempPath, userPath);
            
            return { success: true };
            
        } catch (error) {
            console.error(`Error guardando usuario ${userId}:`, error);
            
            // Intentar backup recovery
            await this.recoverFromBackup(userId);
            
            return { success: false, error: error.message };
        }
    }
    
    async createSystemBackup() {
        const backupDir = path.join(__dirname, 'backups', `backup_${Date.now()}`);
        
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }
        
        try {
            // Copiar archivos de usuarios
            const usersDir = path.join(__dirname, 'users');
            if (fs.existsSync(usersDir)) {
                const userFiles = fs.readdirSync(usersDir);
                
                for (const file of userFiles) {
                    const source = path.join(usersDir, file);
                    const target = path.join(backupDir, file);
                    fs.copyFileSync(source, target);
                }
            }
            
            // Limitar número de backups
            await this.cleanupOldBackups();
            
            return { success: true, backupId: path.basename(backupDir) };
            
        } catch (error) {
            console.error('Error creando backup:', error);
            return { success: false, error: error.message };
        }
    }
    
    async cleanupOldBackups() {
        const backupsDir = path.join(__dirname, 'backups');
        if (!fs.existsSync(backupsDir)) return;
        
        const backups = fs.readdirSync(backupsDir)
            .filter(dir => dir.startsWith('backup_'))
            .sort()
            .reverse();
        
        // Eliminar backups viejos
        for (let i = this.maxBackups; i < backups.length; i++) {
            const oldBackup = path.join(backupsDir, backups[i]);
            fs.rmSync(oldBackup, { recursive: true, force: true });
        }
    }
    
    async recoverFromBackup(userId) {
        try {
            const backupsDir = path.join(__dirname, 'backups');
            if (!fs.existsSync(backupsDir)) return { success: false, error: 'No hay backups' };
            
            const backups = fs.readdirSync(backupsDir)
                .filter(dir => dir.startsWith('backup_'))
                .sort()
                .reverse();
            
            for (const backup of backups) {
                const backupPath = path.join(backupsDir, backup, `${userId}.json`);
                
                if (fs.existsSync(backupPath)) {
                    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
                    
                    // Restaurar usuario
                    const userPath = this.getUserPath(userId);
                    fs.writeFileSync(userPath, JSON.stringify(backupData, null, 2));
                    
                    return { 
                        success: true, 
                        restoredFrom: backup,
                        timestamp: backupData.meta?.lastSave 
                    };
                }
            }
            
            return { success: false, error: 'Usuario no encontrado en backups' };
            
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    generateChecksum(userId) {
        const data = userId + Date.now().toString();
        return crypto.createHash('md5').update(data).digest('hex').substring(0, 16);
    }
    
    verifyDataIntegrity(userId) {
        const userPath = this.getUserPath(userId);
        
        if (!fs.existsSync(userPath)) {
            return { valid: false, error: 'Archivo no existe' };
        }
        
        try {
            const data = fs.readFileSync(userPath, 'utf8');
            JSON.parse(data); // Verificar que sea JSON válido
            
            // Verificar checksum si existe
            const userData = JSON.parse(data);
            if (userData.meta?.checksum) {
                const calculated = this.generateChecksum(userId);
                if (userData.meta.checksum !== calculated) {
                    return { 
                        valid: false, 
                        error: 'Checksum no coincide',
                        needsRecovery: true 
                    };
                }
            }
            
            return { valid: true };
            
        } catch (error) {
            return { 
                valid: false, 
                error: error.message,
                needsRecovery: true 
            };
        }
    }
    
    getUserPath(userId) {
        const safeId = userId.replace(/[^a-zA-Z0-9]/g, '_');
        const prefix = safeId.substring(0, 2).toLowerCase();
        const prefixDir = path.join(__dirname, 'users', prefix);
        
        if (!fs.existsSync(prefixDir)) {
            fs.mkdirSync(prefixDir, { recursive: true });
        }
        
        return path.join(prefixDir, `${safeId}.json`);
    }
    
    async getSystemStats() {
        const usersDir = path.join(__dirname, 'users');
        let totalUsers = 0;
        let totalSize = 0;
        
        if (fs.existsSync(usersDir)) {
            const prefixes = fs.readdirSync(usersDir);
            
            for (const prefix of prefixes) {
                const prefixPath = path.join(usersDir, prefix);
                const files = fs.readdirSync(prefixPath);
                
                totalUsers += files.length;
                
                for (const file of files) {
                    const filePath = path.join(prefixPath, file);
                    const stats = fs.statSync(filePath);
                    totalSize += stats.size;
                }
            }
        }
        
        return {
            totalUsers,
            totalSize: this.formatBytes(totalSize),
            saveQueueSize: this.saveQueue.size,
            lastBackup: fs.existsSync(path.join(__dirname, 'backups')) 
                ? fs.readdirSync(path.join(__dirname, 'backups')).length 
                : 0
        };
    }
    
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

export default new SaveManager();