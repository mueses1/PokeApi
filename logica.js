class PokemonExplorer {
    constructor() {
        this.currentPage = 1;
        this.pokemonPerPage = 12;
        this.allPokemon = [];
        this.filteredPokemon = [];
        this.pokemonTypes = [];
        this.pokemonNames = [];
        this.searchTimeout = null;
        this.pokemonById = new Map();
        this.pokemonByName = new Map();

        this.initializeElements();
        this.setupEventListeners();
        this.loadPokemonTypes();
        this.loadPokemon();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.searchError = document.getElementById('searchError');
        this.typeFilter = document.getElementById('typeFilter');
        this.generationFilter = document.getElementById('generationFilter');
        this.loading = document.getElementById('loading');
        this.pokemonGrid = document.getElementById('pokemonGrid');
        this.noResults = document.getElementById('noResults');
        this.pagination = document.getElementById('pagination');
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim()) this.showSuggestions();
        });
        this.searchInput.addEventListener('blur', () => setTimeout(() => this.hideSuggestions(), 200));
        this.typeFilter.addEventListener('change', () => this.applyFilters());
        this.generationFilter.addEventListener('change', () => this.applyFilters());
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchSuggestions.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    async loadPokemonTypes() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            const data = await response.json();
            this.pokemonTypes = data.results;
            this.populateTypeFilter();
        } catch (error) {
            console.error('Error loading pokemon types:', error);
        }
    }

    populateTypeFilter() {
        const commonTypes = [
            'normal', 'fire', 'water', 'electric', 'grass', 'ice',
            'fighting', 'poison', 'ground', 'flying', 'psychic',
            'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
        ];
        this.typeFilter.innerHTML = '';
        commonTypes.forEach(typeName => {
            const type = this.pokemonTypes.find(t => t.name === typeName);
            if (type) {
                const option = document.createElement('option');
                option.value = type.name;
                option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
                this.typeFilter.appendChild(option);
            }
        });
        this.pokemonTypes.forEach(type => {
            if (!commonTypes.includes(type.name)) {
                const option = document.createElement('option');
                option.value = type.name;
                option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
                this.typeFilter.appendChild(option);
            }
        });
    }

    async loadPokemon() {
        this.showLoading(true);
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649');
            const data = await response.json();
            this.pokemonNames = data.results.map(p => p.name);
            await this.loadMissingPokemon([...Array(50).keys()].map(i => i + 1), 'id');
        } catch (error) {
            console.error('Error loading pokemon:', error);
            this.showError('Error al cargar los Pokémon');
        } finally {
            this.showLoading(false);
        }
    }

    async loadMissingPokemon(list, key = 'name') {
        const needed = list.filter(p =>
            key === 'id' ? !this.pokemonById.has(p) : !this.pokemonByName.has(p)
        );
        const promises = needed.slice(0, 50).map(p =>
            this.fetchPokemonDetails(key === 'id' ? p : p.name)
        );
        const newPokemon = await Promise.all(promises);
        newPokemon.forEach(p => p && this.addPokemon(p));
        this.filteredPokemon = [...this.allPokemon];
        this.displayPokemon();
        this.updatePagination();
    }

    addPokemon(pokemon) {
        if (!this.pokemonById.has(pokemon.id)) {
            this.allPokemon.push(pokemon);
            this.pokemonById.set(pokemon.id, pokemon);
            this.pokemonByName.set(pokemon.name, pokemon);
        }
    }

    async fetchPokemonDetails(idOrName) {
        if (typeof idOrName === 'number' && this.pokemonById.has(idOrName)) {
            return this.pokemonById.get(idOrName);
        }
        if (typeof idOrName === 'string' && this.pokemonByName.has(idOrName.toLowerCase())) {
            return this.pokemonByName.get(idOrName.toLowerCase());
        }
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
            if (!response.ok) return null;
            const pokemon = await response.json();
            const pokeObj = {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other['official-artwork'].front_default ||
                    pokemon.sprites.front_default,
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
                baseExperience: pokemon.base_experience || 0
            };
            this.addPokemon(pokeObj);
            return pokeObj;
        } catch (error) {
            console.error(`Error fetching pokemon ${idOrName}:`, error);
            return null;
        }
    }

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

    updateSuggestions(query) {
        const matches = this.pokemonNames
            .filter(name => name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);
        if (matches.length > 0 && query.length >= 2) {
            this.displaySuggestions(matches);
            this.showSuggestions();
        } else {
            this.hideSuggestions();
        }
    }

    displaySuggestions(suggestions) {
        this.searchSuggestions.innerHTML = '';
        suggestions.forEach(name => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = name.charAt(0).toUpperCase() + name.slice(1);
            item.addEventListener('click', () => {
                this.searchInput.value = name;
                this.performSearch(name);
                this.hideSuggestions();
            });
            this.searchSuggestions.appendChild(item);
        });
    }

    async performSearch(query) {
        if (!query.trim()) {
            this.applyFilters();
            return;
        }
        this.showLoading(true);
        try {
            let found = [];
            const lowerQuery = query.toLowerCase();
            for (let pokemon of this.pokemonByName.values()) {
                if (pokemon.name.includes(lowerQuery)) found.push(pokemon);
            }
            if (found.length === 0) {
                const pokemon = await this.fetchPokemonDetails(lowerQuery);
                if (pokemon) {
                    this.addPokemon(pokemon);
                    this.allPokemon.sort((a, b) => a.id - b.id);
                    found = [pokemon];
                }
            }
            if (found.length > 0) {
                this.filteredPokemon = found;
                this.currentPage = 1;
                this.displayPokemon();
                this.updatePagination();
            } else {
                this.showError('Pokémon no encontrado');
                this.filteredPokemon = [];
                this.displayPokemon();
            }
        } catch (error) {
            this.showError('Error al buscar el Pokémon');
            this.filteredPokemon = [];
            this.displayPokemon();
        } finally {
            this.showLoading(false);
        }
    }

    async applyFilters() {
        const selectedType = this.typeFilter.value;
        const selectedGen = this.generationFilter.value;
        // Si el tipo seleccionado no existe en la API, mostrar "Muy pronto"
        if (selectedType && !this.pokemonTypes.some(t => t.name === selectedType)) {
            this.filteredPokemon = [];
            this.currentPage = 1;
            this.displayPokemon();
            this.updatePagination();
            this.showError('Este tipo estará disponible muy pronto.');
            return;
        }
        // Cargar pokémon por tipo si es necesario
        if (selectedType) {
            let filtered = Array.from(this.pokemonById.values()).filter(p => p.types.includes(selectedType));
            if (filtered.length === 0) {
                this.showLoading(true);
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
                    const data = await response.json();
                    const pokemonList = data.pokemon
                        .map(p => p.pokemon)
                        .filter(p => {
                            const id = parseInt(p.url.split('/').slice(-2, -1)[0]);
                            return id <= 649;
                        });
                    await this.loadMissingPokemon(pokemonList, 'name');
                    filtered = Array.from(this.pokemonById.values()).filter(p => p.types.includes(selectedType));
                } catch (error) {
                    this.showError('Error al cargar Pokémon de tipo seleccionado');
                }
                this.showLoading(false);
            }
            this.filteredPokemon = filtered;
        } else {
            this.filteredPokemon = Array.from(this.pokemonById.values());
        }
        // Cargar pokémon por generación si es necesario
        if (selectedGen) {
            const genRanges = {
                '1': [1, 151],
                '2': [152, 251],
                '3': [252, 386],
                '4': [387, 493],
                '5': [494, 649]
            };
            const [start, end] = genRanges[selectedGen];
            const neededIds = [];
            for (let i = start; i <= end; i++) {
                if (!this.pokemonById.has(i)) neededIds.push(i);
            }
            if (neededIds.length > 0) {
                this.showLoading(true);
                await this.loadMissingPokemon(neededIds, 'id');
                this.showLoading(false);
            }
            this.filteredPokemon = this.filteredPokemon.filter(p => p.id >= start && p.id <= end);
        }
        this.currentPage = 1;
        this.displayPokemon();
        this.updatePagination();
    }

    displayPokemon() {
        const startIndex = (this.currentPage - 1) * this.pokemonPerPage;
        const endIndex = startIndex + this.pokemonPerPage;
        const pokemonToShow = this.filteredPokemon.slice(startIndex, endIndex);
        if (pokemonToShow.length === 0) {
            this.pokemonGrid.style.display = 'none';
            this.noResults.style.display = 'block';
            return;
        }
        this.pokemonGrid.style.display = 'grid';
        this.noResults.style.display = 'none';
        this.pokemonGrid.innerHTML = '';
        pokemonToShow.forEach((pokemon, index) => {
            const card = this.createPokemonCard(pokemon);
            card.style.animationDelay = `${index * 0.1}s`;
            this.pokemonGrid.appendChild(card);
        });
    }

    createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        const primaryType = pokemon.types[0];
        const typeColors = {
            normal: 'linear-gradient(135deg, #A8A878, #C6C684)',
            fire: 'linear-gradient(135deg, #F08030, #F5A652)',
            water: 'linear-gradient(135deg, #6890F0, #85A8F7)',
            electric: 'linear-gradient(135deg, #F8D030, #FAE078)',
            grass: 'linear-gradient(135deg, #78C850, #9ADB71)',
            ice: 'linear-gradient(135deg, #98D8D8, #BCE6E6)',
            fighting: 'linear-gradient(135deg, #C03028, #D67873)',
            poison: 'linear-gradient(135deg, #A040A0, #C77ABA)',
            ground: 'linear-gradient(135deg, #E0C068, #EAD69C)',
            flying: 'linear-gradient(135deg, #A890F0, #C7B2F7)',
            psychic: 'linear-gradient(135deg, #F85888, #FA92B2)',
            bug: 'linear-gradient(135deg, #A8B820, #C2D21E)',
            rock: 'linear-gradient(135deg, #B8A038, #D0C158)',
            ghost: 'linear-gradient(135deg, #705898, #A292BC)',
            dragon: 'linear-gradient(135deg, #7038F8, #A27DFA)',
            dark: 'linear-gradient(135deg, #705848, #A29288)',
            steel: 'linear-gradient(135deg, #B8B8D0, #D1D1E0)',
            fairy: 'linear-gradient(135deg, #EE99AC, #F4C2C2)'
        };
        const backgroundGradient = typeColors[primaryType] || 'linear-gradient(135deg, #667eea, #764ba2)';
        const typeBadges = pokemon.types.map(type =>
            `<span class="type-badge type-${type}">${type}</span>`
        ).join('');
        const abilityBadges = pokemon.abilities.slice(0, 3).map(ability =>
            `<span class="ability-badge">${ability.replace('-', ' ')}</span>`
        ).join('');
        card.innerHTML = `
            <div class="pokemon-card-content">
                <div class="pokemon-image">
                    <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy">
                </div>
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
                <div class="pokemon-types">${typeBadges}</div>
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
                    <div class="abilities-section">
                        <div class="pokemon-info-label">Habilidades:</div>
                        <div class="abilities-list">${abilityBadges}</div>
                    </div>
                </div>
                <div class="pokemon-stats">
                    <div class="stat-item">
                        <div class="stat-name">❤️ HP</div>
                        <div class="stat-value">${pokemon.stats.hp}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-name">⚔️ Ataque</div>
                        <div class="stat-value">${pokemon.stats.attack}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-name">🛡️ Defensa</div>
                        <div class="stat-value">${pokemon.stats.defense}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-name">⚡ Velocidad</div>
                        <div class="stat-value">${pokemon.stats.speed}</div>
                    </div>
                </div>
            </div>
        `;
        card.style.setProperty('--card-gradient', backgroundGradient);
        card.style.background = `${backgroundGradient}`;
        return card;
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredPokemon.length / this.pokemonPerPage);
        this.pagination.innerHTML = '';
        if (totalPages <= 1) return;
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Anterior';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayPokemon();
                this.updatePagination();
            }
        });
        this.pagination.appendChild(prevBtn);
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.style.background = i === this.currentPage ? '#667eea' : 'white';
            pageBtn.style.color = i === this.currentPage ? 'white' : '#667eea';
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.displayPokemon();
                this.updatePagination();
            });
            this.pagination.appendChild(pageBtn);
        }
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Siguiente →';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.displayPokemon();
                this.updatePagination();
            }
        });
        this.pagination.appendChild(nextBtn);
    }

    showSuggestions() { this.searchSuggestions.style.display = 'block'; }
    hideSuggestions() { this.searchSuggestions.style.display = 'none'; }
    showLoading(show) { this.loading.style.display = show ? 'block' : 'none'; }
    showError(message) {
        this.searchError.textContent = message;
        this.searchError.style.display = 'block';
    }
    clearError() {
        this.searchError.style.display = 'none';
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    new PokemonExplorer();

    // 👾 Animación de píxeles arcade
    const pixelColors = ['#fff900', '#ff0055', '#00eaff'];
    for (let i = 0; i < 30; i++) {
        const px = document.createElement('div');
        px.className = 'arcade-pixel';
        px.style.left = Math.random() * 100 + 'vw';
        px.style.top = (Math.random() * 100) + 'vh';
        px.style.background = pixelColors[Math.floor(Math.random() * pixelColors.length)];
        px.style.animationDuration = (4 + Math.random() * 4) + 's';
        document.querySelector('.arcade-pixels').appendChild(px);
    }
});

