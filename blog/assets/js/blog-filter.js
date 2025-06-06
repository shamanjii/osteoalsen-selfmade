// Blog Search and Filter Functionality
// Fügen Sie diesen Code in blog/assets/js/blog.js hinzu oder als separate Datei

class BlogFilter {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.init();
    }

    async init() {
        await this.loadPosts();
        this.createSearchUI();
        this.bindEvents();
        this.updateCategoryCounts();
    }

    async loadPosts() {
        try {
            const response = await fetch('data/posts.json');
            this.posts = await response.json();
            this.filteredPosts = [...this.posts];
        } catch (error) {
            console.error('Fehler beim Laden der Posts:', error);
            this.posts = [];
            this.filteredPosts = [];
        }
    }

    createSearchUI() {
        // Such-Container erstellen
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="blogSearch" placeholder="Blog durchsuchen..." class="search-input">
                <button type="button" class="search-btn" id="searchBtn">🔍</button>
                <button type="button" class="clear-btn" id="clearSearch" style="display: none;">✕</button>
            </div>
            <div class="active-filters" id="activeFilters" style="display: none;">
                <span class="filter-label">Aktive Filter:</span>
                <div class="filter-tags" id="filterTags"></div>
                <button type="button" class="clear-all-btn" id="clearAllFilters">Alle löschen</button>
            </div>
        `;

        // Search-Container in den Posts-Header einfügen
        const postsHeader = document.querySelector('.posts-header');
        if (postsHeader) {
            postsHeader.appendChild(searchContainer);
        }

        // CSS für Search-UI hinzufügen
        this.addSearchStyles();
    }

    addSearchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid #f1f5f9;
            }

            .search-box {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }

            .search-input {
                flex: 1;
                padding: 0.75rem 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 0.95rem;
                transition: border-color 0.2s ease;
            }

            .search-input:focus {
                outline: none;
                border-color: #1a202c;
                box-shadow: 0 0 0 3px rgba(26, 32, 44, 0.1);
            }

            .search-btn, .clear-btn {
                padding: 0.75rem 1rem;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s ease;
                min-width: 44px;
            }

            .search-btn {
                background: #1a202c;
                color: white;
            }

            .search-btn:hover {
                background: #2d3748;
            }

            .clear-btn {
                background: #f1f5f9;
                color: #64748b;
            }

            .clear-btn:hover {
                background: #e2e8f0;
                color: #1a202c;
            }

            .active-filters {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #f8fafc;
                border-radius: 8px;
                flex-wrap: wrap;
            }

            .filter-label {
                font-weight: 500;
                color: #4a5568;
                font-size: 0.9rem;
            }

            .filter-tags {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }

            .filter-tag {
                background: #1a202c;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .filter-tag-remove {
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s ease;
            }

            .filter-tag-remove:hover {
                opacity: 1;
            }

            .clear-all-btn {
                background: none;
                border: 1px solid #e2e8f0;
                color: #64748b;
                padding: 0.25rem 0.75rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.2s ease;
            }

            .clear-all-btn:hover {
                border-color: #1a202c;
                color: #1a202c;
            }

            .post-card.filtered-out {
                display: none !important;
            }

            .search-highlight {
                background: yellow;
                padding: 1px 2px;
                border-radius: 2px;
            }

            .no-results {
                text-align: center;
                padding: 3rem 2rem;
                color: #64748b;
                background: #f8fafc;
                border-radius: 8px;
                margin: 2rem 0;
            }

            .no-results h3 {
                color: #1a202c;
                margin-bottom: 1rem;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Such-Input
        const searchInput = document.getElementById('blogSearch');
        const searchBtn = document.getElementById('searchBtn');
        const clearSearch = document.getElementById('clearSearch');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput?.value || '';
                this.handleSearch(query);
            });
        }

        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                this.handleSearch('');
            });
        }

        // Clear all filters
        const clearAllBtn = document.getElementById('clearAllFilters');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Kategorie-Links funktional machen
        document.querySelectorAll('.categories-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = this.extractCategoryFromHref(link.getAttribute('href'));
                this.filterByCategory(category);
            });
        });

        // Tag-Links funktional machen
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const tagName = this.extractTagFromHref(tag.getAttribute('href'));
                this.filterByTag(tagName);
            });
        });
    }

    handleSearch(query) {
        this.currentSearch = query.toLowerCase().trim();
        
        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.style.display = this.currentSearch ? 'block' : 'none';
        }

        this.applyFilters();
        this.updateActiveFilters();
    }

    filterByCategory(category) {
        this.currentFilter = category;
        this.applyFilters();
        this.updateActiveFilters();
        this.highlightActiveCategory(category);
    }

    filterByTag(tag) {
        this.currentFilter = tag;
        this.applyFilters();
        this.updateActiveFilters();
        this.highlightActiveTag(tag);
    }

    applyFilters() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;

        let filtered = [...this.posts];

        // Text-Suche anwenden
        if (this.currentSearch) {
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(this.currentSearch) ||
                post.excerpt.toLowerCase().includes(this.currentSearch) ||
                post.content.toLowerCase().includes(this.currentSearch) ||
                (post.keywords && post.keywords.toLowerCase().includes(this.currentSearch))
            );
        }

        // Kategorie/Tag-Filter anwenden
        if (this.currentFilter && this.currentFilter !== 'all') {
            filtered = filtered.filter(post => {
                const keywords = post.keywords ? post.keywords.toLowerCase() : '';
                const title = post.title.toLowerCase();
                const content = post.content.toLowerCase();
                
                const searchTerm = this.currentFilter.toLowerCase();
                
                return keywords.includes(searchTerm) || 
                       title.includes(searchTerm) || 
                       content.includes(searchTerm);
            });
        }

        this.filteredPosts = filtered;
        this.renderFilteredPosts();
    }

    renderFilteredPosts() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;

        // Entferne vorherige No-Results Meldung
        const existingNoResults = postsContainer.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        if (this.filteredPosts.length === 0) {
            this.showNoResults();
            return;
        }

        // Generiere HTML für gefilterte Posts
        const postsHTML = this.filteredPosts.map((post, index) => `
            <article class="post-card" style="animation-delay: ${(index + 1) * 0.1}s">
                ${post.image ? `
                    <div style="overflow: hidden;">
                        <img src="${post.image}" alt="${post.altText || post.title}" class="post-image">
                    </div>
                ` : ''}
                <div class="post-content">
                    <div class="post-meta">
                        <div class="post-date">
                            <span>📅</span>
                            <time datetime="${post.publishedAt}">
                                ${new Date(post.publishedAt).toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        ${post.keywords ? `
                            <span class="post-keywords">
                                ${post.keywords.split(',').slice(0, 2).map(k => k.trim()).join(', ')}
                            </span>
                        ` : ''}
                    </div>
                    <h3><a href="posts/${post.slug}.html">${this.highlightSearchTerm(post.title)}</a></h3>
                    <p class="post-excerpt">${this.highlightSearchTerm(post.excerpt)}</p>
                    <a href="posts/${post.slug}.html" class="read-more">
                        <span>Artikel lesen</span>
                        <span>→</span>
                    </a>
                </div>
            </article>
        `).join('');

        postsContainer.innerHTML = postsHTML;
    }

    showNoResults() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;

        const noResultsHTML = `
            <div class="no-results">
                <h3>Keine Artikel gefunden</h3>
                <p>Leider konnten wir keine Artikel zu "${this.currentSearch || this.currentFilter}" finden.</p>
                <p style="margin-top: 1rem;">
                    <button type="button" onclick="blogFilter.clearAllFilters()" style="background: #1a202c; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">
                        Alle Filter zurücksetzen
                    </button>
                </p>
            </div>
        `;

        postsContainer.innerHTML = noResultsHTML;
    }

    highlightSearchTerm(text) {
        if (!this.currentSearch || this.currentSearch.length < 2) return text;
        
        const regex = new RegExp(`(${this.currentSearch})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    updateActiveFilters() {
        const activeFiltersContainer = document.getElementById('activeFilters');
        const filterTags = document.getElementById('filterTags');
        
        if (!activeFiltersContainer || !filterTags) return;

        const hasFilters = this.currentSearch || (this.currentFilter && this.currentFilter !== 'all');
        
        if (!hasFilters) {
            activeFiltersContainer.style.display = 'none';
            return;
        }

        activeFiltersContainer.style.display = 'flex';
        
        let tagsHTML = '';
        
        if (this.currentSearch) {
            tagsHTML += `
                <span class="filter-tag">
                    Suche: "${this.currentSearch}"
                    <span class="filter-tag-remove" onclick="blogFilter.clearSearch()">✕</span>
                </span>
            `;
        }
        
        if (this.currentFilter && this.currentFilter !== 'all') {
            tagsHTML += `
                <span class="filter-tag">
                    Filter: ${this.currentFilter}
                    <span class="filter-tag-remove" onclick="blogFilter.clearCategoryFilter()">✕</span>
                </span>
            `;
        }
        
        filterTags.innerHTML = tagsHTML;
    }

    clearSearch() {
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) searchInput.value = '';
        this.currentSearch = '';
        this.applyFilters();
        this.updateActiveFilters();
    }

    clearCategoryFilter() {
        this.currentFilter = 'all';
        this.applyFilters();
        this.updateActiveFilters();
        this.clearHighlights();
    }

    clearAllFilters() {
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) searchInput.value = '';
        
        this.currentSearch = '';
        this.currentFilter = 'all';
        this.applyFilters();
        this.updateActiveFilters();
        this.clearHighlights();
    }

    highlightActiveCategory(category) {
        // Entferne alte Highlights
        this.clearHighlights();
        
        // Highlighte aktive Kategorie
        document.querySelectorAll('.categories-list a').forEach(link => {
            const linkCategory = this.extractCategoryFromHref(link.getAttribute('href'));
            if (linkCategory === category) {
                link.style.fontWeight = 'bold';
                link.style.color = '#1a202c';
            }
        });
    }

    highlightActiveTag(tag) {
        // Entferne alte Highlights
        this.clearHighlights();
        
        // Highlighte aktiven Tag
        document.querySelectorAll('.tag').forEach(tagElement => {
            const tagName = this.extractTagFromHref(tagElement.getAttribute('href'));
            if (tagName === tag) {
                tagElement.style.background = '#1a202c';
                tagElement.style.color = '#ffffff';
            }
        });
    }

    clearHighlights() {
        // Kategorie-Highlights entfernen
        document.querySelectorAll('.categories-list a').forEach(link => {
            link.style.fontWeight = '';
            link.style.color = '';
        });
        
        // Tag-Highlights entfernen
        document.querySelectorAll('.tag').forEach(tag => {
            tag.style.background = '';
            tag.style.color = '';
        });
    }

    extractCategoryFromHref(href) {
        if (!href || !href.startsWith('#')) return '';
        return href.substring(1);
    }

    extractTagFromHref(href) {
        if (!href || !href.startsWith('#')) return '';
        return href.substring(1);
    }

    updateCategoryCounts() {
        const categories = {
            'osteopathie': 0,
            'gesundheitstipps': 0,
            'behandlungsmethoden': 0,
            'rueckenschmerzen': 0,
            'kopfschmerzen': 0,
            'sportverletzungen': 0
        };

        // Zähle Posts pro Kategorie
        this.posts.forEach(post => {
            const keywords = post.keywords ? post.keywords.toLowerCase() : '';
            const title = post.title.toLowerCase();
            const content = post.content.toLowerCase();

            Object.keys(categories).forEach(category => {
                if (keywords.includes(category) || title.includes(category) || content.includes(category)) {
                    categories[category]++;
                }
            });
        });

        // Update UI
        Object.entries(categories).forEach(([category, count]) => {
            const categoryLink = document.querySelector(`.categories-list a[href="#${category}"]`);
            if (categoryLink) {
                const countSpan = categoryLink.querySelector('.category-count');
                if (countSpan) {
                    countSpan.textContent = count;
                }
            }
        });
    }

    // Öffentliche Methoden für globalen Zugriff
    searchPosts(query) {
        this.handleSearch(query);
    }

    filterPosts(filter) {
        this.currentFilter = filter;
        this.applyFilters();
        this.updateActiveFilters();
    }

    getFilteredPosts() {
        return this.filteredPosts;
    }

    getAllPosts() {
        return this.posts;
    }
}

// Globale Instanz erstellen
let blogFilter;

// Auto-Initialisierung wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Prüfe ob wir auf der Blog-Hauptseite sind
    if (document.getElementById('postsContainer')) {
        // Warte bis Posts geladen sind, dann initialisiere Filter
        setTimeout(() => {
            blogFilter = new BlogFilter();
            
            // Globalen Zugriff ermöglichen
            window.blogFilter = blogFilter;
        }, 500);
    }
});

// Utility-Funktionen für globalen Zugriff
window.searchBlog = function(query) {
    if (window.blogFilter) {
        window.blogFilter.searchPosts(query);
    }
};

window.filterBlogByCategory = function(category) {
    if (window.blogFilter) {
        window.blogFilter.filterPosts(category);
    }
};

window.clearBlogFilters = function() {
    if (window.blogFilter) {
        window.blogFilter.clearAllFilters();
    }
};