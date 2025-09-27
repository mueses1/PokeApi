// Define la clase PokemonExplorer para encapsular toda la lógica de la Pokédex.
class PokemonExplorer {
    // El constructor inicializa la aplicación.
    constructor() {
        // URL base para la API de Pokémon.
        this.API_BASE_URL = 'https://pokeapi.co/api/v2';
        // Constantes para traducciones y configuraciones.
        this.constants = {
            typeTranslations: {
                'normal': 'Normal', 'fire': 'Fuego', 'water': 'Agua', 'electric': 'Eléctrico',
                'grass': 'Planta', 'ice': 'Hielo', 'fighting': 'Lucha', 'poison': 'Veneno',
                'ground': 'Tierra', 'flying': 'Volador', 'psychic': 'Psíquico', 'bug': 'Bicho',
                'rock': 'Roca', 'ghost': 'Fantasma', 'dragon': 'Dragón', 'dark': 'Siniestro',
                'steel': 'Acero', 'fairy': 'Hada'
            },
            abilityTranslations: {
                'Shed Skin': 'Muda la piel', 'overgrow': 'Espesura', 'chlorophyll': 'Clorofila',
                'blaze': 'Llamarada', 'solar-power': 'Poder Solar', 'torrent': 'Torrente',
                'rain-dish': 'Cura Lluvia', 'shield-dust': 'Polvo Escudo', 'run-away': 'Fuga',
                'keen-eye': 'Vista Lince', 'tangled-feet': 'Pies Enredados', 'big-pecks': 'Sacapecho',
                'guts': 'Agallas', 'hustle': 'Entusiasmo', 'intimidate': 'Intimidación',
                'static': 'Electricidad Estática', 'lightning-rod': 'Pararrayos', 'sand-veil': 'Velo Arena',
                'poison-point': 'Punto Tóxico', 'rivalry': 'Rivalidad', 'sheer-force': 'Potencia Bruta',
                'cute-charm': 'Gran Encanto', 'magic-guard': 'Muro Mágico', 'friend-guard': 'Compiescolta',
                'healer': 'Curación', 'natural-cure': 'Cura Natural', 'serene-grace': 'Dicha',
                'super-luck': 'Afortunado', 'swarm': 'Enjambre', 'sniper': 'Francotirador',
                'sturdy': 'Robustez', 'rock-head': 'Cabeza Roca', 'weak-armor': 'Armadura Frágil',
                'magnet-pull': 'Imán', 'analytic': 'Cálculo Final', 'levitate': 'Levitación',
                'effect-spore': 'Efecto Espora', 'dry-skin': 'Piel Seca', 'damp': 'Humedad',
                'wonder-skin': 'Piel Milagro', 'arena-trap': 'Trampa Arena', 'hyper-cutter': 'Corte Fuerte',
                'sand-stream': 'Chorro Arena', 'battle-armor': 'Armadura Batalla', 'shell-armor': 'Caparazón',
                'clear-body': 'Cuerpo Puro', 'liquid-ooze': 'Lodo Líquido', 'thick-fat': 'Sebo',
                'early-bird': 'Madrugar', 'flame-body': 'Cuerpo Llama', 'synchronize': 'Sincronía',
                'inner-focus': 'Foco Interno', 'magma-armor': 'Armadura Magma', 'water-veil': 'Velo Agua',
                'oblivious': 'Despiste', 'cloud-nine': 'Aclimatación', 'compound-eyes': 'Ojo Compuesto',
                'insomnia': 'Insomnio', 'color-change': 'Cambio Color', 'immunity': 'Inmunidad',
                'flash-fire': 'Absorbe Fuego', 'own-tempo': 'Ritmo Propio', 'suction-cups': 'Ventosas',
                'pressure': 'Presión', 'volt-absorb': 'Absorbe Elec', 'water-absorb': 'Absorbe Agua',
                'forecast': 'Predicción', 'trace': 'Calco', 'huge-power': 'Potencia',
                'poison-heal': 'Antídoto', 'adaptability': 'Adaptabilidad', 'skill-link': 'Encadenado',
                'hydration': 'Hidratación', 'quick-feet': 'Pies Rápidos', 'normalize': 'Normalidad',
                'wonder-guard': 'Superguarda', 'air-lock': 'Ausencia', 'truant': 'Pereza',
                'protean': 'Mutatipo', 'fur-coat': 'Pelaje Recio', 'magician': 'Prestidigitador',
                'bulletproof': 'Antibalas', 'competitive': 'Competitivo', 'strong-jaw': 'Mandíbula Fuerte',
                'refrigerate': 'Piel Helada', 'pixilate': 'Piel Feérica', 'gooey': 'Viscosidad',
                'aerilate': 'Piel Celeste', 'parental-bond': 'Amor Filial', 'dark-aura': 'Aura Oscura',
                'fairy-aura': 'Aura Feérica', 'aura-break': 'Rompe Aura', 'dazzling': 'Deslumbrante',
                'soul-heart': 'Corazón Alma', 'tangling-hair': 'Rizos Rebeldes', 'receiver': 'Receptor',
                'power-of-alchemy': 'Poder Alquímico', 'beast-boost': 'Ultraimpulso', 'rks-system': 'Sistema Alfa',
                'electric-surge': 'Campo Eléctrico', 'psychic-surge': 'Campo Psíquico', 'misty-surge': 'Campo de Niebla',
                'grassy-surge': 'Campo de Hierba', 'cotton-down': 'Pelusa', 'propeller-tail': 'Cola Hélice',
                'mirror-armor': 'Coraza Espejo', 'gulp-missile': 'Tragamisil', 'stalwart': 'Acérrimo',
                'steam-engine': 'Combustible', 'punk-rock': 'Punk Rock', 'sand-spit': 'Expulsarena',
                'ice-scales': 'Escama de Hielo', 'ripen': 'Maduración', 'ice-face': 'Cara de Hielo',
                'power-spot': 'Fuente Energía', 'mimicry': 'Mimetismo', 'screen-cleaner': 'Antibarrera',
                'steely-spirit': 'Alma Acerada', 'perish-body': 'Cuerpo Mortal', 'wandering-spirit': 'Alma Errante',
                'gorilla-tactics': 'Monotema', 'neutralizing-gas': 'Gas Reactivo', 'pastel-veil': 'Velo Pastel',
                'hunger-switch': 'Mutapetito', 'quick-draw': 'Mano Rápida', 'unseen-fist': 'Puño Invisible',
                'curious-medicine': 'Medicina Extraña', 'transistor': 'Transistor', 'dragons-maw': 'Mandíbula Dragón',
                'chilling-neigh': 'Relincho Blanco', 'grim-neigh': 'Relincho Negro', 'lingering-aroma': 'Olor Persistente',
                'seed-sower': 'Disemillado', 'thermal-exchange': 'Termocambio', 'anger-shell': 'Coraza Ira',
                'purifying-salt': 'Sal Purificadora', 'well-baked-body': 'Cuerpo Horneado', 'wind-rider': 'Surcavientos',
                'guard-dog': 'Perro Guardián', 'rocky-payload': 'Carga Rocosa', 'wind-power': 'Energía Eólica',
                'zero-to-hero': 'Cambio Heroico', 'commander': 'Comandar', 'electromorphosis': 'Electromorfosis',
                'protosynthesis': 'Protosíntesis', 'quark-drive': 'Propulsión Cuark', 'good-as-gold': 'Cuerpo Áureo',
                'vessel-of-ruin': 'Caldero Debacle', 'sword-of-ruin': 'Espada Debacle', 'tablets-of-ruin': 'Tablilla Debacle',
                'beads-of-ruin': 'Abalorio Debacle', 'orichalcum-pulse': 'Latido Oricalco', 'hadron-engine': 'Motor Hadrónico',
                'opportunist': 'Oportunista', 'cud-chew': 'Rumia', 'sharpness': 'Cortante',
                'supreme-overlord': 'Jefe Supremo', 'costar': 'Unísono', 'toxic-debris': 'Toxidetritos',
                'armor-tail': 'Cola Armadura', 'earth-eater': 'Geofagia', 'mycelium-might': 'Poder Fúngico'
            },
            colorTranslations: {
                'black': 'Negro', 'blue': 'Azul', 'brown': 'Marrón', 'gray': 'Gris',
                'green': 'Verde', 'pink': 'Rosa', 'purple': 'Morado', 'red': 'Rojo',
                'white': 'Blanco', 'yellow': 'Amarillo'
            },
            habitatTranslations: {
                'cave': 'Cueva', 'forest': 'Bosque', 'grassland': 'Pradera', 'mountain': 'Montaña',
                'rare': 'Raro', 'rough-terrain': 'Terreno Áspero', 'sea': 'Mar', 'urban': 'Urbano',
                'waters-edge': 'Orilla del Agua'
            },
            searchKeywords: {
                'fuego': 'fire', 'agua': 'water', 'planta': 'grass', 'eléctrico': 'electric', 'electrico': 'electric',
                'hielo': 'ice', 'lucha': 'fighting', 'veneno': 'poison', 'tierra': 'ground', 'volador': 'flying',
                'psíquico': 'psychic', 'psiquico': 'psychic', 'bicho': 'bug', 'roca': 'rock', 'fantasma': 'ghost',
                'dragón': 'dragon', 'dragon': 'dragon', 'siniestro': 'dark', 'acero': 'steel', 'hada': 'fairy',
                'normal': 'normal', 'negro': 'black', 'azul': 'blue', 'marrón': 'brown', 'marron': 'brown',
                'gris': 'gray', 'verde': 'green', 'rosa': 'pink', 'morado': 'purple', 'rojo': 'red',
                'blanco': 'white', 'amarillo': 'yellow', 'cueva': 'cave', 'bosque': 'forest',
                'pradera': 'grassland', 'montaña': 'mountain', 'montana': 'mountain', 'raro': 'rare',
                'terreno áspero': 'rough-terrain', 'terreno aspero': 'rough-terrain', 'mar': 'sea',
                'urbano': 'urban', 'orilla': 'waters-edge', 'pequeño': 'small', 'pequeno': 'small',
                'muy pequeño': 'tiny', 'muy pequeno': 'tiny', 'mediano': 'medium', 'grande': 'large',
                'enorme': 'huge', 'gigante': 'huge', 'ligero': 'light', 'pesado': 'heavy', 'masivo': 'massive'
            },
            typeColors: {
                normal: 'linear-gradient(135deg, #A8A878, #C6C684)', fire: 'linear-gradient(135deg, #F08030, #F5A652)',
                water: 'linear-gradient(135deg, #6890F0, #85A8F7)', electric: 'linear-gradient(135deg, #F8D030, #FAE078)',
                grass: 'linear-gradient(135deg, #78C850, #9ADB71)', ice: 'linear-gradient(135deg, #98D8D8, #BCE6E6)',
                fighting: 'linear-gradient(135deg, #C03028, #D67873)', poison: 'linear-gradient(135deg, #A040A0, #C77ABA)',
                ground: 'linear-gradient(135deg, #E0C068, #EAD69C)', flying: 'linear-gradient(135deg, #A890F0, #C7B2F7)',
                psychic: 'linear-gradient(135deg, #F85888, #FA92B2)', bug: 'linear-gradient(135deg, #A8B820, #C2D21E)',
                rock: 'linear-gradient(135deg, #B8A038, #D0C158)', ghost: 'linear-gradient(135deg, #705898, #A292BC)',
                dragon: 'linear-gradient(135deg, #7038F8, #A27DFA)', dark: 'linear-gradient(135deg, #705848, #A29288)',
                steel: 'linear-gradient(135deg, #B8B8D0, #D1D1E0)', fairy: 'linear-gradient(135deg, #EE99AC, #F4C2C2)'
            },
            genRanges: {
                '1': [1, 151], '2': [152, 251], '3': [252, 386], '4': [387, 493], '5': [494, 649],
                '6': [650, 721], '7': [722, 809], '8': [810, 905], '9': [906, 1025]
            }
        };

        // Estado de la aplicación.
        Object.assign(this, {
            currentPage: 1,
            pokemonPerPage: 12,
            allPokemon: [],
            filteredPokemon: [],
            pokemonTypes: [],
            pokemonNames: [],
            searchTimeout: null,
            pokemonById: new Map(),
            pokemonByName: new Map(),
            audioActivated: false,
            pokemonColors: [],
            pokemonHabitats: []
        });

        // Referencias a elementos del DOM.
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

        // Configuración inicial.
        this.setupEventListeners();
        this.resetAllFilters();
        this.loadInitialData();
    }

