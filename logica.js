class PokemonExplorer {       // Clase principal
    constructor() {
        // Inicializar propiedades del explorador
        Object.assign(this, {
            currentPage: 1,           // Página actual de la paginación
            pokemonPerPage: 12,       // Número de Pokémon por página
            allPokemon: [],           // Array con todos los Pokémon cargados
            filteredPokemon: [],      // Array con Pokémon filtrados según criterios
            pokemonTypes: [],         // Array con todos los tipos de Pokémon
            pokemonNames: [],         // Array con nombres de Pokémon para sugerencias
            searchTimeout: null,      // Timeout para búsqueda con delay
            pokemonById: new Map(),   // Mapa para acceso rápido por ID
            pokemonByName: new Map(), // Mapa para acceso rápido por nombre
            audioActivated: false,    // Flag para saber si el usuario ya activó el audio
            pokemonColors: [],        // Array con todos los colores de Pokémon
            pokemonHabitats: [],      // Array con todos los hábitats de Pokémon
            // Traducciones de tipos de Pokémon al español
            typeTranslations: {
                'normal': 'Normal',
                'fire': 'Fuego',
                'water': 'Agua',
                'electric': 'Eléctrico',
                'grass': 'Planta',
                'ice': 'Hielo',
                'fighting': 'Lucha',
                'poison': 'Veneno',
                'ground': 'Tierra',
                'flying': 'Volador',
                'psychic': 'Psíquico',
                'bug': 'Bicho',
                'rock': 'Roca',
                'ghost': 'Fantasma',
                'dragon': 'Dragón',
                'dark': 'Siniestro',
                'steel': 'Acero',
                'fairy': 'Hada'
            },
            // Traducciones de habilidades comunes al español
            abilityTranslations: {
                'Shed Skin': 'Muda la piel',
                'overgrow': 'Espesura',
                'chlorophyll': 'Clorofila',
                'blaze': 'Llamarada',
                'solar-power': 'Poder Solar',
                'torrent': 'Torrente',
                'rain-dish': 'Cura Lluvia',
                'shield-dust': 'Polvo Escudo',
                'run-away': 'Fuga',
                'keen-eye': 'Vista Lince',
                'tangled-feet': 'Pies Enredados',
                'big-pecks': 'Sacapecho',
                'guts': 'Agallas',
                'hustle': 'Entusiasmo',
                'intimidate': 'Intimidación',
                'static': 'Electricidad Estática',
                'lightning-rod': 'Pararrayos',
                'sand-veil': 'Velo Arena',
                'poison-point': 'Punto Tóxico',
                'rivalry': 'Rivalidad',
                'sheer-force': 'Potencia Bruta',
                'cute-charm': 'Gran Encanto',
                'magic-guard': 'Muro Mágico',
                'friend-guard': 'Compiescolta',
                'healer': 'Curación',
                'natural-cure': 'Cura Natural',
                'serene-grace': 'Dicha',
                'super-luck': 'Afortunado',
                'swarm': 'Enjambre',
                'sniper': 'Francotirador',
                'sturdy': 'Robustez',
                'rock-head': 'Cabeza Roca',
                'weak-armor': 'Armadura Frágil',
                'magnet-pull': 'Imán',
                'analytic': 'Cálculo Final',
                'levitate': 'Levitación',
                'effect-spore': 'Efecto Espora',
                'dry-skin': 'Piel Seca',
                'damp': 'Humedad',
                'wonder-skin': 'Piel Milagro',
                'arena-trap': 'Trampa Arena',
                'hyper-cutter': 'Corte Fuerte',
                'sand-stream': 'Chorro Arena',
                'battle-armor': 'Armadura Batalla',
                'shell-armor': 'Caparazón',
                'clear-body': 'Cuerpo Puro',
                'liquid-ooze': 'Lodo Líquido',
                'thick-fat': 'Sebo',
                'early-bird': 'Madrugar',
                'flame-body': 'Cuerpo Llama',
                'synchronize': 'Sincronía',
                'inner-focus': 'Foco Interno',
                'magma-armor': 'Armadura Magma',
                'water-veil': 'Velo Agua',
                'oblivious': 'Despiste',
                'cloud-nine': 'Aclimatación',
                'compound-eyes': 'Ojo Compuesto',
                'insomnia': 'Insomnio',
                'color-change': 'Cambio Color',
                'immunity': 'Inmunidad',
                'flash-fire': 'Absorbe Fuego',
                'shield-dust': 'Polvo Escudo',
                'own-tempo': 'Ritmo Propio',
                'suction-cups': 'Ventosas',
                'pressure': 'Presión',
                'volt-absorb': 'Absorbe Elec',
                'water-absorb': 'Absorbe Agua',
                'forecast': 'Predicción',
                'trace': 'Calco',
                'huge-power': 'Potencia',
                'poison-heal': 'Antídoto',
                'adaptability': 'Adaptabilidad',
                'skill-link': 'Encadenado',
                'hydration': 'Hidratación',
                'solar-power': 'Poder Solar',
                'quick-feet': 'Pies Rápidos',
                'normalize': 'Normalidad',
                'wonder-guard': 'Superguarda',
                'air-lock': 'Ausencia',
                'truant': 'Pereza',
                // Generación VI en adelante
                'protean': 'Mutatipo',
                'fur-coat': 'Pelaje Recio',
                'magician': 'Prestidigitador',
                'bulletproof': 'Antibalas',
                'competitive': 'Competitivo',
                'strong-jaw': 'Mandíbula Fuerte',
                'refrigerate': 'Piel Helada',
                'pixilate': 'Piel Feérica',
                'gooey': 'Viscosidad',
                'aerilate': 'Piel Celeste',
                'parental-bond': 'Amor Filial',
                'dark-aura': 'Aura Oscura',
                'fairy-aura': 'Aura Feérica',
                'aura-break': 'Rompe Aura',
                // Generación VII
                'dazzling': 'Deslumbrante',
                'soul-heart': 'Corazón Alma',
                'tangling-hair': 'Rizos Rebeldes',
                'receiver': 'Receptor',
                'power-of-alchemy': 'Poder Alquímico',
                'beast-boost': 'Ultraimpulso',
                'rks-system': 'Sistema Alfa',
                'electric-surge': 'Campo Eléctrico',
                'psychic-surge': 'Campo Psíquico',
                'misty-surge': 'Campo de Niebla',
                'grassy-surge': 'Campo de Hierba',
                // Generación VIII
                'cotton-down': 'Pelusa',
                'propeller-tail': 'Cola Hélice',
                'mirror-armor': 'Coraza Espejo',
                'gulp-missile': 'Tragamisil',
                'stalwart': 'Acérrimo',
                'steam-engine': 'Combustible',
                'punk-rock': 'Punk Rock',
                'sand-spit': 'Expulsarena',
                'ice-scales': 'Escama de Hielo',
                'ripen': 'Maduración',
                'ice-face': 'Cara de Hielo',
                'power-spot': 'Fuente Energía',
                'mimicry': 'Mimetismo',
                'screen-cleaner': 'Antibarrera',
                'steely-spirit': 'Alma Acerada',
                'perish-body': 'Cuerpo Mortal',
                'wandering-spirit': 'Alma Errante',
                'gorilla-tactics': 'Monotema',
                'neutralizing-gas': 'Gas Reactivo',
                'pastel-veil': 'Velo Pastel',
                'hunger-switch': 'Mutapetito',
                'quick-draw': 'Mano Rápida',
                'unseen-fist': 'Puño Invisible',
                'curious-medicine': 'Medicina Extraña',
                'transistor': 'Transistor',
                'dragons-maw': 'Mandíbula Dragón',
                'chilling-neigh': 'Relincho Blanco',
                'grim-neigh': 'Relincho Negro',
                // Generación IX
                'lingering-aroma': 'Olor Persistente',
                'seed-sower': 'Disemillado',
                'thermal-exchange': 'Termocambio',
                'anger-shell': 'Coraza Ira',
                'purifying-salt': 'Sal Purificadora',
                'well-baked-body': 'Cuerpo Horneado',
                'wind-rider': 'Surcavientos',
                'guard-dog': 'Perro Guardián',
                'rocky-payload': 'Carga Rocosa',
                'wind-power': 'Energía Eólica',
                'zero-to-hero': 'Cambio Heroico',
                'commander': 'Comandar',
                'electromorphosis': 'Electromorfosis',
                'protosynthesis': 'Protosíntesis',
                'quark-drive': 'Propulsión Cuark',
                'good-as-gold': 'Cuerpo Áureo',
                'vessel-of-ruin': 'Caldero Debacle',
                'sword-of-ruin': 'Espada Debacle',
                'tablets-of-ruin': 'Tablilla Debacle',
                'beads-of-ruin': 'Abalorio Debacle',
                'orichalcum-pulse': 'Latido Oricalco',
                'hadron-engine': 'Motor Hadrónico',
                'opportunist': 'Oportunista',
                'cud-chew': 'Rumia',
                'sharpness': 'Cortante',
                'supreme-overlord': 'Jefe Supremo',
                'costar': 'Unísono',
                'toxic-debris': 'Toxidetritos',
                'armor-tail': 'Cola Armadura',
                'earth-eater': 'Geofagia',
                'mycelium-might': 'Poder Fúngico'
            },
            // Traducciones de colores de Pokémon
            colorTranslations: {
                'black': 'Negro',
                'blue': 'Azul',
                'brown': 'Marrón',
                'gray': 'Gris',
                'green': 'Verde',
                'pink': 'Rosa',
                'purple': 'Morado',
                'red': 'Rojo',
                'white': 'Blanco',
                'yellow': 'Amarillo'
            },
            // Traducciones de hábitats de Pokémon
            habitatTranslations: {
                'cave': 'Cueva',
                'forest': 'Bosque',
                'grassland': 'Pradera',
                'mountain': 'Montaña',
                'rare': 'Raro',
                'rough-terrain': 'Terreno Áspero',
                'sea': 'Mar',
                'urban': 'Urbano',
                'waters-edge': 'Orilla del Agua'
            },
            // Palabras clave para búsqueda inteligente
            searchKeywords: {
                // Tipos en español
                'fuego': 'fire', 'agua': 'water', 'planta': 'grass', 'eléctrico': 'electric', 'electrico': 'electric',
                'hielo': 'ice', 'lucha': 'fighting', 'veneno': 'poison', 'tierra': 'ground', 'volador': 'flying',
                'psíquico': 'psychic', 'psiquico': 'psychic', 'bicho': 'bug', 'roca': 'rock', 'fantasma': 'ghost',
                'dragón': 'dragon', 'dragon': 'dragon', 'siniestro': 'dark', 'acero': 'steel', 'hada': 'fairy',
                'normal': 'normal',

                // Colores en español
                'negro': 'black', 'azul': 'blue', 'marrón': 'brown', 'marron': 'brown', 'gris': 'gray',
                'verde': 'green', 'rosa': 'pink', 'morado': 'purple', 'rojo': 'red', 'blanco': 'white', 'amarillo': 'yellow',

                // Hábitats en español
                'cueva': 'cave', 'bosque': 'forest', 'pradera': 'grassland', 'montaña': 'mountain', 'montana': 'mountain',
                'raro': 'rare', 'terreno áspero': 'rough-terrain', 'terreno aspero': 'rough-terrain',
                'mar': 'sea', 'urbano': 'urban', 'orilla': 'waters-edge',

                // Tamaños
                'pequeño': 'small', 'pequeno': 'small', 'muy pequeño': 'tiny', 'muy pequeno': 'tiny',
                'mediano': 'medium', 'grande': 'large', 'enorme': 'huge', 'gigante': 'huge',

                // Pesos
                'ligero': 'light', 'pesado': 'heavy', 'masivo': 'massive'
            }
        });

        // Inicializar elementos del DOM de forma directa
        this.elements = {
            searchInput: document.getElementById('searchInput'),
            searchSuggestions: document.getElementById('searchSuggestions'),
            searchError: document.getElementById('searchError'),
            typeFilter: document.getElementById('typeFilter'),
            generationFilter: document.getElementById('generationFilter'),
            colorFilter: document.getElementById('colorFilter'),
            habitatFilter: document.getElementById('habitatFilter'),
            sizeFilter: document.getElementById('sizeFilter'),
            weightFilter: document.getElementById('weightFilter'),
            loading: document.getElementById('loading'),
            pokemonGrid: document.getElementById('pokemonGrid'),
            noResults: document.getElementById('noResults'),
            pagination: document.getElementById('pagination')
        };

        // Configurar event listeners de forma más directa
        this.setupEventListeners();

        // Resetear todos los filtros al inicializar
        this.resetAllFilters();

        // Cargar datos iniciales
        this.loadPokemonTypes();
        this.loadPokemonColors();
        this.loadPokemonHabitats();
        this.loadPokemon();
    }

    // Configurar todos los event listeners de forma centralizada
    setupEventListeners() {
        const { searchInput, searchSuggestions } = this.elements;

        // Eventos de búsqueda
        searchInput.addEventListener('input', e => this.handleSearch(e.target.value));
        searchInput.addEventListener('focus', () => searchInput.value.trim() && this.showSuggestions());
        searchInput.addEventListener('blur', () => setTimeout(() => this.hideSuggestions(), 200));

        // Eventos de filtros
        ['typeFilter', 'generationFilter', 'colorFilter', 'habitatFilter', 'sizeFilter', 'weightFilter']
            .forEach(filterId => {
                const filter = this.elements[filterId];
                if (filter) filter.addEventListener('change', () => this.applyFilters());
            });

        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', e => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    // Traducir tipo de Pokémon al español
    translateType(type) {
        return this.typeTranslations[type] || type.charAt(0).toUpperCase() + type.slice(1);
    }

    // Traducir habilidad al español
    translateAbility(ability) {
        return this.abilityTranslations[ability] || ability.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Traducir color al español
    translateColor(color) {
        return this.colorTranslations[color] || color.charAt(0).toUpperCase() + color.slice(1);
    }

    // Traducir hábitat al español
    translateHabitat(habitat) {
        return this.habitatTranslations[habitat] || habitat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Analizar búsqueda inteligente para extraer criterios
    parseSmartSearch(query) {
        const criteria = { name: '', type: null, color: null, habitat: null, size: null, weight: null };
        const words = query.toLowerCase().trim().split(/\s+/);
        const remainingWords = [];

        const categoryMap = {
            types: ['fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy', 'normal'],
            colors: ['black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow'],
            habitats: ['cave', 'forest', 'grassland', 'mountain', 'rare', 'rough-terrain', 'sea', 'urban', 'waters-edge'],
            sizes: ['tiny', 'small', 'medium', 'large', 'huge'],
            weights: ['light', 'heavy', 'massive']
        };

        for (const word of words) {
            const keyword = this.searchKeywords[word];
            if (keyword) {
                if (categoryMap.types.includes(keyword)) criteria.type = keyword;
                else if (categoryMap.colors.includes(keyword)) criteria.color = keyword;
                else if (categoryMap.habitats.includes(keyword)) criteria.habitat = keyword;
                else if (categoryMap.sizes.includes(keyword)) criteria.size = keyword;
                else if (categoryMap.weights.includes(keyword)) criteria.weight = keyword;
            } else {
                remainingWords.push(word);
            }
        }

        criteria.name = remainingWords.join(' ');
        return criteria;
    }

    // Cargar todos los tipos de Pokémon desde la API
    async loadPokemonTypes() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            this.pokemonTypes = (await response.json()).results;
            this.populateTypeFilter();
        } catch (error) {
            console.error('Error al cargar los tipos de Pokémon:', error);
        }
    }

    // Cargar todos los colores de Pokémon desde la API
    async loadPokemonColors() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon-color');
            this.pokemonColors = (await response.json()).results;
            this.populateColorFilter();
        } catch (error) {
            console.error('Error al cargar los colores de Pokémon:', error);
        }
    }

    // Cargar todos los hábitats de Pokémon desde la API
    async loadPokemonHabitats() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon-habitat');
            this.pokemonHabitats = (await response.json()).results;
            this.populateHabitatFilter();
        } catch (error) {
            console.error('Error al cargar los hábitats de Pokémon:', error);
        }
    }

    // Función helper para crear opciones de select
    createOption(name, value = name, translator = null) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = translator ? translator(name) : name;
        return option;
    }

    // Poblar el filtro de tipos con opciones organizadas
    populateTypeFilter() {
        const { typeFilter } = this.elements;
        const commonTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice',
            'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock',
            'ghost', 'dragon', 'dark', 'steel', 'fairy'];

        typeFilter.innerHTML = '<option value="">Elige el tipo</option>';

        [...commonTypes.filter(t => this.pokemonTypes.find(pt => pt.name === t)),
        ...this.pokemonTypes.filter(t => !commonTypes.includes(t.name))]
            .forEach(type => {
                const typeName = typeof type === 'string' ? type : type.name;
                typeFilter.appendChild(this.createOption(typeName, typeName, this.translateType.bind(this)));
            });
    }

    // Poblar el filtro de colores
    populateColorFilter() {
        const { colorFilter } = this.elements;
        if (!colorFilter) return;

        colorFilter.innerHTML = '<option value="">Todos los colores</option>';
        this.pokemonColors.forEach(color =>
            colorFilter.appendChild(this.createOption(color.name, color.name, this.translateColor.bind(this)))
        );
    }

    // Poblar el filtro de hábitats
    populateHabitatFilter() {
        const { habitatFilter } = this.elements;
        if (!habitatFilter) return;

        habitatFilter.innerHTML = '<option value="">Todos los hábitats</option>';
        this.pokemonHabitats.forEach(habitat =>
            habitatFilter.appendChild(this.createOption(habitat.name, habitat.name, this.translateHabitat.bind(this)))
        );
    }

    // Cargar lista inicial de Pokémon (hasta la generación 5)
    async loadPokemon() {
        this.showLoading(true);
        try {
            // Obtener lista de nombres de Pokémon para sugerencias de búsqueda
            // Límite expandido para incluir todas las 9 generaciones (hasta Paldea)
            // Total: ~1302 Pokémon incluyendo formas alternativas
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
            this.pokemonNames = (await response.json()).results.map(p => p.name);

            // Cargar los primeros 24 Pokémon para mostrar inicialmente (2 páginas)
            await this.loadMissingPokemon([...Array(24).keys()].map(i => i + 1), 'id');
        } catch (error) {
            console.error('Error al cargar Pokémon:', error);
            this.showError('Error al cargar los Pokémon');
        } finally {
            this.showLoading(false);
        }
    }

    // Cargar Pokémon faltantes según una lista y criterio (ID o nombre)
    async loadMissingPokemon(list, key = 'name') {
        // Filtrar solo los Pokémon que no están en cache
        const needed = list.filter(p => key === 'id' ? !this.pokemonById.has(p) : !this.pokemonByName.has(p));

        if (needed.length === 0) return; // No hay nada que cargar

        // Cargar todos los Pokémon necesarios en lotes de 50 para no sobrecargar la API
        const batchSize = 50;
        const batches = [];

        for (let i = 0; i < needed.length; i += batchSize) {
            const batch = needed.slice(i, i + batchSize);
            batches.push(batch);
        }

        // Procesar todos los lotes con indicador de progreso
        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];

            // Mostrar progreso si hay múltiples lotes
            if (batches.length > 1) {
                this.showLoading(true, `Cargando Pokémon... (${i + 1}/${batches.length}) - Las imágenes pueden tardar unos segundos`);
            } else if (needed.length > 20) {
                this.showLoading(true, `Cargando ${needed.length} Pokémon... Las imágenes aparecerán gradualmente`);
            }

            const newPokemon = await Promise.all(batch.map(p =>
                this.fetchPokemonDetails(key === 'id' ? p : p.name)));

            // Agregar nuevos Pokémon al cache
            newPokemon.forEach(p => p && this.addPokemon(p));
        }

        // Actualizar vista después de cargar todos los lotes
        this.filteredPokemon = [...this.allPokemon];
        this.clearError(); // Limpiar cualquier mensaje de error previo
        this.displayPokemon();
        this.updatePagination();
    }

    // Agregar un Pokémon al cache si no existe
    addPokemon(pokemon) {
        if (!this.pokemonById.has(pokemon.id)) {
            this.allPokemon.push(pokemon);
            this.pokemonById.set(pokemon.id, pokemon);
            this.pokemonByName.set(pokemon.name, pokemon);
        }
    }

    // Obtener detalles de un Pokémon por ID o nombre
    async fetchPokemonDetails(idOrName) {
        // Verificar si ya está en cache
        const cached = typeof idOrName === 'number' ? this.pokemonById.get(idOrName) :
            this.pokemonByName.get(idOrName.toLowerCase());
        if (cached) return cached;

        try {
            // Hacer petición a la API
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
            if (!response.ok) return null;
            const pokemon = await response.json();

            // Obtener información adicional de la especie para color y hábitat
            let speciesData = null;
            try {
                if (pokemon.species && pokemon.species.url) {
                    const speciesResponse = await fetch(pokemon.species.url);
                    if (speciesResponse.ok) {
                        speciesData = await speciesResponse.json();
                    }
                }
            } catch (error) {
                console.error(`Error al obtener datos de especies para ${pokemon.name}:`, error);
            }

            // Crear objeto Pokémon con datos relevantes
            const pokeObj = {
                id: pokemon.id,
                name: pokemon.name,
                // Usar imagen oficial, con fallback a versiones más pequeñas
                image: pokemon.sprites.other['official-artwork']?.front_default ||
                    pokemon.sprites.other['home']?.front_default ||
                    pokemon.sprites.other['dream_world']?.front_default ||
                    pokemon.sprites.front_default,
                types: pokemon.types.map(t => t.type.name),
                abilities: pokemon.abilities.map(a => a.ability.name),
                // Extraer estadísticas principales
                stats: {
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat
                },
                // Convertir altura y peso a unidades decimales
                height: pokemon.height / 10,
                weight: pokemon.weight / 10,
                baseExperience: pokemon.base_experience || 0,
                // Agregar grito del Pokémon (audio)
                cry: pokemon.cries?.latest || pokemon.cries?.legacy || null,
                // Información adicional de la especie
                color: speciesData?.color?.name || null,
                habitat: speciesData?.habitat?.name || null
            };
            this.addPokemon(pokeObj);
            return pokeObj;
        } catch (error) {
            console.error(`Error al obtener el Pokémon ${idOrName}:`, error);
            return null;
        }
    }

    // Manejar entrada de texto en el campo de búsqueda
    handleSearch(query) {
        clearTimeout(this.searchTimeout);
        this.clearError();

        if (!query.trim()) {
            this.hideSuggestions();
            this.applyFilters();
            return;
        }

        if (query.length < 2) {
            this.showError('Ingresa al menos 2 caracteres');
            return;
        }

        this.searchTimeout = setTimeout(() => this.performSearch(query), 300);
        this.updateSuggestions(query);
    }

    // Actualizar sugerencias de búsqueda basadas en la consulta
    updateSuggestions(query) {
        const lowerQuery = query.toLowerCase();

        const nameMatches = this.pokemonNames
            .filter(name => name.toLowerCase().includes(lowerQuery))
            .slice(0, 3);

        const keywordMatches = Object.keys(this.searchKeywords)
            .filter(keyword => keyword.includes(lowerQuery))
            .slice(0, 2);

        const suggestions = [...nameMatches, ...keywordMatches].slice(0, 5);

        if (suggestions.length > 0 && query.length >= 2) {
            this.displaySuggestions(suggestions);
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
    }

    // Mostrar lista de sugerencias en el DOM
    displaySuggestions(suggestions) {
        const { searchSuggestions, searchInput } = this.elements;

        searchSuggestions.innerHTML = suggestions.map(name =>
            `<div class="suggestion-item">${name.charAt(0).toUpperCase() + name.slice(1)}</div>`).join('');

        [...searchSuggestions.children].forEach((item, i) => {
            item.addEventListener('click', () => {
                searchInput.value = suggestions[i];
                this.performSearch(suggestions[i]);
                this.hideSuggestions();
            });
        });
    }

    // Realizar búsqueda inteligente de Pokémon
    async performSearch(query) {
        if (!query.trim()) { this.applyFilters(); return; }
        this.showLoading(true);

        try {
            // Analizar la búsqueda para extraer criterios
            const criteria = this.parseSmartSearch(query);

            // Si hay criterios específicos, aplicar filtros inteligentes
            if (criteria.type || criteria.color || criteria.habitat || criteria.size || criteria.weight) {
                await this.performSmartSearch(criteria);
            } else {
                // Búsqueda tradicional por nombre
                await this.performNameSearch(criteria.name || query);
            }
        } catch (error) {
            this.showError('Error al buscar');
            this.filteredPokemon = [];
            this.displayPokemon();
            this.updatePagination();
        } finally {
            this.showLoading(false);
        }
    }

    // Búsqueda tradicional por nombre
    async performNameSearch(query) {
        const lowerQuery = query.toLowerCase();
        // Buscar en Pokémon ya cargados
        let found = [...this.pokemonByName.values()].filter(p => p.name.includes(lowerQuery));

        // Si no se encuentra, intentar cargar desde la API
        if (!found.length && query.trim()) {
            const pokemon = await this.fetchPokemonDetails(lowerQuery);
            if (pokemon) {
                // Mantener orden por ID
                this.allPokemon.sort((a, b) => a.id - b.id);
                found = [pokemon];
            }
        }

        // Actualizar resultados
        this.filteredPokemon = found;
        this.currentPage = 1;

        if (found.length) {
            this.clearError();
            this.displayPokemon();
            this.updatePagination();
        } else {
            this.showError(query.trim() ? 'Pokémon no encontrado' : 'Ingresa un término de búsqueda');
            this.displayPokemon();
            this.updatePagination();
        }
    }

    // Búsqueda inteligente con múltiples criterios
    async performSmartSearch(criteria) {
        // Cargar datos necesarios según los criterios
        if (criteria.type) {
            await this.loadPokemonByType(criteria.type);
        }

        // Empezar con todos los Pokémon cargados
        let results = [...this.pokemonById.values()];

        // Aplicar filtros según criterios
        if (criteria.name) {
            results = results.filter(p => p.name.toLowerCase().includes(criteria.name.toLowerCase()));
        }

        if (criteria.type) {
            results = results.filter(p => p.types.includes(criteria.type));
        }

        if (criteria.color) {
            results = results.filter(p => p.color === criteria.color);
        }

        if (criteria.habitat) {
            results = results.filter(p => p.habitat === criteria.habitat);
        }

        if (criteria.size) {
            results = results.filter(p => {
                const height = p.height;
                switch (criteria.size) {
                    case 'tiny': return height < 0.5;
                    case 'small': return height >= 0.5 && height < 1;
                    case 'medium': return height >= 1 && height < 2;
                    case 'large': return height >= 2 && height < 3;
                    case 'huge': return height >= 3;
                    default: return true;
                }
            });
        }

        if (criteria.weight) {
            results = results.filter(p => {
                const weight = p.weight;
                switch (criteria.weight) {
                    case 'light': return weight < 10;
                    case 'heavy': return weight >= 50 && weight < 100;
                    case 'massive': return weight >= 100;
                    default: return true;
                }
            });
        }

        // Actualizar resultados
        this.filteredPokemon = results;
        this.currentPage = 1;

        if (results.length) {
            this.clearError();
            this.displayPokemon();
            this.updatePagination();
        } else {
            this.showError('No se encontraron Pokémon con esos criterios');
            this.displayPokemon();
            this.updatePagination();
        }
    }

    // Cargar Pokémon por tipo específico
    async loadPokemonByType(type) {
        const currentTypePokemons = [...this.pokemonById.values()].filter(p => p.types.includes(type));

        if (currentTypePokemons.length < 10) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
                const pokemonList = (await response.json()).pokemon
                    .map(p => p.pokemon)
                    .filter(p => parseInt(p.url.split('/').slice(-2, -1)[0]) <= 1025);

                await this.loadMissingPokemon(pokemonList, 'name');
            } catch (error) {
                console.error('Error al cargar pokemon por tipo:', error);
            }
        }
    }

    // Aplicar filtros de tipo, generación, color, hábitat, tamaño y peso
    async applyFilters() {
        const { typeFilter, generationFilter, colorFilter, habitatFilter, sizeFilter, weightFilter } = this.elements;
        const selectedType = typeFilter?.value || '';
        const selectedGen = generationFilter?.value || '';
        const selectedColor = colorFilter?.value || '';
        const selectedHabitat = habitatFilter?.value || '';
        const selectedSize = sizeFilter?.value || '';
        const selectedWeight = weightFilter?.value || '';

        // Verificar si el tipo seleccionado existe en la API
        if (selectedType && !this.pokemonTypes.some(t => t.name === selectedType)) {
            this.filteredPokemon = [];
            this.currentPage = 1;
            this.displayPokemon();
            this.updatePagination(); // Esto ya oculta la paginación porque filteredPokemon está vacío
            this.showError('Este tipo estará disponible muy pronto.');
            return;
        }

        this.showLoading(true);

        try {
            // Paso 1: Cargar Pokémon por generación si está seleccionada
            if (selectedGen) {
                await this.ensureGenerationLoaded(selectedGen);
            }

            // Paso 2: Cargar Pokémon por tipo si está seleccionado
            if (selectedType) {
                // Verificar si necesitamos cargar más Pokémon de este tipo
                const currentTypePokemons = [...this.pokemonById.values()].filter(p => p.types.includes(selectedType));

                // Si hay pocos o ninguno, cargar desde la API
                if (currentTypePokemons.length < 10) {
                    try {
                        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
                        const pokemonList = (await response.json()).pokemon
                            .map(p => p.pokemon)
                            // Filtrar hasta la generación 9 (ID <= 1025)
                            .filter(p => parseInt(p.url.split('/').slice(-2, -1)[0]) <= 1025);

                        await this.loadMissingPokemon(pokemonList, 'name');
                    } catch (error) {
                        console.error('Error al cargar pokemon por tipo:', error);
                    }
                }
            }

            // Paso 3: Aplicar filtros sobre todos los Pokémon cargados
            this.filteredPokemon = [...this.pokemonById.values()];

            // Filtrar por generación si está seleccionada
            if (selectedGen) {
                const genRanges = {
                    '1': [1, 151],      // Kanto
                    '2': [152, 251],    // Johto  
                    '3': [252, 386],    // Hoenn
                    '4': [387, 493],    // Sinnoh
                    '5': [494, 649],    // Unova
                    '6': [650, 721],    // Kalos
                    '7': [722, 809],    // Alola
                    '8': [810, 905],    // Galar
                    '9': [906, 1025]    // Paldea
                };
                const [start, end] = genRanges[selectedGen];
                this.filteredPokemon = this.filteredPokemon.filter(p => p.id >= start && p.id <= end);
            }

            // Filtrar por tipo si está seleccionado
            if (selectedType) {
                this.filteredPokemon = this.filteredPokemon.filter(p => p.types.includes(selectedType));
            }

            // Filtrar por color si está seleccionado
            if (selectedColor) {
                this.filteredPokemon = this.filteredPokemon.filter(p => p.color === selectedColor);
            }

            // Filtrar por hábitat si está seleccionado
            if (selectedHabitat) {
                this.filteredPokemon = this.filteredPokemon.filter(p => p.habitat === selectedHabitat);
            }

            // Filtrar por tamaño si está seleccionado
            if (selectedSize) {
                this.filteredPokemon = this.filteredPokemon.filter(p => {
                    const height = p.height;
                    switch (selectedSize) {
                        case 'tiny': return height < 0.5;
                        case 'small': return height >= 0.5 && height < 1;
                        case 'medium': return height >= 1 && height < 2;
                        case 'large': return height >= 2 && height < 3;
                        case 'huge': return height >= 3;
                        default: return true;
                    }
                });
            }

            // Filtrar por peso si está seleccionado
            if (selectedWeight) {
                this.filteredPokemon = this.filteredPokemon.filter(p => {
                    const weight = p.weight;
                    switch (selectedWeight) {
                        case 'light': return weight < 10;
                        case 'normal': return weight >= 10 && weight < 50;
                        case 'heavy': return weight >= 50 && weight < 100;
                        case 'massive': return weight >= 100;
                        default: return true;
                    }
                });
            }

        } catch (error) {
            console.error('Error al aplicar filtros:', error);
            this.showError('Error al aplicar filtros');
        } finally {
            this.showLoading(false);
        }

        // Resetear paginación y actualizar vista
        this.currentPage = 1;
        this.clearError(); // Limpiar cualquier mensaje de error previo
        this.displayPokemon();
        this.updatePagination();
    }

    // Mostrar Pokémon en la grilla con paginación
    displayPokemon() {
        const { pokemonGrid, noResults } = this.elements;
        const startIndex = (this.currentPage - 1) * this.pokemonPerPage;
        const pokemonToShow = this.filteredPokemon.slice(startIndex, startIndex + this.pokemonPerPage);

        if (!pokemonToShow.length) {
            pokemonGrid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        pokemonGrid.style.display = 'grid';
        noResults.style.display = 'none';
        pokemonGrid.innerHTML = '';

        pokemonToShow.forEach((pokemon, index) => {
            const card = this.createPokemonCard(pokemon);
            card.style.animationDelay = `${index * 0.1}s`;
            pokemonGrid.appendChild(card);
        });
    }

    // Crear tarjeta visual para un Pokémon
    createPokemonCard(pokemon) {
        // Colores de gradiente para cada tipo de Pokémon
        const typeColors = {
            normal: 'linear-gradient(135deg, #A8A878, #C6C684)', fire: 'linear-gradient(135deg, #F08030, #F5A652)',
            water: 'linear-gradient(135deg, #6890F0, #85A8F7)', electric: 'linear-gradient(135deg, #F8D030, #FAE078)',
            grass: 'linear-gradient(135deg, #78C850, #9ADB71)', ice: 'linear-gradient(135deg, #98D8D8, #BCE6E6)',
            fighting: 'linear-gradient(135deg, #C03028, #D67873)', poison: 'linear-gradient(135deg, #A040A0, #C77ABA)',
            ground: 'linear-gradient(135deg, #E0C068, #EAD69C)', flying: 'linear-gradient(135deg, #A890F0, #C7B2F7)',
            psychic: 'linear-gradient(135deg, #F85888, #FA92B2)', bug: 'linear-gradient(135deg, #A8B820, #C2D21E)',
            rock: 'linear-gradient(135deg, #B8A038, #D0C158)', ghost: 'linear-gradient(135deg, #705898, #A292BC)',
            dragon: 'linear-gradient(135deg, #7038F8, #A27DFA)', dark: 'linear-gradient(135deg, #705848, #A29288)',
            steel: 'linear-gradient(135deg, #B8B8D0, #D1D1E0)', fairy: 'linear-gradient(135deg, #EE99AC, #F4C2C2)'
        };

        // Crear elemento de tarjeta
        const card = document.createElement('div');
        card.className = 'pokemon-card';

        // Usar color del tipo primario o gradiente por defecto
        const backgroundGradient = typeColors[pokemon.types[0]] || 'linear-gradient(135deg, #667eea, #764ba2)';

        // Generar HTML de la tarjeta con toda la información del Pokémon
        card.innerHTML = `
    <div class="pokemon-card-content">
        <div class="pokemon-image">
            <div class="image-placeholder">
                <div class="loading-spinner"></div>
            </div>
            <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy" 
                onload="this.style.opacity=1; this.previousElementSibling.style.display='none';" 
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjYwIiB5PSI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSI+UG9rw6ltb248L3RleHQ+Cjwvc3ZnPg=='; this.previousElementSibling.style.display='none';"
                style="opacity: 0; transition: opacity 0.3s ease;">
            ${pokemon.cry ? `<button class="cry-button" title="Clic para activar audio, luego hover para escuchar">🔊</button>` : ''}
        </div>
        <div class="pokemon-name">${pokemon.name}</div>
        <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
        <div class="pokemon-types">
            ${pokemon.types.map(type =>
            `<span class="type-badge type-${type}">${this.translateType(type)}</span>`
        ).join('')}
        </div>

        <!-- Botón para expandir información -->
        <button class="toggle-info">Ver más</button>

        <!-- Contenido oculto -->
        <div class="extra-info">
            <div class="pokemon-details">
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Altura:</span>
                    <span>${pokemon.height}m</span>
                </div>
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Peso:</span>
                    <span>${pokemon.weight}kg</span>
                </div>
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Experiencia:</span>
                    <span>${pokemon.baseExperience} XP</span>
                </div>
                ${pokemon.color ? `
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Color:</span>
                    <span class="color-with-indicator">
                        <span class="color-dot color-dot-${pokemon.color}"></span>
                        <span class="pokemon-color-${pokemon.color}">${this.translateColor(pokemon.color)}</span>
                    </span>
                </div>` : `
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Color:</span>
                    <span class="info-unavailable">No disponible</span>
                </div>`}
                ${pokemon.habitat ? `
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Hábitat:</span>
                    <span>${this.translateHabitat(pokemon.habitat)}</span>
                </div>` : `
                <div class="pokemon-info-row">
                    <span class="pokemon-info-label">Hábitat:</span>
                    <span class="info-unavailable">No disponible</span>
                </div>`}
                <div class="abilities-section">
                    <div class="pokemon-info-label">Habilidades:</div>
                    <div class="abilities-list">
                        ${pokemon.abilities.slice(0, 3).map(ability =>
            `<span class="ability-badge">${this.translateAbility(ability)}</span>`
        ).join('')}
                    </div>
                </div>
            </div>

            <div class="pokemon-stats">
                ${[
                ['❤️ HP', pokemon.stats.hp],
                ['⚔️ Ataque', pokemon.stats.attack],
                ['🛡️ Defensa', pokemon.stats.defense],
                ['⚡ Velocidad', pokemon.stats.speed]
            ].map(([name, value]) => `
                    <div class="stat-item">
                        <div class="stat-name">${name}</div>
                        <div class="stat-value">${value}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
`;

        // Agregar funcionalidad de reproducir grito
        if (pokemon.cry) {
            const cryButton = card.querySelector('.cry-button');
            if (cryButton) {
                // Activar audio con clic (necesario para políticas del navegador)
                cryButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.playPokemonCry(pokemon.cry, cryButton);
                    // Marcar que el audio ya fue activado por el usuario
                    this.audioActivated = true;
                });

                // Reproducir sonido al pasar el cursor (solo después del primer clic)
                cryButton.addEventListener('mouseenter', (e) => {
                    e.stopPropagation();
                    // Solo funciona después de la primera interacción del usuario
                    if (this.audioActivated) {
                        this.playPokemonCry(pokemon.cry, cryButton);
                    }
                });
            }
        }

        // Aplicar gradiente de fondo basado en el tipo
        card.style.setProperty('--card-gradient', backgroundGradient);
        card.style.background = backgroundGradient;

        // Activar el botón "Ver más / Ver menos"
        const toggleBtn = card.querySelector('.toggle-info');
        const extraInfo = card.querySelector('.extra-info');

        // Asegurar que la información extra esté oculta inicialmente
        if (extraInfo) {
            extraInfo.style.display = 'none';
        }

        if (toggleBtn && extraInfo) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                card.classList.toggle('open');
                if (card.classList.contains('open')) {
                    toggleBtn.textContent = 'Ver menos';
                    extraInfo.style.display = 'block';
                } else {
                    toggleBtn.textContent = 'Ver más';
                    extraInfo.style.display = 'none';
                }
            });
        }
        return card;
    }

    // Actualizar controles de paginación
    updatePagination() {
        const { pagination } = this.elements;
        const totalPages = Math.ceil(this.filteredPokemon.length / this.pokemonPerPage);
        pagination.innerHTML = '';

        if (this.filteredPokemon.length === 0 || totalPages <= 1) return;

        const createBtn = (text, disabled, onClick) => {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.disabled = disabled;
            btn.addEventListener('click', onClick);
            return btn;
        };

        // Botón "Anterior"
        pagination.appendChild(createBtn('← Anterior', this.currentPage === 1, () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayPokemon();
                this.updatePagination();
            }
        }));

        // Páginas numeradas
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createBtn(i, false, () => {
                this.currentPage = i;
                this.displayPokemon();
                this.updatePagination();
            });
            pageBtn.style.background = i === this.currentPage ? '#667eea' : 'white';
            pageBtn.style.color = i === this.currentPage ? 'white' : '#667eea';
            pagination.appendChild(pageBtn);
        }

        // Botón "Siguiente"
        pagination.appendChild(createBtn('Siguiente →', this.currentPage === totalPages, () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.displayPokemon();
                this.updatePagination();
            }
        }));
    }

    // Resetear todos los filtros y búsquedas a sus valores por defecto
    resetAllFilters() {
        const { searchInput, typeFilter, generationFilter, colorFilter, habitatFilter, sizeFilter, weightFilter } = this.elements;

        if (searchInput) searchInput.value = '';

        [typeFilter, generationFilter, colorFilter, habitatFilter, sizeFilter, weightFilter]
            .forEach(filter => {
                if (filter) filter.value = '';
            });

        this.hideSuggestions();
        this.clearError();
        this.currentPage = 1;
    }

    // Limpiar todos los filtros y recargar
    clearAllFilters() {
        this.resetAllFilters();
        this.applyFilters();
    }

    // Verificar si necesitamos cargar más Pokémon de una generación
    async ensureGenerationLoaded(genNumber) {
        const genRanges = {
            '1': [1, 151],      // Kanto
            '2': [152, 251],    // Johto  
            '3': [252, 386],    // Hoenn
            '4': [387, 493],    // Sinnoh
            '5': [494, 649],    // Unova
            '6': [650, 721],    // Kalos
            '7': [722, 809],    // Alola
            '8': [810, 905],    // Galar
            '9': [906, 1025]    // Paldea
        };

        if (!genRanges[genNumber]) return;

        const [start, end] = genRanges[genNumber];
        const neededIds = Array.from({ length: end - start + 1 }, (_, i) => start + i)
            .filter(id => !this.pokemonById.has(id));

        if (neededIds.length > 0) {
            await this.loadMissingPokemon(neededIds, 'id');
        }
    }



    // Reproducir grito del Pokémon al hacer hover
    playPokemonCry(cryUrl, button) {
        try {
            // Evitar reproducir el mismo sonido múltiples veces seguidas
            if (this.currentAudio && this.currentAudio.src === cryUrl && !this.currentAudio.ended) {
                return; // Ya se está reproduciendo este sonido
            }

            // Detener cualquier audio previo
            this.stopCurrentAudio();

            // Crear nuevo elemento de audio
            this.currentAudio = new Audio(cryUrl);
            this.currentAudio.volume = 0.4; // Volumen moderado
            this.currentPlayingButton = button;

            // Cambiar apariencia del botón mientras reproduce
            const originalText = button.textContent;
            button.textContent = '🎵';
            button.style.transform = 'scale(1.2)';
            button.classList.add('playing');

            // Reproducir audio
            this.currentAudio.play().catch(error => {
                console.error('Error al reproducir Pokémon Cry:', error);
                this.restoreButton(button, originalText);
            });

            // Restaurar botón cuando termine
            this.currentAudio.addEventListener('ended', () => {
                this.restoreButton(button, originalText);
            });

            this.currentAudio.addEventListener('error', () => {
                this.restoreButton(button, originalText);
            });

        } catch (error) {
            console.error('Error al crear audio:', error);
        }
    }

    // Detener audio actual si existe
    stopCurrentAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            if (this.currentPlayingButton) {
                this.restoreButton(this.currentPlayingButton, '🔊');
            }
        }
    }

    // Restaurar apariencia original del botón
    restoreButton(button, originalText) {
        if (button) {
            button.textContent = originalText;
            button.style.transform = 'scale(1)';
            button.classList.remove('playing');
        }
        this.currentPlayingButton = null;
    }

    // Métodos de utilidad para mostrar/ocultar elementos de la UI
    showSuggestions() {
        this.elements.searchSuggestions.style.display = 'block';
    }

    hideSuggestions() {
        this.elements.searchSuggestions.style.display = 'none';
    }

    showLoading(show, message = 'Cargando Pokémon...') {
        const { loading } = this.elements;
        loading.style.display = show ? 'block' : 'none';
        if (show && loading.querySelector('p')) {
            loading.querySelector('p').textContent = message;
        }
    }

    showError(message) {
        const { searchError } = this.elements;
        searchError.textContent = message;
        searchError.style.display = 'block';
    }

    clearError() {
        this.elements.searchError.style.display = 'none';
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia del explorador de Pokémon y hacerla global para el tour
    window.pokemonExplorer = new PokemonExplorer();



    // 👾 Crear animación de píxeles arcade de fondo
    const pixelColors = ['#fff900', '#ff0055', '#00eaff']; // Colores neón
    const arcadePixels = document.querySelector('.arcade-pixels');

    // Generar 30 píxeles con posiciones y duraciones aleatorias
    Array.from({ length: 30 }, (_, i) => {
        const px = document.createElement('div');
        px.className = 'arcade-pixel';

        // Asignar propiedades CSS aleatorias para cada píxel
        Object.assign(px.style, {
            left: Math.random() * 100 + 'vw',        // Posición horizontal aleatoria
            top: Math.random() * 100 + 'vh',         // Posición vertical aleatoria
            background: pixelColors[Math.floor(Math.random() * pixelColors.length)], // Color aleatorio
            animationDuration: (4 + Math.random() * 4) + 's' // Duración de animación aleatoria (4-8s)
        });

        arcadePixels.appendChild(px);
    });

    // Inicializar guía interactiva personalizada
    initializeTourNew();
});

// Función para inicializar la guía interactiva
function initializeTour() {
    // Verificar si Driver.js está disponible
    if (typeof Driver === 'undefined') {
        console.error('Driver.js no está cargado');
        // Fallback: mostrar alerta simple
        const startTourBtn = document.getElementById('startTour');
        if (startTourBtn) {
            startTourBtn.addEventListener('click', () => {
                alert('¡Bienvenido a Pokémon Explorer!\n\nEsta es tu Pokédex interactiva completa con:\n• Búsqueda inteligente\n• 1300+ Pokémon\n• 9 generaciones\n• Sonidos reales\n\n¡Explora y diviértete!');
            });
        }
        return;
    }

    console.log('Driver.js cargado correctamente');

    const driver = new Driver({
        showProgress: true,
        animate: true,
        opacity: 0.75,
        padding: 10,
        allowClose: true,
        steps: [
            {
                element: '#search-section',
                popover: {
                    title: 'Búsqueda Inteligente',
                    description: 'Aquí puedes buscar Pokémon por nombre, tipo, color, hábitat o tamaño.',
                    position: 'bottom'
                }
            },
            {
                element: '#type-filter-section',
                popover: {
                    title: 'Filtro por Tipo',
                    description: 'Filtra Pokémon por su tipo elemental.',
                    position: 'bottom'
                }
            },
            {
                element: '#generation-filter-section',
                popover: {
                    title: 'Filtro por Generación',
                    description: 'Explora Pokémon por región desde Kanto hasta Paldea.',
                    position: 'bottom'
                }
            }
        ]
    });

    // Event listener para el botón de iniciar tour
    const startTourBtn = document.getElementById('startTour');
    console.log('Botón encontrado:', startTourBtn);

    if (startTourBtn) {
        startTourBtn.addEventListener('click', () => {
            console.log('Botón clickeado, iniciando tour...');
            try {
                driver.start();
            } catch (error) {
                console.error('Error al iniciar el tour:', error);
            }
        });
        console.log('Event listener agregado correctamente');
    } else {
        console.error('No se encontró el botón startTour');
    }

    // Auto-iniciar el tour para nuevos usuarios (opcional)
    // Descomenta la siguiente línea si quieres que se inicie automáticamente
    // setTimeout(() => driver.start(), 2000);
}


// Guía interactiva personalizada
class PokemonTour {
    constructor() {
        this.currentStep = 0;
        this.steps = [
            {
                element: '#search-section',
                title: '🔍 Búsqueda Inteligente',
                description: 'Aquí puedes buscar Pokémon de múltiples formas:<br>• Por nombre: "pikachu"<br>• Por tipo: "fuego", "agua"<br>• Por color: "rojo", "azul"<br>• Por hábitat: "bosque", "mar"<br>• Por tamaño: "grande", "pequeño"<br><br>¡Incluso puedes combinar criterios como "fuego rojo"!'
            },
            {
                element: '#type-filter-section',
                title: '⚡ Filtro por Tipo',
                description: 'Filtra Pokémon por su tipo elemental. Hay 18 tipos diferentes: Fuego, Agua, Planta, Eléctrico, y muchos más. ¡Todos traducidos al español!'
            },
            {
                element: '#generation-filter-section',
                title: '🌍 Filtro por Generación',
                description: 'Explora Pokémon por Generacion:<br>• Gen I: Kanto (clásicos como Pikachu)<br>• Gen II: Johto<br>• Gen III: Hoenn<br>• ...hasta Gen IX: Paldea<br><br>¡Más de 1300 Pokémon disponibles!'
            },
            {
                element: '#pokemonGrid',
                title: '🎴 Área de Pokémon',
                description: 'Aquí aparecen las tarjetas de Pokémon con información completa:<br>• <strong>Imagen oficial</strong> de alta calidad<br>• <strong>Tipos</strong> con colores característicos<br>• <strong>Estadísticas</strong>: HP, Ataque, Defensa, Velocidad<br>• <strong>Habilidades</strong> traducidas al español<br>• <strong>Color y hábitat</strong> del Pokémon<br>• <strong>Sonidos reales</strong>: Botón 🔊 para escuchar gritos<br>• <strong>Información expandible</strong> en móviles'
            },
            {
                element: '#pagination',
                title: '📄 Navegación por Páginas',
                description: 'Los controles de paginación aparecen automáticamente cuando hay más de 12 Pokémon:<br>• <strong>Botones numerados</strong>: Salta directamente a cualquier página<br>• <strong>Anterior/Siguiente</strong>: Navegación secuencial<br>• <strong>Adaptación automática</strong>: Se ajusta según tus filtros y búsquedas<br>• <strong>Sin límites</strong>: Accede a todos los Pokémon disponibles<br><br>💡 <em>Si no ves los controles ahora, aparecerán cuando busques o filtres más Pokémon</em>'
            },
            {
                element: 'body',
                title: '🎉 ¡Listo para Explorar!',
                description: 'Ya conoces todas las funcionalidades de tu Pokédex:<br><br>✅ <strong>Búsqueda inteligente</strong> en español<br>✅ <strong>1300+ Pokémon</strong> de 9 generaciones<br>✅ <strong>Filtros avanzados</strong> por tipo y generación<br>✅ <strong>Información completa</strong> traducida<br>✅ <strong>Sonidos reales</strong> de Pokémon<br>✅ <strong>Navegación ilimitada</strong><br>✅ <strong>Diseño responsive</strong><br><br>¡Ahora ve y conviértete en un maestro Pokémon! 🚀'
            }
        ];
        this.overlay = null;
        this.popup = null;
    }

    async start() {
        this.currentStep = 0;
        this.createOverlay();

        // Debug: verificar estado inicial
        const pokemonCards = document.querySelectorAll('.pokemon-card');
        const paginationElement = document.getElementById('pagination');

        console.log('Estado inicial del tour:', {
            pokemonCards: pokemonCards.length,
            paginationElement: paginationElement,
            paginationButtons: paginationElement ? paginationElement.children.length : 0,
            paginationVisible: paginationElement ? paginationElement.offsetParent !== null : false
        });

        if (pokemonCards.length === 0 || !paginationElement || paginationElement.children.length === 0) {
            // Mostrar mensaje de carga mientras esperamos
            this.showLoadingStep();

            // Si hay una instancia del explorador, cargar más Pokémon
            if (window.pokemonExplorer) {
                try {
                    // Cargar suficientes Pokémon para activar la paginación (más de 12)
                    await window.pokemonExplorer.loadMissingPokemon([...Array(25).keys()].map(i => i + 1), 'id');

                    // Forzar actualización de paginación
                    window.pokemonExplorer.updatePagination();

                    console.log('Después de cargar Pokémon:', {
                        pokemonCards: document.querySelectorAll('.pokemon-card').length,
                        paginationButtons: paginationElement ? paginationElement.children.length : 0,
                        paginationVisible: paginationElement ? paginationElement.offsetParent !== null : false
                    });
                } catch (error) {
                    console.log('Error cargando Pokémon para el tour:', error);
                }
            }

            // Esperar un poco más para que se actualice la paginación
            setTimeout(() => {
                this.showStep();
            }, 1500);
        } else {
            this.showStep();
        }
    }

    // Mostrar paso de carga mientras esperamos que se carguen los Pokémon
    showLoadingStep() {
        this.popup.querySelector('.tour-title').innerHTML = '⏳ Preparando la Guía Interactiva';
        this.popup.querySelector('.tour-description').innerHTML = 'Estamos cargando suficientes Pokémon para mostrarte todas las funcionalidades, incluyendo la navegación por páginas. Esto solo tomará unos segundos...<br><br>🔄 <strong>Cargando Pokémon...</strong><br>📄 <strong>Preparando paginación...</strong>';
        this.popup.querySelector('.tour-step-info').textContent = 'Preparando experiencia completa...';

        // Ocultar todos los botones durante la carga
        this.popup.querySelector('.tour-prev').style.display = 'none';
        this.popup.querySelector('.tour-next').style.display = 'none';
        this.popup.querySelector('.tour-finish').style.display = 'none';

        // Centrar el popup
        this.centerPopup();
    }

    createOverlay() {
        // Crear overlay oscuro
        this.overlay = document.createElement('div');
        this.overlay.className = 'tour-overlay';
        this.overlay.innerHTML = `
            <div class="tour-popup">
                <div class="tour-header">
                    <h3 class="tour-title"></h3>
                    <button class="tour-close">✕</button>
                </div>
                <div class="tour-content">
                    <p class="tour-description"></p>
                </div>
                <div class="tour-footer">
                    <div class="tour-progress">
                        <span class="tour-step-info"></span>
                    </div>
                    <div class="tour-buttons">
                        <button class="tour-btn tour-prev">← Anterior</button>
                        <button class="tour-btn tour-next">Siguiente →</button>
                        <button class="tour-btn tour-finish">¡Entendido!</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);
        this.popup = this.overlay.querySelector('.tour-popup');

        // Event listeners
        this.overlay.querySelector('.tour-close').addEventListener('click', () => this.close());
        this.overlay.querySelector('.tour-prev').addEventListener('click', () => this.previousStep());
        this.overlay.querySelector('.tour-next').addEventListener('click', () => this.nextStep());
        this.overlay.querySelector('.tour-finish').addEventListener('click', () => this.close());
    }

    showStep() {
        const step = this.steps[this.currentStep];
        const element = document.querySelector(step.element);

        // Manejo especial para paginación
        if (step.element === '#pagination') {
            const isPaginationVisible = this.ensurePaginationVisible();
            const paginationElement = document.getElementById('pagination');

            // Actualizar contenido del popup
            this.popup.querySelector('.tour-title').innerHTML = step.title;
            this.popup.querySelector('.tour-description').innerHTML = step.description;
            this.popup.querySelector('.tour-step-info').textContent = `${this.currentStep + 1} de ${this.steps.length}`;
            this.updateButtons();

            if (isPaginationVisible && paginationElement) {
                console.log('Paginación visible, resaltando elemento');
                // Resaltar elemento
                this.highlightElement(paginationElement);
                // Centrar popup y hacer scroll al elemento
                this.centerPopup();
                // Pequeño delay para asegurar que el popup esté centrado antes del scroll
                setTimeout(() => {
                    paginationElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                }, 100);
            } else {
                console.log('Paginación no visible, mostrando paso centrado');
                // Mostrar paso centrado sin resaltar
                this.removeHighlight();
                this.centerPopup();
            }
            return;
        }

        // Si el elemento no existe o no es visible, manejar según el tipo
        if (!element || (element && element.offsetParent === null)) {
            console.log(`Elemento ${step.element} no encontrado o no visible`);

            // Para elementos opcionales, mostrar popup centrado
            if (step.element === '.pokemon-card') {
                console.log('Mostrando paso sin resaltar elemento');
                // Remover cualquier resaltado previo
                this.removeHighlight();
                // Centrar el popup
                this.centerPopup();
            } else {
                // Para elementos requeridos, saltar al siguiente paso
                if (this.currentStep < this.steps.length - 1) {
                    this.currentStep++;
                    this.showStep();
                    return;
                }
            }
        }

        // Debug: mostrar paso actual
        console.log(`Mostrando paso ${this.currentStep + 1}: ${step.title}`);
        console.log(`Elemento: ${step.element}`, element);

        // Actualizar contenido del popup
        this.popup.querySelector('.tour-title').innerHTML = step.title;
        this.popup.querySelector('.tour-description').innerHTML = step.description;
        this.popup.querySelector('.tour-step-info').textContent = `${this.currentStep + 1} de ${this.steps.length}`;

        // Actualizar botones
        this.updateButtons();

        // Si el elemento existe y es visible, resaltarlo y posicionarlo
        if (element && element.offsetParent !== null) {
            console.log('Elemento encontrado y visible, resaltando:', step.element);
            // Resaltar elemento
            this.highlightElement(element);
            // Posicionar popup
            this.positionPopup(element);
            // Scroll al elemento
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            console.log('Elemento no visible, centrando popup:', step.element);
            // Si no hay elemento visible, centrar popup
            this.removeHighlight();
            this.centerPopup();
        }
    }

    // Verificar si un elemento es requerido para continuar
    isElementRequired(selector) {
        // Elementos que pueden no existir al inicio
        const optionalElements = [
            '.pokemon-card:first-child .cry-button',
            '.pokemon-card:first-child .toggle-info',
            '.pokemon-card:first-child'
        ];
        return optionalElements.includes(selector);
    }

    removeHighlight() {
        // Remover highlight anterior
        document.querySelectorAll('.tour-highlighted').forEach(el => {
            el.classList.remove('tour-highlighted');
        });
    }

    updateButtons() {
        const prevBtn = this.popup.querySelector('.tour-prev');
        const nextBtn = this.popup.querySelector('.tour-next');
        const finishBtn = this.popup.querySelector('.tour-finish');

        prevBtn.style.display = this.currentStep === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = this.currentStep === this.steps.length - 1 ? 'none' : 'inline-block';
        finishBtn.style.display = this.currentStep === this.steps.length - 1 ? 'inline-block' : 'none';
    }

    // Método para centrar el popup usando el overlay
    centerPopup() {
        // Resetear todos los estilos del popup que puedan interferir
        this.popup.style.position = 'relative';
        this.popup.style.top = 'auto';
        this.popup.style.left = 'auto';
        this.popup.style.right = 'auto';
        this.popup.style.bottom = 'auto';
        this.popup.style.transform = 'none';
        this.popup.style.zIndex = 'auto';

        // El overlay ya tiene los estilos CSS correctos para centrar
        this.overlay.className = 'tour-overlay';
    }

    // Método para verificar y preparar la paginación para el tour
    ensurePaginationVisible() {
        const paginationElement = document.getElementById('pagination');
        if (!paginationElement) {
            console.log('❌ Elemento de paginación no encontrado');
            return false;
        }

        console.log('🔍 Estado inicial de paginación:', {
            element: paginationElement,
            innerHTML: paginationElement.innerHTML,
            childrenCount: paginationElement.children.length,
            offsetParent: paginationElement.offsetParent,
            display: window.getComputedStyle(paginationElement).display,
            visibility: window.getComputedStyle(paginationElement).visibility
        });

        // Si no hay botones, intentar forzar la actualización
        if (paginationElement.children.length === 0 && window.pokemonExplorer) {
            console.log('🔄 Forzando actualización de paginación...');
            window.pokemonExplorer.updatePagination();

            // Verificar después de la actualización
            setTimeout(() => {
                console.log('🔍 Estado después de actualización:', {
                    childrenCount: paginationElement.children.length,
                    innerHTML: paginationElement.innerHTML
                });
            }, 100);
        }

        // Verificar si ahora es visible
        const hasButtons = paginationElement.children.length > 0;
        const isDisplayed = paginationElement.offsetParent !== null;
        const computedStyle = window.getComputedStyle(paginationElement);
        const isVisible = hasButtons && isDisplayed && computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';

        console.log('✅ Resultado final de verificación:', {
            hasButtons,
            isDisplayed,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            isVisible
        });

        return isVisible;
    }

    highlightElement(element) {
        // Remover highlight anterior
        this.removeHighlight();

        // Agregar highlight al elemento actual
        if (element) {
            element.classList.add('tour-highlighted');
        }
    }

    positionPopup(element) {
        // Siempre centrar el popup para evitar problemas de posicionamiento
        this.centerPopup();

        // Si hay un elemento específico, hacer scroll hacia él con un pequeño delay
        if (element && element.tagName !== 'BODY') {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }, 100);
        }
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;

            // Si el siguiente paso es paginación, dar un pequeño delay
            const nextStep = this.steps[this.currentStep];
            if (nextStep.element === '#pagination') {
                setTimeout(() => {
                    this.showStep();
                }, 300);
            } else {
                this.showStep();
            }
        }
    }

    // Verificar si hay Pokémon cargados para mostrar información adicional
    checkPokemonLoaded() {
        const pokemonCards = document.querySelectorAll('.pokemon-card');
        const pagination = document.querySelector('#pagination');

        if (pokemonCards.length > 0) {
            // Actualizar descripción del paso de tarjetas si hay Pokémon
            const cardStep = this.steps.find(step => step.element === '.pokemon-card:first-child');
            if (cardStep) {
                const hasCryButton = document.querySelector('.pokemon-card:first-child .cry-button');
                const hasToggleInfo = document.querySelector('.pokemon-card:first-child .toggle-info');

                let description = 'Cada tarjeta de Pokémon muestra información completa:<br>• <strong>Imagen oficial</strong> de alta calidad<br>• <strong>Tipos</strong> con colores característicos<br>• <strong>Estadísticas</strong> de combate<br>• <strong>Habilidades</strong> traducidas al español';

                if (hasCryButton) {
                    description += '<br>• <strong>Sonido real</strong>: Haz clic en 🔊 para activar, luego hover para escuchar';
                }

                if (hasToggleInfo) {
                    description += '<br>• <strong>Ver más</strong>: En móviles, toca para ver información adicional';
                }

                cardStep.description = description;
            }
        }

        return pokemonCards.length > 0;
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    close() {
        // Remover highlights
        document.querySelectorAll('.tour-highlighted').forEach(el => {
            el.classList.remove('tour-highlighted');
        });

        // Remover overlay
        if (this.overlay) {
            // Limpiar clases y estilos
            this.overlay.className = '';
            this.overlay.remove();
            this.overlay = null;
            this.popup = null;
        }
        // Hacer scroll al inicio al cerrar el tour
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Reemplazar la función de inicialización
function initializeTourNew() {
    const tour = new PokemonTour();

    // Event listener para el botón de iniciar tour
    const startTourBtn = document.getElementById('startTour');

    if (startTourBtn) {
        startTourBtn.addEventListener('click', () => {
            tour.start();
        });
    }
}