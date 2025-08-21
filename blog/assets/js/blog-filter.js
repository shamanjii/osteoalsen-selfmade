// blog-filter.js – Dynamisches Filtern & Suchen im Blog

class BlogFilter {
  constructor(config) {
    this.dataUrl = config.dataUrl || 'data/posts.json';
    this.container = document.querySelector(config.containerSelector || '#postsContainer');
    this.searchInput = document.querySelector(config.searchInputSelector || '#blogSearch');
    this.filterTags = document.querySelectorAll(config.tagSelector || '.filter-tag');
    this.resetBtn = document.querySelector(config.resetSelector || '#resetFilters');
    this.posts = [];
    this.activeTags = new Set();
    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.dataUrl);
      this.posts = await response.json();
      this.renderPosts();
      this.bindEvents();
    } catch (error) {
      console.error('Fehler beim Laden der Blogposts:', error);
    }
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.renderPosts());
    }

    this.filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const value = tag.getAttribute('data-tag');
        tag.classList.toggle('active');
        this.activeTags.has(value) ? this.activeTags.delete(value) : this.activeTags.add(value);
        this.renderPosts();
      });
    });

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.activeTags.clear();
        this.filterTags.forEach(tag => tag.classList.remove('active'));
        if (this.searchInput) this.searchInput.value = '';
        this.renderPosts();
      });
    }
  }

  renderPosts() {
    if (!this.container) return;

    const query = this.searchInput?.value.toLowerCase() || '';
    const filtered = this.posts.filter(post => {
      const matchQuery = post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
      const matchTags = [...this.activeTags].every(tag => post.tags.includes(tag));
      return matchQuery && matchTags;
    });

    this.container.innerHTML = '';

    if (!filtered.length) {
      this.container.innerHTML = '<p>Keine passenden Artikel gefunden.</p>';
      return;
    }

    filtered.forEach(post => {
      const article = document.createElement('article');
      article.className = 'post-preview';
      article.innerHTML = `
        <a href="posts/${post.slug}.html">
          <img src="${post.image}" alt="${post.title}" class="post-thumb" onerror="this.style.display='none'">
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
          <span class="post-meta">📅 ${post.date} · ⏱️ ${post.readingTime} Min.</span>
        </a>
      `;
      this.container.appendChild(article);
    });
  }
}

// Initialisierung nach DOM load
window.addEventListener('DOMContentLoaded', () => {
  new BlogFilter({
    dataUrl: 'data/posts.json',
    containerSelector: '#postsContainer',
    searchInputSelector: '#blogSearch',
    tagSelector: '.filter-tag',
    resetSelector: '#resetFilters'
  });
});