    // Configura los listeners de eventos para la interacción del usuario.
    setupEventListeners() {
        const { searchInput, searchSuggestions } = this.elements;
        searchInput.addEventListener('input', e => this.handleSearch(e.target.value));
        searchInput.addEventListener('focus', () => searchInput.value.trim() && this.showSuggestions());
        searchInput.addEventListener('blur', () => setTimeout(() => this.hideSuggestions(), 200));

        ['typeFilter', 'generationFilter', 'colorFilter', 'habitatFilter', 'sizeFilter', 'weightFilter']
            .forEach(filterId => {
                const filter = this.elements[filterId];
                if (filter) filter.addEventListener('change', () => this.applyFilters());
            });

        document.addEventListener('click', e => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    // Traduce una clave usando un mapa de traducciones.
    translate(key, translationMap, fallbackFormatter = null) {
        const translation = this.constants[translationMap][key];
        if (translation) return translation;
        if (fallbackFormatter) return fallbackFormatter(key);
        return key.charAt(0).toUpperCase() + key.slice(1);
    }

    // Analiza una consulta de búsqueda para identificar criterios como nombre, tipo, etc.
    parseSmartSearch(query) {
        const criteria = { name: '', type: null, color: null, habitat: null, size: null, weight: null };
        const words = query.toLowerCase().trim().split(/\s+/);
        const remainingWords = [];

        const categoryMap = {
            types: Object.values(this.constants.searchKeywords),
            colors: Object.values(this.constants.searchKeywords),
            habitats: Object.values(this.constants.searchKeywords),
            sizes: ['tiny', 'small', 'medium', 'large', 'huge'],
            weights: ['light', 'heavy', 'massive']
        };

        for (const word of words) {
            const keyword = this.constants.searchKeywords[word];
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

    // Carga los datos iniciales como tipos, colores y hábitats de Pokémon.
    async loadInitialData() {
        try {
            const [types, colors, habitats] = await Promise.all([
                fetch(`${this.API_BASE_URL}/type`).then(res => res.json()),
                fetch(`${this.API_BASE_URL}/pokemon-color`).then(res => res.json()),
                fetch(`${this.API_BASE_URL}/pokemon-habitat`).then(res => res.json())
            ]);

            this.pokemonTypes = types.results;
            this.pokemonColors = colors.results;
            this.pokemonHabitats = habitats.results;

            this.populateFilters();
            this.loadPokemon();
        } catch (error) {
            console.error('Error al cargar datos iniciales:', error);
        }
    }

    // Crea un elemento de opción para un menú desplegable.
    createOption(name, value = name, translator = null) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = translator ? translator(name) : name;
        return option;
    }

    // Rellena un filtro desplegable con datos.
    populateFilter(element, data, defaultOption, translationMap, specialOrder = []) {
        if (!element) return;
        element.innerHTML = `<option value="">${defaultOption}</option>`;
        
        const sortedData = [...specialOrder.filter(item => data.find(d => d.name === item)),
                            ...data.filter(d => !specialOrder.includes(d.name))];

        sortedData.forEach(item => {
            const itemName = typeof item === 'string' ? item : item.name;
            element.appendChild(this.createOption(itemName, itemName, (name) => this.translate(name, translationMap)));
        });
    }

    // Rellena todos los filtros de la aplicación.
    populateFilters() {
        const commonTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
        this.populateFilter(this.elements.typeFilter, this.pokemonTypes, 'Elige el tipo', 'typeTranslations', commonTypes);
        this.populateFilter(this.elements.colorFilter, this.pokemonColors, 'Todos los colores', 'colorTranslations');
        this.populateFilter(this.elements.habitatFilter, this.pokemonHabitats, 'Todos los hábitats', 'habitatTranslations');
    }

    // Carga la lista completa de Pokémon desde la API.
    async loadPokemon() {
        this.showLoading(true);
        try {
            const response = await fetch(`${this.API_BASE_URL}/pokemon?limit=1302`);
            this.pokemonNames = (await response.json()).results.map(p => p.name);
            await this.loadMissingPokemon([...Array(24).keys()].map(i => i + 1), 'id');
        } catch (error) {
            console.error('Error al cargar Pokémon:', error);
            this.showError('Error al cargar los Pokémon');
        } finally {
            this.showLoading(false);
        }
    }

    // Carga los detalles de los Pokémon que aún no se han cargado.
    async loadMissingPokemon(list, key = 'name') {
        const needed = list.filter(p => key === 'id' ? !this.pokemonById.has(p) : !this.pokemonByName.has(p));
        if (needed.length === 0) return;

        const batchSize = 50;
        for (let i = 0; i < needed.length; i += batchSize) {
            const batch = needed.slice(i, i + batchSize);
            if (needed.length > 20) {
                this.showLoading(true, `Cargando ${needed.length} Pokémon...`);
            }
            const newPokemon = await Promise.all(batch.map(p => this.fetchPokemonDetails(key === 'id' ? p : p.name)));
            newPokemon.forEach(p => p && this.addPokemon(p));
        }

        this.filteredPokemon = [...this.allPokemon];
        this.clearError();
        this.displayPokemon();
        this.updatePagination();
    }

    // Añade un Pokémon a las estructuras de datos internas.
    addPokemon(pokemon) {
        if (!this.pokemonById.has(pokemon.id)) {
            this.allPokemon.push(pokemon);
            this.pokemonById.set(pokemon.id, pokemon);
            this.pokemonByName.set(pokemon.name, pokemon);
        }
    }

    // Obtiene los detalles de un Pokémon específico desde la API.
    async fetchPokemonDetails(idOrName) {
        const cached = typeof idOrName === 'number' ? this.pokemonById.get(idOrName) : this.pokemonByName.get(idOrName.toLowerCase());
        if (cached) return cached;

        try {
            const response = await fetch(`${this.API_BASE_URL}/pokemon/${idOrName}`);
            if (!response.ok) return null;
            const pokemon = await response.json();

            let speciesData = null;
            if (pokemon.species && pokemon.species.url) {
                const speciesResponse = await fetch(pokemon.species.url);
                if (speciesResponse.ok) {
                    speciesData = await speciesResponse.json();
                }
            }

            const pokeObj = {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default,
                types: pokemon.types.map(t => t.type.name),
                abilities: pokemon.abilities.map(a => a.ability.name),
                stats: {
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat
                },
                height: pokemon.height / 10,
                weight: pokemon.weight / 10,
                baseExperience: pokemon.base_experience || 0,
                cry: pokemon.cries?.latest || pokemon.cries?.legacy || null,
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

    // Maneja la entrada en el campo de búsqueda.
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

    // Actualiza las sugerencias de búsqueda basadas en la consulta.
    updateSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        const nameMatches = this.pokemonNames.filter(name => name.toLowerCase().includes(lowerQuery)).slice(0, 3);
        const keywordMatches = Object.keys(this.constants.searchKeywords).filter(keyword => keyword.includes(lowerQuery)).slice(0, 2);
        const suggestions = [...nameMatches, ...keywordMatches].slice(0, 5);

        if (suggestions.length > 0 && query.length >= 2) {
            this.displaySuggestions(suggestions);
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
    }

    // Muestra las sugerencias de búsqueda.
    displaySuggestions(suggestions) {
        const { searchSuggestions, searchInput } = this.elements;
        searchSuggestions.innerHTML = suggestions.map(name => `<div class="suggestion-item">${name.charAt(0).toUpperCase() + name.slice(1)}</div>`).join('');
        [...searchSuggestions.children].forEach((item, i) => {
            item.addEventListener('click', () => {
                searchInput.value = suggestions[i];
                this.performSearch(suggestions[i]);
                this.hideSuggestions();
            });
        });
    }

    // Realiza una búsqueda basada en la consulta.
    async performSearch(query) {
        if (!query.trim()) { this.applyFilters(); return; }
        this.showLoading(true);

        try {
            const criteria = this.parseSmartSearch(query);
            if (criteria.type || criteria.color || criteria.habitat || criteria.size || criteria.weight) {
                await this.performSmartSearch(criteria);
            } else {
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

    // Realiza una búsqueda por nombre de Pokémon.
    async performNameSearch(query) {
        const lowerQuery = query.toLowerCase();
        let found = [...this.pokemonByName.values()].filter(p => p.name.includes(lowerQuery));

        if (!found.length && query.trim()) {
            const pokemon = await this.fetchPokemonDetails(lowerQuery);
            if (pokemon) {
                this.allPokemon.sort((a, b) => a.id - b.id);
                found = [pokemon];
            }
        }

        this.filteredPokemon = found;
        this.currentPage = 1;

        if (found.length) {
            this.clearError();
        } else {
            this.showError(query.trim() ? 'Pokémon no encontrado' : 'Ingresa un término de búsqueda');
        }
        this.displayPokemon();
        this.updatePagination();
    }

    // Realiza una búsqueda inteligente con múltiples criterios.
    async performSmartSearch(criteria) {
        if (criteria.type) {
            await this.loadPokemonByType(criteria.type);
        }

        const results = this._applyPokemonFilters([...this.pokemonById.values()], criteria);

        this.filteredPokemon = results;
        this.currentPage = 1;

        if (results.length) {
            this.clearError();
        } else {
            this.showError('No se encontraron Pokémon con esos criterios');
        }
        this.displayPokemon();
        this.updatePagination();
    }

    // Carga los Pokémon de un tipo específico si no están ya cargados.
    async loadPokemonByType(type) {
        const currentTypePokemons = [...this.pokemonById.values()].filter(p => p.types.includes(type));

        if (currentTypePokemons.length < 10) {
            try {
                const response = await fetch(`${this.API_BASE_URL}/type/${type}`);
                const pokemonList = (await response.json()).pokemon
                    .map(p => p.pokemon)
                    .filter(p => parseInt(p.url.split('/').slice(-2, -1)[0]) <= 1025);

                await this.loadMissingPokemon(pokemonList, 'name');
            } catch (error) {
                console.error('Error al cargar pokemon por tipo:', error);
            }
        }
    }

    // Aplica los filtros seleccionados a la lista de Pokémon.
    async applyFilters() {
        const { typeFilter, generationFilter, colorFilter, habitatFilter, sizeFilter, weightFilter } = this.elements;
        const criteria = {
            type: typeFilter?.value || null,
            generation: generationFilter?.value || null,
            color: colorFilter?.value || null,
            habitat: habitatFilter?.value || null,
            size: sizeFilter?.value || null,
            weight: weightFilter?.value || null
        };

        if (criteria.type && !this.pokemonTypes.some(t => t.name === criteria.type)) {
            this.filteredPokemon = [];
            this.currentPage = 1;
            this.displayPokemon();
            this.updatePagination();
            this.showError('Este tipo estará disponible muy pronto.');
            return;
        }

        this.showLoading(true);

        try {
            if (criteria.generation) {
                await this.ensureGenerationLoaded(criteria.generation);
            }
            if (criteria.type) {
                await this.loadPokemonByType(criteria.type);
            }

            this.filteredPokemon = this._applyPokemonFilters([...this.pokemonById.values()], criteria);

        } catch (error) {
            console.error('Error al aplicar filtros:', error);
            this.showError('Error al aplicar filtros');
        } finally {
            this.showLoading(false);
        }

        this.currentPage = 1;
        this.clearError();
        this.displayPokemon();
        this.updatePagination();
    }
    
    // Lógica interna para filtrar la lista de Pokémon.
    _applyPokemonFilters(pokemonList, criteria) {
        return pokemonList.filter(p => {
            if (criteria.name && !p.name.toLowerCase().includes(criteria.name.toLowerCase())) return false;
            if (criteria.type && !p.types.includes(criteria.type)) return false;
            if (criteria.color && p.color !== criteria.color) return false;
            if (criteria.habitat && p.habitat !== criteria.habitat) return false;

            if (criteria.generation) {
                const [start, end] = this.constants.genRanges[criteria.generation];
                if (p.id < start || p.id > end) return false;
            }

            if (criteria.size) {
                const height = p.height;
                switch (criteria.size) {
                    case 'tiny': if (height >= 0.5) return false; break;
                    case 'small': if (height < 0.5 || height >= 1) return false; break;
                    case 'medium': if (height < 1 || height >= 2) return false; break;
                    case 'large': if (height < 2 || height >= 3) return false; break;
                    case 'huge': if (height < 3) return false; break;
                }
            }

            if (criteria.weight) {
                const weight = p.weight;
                switch (criteria.weight) {
                    case 'light': if (weight >= 10) return false; break;
                    case 'normal': if (weight < 10 || weight >= 50) return false; break;
                    case 'heavy': if (weight < 50 || weight >= 100) return false; break;
                    case 'massive': if (weight < 100) return false; break;
                }
            }

            return true;
        });
    }

    // Muestra los Pokémon en la cuadrícula.
    displayPokemon() {
        const { pokemonGrid, noResults } = this.elements;
        const startIndex = (this.currentPage - 1) * this.pokemonPerPage;
        const pokemonToShow = this.filteredPokemon.slice(startIndex, startIndex + this.pokemonPerPage);

        pokemonGrid.style.display = pokemonToShow.length ? 'grid' : 'none';
        noResults.style.display = pokemonToShow.length ? 'none' : 'block';
        pokemonGrid.innerHTML = '';

        pokemonToShow.forEach((pokemon, index) => {
            const card = this.createPokemonCard(pokemon);
            card.style.animationDelay = `${index * 0.1}s`;
            pokemonGrid.appendChild(card);
        });
    }

    // Crea una tarjeta de Pokémon con sus detalles.
    createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        const backgroundGradient = this.constants.typeColors[pokemon.types[0]] || 'linear-gradient(135deg, #667eea, #764ba2)';

        const detailsHtml = `
            <div class="pokemon-details">
                <div class="pokemon-info-row"><span>Altura:</span><span>${pokemon.height}m</span></div>
                <div class="pokemon-info-row"><span>Peso:</span><span>${pokemon.weight}kg</span></div>
                <div class="pokemon-info-row"><span>Experiencia:</span><span>${pokemon.baseExperience} XP</span></div>
                ${pokemon.color ? `<div class="pokemon-info-row"><span>Color:</span><span class="color-with-indicator"><span class="color-dot color-dot-${pokemon.color}"></span><span class="pokemon-color-${pokemon.color}">${this.translate(pokemon.color, 'colorTranslations')}</span></span></div>` : '<div class="pokemon-info-row"><span>Color:</span><span class="info-unavailable">No disponible</span></div>'}
                ${pokemon.habitat ? `<div class="pokemon-info-row"><span>Hábitat:</span><span>${this.translate(pokemon.habitat, 'habitatTranslations')}</span></div>` : '<div class="pokemon-info-row"><span>Hábitat:</span><span class="info-unavailable">No disponible</span></div>'}
                <div class="abilities-section">
                    <div class="pokemon-info-label">Habilidades:</div>
                    <div class="abilities-list">${pokemon.abilities.slice(0, 3).map(ability => `<span class="ability-badge">${this.translate(ability, 'abilityTranslations', (a) => a.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}</span>`).join('')}</div>
                </div>
            </div>`;

        const statsHtml = `
            <div class="pokemon-stats">
                ${[['❤️ HP', pokemon.stats.hp], ['⚔️ Ataque', pokemon.stats.attack], ['🛡️ Defensa', pokemon.stats.defense], ['⚡ Velocidad', pokemon.stats.speed]]
                .map(([name, value]) => `<div class="stat-item"><div class="stat-name">${name}</div><div class="stat-value">${value}</div></div>`).join('')}
            </div>`;

        card.innerHTML = `
            <div class="pokemon-card-content">
                <div class="pokemon-image">
                    <div class="image-placeholder"><div class="loading-spinner"></div></div>
                    <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy" onload="this.style.opacity=1; this.previousElementSibling.style.display='none';" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjYwIiB5PSI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSI+UG9rw6ltb248L3RleHQ+Cjwvc3ZnPg=='; this.previousElementSibling.style.display='none';" style="opacity: 0; transition: opacity 0.3s ease;">
                    ${pokemon.cry ? `<button class="cry-button" title="Clic para activar audio, luego hover para escuchar">🔊</button>` : ''}
                </div>
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
                <div class="pokemon-types">${pokemon.types.map(type => `<span class="type-badge type-${type}">${this.translate(type, 'typeTranslations')}</span>`).join('')}</div>
                <button class="toggle-info">Ver más</button>
                <div class="extra-info" style="display: none;">
                    ${detailsHtml}
                    ${statsHtml}
                </div>
            </div>`;

        if (pokemon.cry) {
            const cryButton = card.querySelector('.cry-button');
            cryButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playPokemonCry(pokemon.cry, cryButton);
                this.audioActivated = true;
            });
            cryButton.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                if (this.audioActivated) {
                    this.playPokemonCry(pokemon.cry, cryButton);
                }
            });
        }

        card.style.setProperty('--card-gradient', backgroundGradient);
        card.style.background = backgroundGradient;

        const toggleBtn = card.querySelector('.toggle-info');
        const extraInfo = card.querySelector('.extra-info');
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = card.classList.toggle('open');
            toggleBtn.textContent = isOpen ? 'Ver menos' : 'Ver más';
            extraInfo.style.display = isOpen ? 'block' : 'none';
        });

        return card;
    }

    // Actualiza la paginación.
    updatePagination() {
        const { pagination } = this.elements;
        const totalPages = Math.ceil(this.filteredPokemon.length / this.pokemonPerPage);
        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        const createBtn = (text, disabled, onClick) => {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.disabled = disabled;
            btn.addEventListener('click', onClick);
            return btn;
        };

        pagination.appendChild(createBtn('← Anterior', this.currentPage === 1, () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayPokemon();
                this.updatePagination();
            }
        }));

        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createBtn(i, false, () => {
                this.currentPage = i;
                this.displayPokemon();
                this.updatePagination();
            });
            if (i === this.currentPage) {
                pageBtn.classList.add('active');
            }
            pagination.appendChild(pageBtn);
        }

        pagination.appendChild(createBtn('Siguiente →', this.currentPage === totalPages, () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.displayPokemon();
                this.updatePagination();
            }
        }));
    }

    // Restablece todos los filtros a su estado inicial.
    resetAllFilters() {
        const { searchInput, typeFilter, generationFilter, colorFilter, habitatFilter, sizeFilter, weightFilter } = this.elements;
        if (searchInput) searchInput.value = '';
        [typeFilter, generationFilter, colorFilter, habitatFilter, sizeFilter, weightFilter].forEach(filter => {
            if (filter) filter.value = '';
        });
        this.hideSuggestions();
        this.clearError();
        this.currentPage = 1;
    }

    // Limpia todos los filtros y aplica los cambios.
    clearAllFilters() {
        this.resetAllFilters();
        this.applyFilters();
    }

    // Asegura que los Pokémon de una generación específica estén cargados.
    async ensureGenerationLoaded(genNumber) {
        if (!this.constants.genRanges[genNumber]) return;
        const [start, end] = this.constants.genRanges[genNumber];
        const neededIds = Array.from({ length: end - start + 1 }, (_, i) => start + i).filter(id => !this.pokemonById.has(id));
        if (neededIds.length > 0) {
            await this.loadMissingPokemon(neededIds, 'id');
        }
    }

    // Reproduce el grito de un Pokémon.
    playPokemonCry(cryUrl, button) {
        if (this.currentAudio && this.currentAudio.src === cryUrl && !this.currentAudio.ended) return;
        this.stopCurrentAudio();
        this.currentAudio = new Audio(cryUrl);
        this.currentAudio.volume = 0.4;
        this.currentPlayingButton = button;
        const originalText = button.textContent;
        button.textContent = '🎵';
        button.classList.add('playing');
        this.currentAudio.play().catch(error => {
            console.error('Error al reproducir Pokémon Cry:', error);
            this.restoreButton(button, originalText);
        });
        this.currentAudio.addEventListener('ended', () => this.restoreButton(button, originalText));
        this.currentAudio.addEventListener('error', () => this.restoreButton(button, originalText));
    }

    // Detiene la reproducción de audio actual.
    stopCurrentAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            if (this.currentPlayingButton) {
                this.restoreButton(this.currentPlayingButton, '🔊');
            }
        }
    }

    // Restaura el estado de un botón después de la reproducción de audio.
    restoreButton(button, originalText) {
        if (button) {
            button.textContent = originalText;
            button.classList.remove('playing');
        }
        this.currentPlayingButton = null;
    }

    // Muestra las sugerencias de búsqueda.
    showSuggestions() { this.elements.searchSuggestions.style.display = 'block'; }
    // Oculta las sugerencias de búsqueda.
    hideSuggestions() { this.elements.searchSuggestions.style.display = 'none'; }
    // Muestra u oculta el indicador de carga.
    showLoading(show, message = 'Cargando Pokémon...') {
        const { loading } = this.elements;
        loading.style.display = show ? 'block' : 'none';
        if (show && loading.querySelector('p')) {
            loading.querySelector('p').textContent = message;
        }
    }
    // Muestra un mensaje de error.
    showError(message) {
        const { searchError } = this.elements;
        searchError.textContent = message;
        searchError.style.display = 'block';
    }
    // Limpia el mensaje de error.
    clearError() { this.elements.searchError.style.display = 'none'; }
}

