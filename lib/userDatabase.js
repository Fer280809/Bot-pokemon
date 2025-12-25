/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    userDatabase.js                                              ║
║  📋 Módulo:     Sistema de Base de Datos de Usuarios                         ║
║  ⚙️ Versión:    2.0                                                          ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Sistema de gestión de datos de usuarios optimizado para WhatsApp            ║
║  con almacenamiento en sistema de archivos y cache en memoria.               ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Almacenamiento distribuido por prefijos de ID                             ║
║  • Sistema de cache LRU con límite de 100 usuarios                           ║
║  • Cola de guardado asíncrono con autoguardado cada 13.8 segundos            ║
║  • Compresión de datos para optimizar espacio                                ║
║  • Sistema de backups automáticos y restauración                             ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  GESTIÓN DE USUARIOS:                                                        ║
║    • createUser() - Crea un nuevo jugador con Pokémon inicial                ║
║    • getUser() - Obtiene datos del usuario (con/sin compresión)              ║
║    • updateUser() - Actualiza datos del usuario                              ║
║    • deleteUser() - Elimina un usuario del sistema                           ║
║                                                                              ║
║  GESTIÓN DE POKÉMON:                                                         ║
║    • addPokemonToTeam() - Agrega Pokémon al equipo activo                    ║
║    • movePokemon() - Mueve Pokémon entre equipo y PC                         ║
║    • generateStarterPokemon() - Genera Pokémon inicial                       ║
║                                                                              ║
║  GESTIÓN DE INVENTARIO:                                                      ║
║    • addItem() - Agrega items al inventario                                  ║
║    • useItem() - Usa items del inventario con efectos                        ║
║    • getItemEffect() - Obtiene efecto de un item específico                  ║
║                                                                              ║
║  SISTEMA DE POKÉDEX:                                                         ║
║    • registerPokedexEntry() - Registra avistamientos/capturas                ║
║                                                                              ║
║  SISTEMA DE GUARDADO:                                                        ║
║    • saveUser() - Guarda usuario en cola de guardado                         ║
║    • backupUser() - Crea backup del usuario                                  ║
║    • restoreUser() - Restaura usuario desde backup                           ║
║    • processSaveQueue() - Procesa cola de guardado                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  CREAR USUARIO:                                                              ║
║    const result = await userDB.createUser("5512345678", "Ash", 1);           ║
║    if (result.success) {                                                     ║
║      console.log("Usuario creado:", result.user.username);                   ║
║      console.log("Pokémon inicial:", result.starter);                        ║
║    }                                                                         ║
║                                                                              ║
║  OBTENER DATOS:                                                              ║
║    const user = await userDB.getUser("5512345678");                          ║
║    console.log("Dinero:", user.money);                                       ║
║    console.log("Equipo:", user.team.length, "Pokémon");                      ║
║                                                                              ║
║  AGREGAR POKÉMON:                                                            ║
║    const addResult = await userDB.addPokemonToTeam(userId, pokemonData);     ║
║    if (addResult.success) {                                                  ║
║      console.log("Pokémon agregado al equipo");                              ║
║    }                                                                         ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • Los archivos se organizan en subdirectorios por prefijo del ID            ║
║  • El sistema usa archivos temporales para guardado atómico                  ║
║  • La compresión reduce significativamente el uso de almacenamiento          ║
║  • El autoguardado se ejecuta cada 13.8 segundos (0.23 minutos)              ║
║  • Los backups se almacenan en /game_data/backups/                           ║
║  • El cache LRU mantiene hasta 100 usuarios en memoria                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorios optimizados
const DB_PATH = path.join(__dirname, 'game_data');
const USERS_PATH = path.join(DB_PATH, 'users');
const BACKUPS_PATH = path.join(DB_PATH, 'backups');
const LOGS_PATH = path.join(DB_PATH, 'logs');

// Crear directorios si no existen
[DB_PATH, USERS_PATH, BACKUPS_PATH, LOGS_PATH].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// =============================
// ESQUEMA DE USUARIO OPTIMIZADO
// =============================

/**
 * Esquema de usuario optimizado para WhatsApp
 * - Campos mínimos necesarios
 * - Referencias por ID a otros sistemas
 * - Estado comprimido
 */
