// Blog JavaScript - Haupt-Funktionen

class BlogManager {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.config = {};
    this.init();
  }

  async init() {
    try {
      await this.loadConfig();
    } catch (error) {
      console.error('Fehler beim Laden der Konfiguration:', error);
    }
  }

  async loadConfig() {
    try {
      const response = await fetch('data/config.json');
      this.config = await response.json();
    } catch (error) {
      console.error('Config konnte nicht geladen werden:', error);
      this.config = {
        site_name: 'SEO Blog',
        site_url: 'https://example.com',
        posts_per_page: 10
      };
    }
  }

  render() {
    const container = document.getElementById("postsContainer");
    if (!container) return;

    container.innerHTML = "";

    const categoryNames = {
      "osteopathie": "Osteopathie",
      "rueckenschmerzen": "Rückenschmerzen",
      "kopfschmerzen": "Kopfschmerzen",
      "sportverletzungen": "Sportverletzungen",
      "gesundheitstipps": "Gesundheitstipps"
    };

    this.filteredPosts = this.posts;

    this.filteredPosts.forEach((post, index) => {
      const article = document.createElement("article");
      article.className = `post-card fade-in stagger-${Math.min(index + 1, 6)}`;

      article.innerHTML = `
        <div class="post-image-container">
          ${post.image 
            ? `<img src="${post.image}" alt="${post.title}" class="post-image">`
            : `<div class="image-placeholder">📄</div>`}
        </div>
        <div class="post-content">
          <div class="post-meta">
            <div class="post-date">
              <span>📅</span>
              <time datetime="${post.date}">
                ${new Date(post.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </time>
            </div>
            <span class="post-category">${categoryNames[post.category] || "Artikel"}</span>
          </div>
          <h3 class="post-title">
            <a href="posts/${post.slug}.html">${post.title}</a>
          </h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <a class="read-more" href="posts/${post.slug}.html">
            Weiterlesen <span class="read-more-arrow">→</span>
          </a>
        </div>
      `;

      container.appendChild(article);
    });
  }

  async loadPosts() {
    try {
      const response = await fetch('data/posts.json');
      this.posts = await response.json();
      return this.posts;
    } catch (error) {
      console.error('Posts konnten nicht geladen werden:', error);
      return [];
    }
  }

  async savePosts(posts) {
    try {
      const response = await fetch('api/posts.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(posts)
      });

      const result = await response.json();

      if (result.success) {
        this.posts = await this.loadPosts();
        return result.data;
      } else {
        throw new Error(result.error || 'Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const response = await fetch(`api/posts.php?id=${postId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        this.posts = await this.loadPosts();
        return true;
      } else {
        throw new Error(result.error || 'Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      throw error;
    }
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  generateKeywords(title, content) {
    const text = (title + ' ' + content).toLowerCase();
    const words = text.match(/\b\w{4,}\b/g) || [];

    const stopwords = []; // unverändert lassen für Kürze

    const filteredWords = words.filter(word => 
      !stopwords.includes(word) && word.length >= 4
    );

    const wordCount = {};
    filteredWords.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(entry => entry[0]);

    return sortedWords.join(', ');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  truncateText(text, maxLength = 160) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  analyzeSEO(text) {
    const plainText = this.stripHtml(text);
    const words = plainText.split(/\s+/).length;
    const sentences = plainText.split(/[.!?]+/).length - 1;
    const avgWordsPerSentence = Math.round(words / sentences);

    const headings = (text.match(/<h[1-6][^>]*>/gi) || []).length;
    const links = (text.match(/<a[^>]*>/gi) || []).length;
    const images = (text.match(/<img[^>]*>/gi) || []).length;

    return {
      words,
      sentences,
      avgWordsPerSentence,
      headings,
      links,
      images,
      score: this.calculateSEOScore({
        words,
        sentences,
        avgWordsPerSentence,
        headings,
        links,
        images
      })
    };
  }

  calculateSEOScore(metrics) {
    let score = 0;

    if (metrics.words >= 800 && metrics.words <= 2000) score += 25;
    else if (metrics.words >= 500) score += 15;
    else if (metrics.words >= 300) score += 10;

    if (metrics.avgWordsPerSentence <= 20) score += 15;
    else if (metrics.avgWordsPerSentence <= 25) score += 10;

    if (metrics.headings >= 3) score += 20;
    else if (metrics.headings >= 2) score += 15;
    else if (metrics.headings >= 1) score += 10;

    if (metrics.links >= 3) score += 15;
    else if (metrics.links >= 2) score += 10;
    else if (metrics.links >= 1) score += 5;

    if (metrics.images >= 2) score += 10;
    else if (metrics.images >= 1) score += 7;

    const readingTime = Math.ceil(metrics.words / 200);
    if (readingTime >= 3 && readingTime <= 8) score += 15;
    else if (readingTime >= 2 && readingTime <= 10) score += 10;

    return Math.min(score, 100);
  }

  showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.style.display = 'block';
  }

  hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) element.style.display = 'none';
  }

  updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = text;
  }

  updateElementHTML(elementId, html) {
    const element = document.getElementById(elementId);
    if (element) element.innerHTML = html;
  }
}

window.BlogManager = BlogManager;
window.blogManager = new BlogManager();

window.formatDate = (dateString) => window.blogManager.formatDate(dateString);
window.generateSlug = (title) => window.blogManager.generateSlug(title);
window.generateKeywords = (title, content) => window.blogManager.generateKeywords(title, content);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

window.BlogManager = BlogManager;