// Inicialización y lógica de guía turística cuando el DOM está completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    window.pokemonExplorer = new PokemonExplorer();
    const pixelColors = ['#fff900', '#ff0055', '#00eaff'];
    const arcadePixels = document.querySelector('.arcade-pixels');
    if (arcadePixels) {
        Array.from({ length: 30 }, () => {
            const px = document.createElement('div');
            px.className = 'arcade-pixel';
            Object.assign(px.style, {
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                background: pixelColors[Math.floor(Math.random() * pixelColors.length)],
                animationDuration: `${4 + Math.random() * 4}s`
            });
            arcadePixels.appendChild(px);
        });
    }
    initializeTourNew();
});

// Inicialización del recorrido de respaldo si Driver.js no está disponible.
function initializeTour() {
    if (typeof Driver === 'undefined') {
        console.error('Driver.js no está cargado');
        const startTourBtn = document.getElementById('startTour');
        if (startTourBtn) {
            startTourBtn.addEventListener('click', () => {
                alert('¡Bienvenido a Pokémon Explorer!\n\nDescubre más de 1300 Pokémon, busca por nombre, tipo, color y más. ¡Diviértete explorando!');
            });
        }
    }
}

// Clase para un recorrido interactivo personalizado de la aplicación.
class PokemonTour {
    constructor() {
        this.currentStep = 0;
        this.steps = [
            {
                element: '#search-section',
                title: '🔍 Búsqueda Inteligente',
                description: 'Busca Pokémon por nombre ("pikachu"), tipo ("fuego"), color ("rojo"), o combina criterios como ("planta verde").'
            },
            {
                element: '#filters-section',
                title: '⚡ Filtros Avanzados',
                description: 'Usa los menús desplegables para filtrar por tipo, generación, color, hábitat, tamaño y peso.'
            },
            {
                element: '#pokemonGrid',
                title: '🎴 Tarjetas de Pokémon',
                description: 'Aquí aparecen los Pokémon. Haz clic en "Ver más" para detalles como estadísticas, habilidades y más. ¡También puedes escuchar su sonido real con el botón 🔊!'
            },
            {
                element: '#pagination',
                title: '📄 Navegación por Páginas',
                description: 'Usa estos controles para navegar entre las páginas de resultados cuando hay muchos Pokémon.'
            },
            {
                element: 'body',
                title: '🎉 ¡Listo para Explorar!',
                description: '¡Ya conoces lo básico! Disfruta tu viaje para convertirte en un Maestro Pokémon. 🚀'
            }
        ];
        this.overlay = null;
        this.popup = null;
    }