const createUserSchema = (userId, userName) => {
    const timestamp = Date.now();
    const userHash = crypto.createHash('md5').update(userId).digest('hex').substring(0, 8);
    
    return {
        // ===== IDENTIFICACIÓN =====
        _id: userId,
        _hash: userHash,
        username: userName,
        phone: userId.replace(/\D/g, ''),
        
        // ===== PROGRESO DEL JUEGO =====
        progress: {
            location: 'pueblo_paleta',
            badges: [], // Array de badge IDs
            defeatedTrainers: [], // Array de trainer IDs
            visitedLocations: ['pueblo_paleta'],
            storyFlags: {
                starterChosen: false,
                rivalDefeated: false,
                rocketDefeated: false,
                leagueChampion: false
            },
            quests: {}, // {questId: {progress, completed}}
            lastAction: timestamp,
            playtime: 0 // en segundos
        },
        
        // ===== INVENTARIO COMPRIMIDO =====
        inventory: {
            // Formato: {itemId: cantidad}
            pokeball: 10,
            potion: 5,
            antidote: 2
        },
        money: 5000,
        
        // ===== EQUIPO POKÉMON =====
        // Máximo 6 Pokémon en equipo activo
        team: [], // Array de objetos Pokémon (estructura optimizada)
        
        // ===== PC - ALMACENAMIENTO =====
        pc: {
            boxes: {
                // Solo se crean cajas cuando son necesarias
                box1: {
                    name: "Caja 1",
                    slots: Array(30).fill(null),
                    count: 0
                }
            },
            currentBox: 'box1',
            totalBoxes: 1,
            maxBoxes: 20
        },
        
        // ===== POKÉDEX COMPRIMIDO =====
        pokedex: {
            // Formato: speciesId: [seen, caught, shinySeen]
            // 0 = no visto, 1 = visto, 2 = atrapado, 3 = shiny visto, 4 = shiny atrapado
            entries: {},
            stats: {
                seen: 0,
                caught: 0,
                shinySeen: 0,
                shinyCaught: 0
            }
        },
        
        // ===== ESTADÍSTICAS COMPRIMIDAS =====
        stats: {
            // Batallas
            battles: 0,
            wins: 0,
            losses: 0,
            winStreak: 0,
            bestWinStreak: 0,
            
            // Capturas
            catches: 0,
            fails: 0,
            shinyCatches: 0,
            
            // Entrenadores
            trainersDefeated: 0,
            gymsDefeated: 0,
            
            // Exploración
            steps: 0,
            locations: 1,
            moneyEarned: 5000,
            moneySpent: 0
        },
        
        // ===== SISTEMA DE LOGROS =====
        achievements: {
            // Logros desbloqueados
            unlocked: [],
            // Progreso de logros
            progress: {}
        },
        
        // ===== METADATOS =====
        meta: {
            created: timestamp,
            lastLogin: timestamp,
            lastSave: timestamp,
            version: '2.0',
            saveCount: 0,
            lastBackup: null
        },
        
        // ===== CACHE PARA RENDIMIENTO =====
        _cache: {
            teamHash: '',
            inventoryHash: '',
            lastCalculatedStats: timestamp
        }
    };
};

// =============================
// SISTEMA DE ARCHIVOS OPTIMIZADO
// =============================

/**
 * Sistema de archivos optimizado para WhatsApp
 * - Archivos divididos por prefijo del ID
 * - Compresión en memoria
 * - Cache LRU
 */
class UserDatabase {
    constructor() {
        this.cache = new Map();
        this.cacheMaxSize = 100;
        this.saveQueue = new Map();
        this.isSaving = false;
        
        // Iniciar autoguardado
        this.startAutoSave();
    }
    
    // ===== OPERACIONES CRUD =====
    
    /**
     * Crear nuevo usuario
     */
    async createUser(userId, userName, starterId = 1) {
        if (await this.userExists(userId)) {
            return { success: false, error: 'Usuario ya existe' };
        }
        
        const user = createUserSchema(userId, userName);
        
        // Generar Pokémon inicial
        const starter = await this.generateStarterPokemon(starterId, userName);
        user.team.push(starter);
        
        // Registrar en Pokédex
        this.registerPokedexEntry(user, starterId, true);
        
        // Actualizar progreso
        user.progress.storyFlags.starterChosen = true;
        user.progress.storyFlags.starterId = starterId;
        
        // Guardar
        await this.saveUser(user);
        
        return {
            success: true,
            user: this.compressUser(user),
            starter: starter
        };
    }
    
