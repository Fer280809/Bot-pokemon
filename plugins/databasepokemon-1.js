export const pokemonDB = {
  // Base de datos completa de 151 Pokémon Kanto
  pokemons: {
    // ------------------- INICIALES -------------------
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
      evolution: { level: 16, to: 2 },
      catchRate: 45,
      expYield: 64
    },
    
    2: {
      id: 2,
      name: "Ivysaur",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 },
      moves: {
        1: "Látigo Cepa",
        3: "Gruñido",
        7: "Drenadoras",
        9: "Polvo Veneno",
        13: "Somnífero",
        15: "Hoja Afilada",
        20: "Dulce Aroma",
        23: "Crecimiento",
        28: "Doble Filo",
        31: "Rayo Solar",
        36: "Síntesis",
        39: "Latigazo"
      },
      evolution: { level: 32, to: 3 },
      catchRate: 45,
      expYield: 142
    },
    
    3: {
      id: 3,
      name: "Venusaur",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
      moves: {
        1: "Hoja Afilada",
        3: "Gruñido",
        7: "Drenadoras",
        9: "Polvo Veneno",
        13: "Somnífero",
        15: "Dulce Aroma",
        20: "Crecimiento",
        23: "Doble Filo",
        28: "Rayo Solar",
        31: "Síntesis",
        36: "Latigazo",
        39: "Terremoto",
        45: "Rayo Solar"
      },
      evolution: null,
      catchRate: 45,
      expYield: 236
    },
    
    4: {
      id: 4,
      name: "Charmander",
      types: ["Fuego"],
      baseStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
      moves: {
        1: "Placaje",
        3: "Gruñido",
        7: "Ascuas",
        10: "Humo",
        13: "Furia Dragón",
        16: "Cuchillada",
        19: "Lanzallamas",
        22: "Garra Dragón",
        25: "Tajo Aéreo",
        28: "Giro Fuego",
        31: "Infierno"
      },
      evolution: { level: 16, to: 5 },
      catchRate: 45,
      expYield: 62
    },
    
    5: {
      id: 5,
      name: "Charmeleon",
      types: ["Fuego"],
      baseStats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },
      moves: {
        1: "Ascuas",
        3: "Gruñido",
        7: "Humo",
        10: "Furia Dragón",
        13: "Cuchillada",
        16: "Lanzallamas",
        20: "Garra Dragón",
        24: "Tajo Aéreo",
        28: "Giro Fuego",
        32: "Infierno",
        36: "Golpe Cabeza"
      },
      evolution: { level: 36, to: 6 },
      catchRate: 45,
      expYield: 142
    },
    
    6: {
      id: 6,
      name: "Charizard",
      types: ["Fuego", "Volador"],
      baseStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
      moves: {
        1: "Lanzallamas",
        3: "Gruñido",
        7: "Humo",
        10: "Furia Dragón",
        13: "Cuchillada",
        16: "Garra Dragón",
        20: "Tajo Aéreo",
        24: "Giro Fuego",
        28: "Infierno",
        32: "Golpe Cabeza",
        36: "Vuelo",
        40: "Corte",
        45: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 240
    },
    
    7: {
      id: 7,
      name: "Squirtle",
      types: ["Agua"],
      baseStats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },
      moves: {
        1: "Placaje",
        3: "Gruñido",
        7: "Burbuja",
        10: "Refugio",
        13: "Mordisco",
        16: "Pistola Agua",
        19: "Giro Rápido",
        22: "Protección",
        25: "Cabezazo",
        28: "Acua Cola",
        31: "Hidrobomba"
      },
      evolution: { level: 16, to: 8 },
      catchRate: 45,
      expYield: 63
    },
    
    8: {
      id: 8,
      name: "Wartortle",
      types: ["Agua"],
      baseStats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 },
      moves: {
        1: "Burbuja",
        3: "Gruñido",
        7: "Refugio",
        10: "Mordisco",
        13: "Pistola Agua",
        16: "Giro Rápido",
        20: "Protección",
        24: "Cabezazo",
        28: "Acua Cola",
        32: "Hidrobomba",
        36: "Cabezazo"
      },
      evolution: { level: 36, to: 9 },
      catchRate: 45,
      expYield: 142
    },
    
    9: {
      id: 9,
      name: "Blastoise",
      types: ["Agua"],
      baseStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
      moves: {
        1: "Pistola Agua",
        3: "Gruñido",
        7: "Refugio",
        10: "Mordisco",
        13: "Giro Rápido",
        16: "Protección",
        20: "Cabezazo",
        24: "Acua Cola",
        28: "Hidrobomba",
        32: "Cabezazo",
        36: "Giro Rápido",
        40: "Defensa Férrea",
        45: "Hidropulso"
      },
      evolution: null,
      catchRate: 45,
      expYield: 239
    },
    
    // ------------------- INSECTOS PRINCIPALES -------------------
    10: {
      id: 10,
      name: "Caterpie",
      types: ["Bicho"],
      baseStats: { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 },
      moves: {
        1: "Placaje",
        1: "Drenadoras"
      },
      evolution: { level: 7, to: 11 },
      catchRate: 255,
      expYield: 39
    },
    
    11: {
      id: 11,
      name: "Metapod",
      types: ["Bicho"],
      baseStats: { hp: 50, atk: 20, def: 55, spa: 25, spd: 25, spe: 30 },
      moves: {
        1: "Placaje",
        7: "Drenadoras",
        7: "Fortaleza"
      },
      evolution: { level: 10, to: 12 },
      catchRate: 120,
      expYield: 72
    },
    
    12: {
      id: 12,
      name: "Butterfree",
      types: ["Bicho", "Volador"],
      baseStats: { hp: 60, atk: 45, def: 50, spa: 90, spd: 80, spe: 70 },
      moves: {
        1: "Confusión",
        10: "Polvo Veneno",
        13: "Somnífero",
        14: "Supersónico",
        15: "Viento Plata",
        18: "Psicorrayo",
        23: "Reflejo",
        28: "Tornado"
      },
      evolution: null,
      catchRate: 45,
      expYield: 178
    },
    
    13: {
      id: 13,
      name: "Weedle",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50 },
      moves: {
        1: "Picotazo Veneno",
        1: "Drenadoras"
      },
      evolution: { level: 7, to: 14 },
      catchRate: 255,
      expYield: 39
    },
    
    14: {
      id: 14,
      name: "Kakuna",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 45, atk: 25, def: 50, spa: 25, spd: 25, spe: 35 },
      moves: {
        1: "Picotazo Veneno",
        7: "Drenadoras",
        7: "Fortaleza"
      },
      evolution: { level: 10, to: 15 },
      catchRate: 120,
      expYield: 72
    },
    
    15: {
      id: 15,
      name: "Beedrill",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 65, atk: 90, def: 40, spa: 45, spd: 80, spe: 75 },
      moves: {
        1: "Picotazo Veneno",
        10: "Furia",
        13: "Persecución",
        16: "Doble Ataque",
        19: "Ataque Rápido",
        22: "Pin Misil",
        25: "Agilidad",
        28: "Megacuerno"
      },
      evolution: null,
      catchRate: 45,
      expYield: 178
    },
    
    // ------------------- PÁJAROS -------------------
    16: {
      id: 16,
      name: "Pidgey",
      types: ["Normal", "Volador"],
      baseStats: { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 },
      moves: {
        1: "Placaje",
        5: "Arenilla",
        9: "Tornado",
        13: "Ataque Rápido",
        17: "Remolino",
        21: "Viento Afilado",
        25: "Tajo Aéreo",
        29: "Agilidad",
        33: "Vendaval"
      },
      evolution: { level: 18, to: 17 },
      catchRate: 255,
      expYield: 50
    },
    
    17: {
      id: 17,
      name: "Pidgeotto",
      types: ["Normal", "Volador"],
      baseStats: { hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 71 },
      moves: {
        1: "Tornado",
        5: "Arenilla",
        9: "Ataque Rápido",
        13: "Remolino",
        17: "Viento Afilado",
        22: "Tajo Aéreo",
        27: "Agilidad",
        32: "Vendaval",
        37: "Ataque Ala"
      },
      evolution: { level: 36, to: 18 },
      catchRate: 120,
      expYield: 122
    },
    
    18: {
      id: 18,
      name: "Pidgeot",
      types: ["Normal", "Volador"],
      baseStats: { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101 },
      moves: {
        1: "Tornado",
        5: "Arenilla",
        9: "Ataque Rápido",
        13: "Remolino",
        17: "Viento Afilado",
        22: "Tajo Aéreo",
        27: "Agilidad",
        32: "Vendaval",
        38: "Ataque Ala",
        44: "Vuelo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 216
    },
    
    // ------------------- RATAS -------------------
    19: {
      id: 19,
      name: "Rattata",
      types: ["Normal"],
      baseStats: { hp: 30, atk: 56, def: 35, spa: 25, spd: 35, spe: 72 },
      moves: {
        1: "Placaje",
        4: "Ataque Rápido",
        7: "Persecución",
        10: "Mordisco",
        13: "Hipercolmillo",
        16: "Foco Energía",
        19: "Triturar",
        22: "Doble Equipo",
        25: "Superdiente"
      },
      evolution: { level: 20, to: 20 },
      catchRate: 255,
      expYield: 51
    },
    
    20: {
      id: 20,
      name: "Raticate",
      types: ["Normal"],
      baseStats: { hp: 55, atk: 81, def: 60, spa: 50, spd: 70, spe: 97 },
      moves: {
        1: "Persecución",
        4: "Ataque Rápido",
        7: "Mordisco",
        10: "Hipercolmillo",
        13: "Foco Energía",
        16: "Triturar",
        20: "Doble Equipo",
        24: "Superdiente",
        28: "Golpe",
        32: "Hiperrayo"
      },
      evolution: null,
      catchRate: 127,
      expYield: 145
    },
    
    // ------------------- PÁJAROS 2 -------------------
    21: {
      id: 21,
      name: "Spearow",
      types: ["Normal", "Volador"],
      baseStats: { hp: 40, atk: 60, def: 30, spa: 31, spd: 31, spe: 70 },
      moves: {
        1: "Picotazo",
        4: "Gruñido",
        8: "Persecución",
        11: "Ataque Rápido",
        15: "Furia",
        18: "Tajo Aéreo",
        22: "Espejismo",
        25: "Agilidad",
        29: "Pico Taladro"
      },
      evolution: { level: 20, to: 22 },
      catchRate: 255,
      expYield: 52
    },
    
    22: {
      id: 22,
      name: "Fearow",
      types: ["Normal", "Volador"],
      baseStats: { hp: 65, atk: 90, def: 65, spa: 61, spd: 61, spe: 100 },
      moves: {
        1: "Picotazo",
        4: "Gruñido",
        8: "Persecución",
        11: "Ataque Rápido",
        15: "Furia",
        18: "Tajo Aéreo",
        23: "Espejismo",
        27: "Agilidad",
        32: "Pico Taladro",
        36: "Vuelo",
        40: "Ataque Furioso"
      },
      evolution: null,
      catchRate: 90,
      expYield: 155
    },
    
    // ------------------- SERPIENTES -------------------
    23: {
      id: 23,
      name: "Ekans",
      types: ["Veneno"],
      baseStats: { hp: 35, atk: 60, def: 44, spa: 40, spd: 54, spe: 55 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        9: "Mordisco",
        12: "Ácido",
        17: "Látigo",
        20: "Constricción",
        25: "Toxi",
        28: "Triturar",
        33: "Bomba Lodo",
        36: "Golpe Cabeza"
      },
      evolution: { level: 22, to: 24 },
      catchRate: 255,
      expYield: 58
    },
    
    24: {
      id: 24,
      name: "Arbok",
      types: ["Veneno"],
      baseStats: { hp: 60, atk: 85, def: 69, spa: 65, spd: 79, spe: 80 },
      moves: {
        1: "Mordisco",
        4: "Gruñido",
        9: "Ácido",
        12: "Látigo",
        17: "Constricción",
        20: "Toxi",
        27: "Triturar",
        32: "Bomba Lodo",
        36: "Golpe Cabeza",
        41: "Garra Dragón",
        46: "Megaácido"
      },
      evolution: null,
      catchRate: 90,
      expYield: 157
    },
    
    // ------------------- ELÉCTRICOS -------------------
    25: {
      id: 25,
      name: "Pikachu",
      types: ["Eléctrico"],
      baseStats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 },
      moves: {
        1: "Impactrueno",
        5: "Gruñido",
        7: "Ataque Rápido",
        10: "Onda Trueno",
        13: "Doble Equipo",
        18: "Bola Voltio",
        21: "Velocidad",
        23: "Chispazo",
        26: "Cola Férrea",
        29: "Trueno",
        34: "Agilidad",
        37: "Ataque Voltio"
      },
      evolution: { item: "thunderstone", to: 26 },
      catchRate: 190,
      expYield: 82
    },
    
    26: {
      id: 26,
      name: "Raichu",
      types: ["Eléctrico"],
      baseStats: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110 },
      moves: {
        1: "Impactrueno",
        1: "Gruñido",
        1: "Ataque Rápido",
        1: "Onda Trueno",
        1: "Doble Equipo",
        1: "Bola Voltio",
        1: "Chispazo",
        30: "Cola Férrea",
        40: "Trueno",
        50: "Ataque Voltio",
        60: "Hiperrayo"
      },
      evolution: null,
      catchRate: 75,
      expYield: 218
    },
    
    // ------------------- TIERRA -------------------
    27: {
      id: 27,
      name: "Sandshrew",
      types: ["Tierra"],
      baseStats: { hp: 50, atk: 75, def: 85, spa: 20, spd: 30, spe: 40 },
      moves: {
        1: "Arañazo",
        4: "Defensa Férrea",
        7: "Garra Metálica",
        10: "Rapidez",
        13: "Furia",
        16: "Magnitud",
        19: "Tumba Rocas",
        22: "Giro Rápido",
        25: "Excavar",
        28: "Corte",
        31: "Terremoto"
      },
      evolution: { level: 22, to: 28 },
      catchRate: 255,
      expYield: 60
    },
    
    28: {
      id: 28,
      name: "Sandslash",
      types: ["Tierra"],
      baseStats: { hp: 75, atk: 100, def: 110, spa: 45, spd: 55, spe: 65 },
      moves: {
        1: "Arañazo",
        4: "Defensa Férrea",
        7: "Garra Metálica",
        10: "Rapidez",
        13: "Furia",
        16: "Magnitud",
        19: "Tumba Rocas",
        24: "Giro Rápido",
        30: "Excavar",
        36: "Corte",
        42: "Terremoto",
        48: "Garra Dragón"
      },
      evolution: null,
      catchRate: 90,
      expYield: 158
    },
    
    // ------------------- HADAS -------------------
    29: {
      id: 29,
      name: "Nidoran♀",
      types: ["Veneno"],
      baseStats: { hp: 55, atk: 47, def: 52, spa: 40, spd: 40, spe: 41 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Arañazo",
        12: "Doble Patada",
        17: "Picotazo Veneno",
        23: "Furia",
        30: "Cornada",
        38: "Doble Ataque",
        47: "Tóxico"
      },
      evolution: { level: 16, to: 30 },
      catchRate: 235,
      expYield: 55
    },
    
    30: {
      id: 30,
      name: "Nidorina",
      types: ["Veneno"],
      baseStats: { hp: 70, atk: 62, def: 67, spa: 55, spd: 55, spe: 56 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Arañazo",
        12: "Doble Patada",
        19: "Picotazo Veneno",
        27: "Furia",
        36: "Cornada",
        46: "Doble Ataque",
        58: "Tóxico"
      },
      evolution: { item: "moonstone", to: 31 },
      catchRate: 120,
      expYield: 128
    },
    
    31: {
      id: 31,
      name: "Nidoqueen",
      types: ["Veneno", "Tierra"],
      baseStats: { hp: 90, atk: 82, def: 87, spa: 75, spd: 85, spe: 76 },
      moves: {
        1: "Doble Patada",
        1: "Picotazo Veneno",
        1: "Furia",
        1: "Cornada",
        23: "Garra Dragón",
        35: "Terremoto",
        43: "Megapatada",
        58: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 227
    },
    
    32: {
      id: 32,
      name: "Nidoran♂",
      types: ["Veneno"],
      baseStats: { hp: 46, atk: 57, def: 40, spa: 40, spd: 40, spe: 50 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Cornada",
        12: "Doble Patada",
        17: "Picotazo Veneno",
        23: "Furia",
        30: "Cornada",
        38: "Doble Ataque",
        47: "Megacuerno"
      },
      evolution: { level: 16, to: 33 },
      catchRate: 235,
      expYield: 55
    },
    
    33: {
      id: 33,
      name: "Nidorino",
      types: ["Veneno"],
      baseStats: { hp: 61, atk: 72, def: 57, spa: 55, spd: 55, spe: 65 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Cornada",
        12: "Doble Patada",
        19: "Picotazo Veneno",
        27: "Furia",
        36: "Cornada",
        46: "Doble Ataque",
        58: "Megacuerno"
      },
      evolution: { item: "moonstone", to: 34 },
      catchRate: 120,
      expYield: 128
    },
    
    34: {
      id: 34,
      name: "Nidoking",
      types: ["Veneno", "Tierra"],
      baseStats: { hp: 81, atk: 92, def: 77, spa: 85, spd: 75, spe: 85 },
      moves: {
        1: "Doble Patada",
        1: "Picotazo Veneno",
        1: "Furia",
        1: "Cornada",
        23: "Garra Dragón",
        35: "Terremoto",
        43: "Megapatada",
        58: "Megacuerno"
      },
      evolution: null,
      catchRate: 45,
      expYield: 227
    },
    
    // ------------------- HADAS 2 -------------------
    35: {
      id: 35,
      name: "Clefairy",
      types: ["Hada"],
      baseStats: { hp: 70, atk: 45, def: 48, spa: 60, spd: 65, spe: 35 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Canto",
        13: "Doble Bofetón",
        18: "Minimizar",
        24: "Metrónomo",
        31: "Luz Lunar",
        39: "Poder Oculto",
        48: "Destructor"
      },
      evolution: { item: "moonstone", to: 36 },
      catchRate: 150,
      expYield: 113
    },
    
    36: {
      id: 36,
      name: "Clefable",
      types: ["Hada"],
      baseStats: { hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60 },
      moves: {
        1: "Canto",
        1: "Doble Bofetón",
        1: "Minimizar",
        1: "Metrónomo",
        24: "Luz Lunar",
        35: "Poder Oculto",
        48: "Destructor",
        61: "Rayo Confuso"
      },
      evolution: null,
      catchRate: 25,
      expYield: 217
    },
    
    // ------------------- ZORROS -------------------
    37: {
      id: 37,
      name: "Vulpix",
      types: ["Fuego"],
      baseStats: { hp: 38, atk: 41, def: 40, spa: 50, spd: 65, spe: 65 },
      moves: {
        1: "Ascuas",
        4: "Gruñido",
        7: "Polución",
        10: "Rapidez",
        13: "Confusión",
        16: "Fuego Fatuo",
        19: "Infierno",
        22: "Giro Fuego",
        25: "Salpicadura",
        28: "Lanzallamas"
      },
      evolution: { item: "firestone", to: 38 },
      catchRate: 190,
      expYield: 60
    },
    
    38: {
      id: 38,
      name: "Ninetales",
      types: ["Fuego"],
      baseStats: { hp: 73, atk: 76, def: 75, spa: 81, spd: 100, spe: 100 },
      moves: {
        1: "Ascuas",
        1: "Gruñido",
        1: "Polución",
        1: "Rapidez",
        13: "Confusión",
        16: "Fuego Fatuo",
        20: "Infierno",
        24: "Giro Fuego",
        28: "Salpicadura",
        32: "Lanzallamas",
        36: "Psíquico"
      },
      evolution: null,
      catchRate: 75,
      expYield: 177
    },
    
    // ------------------- HADAS 3 -------------------
    39: {
      id: 39,
      name: "Jigglypuff",
      types: ["Normal", "Hada"],
      baseStats: { hp: 115, atk: 45, def: 20, spa: 45, spd: 25, spe: 20 },
      moves: {
        1: "Canto",
        4: "Dulce Aroma",
        9: "Doble Bofetón",
        14: "Destructor",
        19: "Rollo",
        24: "Descanso",
        29: "Voz Cautivadora",
        34: "Doble Filo",
        39: "Hiperrayo"
      },
      evolution: { item: "moonstone", to: 40 },
      catchRate: 170,
      expYield: 76
    },
    
    40: {
      id: 40,
      name: "Wigglytuff",
      types: ["Normal", "Hada"],
      baseStats: { hp: 140, atk: 70, def: 45, spa: 85, spd: 50, spe: 45 },
      moves: {
        1: "Canto",
        1: "Dulce Aroma",
        1: "Doble Bofetón",
        1: "Destructor",
        19: "Rollo",
        24: "Descanso",
        30: "Voz Cautivadora",
        36: "Doble Filo",
        42: "Hiperrayo",
        48: "Mimético"
      },
      evolution: null,
      catchRate: 50,
      expYield: 109
    },
    
    // ------------------- MURCIÉLAGOS -------------------
    41: {
      id: 41,
      name: "Zubat",
      types: ["Veneno", "Volador"],
      baseStats: { hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55 },
      moves: {
        1: "Absorber",
        5: "Supersónico",
        9: "Mordisco",
        13: "Confusión",
        17: "Ala de Acero",
        21: "Ataque Ala",
        25: "Toxi",
        29: "Triturar",
        33: "Viento Aciago"
      },
      evolution: { level: 22, to: 42 },
      catchRate: 255,
      expYield: 49
    },
    
    42: {
      id: 42,
      name: "Golbat",
      types: ["Veneno", "Volador"],
      baseStats: { hp: 75, atk: 80, def: 70, spa: 65, spd: 75, spe: 90 },
      moves: {
        1: "Absorber",
        5: "Supersónico",
        9: "Mordisco",
        13: "Confusión",
        17: "Ala de Acero",
        21: "Ataque Ala",
        27: "Toxi",
        33: "Triturar",
        39: "Viento Aciago",
        45: "Rapidez"
      },
      evolution: { friendship: 220, to: 169 },
      catchRate: 90,
      expYield: 159
    },
    
    // ------------------- PLANTAS -------------------
    43: {
      id: 43,
      name: "Oddish",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 45, atk: 50, def: 55, spa: 75, spd: 65, spe: 30 },
      moves: {
        1: "Absorber",
        4: "Dulce Aroma",
        8: "Ácido",
        12: "Polvo Veneno",
        14: "Drenadoras",
        16: "Somnífero",
        18: "Megaácido",
        20: "Lodo",
        24: "Rayo Lunar",
        28: "Petal Dance"
      },
      evolution: { level: 21, to: 44 },
      catchRate: 255,
      expYield: 64
    },
    
    44: {
      id: 44,
      name: "Gloom",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 60, atk: 65, def: 70, spa: 85, spd: 75, spe: 40 },
      moves: {
        1: "Absorber",
        4: "Dulce Aroma",
        8: "Ácido",
        12: "Polvo Veneno",
        14: "Drenadoras",
        16: "Somnífero",
        18: "Megaácido",
        22: "Lodo",
        28: "Rayo Lunar",
        32: "Petal Dance",
        38: "Tóxico"
      },
      evolution: { item: "leafstone", to: 45 },
      catchRate: 120,
      expYield: 138
    },
    
    45: {
      id: 45,
      name: "Vileplume",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 75, atk: 80, def: 85, spa: 110, spd: 90, spe: 50 },
      moves: {
        1: "Absorber",
        1: "Dulce Aroma",
        1: "Ácido",
        1: "Polvo Veneno",
        14: "Drenadoras",
        16: "Somnífero",
        18: "Megaácido",
        22: "Lodo",
        28: "Rayo Lunar",
        32: "Petal Dance",
        40: "Tóxico",
        46: "Rayo Solar"
      },
      evolution: null,
      catchRate: 45,
      expYield: 221
    },
    
    // ------------------- HONGOS -------------------
    46: {
      id: 46,
      name: "Paras",
      types: ["Bicho", "Planta"],
      baseStats: { hp: 35, atk: 70, def: 55, spa: 45, spd: 55, spe: 25 },
      moves: {
        1: "Arañazo",
        4: "Absorber",
        7: "Polvo Veneno",
        10: "Corte",
        13: "Espora",
        16: "Megaácido",
        19: "Ronquido",
        22: "Psicocorte",
        25: "Crecimiento",
        28: "Tijera X"
      },
      evolution: { level: 24, to: 47 },
      catchRate: 190,
      expYield: 57
    },
    
    47: {
      id: 47,
      name: "Parasect",
      types: ["Bicho", "Planta"],
      baseStats: { hp: 60, atk: 95, def: 80, spa: 60, spd: 80, spe: 30 },
      moves: {
        1: "Arañazo",
        4: "Absorber",
        7: "Polvo Veneno",
        10: "Corte",
        13: "Espora",
        16: "Megaácido",
        19: "Ronquido",
        24: "Psicocorte",
        30: "Crecimiento",
        36: "Tijera X",
        42: "Cuchillada"
      },
      evolution: null,
      catchRate: 75,
      expYield: 142
    },
    
    // ------------------- INSECTOS -------------------
    48: {
      id: 48,
      name: "Venonat",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 60, atk: 55, def: 50, spa: 40, spd: 55, spe: 45 },
      moves: {
        1: "Placaje",
        4: "Supersónico",
        9: "Confusión",
        13: "Polvo Veneno",
        17: "Psicorrayo",
        20: "Somnífero",
        24: "Psíquico",
        28: "Megadrenado",
        32: "Zumbido"
      },
      evolution: { level: 31, to: 49 },
      catchRate: 190,
      expYield: 61
    },
    
    49: {
      id: 49,
      name: "Venomoth",
      types: ["Bicho", "Veneno"],
      baseStats: { hp: 70, atk: 65, def: 60, spa: 90, spd: 75, spe: 90 },
      moves: {
        1: "Supersónico",
        4: "Confusión",
        9: "Polvo Veneno",
        13: "Psicorrayo",
        17: "Somnífero",
        20: "Psíquico",
        24: "Megadrenado",
        28: "Zumbido",
        32: "Ataque Ala",
        36: "Viento Plata"
      },
      evolution: null,
      catchRate: 75,
      expYield: 158
    },
    
    // ------------------- TOPOS -------------------
    50: {
      id: 50,
      name: "Diglett",
      types: ["Tierra"],
      baseStats: { hp: 10, atk: 55, def: 25, spa: 35, spd: 45, spe: 95 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        7: "Magnitud",
        10: "Tumba Rocas",
        14: "Golpe Bajo",
        18: "Fisura",
        22: "Excavar",
        25: "Corte",
        28: "Terremoto",
        31: "Triataque"
      },
      evolution: { level: 26, to: 51 },
      catchRate: 255,
      expYield: 53
    },
    
    51: {
      id: 51,
      name: "Dugtrio",
      types: ["Tierra"],
      baseStats: { hp: 35, atk: 80, def: 50, spa: 50, spd: 70, spe: 120 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        7: "Magnitud",
        10: "Tumba Rocas",
        14: "Golpe Bajo",
        18: "Fisura",
        22: "Excavar",
        27: "Corte",
        32: "Terremoto",
        37: "Triataque",
        42: "Arena"
      },
      evolution: null,
      catchRate: 50,
      expYield: 149
    },
    
    // ------------------- GATOS -------------------
    52: {
      id: 52,
      name: "Meowth",
      types: ["Normal"],
      baseStats: { hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 90 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        8: "Mordisco",
        12: "Ataque Rápido",
        16: "Finta",
        20: "Golpes Furia",
        24: "Día de Pago",
        28: "Triturar",
        32: "Amnesia",
        36: "Golpe"
      },
      evolution: { level: 28, to: 53 },
      catchRate: 255,
      expYield: 58
    },
    
    53: {
      id: 53,
      name: "Persian",
      types: ["Normal"],
      baseStats: { hp: 65, atk: 70, def: 60, spa: 65, spd: 65, spe: 115 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        8: "Mordisco",
        12: "Ataque Rápido",
        16: "Finta",
        20: "Golpes Furia",
        24: "Día de Pago",
        29: "Triturar",
        34: "Amnesia",
        39: "Golpe",
        44: "Hiperrayo"
      },
      evolution: null,
      catchRate: 90,
      expYield: 154
    },
    
    // ------------------- PSÍQUICOS ACUÁTICOS -------------------
    54: {
      id: 54,
      name: "Psyduck",
      types: ["Agua"],
      baseStats: { hp: 50, atk: 52, def: 48, spa: 65, spd: 50, spe: 55 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        7: "Confusión",
        10: "Pistola Agua",
        13: "Doble Bofetón",
        16: "Disable",
        19: "Psicorrayo",
        22: "Cabezazo",
        25: "Amnesia",
        28: "Hidropulso",
        31: "Psíquico"
      },
      evolution: { level: 33, to: 55 },
      catchRate: 190,
      expYield: 64
    },
    
    55: {
      id: 55,
      name: "Golduck",
      types: ["Agua"],
      baseStats: { hp: 80, atk: 82, def: 78, spa: 95, spd: 80, spe: 85 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        7: "Confusión",
        10: "Pistola Agua",
        13: "Doble Bofetón",
        16: "Disable",
        19: "Psicorrayo",
        24: "Cabezazo",
        29: "Amnesia",
        34: "Hidropulso",
        39: "Psíquico",
        44: "Hidrobomba"
      },
      evolution: null,
      catchRate: 75,
      expYield: 175
    },
    
    // ------------------- MONOS -------------------
    56: {
      id: 56,
      name: "Mankey",
      types: ["Lucha"],
      baseStats: { hp: 40, atk: 80, def: 35, spa: 35, spd: 45, spe: 70 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        8: "Patada Baja",
        12: "Doble Bofetón",
        16: "Furia",
        20: "Sumisión",
        24: "Golpe Karate",
        28: "Ataque Rápido",
        32: "Contraataque",
        36: "Giro Patada",
        40: "Demolición"
      },
      evolution: { level: 28, to: 57 },
      catchRate: 190,
      expYield: 61
    },
    
    57: {
      id: 57,
      name: "Primeape",
      types: ["Lucha"],
      baseStats: { hp: 65, atk: 105, def: 60, spa: 60, spd: 70, spe: 95 },
      moves: {
        1: "Arañazo",
        4: "Gruñido",
        8: "Patada Baja",
        12: "Doble Bofetón",
        16: "Furia",
        20: "Sumisión",
        24: "Golpe Karate",
        28: "Ataque Rápido",
        32: "Contraataque",
        36: "Giro Patada",
        40: "Demolición",
        44: "Puño Dinámico"
      },
      evolution: null,
      catchRate: 75,
      expYield: 159
    },
    
    // ------------------- PERROS FUEGO -------------------
    58: {
      id: 58,
      name: "Growlithe",
      types: ["Fuego"],
      baseStats: { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 },
      moves: {
        1: "Mordisco",
        4: "Rugido",
        7: "Ascuas",
        10: "Giro Fuego",
        13: "Mordisco",
        16: "Ataque Rápido",
        19: "Lanzallamas",
        22: "Garra Dragón",
        25: "Furia",
        28: "Giro Fuego",
        31: "Triturar"
      },
      evolution: { item: "firestone", to: 59 },
      catchRate: 190,
      expYield: 70
    },
    
    59: {
      id: 59,
      name: "Arcanine",
      types: ["Fuego"],
      baseStats: { hp: 90, atk: 110, def: 80, spa: 100, spd: 80, spe: 95 },
      moves: {
        1: "Mordisco",
        1: "Rugido",
        1: "Ascuas",
        1: "Giro Fuego",
        16: "Mordisco",
        20: "Ataque Rápido",
        24: "Lanzallamas",
        29: "Garra Dragón",
        34: "Furia",
        39: "Giro Fuego",
        44: "Triturar",
        49: "Velocidad"
      },
      evolution: null,
      catchRate: 75,
      expYield: 194
    },
    
    // ------------------- AGUA -------------------
    60: {
      id: 60,
      name: "Poliwag",
      types: ["Agua"],
      baseStats: { hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90 },
      moves: {
        1: "Burbuja",
        4: "Hipnosis",
        7: "Pistola Agua",
        10: "Doble Bofetón",
        13: "Lluvia",
        16: "Golpe Cabeza",
        19: "Hidropulso",
        22: "Doble Filo",
        25: "Viento",
        28: "Hidrobomba"
      },
      evolution: { level: 25, to: 61 },
      catchRate: 255,
      expYield: 60
    },
    
    61: {
      id: 61,
      name: "Poliwhirl",
      types: ["Agua"],
      baseStats: { hp: 65, atk: 65, def: 65, spa: 50, spd: 50, spe: 90 },
      moves: {
        1: "Burbuja",
        4: "Hipnosis",
        7: "Pistola Agua",
        10: "Doble Bofetón",
        13: "Lluvia",
        16: "Golpe Cabeza",
        19: "Hidropulso",
        24: "Doble Filo",
        30: "Viento",
        36: "Hidrobomba",
        42: "Sumisión"
      },
      evolution: { item: "waterstone", to: 62 },
      catchRate: 120,
      expYield: 135
    },
    
    62: {
      id: 62,
      name: "Poliwrath",
      types: ["Agua", "Lucha"],
      baseStats: { hp: 90, atk: 85, def: 95, spa: 70, spd: 90, spe: 70 },
      moves: {
        1: "Hipnosis",
        1: "Pistola Agua",
        1: "Doble Bofetón",
        1: "Lluvia",
        16: "Golpe Cabeza",
        19: "Hidropulso",
        24: "Doble Filo",
        30: "Viento",
        36: "Hidrobomba",
        42: "Sumisión",
        48: "Puño Dinámico",
        54: "Lluvia"
      },
      evolution: null,
      catchRate: 45,
      expYield: 230
    },
    
    // ------------------- PSÍQUICOS -------------------
    63: {
      id: 63,
      name: "Abra",
      types: ["Psíquico"],
      baseStats: { hp: 25, atk: 20, def: 15, spa: 105, spd: 55, spe: 90 },
      moves: {
        1: "Telequinesis"
      },
      evolution: { level: 16, to: 64 },
      catchRate: 200,
      expYield: 62
    },
    
    64: {
      id: 64,
      name: "Kadabra",
      types: ["Psíquico"],
      baseStats: { hp: 40, atk: 35, def: 30, spa: 120, spd: 70, spe: 105 },
      moves: {
        1: "Telequinesis",
        16: "Confusión",
        20: "Psicorrayo",
        24: "Reflejo",
        28: "Recuperación",
        32: "Psíquico",
        36: "Psicoonda",
        40: "Calma Mental"
      },
      evolution: { trade: true, to: 65 },
      catchRate: 100,
      expYield: 140
    },
    
    65: {
      id: 65,
      name: "Alakazam",
      types: ["Psíquico"],
      baseStats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 },
      moves: {
        1: "Telequinesis",
        16: "Confusión",
        20: "Psicorrayo",
        24: "Reflejo",
        28: "Recuperación",
        32: "Psíquico",
        36: "Psicoonda",
        40: "Calma Mental",
        44: "Futuro",
        48: "Psíquico"
      },
      evolution: null,
      catchRate: 50,
      expYield: 225
    },
    
    // ------------------- LUCHA -------------------
    66: {
      id: 66,
      name: "Machop",
      types: ["Lucha"],
      baseStats: { hp: 70, atk: 80, def: 50, spa: 35, spd: 35, spe: 35 },
      moves: {
        1: "Patada Baja",
        4: "Enfado",
        8: "Golpe Karate",
        12: "Foco Energía",
        16: "Sumisión",
        20: "Furia",
        24: "Golpe",
        28: "Puño Increíble",
        32: "Demolición",
        36: "Contraataque",
        40: "Puño Dinámico"
      },
      evolution: { level: 28, to: 67 },
      catchRate: 180,
      expYield: 61
    },
    
    67: {
      id: 67,
      name: "Machoke",
      types: ["Lucha"],
      baseStats: { hp: 80, atk: 100, def: 70, spa: 50, spd: 60, spe: 45 },
      moves: {
        1: "Patada Baja",
        4: "Enfado",
        8: "Golpe Karate",
        12: "Foco Energía",
        16: "Sumisión",
        20: "Furia",
        24: "Golpe",
        29: "Puño Increíble",
        34: "Demolición",
        39: "Contraataque",
        44: "Puño Dinámico"
      },
      evolution: { trade: true, to: 68 },
      catchRate: 90,
      expYield: 142
    },
    
    68: {
      id: 68,
      name: "Machamp",
      types: ["Lucha"],
      baseStats: { hp: 90, atk: 130, def: 80, spa: 65, spd: 85, spe: 55 },
      moves: {
        1: "Patada Baja",
        4: "Enfado",
        8: "Golpe Karate",
        12: "Foco Energía",
        16: "Sumisión",
        20: "Furia",
        24: "Golpe",
        29: "Puño Increíble",
        34: "Demolición",
        39: "Contraataque",
        44: "Puño Dinámico",
        48: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 227
    },
    
    // ------------------- PLANTAS 2 -------------------
    69: {
      id: 69,
      name: "Bellsprout",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 50, atk: 75, def: 35, spa: 70, spd: 30, spe: 40 },
      moves: {
        1: "Látigo Cepa",
        4: "Crecimiento",
        7: "Látigo",
        10: "Drenadoras",
        13: "Ácido",
        16: "Atadura",
        19: "Polvo Veneno",
        22: "Megaácido",
        25: "Dulce Aroma",
        28: "Hoja Afilada",
        31: "Rayo Solar"
      },
      evolution: { level: 21, to: 70 },
      catchRate: 255,
      expYield: 60
    },
    
    70: {
      id: 70,
      name: "Weepinbell",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 65, atk: 90, def: 50, spa: 85, spd: 45, spe: 55 },
      moves: {
        1: "Látigo Cepa",
        4: "Crecimiento",
        7: "Látigo",
        10: "Drenadoras",
        13: "Ácido",
        16: "Atadura",
        19: "Polvo Veneno",
        24: "Megaácido",
        29: "Dulce Aroma",
        34: "Hoja Afilada",
        39: "Rayo Solar"
      },
      evolution: { item: "leafstone", to: 71 },
      catchRate: 120,
      expYield: 137
    },
    
    71: {
      id: 71,
      name: "Victreebel",
      types: ["Planta", "Veneno"],
      baseStats: { hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70 },
      moves: {
        1: "Látigo Cepa",
        1: "Crecimiento",
        1: "Látigo",
        1: "Drenadoras",
        13: "Ácido",
        16: "Atadura",
        19: "Polvo Veneno",
        24: "Megaácido",
        29: "Dulce Aroma",
        34: "Hoja Afilada",
        39: "Rayo Solar",
        44: "Triturar"
      },
      evolution: null,
      catchRate: 45,
      expYield: 221
    },
    
    // ------------------- AGUA 2 -------------------
    72: {
      id: 72,
      name: "Tentacool",
      types: ["Agua", "Veneno"],
      baseStats: { hp: 40, atk: 40, def: 35, spa: 50, spd: 100, spe: 70 },
      moves: {
        1: "Picotazo Veneno",
        4: "Supersónico",
        7: "Constricción",
        10: "Ácido",
        13: "Burbuja",
        16: "Rayo Confuso",
        19: "Rayo Burbuja",
        22: "Barrera",
        25: "Veneno",
        28: "Hidropulso",
        31: "Tóxico"
      },
      evolution: { level: 30, to: 73 },
      catchRate: 190,
      expYield: 67
    },
    
    73: {
      id: 73,
      name: "Tentacruel",
      types: ["Agua", "Veneno"],
      baseStats: { hp: 80, atk: 70, def: 65, spa: 80, spd: 120, spe: 100 },
      moves: {
        1: "Picotazo Veneno",
        4: "Supersónico",
        7: "Constricción",
        10: "Ácido",
        13: "Burbuja",
        16: "Rayo Confuso",
        19: "Rayo Burbuja",
        22: "Barrera",
        25: "Veneno",
        29: "Hidropulso",
        33: "Tóxico",
        37: "Hidrobomba",
        41: "Acoso"
      },
      evolution: null,
      catchRate: 60,
      expYield: 180
    },
    
    // ------------------- ROCAS -------------------
    74: {
      id: 74,
      name: "Geodude",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20 },
      moves: {
        1: "Placaje",
        4: "Defensa Férrea",
        8: "Lanzarrocas",
        11: "Magnitud",
        15: "Golpe Roca",
        18: "Terremoto",
        22: "Avivar",
        25: "Tumba Rocas",
        29: "Explosión",
        32: "Doble Filo"
      },
      evolution: { level: 25, to: 75 },
      catchRate: 255,
      expYield: 60
    },
    
    75: {
      id: 75,
      name: "Graveler",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 55, atk: 95, def: 115, spa: 45, spd: 45, spe: 35 },
      moves: {
        1: "Placaje",
        4: "Defensa Férrea",
        8: "Lanzarrocas",
        11: "Magnitud",
        15: "Golpe Roca",
        18: "Terremoto",
        22: "Avivar",
        27: "Tumba Rocas",
        33: "Explosión",
        38: "Doble Filo"
      },
      evolution: { trade: true, to: 76 },
      catchRate: 120,
      expYield: 137
    },
    
    76: {
      id: 76,
      name: "Golem",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45 },
      moves: {
        1: "Placaje",
        4: "Defensa Férrea",
        8: "Lanzarrocas",
        11: "Magnitud",
        15: "Golpe Roca",
        18: "Terremoto",
        22: "Avivar",
        27: "Tumba Rocas",
        33: "Explosión",
        38: "Doble Filo",
        44: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 223
    },
    
    // ------------------- PONY -------------------
    77: {
      id: 77,
      name: "Ponyta",
      types: ["Fuego"],
      baseStats: { hp: 50, atk: 85, def: 55, spa: 65, spd: 65, spe: 90 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ascuas",
        13: "Canto",
        17: "Llamarada",
        21: "Pisotón",
        25: "Giro Fuego",
        29: "Derribo",
        33: "Agilidad",
        37: "Lanzallamas"
      },
      evolution: { level: 40, to: 78 },
      catchRate: 190,
      expYield: 82
    },
    
    78: {
      id: 78,
      name: "Rapidash",
      types: ["Fuego"],
      baseStats: { hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ascuas",
        13: "Canto",
        17: "Llamarada",
        21: "Pisotón",
        25: "Giro Fuego",
        29: "Derribo",
        33: "Agilidad",
        37: "Lanzallamas",
        41: "Megacuerno"
      },
      evolution: null,
      catchRate: 60,
      expYield: 175
    },
    
    // ------------------- AGUA PSÍQUICA -------------------
    79: {
      id: 79,
      name: "Slowpoke",
      types: ["Agua", "Psíquico"],
      baseStats: { hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15 },
      moves: {
        1: "Confusión",
        5: "Gruñido",
        9: "Pistola Agua",
        14: "Cabeza de Hierro",
        19: "Confusión",
        23: "Desarme",
        28: "Onda",
        32: "Amnesia",
        36: "Psíquico",
        40: "Psicoonda"
      },
      evolution: { level: 37, to: 80 },
      catchRate: 190,
      expYield: 63
    },
    
    80: {
      id: 80,
      name: "Slowbro",
      types: ["Agua", "Psíquico"],
      baseStats: { hp: 95, atk: 75, def: 110, spa: 100, spd: 80, spe: 30 },
      moves: {
        1: "Confusión",
        5: "Gruñido",
        9: "Pistola Agua",
        14: "Cabeza de Hierro",
        19: "Confusión",
        23: "Desarme",
        28: "Onda",
        32: "Amnesia",
        36: "Psíquico",
        40: "Psicoonda",
        44: "Rayo Confuso",
        48: "Calma Mental"
      },
      evolution: null,
      catchRate: 75,
      expYield: 172
    },
    
    // ------------------- ELÉCTRICOS MAGNÉTICOS -------------------
    81: {
      id: 81,
      name: "Magnemite",
      types: ["Eléctrico", "Acero"],
      baseStats: { hp: 25, atk: 35, def: 70, spa: 95, spd: 55, spe: 45 },
      moves: {
        1: "Tackle",
        5: "Supersónico",
        7: "Chispazo",
        11: "Sonámbulo",
        13: "Rayo Confuso",
        17: "Trueno",
        19: "Magnetismo",
        23: "Rayo",
        25: "Barrera",
        29: "Psíquico",
        31: "Electrocañón"
      },
      evolution: { level: 30, to: 82 },
      catchRate: 190,
      expYield: 65
    },
    
    82: {
      id: 82,
      name: "Magneton",
      types: ["Eléctrico", "Acero"],
      baseStats: { hp: 50, atk: 60, def: 95, spa: 120, spd: 70, spe: 70 },
      moves: {
        1: "Tackle",
        5: "Supersónico",
        7: "Chispazo",
        11: "Sonámbulo",
        13: "Rayo Confuso",
        17: "Trueno",
        19: "Magnetismo",
        23: "Rayo",
        25: "Barrera",
        29: "Psíquico",
        33: "Electrocañón",
        37: "Triataque",
        41: "Zapatazo"
      },
      evolution: null,
      catchRate: 60,
      expYield: 163
    },
    
    // ------------------- PÁJAROS -------------------
    83: {
      id: 83,
      name: "Farfetch'd",
      types: ["Normal", "Volador"],
      baseStats: { hp: 52, atk: 65, def: 55, spa: 58, spd: 62, spe: 60 },
      moves: {
        1: "Picotazo",
        4: "Arenilla",
        7: "Ataque Ala",
        10: "Corte",
        13: "Furia",
        16: "Golpe Bajo",
        19: "Tajo Aéreo",
        22: "Espada",
        25: "Agilidad",
        28: "Falsa Tijera",
        31: "Golpe"
      },
      evolution: null,
      catchRate: 45,
      expYield: 94
    },
    
    84: {
      id: 84,
      name: "Doduo",
      types: ["Normal", "Volador"],
      baseStats: { hp: 35, atk: 85, def: 45, spa: 35, spd: 35, spe: 75 },
      moves: {
        1: "Picotazo",
        4: "Gruñido",
        8: "Ataque Rápido",
        12: "Furia",
        16: "Persecución",
        20: "Triataque",
        24: "Ataque Ala",
        28: "Doble Golpe",
        32: "Agilidad",
        36: "Pico Taladro"
      },
      evolution: { level: 31, to: 85 },
      catchRate: 190,
      expYield: 62
    },
    
    85: {
      id: 85,
      name: "Dodrio",
      types: ["Normal", "Volador"],
      baseStats: { hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 100 },
      moves: {
        1: "Picotazo",
        4: "Gruñido",
        8: "Ataque Rápido",
        12: "Furia",
        16: "Persecución",
        20: "Triataque",
        24: "Ataque Ala",
        28: "Doble Golpe",
        32: "Agilidad",
        36: "Pico Taladro",
        40: "Ataque Furioso"
      },
      evolution: null,
      catchRate: 45,
      expYield: 161
    },
    
    // ------------------- AGUA 3 -------------------
    86: {
      id: 86,
      name: "Seel",
      types: ["Agua"],
      baseStats: { hp: 65, atk: 45, def: 55, spa: 45, spd: 70, spe: 45 },
      moves: {
        1: "Cabezazo",
        4: "Gruñido",
        8: "Burbuja",
        12: "Canto",
        16: "Ataque Ala",
        20: "Rayo Burbuja",
        24: "Descanso",
        28: "Aurora",
        32: "Hielo Seco",
        36: "Takedown"
      },
      evolution: { level: 34, to: 87 },
      catchRate: 190,
      expYield: 65
    },
    
    87: {
      id: 87,
      name: "Dewgong",
      types: ["Agua", "Hielo"],
      baseStats: { hp: 90, atk: 70, def: 80, spa: 70, spd: 95, spe: 70 },
      moves: {
        1: "Cabezazo",
        4: "Gruñido",
        8: "Burbuja",
        12: "Canto",
        16: "Ataque Ala",
        20: "Rayo Burbuja",
        24: "Descanso",
        28: "Aurora",
        32: "Hielo Seco",
        36: "Takedown",
        40: "Viento Hielo",
        44: "Hidrobomba"
      },
      evolution: null,
      catchRate: 75,
      expYield: 166
    },
    
    // ------------------- VENENO GASEOSO -------------------
    88: {
      id: 88,
      name: "Grimer",
      types: ["Veneno"],
      baseStats: { hp: 80, atk: 80, def: 50, spa: 40, spd: 50, spe: 25 },
      moves: {
        1: "Lodo",
        4: "Endurecimiento",
        8: "Lanzamiento",
        12: "Bofetón Lodo",
        16: "Minimizar",
        20: "Bomba Lodo",
        24: "Toxi",
        28: "Bomba Ácida",
        32: "Fango",
        36: "Golpe Cuerpo",
        40: "Veneno"
      },
      evolution: { level: 38, to: 89 },
      catchRate: 190,
      expYield: 65
    },
    
    89: {
      id: 89,
      name: "Muk",
      types: ["Veneno"],
      baseStats: { hp: 105, atk: 105, def: 75, spa: 65, spd: 100, spe: 50 },
      moves: {
        1: "Lodo",
        4: "Endurecimiento",
        8: "Lanzamiento",
        12: "Bofetón Lodo",
        16: "Minimizar",
        20: "Bomba Lodo",
        24: "Toxi",
        28: "Bomba Ácida",
        32: "Fango",
        36: "Golpe Cuerpo",
        40: "Veneno",
        44: "Megaácido",
        48: "Gunk Shot"
      },
      evolution: null,
      catchRate: 75,
      expYield: 175
    },
    
    // ------------------- CONCHAS -------------------
    90: {
      id: 90,
      name: "Shellder",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 65, def: 100, spa: 45, spd: 25, spe: 40 },
      moves: {
        1: "Tackle",
        4: "Concha Filo",
        8: "Supersónico",
        12: "Rayo Burbuja",
        16: "Protección",
        20: "Ataque Rápido",
        24: "Aurora",
        28: "Concha Filo",
        32: "Rayo",
        36: "Explosión"
      },
      evolution: { item: "waterstone", to: 91 },
      catchRate: 190,
      expYield: 61
    },
    
    91: {
      id: 91,
      name: "Cloyster",
      types: ["Agua", "Hielo"],
      baseStats: { hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70 },
      moves: {
        1: "Tackle",
        4: "Concha Filo",
        8: "Supersónico",
        12: "Rayo Burbuja",
        16: "Protección",
        20: "Ataque Rápido",
        24: "Aurora",
        28: "Concha Filo",
        32: "Rayo",
        36: "Explosión",
        40: "Viento Hielo",
        44: "Hidrobomba"
      },
      evolution: null,
      catchRate: 60,
      expYield: 184
    },
    
    // ------------------- FANTASMAS -------------------
    92: {
      id: 92,
      name: "Gastly",
      types: ["Fantasma", "Veneno"],
      baseStats: { hp: 30, atk: 35, def: 30, spa: 100, spd: 35, spe: 80 },
      moves: {
        1: "Lengüetazo",
        4: "Hipnosis",
        8: "Rayo Confuso",
        12: "Niebla",
        16: "Susto",
        20: "Bola Sombra",
        24: "Mimético",
        28: "Hipnosis",
        32: "Sueño",
        36: "Destino"
      },
      evolution: { level: 25, to: 93 },
      catchRate: 190,
      expYield: 62
    },
    
    93: {
      id: 93,
      name: "Haunter",
      types: ["Fantasma", "Veneno"],
      baseStats: { hp: 45, atk: 50, def: 45, spa: 115, spd: 55, spe: 95 },
      moves: {
        1: "Lengüetazo",
        4: "Hipnosis",
        8: "Rayo Confuso",
        12: "Niebla",
        16: "Susto",
        20: "Bola Sombra",
        24: "Mimético",
        28: "Hipnosis",
        32: "Sueño",
        36: "Destino",
        40: "Psíquico"
      },
      evolution: { trade: true, to: 94 },
      catchRate: 90,
      expYield: 142
    },
    
    94: {
      id: 94,
      name: "Gengar",
      types: ["Fantasma", "Veneno"],
      baseStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
      moves: {
        1: "Lengüetazo",
        4: "Hipnosis",
        8: "Rayo Confuso",
        12: "Niebla",
        16: "Susto",
        20: "Bola Sombra",
        24: "Mimético",
        28: "Hipnosis",
        32: "Sueño",
        36: "Destino",
        40: "Psíquico",
        44: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 225
    },
    
    // ------------------- ROCA -------------------
    95: {
      id: 95,
      name: "Onix",
      types: ["Roca", "Tierra"],
      baseStats: { hp: 35, atk: 45, def: 160, spa: 30, spd: 45, spe: 70 },
      moves: {
        1: "Lanzarrocas",
        1: "Atadura",
        10: "Tumba Rocas",
        14: "Furia",
        18: "Terremoto",
        22: "Excavar",
        25: "Velocidad",
        30: "Roca Afilada",
        35: "Látigo",
        40: "Derribo",
        45: "Doble Filo"
      },
      evolution: { trade: true, with: "metalcoat", to: 208 },
      catchRate: 45,
      expYield: 77
    },
    
    // ------------------- PSÍQUICOS 2 -------------------
    96: {
      id: 96,
      name: "Drowzee",
      types: ["Psíquico"],
      baseStats: { hp: 60, atk: 48, def: 45, spa: 43, spd: 90, spe: 42 },
      moves: {
        1: "Confusión",
        5: "Hipnosis",
        9: "Dedo Paralisis",
        13: "Cabezazo",
        17: "Psicorrayo",
        21: "Meditación",
        25: "Psíquico",
        29: "Psicoonda",
        33: "Futuro",
        37: "Calma Mental"
      },
      evolution: { level: 26, to: 97 },
      catchRate: 190,
      expYield: 66
    },
    
    97: {
      id: 97,
      name: "Hypno",
      types: ["Psíquico"],
      baseStats: { hp: 85, atk: 73, def: 70, spa: 73, spd: 115, spe: 67 },
      moves: {
        1: "Confusión",
        5: "Hipnosis",
        9: "Dedo Paralisis",
        13: "Cabezazo",
        17: "Psicorrayo",
        21: "Meditación",
        25: "Psíquico",
        29: "Psicoonda",
        33: "Futuro",
        37: "Calma Mental",
        41: "Destino",
        45: "Barrena"
      },
      evolution: null,
      catchRate: 75,
      expYield: 169
    },
    
    // ------------------- CANGREJOS -------------------
    98: {
      id: 98,
      name: "Krabby",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 105, def: 90, spa: 25, spd: 25, spe: 50 },
      moves: {
        1: "Burbuja",
        4: "Tajo",
        8: "Vicio",
        12: "Tajo",
        16: "Fuerza",
        20: "Tijera X",
        24: "Agarre",
        28: "Concha Filo",
        32: "Guillotina",
        36: "Crabhammer"
      },
      evolution: { level: 28, to: 99 },
      catchRate: 225,
      expYield: 65
    },
    
    99: {
      id: 99,
      name: "Kingler",
      types: ["Agua"],
      baseStats: { hp: 55, atk: 130, def: 115, spa: 50, spd: 50, spe: 75 },
      moves: {
        1: "Burbuja",
        4: "Tajo",
        8: "Vicio",
        12: "Tajo",
        16: "Fuerza",
        20: "Tijera X",
        24: "Agarre",
        28: "Concha Filo",
        32: "Guillotina",
        36: "Crabhammer",
        40: "Martillazo",
        44: "Hiperrayo"
      },
      evolution: null,
      catchRate: 60,
      expYield: 166
    },
    
    // ------------------- ELÉCTRICOS 2 -------------------
    100: {
      id: 100,
      name: "Voltorb",
      types: ["Eléctrico"],
      baseStats: { hp: 40, atk: 30, def: 50, spa: 55, spd: 55, spe: 100 },
      moves: {
        1: "Tackle",
        4: "Sonámbulo",
        8: "Chispazo",
        12: "Rayo Confuso",
        16: "Bomba Sónica",
        20: "Rayo",
        24: "Explosión",
        28: "Trueno",
        32: "Espejo",
        36: "Electrocañón"
      },
      evolution: { level: 30, to: 101 },
      catchRate: 190,
      expYield: 66
    },
    
    101: {
      id: 101,
      name: "Electrode",
      types: ["Eléctrico"],
      baseStats: { hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 140 },
      moves: {
        1: "Tackle",
        4: "Sonámbulo",
        8: "Chispazo",
        12: "Rayo Confuso",
        16: "Bomba Sónica",
        20: "Rayo",
        24: "Explosión",
        28: "Trueno",
        32: "Espejo",
        36: "Electrocañón",
        40: "Carga",
        44: "Zapatazo"
      },
      evolution: null,
      catchRate: 60,
      expYield: 172
    },
    
    // ------------------- HUEVOS -------------------
    102: {
      id: 102,
      name: "Exeggcute",
      types: ["Planta", "Psíquico"],
      baseStats: { hp: 60, atk: 40, def: 80, spa: 60, spd: 45, spe: 40 },
      moves: {
        1: "Barrera",
        4: "Confusión",
        8: "Hipnosis",
        12: "Reflejo",
        16: "Lanzamiento",
        20: "Psicoonda",
        24: "Síntesis",
        28: "Rayo Lunar",
        32: "Huevo Bomba",
        36: "Psíquico"
      },
      evolution: { item: "leafstone", to: 103 },
      catchRate: 90,
      expYield: 65
    },
    
    103: {
      id: 103,
      name: "Exeggutor",
      types: ["Planta", "Psíquico"],
      baseStats: { hp: 95, atk: 95, def: 85, spa: 125, spd: 65, spe: 55 },
      moves: {
        1: "Confusión",
        4: "Hipnosis",
        8: "Reflejo",
        12: "Lanzamiento",
        16: "Psicoonda",
        20: "Síntesis",
        24: "Rayo Lunar",
        28: "Huevo Bomba",
        32: "Psíquico",
        36: "Rayo Solar",
        40: "Semilladora"
      },
      evolution: null,
      catchRate: 45,
      expYield: 182
    },
    
    // ------------------- HUESOS -------------------
    104: {
      id: 104,
      name: "Cubone",
      types: ["Tierra"],
      baseStats: { hp: 50, atk: 50, def: 95, spa: 40, spd: 50, spe: 35 },
      moves: {
        1: "Hueso Palo",
        4: "Gruñido",
        8: "Golpe Cabeza",
        12: "Foco Energía",
        16: "Furia",
        20: "Huesomerang",
        24: "Falsa Lágrima",
        28: "Giro",
        32: "Frustración",
        36: "Hueso"
      },
      evolution: { level: 28, to: 105 },
      catchRate: 190,
      expYield: 64
    },
    
    105: {
      id: 105,
      name: "Marowak",
      types: ["Tierra"],
      baseStats: { hp: 60, atk: 80, def: 110, spa: 50, spd: 80, spe: 45 },
      moves: {
        1: "Hueso Palo",
        4: "Gruñido",
        8: "Golpe Cabeza",
        12: "Foco Energía",
        16: "Furia",
        20: "Huesomerang",
        24: "Falsa Lágrima",
        28: "Giro",
        32: "Frustración",
        36: "Hueso",
        40: "Terremoto",
        44: "Golpe"
      },
      evolution: null,
      catchRate: 75,
      expYield: 149
    },
    
    // ------------------- LUCHA 2 -------------------
    106: {
      id: 106,
      name: "Hitmonlee",
      types: ["Lucha"],
      baseStats: { hp: 50, atk: 120, def: 53, spa: 35, spd: 110, spe: 87 },
      moves: {
        1: "Patada Baja",
        4: "Foco Energía",
        8: "Doble Patada",
        12: "Giro Patada",
        16: "Salto",
        20: "Patada Salto Alta",
        24: "Mega Patada",
        28: "Agilidad",
        32: "Patada Ígnea",
        36: "Patada Trueno",
        40: "Patada Sónica"
      },
      evolution: null,
      catchRate: 45,
      expYield: 139
    },
    
    107: {
      id: 107,
      name: "Hitmonchan",
      types: ["Lucha"],
      baseStats: { hp: 50, atk: 105, def: 79, spa: 35, spd: 110, spe: 76 },
      moves: {
        1: "Puño Cometa",
        4: "Agilidad",
        8: "Puño Fuego",
        12: "Puño Trueno",
        16: "Puño Hielo",
        20: "Puño Increíble",
        24: "Puño Dinámico",
        28: "Contraataque",
        32: "Ataque Rápido",
        36: "Megapuño",
        40: "Golpe"
      },
      evolution: null,
      catchRate: 45,
      expYield: 140
    },
    
    // ------------------- LICKS -------------------
    108: {
      id: 108,
      name: "Lickitung",
      types: ["Normal"],
      baseStats: { hp: 90, atk: 55, def: 75, spa: 60, spd: 75, spe: 30 },
      moves: {
        1: "Lengüetazo",
        4: "Supersónico",
        8: "Defensa Acida",
        12: "Triturar",
        16: "Golpe Cuerpo",
        20: "Doble Bofetón",
        24: "Golpe",
        28: "Doble Filo",
        32: "Amnesia",
        36: "Lengüetazo",
        40: "Barrena"
      },
      evolution: null,
      catchRate: 45,
      expYield: 77
    },
    
    // ------------------- VENENO GAS -------------------
    109: {
      id: 109,
      name: "Koffing",
      types: ["Veneno"],
      baseStats: { hp: 40, atk: 65, def: 95, spa: 60, spd: 45, spe: 35 },
      moves: {
        1: "Niebla",
        4: "Gas",
        8: "Humo",
        12: "Lodo",
        16: "Autodestrucción",
        20: "Bomba Lodo",
        24: "Toxi",
        28: "Bomba Ácida",
        32: "Explosión",
        36: "Destino"
      },
      evolution: { level: 35, to: 110 },
      catchRate: 190,
      expYield: 68
    },
    
    110: {
      id: 110,
      name: "Weezing",
      types: ["Veneno"],
      baseStats: { hp: 65, atk: 90, def: 120, spa: 85, spd: 70, spe: 60 },
      moves: {
        1: "Niebla",
        4: "Gas",
        8: "Humo",
        12: "Lodo",
        16: "Autodestrucción",
        20: "Bomba Lodo",
        24: "Toxi",
        28: "Bomba Ácida",
        32: "Explosión",
        36: "Destino",
        40: "Megaácido",
        44: "Gunk Shot"
      },
      evolution: null,
      catchRate: 60,
      expYield: 172
    },
    
    // ------------------- RINOCERONTE -------------------
    111: {
      id: 111,
      name: "Rhyhorn",
      types: ["Tierra", "Roca"],
      baseStats: { hp: 80, atk: 85, def: 95, spa: 30, spd: 30, spe: 25 },
      moves: {
        1: "Cornada",
        4: "Cola Férrea",
        8: "Furia",
        12: "Pisotón",
        16: "Derribo",
        20: "Ataque Roca",
        24: "Terremoto",
        28: "Megacuerno",
        32: "Doble Filo",
        36: "Roca Afilada"
      },
      evolution: { level: 42, to: 112 },
      catchRate: 120,
      expYield: 69
    },
    
    112: {
      id: 112,
      name: "Rhydon",
      types: ["Tierra", "Roca"],
      baseStats: { hp: 105, atk: 130, def: 120, spa: 45, spd: 45, spe: 40 },
      moves: {
        1: "Cornada",
        4: "Cola Férrea",
        8: "Furia",
        12: "Pisotón",
        16: "Derribo",
        20: "Ataque Roca",
        24: "Terremoto",
        28: "Megacuerno",
        32: "Doble Filo",
        36: "Roca Afilada",
        40: "Perforador",
        44: "Megapatada"
      },
      evolution: { trade: true, with: "protector", to: 464 },
      catchRate: 60,
      expYield: 170
    },
    
    // ------------------- HUEVO -------------------
    113: {
      id: 113,
      name: "Chansey",
      types: ["Normal"],
      baseStats: { hp: 250, atk: 5, def: 5, spa: 35, spd: 105, spe: 50 },
      moves: {
        1: "Doble Bofetón",
        4: "Canto",
        8: "Huevo Bomba",
        12: "Luz Terapéutica",
        16: "Minimizar",
        20: "Reflejo",
        24: "Suave Voz",
        28: "Doble Filo",
        32: "Onda",
        36: "Huevo Bomba",
        40: "Hiperrayo"
      },
      evolution: { friendship: 220, to: 242 },
      catchRate: 30,
      expYield: 395
    },
    
    // ------------------- PLANTAS 3 -------------------
    114: {
      id: 114,
      name: "Tangela",
      types: ["Planta"],
      baseStats: { hp: 65, atk: 55, def: 115, spa: 100, spd: 40, spe: 60 },
      moves: {
        1: "Constricción",
        4: "Absorber",
        8: "Látigo Cepa",
        12: "Polvo Veneno",
        16: "Látigo",
        20: "Crecimiento",
        24: "Megaácido",
        28: "Latigazo",
        32: "Reflejo",
        36: "Giga Drenado"
      },
      evolution: null,
      catchRate: 45,
      expYield: 87
    },
    
    // ------------------- CANGURO -------------------
    115: {
      id: 115,
      name: "Kangaskhan",
      types: ["Normal"],
      baseStats: { hp: 105, atk: 95, def: 80, spa: 40, spd: 80, spe: 90 },
      moves: {
        1: "Comet Punch",
        4: "Gruñido",
        8: "Mordisco",
        12: "Doble Bofetón",
        16: "Golpe Rápido",
        20: "Golpe",
        24: "Furia",
        28: "Doble Filo",
        32: "Sumisión",
        36: "Contraataque",
        40: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 172
    },
    
    // ------------------- AGUA 4 -------------------
    116: {
      id: 116,
      name: "Horsea",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 40, def: 70, spa: 70, spd: 25, spe: 60 },
      moves: {
        1: "Burbuja",
        4: "Humo",
        8: "Foco Energía",
        12: "Rayo Burbuja",
        16: "Agilidad",
        20: "Hidropulso",
        24: "Dragoaliento",
        28: "Doble Equipo",
        32: "Hidrobomba",
        36: "Rayo"
      },
      evolution: { level: 32, to: 117 },
      catchRate: 225,
      expYield: 59
    },
    
    117: {
      id: 117,
      name: "Seadra",
      types: ["Agua"],
      baseStats: { hp: 55, atk: 65, def: 95, spa: 95, spd: 45, spe: 85 },
      moves: {
        1: "Burbuja",
        4: "Humo",
        8: "Foco Energía",
        12: "Rayo Burbuja",
        16: "Agilidad",
        20: "Hidropulso",
        24: "Dragoaliento",
        28: "Doble Equipo",
        32: "Hidrobomba",
        36: "Rayo",
        40: "Torbellino"
      },
      evolution: { trade: true, with: "dragonscale", to: 230 },
      catchRate: 75,
      expYield: 154
    },
    
    // ------------------- PECES -------------------
    118: {
      id: 118,
      name: "Goldeen",
      types: ["Agua"],
      baseStats: { hp: 45, atk: 67, def: 60, spa: 35, spd: 50, spe: 63 },
      moves: {
        1: "Picotazo",
        4: "Supersónico",
        8: "Cornada",
        12: "Furia",
        16: "Cascada",
        20: "Aguja Doble",
        24: "Furia",
        28: "Megacuerno",
        32: "Hidrobomba",
        36: "Ataque Furioso"
      },
      evolution: { level: 33, to: 119 },
      catchRate: 225,
      expYield: 64
    },
    
    119: {
      id: 119,
      name: "Seaking",
      types: ["Agua"],
      baseStats: { hp: 80, atk: 92, def: 65, spa: 65, spd: 80, spe: 68 },
      moves: {
        1: "Picotazo",
        4: "Supersónico",
        8: "Cornada",
        12: "Furia",
        16: "Cascada",
        20: "Aguja Doble",
        24: "Furia",
        28: "Megacuerno",
        32: "Hidrobomba",
        36: "Ataque Furioso",
        40: "Cornada"
      },
      evolution: null,
      catchRate: 60,
      expYield: 158
    },
    
    // ------------------- ESTRELLAS -------------------
    120: {
      id: 120,
      name: "Staryu",
      types: ["Agua"],
      baseStats: { hp: 30, atk: 45, def: 55, spa: 70, spd: 55, spe: 85 },
      moves: {
        1: "Tackle",
        4: "Rayo Burbuja",
        8: "Rayo Confuso",
        12: "Rayo Rápido",
        16: "Minimizar",
        20: "Psicorrayo",
        24: "Burbuja",
        28: "Recuperación",
        32: "Rayo",
        36: "Hidrobomba"
      },
      evolution: { item: "waterstone", to: 121 },
      catchRate: 225,
      expYield: 68
    },
    
    121: {
      id: 121,
      name: "Starmie",
      types: ["Agua", "Psíquico"],
      baseStats: { hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115 },
      moves: {
        1: "Tackle",
        4: "Rayo Burbuja",
        8: "Rayo Confuso",
        12: "Rayo Rápido",
        16: "Minimizar",
        20: "Psicorrayo",
        24: "Burbuja",
        28: "Recuperación",
        32: "Rayo",
        36: "Hidrobomba",
        40: "Psíquico"
      },
      evolution: null,
      catchRate: 60,
      expYield: 182
    },
    
    // ------------------- PSÍQUICOS HIELO -------------------
    122: {
      id: 122,
      name: "Mr. Mime",
      types: ["Psíquico", "Hada"],
      baseStats: { hp: 40, atk: 45, def: 65, spa: 100, spd: 120, spe: 90 },
      moves: {
        1: "Barrera",
        4: "Confusión",
        8: "Doble Bofetón",
        12: "Mimético",
        16: "Luz",
        20: "Reflejo",
        24: "Psíquico",
        28: "Sustituto",
        32: "Calma Mental",
        36: "Destino"
      },
      evolution: null,
      catchRate: 45,
      expYield: 136
    },
    
    // ------------------- INSECTOS 2 -------------------
    123: {
      id: 123,
      name: "Scyther",
      types: ["Bicho", "Volador"],
      baseStats: { hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105 },
      moves: {
        1: "Ataque Rápido",
        4: "Foco Energía",
        8: "Doble Ataque",
        12: "Ataque Ala",
        16: "Furia",
        20: "Falsa Tijera",
        24: "Agilidad",
        28: "Cuchillada",
        32: "Tajo Aéreo",
        36: "Tijera X"
      },
      evolution: { trade: true, with: "metalcoat", to: 212 },
      catchRate: 45,
      expYield: 100
    },
    
    // ------------------- HIELO -------------------
    124: {
      id: 124,
      name: "Jynx",
      types: ["Hielo", "Psíquico"],
      baseStats: { hp: 65, atk: 50, def: 35, spa: 115, spd: 95, spe: 95 },
      moves: {
        1: "Besolágrima",
        4: "Lengüetazo",
        8: "Polvo Nieve",
        12: "Doble Bofetón",
        16: "Confusión",
        20: "Canto",
        24: "Hielo Seco",
        28: "Psíquico",
        32: "Frio Polar",
        36: "Aurora",
        40: "Perfume"
      },
      evolution: null,
      catchRate: 45,
      expYield: 137
    },
    
    // ------------------- ELÉCTRICOS 3 -------------------
    125: {
      id: 125,
      name: "Electabuzz",
      types: ["Eléctrico"],
      baseStats: { hp: 65, atk: 83, def: 57, spa: 95, spd: 85, spe: 105 },
      moves: {
        1: "Impactrueno",
        4: "Rayo",
        8: "Ataque Rápido",
        12: "Rayo Confuso",
        16: "Velocidad",
        20: "Chispazo",
        24: "Trueno",
        28: "Luz",
        32: "Puño Trueno",
        36: "Electrocañón"
      },
      evolution: { trade: true, with: "electirizer", to: 466 },
      catchRate: 45,
      expYield: 172
    },
    
    // ------------------- FUEGO -------------------
    126: {
      id: 126,
      name: "Magmar",
      types: ["Fuego"],
      baseStats: { hp: 65, atk: 95, def: 57, spa: 100, spd: 85, spe: 93 },
      moves: {
        1: "Ascuas",
        4: "Humo",
        8: "Brasas",
        12: "Niebla",
        16: "Fuego Fatuo",
        20: "Giro Fuego",
        24: "Confusión",
        28: "Lanzallamas",
        32: "Psíquico",
        36: "Flamethrower"
      },
      evolution: { trade: true, with: "magmarizer", to: 467 },
      catchRate: 45,
      expYield: 173
    },
    
    // ------------------- INSECTOS 3 -------------------
    127: {
      id: 127,
      name: "Pinsir",
      types: ["Bicho"],
      baseStats: { hp: 65, atk: 125, def: 100, spa: 55, spd: 70, spe: 85 },
      moves: {
        1: "Agarre",
        4: "Foco Energía",
        8: "Vicio",
        12: "Arañazo",
        16: "Seismic Toss",
        20: "Sumisión",
        24: "Tijera X",
        28: "Guillotina",
        32: "Megacuerno",
        36: "Súper Diente"
      },
      evolution: null,
      catchRate: 45,
      expYield: 175
    },
    
    // ------------------- TAURO -------------------
    128: {
      id: 128,
      name: "Tauros",
      types: ["Normal"],
      baseStats: { hp: 75, atk: 100, def: 95, spa: 40, spd: 70, spe: 110 },
      moves: {
        1: "Placaje",
        4: "Furia",
        8: "Cornada",
        12: "Restricción",
        16: "Derribo",
        20: "Takedown",
        24: "Descanso",
        28: "Doble Filo",
        32: "Megacuerno",
        36: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 172
    },
    
    // ------------------- PECES 2 -------------------
    129: {
      id: 129,
      name: "Magikarp",
      types: ["Agua"],
      baseStats: { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 },
      moves: {
        1: "Placaje",
        15: "Salpicadura"
      },
      evolution: { level: 20, to: 130 },
      catchRate: 255,
      expYield: 40
    },
    
    130: {
      id: 130,
      name: "Gyarados",
      types: ["Agua", "Volador"],
      baseStats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 },
      moves: {
        1: "Mordisco",
        20: "Torbellino",
        25: "Dragon Rage",
        30: "Hidrobomba",
        35: "Hiperrayo",
        40: "Lluvia",
        45: "Hidropulso",
        50: "Ataque Furioso",
        55: "Hidrobomba"
      },
      evolution: null,
      catchRate: 45,
      expYield: 189
    },
    
    // ------------------- LAPRAS -------------------
    131: {
      id: 131,
      name: "Lapras",
      types: ["Agua", "Hielo"],
      baseStats: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 },
      moves: {
        1: "Canto",
        4: "Niebla",
        8: "Confusión",
        12: "Rayo Burbuja",
        16: "Cuerpo Pesado",
        20: "Hielo Seco",
        24: "Lluvia",
        28: "Perforador",
        32: "Hidrobomba",
        36: "Frio Polar",
        40: "Psíquico"
      },
      evolution: null,
      catchRate: 45,
      expYield: 187
    },
    
    // ------------------- DITTO -------------------
    132: {
      id: 132,
      name: "Ditto",
      types: ["Normal"],
      baseStats: { hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48 },
      moves: {
        1: "Transformación"
      },
      evolution: null,
      catchRate: 35,
      expYield: 101
    },
    
    // ------------------- EVEE Y EEVOLUCIONES -------------------
    133: {
      id: 133,
      name: "Eevee",
      types: ["Normal"],
      baseStats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ataque Rápido",
        12: "Mordisco",
        16: "Cola Férrea",
        20: "Doble Filo",
        24: "Doble Equipo",
        28: "Doble Bofetón",
        32: "Última Baza",
        36: "Golpe"
      },
      evolution: { 
        waterstone: 134,
        thunderstone: 135,
        firestone: 136,
        friendship_day: 196,
        friendship_night: 197
      },
      catchRate: 45,
      expYield: 65
    },
    
    134: {
      id: 134,
      name: "Vaporeon",
      types: ["Agua"],
      baseStats: { hp: 130, atk: 65, def: 60, spa: 110, spd: 95, spe: 65 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ataque Rápido",
        12: "Mordisco",
        16: "Cola Férrea",
        20: "Doble Filo",
        24: "Burbuja",
        28: "Rayo Burbuja",
        32: "Niebla",
        36: "Hidrobomba",
        40: "Última Baza"
      },
      evolution: null,
      catchRate: 45,
      expYield: 184
    },
    
    135: {
      id: 135,
      name: "Jolteon",
      types: ["Eléctrico"],
      baseStats: { hp: 65, atk: 65, def: 60, spa: 110, spd: 95, spe: 130 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ataque Rápido",
        12: "Mordisco",
        16: "Cola Férrea",
        20: "Doble Filo",
        24: "Impactrueno",
        28: "Rayo",
        32: "Doble Equipo",
        36: "Agilidad",
        40: "Trueno"
      },
      evolution: null,
      catchRate: 45,
      expYield: 184
    },
    
    136: {
      id: 136,
      name: "Flareon",
      types: ["Fuego"],
      baseStats: { hp: 65, atk: 130, def: 60, spa: 95, spd: 110, spe: 65 },
      moves: {
        1: "Placaje",
        4: "Gruñido",
        8: "Ataque Rápido",
        12: "Mordisco",
        16: "Cola Férrea",
        20: "Doble Filo",
        24: "Ascuas",
        28: "Giro Fuego",
        32: "Furia",
        36: "Lanzallamas",
        40: "Infierno"
      },
      evolution: null,
      catchRate: 45,
      expYield: 184
    },
    
    // ------------------- PORYGON -------------------
    137: {
      id: 137,
      name: "Porygon",
      types: ["Normal"],
      baseStats: { hp: 65, atk: 60, def: 70, spa: 85, spd: 75, spe: 40 },
      moves: {
        1: "Tackle",
        4: "Conversión",
        8: "Psicorrayo",
        12: "Agilidad",
        16: "Recuperación",
        20: "Rayo",
        24: "Triataque",
        28: "Conversión 2",
        32: "Zapatazo",
        36: "Bloqueo"
      },
      evolution: { trade: true, with: "upgrade", to: 233 },
      catchRate: 45,
      expYield: 79
    },
    
    // ------------------- FÓSILES -------------------
    138: {
      id: 138,
      name: "Omanyte",
      types: ["Roca", "Agua"],
      baseStats: { hp: 35, atk: 40, def: 100, spa: 90, spd: 55, spe: 35 },
      moves: {
        1: "Constricción",
        4: "Retracción",
        8: "Lanzarrocas",
        12: "Mordisco",
        16: "Rayo Burbuja",
        20: "Protección",
        24: "Pistola Agua",
        28: "Hidropulso",
        32: "Roca Afilada",
        36: "Hidrobomba"
      },
      evolution: { level: 40, to: 139 },
      catchRate: 45,
      expYield: 71
    },
    
    139: {
      id: 139,
      name: "Omastar",
      types: ["Roca", "Agua"],
      baseStats: { hp: 70, atk: 60, def: 125, spa: 115, spd: 70, spe: 55 },
      moves: {
        1: "Constricción",
        4: "Retracción",
        8: "Lanzarrocas",
        12: "Mordisco",
        16: "Rayo Burbuja",
        20: "Protección",
        24: "Pistola Agua",
        28: "Hidropulso",
        32: "Roca Afilada",
        36: "Hidrobomba",
        40: "Rayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 173
    },
    
    140: {
      id: 140,
      name: "Kabuto",
      types: ["Roca", "Agua"],
      baseStats: { hp: 30, atk: 80, def: 90, spa: 55, spd: 45, spe: 55 },
      moves: {
        1: "Arañazo",
        4: "Endurecimiento",
        8: "Absorber",
        12: "Lanzarrocas",
        16: "Furia",
        20: "Megaácido",
        24: "Rayo Burbuja",
        28: "Corte",
        32: "Roca Afilada",
        36: "Hidrobomba"
      },
      evolution: { level: 40, to: 141 },
      catchRate: 45,
      expYield: 71
    },
    
    141: {
      id: 141,
      name: "Kabutops",
      types: ["Roca", "Agua"],
      baseStats: { hp: 60, atk: 115, def: 105, spa: 65, spd: 70, spe: 80 },
      moves: {
        1: "Arañazo",
        4: "Endurecimiento",
        8: "Absorber",
        12: "Lanzarrocas",
        16: "Furia",
        20: "Megaácido",
        24: "Rayo Burbuja",
        28: "Corte",
        32: "Roca Afilada",
        36: "Hidrobomba",
        40: "Tajo Aéreo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 173
    },
    
    // ------------------- AERODACTYL -------------------
    142: {
      id: 142,
      name: "Aerodactyl",
      types: ["Roca", "Volador"],
      baseStats: { hp: 80, atk: 105, def: 65, spa: 60, spd: 75, spe: 130 },
      moves: {
        1: "Mordisco",
        4: "Agilidad",
        8: "Ala de Acero",
        12: "Tajo Aéreo",
        16: "Garra Dragón",
        20: "Derribo",
        24: "Terremoto",
        28: "Hiperrayo",
        32: "Vuelo",
        36: "Garra Umbría"
      },
      evolution: null,
      catchRate: 45,
      expYield: 180
    },
    
    // ------------------- SNORLAX -------------------
    143: {
      id: 143,
      name: "Snorlax",
      types: ["Normal"],
      baseStats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
      moves: {
        1: "Placaje",
        4: "Amnesia",
        8: "Descanso",
        12: "Golpe Cabeza",
        16: "Ronquido",
        20: "Doble Bofetón",
        24: "Golpe Cuerpo",
        28: "Doble Filo",
        32: "Hiperrayo",
        36: "Terremoto",
        40: "Descanso"
      },
      evolution: null,
      catchRate: 25,
      expYield: 189
    },
    
    // ------------------- LEGENDARIOS -------------------
    144: {
      id: 144,
      name: "Articuno",
      types: ["Hielo", "Volador"],
      baseStats: { hp: 90, atk: 85, def: 100, spa: 95, spd: 125, spe: 85 },
      moves: {
        1: "Viento Hielo",
        10: "Niebla",
        20: "Rayo Confuso",
        30: "Rayo Burbuja",
        40: "Hielo Seco",
        50: "Reflejo",
        60: "Vuelo",
        70: "Frio Polar",
        80: "Blizzard",
        90: "Recuperación"
      },
      evolution: null,
      catchRate: 3,
      expYield: 261
    },
    
    145: {
      id: 145,
      name: "Zapdos",
      types: ["Eléctrico", "Volador"],
      baseStats: { hp: 90, atk: 90, def: 85, spa: 125, spd: 90, spe: 100 },
      moves: {
        1: "Picotazo",
        10: "Rayo",
        20: "Detectar",
        30: "Rayo Confuso",
        40: "Rayo",
        50: "Reflejo",
        60: "Vuelo",
        70: "Trueno",
        80: "Drill Peck",
        90: "Agilidad"
      },
      evolution: null,
      catchRate: 3,
      expYield: 261
    },
    
    146: {
      id: 146,
      name: "Moltres",
      types: ["Fuego", "Volador"],
      baseStats: { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 },
      moves: {
        1: "Picotazo",
        10: "Ascuas",
        20: "Fuego Fatuo",
        30: "Rayo Confuso",
        40: "Giro Fuego",
        50: "Reflejo",
        60: "Vuelo",
        70: "Lanzallamas",
        80: "Ataque Ala",
        90: "Infierno"
      },
      evolution: null,
      catchRate: 3,
      expYield: 261
    },
    
    // ------------------- DRAGONES -------------------
    147: {
      id: 147,
      name: "Dratini",
      types: ["Dragón"],
      baseStats: { hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50 },
      moves: {
        1: "Envoltura",
        5: "Gruñido",
        10: "Garra Dragón",
        15: "Agilidad",
        20: "Dragon Rage",
        25: "Giro",
        30: "Hiperrayo",
        35: "Garra Dragón",
        40: "Doble Filo"
      },
      evolution: { level: 30, to: 148 },
      catchRate: 45,
      expYield: 60
    },
    
    148: {
      id: 148,
      name: "Dragonair",
      types: ["Dragón"],
      baseStats: { hp: 61, atk: 84, def: 65, spa: 70, spd: 70, spe: 70 },
      moves: {
        1: "Envoltura",
        5: "Gruñido",
        10: "Garra Dragón",
        15: "Agilidad",
        20: "Dragon Rage",
        25: "Giro",
        30: "Hiperrayo",
        35: "Garra Dragón",
        40: "Doble Filo",
        45: "Rayo",
        50: "Hidrobomba"
      },
      evolution: { level: 55, to: 149 },
      catchRate: 45,
      expYield: 147
    },
    
    149: {
      id: 149,
      name: "Dragonite",
      types: ["Dragón", "Volador"],
      baseStats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },
      moves: {
        1: "Envoltura",
        5: "Gruñido",
        10: "Garra Dragón",
        15: "Agilidad",
        20: "Dragon Rage",
        25: "Giro",
        30: "Hiperrayo",
        35: "Garra Dragón",
        40: "Doble Filo",
        45: "Rayo",
        50: "Hidrobomba",
        55: "Vuelo",
        60: "Hiperrayo"
      },
      evolution: null,
      catchRate: 45,
      expYield: 270
    },
    
    // ------------------- MEWTWO -------------------
    150: {
      id: 150,
      name: "Mewtwo",
      types: ["Psíquico"],
      baseStats: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 },
      moves: {
        1: "Confusión",
        10: "Desarme",
        20: "Barrena",
        30: "Psíquico",
        40: "Amnesia",
        50: "Recuperación",
        60: "Futuro",
        70: "Psíquico",
        80: "Mimético",
        90: "Barrena Psíquica"
      },
      evolution: null,
      catchRate: 3,
      expYield: 306
    },
    
    // ------------------- MEW -------------------
    151: {
      id: 151,
      name: "Mew",
      types: ["Psíquico"],
      baseStats: { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 },
      moves: {
        1: "Placaje",
        10: "Transformación",
        20: "Metrónomo",
        30: "Psíquico",
        40: "Amnesia",
        50: "Recuperación",
        60: "Futuro",
        70: "Mimético",
        80: "Metrónomo",
        90: "Transformación"
      },
      evolution: null,
      catchRate: 45,
      expYield: 270
    }
  },
  
  moves: {
    // Agregué TODOS los movimientos que aparecen en los Pokémon arriba
    "Placaje": { type: "Normal", power: 40, accuracy: 100, pp: 35 },
    "Lanzallamas": { type: "Fuego", power: 90, accuracy: 100, pp: 15 },
    "Hidrobomba": { type: "Agua", power: 110, accuracy: 80, pp: 5 },
    "Rayo Solar": { type: "Planta", power: 120, accuracy: 100, pp: 10, charge: true },
    "Impactrueno": { type: "Eléctrico", power: 40, accuracy: 100, pp: 30 },
    "Trueno": { type: "Eléctrico", power: 110, accuracy: 70, pp: 10 },
    "Terremoto": { type: "Tierra", power: 100, accuracy: 100, pp: 10 },
    "Psíquico": { type: "Psíquico", power: 90, accuracy: 100, pp: 10 },
    "Lanzarrocas": { type: "Roca", power: 50, accuracy: 90, pp: 15 },
    "Bola Sombra": { type: "Fantasma", power: 80, accuracy: 100, pp: 15 },
    "Ataque Ala": { type: "Volador", power: 60, accuracy: 100, pp: 35 },
    "Garra Dragón": { type: "Dragón", power: 80, accuracy: 100, pp: 15 },
    "Pistola Agua": { type: "Agua", power: 40, accuracy: 100, pp: 25 },
    "Ascuas": { type: "Fuego", power: 40, accuracy: 100, pp: 25 },
    "Burbuja": { type: "Agua", power: 40, accuracy: 100, pp: 30 },
    "Rayo Confuso": { type: "Psíquico", power: 50, accuracy: 100, pp: 25, effect: "confusion" },
    "Somnífero": { type: "Psíquico", power: 0, accuracy: 75, pp: 15, effect: "sleep" },
    "Polvo Veneno": { type: "Veneno", power: 0, accuracy: 75, pp: 35, effect: "poison" },
    "Gruñido": { type: "Normal", power: 0, accuracy: 100, pp: 40, effect: "atk_down" },
    "Ataque Rápido": { type: "Normal", power: 40, accuracy: 100, pp: 30, priority: 1 },
    "Mordisco": { type: "Siniestro", power: 60, accuracy: 100, pp: 25 },
    "Giro Rápido": { type: "Normal", power: 20, accuracy: 100, pp: 40 },
    "Refugio": { type: "Normal", power: 0, accuracy: 100, pp: 40, effect: "def_up" },
    "Látigo Cepa": { type: "Planta", power: 45, accuracy: 100, pp: 25 },
    "Drenadoras": { type: "Planta", power: 20, accuracy: 100, pp: 25, drain: 0.5 },
    "Canto": { type: "Normal", power: 0, accuracy: 55, pp: 15, effect: "sleep" },
    "Picotazo Veneno": { type: "Veneno", power: 15, accuracy: 100, pp: 35, effect: "poison" },
    "Tornado": { type: "Volador", power: 40, accuracy: 100, pp: 35 },
    "Arenilla": { type: "Tierra", power: 0, accuracy: 100, pp: 15, effect: "accuracy_down" },
    "Hipercolmillo": { type: "Normal", power: 80, accuracy: 90, pp: 15 },
    "Persecución": { type: "Normal", power: 40, accuracy: 100, pp: 20 },
    "Foco Energía": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "accuracy_up" },
    "Triturar": { type: "Normal", power: 80, accuracy: 100, pp: 15 },
    "Picotazo": { type: "Volador", power: 35, accuracy: 100, pp: 35 },
    "Ácido": { type: "Veneno", power: 40, accuracy: 100, pp: 30, effect: "def_down" },
    "Constricción": { type: "Normal", power: 10, accuracy: 100, pp: 35, effect: "bind" },
    "Onda Trueno": { type: "Eléctrico", power: 0, accuracy: 90, pp: 20, effect: "paralyze" },
    "Doble Equipo": { type: "Normal", power: 0, accuracy: 100, pp: 15, effect: "evasion_up" },
    "Bola Voltio": { type: "Eléctrico", power: 60, accuracy: 100, pp: 20 },
    "Velocidad": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "speed_up" },
    "Chispazo": { type: "Eléctrico", power: 65, accuracy: 100, pp: 20, effect: "paralyze" },
    "Cola Férrea": { type: "Acero", power: 100, accuracy: 75, pp: 15 },
    "Lanzarrocas": { type: "Roca", power: 50, accuracy: 90, pp: 15 },
    "Defensa Férrea": { type: "Acero", power: 0, accuracy: 100, pp: 15, effect: "def_up" },
    "Golpe Roca": { type: "Roca", power: 50, accuracy: 80, pp: 15 },
    "Excavar": { type: "Tierra", power: 80, accuracy: 100, pp: 10 },
    "Atadura": { type: "Normal", power: 15, accuracy: 85, pp: 20, effect: "bind" },
    "Garra Metálica": { type: "Acero", power: 50, accuracy: 95, pp: 35 },
    "Magnitud": { type: "Tierra", power: 0, accuracy: 100, pp: 30, variable: true },
    "Tumba Rocas": { type: "Roca", power: 25, accuracy: 90, pp: 10 },
    "Arañazo": { type: "Normal", power: 40, accuracy: 100, pp: 35 },
    "Rugido": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "switch" },
    "Doble Bofetón": { type: "Normal", power: 15, accuracy: 85, pp: 10, multi: 2 },
    "Destructor": { type: "Normal", power: 40, accuracy: 100, pp: 35 },
    "Rollo": { type: "Normal", power: 30, accuracy: 90, pp: 20 },
    "Supersónico": { type: "Normal", power: 0, accuracy: 55, pp: 20, effect: "confusion" },
    "Absorber": { type: "Planta", power: 20, accuracy: 100, pp: 25, drain: 0.5 },
    "Megaácido": { type: "Veneno", power: 65, accuracy: 100, pp: 20, effect: "def_down" },
    "Lodo": { type: "Veneno", power: 20, accuracy: 100, pp: 20, effect: "poison" },
    "Hueso Palo": { type: "Tierra", power: 65, accuracy: 85, pp: 20 },
    "Furia": { type: "Normal", power: 15, accuracy: 85, pp: 20, multi: 2 },
    "Huesomerang": { type: "Tierra", power: 50, accuracy: 90, pp: 10, multi: 2 },
    "Descanso": { type: "Psíquico", power: 0, accuracy: 100, pp: 10, effect: "heal" },
    "Roca Afilada": { type: "Roca", power: 100, accuracy: 80, pp: 5 },
    "Doble Ataque": { type: "Normal", power: 35, accuracy: 90, pp: 10, multi: 2 },
    "Pin Misil": { type: "Bicho", power: 25, accuracy: 95, pp: 20, multi: 2 },
    "Agilidad": { type: "Psíquico", power: 0, accuracy: 100, pp: 30, effect: "speed_up_2" },
    "Megacuerno": { type: "Bicho", power: 120, accuracy: 85, pp: 10 },
    "Doble Patada": { type: "Lucha", power: 30, accuracy: 100, pp: 30, multi: 2 },
    "Cornada": { type: "Normal", power: 65, accuracy: 100, pp: 25 },
    "Tóxico": { type: "Veneno", power: 0, accuracy: 90, pp: 10, effect: "toxic" },
    "Minimizar": { type: "Normal", power: 0, accuracy: 100, pp: 10, effect: "evasion_up" },
    "Metrónomo": { type: "Normal", power: 0, accuracy: 100, pp: 10, effect: "metronome" },
    "Luz Lunar": { type: "Hada", power: 0, accuracy: 100, pp: 5, effect: "heal" },
    "Poder Oculto": { type: "Normal", power: 60, accuracy: 100, pp: 15 },
    "Polución": { type: "Normal", power: 0, accuracy: 55, pp: 20, effect: "accuracy_down" },
    "Fuego Fatuo": { type: "Fuego", power: 0, accuracy: 75, pp: 15, effect: "burn" },
    "Infierno": { type: "Fuego", power: 100, accuracy: 50, pp: 5, effect: "burn" },
    "Giro Fuego": { type: "Fuego", power: 35, accuracy: 85, pp: 15, effect: "burn" },
    "Salpicadura": { type: "Agua", power: 0, accuracy: 100, pp: 40 },
    "Dulce Aroma": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "evasion_down" },
    "Voz Cautivadora": { type: "Normal", power: 40, accuracy: 100, pp: 15 },
    "Ala de Acero": { type: "Acero", power: 70, accuracy: 90, pp: 25 },
    "Toxi": { type: "Veneno", power: 0, accuracy: 90, pp: 10, effect: "poison" },
    "Viento Aciago": { type: "Volador", power: 60, accuracy: 100, pp: 5 },
    "Rapidez": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "speed_up" },
    "Espora": { type: "Planta", power: 0, accuracy: 100, pp: 15, effect: "sleep" },
    "Ronquido": { type: "Normal", power: 50, accuracy: 100, pp: 15, effect: "sleep" },
    "Psicocorte": { type: "Psíquico", power: 70, accuracy: 100, pp: 20 },
    "Crecimiento": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "spa_up" },
    "Tijera X": { type: "Bicho", power: 80, accuracy: 100, pp: 15 },
    "Cuchillada": { type: "Normal", power: 70, accuracy: 100, pp: 20 },
    "Psicorrayo": { type: "Psíquico", power: 65, accuracy: 100, pp: 20 },
    "Psicoonda": { type: "Psíquico", power: 0, accuracy: 100, pp: 15, effect: "confusion" },
    "Zumbido": { type: "Bicho", power: 90, accuracy: 100, pp: 10 },
    "Golpe Bajo": { type: "Lucha", power: 60, accuracy: 100, pp: 20 },
    "Fisura": { type: "Tierra", power: 0, accuracy: 30, pp: 5, effect: "ohko" },
    "Triataque": { type: "Normal", power: 80, accuracy: 100, pp: 10 },
    "Arena": { type: "Tierra", power: 0, accuracy: 100, pp: 15, effect: "accuracy_down" },
    "Finta": { type: "Normal", power: 30, accuracy: 100, pp: 10, priority: 3 },
    "Golpes Furia": { type: "Normal", power: 18, accuracy: 80, pp: 15, multi: 2 },
    "Día de Pago": { type: "Normal", power: 40, accuracy: 100, pp: 20 },
    "Amnesia": { type: "Psíquico", power: 0, accuracy: 100, pp: 20, effect: "spd_up_2" },
    "Golpe": { type: "Normal", power: 80, accuracy: 75, pp: 20 },
    "Confusión": { type: "Psíquico", power: 50, accuracy: 100, pp: 25 },
    "Cabezazo": { type: "Normal", power: 70, accuracy: 100, pp: 15 },
    "Disable": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "disable" },
    "Patada Baja": { type: "Lucha", power: 0, accuracy: 100, pp: 20, variable: true },
    "Sumisión": { type: "Lucha", power: 80, accuracy: 80, pp: 25, recoil: 0.25 },
    "Golpe Karate": { type: "Lucha", power: 50, accuracy: 100, pp: 25, crit: 1 },
    "Contraataque": { type: "Lucha", power: 0, accuracy: 100, pp: 20, priority: -5, counter: true },
    "Giro Patada": { type: "Lucha", power: 60, accuracy: 85, pp: 15 },
    "Demolición": { type: "Lucha", power: 100, accuracy: 50, pp: 5 },
    "Puño Dinámico": { type: "Lucha", power: 100, accuracy: 50, pp: 5, effect: "confusion" },
    "Hipnosis": { type: "Psíquico", power: 0, accuracy: 60, pp: 20, effect: "sleep" },
    "Lluvia": { type: "Agua", power: 0, accuracy: 100, pp: 5, weather: "rain" },
    "Golpe Cabeza": { type: "Normal", power: 70, accuracy: 100, pp: 15, effect: "flinch" },
    "Viento": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "switch" },
    "Telequinesis": { type: "Psíquico", power: 0, accuracy: 100, pp: 15, effect: "telekinesis" },
    "Recuperación": { type: "Psíquico", power: 0, accuracy: 100, pp: 10, effect: "heal" },
    "Reflejo": { type: "Psíquico", power: 0, accuracy: 100, pp: 20, effect: "reflect" },
    "Calma Mental": { type: "Psíquico", power: 0, accuracy: 100, pp: 20, effect: "spa_up" },
    "Futuro": { type: "Psíquico", power: 120, accuracy: 100, pp: 10, delayed: true },
    "Enfado": { type: "Normal", power: 20, accuracy: 100, pp: 20 },
    "Puño Increíble": { type: "Lucha", power: 100, accuracy: 50, pp: 5 },
    "Atadura": { type: "Planta", power: 15, accuracy: 85, pp: 20, effect: "bind" },
    "Viento Plata": { type: "Volador", power: 60, accuracy: 100, pp: 5 },
    "Veneno": { type: "Veneno", power: 0, accuracy: 90, pp: 10, effect: "poison" },
    "Barrera": { type: "Psíquico", power: 0, accuracy: 100, pp: 20, effect: "def_up" },
    "Rayo Burbuja": { type: "Agua", power: 65, accuracy: 100, pp: 20 },
    "Protección": { type: "Normal", power: 0, accuracy: 100, pp: 10, priority: 4, protect: true },
    "Rayo Rápido": { type: "Normal", power: 60, accuracy: 100, pp: 20 },
    "Cascada": { type: "Agua", power: 80, accuracy: 100, pp: 15 },
    "Aguja Doble": { type: "Normal", power: 15, accuracy: 100, pp: 20, multi: 2 },
    "Concha Filo": { type: "Hielo", power: 75, accuracy: 95, pp: 10 },
    "Explosión": { type: "Normal", power: 250, accuracy: 100, pp: 5, selfKO: true },
    "Susto": { type: "Fantasma", power: 30, accuracy: 100, pp: 15, effect: "flinch" },
    "Mimético": { type: "Normal", power: 0, accuracy: 100, pp: 10, copy: true },
    "Sueño": { type: "Psíquico", power: 0, accuracy: 100, pp: 10, effect: "nightmare" },
    "Destino": { type: "Normal", power: 0, accuracy: 100, pp: 5, effect: "destiny_bond" },
    "Derribo": { type: "Normal", power: 90, accuracy: 85, pp: 20, recoil: 0.25 },
    "Látigo": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "def_down" },
    "Meditación": { type: "Psíquico", power: 0, accuracy: 100, pp: 40, effect: "atk_up" },
    "Barrena": { type: "Normal", power: 80, accuracy: 100, pp: 20 },
    "Vicio": { type: "Normal", power: 70, accuracy: 100, pp: 20 },
    "Tajo": { type: "Normal", power: 50, accuracy: 95, pp: 30 },
    "Fuerza": { type: "Normal", power: 80, accuracy: 100, pp: 15 },
    "Guillotina": { type: "Normal", power: 0, accuracy: 30, pp: 5, effect: "ohko" },
    "Crabhammer": { type: "Agua", power: 100, accuracy: 90, pp: 10, crit: 1 },
    "Sonámbulo": { type: "Normal", power: 0, accuracy: 60, pp: 20, effect: "sleep" },
    "Bomba Sónica": { type: "Normal", power: 20, accuracy: 90, pp: 20 },
    "Espejo": { type: "Psíquico", power: 0, accuracy: 100, pp: 20, effect: "mirror_coat" },
    "Electrocañón": { type: "Eléctrico", power: 100, accuracy: 50, pp: 5 },
    "Carga": { type: "Normal", power: 90, accuracy: 85, pp: 15 },
    "Zapatazo": { type: "Eléctrico", power: 75, accuracy: 95, pp: 15 },
    "Huevo Bomba": { type: "Normal", power: 100, accuracy: 75, pp: 10 },
    "Semilladora": { type: "Planta", power: 80, accuracy: 100, pp: 15 },
    "Hueso": { type: "Tierra", power: 65, accuracy: 85, pp: 20 },
    "Falsa Lágrima": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "atk_down" },
    "Patada Salto Alta": { type: "Lucha", power: 130, accuracy: 90, pp: 10 },
    "Mega Patada": { type: "Lucha", power: 120, accuracy: 75, pp: 5 },
    "Patada Ígnea": { type: "Fuego", power: 85, accuracy: 90, pp: 10, effect: "burn" },
    "Patada Trueno": { type: "Eléctrico", power: 85, accuracy: 90, pp: 10, effect: "paralyze" },
    "Patada Sónica": { type: "Lucha", power: 0, accuracy: 90, pp: 20, effect: "def_down" },
    "Puño Cometa": { type: "Normal", power: 18, accuracy: 85, pp: 15, multi: 2 },
    "Puño Fuego": { type: "Fuego", power: 75, accuracy: 100, pp: 15, effect: "burn" },
    "Puño Trueno": { type: "Eléctrico", power: 75, accuracy: 100, pp: 15, effect: "paralyze" },
    "Puño Hielo": { type: "Hielo", power: 75, accuracy: 100, pp: 15, effect: "freeze" },
    "Megapuño": { type: "Normal", power: 80, accuracy: 85, pp: 20 },
    "Defensa Acida": { type: "Veneno", power: 0, accuracy: 100, pp: 40, effect: "def_up" },
    "Golpe Cuerpo": { type: "Normal", power: 85, accuracy: 100, pp: 15, effect: "paralyze" },
    "Autodestrucción": { type: "Normal", power: 200, accuracy: 100, pp: 5, selfKO: true },
    "Bomba Lodo": { type: "Veneno", power: 65, accuracy: 100, pp: 20, effect: "poison" },
    "Bomba Ácida": { type: "Veneno", power: 40, accuracy: 100, pp: 30, multi: 2 },
    "Fango": { type: "Tierra", power: 65, accuracy: 85, pp: 10 },
    "Perforador": { type: "Roca", power: 100, accuracy: 80, pp: 5 },
    "Luz Terapéutica": { type: "Normal", power: 0, accuracy: 100, pp: 5, heal: true },
    "Suave Voz": { type: "Normal", power: 40, accuracy: 100, pp: 40 },
    "Onda": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "confusion" },
    "Giga Drenado": { type: "Planta", power: 75, accuracy: 100, pp: 10, drain: 0.5 },
    "Comet Punch": { type: "Normal", power: 18, accuracy: 85, pp: 15, multi: 2 },
    "Golpe Rápido": { type: "Normal", power: 10, accuracy: 100, pp: 30, priority: 1 },
    "Dragoaliento": { type: "Dragón", power: 60, accuracy: 100, pp: 20 },
    "Torbellino": { type: "Agua", power: 35, accuracy: 85, pp: 15 },
    "Martillazo": { type: "Normal", power: 100, accuracy: 90, pp: 10 },
    "Rayo": { type: "Eléctrico", power: 95, accuracy: 100, pp: 15, effect: "paralyze" },
    "Salto": { type: "Volador", power: 85, accuracy: 85, pp: 5 },
    "Seismic Toss": { type: "Lucha", power: 0, accuracy: 100, pp: 20, level: true },
    "Súper Diente": { type: "Normal", power: 80, accuracy: 90, pp: 15 },
    "Restricción": { type: "Normal", power: 15, accuracy: 85, pp: 20, effect: "bind" },
    "Takedown": { type: "Normal", power: 90, accuracy: 85, pp: 20, recoil: 0.25 },
    "Salpicadura": { type: "Normal", power: 0, accuracy: 100, pp: 40 },
    "Dragon Rage": { type: "Dragón", power: 0, accuracy: 100, pp: 10, fixed: 40 },
    "Cuerpo Pesado": { type: "Normal", power: 85, accuracy: 100, pp: 15 },
    "Hielo Seco": { type: "Hielo", power: 60, accuracy: 100, pp: 20, effect: "freeze" },
    "Frio Polar": { type: "Hielo", power: 110, accuracy: 70, pp: 5, effect: "freeze" },
    "Transformación": { type: "Normal", power: 0, accuracy: 100, pp: 10, transform: true },
    "Viento Hielo": { type: "Hielo", power: 55, accuracy: 95, pp: 15 },
    "Niebla": { type: "Hielo", power: 0, accuracy: 100, pp: 30, weather: "hail" },
    "Detectar": { type: "Lucha", power: 0, accuracy: 100, pp: 5, priority: 4, protect: true },
    "Drill Peck": { type: "Volador", power: 80, accuracy: 100, pp: 20 },
    "Envoltura": { type: "Normal", power: 15, accuracy: 90, pp: 20, effect: "bind" },
    "Gas": { type: "Veneno", power: 0, accuracy: 90, pp: 40, effect: "poison" },
    "Humo": { type: "Normal", power: 0, accuracy: 100, pp: 20, effect: "accuracy_down" },
    "Conversión": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "conversion" },
    "Conversión 2": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "conversion2" },
    "Bloqueo": { type: "Normal", power: 0, accuracy: 100, pp: 5, effect: "block" },
    "Retracción": { type: "Agua", power: 0, accuracy: 100, pp: 40, effect: "def_up" },
    "Pisotón": { type: "Normal", power: 65, accuracy: 100, pp: 20, effect: "flinch" },
    "Ataque Roca": { type: "Roca", power: 90, accuracy: 80, pp: 10 },
    "Besolágrima": { type: "Hielo", power: 0, accuracy: 75, pp: 10, effect: "freeze" },
    "Polvo Nieve": { type: "Hielo", power: 40, accuracy: 100, pp: 25, effect: "freeze" },
    "Aurora": { type: "Hielo", power: 65, accuracy: 100, pp: 20 },
    "Perfume": { type: "Normal", power: 0, accuracy: 55, pp: 20, effect: "confusion" },
    "Brasas": { type: "Fuego", power: 60, accuracy: 100, pp: 25 },
    "Desarme": { type: "Psíquico", power: 0, accuracy: 100, pp: 20, effect: "disable" },
    "Barrena Psíquica": { type: "Psíquico", power: 100, accuracy: 100, pp: 10 },
    "Luz": { type: "Normal", power: 0, accuracy: 100, pp: 30, weather: "sunny" },
    "Sustituto": { type: "Normal", power: 0, accuracy: 100, pp: 10, substitute: true },
    "Espada": { type: "Normal", power: 0, accuracy: 100, pp: 30, effect: "atk_up_2" },
    "Falsa Tijera": { type: "Bicho", power: 70, accuracy: 100, pp: 20 },
    "Última Baza": { type: "Normal", power: 140, accuracy: 100, pp: 5, priority: -1 },
    "Vuelo": { type: "Volador", power: 90, accuracy: 95, pp: 15, twoTurn: true },
    "Garra Umbría": { type: "Siniestro", power: 70, accuracy: 100, pp: 15 },
    "Ronquido": { type: "Normal", power: 50, accuracy: 100, pp: 15 },
    "Blizzard": { type: "Hielo", power: 110, accuracy: 70, pp: 5, effect: "freeze" },
    "Ataque Furioso": { type: "Normal", power: 120, accuracy: 100, pp: 15, recoil: 0.33 },
    "Gunk Shot": { type: "Veneno", power: 120, accuracy: 80, pp: 5, effect: "poison" },
    "Flamethrower": { type: "Fuego", power: 90, accuracy: 100, pp: 15, effect: "burn" }
  },
  
  typeChart: {
    "Normal": { super: [], weak: ["Lucha"], immune: ["Fantasma"] },
    "Fuego": { super: ["Planta", "Hielo", "Bicho", "Acero"], weak: ["Agua", "Roca", "Fuego", "Dragón"] },
    "Agua": { super: ["Fuego", "Roca", "Tierra"], weak: ["Planta", "Eléctrico", "Agua"] },
    "Eléctrico": { super: ["Agua", "Volador"], weak: ["Tierra", "Eléctrico", "Dragón"] },
    "Planta": { super: ["Agua", "Roca", "Tierra"], weak: ["Fuego", "Hielo", "Veneno", "Volador", "Bicho"] },
    "Hielo": { super: ["Planta", "Tierra", "Volador", "Dragón"], weak: ["Fuego", "Lucha", "Roca", "Acero", "Hielo"] },
    "Lucha": { super: ["Normal", "Hielo", "Roca", "Siniestro", "Acero"], weak: ["Psíquico", "Volador", "Hada"] },
    "Veneno": { super: ["Planta", "Hada"], weak: ["Tierra", "Psíquico", "Roca", "Fantasma"], immune: ["Acero"] },
    "Tierra": { super: ["Fuego", "Eléctrico", "Veneno", "Roca", "Acero"], weak: ["Agua", "Planta", "Hielo"], immune: ["Eléctrico"] },
    "Volador": { super: ["Planta", "Lucha", "Bicho"], weak: ["Eléctrico", "Hielo", "Roca"], immune: ["Tierra"] },
    "Psíquico": { super: ["Lucha", "Veneno"], weak: ["Bicho", "Siniestro", "Fantasma"] },
    "Bicho": { super: ["Planta", "Psíquico", "Siniestro"], weak: ["Fuego", "Volador", "Roca"] },
    "Roca": { super: ["Fuego", "Hielo", "Volador", "Bicho"], weak: ["Agua", "Planta", "Lucha", "Tierra", "Acero"] },
    "Fantasma": { super: ["Psíquico", "Fantasma"], weak: ["Fantasma", "Siniestro"], immune: ["Normal", "Lucha"] },
    "Dragón": { super: ["Dragón"], weak: ["Hielo", "Dragón", "Hada"] },
    "Siniestro": { super: ["Psíquico", "Fantasma"], weak: ["Lucha", "Bicho", "Hada"] },
    "Acero": { super: ["Hielo", "Roca", "Hada"], weak: ["Fuego", "Lucha", "Tierra"], immune: ["Veneno"] },
    "Hada": { super: ["Lucha", "Dragón", "Siniestro"], weak: ["Veneno", "Acero"] }
  }
};