    // Inicia el recorrido.
    async start() {
        if (this.overlay) return; // Evita iniciar el tour si ya está activo
        this.currentStep = 0;
        this.createElements();
        document.body.classList.add('tour-in-progress');
        this.popup.classList.add('visible');

        const pokemonCards = document.querySelectorAll('.pokemon-card');
        const paginationElement = document.getElementById('pagination');

        if (pokemonCards.length === 0 || !paginationElement || paginationElement.children.length === 0) {
            this.showLoadingStep();
            if (window.pokemonExplorer) {
                try {
                    await window.pokemonExplorer.loadMissingPokemon([...Array(25).keys()].map(i => i + 1), 'id');
                    window.pokemonExplorer.updatePagination();
                } catch (error) {
                    console.log('Error cargando Pokémon para el tour:', error);
                }
            }
            setTimeout(() => this.showStep(), 1500);
        } else {
            this.showStep();
        }
    }

    // Muestra un paso de carga mientras se preparan los datos para el recorrido.
    showLoadingStep() {
        this.popup.querySelector('.tour-title').innerHTML = '⏳ Preparando la Guía Interactiva';
        this.popup.querySelector('.tour-description').innerHTML = 'Cargando Pokémon para mostrarte todas las funciones...';
        this.popup.querySelector('.tour-step-info').textContent = 'Preparando...';
        this.popup.querySelector('.tour-prev').style.display = 'none';
        this.popup.querySelector('.tour-next').style.display = 'none';
        this.popup.querySelector('.tour-finish').style.display = 'none';
        this.centerPopup();
    }

