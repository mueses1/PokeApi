// Clase principal para explorar y mostrar Pokémon
class PokemonExplorer {
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
            audioActivated: false     // Flag para saber si el usuario ya activó el audio
        });

        // Inicializar elementos del DOM
        ['searchInput', 'searchSuggestions', 'searchError', 'typeFilter',
            'generationFilter', 'loading', 'pokemonGrid', 'noResults', 'pagination']
            .forEach(id => this[id] = document.getElementById(id));

        // Configurar event listeners
        this.searchInput.addEventListener('input', e => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.searchInput.value.trim() && this.showSuggestions());
        this.searchInput.addEventListener('blur', () => setTimeout(() => this.hideSuggestions(), 200));
        [this.typeFilter, this.generationFilter].forEach(el => el.addEventListener('change', () => this.applyFilters()));

        // Cerrar sugerencias al hacer clic fuera del área de búsqueda
        document.addEventListener('click', e => {
            if (!this.searchInput.contains(e.target) && !this.searchSuggestions.contains(e.target)) {
                this.hideSuggestions();
            }
        });

        // Resetear todos los filtros al inicializar
        this.resetAllFilters();

        // Cargar datos iniciales
        this.loadPokemonTypes();
        this.loadPokemon();
    }

    // Cargar todos los tipos de Pokémon desde la API
    async loadPokemonTypes() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            this.pokemonTypes = (await response.json()).results;
            this.populateTypeFilter();
        } catch (error) {
            console.error('Error loading pokemon types:', error);
        }
    }

    // Poblar el filtro de tipos con opciones organizadas
    populateTypeFilter() {
        // Tipos más comunes ordenados por popularidad
        const commonTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice',
            'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock',
            'ghost', 'dragon', 'dark', 'steel', 'fairy'];

        // Función helper para crear opciones del select
        const createOption = (name, value = name) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
            return option;
        };

        // Agregar opción por defecto
        this.typeFilter.innerHTML = '<option value="">Elige el tipo</option>';

        // Agregar tipos comunes primero, luego otros tipos
        [...commonTypes.filter(t => this.pokemonTypes.find(pt => pt.name === t)),
        ...this.pokemonTypes.filter(t => !commonTypes.includes(t.name))]
            .forEach(type => this.typeFilter.appendChild(createOption(typeof type === 'string' ? type : type.name)));
    }

    // Cargar lista inicial de Pokémon (hasta la generación 5)
    async loadPokemon() {
        this.showLoading(true);
        try {
            // Obtener lista de nombres de Pokémon para sugerencias de búsqueda
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649');
            this.pokemonNames = (await response.json()).results.map(p => p.name);

            // Cargar los primeros 50 Pokémon para mostrar inicialmente
            await this.loadMissingPokemon([...Array(50).keys()].map(i => i + 1), 'id');
        } catch (error) {
            console.error('Error loading pokemon:', error);
            this.showError('Error al cargar los Pokémon');
        } finally {
            this.showLoading(false);
        }
    }

    // Cargar Pokémon faltantes según una lista y criterio (ID o nombre)
    async loadMissingPokemon(list, key = 'name') {
        // Filtrar solo los Pokémon que no están en cache
        const needed = list.filter(p => key === 'id' ? !this.pokemonById.has(p) : !this.pokemonByName.has(p));

        // Cargar detalles de hasta 50 Pokémon en paralelo
        const newPokemon = await Promise.all(needed.slice(0, 50).map(p =>
            this.fetchPokemonDetails(key === 'id' ? p : p.name)));

        // Agregar nuevos Pokémon al cache y actualizar vista
        newPokemon.forEach(p => p && this.addPokemon(p));
        this.filteredPokemon = [...this.allPokemon];
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

            // Crear objeto Pokémon con datos relevantes
            const pokeObj = {
                id: pokemon.id,
                name: pokemon.name,
                // Usar imagen oficial o sprite por defecto
                image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
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
                cry: pokemon.cries?.latest || pokemon.cries?.legacy || null
            };
            this.addPokemon(pokeObj);
            return pokeObj;
        } catch (error) {
            console.error(`Error fetching pokemon ${idOrName}:`, error);
            return null;
        }
    }

    // Manejar entrada de texto en el campo de búsqueda
    handleSearch(query) {
        clearTimeout(this.searchTimeout);
        this.clearError();

        // Si no hay texto, ocultar sugerencias y aplicar filtros
        if (!query.trim()) { this.hideSuggestions(); this.applyFilters(); return; }

        // Validar longitud mínima
        if (query.length < 2) { this.showError('Ingresa al menos 2 caracteres'); return; }

        // Búsqueda con delay para evitar muchas peticiones
        this.searchTimeout = setTimeout(() => this.performSearch(query), 300);
        this.updateSuggestions(query);
    }

    // Actualizar sugerencias de búsqueda basadas en la consulta
    updateSuggestions(query) {
        // Buscar coincidencias en nombres de Pokémon
        const matches = this.pokemonNames.filter(name =>
            name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

        // Mostrar u ocultar sugerencias según resultados
        matches.length > 0 && query.length >= 2 ?
            (this.displaySuggestions(matches), this.showSuggestions()) : this.hideSuggestions();
    }

    // Mostrar lista de sugerencias en el DOM
    displaySuggestions(suggestions) {
        // Crear elementos HTML para cada sugerencia
        this.searchSuggestions.innerHTML = suggestions.map(name =>
            `<div class="suggestion-item">${name.charAt(0).toUpperCase() + name.slice(1)}</div>`).join('');

        // Agregar event listeners para clicks en sugerencias
        [...this.searchSuggestions.children].forEach((item, i) => {
            item.addEventListener('click', () => {
                this.searchInput.value = suggestions[i];
                this.performSearch(suggestions[i]);
                this.hideSuggestions();
            });
        });
    }

    // Realizar búsqueda de Pokémon
    async performSearch(query) {
        if (!query.trim()) { this.applyFilters(); return; }
        this.showLoading(true);

        try {
            const lowerQuery = query.toLowerCase();
            // Buscar en Pokémon ya cargados
            let found = [...this.pokemonByName.values()].filter(p => p.name.includes(lowerQuery));

            // Si no se encuentra, intentar cargar desde la API
            if (!found.length) {
                const pokemon = await this.fetchPokemonDetails(lowerQuery);
                if (pokemon) {
                    // Mantener orden por ID
                    this.allPokemon.sort((a, b) => a.id - b.id);
                    found = [pokemon];
                }
            }

            // Actualizar resultados y vista
            this.filteredPokemon = found;
            this.currentPage = 1;
            found.length ? (this.displayPokemon(), this.updatePagination()) :
                (this.showError('Pokémon no encontrado'), this.displayPokemon());
        } catch (error) {
            this.showError('Error al buscar el Pokémon');
            this.filteredPokemon = [];
            this.displayPokemon();
        } finally {
            this.showLoading(false);
        }
    }

    // Aplicar filtros de tipo y generación
    async applyFilters() {
        const [selectedType, selectedGen] = [this.typeFilter.value, this.generationFilter.value];

        // Verificar si el tipo seleccionado existe en la API
        if (selectedType && !this.pokemonTypes.some(t => t.name === selectedType)) {
            this.filteredPokemon = [];
            this.currentPage = 1;
            this.displayPokemon();
            this.updatePagination();
            this.showError('Este tipo estará disponible muy pronto.');
            return;
        }

        this.showLoading(true);

        try {
            // Paso 1: Cargar Pokémon por generación si está seleccionada
            if (selectedGen) {
                const genRanges = { '1': [1, 151], '2': [152, 251], '3': [252, 386], '4': [387, 493], '5': [494, 649] };
                const [start, end] = genRanges[selectedGen];

                // Identificar IDs faltantes en el rango de la generación
                const neededIds = Array.from({ length: end - start + 1 }, (_, i) => start + i)
                    .filter(id => !this.pokemonById.has(id));

                // Cargar Pokémon faltantes si es necesario
                if (neededIds.length) {
                    await this.loadMissingPokemon(neededIds, 'id');
                }
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
                            // Filtrar solo hasta la generación 5 (ID <= 649)
                            .filter(p => parseInt(p.url.split('/').slice(-2, -1)[0]) <= 649);

                        await this.loadMissingPokemon(pokemonList, 'name');
                    } catch (error) {
                        console.error('Error loading pokemon by type:', error);
                    }
                }
            }

            // Paso 3: Aplicar filtros sobre todos los Pokémon cargados
            this.filteredPokemon = [...this.pokemonById.values()];

            // Filtrar por generación si está seleccionada
            if (selectedGen) {
                const genRanges = { '1': [1, 151], '2': [152, 251], '3': [252, 386], '4': [387, 493], '5': [494, 649] };
                const [start, end] = genRanges[selectedGen];
                this.filteredPokemon = this.filteredPokemon.filter(p => p.id >= start && p.id <= end);
            }

            // Filtrar por tipo si está seleccionado
            if (selectedType) {
                this.filteredPokemon = this.filteredPokemon.filter(p => p.types.includes(selectedType));
            }

        } catch (error) {
            console.error('Error applying filters:', error);
            this.showError('Error al aplicar filtros');
        } finally {
            this.showLoading(false);
        }

        // Resetear paginación y actualizar vista
        this.currentPage = 1;
        this.displayPokemon();
        this.updatePagination();
    }

    // Mostrar Pokémon en la grilla con paginación
    displayPokemon() {
        // Calcular índices para la página actual
        const startIndex = (this.currentPage - 1) * this.pokemonPerPage;
        const pokemonToShow = this.filteredPokemon.slice(startIndex, startIndex + this.pokemonPerPage);

        // Mostrar mensaje si no hay resultados
        if (!pokemonToShow.length) {
            this.pokemonGrid.style.display = 'none';
            this.noResults.style.display = 'block';
            return;
        }

        // Mostrar grilla y ocultar mensaje de sin resultados
        this.pokemonGrid.style.display = 'grid';
        this.noResults.style.display = 'none';
        this.pokemonGrid.innerHTML = '';

        // Crear y agregar tarjetas de Pokémon con animación escalonada
        pokemonToShow.forEach((pokemon, index) => {
            const card = this.createPokemonCard(pokemon);
            card.style.animationDelay = `${index * 0.1}s`;
            this.pokemonGrid.appendChild(card);
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
                    <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy">
                    ${pokemon.cry ? `<button class="cry-button" title="Clic para activar audio, luego hover para escuchar">🔊</button>` : ''}
                </div>
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
                <div class="pokemon-types">${pokemon.types.map(type =>
            `<span class="type-badge type-${type}">${type}</span>`).join('')}</div>
                <div class="pokemon-details">
                    <div class="pokemon-info-row"><span class="pokemon-info-label">Altura:</span><span>${pokemon.height}m</span></div>
                    <div class="pokemon-info-row"><span class="pokemon-info-label">Peso:</span><span>${pokemon.weight}kg</span></div>
                    <div class="pokemon-info-row"><span class="pokemon-info-label">Experiencia:</span><span>${pokemon.baseExperience} XP</span></div>
                    <div class="abilities-section">
                        <div class="pokemon-info-label">Habilidades:</div>
                        <div class="abilities-list">${pokemon.abilities.slice(0, 3).map(ability =>
                `<span class="ability-badge">${ability.replace('-', ' ')}</span>`).join('')}</div>
                    </div>
                </div>
                <div class="pokemon-stats">
                    ${[['❤️ HP', pokemon.stats.hp], ['⚔️ Ataque', pokemon.stats.attack],
            ['🛡️ Defensa', pokemon.stats.defense], ['⚡ Velocidad', pokemon.stats.speed]]
                .map(([name, value]) => `<div class="stat-item"><div class="stat-name">${name}</div><div class="stat-value">${value}</div></div>`).join('')}
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
        return card;
    }

    // Actualizar controles de paginación
    updatePagination() {
        const totalPages = Math.ceil(this.filteredPokemon.length / this.pokemonPerPage);
        this.pagination.innerHTML = '';

        // No mostrar paginación si hay una página o menos
        if (totalPages <= 1) return;

        // Función helper para crear botones de paginación
        const createBtn = (text, disabled, onClick) => {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.disabled = disabled;
            btn.addEventListener('click', onClick);
            return btn;
        };

        // Botón "Anterior"
        this.pagination.appendChild(createBtn('← Anterior', this.currentPage === 1, () => {
            if (this.currentPage > 1) { this.currentPage--; this.displayPokemon(); this.updatePagination(); }
        }));

        // Calcular rango de páginas a mostrar (máximo 5 páginas)
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        // Crear botones numerados para cada página
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createBtn(i, false, () => {
                this.currentPage = i; this.displayPokemon(); this.updatePagination();
            });
            // Resaltar página actual
            pageBtn.style.background = i === this.currentPage ? '#667eea' : 'white';
            pageBtn.style.color = i === this.currentPage ? 'white' : '#667eea';
            this.pagination.appendChild(pageBtn);
        }

        // Botón "Siguiente"
        this.pagination.appendChild(createBtn('Siguiente →', this.currentPage === totalPages, () => {
            if (this.currentPage < totalPages) { this.currentPage++; this.displayPokemon(); this.updatePagination(); }
        }));
    }

    // Resetear todos los filtros y búsquedas a sus valores por defecto
    resetAllFilters() {
        // Limpiar campo de búsqueda
        if (this.searchInput) {
            this.searchInput.value = '';
        }

        // Resetear filtro de tipo a opción por defecto
        if (this.typeFilter) {
            this.typeFilter.value = '';
        }

        // Resetear filtro de generación a opción por defecto
        if (this.generationFilter) {
            this.generationFilter.value = '';
        }

        // Ocultar sugerencias y limpiar errores
        this.hideSuggestions();
        this.clearError();

        // Resetear página actual
        this.currentPage = 1;
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
                console.error('Error playing pokemon cry:', error);
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
            console.error('Error creating audio:', error);
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
    showSuggestions() { this.searchSuggestions.style.display = 'block'; }
    hideSuggestions() { this.searchSuggestions.style.display = 'none'; }
    showLoading(show) { this.loading.style.display = show ? 'block' : 'none'; }
    showError(message) { this.searchError.textContent = message; this.searchError.style.display = 'block'; }
    clearError() { this.searchError.style.display = 'none'; }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia del explorador de Pokémon
    new PokemonExplorer();

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
});