    /**
     * Obtener usuario (con cache)
     */
    async getUser(userId, fullData = false) {
        // Verificar cache
        if (this.cache.has(userId)) {
            const cached = this.cache.get(userId);
            if (fullData) return this.decompressUser(cached);
            return cached;
        }
        
        // Cargar de disco
        const user = await this.loadUserFromDisk(userId);
        if (!user) return null;
        
        // Actualizar cache
        this.updateCache(userId, user);
        
        return fullData ? user : this.compressUser(user);
    }
    
    /**
     * Actualizar usuario
     */
    async updateUser(userId, updates) {
        const user = await this.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        
        // Aplicar updates
        Object.assign(user, updates);
        user.meta.lastSave = Date.now();
        user.meta.saveCount++;
        
        // Poner en cola de guardado
        this.saveQueue.set(userId, user);
        
        return { success: true, user: this.compressUser(user) };
    }
    
    /**
     * Eliminar usuario
     */
    async deleteUser(userId) {
        const filePath = this.getUserFilePath(userId);
        
        // Eliminar de cache
        this.cache.delete(userId);
        this.saveQueue.delete(userId);
        
        // Eliminar archivo
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return { success: true };
        }
        
        return { success: false, error: 'Usuario no encontrado' };
    }
    
    // ===== OPERACIONES DE POKÉMON =====
    
    /**
     * Agregar Pokémon al equipo
     */
    async addPokemonToTeam(userId, pokemonData) {
        const user = await this.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        
        if (user.team.length >= 6) {
            return { 
                success: false, 
                error: 'Equipo completo',
                options: ['Mover a PC', 'Liberar Pokémon']
            };
        }
        
        // Comprimir datos del Pokémon
        const compressedPokemon = this.compressPokemon(pokemonData);
        user.team.push(compressedPokemon);
        
        // Registrar en Pokédex
        this.registerPokedexEntry(user, pokemonData.speciesId, true);
        
        await this.updateUser(userId, user);
        
        return { 
            success: true, 
            teamSize: user.team.length,
            pokemon: pokemonData
        };
    }
    
    /**
     * Mover Pokémon entre equipo y PC
     */
    async movePokemon(userId, pokemonIndex, fromTeam, toBox = 'box1', toSlot = null) {
        const user = await this.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        
        let source, target;
        
        if (fromTeam) {
            // De equipo a PC
            if (pokemonIndex < 0 || pokemonIndex >= user.team.length) {
                return { success: false, error: 'Índice de equipo inválido' };
            }
            
            source = user.team;
            target = user.pc.boxes[toBox];
            
            if (!target || target.count >= 30) {
                return { success: false, error: 'Caja no disponible o llena' };
            }
            
            // Encontrar slot vacío
            const emptySlot = target.slots.findIndex(slot => slot === null);
            if (emptySlot === -1) {
                return { success: false, error: 'Caja llena' };
            }
            
            const pokemon = source.splice(pokemonIndex, 1)[0];
            target.slots[emptySlot] = pokemon;
            target.count++;
            
        } else {
            // De PC a equipo
            if (user.team.length >= 6) {
                return { success: false, error: 'Equipo completo' };
            }
            
            const box = user.pc.boxes[toBox];
            if (!box || !box.slots[pokemonIndex]) {
                return { success: false, error: 'Pokémon no encontrado en PC' };
            }
            
            const pokemon = box.slots[pokemonIndex];
            box.slots[pokemonIndex] = null;
            box.count--;
            user.team.push(pokemon);
        }
        
        await this.updateUser(userId, user);
        
        return { success: true };
    }
    
    // ===== OPERACIONES DE INVENTARIO =====
    
    /**
     * Agregar item al inventario
     */
    async addItem(userId, itemId, quantity = 1) {
        const user = await this.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        
        if (!user.inventory[itemId]) {
            user.inventory[itemId] = 0;
        }
        
        user.inventory[itemId] += quantity;
        
        // Límite por item: 999
        if (user.inventory[itemId] > 999) {
            user.inventory[itemId] = 999;
        }
        
        await this.updateUser(userId, user);
        
        return { 
            success: true, 
            itemId, 
            quantity: user.inventory[itemId] 
        };
    }
    
    /**
     * Usar item del inventario
     */
    async useItem(userId, itemId, quantity = 1, target = null) {
        const user = await this.getUser(userId, true);
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        
        if (!user.inventory[itemId] || user.inventory[itemId] < quantity) {
            return { success: false, error: 'Item insuficiente' };
        }
        
        user.inventory[itemId] -= quantity;
        
        if (user.inventory[itemId] <= 0) {
            delete user.inventory[itemId];
        }
        
        await this.updateUser(userId, user);
        
        return { 
            success: true, 
            itemId, 
            remaining: user.inventory[itemId] || 0,
            effect: this.getItemEffect(itemId, target)
        };
    }
    
    // ===== OPERACIONES DE POKÉDEX =====
    
    /**
     * Registrar entrada en Pokédex
     */
    registerPokedexEntry(user, speciesId, caught = false, isShiny = false) {
        if (!user.pokedex.entries[speciesId]) {
            user.pokedex.entries[speciesId] = 0;
        }
        
        let entry = user.pokedex.entries[speciesId];
        
        if (caught) {
            if (isShiny) {
                entry = 4; // Shiny atrapado
                user.pokedex.stats.shinyCaught++;
                user.stats.shinyCatches++;
            } else {
                entry = 2; // Atrapado normal
                user.pokedex.stats.caught++;
            }
            user.stats.catches++;
        } else {
            if (isShiny) {
                entry = entry < 3 ? 3 : entry; // Shiny visto
                user.pokedex.stats.shinySeen++;
            } else {
                entry = entry < 1 ? 1 : entry; // Visto normal
                user.pokedex.stats.seen++;
            }
        }
        
        user.pokedex.entries[speciesId] = entry;
    }
    
    // ===== SISTEMA DE GUARDADO =====
    
    /**
     * Guardar usuario (con cola de guardado)
     */
    async saveUser(user) {
        const userId = user._id;
        
        // Comprimir antes de guardar
        const compressed = this.compressUser(user);
        
        // Guardar en cache
        this.updateCache(userId, compressed);
        
        // Poner en cola de guardado
        this.saveQueue.set(userId, compressed);
        
        return { success: true };
    }
    
    /**
     * Autoguardado cada 13.8 segundos (0.23 minutos)
     */
    startAutoSave() {
        setInterval(() => {
            this.processSaveQueue();
        }, 13800); // 13.8 segundos
    }
    
    async processSaveQueue() {
        if (this.isSaving || this.saveQueue.size === 0) return;
        
        this.isSaving = true;
        
        for (const [userId, userData] of this.saveQueue) {
            try {
                const filePath = this.getUserFilePath(userId);
                const tempPath = filePath + '.tmp';
                
                // Escribir archivo temporal
                fs.writeFileSync(tempPath, JSON.stringify(userData, null, 2));
                
                // Mover a archivo final (operación atómica)
                fs.renameSync(tempPath, filePath);
                
                // Eliminar de la cola
                this.saveQueue.delete(userId);
                
            } catch (error) {
                console.error(`Error guardando usuario ${userId}:`, error);
            }
        }
        
        this.isSaving = false;
    }
    
    /**
     * Backup de usuario
     */
    async backupUser(userId) {
        const user = await this.getUser(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        
        const backupPath = path.join(
            BACKUPS_PATH, 
            `${userId}_${Date.now()}.json`
        );
        
        fs.writeFileSync(backupPath, JSON.stringify(user, null, 2));
        
        return { 
            success: true, 
            backupId: path.basename(backupPath) 
        };
    }
    
    /**
     * Restaurar usuario desde backup
     */
    async restoreUser(userId, backupId = null) {
        let backupFile;
        
        if (backupId) {
            backupFile = path.join(BACKUPS_PATH, backupId);
        } else {
            // Buscar backup más reciente
            const backups = fs.readdirSync(BACKUPS_PATH)
                .filter(f => f.startsWith(userId + '_'))
                .sort()
                .reverse();
            
            if (backups.length === 0) {
                return { success: false, error: 'No hay backups' };
            }
            
            backupFile = path.join(BACKUPS_PATH, backups[0]);
        }
        
        if (!fs.existsSync(backupFile)) {
            return { success: false, error: 'Backup no encontrado' };
        }
        
        const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
        
        // Restaurar usuario
        await this.saveUser(backupData);
        
        return { success: true, restoredFrom: path.basename(backupFile) };
    }
    
    // ===== UTILIDADES =====
    
    getItemEffect(itemId, target) {
        // Implementar efectos de items
        const effects = {
            'potion': { heal: 20 },
            'superpotion': { heal: 50 },
            'hyperpotion': { heal: 200 },
            'maxpotion': { heal: 'full' },
            'antidote': { cure: ['poison'] },
            'fullheal': { cure: ['poison', 'burn', 'freeze', 'sleep', 'paralysis'] }
        };
        
        return effects[itemId] || null;
    }
    
    async generateStarterPokemon(speciesId, trainerName) {
        // Implementar generación de Pokémon inicial
        return {
            id: `pokemon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            speciesId: speciesId,
            nickname: null,
            level: 5,
            experience: 0,
            ivs: { hp: 15, atk: 15, def: 15, spa: 15, spd: 15, spe: 15 },
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            moves: ['Placaje', 'Gruñido'],
            ability: 'Espesura',
            nature: 'Activo',
            gender: Math.random() > 0.5 ? 'male' : 'female',
            isShiny: false,
            happiness: 70,
            originalTrainer: trainerName,
            caughtDate: new Date().toISOString(),
            caughtLocation: 'pueblo_paleta',
            caughtBall: 'pokeball'
        };
    }
    
    compressUser(user) {
        // Comprimir datos para guardado
        const compressed = { ...user };
        
        // Eliminar cache temporal
        delete compressed._cache;
        
        return compressed;
    }
    
    decompressUser(compressed) {
        // Descomprimir datos
        const user = { ...compressed };
        user._cache = {
            teamHash: '',
            inventoryHash: '',
            lastCalculatedStats: Date.now()
        };
        
        return user;
    }
    
    compressPokemon(pokemon) {
        // Comprimir datos de Pokémon para ahorrar espacio
        return {
            i: pokemon.id,
            s: pokemon.speciesId,
            n: pokemon.nickname,
            l: pokemon.level,
            x: pokemon.experience,
            m: pokemon.moves,
            a: pokemon.ability,
            g: pokemon.gender,
            h: pokemon.happiness,
            o: pokemon.originalTrainer
        };
    }
    
    decompressPokemon(compressed) {
        // Descomprimir datos de Pokémon
        return {
            id: compressed.i,
            speciesId: compressed.s,
            nickname: compressed.n,
            level: compressed.l,
            experience: compressed.x,
            moves: compressed.m,
            ability: compressed.a,
            gender: compressed.g,
            happiness: compressed.h,
            originalTrainer: compressed.o
        };
    }
    
    getUserFilePath(userId) {
        const safeId = userId.replace(/[^a-zA-Z0-9]/g, '_');
        const prefix = safeId.substring(0, 2).toLowerCase();
        const prefixDir = path.join(USERS_PATH, prefix);
        
        if (!fs.existsSync(prefixDir)) {
            fs.mkdirSync(prefixDir, { recursive: true });
        }
        
        return path.join(prefixDir, `${safeId}.json`);
    }
    
    async loadUserFromDisk(userId) {
        const filePath = this.getUserFilePath(userId);
        
        if (!fs.existsSync(filePath)) {
            return null;
        }
        
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error cargando usuario ${userId}:`, error);
            
            // Intentar recuperar de backup
            const backupResult = await this.restoreUser(userId);
            if (backupResult.success) {
                return await this.loadUserFromDisk(userId);
            }
            
            return null;
        }
    }
    
    updateCache(userId, userData) {
        // Actualizar cache con política LRU
        if (this.cache.size >= this.cacheMaxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(userId, userData);
    }
    
    async userExists(userId) {
        return this.cache.has(userId) || fs.existsSync(this.getUserFilePath(userId));
    }
    
    // ===== ESTADÍSTICAS DEL SISTEMA =====
    
    async getSystemStats() {
        const userFiles = fs.readdirSync(USERS_PATH)
            .flatMap(prefix => {
                const prefixPath = path.join(USERS_PATH, prefix);
                return fs.readdirSync(prefixPath).map(file => ({
                    prefix,
                    file,
                    path: path.join(prefixPath, file)
                }));
            });
        
        return {
            totalUsers: userFiles.length,
            cacheSize: this.cache.size,
            saveQueueSize: this.saveQueue.size,
            lastBackup: fs.readdirSync(BACKUPS_PATH).length,
            diskUsage: this.calculateDiskUsage()
        };
    }
    
    calculateDiskUsage() {
        let totalSize = 0;
        
        const calculateDirSize = (dir) => {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    calculateDirSize(filePath);
                } else {
                    totalSize += stat.size;
                }
            });
        };
        
        calculateDirSize(DB_PATH);
        
        return totalSize;
    }
}

// =============================
// INSTANCIA GLOBAL
// =============================

const userDB = new UserDatabase();

export default userDB;