    // Crea los elementos del DOM para el tour.
    createElements() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'tour-overlay';
        this.overlay.addEventListener('click', () => this.close());
        document.body.appendChild(this.overlay);

        const popupHTML = `
            <div class="tour-popup">
                <div class="tour-arrow"></div>
                <div class="tour-header">
                    <h3 class="tour-title"></h3>
                    <button class="tour-close">✕</button>
                </div>
                <div class="tour-content"><p class="tour-description"></p></div>
                <div class="tour-footer">
                    <div class="tour-progress"><span class="tour-step-info"></span></div>
                    <div class="tour-buttons">
                        <button class="tour-btn tour-prev">←</button>
                        <button class="tour-btn tour-next">→</button>
                        <button class="tour-btn tour-finish">OK</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        this.popup = document.body.querySelector('.tour-popup:last-of-type');

        this.popup.addEventListener('click', e => e.stopPropagation());
        this.popup.querySelector('.tour-close').addEventListener('click', () => this.close());
        this.popup.querySelector('.tour-prev').addEventListener('click', () => this.previousStep());
        this.popup.querySelector('.tour-next').addEventListener('click', () => this.nextStep());
        this.popup.querySelector('.tour-finish').addEventListener('click', () => this.close());
    }

    // Muestra un paso específico del recorrido.
    showStep() {
        this.popup.classList.remove('visible');
        this.overlay.classList.remove('active');
        this.removeHighlight();

        setTimeout(() => {
            const step = this.steps[this.currentStep];
            const element = document.querySelector(step.element);

            this.popup.querySelector('.tour-title').innerHTML = step.title;
            this.popup.querySelector('.tour-description').innerHTML = step.description;
            this.popup.querySelector('.tour-step-info').textContent = `${this.currentStep + 1} de ${this.steps.length}`;
            this.updateButtons();

            if (element && element.offsetParent !== null) {
                this.highlightElement(element);
                this.positionPopup(element);
                element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                this.centerPopup();
            }
            this.popup.classList.add('visible');
            this.overlay.classList.add('active');
        }, 300);
    }

    // Resalta un elemento en la página.
    highlightElement(element) {
        if (element) {
            element.classList.add('tour-highlighted');
        }
    }

    // Elimina el resaltado de cualquier elemento.
    removeHighlight() {
        const highlighted = document.querySelector('.tour-highlighted');
        if (highlighted) {
            highlighted.classList.remove('tour-highlighted');
        }
    }

    // Posiciona el popup del recorrido cerca del elemento resaltado.
    positionPopup(element) {
        const elemRect = element.getBoundingClientRect();
        const popupRect = this.popup.getBoundingClientRect();
        const arrow = this.popup.querySelector('.tour-arrow');
        const margin = 15;

        let top, left, position;

        // Prioridad de posición: abajo, arriba, derecha, izquierda
        if (window.innerHeight - elemRect.bottom > popupRect.height + margin) {
            position = 'bottom';
            top = elemRect.bottom + margin;
            left = elemRect.left + (elemRect.width / 2) - (popupRect.width / 2);
        } else if (elemRect.top > popupRect.height + margin) {
            position = 'top';
            top = elemRect.top - popupRect.height - margin;
            left = elemRect.left + (elemRect.width / 2) - (popupRect.width / 2);
        } else if (window.innerWidth - elemRect.right > popupRect.width + margin) {
            position = 'right';
            top = elemRect.top + (elemRect.height / 2) - (popupRect.height / 2);
            left = elemRect.right + margin;
        } else {
            position = 'left';
            top = elemRect.top + (elemRect.height / 2) - (popupRect.height / 2);
            left = elemRect.left - popupRect.width - margin;
        }

        // Ajustar si se sale de la pantalla
        if (left < margin) left = margin;
        if (left + popupRect.width > window.innerWidth - margin) left = window.innerWidth - popupRect.width - margin;
        if (top < margin) top = margin;
        if (top + popupRect.height > window.innerHeight - margin) top = window.innerHeight - popupRect.height - margin;

        this.popup.style.top = `${top}px`;
        this.popup.style.left = `${left}px`;

        // Posicionar la flecha
        arrow.className = `tour-arrow ${position}`;
    }

    // Centra el popup en la pantalla.
    centerPopup() {
        this.popup.style.top = '50%';
        this.popup.style.left = '50%';
        this.popup.style.transform = 'translate(-50%, -50%)';
        this.popup.querySelector('.tour-arrow').className = 'tour-arrow'; // Ocultar flecha
    }

    // Actualiza los botones de navegación del recorrido.
    updateButtons() {
        this.popup.querySelector('.tour-prev').style.display = this.currentStep === 0 ? 'none' : 'inline-block';
        this.popup.querySelector('.tour-next').style.display = this.currentStep === this.steps.length - 1 ? 'none' : 'inline-block';
        this.popup.querySelector('.tour-finish').style.display = this.currentStep === this.steps.length - 1 ? 'inline-block' : 'none';
    }

    // Avanza al siguiente paso del recorrido.
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep();
        }
    }

    // Retrocede al paso anterior del recorrido.
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    // Cierra el recorrido.
    close() {
        this.popup.classList.remove('visible');
        this.overlay.classList.remove('active');
        this.removeHighlight();
        document.body.classList.remove('tour-in-progress');
        setTimeout(() => {
            if (this.overlay) this.overlay.remove();
            if (this.popup) this.popup.remove();
            this.overlay = null;
            this.popup = null;
        }, 300);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
// Inicializa el nuevo recorrido personalizado.
function initializeTourNew() {
    const tour = new PokemonTour();
    const startTourBtn = document.getElementById('startTour');
    if (startTourBtn) {
        startTourBtn.addEventListener('click', () => tour.start());
    }
}
// Inicializa el nuevo recorrido personalizado.
function initializeTourNew() {
    const tour = new PokemonTour();
    const startTourBtn = document.getElementById('startTour');
    if (startTourBtn) {
        startTourBtn.addEventListener('click', () => tour.start());
    }
}
