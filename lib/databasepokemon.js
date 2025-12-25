/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           🄿 🄾 🄺 🄴 🄱 🄾 🅃                             ║
║                         by FERNANDO & Orion'sWolf                            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📁 Archivo:    databasepokemon.js                                           ║
║  📋 Módulo:     Base de datos completa de Pokémon Kanto                      ║
║  ⚙️ Versión:    2.0.0 (Generación 1 - 151 Pokémon)                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📖 DESCRIPCIÓN:                                                             ║
║  ================                                                            ║
║  Base de datos completa y funcional de los 151 Pokémon de la región Kanto,   ║
║  con todos los datos necesarios para un juego RPG de Pokémon: estadísticas,  ║
║  movimientos, evoluciones, sistema de batalla, tipos, experiencia, EV/IV,    ║
║  captura, encuentros salvajes y utilidades para la gestión de Pokémon.       ║
║                                                                              ║
║  ✨ CARACTERÍSTICAS PRINCIPALES:                                             ║
║  • Base de datos completa de 151 Pokémon (IDs 1-151)                         ║
║  • Sistema de estadísticas con IV/EV y fórmulas de cálculo                   ║
║  • Sistema de movimientos con más de 70 movimientos detallados               ║
║  • Tabla de tipos completa (Generación 1)                                    ║
║  • Sistema de evolución (nivel, piedras, amistad, intercambio)               ║
║  • Sistema de batalla con cálculos de daño y precisión                       ║
║  • Sistema de captura con probabilidades por bola y estado                   ║
║  • Encuentros salvajes por zonas/rutas                                       ║
║  • Generación aleatoria de Pokémon salvajes                                  ║
║  • Sistema de experiencia por nivel y crecimiento                            ║
║  • Estados alterados (quemado, envenenado, paralizado, etc.)                 ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔧 FUNCIONES PRINCIPALES:                                                   ║
║  ========================                                                    ║
║                                                                              ║
║  GESTIÓN DE POKÉMON:                                                         ║
║    • pokemonDB.pokemons - Objeto con todos los Pokémon (ID 1-151)            ║
║    • utils.calculateStats() - Calcula stats reales con IV/EV/nivel           ║
║    • utils.generateWildPokemon() - Genera Pokémon salvajes aleatorios        ║
║    • utils.evolvePokemon() - Evoluciona un Pokémon a nueva especie           ║
║    • utils.checkEvolution() - Verifica condiciones de evolución              ║
║                                                                              ║
║  SISTEMA DE BATALLA:                                                         ║
║    • battleUtils.calculateDamage() - Calcula daño de movimientos             ║
║    • battleUtils.calculateAccuracy() - Calcula precisión de ataques          ║
║    • battleUtils.getTypeEffectiveness() - Efectividad de tipos               ║
║    • battleUtils.applyStatusEffect() - Aplica estados alterados              ║
║    • battleUtils.gainExperience() - Sistema de experiencia por batalla       ║
║    • typeChart - Tabla de efectividad de tipos (Generación 1)                ║
║                                                                              ║
║  SISTEMA DE CAPTURA Y ENCUENTROS:                                            ║
║    • battleUtils.calculateCaptureRate() - Probabilidad de captura            ║
║    • battleUtils.attemptCapture() - Intento de captura                       ║
║    • wildEncounters - Tabla de encuentros por zona/ruta                      ║
║    • utils.generateIVs() - Genera IVs aleatorios (0-31)                      ║
║    • utils.getRandomGender() - Asigna género basado en ratio                 ║
║                                                                              ║
║  DATOS DE MOVIMIENTOS:                                                       ║
║    • moves - Base de datos de movimientos (tipo, poder, precisión, PP)       ║
║    • Efectos especiales (quemar, paralizar, envenenar, confundir, etc.)      ║
║    • Movimientos multi-golpe, de drenaje, OHKO, carga, etc.                  ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎯 EJEMPLOS DE USO:                                                         ║
║  =================                                                           ║
║                                                                              ║
║  EJEMPLO 1: Generar un Pokémon salvaje                                       ║
║    const wildPikachu = pokemonDB.utils.generateWildPokemon(25, 10);          ║
║    // Genera un Pikachu nivel 10 con IVs aleatorios                          ║
║                                                                              ║
║  EJEMPLO 2: Calcular daño en batalla                                         ║
║    const damage = pokemonDB.battleUtils.calculateDamage(                     ║
║      attacker, defender, "Lanzallamas", false                                ║
║    );                                                                        ║
║    // Calcula daño de Lanzallamas                                            ║
║                                                                              ║
║  EJEMPLO 3: Verificar evolución                                              ║
║    const canEvolve = pokemonDB.utils.checkEvolution(                         ║
║      4, 16, { item: null }                                                   ║
║    );                                                                        ║
║    // Verifica si Charmander puede evolucionar a nivel 16                    ║
║                                                                              ║
║  EJEMPLO 4: Calcular experiencia                                             ║
║    const expToNext = pokemonDB.utils.calculateExperienceToNext(              ║
║      25, "medium_slow"                                                       ║
║    );                                                                        ║
║    // Experiencia necesaria para pasar del nivel 25 al 26                    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ NOTAS IMPORTANTES:                                                       ║
║  • Esta base de datos sigue mecánicas de la Generación 1                     ║
║  • Los tipos Siniestro y Hada están incluidos para compatibilidad            ║
║  • Algunos Pokémon tienen evoluciones de generaciones posteriores            ║ 
║  (ej: Crobat)                                                                ║
║  • Los movimientos y efectos pueden diferir ligeramente de los               ║  
║  juegos oficiales                                                            ║
║  • Los Pokémon legendarios tienen ratio de captura muy bajo (3)              ║
║  • Mew tiene ratio de captura 45 (como en Pokémon Rojo/Azul)                 ║
║  • Los Pokémon sin género tienen genderRatio: -1                             ║
║  • Los Pokémon solo macho/hembra tienen ratio 1.0 o 0.0                      ║
║  • Los huevos de Pokémon legendarios requieren más pasos para eclosionar     ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
export const pokemonDB = {
  // Base de datos de 151 Pokémon Kanto
  pokemons: {
    1: {
      id: 1,
      name: "Bulbasaur",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },
      moves: {
        1: "Placaje",
        3: "Gruñido",
        7: "Látigo Cepa",
        9: "Drenadoras",
        13: "Polvo Veneno",
        15: "Somnífero",
        19: "Hoja Afilada",
        21: "Dulce Aroma",
        25: "Crecimiento",
        27: "Doble Filo",
        31: "Rayo Solar",
        33: "Síntesis"
      },
      evolution: {
        method: "level",
        level: 16,
        to: 2,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 64,
      eggGroups: ["Monster", "Grass"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 0.7,
      weight: 6.9,
      color: "green",
      habitat: "grassland",
      generation: 1
    },

    2: {
      id: 2,
      name: "Ivysaur",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 },
      moves: {
        1: "Placaje",
        3: "Gruñido",
        7: "Látigo Cepa",
        9: "Drenadoras",
        13: "Polvo Veneno",
        15: "Somnífero",
        20: "Hoja Afilada",
        23: "Dulce Aroma",
        28: "Crecimiento",
        31: "Doble Filo",
        36: "Rayo Solar",
        39: "Síntesis"
      },
      evolution: {
        method: "level",
        level: 32,
        to: 3,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 1, spe: 0 },
      catchRate: 45,
      baseExp: 141,
      eggGroups: ["Monster", "Grass"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 1.0,
      weight: 13.0,
      color: "green",
      habitat: "grassland",
      generation: 1
    },

    3: {
      id: 3,
      name: "Venusaur",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
      moves: {
        1: "Placaje",
        3: "Gruñido",
        7: "Látigo Cepa",
        9: "Drenadoras",
        13: "Polvo Veneno",
        15: "Somnífero",
        20: "Hoja Afilada",
        23: "Dulce Aroma",
        28: "Crecimiento",
        31: "Doble Filo",
        39: "Rayo Solar",
        45: "Síntesis"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 1, spe: 0 },
      catchRate: 45,
      baseExp: 236,
      eggGroups: ["Monster", "Grass"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 2.0,
      weight: 100.0,
      color: "green",
      habitat: "grassland",
      generation: 1
    },

    4: {
      id: 4,
      name: "Charmander",
      types: ["Fuego"],
      baseStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
      moves: {
        1: "Arañazo",
        1: "Gruñido",
        7: "Ascuas",
        13: "Furia",
        19: "Colmillo Ígneo",
        25: "Cuchillada",
        31: "Lanzallamas",
        37: "Infierno",
        43: "Giro Fuego"
      },
      evolution: {
        method: "level",
        level: 16,
        to: 5,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 45,
      baseExp: 65,
      eggGroups: ["Monster", "Dragon"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 0.6,
      weight: 8.5,
      color: "red",
      habitat: "mountain",
      generation: 1
    },

    5: {
      id: 5,
      name: "Charmeleon",
      types: ["Fuego"],
      baseStats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },
      moves: {
        1: "Arañazo",
        1: "Gruñido",
        7: "Ascuas",
        13: "Furia",
        20: "Colmillo Ígneo",
        27: "Cuchillada",
        34: "Lanzallamas",
        41: "Infierno",
        48: "Giro Fuego"
      },
      evolution: {
        method: "level",
        level: 36,
        to: 6,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 1 },
      catchRate: 45,
      baseExp: 142,
      eggGroups: ["Monster", "Dragon"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 1.1,
      weight: 19.0,
      color: "red",
      habitat: "mountain",
      generation: 1
    },

    6: {
      id: 6,
      name: "Charizard",
      types: ["Fuego", "Volador"],
      baseStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
      moves: {
        1: "Arañazo",
        1: "Gruñido",
        7: "Ascuas",
        13: "Furia",
        20: "Colmillo Ígneo",
        27: "Cuchillada",
        34: "Ala de Acero",
        36: "Lanzallamas",
        44: "Infierno",
        54: "Giro Fuego"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 240,
      eggGroups: ["Monster", "Dragon"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 1.7,
      weight: 90.5,
      color: "red",
      habitat: "mountain",
      generation: 1
    },

    7: {
      id: 7,
      name: "Squirtle",
      types: ["Agua"],
      baseStats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },
      moves: {
        1: "Placaje",
        4: "Refugio",
        7: "Burbuja",
        10: "Rayo Burbuja",
        13: "Mordisco",
        18: "Giro Rápido",
        23: "Protección",
        28: "Hidropulso",
        33: "Cabezazo",
        40: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 16,
        to: 8,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 66,
      eggGroups: ["Monster", "Water 1"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 0.5,
      weight: 9.0,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    8: {
      id: 8,
      name: "Wartortle",
      types: ["Agua"],
      baseStats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 },
      moves: {
        1: "Placaje",
        4: "Refugio",
        7: "Burbuja",
        10: "Rayo Burbuja",
        13: "Mordisco",
        19: "Giro Rápido",
        25: "Protección",
        31: "Hidropulso",
        37: "Cabezazo",
        45: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 36,
        to: 9,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 1, spe: 0 },
      catchRate: 45,
      baseExp: 143,
      eggGroups: ["Monster", "Water 1"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 1.0,
      weight: 22.5,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    9: {
      id: 9,
      name: "Blastoise",
      types: ["Agua"],
      baseStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
      moves: {
        1: "Placaje",
        4: "Refugio",
        7: "Burbuja",
        10: "Rayo Burbuja",
        13: "Mordisco",
        19: "Giro Rápido",
        25: "Protección",
        31: "Hidropulso",
        42: "Cabezazo",
        55: "Hidrobomba"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 3, spe: 0 },
      catchRate: 45,
      baseExp: 239,
      eggGroups: ["Monster", "Water 1"],
      genderRatio: 0.875,
      hatchSteps: 5120,
      height: 1.6,
      weight: 85.5,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    10: {
      id: 10,
      name: "Caterpie",
      types: ["Bicho"],
      baseStats: { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 },
      moves: {
        1: "Placaje",
        1: "Drenadoras"
      },
      evolution: {
        method: "level",
        level: 7,
        to: 11,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 1, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 255,
      baseExp: 53,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.3,
      weight: 2.9,
      color: "green",
      habitat: "forest",
      generation: 1
    },

    11: {
      id: 11,
      name: "Metapod",
      types: ["Bicho"],
      baseStats: { hp: 50, atk: 20, def: 55, spa: 25, spd: 25, spe: 30 },
      moves: {
        1: "Endurecimiento",
        7: "Endurecimiento"
      },
      evolution: {
        method: "level",
        level: 10,
        to: 12,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 72,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.7,
      weight: 9.9,
      color: "green",
      habitat: "forest",
      generation: 1
    },

    12: {
      id: 12,
      name: "Butterfree",
      types: ["Bicho", "Volador"],
      baseStats: { hp: 60, atk: 45, def: 50, spa: 90, spd: 80, spe: 70 },
      moves: {
        1: "Confusión",
        10: "Confusión",
        13: "Polvo Veneno",
        14: "Supersónico",
        15: "Tornado",
        18: "Psicorrayo",
        23: "Zumbido",
        28: "Paralizador",
        34: "Psíquico"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 1, spe: 0 },
      catchRate: 45,
      baseExp: 160,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.1,
      weight: 32.0,
      color: "white",
      habitat: "forest",
      generation: 1
    },

    13: {
      id: 13,
      name: "Weedle",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50 },
      moves: {
        1: "Picotazo Venenoso",
        1: "Drenadoras"
      },
      evolution: {
        method: "level",
        level: 7,
        to: 14,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 52,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.3,
      weight: 3.2,
      color: "brown",
      habitat: "forest",
      generation: 1
    },

    14: {
      id: 14,
      name: "Kakuna",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 45, atk: 25, def: 50, spa: 25, spd: 25, spe: 35 },
      moves: {
        1: "Endurecimiento",
        7: "Endurecimiento"
      },
      evolution: {
        method: "level",
        level: 10,
        to: 15,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 71,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.6,
      weight: 10.0,
      color: "yellow",
      habitat: "forest",
      generation: 1
    },

    15: {
      id: 15,
      name: "Beedrill",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 65, atk: 90, def: 40, spa: 45, spd: 80, spe: 75 },
      moves: {
        1: "Furia",
        10: "Furia",
        15: "Doble Ataque",
        20: "Picotazo Venenoso",
        25: "Agiilidad",
        30: "Persecución",
        35: "Ataque Furia",
        40: "Pin Misil"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 1, spe: 0 },
      catchRate: 45,
      baseExp: 159,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.0,
      weight: 29.5,
      color: "yellow",
      habitat: "forest",
      generation: 1
    },

    16: {
      id: 16,
      name: "Pidgey",
      types: ["Normal", "Volador"],
      baseStats: { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 },
      moves: {
        1: "Tornado",
        5: "Arenilla",
        9: "Gust",
        13: "Torbellino",
        19: "Ataque Ala",
        25: "Remolino",
        31: "Agilidad",
        39: "Viento Cortante"
      },
      evolution: {
        method: "level",
        level: 18,
        to: 17,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 50,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.3,
      weight: 1.8,
      color: "brown",
      habitat: "forest",
      generation: 1
    },

    17: {
      id: 17,
      name: "Pidgeotto",
      types: ["Normal", "Volador"],
      baseStats: { hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 71 },
      moves: {
        1: "Tornado",
        5: "Arenilla",
        9: "Gust",
        13: "Torbellino",
        20: "Ataque Ala",
        27: "Remolino",
        34: "Agilidad",
        43: "Viento Cortante"
      },
      evolution: {
        method: "level",
        level: 36,
        to: 18,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 120,
      baseExp: 122,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.1,
      weight: 30.0,
      color: "brown",
      habitat: "forest",
      generation: 1
    },

    18: {
      id: 18,
      name: "Pidgeot",
      types: ["Normal", "Volador"],
      baseStats: { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101 },
      moves: {
        1: "Tornado",
        5: "Arenilla",
        9: "Gust",
        13: "Torbellino",
        20: "Ataque Ala",
        27: "Remolino",
        34: "Agilidad",
        48: "Viento Cortante"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 3 },
      catchRate: 45,
      baseExp: 211,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.5,
      weight: 39.5,
      color: "brown",
      habitat: "forest",
      generation: 1
    },

    19: {
      id: 19,
      name: "Rattata",
      types: ["Normal"],
      baseStats: { hp: 30, atk: 56, def: 35, spa: 25, spd: 35, spe: 72 },
      moves: {
        1: "Placaje",
        1: "Gruñido",
        4: "Ataque Rápido",
        7: "Foco Energía",
        10: "Mordisco",
        13: "Persecución",
        16: "Hipercolmillo",
        19: "Carrera",
        22: "Ataque Furia"
      },
      evolution: {
        method: "level",
        level: 20,
        to: 20,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 57,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.3,
      weight: 3.5,
      color: "purple",
      habitat: "grassland",
      generation: 1
    },

    20: {
      id: 20,
      name: "Raticate",
      types: ["Normal"],
      baseStats: { hp: 55, atk: 81, def: 60, spa: 50, spd: 70, spe: 97 },
      moves: {
        1: "Placaje",
        1: "Gruñido",
        4: "Ataque Rápido",
        7: "Foco Energía",
        10: "Mordisco",
        13: "Persecución",
        16: "Hipercolmillo",
        20: "Carrera",
        24: "Ataque Furia",
        29: "Superdiente"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 127,
      baseExp: 116,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.7,
      weight: 18.5,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    21: {
      id: 21,
      name: "Spearow",
      types: ["Normal", "Volador"],
      baseStats: { hp: 40, atk: 60, def: 30, spa: 31, spd: 31, spe: 70 },
      moves: {
        1: "Picotazo",
        1: "Gruñido",
        4: "Furia",
        8: "Persecución",
        11: "Ataque Ala",
        15: "Torbellino",
        18: "Doble Ataque",
        22: "Agilidad",
        25: "Enfado",
        29: "Pico Taladro"
      },
      evolution: {
        method: "level",
        level: 20,
        to: 22,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 58,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.3,
      weight: 2.0,
      color: "brown",
      habitat: "rough-terrain",
      generation: 1
    },

    22: {
      id: 22,
      name: "Fearow",
      types: ["Normal", "Volador"],
      baseStats: { hp: 65, atk: 90, def: 65, spa: 61, spd: 61, spe: 100 },
      moves: {
        1: "Picotazo",
        1: "Gruñido",
        4: "Furia",
        8: "Persecución",
        11: "Ataque Ala",
        15: "Torbellino",
        18: "Doble Ataque",
        23: "Agilidad",
        27: "Enfado",
        32: "Pico Taladro",
        36: "Ataque Furia"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 90,
      baseExp: 162,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.2,
      weight: 38.0,
      color: "brown",
      habitat: "rough-terrain",
      generation: 1
    },

    23: {
      id: 23,
      name: "Ekans",
      types: ["Veneno"],
      baseStats: { hp: 35, atk: 60, def: 44, spa: 40, spd: 54, spe: 55 },
      moves: {
        1: "Wrap",
        1: "Leer",
        4: "Poison Sting",
        9: "Mordisco",
        12: "Grito",
        17: "Ácido",
        20: "Cola Férrea",
        25: "Bomba Lodo",
        28: "Tragar",
        33: "Cola Dragón",
        36: "Puya Nociva",
        41: "Gastro Ácido",
        44: "Escupir"
      },
      evolution: {
        method: "level",
        level: 22,
        to: 24,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 255,
      baseExp: 62,
      eggGroups: ["Field", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 2.0,
      weight: 6.9,
      color: "purple",
      habitat: "grassland",
      generation: 1
    },

    24: {
      id: 24,
      name: "Arbok",
      types: ["Veneno"],
      baseStats: { hp: 60, atk: 95, def: 69, spa: 65, spd: 79, spe: 80 },
      moves: {
        1: "Wrap",
        1: "Leer",
        4: "Poison Sting",
        9: "Mordisco",
        12: "Grito",
        17: "Ácido",
        20: "Cola Férrea",
        27: "Bomba Lodo",
        32: "Tragar",
        39: "Cola Dragón",
        44: "Puya Nociva",
        51: "Gastro Ácido",
        56: "Escupir"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 90,
      baseExp: 147,
      eggGroups: ["Field", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 3.5,
      weight: 65.0,
      color: "purple",
      habitat: "grassland",
      generation: 1
    },

    25: {
      id: 25,
      name: "Pikachu",
      types: ["Eléctrico"],
      baseStats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 },
      moves: {
        1: "Gruñido",
        1: "Cola Férrea",
        5: "Onda Trueno",
        10: "Ataque Rápido",
        13: "Doble Equipo",
        18: "Bola Voltio",
        21: "Onda Aguda",
        26: "Chispazo",
        29: "Electrocañón",
        34: "Agilidad",
        37: "Trueno",
        42: "Ataque Furia"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 26,
        item: "thunderstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 190,
      baseExp: 82,
      eggGroups: ["Field", "Fairy"],
      genderRatio: 0.5,
      hatchSteps: 2560,
      height: 0.4,
      weight: 6.0,
      color: "yellow",
      habitat: "forest",
      generation: 1
    },

    26: {
      id: 26,
      name: "Raichu",
      types: ["Eléctrico"],
      baseStats: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110 },
      moves: {
        1: "Gruñido",
        1: "Cola Férrea",
        1: "Onda Trueno",
        1: "Ataque Rápido"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 3 },
      catchRate: 75,
      baseExp: 122,
      eggGroups: ["Field", "Fairy"],
      genderRatio: 0.5,
      hatchSteps: 2560,
      height: 0.8,
      weight: 30.0,
      color: "yellow",
      habitat: "forest",
      generation: 1
    },

    27: {
      id: 27,
      name: "Sandshrew",
      types: ["Tierra"],
      baseStats: { hp: 50, atk: 75, def: 85, spa: 20, spd: 30, spe: 40 },
      moves: {
        1: "Arañazo",
        3: "Defensa Férrea",
        7: "Arena",
        11: "Rueda Arena",
        15: "Corte Furia",
        19: "Rayo Confuso",
        23: "Desenrollar",
        27: "Rápido",
        31: "Fisura",
        35: "Terratemblor"
      },
      evolution: {
        method: "level",
        level: 22,
        to: 28,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 255,
      baseExp: 93,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.6,
      weight: 12.0,
      color: "yellow",
      habitat: "rough-terrain",
      generation: 1
    },

    28: {
      id: 28,
      name: "Sandslash",
      types: ["Tierra"],
      baseStats: { hp: 75, atk: 100, def: 110, spa: 45, spd: 55, spe: 65 },
      moves: {
        1: "Arañazo",
        1: "Defensa Férrea",
        1: "Arena",
        11: "Rueda Arena",
        17: "Corte Furia",
        24: "Rayo Confuso",
        31: "Desenrollar",
        38: "Rápido",
        45: "Fisura",
        52: "Terratemblor"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 90,
      baseExp: 163,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 29.5,
      color: "yellow",
      habitat: "rough-terrain",
      generation: 1
    },

    29: {
      id: 29,
      name: "Nidoran♀",
      types: ["Veneno"],
      baseStats: { hp: 55, atk: 47, def: 52, spa: 40, spd: 40, spe: 41 },
      moves: {
        1: "Gruñido",
        1: "Arañazo",
        7: "Doblebofetón",
        9: "Picotazo Venenoso",
        13: "Doble Patada",
        19: "Tóxico",
        21: "Mordisco",
        25: "Ayuda",
        31: "Doble Filo",
        33: "Ataque Furia",
        37: "Puya Nociva"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 30,
        item: "moonstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 1, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 235,
      baseExp: 59,
      eggGroups: ["Monster", "Field"],
      genderRatio: 0.0, // 100% female
      hatchSteps: 5120,
      height: 0.4,
      weight: 7.0,
      color: "blue",
      habitat: "grassland",
      generation: 1
    },

    30: {
      id: 30,
      name: "Nidorina",
      types: ["Veneno"],
      baseStats: { hp: 70, atk: 62, def: 67, spa: 55, spd: 55, spe: 56 },
      moves: {
        1: "Gruñido",
        1: "Arañazo",
        7: "Doblebofetón",
        9: "Picotazo Venenoso",
        13: "Doble Patada",
        20: "Tóxico",
        23: "Mordisco",
        28: "Ayuda",
        35: "Doble Filo",
        38: "Ataque Furia",
        43: "Puya Nociva"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 31,
        item: "moonstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 117,
      eggGroups: ["Undiscovered"],
      genderRatio: 0.0,
      hatchSteps: 5120,
      height: 0.8,
      weight: 20.0,
      color: "blue",
      habitat: "grassland",
      generation: 1
    },

    31: {
      id: 31,
      name: "Nidoqueen",
      types: ["Veneno", "Tierra"],
      baseStats: { hp: 90, atk: 92, def: 87, spa: 75, spd: 85, spe: 76 },
      moves: {
        1: "Gruñido",
        1: "Arañazo",
        1: "Doblebofetón",
        1: "Picotazo Venenoso"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 3, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 194,
      eggGroups: ["Undiscovered"],
      genderRatio: 0.0,
      hatchSteps: 5120,
      height: 1.3,
      weight: 60.0,
      color: "blue",
      habitat: "grassland",
      generation: 1
    },

    32: {
      id: 32,
      name: "Nidoran♂",
      types: ["Veneno"],
      baseStats: { hp: 46, atk: 57, def: 40, spa: 40, spd: 40, spe: 50 },
      moves: {
        1: "Gruñido",
        1: "Cornada",
        7: "Doblebofetón",
        9: "Picotazo Venenoso",
        13: "Doble Patada",
        19: "Tóxico",
        21: "Cornada",
        25: "Ayuda",
        31: "Doble Filo",
        33: "Ataque Furia",
        37: "Puya Nociva"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 33,
        item: "moonstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 235,
      baseExp: 60,
      eggGroups: ["Monster", "Field"],
      genderRatio: 1.0, // 100% male
      hatchSteps: 5120,
      height: 0.5,
      weight: 9.0,
      color: "purple",
      habitat: "grassland",
      generation: 1
    },

    33: {
      id: 33,
      name: "Nidorino",
      types: ["Veneno"],
      baseStats: { hp: 61, atk: 72, def: 57, spa: 55, spd: 55, spe: 65 },
      moves: {
        1: "Gruñido",
        1: "Cornada",
        7: "Doblebofetón",
        9: "Picotazo Venenoso",
        13: "Doble Patada",
        20: "Tóxico",
        23: "Cornada",
        28: "Ayuda",
        35: "Doble Filo",
        38: "Ataque Furia",
        43: "Puya Nociva"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 34,
        item: "moonstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 118,
      eggGroups: ["Monster", "Field"],
      genderRatio: 1.0,
      hatchSteps: 5120,
      height: 0.9,
      weight: 19.5,
      color: "purple",
      habitat: "grassland",
      generation: 1
    },

    34: {
      id: 34,
      name: "Nidoking",
      types: ["Veneno", "Tierra"],
      baseStats: { hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 85 },
      moves: {
        1: "Gruñido",
        1: "Cornada",
        1: "Doblebofetón",
        1: "Picotazo Venenoso"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 3, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 195,
      eggGroups: ["Monster", "Field"],
      genderRatio: 1.0,
      hatchSteps: 5120,
      height: 1.4,
      weight: 62.0,
      color: "purple",
      habitat: "grassland",
      generation: 1
    },

    35: {
      id: 35,
      name: "Clefairy",
      types: ["Hada"],
      baseStats: { hp: 70, atk: 45, def: 48, spa: 60, spd: 65, spe: 35 },
      moves: {
        1: "Canto",
        1: "Doblebofetón",
        4: "Mimético",
        8: "Drenadoras",
        13: "Voz Cautivadora",
        19: "Doble Bofetón",
        26: "Minimizar",
        34: "Reflejo",
        43: "Luz Lunar",
        53: "Metrónomo"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 36,
        item: "moonstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "fast",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 150,
      baseExp: 68,
      eggGroups: ["Fairy"],
      genderRatio: 0.25,
      hatchSteps: 2560,
      height: 0.6,
      weight: 7.5,
      color: "pink",
      habitat: "mountain",
      generation: 1
    },

    36: {
      id: 36,
      name: "Clefable",
      types: ["Hada"],
      baseStats: { hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60 },
      moves: {
        1: "Canto",
        1: "Doblebofetón",
        1: "Mimético",
        1: "Drenadoras"
      },
      evolution: null,
      growthRate: "fast",
      effortValues: { hp: 3, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 25,
      baseExp: 129,
      eggGroups: ["Fairy"],
      genderRatio: 0.25,
      hatchSteps: 2560,
      height: 1.3,
      weight: 40.0,
      color: "pink",
      habitat: "mountain",
      generation: 1
    },

    37: {
      id: 37,
      name: "Vulpix",
      types: ["Fuego"],
      baseStats: { hp: 38, atk: 41, def: 40, spa: 50, spd: 65, spe: 65 },
      moves: {
        1: "Ascuas",
        4: "Gruñido",
        7: "Rayo Confuso",
        11: "Infierno",
        14: "Imagen",
        17: "Giro Fuego",
        21: "Velo Sagrado",
        24: "Onda Ígnea",
        27: "Salpicadura",
        31: "Rayo Solar",
        34: "Maldición",
        37: "Pantalla de Humo",
        41: "Fuego Sagrado"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 38,
        item: "firestone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 190,
      baseExp: 63,
      eggGroups: ["Field"],
      genderRatio: 0.25,
      hatchSteps: 5120,
      height: 0.6,
      weight: 9.9,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    38: {
      id: 38,
      name: "Ninetales",
      types: ["Fuego"],
      baseStats: { hp: 73, atk: 76, def: 75, spa: 81, spd: 100, spe: 100 },
      moves: {
        1: "Ascuas",
        1: "Gruñido",
        1: "Rayo Confuso",
        1: "Infierno"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 1, spe: 1 },
      catchRate: 75,
      baseExp: 178,
      eggGroups: ["Field"],
      genderRatio: 0.25,
      hatchSteps: 5120,
      height: 1.1,
      weight: 19.9,
      color: "yellow",
      habitat: "grassland",
      generation: 1
    },

    39: {
      id: 39,
      name: "Jigglypuff",
      types: ["Normal", "Hada"],
      baseStats: { hp: 115, atk: 45, def: 20, spa: 45, spd: 25, spe: 20 },
      moves: {
        1: "Canto",
        4: "Drenadoras",
        9: "Doblebofetón",
        14: "Defensa Férrea",
        19: "Doble Bofetón",
        24: "Restricción",
        29: "Voz Cautivadora",
        34: "Golpe Cuerpo",
        39: "Minimizar",
        44: "Desenrollar",
        49: "Doble Filo",
        54: "Explosión"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 40,
        item: "moonstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "fast",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 170,
      baseExp: 76,
      eggGroups: ["Fairy"],
      genderRatio: 0.25,
      hatchSteps: 2560,
      height: 0.5,
      weight: 5.5,
      color: "pink",
      habitat: "grassland",
      generation: 1
    },

    40: {
      id: 40,
      name: "Wigglytuff",
      types: ["Normal", "Hada"],
      baseStats: { hp: 140, atk: 70, def: 45, spa: 85, spd: 50, spe: 45 },
      moves: {
        1: "Canto",
        1: "Drenadoras",
        1: "Doblebofetón",
        1: "Defensa Férrea"
      },
      evolution: null,
      growthRate: "fast",
      effortValues: { hp: 3, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 50,
      baseExp: 109,
      eggGroups: ["Fairy"],
      genderRatio: 0.25,
      hatchSteps: 2560,
      height: 1.0,
      weight: 12.0,
      color: "pink",
      habitat: "grassland",
      generation: 1
    },

    41: {
      id: 41,
      name: "Zubat",
      types: ["Veneno", "Volador"],
      baseStats: { hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55 },
      moves: {
        1: "Absorber",
        5: "Supersónico",
        9: "Tornado",
        13: "Mordisco",
        17: "Ala de Acero",
        21: "Confusión",
        25: "Ataque Ala",
        29: "Viento Aciago",
        33: "Vendaval",
        37: "Golpe Aéreo",
        41: "Chupavidas"
      },
      evolution: {
        method: "level",
        level: 22,
        to: 42,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 54,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.8,
      weight: 7.5,
      color: "purple",
      habitat: "cave",
      generation: 1
    },

    42: {
      id: 42,
      name: "Golbat",
      types: ["Veneno", "Volador"],
      baseStats: { hp: 75, atk: 80, def: 70, spa: 65, spd: 75, spe: 90 },
      moves: {
        1: "Absorber",
        5: "Supersónico",
        9: "Tornado",
        13: "Mordisco",
        17: "Ala de Acero",
        21: "Confusión",
        27: "Ataque Ala",
        33: "Viento Aciago",
        39: "Vendaval",
        45: "Golpe Aéreo",
        51: "Chupavidas"
      },
      evolution: {
        method: "friendship",
        level: null,
        to: 169,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: 220, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 90,
      baseExp: 171,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.6,
      weight: 55.0,
      color: "purple",
      habitat: "cave",
      generation: 1
    },

    43: {
      id: 43,
      name: "Oddish",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 45, atk: 50, def: 55, spa: 75, spd: 65, spe: 30 },
      moves: {
        1: "Absorber",
        7: "Dulce Aroma",
        14: "Polvo Veneno",
        16: "Estoicismo",
        18: "Drenadoras",
        23: "Somnífero",
        32: "Rayo Lunar",
        39: "Puya Nociva"
      },
      evolution: {
        method: "level",
        level: 21,
        to: 44,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 255,
      baseExp: 78,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.5,
      weight: 5.4,
      color: "blue",
      habitat: "grassland",
      generation: 1
    },

    44: {
      id: 44,
      name: "Gloom",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 60, atk: 65, def: 70, spa: 85, spd: 75, spe: 40 },
      moves: {
        1: "Absorber",
        7: "Dulce Aroma",
        14: "Polvo Veneno",
        16: "Estoicismo",
        18: "Drenadoras",
        24: "Somnífero",
        35: "Rayo Lunar",
        44: "Puya Nociva"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 45,
        item: "leafstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 132,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.8,
      weight: 8.6,
      color: "blue",
      habitat: "grassland",
      generation: 1
    },

    45: {
      id: 45,
      name: "Vileplume",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 75, atk: 80, def: 85, spa: 110, spd: 90, spe: 50 },
      moves: {
        1: "Absorber",
        1: "Dulce Aroma",
        1: "Polvo Veneno",
        1: "Estoicismo"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 184,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.2,
      weight: 18.6,
      color: "red",
      habitat: "grassland",
      generation: 1
    },

    46: {
      id: 46,
      name: "Paras",
      types: ["Bicho", "Planta"],
      baseStats: { hp: 35, atk: 70, def: 55, spa: 45, spd: 55, spe: 25 },
      moves: {
        1: "Arañazo",
        6: "Falsa Tortuga",
        11: "Absorber",
        17: "Puya Nociva",
        22: "Cuchillada",
        27: "Crecimiento",
        33: "Esporas",
        38: "Drenadoras",
        43: "Rayos X",
        49: "Garra Brutal"
      },
      evolution: {
        method: "level",
        level: 24,
        to: 47,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 70,
      eggGroups: ["Bug", "Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.3,
      weight: 5.4,
      color: "red",
      habitat: "forest",
      generation: 1
    },

    47: {
      id: 47,
      name: "Parasect",
      types: ["Bicho", "Planta"],
      baseStats: { hp: 60, atk: 95, def: 80, spa: 60, spd: 80, spe: 30 },
      moves: {
        1: "Arañazo",
        1: "Falsa Tortuga",
        1: "Absorber",
        17: "Puya Nociva",
        24: "Cuchillada",
        29: "Crecimiento",
        37: "Esporas",
        42: "Drenadoras",
        49: "Rayos X",
        59: "Garra Brutal"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 128,
      eggGroups: ["Bug", "Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 29.5,
      color: "red",
      habitat: "forest",
      generation: 1
    },

    48: {
      id: 48,
      name: "Venonat",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 60, atk: 55, def: 50, spa: 40, spd: 55, spe: 45 },
      moves: {
        1: "Tackle",
        1: "Disable",
        5: "Supersónico",
        11: "Confusión",
        13: "Polvo Veneno",
        17: "Psicorrayo",
        23: "Stun Spore",
        25: "Signal Beam",
        29: "Sleep Powder",
        35: "Psybeam",
        37: "Psychic",
        41: "Poison Fang"
      },
      evolution: {
        method: "level",
        level: 31,
        to: 49,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 1, spe: 0 },
      catchRate: 190,
      baseExp: 75,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 30.0,
      color: "purple",
      habitat: "forest",
      generation: 1
    },

    49: {
      id: 49,
      name: "Venomoth",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 70, atk: 65, def: 60, spa: 90, spd: 75, spe: 90 },
      moves: {
        1: "Tackle",
        1: "Disable",
        1: "Supersónico",
        11: "Confusión",
        13: "Polvo Veneno",
        17: "Psicorrayo",
        23: "Stun Spore",
        25: "Signal Beam",
        29: "Sleep Powder",
        37: "Psybeam",
        41: "Psychic",
        47: "Poison Fang"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 1 },
      catchRate: 75,
      baseExp: 138,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.5,
      weight: 12.5,
      color: "purple",
      habitat: "forest",
      generation: 1
    },

    50: {
      id: 50,
      name: "Diglett",
      types: ["Tierra"],
      baseStats: { hp: 10, atk: 55, def: 25, spa: 35, spd: 45, spe: 95 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        7: "Magnitud",
        12: "Arena",
        15: "Golpe Bajo",
        18: "Excavar",
        23: "Terratemblor",
        26: "Fisura",
        29: "Tierra Viva",
        34: "Golpe",
        37: "Corte Furia",
        40: "Terremoto"
      },
      evolution: {
        method: "level",
        level: 26,
        to: 51,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 81,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.2,
      weight: 0.8,
      color: "brown",
      habitat: "cave",
      generation: 1
    },

    51: {
      id: 51,
      name: "Dugtrio",
      types: ["Tierra"],
      baseStats: { hp: 35, atk: 100, def: 50, spa: 50, spd: 70, spe: 120 },
      moves: {
        1: "Arañazo",
        1: "Gruñido",
        1: "Magnitud",
        12: "Arena",
        15: "Golpe Bajo",
        18: "Excavar",
        23: "Terratemblor",
        26: "Fisura",
        29: "Tierra Viva",
        40: "Golpe",
        47: "Corte Furia",
        53: "Terremoto"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 50,
      baseExp: 153,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.7,
      weight: 33.3,
      color: "brown",
      habitat: "cave",
      generation: 1
    },

    52: {
      id: 52,
      name: "Meowth",
      types: ["Normal"],
      baseStats: { hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 90 },
      moves: {
        1: "Arañazo",
        1: "Gruñido",
        6: "Mordisco",
        9: "Finta",
        14: "Furia",
        17: "Sorpresa",
        22: "Golpes Furia",
        25: "Golpe",
        30: "Golpe Bajo",
        33: "Amago",
        38: "Ataque Furia",
        41: "Día de Pago",
        46: "Última Baza"
      },
      evolution: {
        method: "level",
        level: 28,
        to: 53,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 69,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.4,
      weight: 4.2,
      color: "yellow",
      habitat: "urban",
      generation: 1
    },

    53: {
      id: 53,
      name: "Persian",
      types: ["Normal"],
      baseStats: { hp: 65, atk: 70, def: 60, spa: 65, spd: 65, spe: 115 },
      moves: {
        1: "Arañazo",
        1: "Gruñido",
        1: "Mordisco",
        1: "Finta",
        14: "Furia",
        17: "Sorpresa",
        22: "Golpes Furia",
        25: "Golpe",
        32: "Golpe Bajo",
        37: "Amago",
        44: "Ataque Furia",
        49: "Día de Pago",
        56: "Última Baza"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 90,
      baseExp: 148,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 32.0,
      color: "yellow",
      habitat: "urban",
      generation: 1
    },

    54: {
      id: 54,
      name: "Psyduck",
      types: ["Agua"],
      baseStats: { hp: 50, atk: 52, def: 48, spa: 65, spd: 50, spe: 55 },
      moves: {
        1: "Arañazo",
        4: "Cola Férrea",
        7: "Confusión",
        10: "Disable",
        13: "Rayo Confuso",
        16: "Hidropulso",
        19: "Finta",
        22: "Psicorrayo",
        25: "Cabezazo",
        28: "Confusión",
        31: "Hidrobomba",
        34: "Amnesia",
        37: "Psíquico"
      },
      evolution: {
        method: "level",
        level: 33,
        to: 55,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 80,
      eggGroups: ["Water 1", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.8,
      weight: 19.6,
      color: "yellow",
      habitat: "waters-edge",
      generation: 1
    },

    55: {
      id: 55,
      name: "Golduck",
      types: ["Agua"],
      baseStats: { hp: 80, atk: 82, def: 78, spa: 95, spd: 80, spe: 85 },
      moves: {
        1: "Arañazo",
        1: "Cola Férrea",
        1: "Confusión",
        1: "Disable",
        13: "Rayo Confuso",
        16: "Hidropulso",
        19: "Finta",
        22: "Psicorrayo",
        27: "Cabezazo",
        32: "Confusión",
        37: "Hidrobomba",
        44: "Amnesia",
        51: "Psíquico"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 174,
      eggGroups: ["Water 1", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.7,
      weight: 76.6,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    56: {
      id: 56,
      name: "Mankey",
      types: ["Lucha"],
      baseStats: { hp: 40, atk: 80, def: 35, spa: 35, spd: 45, spe: 70 },
      moves: {
        1: "Arañazo",
        1: "Furia",
        5: "Patada Baja",
        8: "Puño Cometa",
        12: "Puño Furia",
        15: "Golpe Bajo",
        19: "Persecución",
        22: "Puño Foco",
        26: "Ataque Furia",
        29: "Cruz Ataque",
        33: "Estruendo",
        36: "Puño Trueno",
        40: "Puño Ígneo"
      },
      evolution: {
        method: "level",
        level: 28,
        to: 57,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 74,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.5,
      weight: 28.0,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    57: {
      id: 57,
      name: "Primeape",
      types: ["Lucha"],
      baseStats: { hp: 65, atk: 105, def: 60, spa: 60, spd: 70, spe: 95 },
      moves: {
        1: "Arañazo",
        1: "Furia",
        1: "Patada Baja",
        1: "Puño Cometa",
        12: "Puño Furia",
        15: "Golpe Bajo",
        19: "Persecución",
        22: "Puño Foco",
        28: "Ataque Furia",
        33: "Cruz Ataque",
        39: "Estruendo",
        44: "Puño Trueno",
        50: "Puño Ígneo"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 149,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 32.0,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    58: {
      id: 58,
      name: "Growlithe",
      types: ["Fuego"],
      baseStats: { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 },
      moves: {
        1: "Mordisco",
        6: "Gruñido",
        8: "Ascuas",
        10: "Olfateo",
        12: "Ataque Rápido",
        17: "Infierno",
        19: "Furia",
        21: "Giro Fuego",
        23: "Mordisco",
        28: "Toma Ira",
        30: "Contraataque",
        32: "Lanzallamas",
        34: "Aullido",
        39: "Fuego Sagrado"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 59,
        item: "firestone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 91,
      eggGroups: ["Field"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 0.7,
      weight: 19.0,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    59: {
      id: 59,
      name: "Arcanine",
      types: ["Fuego"],
      baseStats: { hp: 90, atk: 110, def: 80, spa: 100, spd: 80, spe: 95 },
      moves: {
        1: "Mordisco",
        1: "Gruñido",
        1: "Ascuas",
        1: "Olfateo"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 213,
      eggGroups: ["Field"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 1.9,
      weight: 155.0,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    60: {
      id: 60,
      name: "Poliwag",
      types: ["Agua"],
      baseStats: { hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90 },
      moves: {
        1: "Burbuja",
        5: "Hipnosis",
        8: "Agua Lodosa",
        11: "Doble Bofetón",
        15: "Lluvia",
        18: "Rayo Burbuja",
        21: "Doble Patada",
        25: "Velo Aqua",
        28: "Cabezazo",
        31: "Hidropulso",
        35: "Desquite",
        38: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 25,
        to: 61,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 77,
      eggGroups: ["Water 1"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.6,
      weight: 12.4,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    61: {
      id: 61,
      name: "Poliwhirl",
      types: ["Agua"],
      baseStats: { hp: 65, atk: 65, def: 65, spa: 50, spd: 50, spe: 90 },
      moves: {
        1: "Burbuja",
        1: "Hipnosis",
        1: "Agua Lodosa",
        11: "Doble Bofetón",
        15: "Lluvia",
        18: "Rayo Burbuja",
        21: "Doble Patada",
        27: "Velo Aqua",
        32: "Cabezazo",
        37: "Hidropulso",
        43: "Desquite",
        48: "Hidrobomba"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 62,
        item: "waterstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 120,
      baseExp: 131,
      eggGroups: ["Water 1"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 20.0,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    62: {
      id: 62,
      name: "Poliwrath",
      types: ["Agua", "Lucha"],
      baseStats: { hp: 90, atk: 95, def: 95, spa: 70, spd: 90, spe: 70 },
      moves: {
        1: "Burbuja",
        1: "Hipnosis",
        1: "Doble Bofetón",
        1: "Doble Patada"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 3, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 230,
      eggGroups: ["Water 1"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.3,
      weight: 54.0,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    63: {
      id: 63,
      name: "Abra",
      types: ["Psíquico"],
      baseStats: { hp: 25, atk: 20, def: 15, spa: 105, spd: 55, spe: 90 },
      moves: {
        1: "Teleport"
      },
      evolution: {
        method: "level",
        level: 16,
        to: 64,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 200,
      baseExp: 73,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 0.9,
      weight: 19.5,
      color: "brown",
      habitat: "urban",
      generation: 1
    },

    64: {
      id: 64,
      name: "Kadabra",
      types: ["Psíquico"],
      baseStats: { hp: 40, atk: 35, def: 30, spa: 120, spd: 70, spe: 105 },
      moves: {
        1: "Teleport",
        1: "Confusión",
        16: "Confusión",
        18: "Disable",
        21: "Psicorrayo",
        23: "Reflejo",
        25: "Mil Batallas",
        28: "Recuperación",
        31: "Psíquico",
        33: "Rayo Confuso",
        36: "Alivio",
        39: "Psicoonda",
        41: "Amnesia"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 65,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 100,
      baseExp: 145,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 1.3,
      weight: 56.5,
      color: "brown",
      habitat: "urban",
      generation: 1
    },

    65: {
      id: 65,
      name: "Alakazam",
      types: ["Psíquico"],
      baseStats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 },
      moves: {
        1: "Teleport",
        1: "Confusión",
        1: "Disable",
        1: "Psicorrayo"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 50,
      baseExp: 221,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 1.5,
      weight: 48.0,
      color: "brown",
      habitat: "urban",
      generation: 1
    },

    66: {
      id: 66,
      name: "Machop",
      types: ["Lucha"],
      baseStats: { hp: 70, atk: 80, def: 50, spa: 35, spd: 35, spe: 35 },
      moves: {
        1: "Arañazo",
        1: "Enfado",
        3: "Foco Energía",
        7: "Recompensa",
        9: "Puño Fuego",
        13: "Avispina",
        15: "Puño Trueno",
        19: "Derribo",
        21: "Puño Hielo",
        25: "Sumisión",
        27: "Puño Bala",
        31: "Ataque Furia",
        33: "Puño Sombra",
        37: "Tajo Cruzado",
        39: "Patada Salto"
      },
      evolution: {
        method: "level",
        level: 28,
        to: 67,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 180,
      baseExp: 88,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 0.8,
      weight: 19.5,
      color: "gray",
      habitat: "mountain",
      generation: 1
    },

    67: {
      id: 67,
      name: "Machoke",
      types: ["Lucha"],
      baseStats: { hp: 80, atk: 100, def: 70, spa: 50, spd: 60, spe: 45 },
      moves: {
        1: "Arañazo",
        1: "Enfado",
        1: "Foco Energía",
        1: "Recompensa",
        13: "Avispina",
        15: "Puño Trueno",
        19: "Derribo",
        21: "Puño Hielo",
        25: "Sumisión",
        27: "Puño Bala",
        33: "Ataque Furia",
        37: "Puño Sombra",
        43: "Tajo Cruzado",
        47: "Patada Salto"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 68,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 90,
      baseExp: 146,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 1.5,
      weight: 70.5,
      color: "gray",
      habitat: "mountain",
      generation: 1
    },

    68: {
      id: 68,
      name: "Machamp",
      types: ["Lucha"],
      baseStats: { hp: 90, atk: 130, def: 80, spa: 65, spd: 85, spe: 55 },
      moves: {
        1: "Arañazo",
        1: "Enfado",
        1: "Foco Energía",
        1: "Recompensa"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 3, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 227,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 5120,
      height: 1.6,
      weight: 130.0,
      color: "gray",
      habitat: "mountain",
      generation: 1
    },

    69: {
      id: 69,
      name: "Bellsprout",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 50, atk: 75, def: 35, spa: 70, spd: 30, spe: 40 },
      moves: {
        1: "Látigo Cepa",
        7: "Crecimiento",
        11: "Drenadoras",
        13: "Puya Nociva",
        15: "Somnífero",
        17: "Polvo Veneno",
        23: "Ácido",
        27: "Atadura",
        29: "Dulce Aroma",
        35: "Golpe Cuerpo",
        39: "Estoicismo",
        41: "Rayo Solar",
        47: "Puya Nociva"
      },
      evolution: {
        method: "level",
        level: 21,
        to: 70,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 255,
      baseExp: 84,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.7,
      weight: 4.0,
      color: "green",
      habitat: "forest",
      generation: 1
    },

    70: {
      id: 70,
      name: "Weepinbell",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 65, atk: 90, def: 50, spa: 85, spd: 45, spe: 55 },
      moves: {
        1: "Látigo Cepa",
        1: "Crecimiento",
        1: "Drenadoras",
        13: "Puya Nociva",
        15: "Somnífero",
        18: "Polvo Veneno",
        23: "Ácido",
        29: "Atadura",
        32: "Dulce Aroma",
        39: "Golpe Cuerpo",
        44: "Estoicismo",
        47: "Rayo Solar",
        54: "Puya Nociva"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 71,
        item: "leafstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 151,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 6.4,
      color: "green",
      habitat: "forest",
      generation: 1
    },

    71: {
      id: 71,
      name: "Victreebel",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70 },
      moves: {
        1: "Látigo Cepa",
        1: "Crecimiento",
        1: "Drenadoras",
        1: "Puya Nociva"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 3, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 191,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.7,
      weight: 15.5,
      color: "green",
      habitat: "forest",
      generation: 1
    },

    72: {
      id: 72,
      name: "Tentacool",
      types: ["Agua", "Veneno"],
      baseStats: { hp: 40, atk: 40, def: 35, spa: 50, spd: 100, spe: 70 },
      moves: {
        1: "Picotazo Venenoso",
        4: "Supersónico",
        7: "Constricción",
        10: "Ácido",
        13: "Burbuja",
        16: "Rayo Confuso",
        19: "Bomba Lodo",
        22: "Puya Nociva",
        25: "Rayo Burbuja",
        28: "Escudo Reflector",
        31: "Hidrobomba",
        34: "Tóxico",
        37: "Rayo de Hielo"
      },
      evolution: {
        method: "level",
        level: 30,
        to: 73,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 1, spe: 0 },
      catchRate: 190,
      baseExp: 105,
      eggGroups: ["Water 3"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.9,
      weight: 45.5,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    73: {
      id: 73,
      name: "Tentacruel",
      types: ["Agua", "Veneno"],
      baseStats: { hp: 80, atk: 70, def: 65, spa: 80, spd: 120, spe: 100 },
      moves: {
        1: "Picotazo Venenoso",
        1: "Supersónico",
        1: "Constricción",
        1: "Ácido",
        13: "Burbuja",
        16: "Rayo Confuso",
        19: "Bomba Lodo",
        22: "Puya Nociva",
        25: "Rayo Burbuja",
        28: "Escudo Reflector",
        32: "Hidrobomba",
        36: "Tóxico",
        40: "Rayo de Hielo",
        44: "Barrera"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 2, spe: 0 },
      catchRate: 60,
      baseExp: 205,
      eggGroups: ["Water 3"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.6,
      weight: 55.0,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    74: {
      id: 74,
      name: "Geodude",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20 },
      moves: {
        1: "Arañazo",
        1: "Defensa Férrea",
        6: "Terratemblor",
        11: "Roca Afilada",
        16: "Rodar",
        21: "Magnitud",
        26: "Autodestrucción",
        31: "Explosión",
        36: "Doble Filo",
        41: "Piedra Angular"
      },
      evolution: {
        method: "level",
        level: 25,
        to: 75,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 255,
      baseExp: 86,
      eggGroups: ["Mineral"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 0.4,
      weight: 20.0,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    75: {
      id: 75,
      name: "Graveler",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 55, atk: 95, def: 115, spa: 45, spd: 45, spe: 35 },
      moves: {
        1: "Arañazo",
        1: "Defensa Férrea",
        1: "Terratemblor",
        11: "Roca Afilada",
        16: "Rodar",
        21: "Magnitud",
        29: "Autodestrucción",
        37: "Explosión",
        45: "Doble Filo",
        53: "Piedra Angular"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 76,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 134,
      eggGroups: ["Mineral"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.0,
      weight: 105.0,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    76: {
      id: 76,
      name: "Golem",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45 },
      moves: {
        1: "Arañazo",
        1: "Defensa Férrea",
        1: "Terratemblor",
        1: "Roca Afilada"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 3, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 177,
      eggGroups: ["Mineral"],
      genderRatio: 0.5,
      hatchSteps: 3840,
      height: 1.4,
      weight: 300.0,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    77: {
      id: 77,
      name: "Ponyta",
      types: ["Fuego"],
      baseStats: { hp: 50, atk: 85, def: 55, spa: 65, spd: 65, spe: 90 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ascuas",
        13: "Cola Férrea",
        19: "Embestida",
        26: "Furia",
        34: "Giro Fuego",
        43: "Derribo",
        53: "Lanzallamas"
      },
      evolution: {
        method: "level",
        level: 40,
        to: 78,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 190,
      baseExp: 152,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 30.0,
      color: "yellow",
      habitat: "grassland",
      generation: 1
    },

    78: {
      id: 78,
      name: "Rapidash",
      types: ["Fuego"],
      baseStats: { hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105 },
      moves: {
        1: "Placaje",
        1: "Gruñido",
        1: "Ascuas",
        1: "Cola Férrea",
        19: "Embestida",
        26: "Furia",
        34: "Giro Fuego",
        40: "Derribo",
        47: "Lanzallamas",
        61: "Fuego Sagrado"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 60,
      baseExp: 192,
      eggGroups: ["Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.7,
      weight: 95.0,
      color: "yellow",
      habitat: "grassland",
      generation: 1
    },

    79: {
      id: 79,
      name: "Slowpoke",
      types: ["Agua", "Psíquico"],
      baseStats: { hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15 },
      moves: {
        1: "Confusión",
        1: "Gruñido",
        6: "Agua Lodosa",
        11: "Cabezazo",
        15: "Confusión",
        20: "Desconcierto",
        25: "Psicorrayo",
        29: "Ataque Oculto",
        34: "Paz Mental",
        39: "Psíquico",
        43: "Lluvia",
        48: "Psicoonda"
      },
      evolution: {
        method: "level",
        level: 37,
        to: 80,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 1, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 99,
      eggGroups: ["Monster", "Water 1"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.2,
      weight: 36.0,
      color: "pink",
      habitat: "waters-edge",
      generation: 1
    },

    80: {
      id: 80,
      name: "Slowbro",
      types: ["Agua", "Psíquico"],
      baseStats: { hp: 95, atk: 75, def: 110, spa: 100, spd: 80, spe: 30 },
      moves: {
        1: "Confusión",
        1: "Gruñido",
        1: "Agua Lodosa",
        1: "Cabezazo",
        15: "Confusión",
        20: "Desconcierto",
        25: "Psicorrayo",
        29: "Ataque Oculto",
        34: "Paz Mental",
        37: "Psíquico",
        44: "Lluvia",
        55: "Psicoonda"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 164,
      eggGroups: ["Monster", "Water 1"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.6,
      weight: 78.5,
      color: "pink",
      habitat: "waters-edge",
      generation: 1
    },

    81: {
      id: 81,
      name: "Magnemite",
      types: ["Eléctrico", "Acero"],
      baseStats: { hp: 25, atk: 35, def: 70, spa: 95, spd: 55, spe: 45 },
      moves: {
        1: "Tackle",
        6: "Supersónico",
        11: "Onda Trueno",
        16: "Rayo Burbuja",
        21: "Rayo Confuso",
        26: "Electrocañón",
        31: "Rayo",
        36: "Imán",
        41: "Espejo",
        46: "Electroball"
      },
      evolution: {
        method: "level",
        level: 30,
        to: 82,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 89,
      eggGroups: ["Mineral"],
      genderRatio: -1, // Genderless
      hatchSteps: 5120,
      height: 0.3,
      weight: 6.0,
      color: "gray",
      habitat: "rough-terrain",
      generation: 1
    },

    82: {
      id: 82,
      name: "Magneton",
      types: ["Eléctrico", "Acero"],
      baseStats: { hp: 50, atk: 60, def: 95, spa: 120, spd: 70, spe: 70 },
      moves: {
        1: "Tackle",
        1: "Supersónico",
        1: "Onda Trueno",
        1: "Rayo Burbuja",
        21: "Rayo Confuso",
        25: "Electrocañón",
        29: "Rayo",
        38: "Imán",
        46: "Espejo",
        54: "Electroball",
        62: "Campo Magnético"
      },
      evolution: {
        method: "level",
        level: null,
        to: 462,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: "magnetic_field" }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 60,
      baseExp: 161,
      eggGroups: ["Mineral"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 1.0,
      weight: 60.0,
      color: "gray",
      habitat: "rough-terrain",
      generation: 1
    },

    83: {
      id: 83,
      name: "Farfetch'd",
      types: ["Normal", "Volador"],
      baseStats: { hp: 52, atk: 90, def: 55, spa: 58, spd: 62, spe: 60 },
      moves: {
        1: "Picotazo",
        1: "Ataque Arena",
        7: "Hoja Afilada",
        13: "Ataque Ala",
        19: "Corte",
        25: "Aire Afilado",
        31: "Espada Justiciera",
        37: "Golpe",
        43: "Falsa Tortuga",
        49: "Sable de Luz"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 132,
      eggGroups: ["Flying", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.8,
      weight: 15.0,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    84: {
      id: 84,
      name: "Doduo",
      types: ["Normal", "Volador"],
      baseStats: { hp: 35, atk: 85, def: 45, spa: 35, spd: 35, spe: 75 },
      moves: {
        1: "Picotazo",
        5: "Gruñido",
        9: "Persecución",
        13: "Furia",
        17: "Ataque Ala",
        21: "Doble Golpe",
        25: "Agilidad",
        29: "Sorpresa",
        33: "Ataque Furia",
        37: "Golpe",
        41: "Doble Filo"
      },
      evolution: {
        method: "level",
        level: 31,
        to: 85,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 96,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.4,
      weight: 39.2,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    85: {
      id: 85,
      name: "Dodrio",
      types: ["Normal", "Volador"],
      baseStats: { hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 110 },
      moves: {
        1: "Picotazo",
        1: "Gruñido",
        1: "Persecución",
        1: "Furia",
        17: "Ataque Ala",
        21: "Doble Golpe",
        25: "Agilidad",
        29: "Sorpresa",
        33: "Ataque Furia",
        38: "Golpe",
        44: "Doble Filo",
        51: "Ataque Furia"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 158,
      eggGroups: ["Flying"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.8,
      weight: 85.2,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    86: {
      id: 86,
      name: "Seel",
      types: ["Agua"],
      baseStats: { hp: 65, atk: 45, def: 55, spa: 45, spd: 70, spe: 45 },
      moves: {
        1: "Cabezazo",
        3: "Gruñido",
        7: "Rayo Burbuja",
        11: "Defensa Férrea",
        13: "Rayo Aurora",
        17: "Rayo Confuso",
        21: "Rayo de Hielo",
        23: "Restricción",
        27: "Salvaguardia",
        31: "Ataque Oculto",
        33: "Vendaval",
        37: "Surf",
        41: "Viento Hielo",
        43: "Lluvia",
        47: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 34,
        to: 87,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 1, spe: 0 },
      catchRate: 190,
      baseExp: 100,
      eggGroups: ["Water 1", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.1,
      weight: 90.0,
      color: "white",
      habitat: "sea",
      generation: 1
    },

    87: {
      id: 87,
      name: "Dewgong",
      types: ["Agua", "Hielo"],
      baseStats: { hp: 90, atk: 70, def: 80, spa: 70, spd: 95, spe: 70 },
      moves: {
        1: "Cabezazo",
        1: "Gruñido",
        1: "Rayo Burbuja",
        1: "Defensa Férrea",
        13: "Rayo Aurora",
        17: "Rayo Confuso",
        21: "Rayo de Hielo",
        23: "Restricción",
        27: "Salvaguardia",
        31: "Ataque Oculto",
        33: "Vendaval",
        39: "Surf",
        45: "Viento Hielo",
        49: "Lluvia",
        55: "Hidrobomba"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 2, spe: 0 },
      catchRate: 75,
      baseExp: 176,
      eggGroups: ["Water 1", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.7,
      weight: 120.0,
      color: "white",
      habitat: "sea",
      generation: 1
    },

    88: {
      id: 88,
      name: "Grimer",
      types: ["Veneno"],
      baseStats: { hp: 80, atk: 80, def: 50, spa: 40, spd: 50, spe: 25 },
      moves: {
        1: "Lodo",
        4: "Endurecimiento",
        7: "Lodo",
        12: "Disable",
        15: "Bofetón Lodo",
        18: "Minimizar",
        21: "Bomba Lodo",
        26: "Puya Nociva",
        29: "Amnesia",
        32: "Acido",
        37: "Mud Shot",
        40: "Golpe",
        43: "Lanzamiento",
        46: "Explosión"
      },
      evolution: {
        method: "level",
        level: 38,
        to: 89,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 1, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 90,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.9,
      weight: 30.0,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    89: {
      id: 89,
      name: "Muk",
      types: ["Veneno"],
      baseStats: { hp: 105, atk: 105, def: 75, spa: 65, spd: 100, spe: 50 },
      moves: {
        1: "Lodo",
        1: "Endurecimiento",
        1: "Lodo",
        1: "Disable",
        15: "Bofetón Lodo",
        18: "Minimizar",
        21: "Bomba Lodo",
        26: "Puya Nociva",
        29: "Amnesia",
        32: "Acido",
        37: "Mud Shot",
        40: "Golpe",
        46: "Lanzamiento",
        52: "Explosión"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 1, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 157,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.2,
      weight: 30.0,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    90: {
      id: 90,
      name: "Shellder",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 65, def: 100, spa: 45, spd: 25, spe: 40 },
      moves: {
        1: "Tackle",
        4: "Concha Filo",
        8: "Rayo Burbuja",
        13: "Rayo Aurora",
        16: "Protección",
        20: "Rayo de Hielo",
        25: "Clamp",
        28: "Rayo Confuso",
        32: "Rayo Aurora",
        37: "Viento Hielo",
        40: "Rayo Burbuja",
        44: "Concha Armadura",
        49: "Hidrobomba"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 91,
        item: "waterstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 97,
      eggGroups: ["Water 3"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.3,
      weight: 4.0,
      color: "purple",
      habitat: "sea",
      generation: 1
    },

    91: {
      id: 91,
      name: "Cloyster",
      types: ["Agua", "Hielo"],
      baseStats: { hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70 },
      moves: {
        1: "Concha Filo",
        1: "Rayo Burbuja",
        1: "Rayo Aurora",
        1: "Protección"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 60,
      baseExp: 203,
      eggGroups: ["Water 3"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.5,
      weight: 132.5,
      color: "purple",
      habitat: "sea",
      generation: 1
    },

    92: {
      id: 92,
      name: "Gastly",
      types: ["Fantasma", "Veneno"],
      baseStats: { hp: 30, atk: 35, def: 30, spa: 100, spd: 35, spe: 80 },
      moves: {
        1: "Lengüetazo",
        5: "Hipnosis",
        8: "Polvo Veneno",
        12: "Confusión",
        15: "Maldición",
        19: "Rayo Nocturno",
        22: "Imagen",
        26: "Susto",
        29: "Come Sueños",
        33: "Bola Sombra",
        36: "Confusión",
        40: "Tinieblas",
        43: "Destino Final",
        47: "Bola Fantasma"
      },
      evolution: {
        method: "level",
        level: 25,
        to: 93,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 95,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.3,
      weight: 0.1,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    93: {
      id: 93,
      name: "Haunter",
      types: ["Fantasma", "Veneno"],
      baseStats: { hp: 45, atk: 50, def: 45, spa: 115, spd: 55, spe: 95 },
      moves: {
        1: "Lengüetazo",
        1: "Hipnosis",
        1: "Polvo Veneno",
        12: "Confusión",
        15: "Maldición",
        19: "Rayo Nocturno",
        22: "Imagen",
        28: "Susto",
        33: "Come Sueños",
        39: "Bola Sombra",
        44: "Confusión",
        50: "Tinieblas",
        55: "Destino Final",
        61: "Bola Fantasma"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 94,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 90,
      baseExp: 126,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.6,
      weight: 0.1,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    94: {
      id: 94,
      name: "Gengar",
      types: ["Fantasma", "Veneno"],
      baseStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
      moves: {
        1: "Lengüetazo",
        1: "Hipnosis",
        1: "Polvo Veneno",
        1: "Confusión"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 190,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.5,
      weight: 40.5,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    95: {
      id: 95,
      name: "Onix",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 35, atk: 45, def: 160, spa: 30, spd: 45, spe: 70 },
      moves: {
        1: "Látigo Cepa",
        1: "Gruñido",
        4: "Ataque Roca",
        8: "Enfado",
        12: "Terratemblor",
        16: "Excavar",
        20: "Atadura",
        24: "Lanzarrocas",
        28: "Furia",
        32: "Arena",
        36: "Cola Férrea",
        40: "Rugido",
        44: "Piedra Angular"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 208,
        item: "metal_coat",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 108,
      eggGroups: ["Mineral"],
      genderRatio: 0.5,
      hatchSteps: 6400,
      height: 8.8,
      weight: 210.0,
      color: "gray",
      habitat: "cave",
      generation: 1
    },

    96: {
      id: 96,
      name: "Drowzee",
      types: ["Psíquico"],
      baseStats: { hp: 60, atk: 48, def: 45, spa: 43, spd: 90, spe: 42 },
      moves: {
        1: "Pound",
        1: "Hipnosis",
        5: "Disable",
        9: "Confusión",
        13: "Cabeza Zen",
        17: "Rayo Confuso",
        21: "Mina",
        25: "Psicorrayo",
        29: "Meditación",
        33: "Psíquico",
        37: "Psicoonda",
        41: "Futuro",
        45: "Sincrodestino"
      },
      evolution: {
        method: "level",
        level: 26,
        to: 97,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 1, spe: 0 },
      catchRate: 190,
      baseExp: 102,
      eggGroups: ["Human-Like"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 32.4,
      color: "yellow",
      habitat: "urban",
      generation: 1
    },

    97: {
      id: 97,
      name: "Hypno",
      types: ["Psíquico"],
      baseStats: { hp: 85, atk: 73, def: 70, spa: 73, spd: 115, spe: 67 },
      moves: {
        1: "Pound",
        1: "Hipnosis",
        1: "Disable",
        1: "Confusión",
        13: "Cabeza Zen",
        17: "Rayo Confuso",
        21: "Mina",
        25: "Psicorrayo",
        29: "Meditación",
        33: "Psíquico",
        37: "Psicoonda",
        41: "Futuro",
        49: "Sincrodestino"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 2, spe: 0 },
      catchRate: 75,
      baseExp: 165,
      eggGroups: ["Human-Like"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.6,
      weight: 75.6,
      color: "yellow",
      habitat: "urban",
      generation: 1
    },

    98: {
      id: 98,
      name: "Krabby",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 105, def: 90, spa: 25, spd: 25, spe: 50 },
      moves: {
        1: "Burbuja",
        5: "Vicio",
        9: "Cuchillada",
        11: "Pin Misil",
        15: "Protección",
        19: "Rayo Burbuja",
        21: "Tajo Umbrío",
        25: "Garra Brutal",
        29: "Corte Furia",
        31: "Martillazo",
        35: "Guillotina",
        39: "Hidropulso",
        41: "Trampa",
        45: "Aguante",
        49: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 28,
        to: 99,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 225,
      baseExp: 115,
      eggGroups: ["Water 3"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.4,
      weight: 6.5,
      color: "red",
      habitat: "waters-edge",
      generation: 1
    },

    99: {
      id: 99,
      name: "Kingler",
      types: ["Agua"],
      baseStats: { hp: 55, atk: 130, def: 115, spa: 50, spd: 50, spe: 75 },
      moves: {
        1: "Burbuja",
        1: "Vicio",
        1: "Cuchillada",
        1: "Pin Misil",
        15: "Protección",
        19: "Rayo Burbuja",
        21: "Tajo Umbrío",
        25: "Garra Brutal",
        32: "Corte Furia",
        37: "Martillazo",
        44: "Guillotina",
        51: "Hidropulso",
        56: "Trampa",
        63: "Aguante",
        68: "Hidrobomba"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 60,
      baseExp: 206,
      eggGroups: ["Water 3"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.3,
      weight: 60.0,
      color: "red",
      habitat: "waters-edge",
      generation: 1
    },

    100: {
      id: 100,
      name: "Voltorb",
      types: ["Eléctrico"],
      baseStats: { hp: 40, atk: 30, def: 50, spa: 55, spd: 55, spe: 100 },
      moves: {
        1: "Carga",
        4: "Supersónico",
        6: "Onda Trueno",
        9: "Rayo Burbuja",
        11: "Rayo Confuso",
        13: "Rayo",
        16: "Autodestrucción",
        20: "Rayo Veloz",
        22: "Espejo",
        26: "Electrocañón",
        29: "Rayo",
        34: "Explosión",
        37: "Campo Magnético",
        41: "Electroball",
        46: "Rayo",
        48: "Rayo Trueno"
      },
      evolution: {
        method: "level",
        level: 30,
        to: 101,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 190,
      baseExp: 103,
      eggGroups: ["Mineral"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 0.5,
      weight: 10.4,
      color: "red",
      habitat: "urban",
      generation: 1
    },

    101: {
      id: 101,
      name: "Electrode",
      types: ["Eléctrico"],
      baseStats: { hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 150 },
      moves: {
        1: "Carga",
        1: "Supersónico",
        1: "Onda Trueno",
        1: "Rayo Burbuja",
        13: "Rayo Confuso",
        16: "Autodestrucción",
        20: "Rayo Veloz",
        22: "Espejo",
        29: "Electrocañón",
        34: "Explosión",
        40: "Campo Magnético",
        46: "Electroball",
        50: "Rayo",
        54: "Rayo Trueno"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 60,
      baseExp: 150,
      eggGroups: ["Mineral"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 1.2,
      weight: 66.6,
      color: "red",
      habitat: "urban",
      generation: 1
    },

    102: {
      id: 102,
      name: "Exeggcute",
      types: ["Planta", "Psíquico"],
      baseStats: { hp: 60, atk: 40, def: 80, spa: 60, spd: 45, spe: 40 },
      moves: {
        1: "Barrera",
        1: "Absorber",
        7: "Hipnosis",
        11: "Reflejo",
        17: "Lanzamiento",
        19: "Puya Nociva",
        21: "Estoicismo",
        23: "Drenadoras",
        27: "Confusión",
        33: "Somnífero",
        37: "Rayo Solar",
        43: "Psíquico",
        47: "Huevo Bomba"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 103,
        item: "leafstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 90,
      baseExp: 98,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.4,
      weight: 2.5,
      color: "pink",
      habitat: "forest",
      generation: 1
    },

    103: {
      id: 103,
      name: "Exeggutor",
      types: ["Planta", "Psíquico"],
      baseStats: { hp: 95, atk: 95, def: 85, spa: 125, spd: 75, spe: 55 },
      moves: {
        1: "Barrera",
        1: "Absorber",
        1: "Hipnosis",
        1: "Confusión"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 212,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 2.0,
      weight: 120.0,
      color: "yellow",
      habitat: "forest",
      generation: 1
    },

    104: {
      id: 104,
      name: "Cubone",
      types: ["Tierra"],
      baseStats: { hp: 50, atk: 50, def: 95, spa: 40, spd: 50, spe: 35 },
      moves: {
        1: "Hueso Palo",
        3: "Gruñido",
        7: "Cola Férrea",
        11: "Foco Energía",
        13: "Huesomerang",
        17: "Furia",
        21: "Hueso",
        23: "Látigo",
        27: "Cabeza de Hierro",
        31: "Hueso",
        33: "Falsa Tortuga",
        37: "Grito",
        41: "Falsotortazo",
        43: "Danza Espada",
        47: "Doble Filo"
      },
      evolution: {
        method: "level",
        level: 28,
        to: 105,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 87,
      eggGroups: ["Monster"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.4,
      weight: 6.5,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    105: {
      id: 105,
      name: "Marowak",
      types: ["Tierra"],
      baseStats: { hp: 60, atk: 80, def: 110, spa: 50, spd: 80, spe: 45 },
      moves: {
        1: "Hueso Palo",
        1: "Gruñido",
        1: "Cola Férrea",
        1: "Foco Energía",
        13: "Huesomerang",
        17: "Furia",
        21: "Hueso",
        23: "Látigo",
        27: "Cabeza de Hierro",
        33: "Hueso",
        37: "Falsa Tortuga",
        43: "Grito",
        49: "Falsotortazo",
        53: "Danza Espada",
        59: "Doble Filo"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 124,
      eggGroups: ["Monster"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 45.0,
      color: "brown",
      habitat: "mountain",
      generation: 1
    },

    106: {
      id: 106,
      name: "Hitmonlee",
      types: ["Lucha"],
      baseStats: { hp: 50, atk: 120, def: 53, spa: 35, spd: 110, spe: 87 },
      moves: {
        1: "Patada Baja",
        5: "Doble Patada",
        9: "Puño Cometa",
        13: "Finta",
        17: "Patada Salto Alta",
        21: "Patada Girada",
        25: "Agilidad",
        29: "Patada Ígnea",
        33: "Mind Reader",
        37: "Foco Energía",
        41: "Patada Sónica",
        45: "Patada Trueno",
        49: "Patada Baja",
        53: "Reverso"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 139,
      eggGroups: ["Human-Like"],
      genderRatio: 1.0,
      hatchSteps: 6400,
      height: 1.5,
      weight: 49.8,
      color: "brown",
      habitat: "urban",
      generation: 1
    },

    107: {
      id: 107,
      name: "Hitmonchan",
      types: ["Lucha"],
      baseStats: { hp: 50, atk: 105, def: 79, spa: 35, spd: 110, spe: 76 },
      moves: {
        1: "Puño Cometa",
        6: "Agilidad",
        11: "Puño Foco",
        16: "Puño Trueno",
        21: "Puño Fuego",
        26: "Puño Hielo",
        31: "Puño Sombra",
        36: "Puño Bala",
        41: "Puño Dinámico",
        46: "Contraataque",
        51: "Puño Mareo",
        56: "Puño Mega"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 2, spe: 0 },
      catchRate: 45,
      baseExp: 140,
      eggGroups: ["Human-Like"],
      genderRatio: 1.0,
      hatchSteps: 6400,
      height: 1.4,
      weight: 50.2,
      color: "brown",
      habitat: "urban",
      generation: 1
    },

    108: {
      id: 108,
      name: "Lickitung",
      types: ["Normal"],
      baseStats: { hp: 90, atk: 55, def: 75, spa: 60, spd: 75, spe: 30 },
      moves: {
        1: "Lengüetazo",
        7: "Supersónico",
        13: "Defensa Férrea",
        19: "Golpe",
        25: "Terremoto",
        31: "Lengüetazo",
        37: "Día de Pago",
        43: "Explosión"
      },
      evolution: {
        method: "level",
        level: null,
        to: 463,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null, moveLearned: "Rodar" }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 127,
      eggGroups: ["Monster"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.2,
      weight: 65.5,
      color: "pink",
      habitat: "grassland",
      generation: 1
    },

    109: {
      id: 109,
      name: "Koffing",
      types: ["Veneno"],
      baseStats: { hp: 40, atk: 65, def: 95, spa: 60, spd: 45, spe: 35 },
      moves: {
        1: "Tackle",
        4: "Humo",
        8: "Gas",
        12: "Lodo",
        15: "Autodestrucción",
        18: "Humo",
        23: "Bomba Lodo",
        26: "Humo",
        29: "Explosión",
        34: "Destrucción",
        37: "Giro Bola",
        40: "Bomba Tóxica",
        42: "Destino Final"
      },
      evolution: {
        method: "level",
        level: 35,
        to: 110,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 190,
      baseExp: 114,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.6,
      weight: 1.0,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    110: {
      id: 110,
      name: "Weezing",
      types: ["Veneno"],
      baseStats: { hp: 65, atk: 90, def: 120, spa: 85, spd: 70, spe: 60 },
      moves: {
        1: "Tackle",
        1: "Humo",
        1: "Gas",
        1: "Lodo",
        15: "Autodestrucción",
        18: "Humo",
        23: "Bomba Lodo",
        26: "Humo",
        29: "Explosión",
        34: "Destrucción",
        40: "Giro Bola",
        46: "Bomba Tóxica",
        49: "Destino Final"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 60,
      baseExp: 173,
      eggGroups: ["Amorphous"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.2,
      weight: 9.5,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    111: {
      id: 111,
      name: "Rhyhorn",
      types: ["Tierra", "Roca"],
      baseStats: { hp: 80, atk: 85, def: 95, spa: 30, spd: 30, spe: 25 },
      moves: {
        1: "Cornada",
        1: "Cola Férrea",
        5: "Furia",
        9: "Pisotón",
        13: "Furia",
        17: "Terratemblor",
        21: "Derribo",
        25: "Explosión",
        29: "Terremoto",
        33: "Megacuerno",
        37: "Piedra Angular",
        41: "Doble Filo",
        45: "Roca Afilada"
      },
      evolution: {
        method: "level",
        level: 42,
        to: 112,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 120,
      baseExp: 135,
      eggGroups: ["Monster", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 115.0,
      color: "gray",
      habitat: "rough-terrain",
      generation: 1
    },

    112: {
      id: 112,
      name: "Rhydon",
      types: ["Tierra", "Roca"],
      baseStats: { hp: 105, atk: 130, def: 120, spa: 45, spd: 45, spe: 40 },
      moves: {
        1: "Cornada",
        1: "Cola Férrea",
        1: "Furia",
        1: "Pisotón",
        17: "Terratemblor",
        21: "Derribo",
        25: "Explosión",
        29: "Terremoto",
        33: "Megacuerno",
        37: "Piedra Angular",
        41: "Doble Filo",
        48: "Roca Afilada"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 464,
        item: "protector",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 60,
      baseExp: 204,
      eggGroups: ["Monster", "Field"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.9,
      weight: 120.0,
      color: "gray",
      habitat: "rough-terrain",
      generation: 1
    },

    113: {
      id: 113,
      name: "Chansey",
      types: ["Normal"],
      baseStats: { hp: 250, atk: 5, def: 5, spa: 35, spd: 105, spe: 50 },
      moves: {
        1: "Doble Bofetón",
        5: "Canto",
        9: "Huevo Bomba",
        13: "Minimizar",
        17: "Drenadoras",
        23: "Reflejo",
        29: "Suavizante",
        35: "Doble Bofetón",
        41: "Huevo Bomba",
        49: "Luz Terapéutica"
      },
      evolution: {
        method: "friendship",
        level: null,
        to: 242,
        item: null,
        conditions: { time: "day", move: null, gender: null, happiness: 220, location: null }
      },
      growthRate: "fast",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 30,
      baseExp: 255,
      eggGroups: ["Fairy"],
      genderRatio: 1.0,
      hatchSteps: 10240,
      height: 1.1,
      weight: 34.6,
      color: "pink",
      habitat: "urban",
      generation: 1
    },

    114: {
      id: 114,
      name: "Tangela",
      types: ["Planta"],
      baseStats: { hp: 65, atk: 55, def: 115, spa: 100, spd: 40, spe: 60 },
      moves: {
        1: "Constricción",
        4: "Somnífero",
        10: "Absorber",
        13: "Látigo Cepa",
        19: "Crecimiento",
        22: "Megaagotar",
        28: "Golpe Cuerpo",
        31: "Drenadoras",
        37: "Látigo",
        40: "Rayo Solar",
        46: "Puya Nociva"
      },
      evolution: {
        method: "level",
        level: null,
        to: 465,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null, moveLearned: "Poder Pasado" }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 166,
      eggGroups: ["Grass"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.0,
      weight: 35.0,
      color: "blue",
      habitat: "grassland",
      generation: 1
    },

    115: {
      id: 115,
      name: "Kangaskhan",
      types: ["Normal"],
      baseStats: { hp: 105, atk: 95, def: 80, spa: 40, spd: 80, spe: 90 },
      moves: {
        1: "Comet Punch",
        7: "Falsa Tortuga",
        13: "Mordisco",
        19: "Puño Mega",
        25: "Furia",
        31: "Doble Golpe",
        37: "Grito",
        43: "Golpe",
        49: "Contraataque",
        55: "Ataque Furia"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 175,
      eggGroups: ["Monster"],
      genderRatio: 1.0,
      hatchSteps: 5120,
      height: 2.2,
      weight: 80.0,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    116: {
      id: 116,
      name: "Horsea",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 40, def: 70, spa: 70, spd: 25, spe: 60 },
      moves: {
        1: "Burbuja",
        5: "Foco Energía",
        9: "Agua Lodosa",
        13: "Láser",
        17: "Rayo Burbuja",
        21: "Velo Aqua",
        26: "Rayo Aurora",
        31: "Hidropulso",
        36: "Danza Dragón",
        41: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 32,
        to: 117,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 225,
      baseExp: 83,
      eggGroups: ["Water 1", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.4,
      weight: 8.0,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    117: {
      id: 117,
      name: "Seadra",
      types: ["Agua"],
      baseStats: { hp: 55, atk: 65, def: 95, spa: 95, spd: 45, spe: 85 },
      moves: {
        1: "Burbuja",
        1: "Foco Energía",
        1: "Agua Lodosa",
        1: "Láser",
        17: "Rayo Burbuja",
        21: "Velo Aqua",
        26: "Rayo Aurora",
        31: "Hidropulso",
        38: "Danza Dragón",
        45: "Hidrobomba"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 230,
        item: "dragon_scale",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 1, spd: 0, spe: 0 },
      catchRate: 75,
      baseExp: 155,
      eggGroups: ["Water 1", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.2,
      weight: 25.0,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    118: {
      id: 118,
      name: "Goldeen",
      types: ["Agua"],
      baseStats: { hp: 45, atk: 67, def: 60, spa: 35, spd: 50, spe: 63 },
      moves: {
        1: "Picotazo",
        7: "Supersónico",
        11: "Cornada",
        17: "Furia",
        21: "Ataque Ala",
        27: "Agua Lodosa",
        31: "Cuerno",
        37: "Aguijón Letal",
        41: "Hidrobomba",
        47: "Megacuerno"
      },
      evolution: {
        method: "level",
        level: 33,
        to: 119,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 225,
      baseExp: 111,
      eggGroups: ["Water 2"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 0.6,
      weight: 15.0,
      color: "red",
      habitat: "waters-edge",
      generation: 1
    },

    119: {
      id: 119,
      name: "Seaking",
      types: ["Agua"],
      baseStats: { hp: 80, atk: 92, def: 65, spa: 65, spd: 80, spe: 68 },
      moves: {
        1: "Picotazo",
        1: "Supersónico",
        1: "Cornada",
        1: "Furia",
        21: "Ataque Ala",
        27: "Agua Lodosa",
        31: "Cuerno",
        39: "Aguijón Letal",
        45: "Hidrobomba",
        51: "Megacuerno"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 60,
      baseExp: 170,
      eggGroups: ["Water 2"],
      genderRatio: 0.5,
      hatchSteps: 5120,
      height: 1.3,
      weight: 39.0,
      color: "red",
      habitat: "waters-edge",
      generation: 1
    },

    120: {
      id: 120,
      name: "Staryu",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 45, def: 55, spa: 70, spd: 55, spe: 85 },
      moves: {
        1: "Tackle",
        1: "Endurecimiento",
        6: "Rayo Burbuja",
        10: "Rayo Confuso",
        15: "Rayo Aurora",
        19: "Recuperación",
        24: "Rayo Burbuja",
        28: "Rayo Veloz",
        33: "Cosmico",
        37: "Hidrobomba",
        42: "Luz Terapéutica"
      },
      evolution: {
        method: "stone",
        level: null,
        to: 121,
        item: "waterstone",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 225,
      baseExp: 106,
      eggGroups: ["Water 3"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 0.8,
      weight: 34.5,
      color: "brown",
      habitat: "sea",
      generation: 1
    },

    121: {
      id: 121,
      name: "Starmie",
      types: ["Agua", "Psíquico"],
      baseStats: { hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115 },
      moves: {
        1: "Recuperación",
        1: "Rayo Burbuja",
        1: "Rayo Confuso",
        1: "Rayo Aurora"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 60,
      baseExp: 207,
      eggGroups: ["Water 3"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 1.1,
      weight: 80.0,
      color: "purple",
      habitat: "sea",
      generation: 1
    },

    122: {
      id: 122,
      name: "Mr. Mime",
      types: ["Psíquico", "Hada"],
      baseStats: { hp: 40, atk: 45, def: 65, spa: 100, spd: 120, spe: 90 },
      moves: {
        1: "Barrera",
        1: "Confusión",
        6: "Copión",
        11: "Doble Equipo",
        16: "Psicorrayo",
        21: "Reflejo",
        26: "Sustituto",
        31: "Rayo Confuso",
        36: "Rayo Luz",
        41: "Psíquico",
        46: "Muro Luz",
        51: "Sincrodestino"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 2, spe: 0 },
      catchRate: 45,
      baseExp: 136,
      eggGroups: ["Human-Like"],
      genderRatio: 0.5,
      hatchSteps: 6400,
      height: 1.3,
      weight: 54.5,
      color: "pink",
      habitat: "urban",
      generation: 1
    },

    123: {
      id: 123,
      name: "Scyther",
      types: ["Bicho", "Volador"],
      baseStats: { hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105 },
      moves: {
        1: "Corte",
        5: "Foco Energía",
        9: "Persecución",
        13: "Falsotortazo",
        17: "Doble Equipo",
        21: "Furia",
        25: "Aire Afilado",
        29: "Cuchillada",
        33: "Espada Justiciera",
        37: "Agilidad",
        41: "Ataque Ala",
        45: "Tajo Cruzado",
        49: "X-Scissor"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 212,
        item: "metal_coat",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 100,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 6400,
      height: 1.5,
      weight: 56.0,
      color: "green",
      habitat: "forest",
      generation: 1
    },

    124: {
      id: 124,
      name: "Jynx",
      types: ["Hielo", "Psíquico"],
      baseStats: { hp: 65, atk: 50, def: 35, spa: 115, spd: 95, spe: 95 },
      moves: {
        1: "Beso Amoroso",
        1: "Lengüetazo",
        5: "Polvo Nieve",
        9: "Doble Bofetón",
        13: "Confusión",
        17: "Rayo Confuso",
        21: "Ventisca",
        25: "Falso Tortazo",
        29: "Drenadoras",
        33: "Psíquico",
        37: "Ventisca",
        41: "Perfume",
        45: "Ventisca"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 137,
      eggGroups: ["Human-Like"],
      genderRatio: 1.0,
      hatchSteps: 6400,
      height: 1.4,
      weight: 40.6,
      color: "red",
      habitat: "urban",
      generation: 1
    },

    125: {
      id: 125,
      name: "Electabuzz",
      types: ["Eléctrico"],
      baseStats: { hp: 65, atk: 83, def: 57, spa: 95, spd: 85, spe: 105 },
      moves: {
        1: "Ataque Rápido",
        1: "Leer",
        5: "Onda Trueno",
        8: "Rayo Burbuja",
        12: "Rayo Confuso",
        15: "Chispazo",
        19: "Rayo",
        22: "Rayo Veloz",
        26: "Rayo",
        29: "Puño Trueno",
        36: "Electrocañón",
        42: "Rayo Trueno",
        49: "Campo Magnético"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 466,
        item: "electirizer",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 45,
      baseExp: 156,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 6400,
      height: 1.1,
      weight: 30.0,
      color: "yellow",
      habitat: "urban",
      generation: 1
    },

    126: {
      id: 126,
      name: "Magmar",
      types: ["Fuego"],
      baseStats: { hp: 65, atk: 95, def: 57, spa: 100, spd: 85, spe: 93 },
      moves: {
        1: "Ascuas",
        5: "Humo",
        8: "Embestida",
        12: "Furia",
        15: "Rayo Confuso",
        19: "Giro Fuego",
        22: "Lanzallamas",
        26: "Confusión",
        29: "Puño Fuego",
        36: "Infierno",
        42: "Humo",
        49: "Lanzallamas"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 467,
        item: "magmarizer",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 2, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 173,
      eggGroups: ["Human-Like"],
      genderRatio: 0.75,
      hatchSteps: 6400,
      height: 1.3,
      weight: 44.5,
      color: "red",
      habitat: "mountain",
      generation: 1
    },

    127: {
      id: 127,
      name: "Pinsir",
      types: ["Bicho"],
      baseStats: { hp: 65, atk: 125, def: 100, spa: 55, spd: 70, spe: 85 },
      moves: {
        1: "Agarre",
        4: "Foco Energía",
        8: "Vicio",
        11: "Doble Golpe",
        15: "Puya Nociva",
        18: "Furia",
        22: "Sumisión",
        26: "Guillotina",
        29: "Tajo Cruzado",
        33: "Golpe",
        36: "Garra Brutal",
        40: "Aguante",
        43: "Megacuerno"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 200,
      eggGroups: ["Bug"],
      genderRatio: 0.5,
      hatchSteps: 6400,
      height: 1.5,
      weight: 55.0,
      color: "brown",
      habitat: "forest",
      generation: 1
    },

    128: {
      id: 128,
      name: "Tauros",
      types: ["Normal"],
      baseStats: { hp: 75, atk: 100, def: 95, spa: 40, spd: 70, spe: 110 },
      moves: {
        1: "Tackle",
        3: "Cola Férrea",
        5: "Furia",
        8: "Persecución",
        11: "Descanso",
        15: "Derribo",
        19: "Trabajo",
        24: "Tajo",
        29: "Golpe Cuerpo",
        35: "Derribo",
        41: "Grito",
        48: "Terremoto",
        55: "Megacuerno"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 45,
      baseExp: 211,
      eggGroups: ["Field"],
      genderRatio: 1.0,
      hatchSteps: 5120,
      height: 1.4,
      weight: 88.4,
      color: "brown",
      habitat: "grassland",
      generation: 1
    },

    129: {
      id: 129,
      name: "Magikarp",
      types: ["Agua"],
      baseStats: { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 },
      moves: {
        1: "Chapoteo",
        15: "Golpe",
        30: "Golpe"
      },
      evolution: {
        method: "level",
        level: 20,
        to: 130,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 1 },
      catchRate: 255,
      baseExp: 40,
      eggGroups: ["Water 2", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 1280,
      height: 0.9,
      weight: 10.0,
      color: "red",
      habitat: "waters-edge",
      generation: 1
    },

    130: {
      id: 130,
      name: "Gyarados",
      types: ["Agua", "Volador"],
      baseStats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 },
      moves: {
        1: "Mordisco",
        1: "Golpe",
        20: "Golpe",
        25: "Mordisco",
        30: "Golpe",
        35: "Golpe",
        40: "Hidrobomba",
        45: "Lluvia",
        50: "Hidropulso",
        55: "Hiperrayo",
        60: "Golpe"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 214,
      eggGroups: ["Water 2", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 1280,
      height: 6.5,
      weight: 235.0,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    131: {
      id: 131,
      name: "Lapras",
      types: ["Agua", "Hielo"],
      baseStats: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 },
      moves: {
        1: "Canto",
        1: "Gruñido",
        4: "Rayo Confuso",
        7: "Rayo Burbuja",
        10: "Rayo Aurora",
        13: "Canto",
        16: "Cuerpo Pesado",
        19: "Hidrobomba",
        22: "Lluvia",
        25: "Salvaguardia",
        28: "Hielo",
        31: "Perforador",
        34: "Confusión",
        37: "Ventisca",
        40: "Hidrobomba",
        43: "Psíquico"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 219,
      eggGroups: ["Monster", "Water 1"],
      genderRatio: 0.5,
      hatchSteps: 10240,
      height: 2.5,
      weight: 220.0,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    132: {
      id: 132,
      name: "Ditto",
      types: ["Normal"],
      baseStats: { hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48 },
      moves: {
        1: "Transformación"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 1, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 35,
      baseExp: 101,
      eggGroups: ["Ditto"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 0.3,
      weight: 4.0,
      color: "purple",
      habitat: "urban",
      generation: 1
    },

    133: {
      id: 133,
      name: "Eevee",
      types: ["Normal"],
      baseStats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 },
      moves: {
        1: "Ataque Rápido",
        1: "Ayuda",
        5: "Gruñido",
        9: "Ataque Arena",
        13: "Doble Equipo",
        17: "Mordisco",
        21: "Vuelo",
        25: "Última Baza",
        29: "Doble Filo",
        33: "Toma Ira",
        37: "Ataque Furia"
      },
      evolution: {
        method: "stone",
        level: null,
        to: null,
        item: null,
        conditions: {
          time: null,
          move: null,
          gender: null,
          happiness: null,
          location: null
        }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 1, spe: 0 },
      catchRate: 45,
      baseExp: 92,
      eggGroups: ["Field"],
      genderRatio: 0.875,
      hatchSteps: 8960,
      height: 0.3,
      weight: 6.5,
      color: "brown",
      habitat: "urban",
      generation: 1
    },

    134: {
      id: 134,
      name: "Vaporeon",
      types: ["Agua"],
      baseStats: { hp: 130, atk: 65, def: 60, spa: 110, spd: 95, spe: 65 },
      moves: {
        1: "Ataque Rápido",
        1: "Ayuda",
        5: "Gruñido",
        9: "Agua Lodosa",
        13: "Rayo Aurora",
        17: "Rayo Burbuja",
        21: "Velo Aqua",
        25: "Última Baza",
        29: "Hidropulso",
        33: "Acua Aro",
        37: "Hidrobomba",
        41: "Lluvia"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 196,
      eggGroups: ["Field"],
      genderRatio: 0.875,
      hatchSteps: 8960,
      height: 1.0,
      weight: 29.0,
      color: "blue",
      habitat: "urban",
      generation: 1
    },

    135: {
      id: 135,
      name: "Jolteon",
      types: ["Eléctrico"],
      baseStats: { hp: 65, atk: 65, def: 60, spa: 110, spd: 95, spe: 130 },
      moves: {
        1: "Ataque Rápido",
        1: "Ayuda",
        5: "Gruñido",
        9: "Onda Trueno",
        13: "Doble Equipo",
        17: "Rayo Burbuja",
        21: "Pin Misil",
        25: "Última Baza",
        29: "Chispazo",
        33: "Agilidad",
        37: "Rayo",
        41: "Rayo Trueno"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 45,
      baseExp: 197,
      eggGroups: ["Field"],
      genderRatio: 0.875,
      hatchSteps: 8960,
      height: 0.8,
      weight: 24.5,
      color: "yellow",
      habitat: "urban",
      generation: 1
    },

    136: {
      id: 136,
      name: "Flareon",
      types: ["Fuego"],
      baseStats: { hp: 65, atk: 130, def: 60, spa: 95, spd: 110, spe: 65 },
      moves: {
        1: "Ataque Rápido",
        1: "Ayuda",
        5: "Gruñido",
        9: "Ascuas",
        13: "Doble Equipo",
        17: "Mordisco",
        21: "Fuego",
        25: "Última Baza",
        29: "Giro Fuego",
        33: "Lanzallamas",
        37: "Infierno",
        41: "Fuego Sagrado"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 198,
      eggGroups: ["Field"],
      genderRatio: 0.875,
      hatchSteps: 8960,
      height: 0.9,
      weight: 25.0,
      color: "red",
      habitat: "urban",
      generation: 1
    },

    137: {
      id: 137,
      name: "Porygon",
      types: ["Normal"],
      baseStats: { hp: 65, atk: 60, def: 70, spa: 85, spd: 75, spe: 40 },
      moves: {
        1: "Conversión",
        1: "Tackle",
        7: "Psicorrayo",
        12: "Agilidad",
        18: "Recuperación",
        23: "Rayo Confuso",
        29: "Rayo",
        34: "Doble Equipo",
        40: "Recuperación",
        45: "Rayo Trueno",
        51: "Triataque"
      },
      evolution: {
        method: "trade",
        level: null,
        to: 233,
        item: "up-grade",
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 1, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 130,
      eggGroups: ["Mineral"],
      genderRatio: -1,
      hatchSteps: 5120,
      height: 0.8,
      weight: 36.5,
      color: "pink",
      habitat: "urban",
      generation: 1
    },

    138: {
      id: 138,
      name: "Omanyte",
      types: ["Roca", "Agua"],
      baseStats: { hp: 35, atk: 40, def: 100, spa: 90, spd: 55, spe: 35 },
      moves: {
        1: "Constricción",
        1: "Refugio",
        7: "Mordisco",
        10: "Rayo Burbuja",
        16: "Aqua Jet",
        19: "Rodar",
        25: "Mordisco",
        28: "Rayo Aurora",
        34: "Protección",
        37: "Rayo de Hielo",
        43: "Hidrobomba",
        46: "Concha Filo"
      },
      evolution: {
        method: "level",
        level: 40,
        to: 139,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 99,
      eggGroups: ["Water 1", "Water 3"],
      genderRatio: 0.875,
      hatchSteps: 7680,
      height: 0.4,
      weight: 7.5,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    139: {
      id: 139,
      name: "Omastar",
      types: ["Roca", "Agua"],
      baseStats: { hp: 70, atk: 60, def: 125, spa: 115, spd: 70, spe: 55 },
      moves: {
        1: "Constricción",
        1: "Refugio",
        1: "Mordisco",
        1: "Rayo Burbuja",
        16: "Aqua Jet",
        19: "Rodar",
        25: "Mordisco",
        28: "Rayo Aurora",
        34: "Protección",
        37: "Rayo de Hielo",
        40: "Hidrobomba",
        48: "Concha Filo",
        56: "Rayo de Hielo"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 2, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 199,
      eggGroups: ["Water 1", "Water 3"],
      genderRatio: 0.875,
      hatchSteps: 7680,
      height: 1.0,
      weight: 35.0,
      color: "blue",
      habitat: "sea",
      generation: 1
    },

    140: {
      id: 140,
      name: "Kabuto",
      types: ["Roca", "Agua"],
      baseStats: { hp: 30, atk: 80, def: 90, spa: 55, spd: 45, spe: 55 },
      moves: {
        1: "Arañazo",
        1: "Endurecimiento",
        6: "Absorber",
        11: "Arena",
        16: "Aqua Jet",
        21: "Arañazo",
        26: "Megaagotar",
        31: "Rayo Aurora",
        36: "Excavar",
        41: "Concha Filo",
        46: "Rayo de Hielo",
        51: "Hidrobomba"
      },
      evolution: {
        method: "level",
        level: 40,
        to: 141,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 71,
      eggGroups: ["Water 1", "Water 3"],
      genderRatio: 0.875,
      hatchSteps: 7680,
      height: 0.5,
      weight: 11.5,
      color: "brown",
      habitat: "sea",
      generation: 1
    },

    141: {
      id: 141,
      name: "Kabutops",
      types: ["Roca", "Agua"],
      baseStats: { hp: 60, atk: 115, def: 105, spa: 65, spd: 70, spe: 80 },
      moves: {
        1: "Arañazo",
        1: "Endurecimiento",
        1: "Absorber",
        1: "Arena",
        21: "Arañazo",
        26: "Megaagotar",
        31: "Rayo Aurora",
        36: "Excavar",
        40: "Concha Filo",
        45: "Rayo de Hielo",
        50: "Hidrobomba",
        55: "Corte Furia"
      },
      evolution: null,
      growthRate: "medium_fast",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 173,
      eggGroups: ["Water 1", "Water 3"],
      genderRatio: 0.875,
      hatchSteps: 7680,
      height: 1.3,
      weight: 40.5,
      color: "brown",
      habitat: "sea",
      generation: 1
    },

    142: {
      id: 142,
      name: "Aerodactyl",
      types: ["Roca", "Volador"],
      baseStats: { hp: 80, atk: 105, def: 65, spa: 60, spd: 75, spe: 130 },
      moves: {
        1: "Ala de Acero",
        1: "Supersónico",
        5: "Mordisco",
        10: "Furia",
        15: "Roca Afilada",
        20: "Agilidad",
        25: "Antojo",
        30: "Tajo",
        35: "Garra Brutal",
        40: "Vuelo",
        45: "Hiperrayo",
        50: "Grito",
        55: "Roca Afilada"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 2 },
      catchRate: 45,
      baseExp: 202,
      eggGroups: ["Flying"],
      genderRatio: 0.875,
      hatchSteps: 8960,
      height: 1.8,
      weight: 59.0,
      color: "purple",
      habitat: "mountain",
      generation: 1
    },

    143: {
      id: 143,
      name: "Snorlax",
      types: ["Normal"],
      baseStats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
      moves: {
        1: "Metrónomo",
        1: "Lengüetazo",
        4: "Defensa Férrea",
        9: "Amnesia",
        12: "Lengüetazo",
        17: "Descanso",
        20: "Golpe Cuerpo",
        25: "Ronquido",
        28: "Terremoto",
        33: "Descanso",
        36: "Golpe Cuerpo",
        41: "Grito",
        44: "Golpe Cuerpo",
        49: "Metrónomo"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 2, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 25,
      baseExp: 154,
      eggGroups: ["Monster"],
      genderRatio: 0.875,
      hatchSteps: 10240,
      height: 2.1,
      weight: 460.0,
      color: "black",
      habitat: "mountain",
      generation: 1
    },

    144: {
      id: 144,
      name: "Articuno",
      types: ["Hielo", "Volador"],
      baseStats: { hp: 90, atk: 85, def: 100, spa: 95, spd: 125, spe: 85 },
      moves: {
        1: "Viento Hielo",
        1: "Agilidad",
        8: "Polvo Nieve",
        15: "Rayo de Hielo",
        22: "Reflejo",
        29: "Mina",
        36: "Alas de Plata",
        43: "Ventisca",
        50: "Reflejo",
        57: "Vuelo",
        64: "Rayo de Hielo",
        71: "Ventisca",
        78: "Recuperación",
        85: "Vuelo",
        92: "Reflejo",
        99: "Ventisca"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 0, spd: 3, spe: 0 },
      catchRate: 3,
      baseExp: 215,
      eggGroups: ["Undiscovered"],
      genderRatio: -1,
      hatchSteps: 20480,
      height: 1.7,
      weight: 55.4,
      color: "blue",
      habitat: "rare",
      generation: 1
    },

    145: {
      id: 145,
      name: "Zapdos",
      types: ["Eléctrico", "Volador"],
      baseStats: { hp: 90, atk: 90, def: 85, spa: 125, spd: 90, spe: 100 },
      moves: {
        1: "Rayo Trueno",
        1: "Agilidad",
        8: "Onda Trueno",
        15: "Detección",
        22: "Rayo Burbuja",
        29: "Mina",
        36: "Rayo",
        43: "Rayo Trueno",
        50: "Reflejo",
        57: "Alas de Plata",
        64: "Rayo",
        71: "Rayo Trueno",
        78: "Recuperación",
        85: "Alas de Plata",
        92: "Reflejo",
        99: "Rayo Trueno"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 3,
      baseExp: 216,
      eggGroups: ["Undiscovered"],
      genderRatio: -1,
      hatchSteps: 20480,
      height: 1.6,
      weight: 52.6,
      color: "yellow",
      habitat: "rare",
      generation: 1
    },

    146: {
      id: 146,
      name: "Moltres",
      types: ["Fuego", "Volador"],
      baseStats: { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 },
      moves: {
        1: "Alas de Plata",
        1: "Agilidad",
        8: "Embestida",
        15: "Lanzallamas",
        22: "Reflejo",
        29: "Mina",
        36: "Alas de Plata",
        43: "Lanzallamas",
        50: "Reflejo",
        57: "Alas de Plata",
        64: "Lanzallamas",
        71: "Alas de Plata",
        78: "Recuperación",
        85: "Alas de Plata",
        92: "Reflejo",
        99: "Alas de Plata"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 3,
      baseExp: 217,
      eggGroups: ["Undiscovered"],
      genderRatio: -1,
      hatchSteps: 20480,
      height: 2.0,
      weight: 60.0,
      color: "yellow",
      habitat: "rare",
      generation: 1
    },

    147: {
      id: 147,
      name: "Dratini",
      types: ["Dragón"],
      baseStats: { hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50 },
      moves: {
        1: "Enroscarse",
        1: "Golpe",
        5: "Rayo",
        11: "Agua Lodosa",
        15: "Golpe Cuerpo",
        21: "Rayo",
        25: "Golpe Cuerpo",
        31: "Cola Dragón",
        35: "Agilidad",
        41: "Safeguard",
        45: "Hiperrayo",
        51: "Dragoaliento",
        55: "Danza Dragón",
        61: "Golpe"
      },
      evolution: {
        method: "level",
        level: 30,
        to: 148,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 1, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 67,
      eggGroups: ["Water 1", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 10240,
      height: 1.8,
      weight: 3.3,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    148: {
      id: 148,
      name: "Dragonair",
      types: ["Dragón"],
      baseStats: { hp: 61, atk: 84, def: 65, spa: 70, spd: 70, spe: 70 },
      moves: {
        1: "Enroscarse",
        1: "Golpe",
        1: "Rayo",
        1: "Agua Lodosa",
        15: "Golpe Cuerpo",
        21: "Rayo",
        25: "Golpe Cuerpo",
        33: "Cola Dragón",
        39: "Agilidad",
        47: "Safeguard",
        53: "Hiperrayo",
        61: "Dragoaliento",
        67: "Danza Dragón",
        75: "Golpe"
      },
      evolution: {
        method: "level",
        level: 55,
        to: 149,
        item: null,
        conditions: { time: null, move: null, gender: null, happiness: null, location: null }
      },
      growthRate: "slow",
      effortValues: { hp: 0, atk: 2, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 144,
      eggGroups: ["Water 1", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 10240,
      height: 4.0,
      weight: 16.5,
      color: "blue",
      habitat: "waters-edge",
      generation: 1
    },

    149: {
      id: 149,
      name: "Dragonite",
      types: ["Dragón", "Volador"],
      baseStats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },
      moves: {
        1: "Enroscarse",
        1: "Golpe",
        1: "Rayo",
        1: "Agua Lodosa",
        15: "Golpe Cuerpo",
        21: "Rayo",
        25: "Golpe Cuerpo",
        33: "Cola Dragón",
        39: "Agilidad",
        47: "Safeguard",
        53: "Hiperrayo",
        55: "Alas de Plata",
        61: "Dragoaliento",
        67: "Danza Dragón",
        75: "Golpe",
        81: "Alas de Plata"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 3, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 270,
      eggGroups: ["Water 1", "Dragon"],
      genderRatio: 0.5,
      hatchSteps: 10240,
      height: 2.2,
      weight: 210.0,
      color: "brown",
      habitat: "waters-edge",
      generation: 1
    },

    150: {
      id: 150,
      name: "Mewtwo",
      types: ["Psíquico"],
      baseStats: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 },
      moves: {
        1: "Confusión",
        1: "Desarme",
        8: "Barrera",
        15: "Rayo Confuso",
        22: "Maldición",
        29: "Amnesia",
        36: "Psíquico",
        43: "Recuperación",
        50: "Guardaespalda",
        57: "Psicoonda",
        64: "Mímesis",
        71: "Psíquico",
        79: "Recuperación",
        86: "Futuro",
        93: "Psíquico",
        100: "Psicoonda"
      },
      evolution: null,
      growthRate: "slow",
      effortValues: { hp: 0, atk: 0, def: 0, spa: 3, spd: 0, spe: 0 },
      catchRate: 3,
      baseExp: 220,
      eggGroups: ["Undiscovered"],
      genderRatio: -1,
      hatchSteps: 30720,
      height: 2.0,
      weight: 122.0,
      color: "purple",
      habitat: "rare",
      generation: 1
    },

    151: {
      id: 151,
      name: "Mew",
      types: ["Psíquico"],
      baseStats: { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 },
      moves: {
        1: "Libra",
        10: "Transformación",
        20: "Megaagotar",
        30: "Metrónomo",
        40: "Psíquico",
        50: "Anulación"
      },
      evolution: null,
      growthRate: "medium_slow",
      effortValues: { hp: 3, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      catchRate: 45,
      baseExp: 64,
      eggGroups: ["Undiscovered"],
      genderRatio: -1,
      hatchSteps: 30720,
      height: 0.4,
      weight: 4.0,
      color: "pink",
      habitat: "rare",
      generation: 1
    }
  },

  // SISTEMA DE EXPERIENCIA
  experienceFormulas: {
    "fast": (level) => Math.floor((4 * Math.pow(level, 3)) / 5),
    "medium_fast": (level) => Math.pow(level, 3),
    "medium_slow": (level) => Math.floor((6 / 5) * Math.pow(level, 3) - 15 * Math.pow(level, 2) + 100 * level - 140),
    "slow": (level) => Math.floor((5 * Math.pow(level, 3)) / 4)
  },

  // SISTEMA DE EVOLUCIÓN POR OBJETOS
  evolutionItems: {
    "firestone": [37, 38, 58, 59, 133], // Vulpix, Ninetales, Growlithe, Arcanine, Eevee
    "waterstone": [61, 62, 86, 87, 90, 91, 116, 117, 118, 119, 120, 121, 133, 134],
    "thunderstone": [25, 26, 81, 82, 100, 101, 125, 133, 135],
    "leafstone": [43, 44, 45, 70, 71, 102, 103],
    "moonstone": [29, 30, 31, 32, 33, 34, 35, 36, 39, 40]
  },

  // FUNCIONES DE UTILIDAD
  utils: {
    calculateStats(baseStats, level, ivs = null, evs = null) {
      ivs = ivs || { hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 };
      evs = evs || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

      return {
        hp: Math.floor(((2 * baseStats.hp + ivs.hp + Math.floor(evs.hp / 4)) * level) / 100) + level + 10,
        atk: Math.floor(((2 * baseStats.atk + ivs.atk + Math.floor(evs.atk / 4)) * level) / 100) + 5,
        def: Math.floor(((2 * baseStats.def + ivs.def + Math.floor(evs.def / 4)) * level) / 100) + 5,
        spa: Math.floor(((2 * baseStats.spa + ivs.spa + Math.floor(evs.spa / 4)) * level) / 100) + 5,
        spd: Math.floor(((2 * baseStats.spd + ivs.spd + Math.floor(evs.spd / 4)) * level) / 100) + 5,
        spe: Math.floor(((2 * baseStats.spe + ivs.spe + Math.floor(evs.spe / 4)) * level) / 100) + 5
      };
    },

    calculateExperienceToNext(level, growthRate) {
      const formula = pokemonDB.experienceFormulas[growthRate];
      return formula ? formula(level + 1) - formula(level) : 100;
    },

    generateIVs() {
      return {
        hp: Math.floor(Math.random() * 32),
        atk: Math.floor(Math.random() * 32),
        def: Math.floor(Math.random() * 32),
        spa: Math.floor(Math.random() * 32),
        spd: Math.floor(Math.random() * 32),
        spe: Math.floor(Math.random() * 32)
      };
    },

    generateWildPokemon(speciesId, level, options = {}) {
      const species = pokemonDB.pokemons[speciesId];
      if (!species) return null;

      const ivs = options.ivs || this.generateIVs();
      const evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
      const stats = this.calculateStats(species.baseStats, level, ivs, evs);

      // Obtener movimientos para el nivel
      const moves = [];
      for (const [learnLevel, moveName] of Object.entries(species.moves)) {
        if (parseInt(learnLevel) <= level) {
          moves.push(moveName);
        }
      }

      // Tomar los últimos 4 movimientos
      const currentMoves = moves.slice(-4);

      return {
        id: `pokemon_${speciesId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        speciesId: speciesId,
        nickname: options.nickname || null,
        level: level,
        experience: 0,
        experienceToNext: this.calculateExperienceToNext(level, species.growthRate),
        baseStats: species.baseStats,
        ivs: ivs,
        evs: evs,
        currentStats: stats,
        maxHP: stats.hp,
        currentHP: options.currentHP || stats.hp,
        types: species.types,
        moves: currentMoves,
        ability: options.ability || this.getRandomAbility(speciesId),
        nature: options.nature || this.getRandomNature(),
        gender: options.gender || this.getRandomGender(species.genderRatio),
        isShiny: options.isShiny || (Math.random() < 0.001),
        happiness: 70,
        status: null,
        originalTrainer: options.originalTrainer || null,
        caughtDate: options.caughtDate || new Date().toISOString(),
        caughtLocation: options.caughtLocation || null,
        caughtLevel: level,
        caughtBall: options.ballUsed || 'pokeball',
        canEvolve: this.checkEvolution(speciesId, level, options)
      };
    },

    getRandomAbility(speciesId) {
      // Implementar lógica de habilidades
      return "Espesura"; // Placeholder
    },

    getRandomNature() {
      const natures = ["Activo", "Afable", "Agitado", "Alegre", "Amable", "Audaz", "Cauta", "Floja", "Fuerte", "Huraña"];
      return natures[Math.floor(Math.random() * natures.length)];
    },

    getRandomGender(genderRatio = 0.5) {
      if (genderRatio === -1) return "genderless";
      return Math.random() < genderRatio ? "male" : "female";
    },

    checkEvolution(speciesId, level, options = {}) {
      const species = pokemonDB.pokemons[speciesId];
      if (!species.evolution) return false;

      const evolution = species.evolution;

      switch (evolution.method) {
        case "level":
          return level >= evolution.level;
        case "stone":
          return options.item === evolution.item;
        case "friendship":
          return options.happiness >= 220;
        case "trade":
          return options.trading === true;
        default:
          return false;
      }
    },

    evolvePokemon(pokemon, newSpeciesId) {
      const newSpecies = pokemonDB.pokemons[newSpeciesId];

      return {
        ...pokemon,
        speciesId: newSpeciesId,
        name: newSpecies.name,
        types: newSpecies.types,
        baseStats: newSpecies.baseStats,
        // Recalcular stats con nuevos baseStats
        currentStats: this.calculateStats(
          newSpecies.baseStats,
          pokemon.level,
          pokemon.ivs,
          pokemon.evs
        ),
        maxHP: this.calculateStats(
          newSpecies.baseStats,
          pokemon.level,
          pokemon.ivs,
          pokemon.evs
        ).hp,
        // Mantener movimientos que puede aprender la nueva especie
        moves: this.getCompatibleMoves(pokemon.moves, newSpeciesId),
        evolution: newSpecies.evolution,
        canEvolve: this.checkEvolution(newSpeciesId, pokemon.level)
      };
    },

    getCompatibleMoves(oldMoves, newSpeciesId) {
      // Lógica para mantener movimientos compatibles
      return oldMoves; // Placeholder
    }
  },

  // TABLA DE TIPOS (GENERACIÓN 1)
  typeChart: {
    // ATAQUE -> DEFENSA: multiplicador de daño
    Normal: {
      Normal: 1, Fuego: 1, Agua: 1, Planta: 1, Eléctrico: 1, Hielo: 1, Lucha: 1,
      Veneno: 1, Tierra: 1, Volador: 1, Psíquico: 1, Bicho: 1, Roca: 0.5,
      Fantasma: 0, Dragón: 1
    },
    Fuego: {
      Normal: 1, Fuego: 0.5, Agua: 0.5, Planta: 2, Eléctrico: 1, Hielo: 2,
      Lucha: 1, Veneno: 1, Tierra: 1, Volador: 1, Psíquico: 1, Bicho: 2,
      Roca: 0.5, Fantasma: 1, Dragón: 0.5
    },
    Agua: {
      Normal: 1, Fuego: 2, Agua: 0.5, Planta: 0.5, Eléctrico: 1, Hielo: 1,
      Lucha: 1, Veneno: 1, Tierra: 2, Volador: 1, Psíquico: 1, Bicho: 1,
      Roca: 2, Fantasma: 1, Dragón: 0.5
    },
    Planta: {
      Normal: 1, Fuego: 0.5, Agua: 2, Planta: 0.5, Eléctrico: 1, Hielo: 1,
      Lucha: 1, Veneno: 0.5, Tierra: 2, Volador: 0.5, Psíquico: 1, Bicho: 0.5,
      Roca: 2, Fantasma: 1, Dragón: 0.5
    },
    Eléctrico: {
      Normal: 1, Fuego: 1, Agua: 2, Planta: 0.5, Eléctrico: 0.5, Hielo: 1,
      Lucha: 1, Veneno: 1, Tierra: 0, Volador: 2, Psíquico: 1, Bicho: 1,
      Roca: 1, Fantasma: 1, Dragón: 0.5
    },
    Hielo: {
      Normal: 1, Fuego: 0.5, Agua: 0.5, Planta: 2, Eléctrico: 1, Hielo: 0.5,
      Lucha: 1, Veneno: 1, Tierra: 2, Volador: 2, Psíquico: 1, Bicho: 1,
      Roca: 1, Fantasma: 1, Dragón: 2
    },
    Lucha: {
      Normal: 2, Fuego: 1, Agua: 1, Planta: 1, Eléctrico: 1, Hielo: 2,
      Lucha: 1, Veneno: 0.5, Tierra: 1, Volador: 0.5, Psíquico: 0.5,
      Bicho: 0.5, Roca: 2, Fantasma: 0, Dragón: 1
    },
    Veneno: {
      Normal: 1, Fuego: 1, Agua: 1, Planta: 2, Eléctrico: 1, Hielo: 1,
      Lucha: 1, Veneno: 0.5, Tierra: 0.5, Volador: 1, Psíquico: 1,
      Bicho: 1, Roca: 0.5, Fantasma: 0.5, Dragón: 1
    },
    Tierra: {
      Normal: 1, Fuego: 2, Agua: 1, Planta: 0.5, Eléctrico: 2, Hielo: 1,
      Lucha: 1, Veneno: 2, Tierra: 1, Volador: 0, Psíquico: 1, Bicho: 0.5,
      Roca: 2, Fantasma: 1, Dragón: 1
    },
    Volador: {
      Normal: 1, Fuego: 1, Agua: 1, Planta: 2, Eléctrico: 0.5, Hielo: 1,
      Lucha: 2, Veneno: 1, Tierra: 1, Volador: 1, Psíquico: 1, Bicho: 2,
      Roca: 0.5, Fantasma: 1, Dragón: 1
    },
    Psíquico: {
      Normal: 1, Fuego: 1, Agua: 1, Planta: 1, Eléctrico: 1, Hielo: 1,
      Lucha: 2, Veneno: 2, Tierra: 1, Volador: 1, Psíquico: 0.5,
      Bicho: 1, Roca: 1, Fantasma: 1, Dragón: 1
    },
    Bicho: {
      Normal: 1, Fuego: 0.5, Agua: 1, Planta: 2, Eléctrico: 1, Hielo: 1,
      Lucha: 0.5, Veneno: 0.5, Tierra: 1, Volador: 0.5, Psíquico: 2,
      Bicho: 1, Roca: 1, Fantasma: 0.5, Dragón: 1
    },
    Roca: {
      Normal: 1, Fuego: 2, Agua: 1, Planta: 1, Eléctrico: 1, Hielo: 2,
      Lucha: 0.5, Veneno: 1, Tierra: 0.5, Volador: 2, Psíquico: 1,
      Bicho: 2, Roca: 1, Fantasma: 1, Dragón: 1
    },
    Fantasma: {
      Normal: 0, Fuego: 1, Agua: 1, Planta: 1, Eléctrico: 1, Hielo: 1,
      Lucha: 1, Veneno: 1, Tierra: 1, Volador: 1, Psíquico: 2, Bicho: 1,
      Roca: 1, Fantasma: 2, Dragón: 1
    },
    Dragón: {
      Normal: 1, Fuego: 1, Agua: 1, Planta: 1, Eléctrico: 1, Hielo: 1,
      Lucha: 1, Veneno: 1, Tierra: 1, Volador: 1, Psíquico: 1, Bicho: 1,
      Roca: 1, Fantasma: 1, Dragón: 2
    }
  },

  // BASE DE DATOS DE MOVIMIENTOS
  moves: {
    // MOVIMIENTOS NORMALES
    "Placaje": {
      id: 1,
      name: "Placaje",
      type: "Normal",
      category: "physical",
      power: 40,
      accuracy: 100,
      pp: 35,
      priority: 0,
      description: "Un ataque físico básico."
    },
    "Arañazo": {
      id: 2,
      name: "Arañazo",
      type: "Normal",
      category: "physical",
      power: 40,
      accuracy: 100,
      pp: 35,
      priority: 0,
      description: "Araña al oponente con garras afiladas."
    },
    "Látigo Cepa": {
      id: 3,
      name: "Látigo Cepa",
      type: "Planta",
      category: "physical",
      power: 45,
      accuracy: 100,
      pp: 25,
      priority: 0,
      description: "Golpea con un látigo hecho de plantas."
    },
    "Mordisco": {
      id: 4,
      name: "Mordisco",
      type: "Siniestro",
      category: "physical",
      power: 60,
      accuracy: 100,
      pp: 25,
      priority: 0,
      description: "Muerde al oponente con fuerza."
    },
    "Gruñido": {
      id: 5,
      name: "Gruñido",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 40,
      priority: 0,
      description: "Reduce el ataque del oponente.",
      effect: { stat: "atk", change: -1, target: "opponent" }
    },
    "Rugido": {
      id: 6,
      name: "Rugido",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 20,
      priority: -6,
      description: "Asusta al oponente para que se retire.",
      effect: { forceSwitch: true }
    },

    // MOVIMIENTOS DE FUEGO
    "Ascuas": {
      id: 7,
      name: "Ascuas",
      type: "Fuego",
      category: "special",
      power: 40,
      accuracy: 100,
      pp: 25,
      priority: 0,
      description: "Ataca con pequeñas llamas.",
      effect: { chance: 10, status: "burn" }
    },
    "Lanzallamas": {
      id: 8,
      name: "Lanzallamas",
      type: "Fuego",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Lanza una intensa ráfaga de fuego.",
      effect: { chance: 10, status: "burn" }
    },
    "Infierno": {
      id: 9,
      name: "Infierno",
      type: "Fuego",
      category: "special",
      power: 100,
      accuracy: 50,
      pp: 5,
      priority: 0,
      description: "Envuelve al objetivo en un incendio.",
      effect: { chance: 100, status: "burn" }
    },
    "Giro Fuego": {
      id: 10,
      name: "Giro Fuego",
      type: "Fuego",
      category: "physical",
      power: 35,
      accuracy: 85,
      pp: 15,
      priority: 0,
      description: "Ataca envolviéndose en llamas.",
      effect: { chance: 10, status: "burn" }
    },

    // MOVIMIENTOS DE AGUA
    "Burbuja": {
      id: 11,
      name: "Burbuja",
      type: "Agua",
      category: "special",
      power: 40,
      accuracy: 100,
      pp: 30,
      priority: 0,
      description: "Ataca con una ráfaga de burbujas.",
      effect: { chance: 10, stat: "spe", change: -1, target: "opponent" }
    },
    "Hidrobomba": {
      id: 12,
      name: "Hidrobomba",
      type: "Agua",
      category: "special",
      power: 110,
      accuracy: 80,
      pp: 5,
      priority: 0,
      description: "Un potente chorro de agua."
    },
    "Surf": {
      id: 13,
      name: "Surf",
      type: "Agua",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Una ola gigante cubre al oponente."
    },
    "Rayo Burbuja": {
      id: 14,
      name: "Rayo Burbuja",
      type: "Agua",
      category: "special",
      power: 65,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Un rayo de burbujas que puede reducir velocidad.",
      effect: { chance: 10, stat: "spe", change: -1, target: "opponent" }
    },

    // MOVIMIENTOS PLANTA
    "Drenadoras": {
      id: 15,
      name: "Drenadoras",
      type: "Planta",
      category: "special",
      power: 20,
      accuracy: 100,
      pp: 25,
      priority: 0,
      description: "Absorbe PS del oponente.",
      drain: 0.5
    },
    "Rayo Solar": {
      id: 16,
      name: "Rayo Solar",
      type: "Planta",
      category: "special",
      power: 120,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Descarga energía solar en el segundo turno."
    },
    "Hoja Afilada": {
      id: 17,
      name: "Hoja Afilada",
      type: "Planta",
      category: "physical",
      power: 55,
      accuracy: 95,
      pp: 25,
      priority: 0,
      description: "Corta con hojas afiladas."
    },
    "Somnífero": {
      id: 18,
      name: "Somnífero",
      type: "Planta",
      category: "status",
      power: null,
      accuracy: 75,
      pp: 15,
      priority: 0,
      description: "Duerme al oponente.",
      effect: { status: "sleep" }
    },

    // MOVIMIENTOS ELÉCTRICO
    "Impactrueno": {
      id: 19,
      name: "Impactrueno",
      type: "Eléctrico",
      category: "special",
      power: 40,
      accuracy: 100,
      pp: 30,
      priority: 0,
      description: "Un ataque eléctrico que puede paralizar.",
      effect: { chance: 10, status: "paralysis" }
    },
    "Rayo": {
      id: 20,
      name: "Rayo",
      type: "Eléctrico",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Un poderoso rayo eléctrico.",
      effect: { chance: 10, status: "paralysis" }
    },
    "Trueno": {
      id: 21,
      name: "Trueno",
      type: "Eléctrico",
      category: "special",
      power: 110,
      accuracy: 70,
      pp: 10,
      priority: 0,
      description: "Un devastador rayo que puede paralizar.",
      effect: { chance: 30, status: "paralysis" }
    },
    "Onda Trueno": {
      id: 22,
      name: "Onda Trueno",
      type: "Eléctrico",
      category: "status",
      power: null,
      accuracy: 90,
      pp: 20,
      priority: 0,
      description: "Paraliza al oponente.",
      effect: { status: "paralysis" }
    },

    // MOVIMIENTOS HIELO
    "Rayo de Hielo": {
      id: 23,
      name: "Rayo de Hielo",
      type: "Hielo",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Un rayo de hielo que puede congelar.",
      effect: { chance: 10, status: "freeze" }
    },
    "Ventisca": {
      id: 24,
      name: "Ventisca",
      type: "Hielo",
      category: "special",
      power: 110,
      accuracy: 70,
      pp: 5,
      priority: 0,
      description: "Una tormenta de hielo que puede congelar.",
      effect: { chance: 10, status: "freeze" }
    },
    "Rayo Aurora": {
      id: 25,
      name: "Rayo Aurora",
      type: "Hielo",
      category: "special",
      power: 65,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Un rayo de luz multicolor.",
      effect: { chance: 10, stat: "atk", change: -1, target: "opponent" }
    },

    // MOVIMIENTOS LUCHA
    "Puño Fuego": {
      id: 26,
      name: "Puño Fuego",
      type: "Fuego",
      category: "physical",
      power: 75,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Un puño ardiente que puede quemar.",
      effect: { chance: 10, status: "burn" }
    },
    "Puño Trueno": {
      id: 27,
      name: "Puño Trueno",
      type: "Eléctrico",
      category: "physical",
      power: 75,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Un puño eléctrico que puede paralizar.",
      effect: { chance: 10, status: "paralysis" }
    },
    "Puño Hielo": {
      id: 28,
      name: "Puño Hielo",
      type: "Hielo",
      category: "physical",
      power: 75,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Un puño helado que puede congelar.",
      effect: { chance: 10, status: "freeze" }
    },
    "Patada Baja": {
      id: 29,
      name: "Patada Baja",
      type: "Lucha",
      category: "physical",
      power: null, // Daño variable
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Una patada baja que hace más daño a objetivos pesados."
    },

    // MOVIMIENTOS VENENO
    "Ácido": {
      id: 30,
      name: "Ácido",
      type: "Veneno",
      category: "special",
      power: 40,
      accuracy: 100,
      pp: 30,
      priority: 0,
      description: "Rocía ácido que puede reducir defensa.",
      effect: { chance: 10, stat: "def", change: -1, target: "opponent" }
    },
    "Polvo Veneno": {
      id: 31,
      name: "Polvo Veneno",
      type: "Veneno",
      category: "status",
      power: null,
      accuracy: 75,
      pp: 35,
      priority: 0,
      description: "Envenena al oponente.",
      effect: { status: "poison" }
    },
    "Tóxico": {
      id: 32,
      name: "Tóxico",
      type: "Veneno",
      category: "status",
      power: null,
      accuracy: 90,
      pp: 10,
      priority: 0,
      description: "Envenena gravemente al oponente.",
      effect: { status: "bad_poison" }
    },
    "Bomba Lodo": {
      id: 33,
      name: "Bomba Lodo",
      type: "Veneno",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Lanza lodo tóxico.",
      effect: { chance: 30, status: "poison" }
    },

    // MOVIMIENTOS TIERRA
    "Terremoto": {
      id: 34,
      name: "Terremoto",
      type: "Tierra",
      category: "physical",
      power: 100,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Un potente temblor que afecta a todos."
    },
    "Fisura": {
      id: 35,
      name: "Fisura",
      type: "Tierra",
      category: "physical",
      power: null, // OHKO
      accuracy: 30,
      pp: 5,
      priority: 0,
      description: "Crea una fisura que derrota al oponente de un golpe."
    },
    "Excavar": {
      id: 36,
      name: "Excavar",
      type: "Tierra",
      category: "physical",
      power: 80,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Ataca desde bajo tierra en el segundo turno."
    },

    // MOVIMIENTOS VOLADOR
    "Ataque Ala": {
      id: 37,
      name: "Ataque Ala",
      type: "Volador",
      category: "physical",
      power: 60,
      accuracy: 100,
      pp: 35,
      priority: 0,
      description: "Golpea con las alas."
    },
    "Picotazo": {
      id: 38,
      name: "Picotazo",
      type: "Volador",
      category: "physical",
      power: 35,
      accuracy: 100,
      pp: 35,
      priority: 0,
      description: "Picotea al oponente."
    },
    "Tornado": {
      id: 39,
      name: "Tornado",
      type: "Volador",
      category: "special",
      power: 40,
      accuracy: 100,
      pp: 35,
      priority: 0,
      description: "Crea un tornado para atacar."
    },
    "Vuelo": {
      id: 40,
      name: "Vuelo",
      type: "Volador",
      category: "physical",
      power: 90,
      accuracy: 95,
      pp: 15,
      priority: 0,
      description: "Vuela y ataca en el segundo turno."
    },

    // MOVIMIENTOS PSÍQUICO
    "Confusión": {
      id: 41,
      name: "Confusión",
      type: "Psíquico",
      category: "special",
      power: 50,
      accuracy: 100,
      pp: 25,
      priority: 0,
      description: "Un débil ataque psíquico que puede confundir.",
      effect: { chance: 10, status: "confusion" }
    },
    "Psíquico": {
      id: 42,
      name: "Psíquico",
      type: "Psíquico",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Un poderoso ataque psíquico que puede reducir defensa especial.",
      effect: { chance: 10, stat: "spd", change: -1, target: "opponent" }
    },
    "Psicorrayo": {
      id: 43,
      name: "Psicorrayo",
      type: "Psíquico",
      category: "special",
      power: 65,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Un extraño rayo que puede confundir.",
      effect: { chance: 10, status: "confusion" }
    },
    "Hipnosis": {
      id: 44,
      name: "Hipnosis",
      type: "Psíquico",
      category: "status",
      power: null,
      accuracy: 60,
      pp: 20,
      priority: 0,
      description: "Duerme al oponente.",
      effect: { status: "sleep" }
    },

    // MOVIMIENTOS BICHO
    "Picotazo Venenoso": {
      id: 45,
      name: "Picotazo Venenoso",
      type: "Bicho",
      category: "physical",
      power: 60,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Un picotazo venenoso que puede envenenar.",
      effect: { chance: 30, status: "poison" }
    },
    "Zumbido": {
      id: 46,
      name: "Zumbido",
      type: "Bicho",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Vibra a gran velocidad para atacar."
    },
    "Pin Misil": {
      id: 47,
      name: "Pin Misil",
      type: "Bicho",
      category: "physical",
      power: 25, // Golpea 2-5 veces
      accuracy: 95,
      pp: 20,
      priority: 0,
      description: "Dispara púas que golpean múltiples veces.",
      multiHit: [2, 5]
    },
    "Tijera X": {
      id: 48,
      name: "Tijera X",
      type: "Bicho",
      category: "physical",
      power: 80,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Corta al oponente con tijeras."
    },

    // MOVIMIENTOS ROCA
    "Lanzarrocas": {
      id: 49,
      name: "Lanzarrocas",
      type: "Roca",
      category: "physical",
      power: 50,
      accuracy: 90,
      pp: 15,
      priority: 0,
      description: "Lanza rocas al oponente."
    },
    "Roca Afilada": {
      id: 50,
      name: "Roca Afilada",
      type: "Roca",
      category: "physical",
      power: 100,
      accuracy: 80,
      pp: 5,
      priority: 0,
      description: "Lanza rocas afiladas con gran fuerza."
    },
    "Terratemblor": {
      id: 51,
      name: "Terratemblor",
      type: "Tierra",
      category: "physical",
      power: 60,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Crea un temblor que daña al oponente."
    },

    // MOVIMIENTOS FANTASMA
    "Lengüetazo": {
      id: 52,
      name: "Lengüetazo",
      type: "Fantasma",
      category: "physical",
      power: 30,
      accuracy: 100,
      pp: 30,
      priority: 0,
      description: "Un lametazo que puede paralizar.",
      effect: { chance: 30, status: "paralysis" }
    },
    "Bola Sombra": {
      id: 53,
      name: "Bola Sombra",
      type: "Fantasma",
      category: "special",
      power: 80,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Lanza una bola de sombra que puede reducir defensa especial.",
      effect: { chance: 20, stat: "spd", change: -1, target: "opponent" }
    },
    "Rayo Nocturno": {
      id: 54,
      name: "Rayo Nocturno",
      type: "Fantasma",
      category: "special",
      power: 100,
      accuracy: 100,
      pp: 5,
      priority: 0,
      description: "Un rayo oscuro que siempre hace daño."
    },

    // MOVIMIENTOS DRAGÓN
    "Dragoaliento": {
      id: 55,
      name: "Dragoaliento",
      type: "Dragón",
      category: "special",
      power: 60,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Lanza un aliento de dragón."
    },
    "Garra Dragón": {
      id: 56,
      name: "Garra Dragón",
      type: "Dragón",
      category: "physical",
      power: 80,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Ataca con garras de dragón."
    },

    // MOVIMIENTOS ESTADO
    "Doble Equipo": {
      id: 57,
      name: "Doble Equipo",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Crea copias para evadir ataques.",
      effect: { stat: "eva", change: 1, target: "self" }
    },
    "Refugio": {
      id: 58,
      name: "Refugio",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 40,
      priority: 0,
      description: "Aumenta la defensa.",
      effect: { stat: "def", change: 1, target: "self" }
    },
    "Crecimiento": {
      id: 59,
      name: "Crecimiento",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 20,
      priority: 0,
      description: "Aumenta el ataque especial.",
      effect: { stat: "spa", change: 1, target: "self" }
    },
    "Agilidad": {
      id: 60,
      name: "Agilidad",
      type: "Psíquico",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 30,
      priority: 0,
      description: "Aumenta mucho la velocidad.",
      effect: { stat: "spe", change: 2, target: "self" }
    },

    // MOVIMIENTOS DE HABILIDAD ESPECIAL
    "Metrónomo": {
      id: 61,
      name: "Metrónomo",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Usa un movimiento al azar."
    },
    "Mimético": {
      id: 62,
      name: "Mimético",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Copia el último movimiento usado por el oponente."
    },
    "Sustituto": {
      id: 63,
      name: "Sustituto",
      type: "Normal",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 10,
      priority: 0,
      description: "Crea un sustituto con 1/4 de los PS."
    },

    // MOVIMIENTOS DE CAMPO
    "Teleport": {
      id: 64,
      name: "Teleport",
      type: "Psíquico",
      category: "status",
      power: null,
      accuracy: 100,
      pp: 20,
      priority: -6,
      description: "Huye de la batalla salvaje."
    },
    "Vuelo": {
      id: 65,
      name: "Vuelo",
      type: "Volador",
      category: "physical",
      power: 90,
      accuracy: 95,
      pp: 15,
      priority: 0,
      description: "Vuela en el primer turno y ataca en el segundo."
    },
    "Surf": {
      id: 66,
      name: "Surf",
      type: "Agua",
      category: "special",
      power: 90,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Una ola gigante cubre al oponente."
    },
    "Fuerza": {
      id: 67,
      name: "Fuerza",
      type: "Normal",
      category: "physical",
      power: 80,
      accuracy: 100,
      pp: 15,
      priority: 0,
      description: "Un ataque poderoso que puede bajar defensa."
    },

    // MOVIMIENTOS ÚNICOS
    "Hiperrayo": {
      id: 68,
      name: "Hiperrayo",
      type: "Normal",
      category: "special",
      power: 150,
      accuracy: 90,
      pp: 5,
      priority: 0,
      description: "Un potente rayo que requiere descanso después."
    },
    "Ataque Furia": {
      id: 69,
      name: "Ataque Furia",
      type: "Normal",
      category: "physical",
      power: 15,
      accuracy: 85,
      pp: 20,
      priority: 0,
      description: "Golpea rápidamente 2-5 veces.",
      multiHit: [2, 5]
    },
    "Comet Punch": {
      id: 70,
      name: "Comet Punch",
      type: "Normal",
      category: "physical",
      power: 18,
      accuracy: 85,
      pp: 15,
      priority: 0,
      description: "Golpea rápidamente 2-5 veces.",
      multiHit: [2, 5]
    }
  },

  // FUNCIONES DE BATALLA
  battleUtils: {
    calculateDamage(attacker, defender, move, critical = false) {
      const moveData = pokemonDB.moves[move];
      if (!moveData || moveData.category === "status") return 0;

      // Obtener stats relevantes
      const attackStat = moveData.category === "physical" ? attacker.currentStats.atk : attacker.currentStats.spa;
      const defenseStat = moveData.category === "physical" ? defender.currentStats.def : defender.currentStats.spd;

      // Nivel del atacante
      const level = attacker.level;

      // Poder base del movimiento
      const power = moveData.power || 0;

      // STAB (Same Type Attack Bonus)
      const stab = attacker.types.includes(moveData.type) ? 1.5 : 1;

      // Efectividad de tipo
      let typeEffectiveness = 1;
      defender.types.forEach(defType => {
        if (pokemonDB.typeChart[moveData.type] && pokemonDB.typeChart[moveData.type][defType]) {
          typeEffectiveness *= pokemonDB.typeChart[moveData.type][defType];
        }
      });

      // Crítico
      const criticalMultiplier = critical ? 1.5 : 1;

      // Random factor (0.85 - 1.00)
      const randomFactor = 0.85 + (Math.random() * 0.15);

      // Fórmula de daño
      const damage = Math.floor(
        ((((2 * level) / 5 + 2) * power * attackStat / defenseStat) / 50 + 2) *
        criticalMultiplier *
        randomFactor *
        stab *
        typeEffectiveness
      );

      return Math.max(1, damage);
    },

    calculateAccuracy(move, accuracyModifiers = 0) {
      const moveData = pokemonDB.moves[move];
      if (!moveData) return 0;

      // Precisión base del movimiento
      let accuracy = moveData.accuracy || 100;

      // Modificadores de precisión (por ejemplo, de Double Team)
      accuracy *= Math.pow(3 / 3, accuracyModifiers);

      return Math.min(100, Math.max(0, accuracy));
    },

    getTypeEffectiveness(attackType, defenseTypes) {
      let effectiveness = 1;
      defenseTypes.forEach(defType => {
        if (pokemonDB.typeChart[attackType] && pokemonDB.typeChart[attackType][defType]) {
          effectiveness *= pokemonDB.typeChart[attackType][defType];
        }
      });

      return effectiveness;
    },

    getEffectivenessText(effectiveness) {
      if (effectiveness === 0) return "No tuvo efecto";
      if (effectiveness < 1) return "No es muy efectivo";
      if (effectiveness > 1) return "¡Es super efectivo!";
      return "";
    },

    canLearnMove(pokemonSpeciesId, moveName) {
      const species = pokemonDB.pokemons[pokemonSpeciesId];
      if (!species) return false;

      // Verificar movimientos por nivel
      const movesByLevel = Object.values(species.moves || {});
      if (movesByLevel.includes(moveName)) return true;

      // Aquí se podría agregar lógica para MTs, MOs, etc.
      return false;
    },

    applyStatusEffect(pokemon, status) {
      const effects = {
        "burn": {
          apply: (p) => ({ ...p, status: "burn" }),
          turnEffect: (p) => Math.floor(p.currentStats.hp / 16)
        },
        "poison": {
          apply: (p) => ({ ...p, status: "poison" }),
          turnEffect: (p) => Math.floor(p.currentStats.hp / 8)
        },
        "bad_poison": {
          apply: (p) => ({ ...p, status: "bad_poison", poisonCounter: 1 }),
          turnEffect: (p) => {
            const damage = Math.floor(p.currentStats.hp * (p.poisonCounter || 1) / 16);
            return { updatedPokemon: { ...p, poisonCounter: (p.poisonCounter || 1) + 1 }, damage };
          }
        },
        "paralysis": {
          apply: (p) => ({
            ...p,
            status: "paralysis",
            currentStats: { ...p.currentStats, spe: Math.floor(p.currentStats.spe / 4) }
          })
        },
        "sleep": {
          apply: (p) => ({
            ...p,
            status: "sleep",
            sleepTurns: Math.floor(Math.random() * 3) + 2
          })
        },
        "freeze": {
          apply: (p) => ({ ...p, status: "freeze" })
        },
        "confusion": {
          apply: (p) => ({
            ...p,
            confusion: true,
            confusionTurns: Math.floor(Math.random() * 4) + 2
          }),
          turnEffect: (p) => {
            if (p.confusion && p.confusionTurns > 0) {
              return Math.floor(Math.random() * 40) + 20;
            }
            return 0;
          }
        }
      };

      if (effects[status]) {
        return effects[status].apply(pokemon);
      }
      return pokemon;
    },

    checkEvolutionConditions(pokemon, options = {}) {
      const species = pokemonDB.pokemons[pokemon.speciesId];
      if (!species.evolution) return null;

      const evolution = species.evolution;

      switch (evolution.method) {
        case "level":
          if (pokemon.level >= evolution.level) {
            return evolution.to;
          }
          break;
        case "stone":
          if (options.item === evolution.item) {
            return evolution.to;
          }
          break;
        case "friendship":
          if (pokemon.happiness >= 220) {
            return evolution.to;
          }
          break;
        case "trade":
          if (options.trading === true) {
            return evolution.to;
          }
          break;
      }

      return null;
    },

    // SISTEMA DE EXPERIENCIA MEJORADO
    gainExperience(pokemon, defeatedPokemon) {
      const species = pokemonDB.pokemons[pokemon.speciesId];
      if (!species) return pokemon;

      // Calcular experiencia ganada
      const expGained = Math.floor((defeatedPokemon.baseExp * defeatedPokemon.level) / 7);

      let newExperience = pokemon.experience + expGained;
      let newLevel = pokemon.level;
      let leveledUp = false;

      // Comprobar subidas de nivel
      while (newExperience >= pokemon.experienceToNext && newLevel < 100) {
        newExperience -= pokemon.experienceToNext;
        newLevel++;
        leveledUp = true;

        // Recalcular experiencia para siguiente nivel
        const nextExp = pokemonDB.utils.calculateExperienceToNext(newLevel, species.growthRate);
        pokemon.experienceToNext = nextExp;
      }

      const updatedPokemon = {
        ...pokemon,
        experience: newExperience,
        level: newLevel,
        experienceToNext: pokemonDB.utils.calculateExperienceToNext(newLevel, species.growthRate)
      };

      // Recalcular stats si subió de nivel
      if (leveledUp) {
        updatedPokemon.currentStats = pokemonDB.utils.calculateStats(
          species.baseStats,
          newLevel,
          pokemon.ivs,
          pokemon.evs
        );
        updatedPokemon.maxHP = updatedPokemon.currentStats.hp;
        updatedPokemon.currentHP = Math.min(
          updatedPokemon.currentHP + updatedPokemon.currentStats.hp - pokemon.currentStats.hp,
          updatedPokemon.maxHP
        );

        // Verificar si puede evolucionar
        updatedPokemon.canEvolve = pokemonDB.utils.checkEvolution(pokemon.speciesId, newLevel);
      }

      return updatedPokemon;
    },

    // SISTEMA DE CAPTURA
    calculateCaptureRate(pokemon, ballType = "pokeball", status = null) {
      const species = pokemonDB.pokemons[pokemon.speciesId];
      if (!species) return 0;

      let captureRate = species.catchRate;

      // Modificador por tipo de pokéball
      const ballModifiers = {
        "pokeball": 1.0,
        "greatball": 1.5,
        "ultraball": 2.0,
        "masterball": 255,
        "safariball": 1.5
      };

      captureRate *= ballModifiers[ballType] || 1.0;

      // Modificador por estado
      const statusModifiers = {
        "sleep": 2.5,
        "freeze": 2.5,
        "paralysis": 1.5,
        "poison": 1.5,
        "burn": 1.5
      };

      captureRate *= statusModifiers[status] || 1.0;

      // Modificador por PS actuales
      const hpPercentage = pokemon.currentHP / pokemon.maxHP;
      captureRate *= (1 - hpPercentage * 0.5);

      return Math.min(255, Math.max(0, Math.floor(captureRate)));
    },

    attemptCapture(pokemon, ballType = "pokeball", status = null) {
      if (ballType === "masterball") return true;

      const captureRate = this.calculateCaptureRate(pokemon, ballType, status);

      // Fórmula de captura simplificada
      const shakeProbability = Math.floor(65536 / Math.pow(255 / captureRate, 0.1875));

      // Realizar 4 "shake checks"
      for (let i = 0; i < 4; i++) {
        const randomValue = Math.floor(Math.random() * 65536);
        if (randomValue >= shakeProbability) {
          return false; // Se escapó en este shake
        }
      }

      return true; // Capturado
    }
  },

    // GENERACIÓN DE ENCUENTROS SALVAJES POR ZONA
  wildEncounters: {
    "route_1": {
      name: "Ruta 1",
      pokemon: [
        { id: 16, level: [2, 5], rate: 50 }, // Pidgey
        { id: 19, level: [2, 4], rate: 40 }, // Rattata
        { id: 10, level: [2, 3], rate: 5 },  // Caterpie
        { id: 13, level: [2, 3], rate: 5 }   // Weedle
      ]
    },
    "route_2": {
      name: "Ruta 2",
      pokemon: [
        { id: 10, level: [3, 5], rate: 25 }, // Caterpie
        { id: 13, level: [3, 5], rate: 25 }, // Weedle
        { id: 16, level: [4, 6], rate: 25 }, // Pidgey
        { id: 19, level: [4, 6], rate: 20 }, // Rattata
        { id: 25, level: [5, 7], rate: 5 }   // Pikachu
      ]
    },
    "route_3": {
      name: "Ruta 3",
      pokemon: [
        { id: 16, level: [6, 8], rate: 25 },  // Pidgey
        { id: 19, level: [6, 8], rate: 25 },  // Rattata
        { id: 21, level: [7, 9], rate: 25 },  // Spearow
        { id: 56, level: [7, 9], rate: 20 },  // Mankey
        { id: 39, level: [8, 10], rate: 5 }   // Jigglypuff
      ]
    },
    "route_4": {
      name: "Ruta 4",
      pokemon: [
        { id: 21, level: [10, 12], rate: 30 }, // Spearow
        { id: 27, level: [10, 12], rate: 30 }, // Sandshrew
        { id: 23, level: [11, 13], rate: 30 }, // Ekans
        { id: 56, level: [11, 13], rate: 10 }  // Mankey
      ]
    },
    "route_5": {
      name: "Ruta 5",
      pokemon: [
        { id: 16, level: [13, 16], rate: 30 }, // Pidgey
        { id: 43, level: [13, 16], rate: 30 }, // Oddish
        { id: 69, level: [14, 17], rate: 30 }, // Bellsprout
        { id: 96, level: [15, 18], rate: 10 }  // Drowzee
      ]
    },
    "route_6": {
      name: "Ruta 6",
      pokemon: [
        { id: 16, level: [13, 16], rate: 25 },  // Pidgey
        { id: 17, level: [15, 18], rate: 10 },  // Pidgeotto
        { id: 43, level: [13, 16], rate: 25 },  // Oddish
        { id: 69, level: [14, 17], rate: 25 },  // Bellsprout
        { id: 118, level: [15, 18], rate: 15 }  // Goldeen
      ]
    },
    "route_7": {
      name: "Ruta 7",
      pokemon: [
        { id: 19, level: [16, 19], rate: 30 }, // Rattata
        { id: 20, level: [18, 21], rate: 10 }, // Raticate
        { id: 52, level: [16, 19], rate: 30 }, // Meowth
        { id: 53, level: [18, 21], rate: 10 }, // Persian
        { id: 39, level: [17, 20], rate: 20 }  // Jigglypuff
      ]
    },
    "route_8": {
      name: "Ruta 8",
      pokemon: [
        { id: 21, level: [18, 21], rate: 30 }, // Spearow
        { id: 22, level: [20, 23], rate: 5 },  // Fearow
        { id: 23, level: [18, 21], rate: 30 }, // Ekans
        { id: 27, level: [18, 21], rate: 30 }, // Sandshrew
        { id: 96, level: [19, 22], rate: 5 }   // Drowzee
      ]
    },
    "route_10": {
      name: "Ruta 10",
      pokemon: [
        { id: 21, level: [16, 19], rate: 30 },  // Spearow
        { id: 22, level: [18, 21], rate: 5 },   // Fearow
        { id: 100, level: [17, 20], rate: 30 }, // Voltorb
        { id: 81, level: [17, 20], rate: 30 },  // Magnemite
        { id: 125, level: [20, 23], rate: 5 }   // Electabuzz
      ]
    },
    "route_11": {
      name: "Ruta 11",
      pokemon: [
        { id: 19, level: [17, 20], rate: 30 }, // Rattata
        { id: 20, level: [19, 22], rate: 10 }, // Raticate
        { id: 21, level: [17, 20], rate: 30 }, // Spearow
        { id: 22, level: [19, 22], rate: 5 },  // Fearow
        { id: 96, level: [18, 21], rate: 20 }, // Drowzee
        { id: 97, level: [20, 23], rate: 5 }   // Hypno
      ]
    },
    "route_12": {
      name: "Ruta 12",
      pokemon: [
        { id: 43, level: [22, 25], rate: 25 }, // Oddish
        { id: 69, level: [22, 25], rate: 25 }, // Bellsprout
        { id: 16, level: [23, 26], rate: 15 }, // Pidgey
        { id: 17, level: [25, 28], rate: 10 }, // Pidgeotto
        { id: 60, level: [22, 25], rate: 15 }, // Poliwag
        { id: 118, level: [22, 25], rate: 10 } // Goldeen
      ]
    },
    "route_13": {
      name: "Ruta 13",
      pokemon: [
        { id: 43, level: [24, 27], rate: 20 }, // Oddish
        { id: 69, level: [24, 27], rate: 20 }, // Bellsprout
        { id: 16, level: [25, 28], rate: 15 }, // Pidgey
        { id: 17, level: [27, 30], rate: 10 }, // Pidgeotto
        { id: 48, level: [24, 27], rate: 20 }, // Venonat
        { id: 49, level: [26, 29], rate: 5 },  // Venomoth
        { id: 132, level: [25, 28], rate: 10 } // Ditto
      ]
    },
    "route_14": {
      name: "Ruta 14",
      pokemon: [
        { id: 43, level: [26, 29], rate: 20 }, // Oddish
        { id: 44, level: [28, 31], rate: 10 }, // Gloom
        { id: 69, level: [26, 29], rate: 20 }, // Bellsprout
        { id: 70, level: [28, 31], rate: 10 }, // Weepinbell
        { id: 48, level: [26, 29], rate: 20 }, // Venonat
        { id: 49, level: [28, 31], rate: 5 },  // Venomoth
        { id: 132, level: [27, 30], rate: 15 } // Ditto
      ]
    },
    "route_15": {
      name: "Ruta 15",
      pokemon: [
        { id: 43, level: [28, 31], rate: 20 }, // Oddish
        { id: 44, level: [30, 33], rate: 10 }, // Gloom
        { id: 69, level: [28, 31], rate: 20 }, // Bellsprout
        { id: 70, level: [30, 33], rate: 10 }, // Weepinbell
        { id: 113, level: [29, 32], rate: 5 }, // Chansey
        { id: 132, level: [29, 32], rate: 15 } // Ditto
      ]
    },
    "route_16": {
      name: "Ruta 16",
      pokemon: [
        { id: 19, level: [20, 23], rate: 30 }, // Rattata
        { id: 20, level: [22, 25], rate: 10 }, // Raticate
        { id: 21, level: [20, 23], rate: 30 }, // Spearow
        { id: 22, level: [22, 25], rate: 5 }   // Fearow
      ]
    },
    "route_17": {
      name: "Ruta 17",
      pokemon: [
        { id: 19, level: [22, 25], rate: 30 }, // Rattata
        { id: 20, level: [24, 27], rate: 10 }, // Raticate
        { id: 21, level: [22, 25], rate: 30 }, // Spearow
        { id: 22, level: [24, 27], rate: 5 },  // Fearow
        { id: 84, level: [23, 26], rate: 20 }, // Doduo
        { id: 85, level: [25, 28], rate: 5 }   // Dodrio
      ]
    },
    "route_18": {
      name: "Ruta 18",
      pokemon: [
        { id: 19, level: [24, 27], rate: 30 }, // Rattata
        { id: 20, level: [26, 29], rate: 10 }, // Raticate
        { id: 21, level: [24, 27], rate: 30 }, // Spearow
        { id: 22, level: [26, 29], rate: 5 },  // Fearow
        { id: 84, level: [25, 28], rate: 20 }, // Doduo
        { id: 85, level: [27, 30], rate: 5 }   // Dodrio
      ]
    },
    "route_19": {
      name: "Ruta 19",
      pokemon: [
        { id: 72, level: [5, 40], rate: 60 },   // Tentacool
        { id: 73, level: [15, 40], rate: 10 },  // Tentacruel
        { id: 116, level: [5, 40], rate: 30 },  // Horsea
        { id: 90, level: [5, 40], rate: 30 },   // Shellder
        { id: 120, level: [5, 40], rate: 30 }   // Staryu
      ]
    },
    "route_20": {
      name: "Ruta 20",
      pokemon: [
        { id: 72, level: [32, 37], rate: 60 },  // Tentacool
        { id: 73, level: [34, 39], rate: 10 },  // Tentacruel
        { id: 116, level: [32, 37], rate: 30 }, // Horsea
        { id: 117, level: [34, 39], rate: 5 },  // Seadra
        { id: 129, level: [5, 40], rate: 30 }   // Magikarp
      ]
    },
    "route_21": {
      name: "Ruta 21",
      pokemon: [
        { id: 72, level: [34, 39], rate: 60 },  // Tentacool
        { id: 73, level: [36, 41], rate: 10 },  // Tentacruel
        { id: 129, level: [5, 40], rate: 40 },  // Magikarp
        { id: 54, level: [34, 39], rate: 30 },  // Psyduck
        { id: 55, level: [36, 41], rate: 5 }    // Golduck
      ]
    },
    "route_22": {
      name: "Ruta 22",
      pokemon: [
        { id: 19, level: [3, 5], rate: 30 },   // Rattata
        { id: 21, level: [3, 5], rate: 30 },   // Spearow
        { id: 56, level: [4, 6], rate: 30 },   // Mankey
        { id: 27, level: [4, 6], rate: 10 }    // Sandshrew
      ]
    },
    "route_23": {
      name: "Ruta 23",
      pokemon: [
        { id: 21, level: [32, 37], rate: 20 }, // Spearow
        { id: 22, level: [34, 39], rate: 10 }, // Fearow
        { id: 27, level: [32, 37], rate: 20 }, // Sandshrew
        { id: 28, level: [34, 39], rate: 10 }, // Sandslash
        { id: 56, level: [32, 37], rate: 20 }, // Mankey
        { id: 57, level: [34, 39], rate: 10 }, // Primeape
        { id: 96, level: [33, 38], rate: 15 }, // Drowzee
        { id: 97, level: [35, 40], rate: 5 }   // Hypno
      ]
    },

    // ZONAS ESPECIALES (ya existentes - se mantienen)
    "viridian_forest": {
      name: "Bosque Verde",
      pokemon: [
        { id: 10, level: [3, 5], rate: 40 }, // Caterpie
        { id: 11, level: [4, 5], rate: 10 }, // Metapod
        { id: 13, level: [3, 5], rate: 40 }, // Weedle
        { id: 14, level: [4, 5], rate: 10 }  // Kakuna
      ]
    },
    "mt_moon": {
      name: "Montaña Moon",
      pokemon: [
        { id: 41, level: [6, 11], rate: 30 }, // Zubat
        { id: 46, level: [8, 12], rate: 25 }, // Paras
        { id: 74, level: [8, 14], rate: 25 }, // Geodude
        { id: 95, level: [7, 12], rate: 15 }, // Onix
        { id: 35, level: [8, 12], rate: 5 }   // Clefairy (raro)
      ]
    },
    "cerulean_cave": {
      name: "Cueva Cerulean",
      pokemon: [
        { id: 41, level: [22, 26], rate: 25 }, // Zubat
        { id: 42, level: [22, 26], rate: 15 }, // Golbat
        { id: 74, level: [22, 26], rate: 20 }, // Geodude
        { id: 75, level: [22, 26], rate: 10 }, // Graveler
        { id: 95, level: [22, 26], rate: 10 }, // Onix
        { id: 100, level: [23, 26], rate: 15 }, // Voltorb
        { id: 101, level: [23, 26], rate: 5 }  // Electrode
      ]
    },
    "safari_zone": {
      name: "Zona Safari",
      pokemon: [
        { id: 29, level: [15, 25], rate: 15 }, // Nidoran♀
        { id: 30, level: [15, 25], rate: 5 },  // Nidorina
        { id: 32, level: [15, 25], rate: 15 }, // Nidoran♂
        { id: 33, level: [15, 25], rate: 5 },  // Nidorino
        { id: 54, level: [15, 35], rate: 25 }, // Psyduck
        { id: 43, level: [12, 26], rate: 15 }, // Oddish
        { id: 69, level: [12, 26], rate: 15 }, // Bellsprout
        { id: 111, level: [15, 30], rate: 5 }, // Rhyhorn
        { id: 128, level: [25, 30], rate: 1 }  // Tauros (muy raro)
      ]
    },
    "sea_encounters": {
      name: "Encuentros Marinos",
      pokemon: [
        { id: 72, level: [5, 40], rate: 60 }, // Tentacool
        { id: 73, level: [15, 40], rate: 35 }, // Tentacruel
        { id: 129, level: [5, 15], rate: 5 }  // Magikarp
      ]
    },
    "fishing_old_rod": {
      name: "Pesca con Caña Vieja",
      pokemon: [
        { id: 129, level: [5, 10], rate: 100 } // Magikarp
      ]
    },
    "fishing_good_rod": {
      name: "Pesca con Caña Buena",
      pokemon: [
        { id: 60, level: [10, 20], rate: 60 }, // Poliwag
        { id: 118, level: [10, 20], rate: 20 }, // Goldeen
        { id: 129, level: [10, 20], rate: 20 }  // Magikarp
      ]
    },
    "fishing_super_rod": {
      name: "Pesca con Súper Caña",
      pokemon: [
        { id: 61, level: [15, 25], rate: 40 }, // Poliwhirl
        { id: 79, level: [15, 35], rate: 40 }, // Slowpoke
        { id: 119, level: [15, 25], rate: 15 }, // Seaking
        { id: 130, level: [15, 25], rate: 5 }   // Gyarados
      ]
    }
  },

  // GENERAR ENCUENTRO SALVAJE POR ZONA
  generateWildEncounter(zone, options = {}) {
    const encounterData = this.wildEncounters[zone];
    if (!encounterData) return null;

    // Seleccionar Pokémon basado en rates
    const totalRate = encounterData.pokemon.reduce((sum, p) => sum + p.rate, 0);
    let randomValue = Math.random() * totalRate;

    let selectedPokemon = null;
    for (const pokemon of encounterData.pokemon) {
      randomValue -= pokemon.rate;
      if (randomValue <= 0) {
        selectedPokemon = pokemon;
        break;
      }
    }

    if (!selectedPokemon) return null;

    // Determinar nivel (aleatorio dentro del rango)
    const [minLevel, maxLevel] = selectedPokemon.level;
    const level = minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));

    // Generar el Pokémon
    return this.utils.generateWildPokemon(selectedPokemon.id, level, options);
  }
};