// Blog JavaScript - Haupt-Funktionen

class BlogManager {
    constructor() {
        this.posts = [];
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
        
        // Deutsche Stopwörter
        const stopwords = ['aber', 'alle', 'allem', 'allen', 'aller', 'alles', 'also', 'andere', 'anderen', 'andern', 'anders', 'auch', 'auf', 'aus', 'bei', 'bin', 'bis', 'bist', 'da', 'damit', 'dann', 'der', 'den', 'des', 'dem', 'die', 'das', 'dass', 'daß', 'derselbe', 'derselben', 'denselben', 'desselben', 'demselben', 'dieselbe', 'dieselben', 'dasselbe', 'dazu', 'dein', 'deine', 'deinem', 'deinen', 'deiner', 'deines', 'denn', 'derer', 'dessen', 'dich', 'dir', 'du', 'dies', 'diese', 'diesem', 'diesen', 'dieser', 'dieses', 'doch', 'dort', 'durch', 'ein', 'eine', 'einem', 'einen', 'einer', 'eines', 'einig', 'einige', 'einigem', 'einigen', 'einiger', 'einiges', 'einmal', 'er', 'ihn', 'ihm', 'es', 'etwas', 'euer', 'eure', 'eurem', 'euren', 'eurer', 'eures', 'für', 'gegen', 'gewesen', 'hab', 'habe', 'haben', 'hat', 'hatte', 'hatten', 'hier', 'hin', 'hinter', 'ich', 'mich', 'mir', 'ihr', 'ihre', 'ihrem', 'ihren', 'ihrer', 'ihres', 'euch', 'im', 'in', 'indem', 'ins', 'ist', 'jede', 'jedem', 'jeden', 'jeder', 'jedes', 'jene', 'jenem', 'jenen', 'jener', 'jenes', 'jetzt', 'kann', 'kein', 'keine', 'keinem', 'keinen', 'keiner', 'keines', 'können', 'könnte', 'machen', 'man', 'manche', 'manchem', 'manchen', 'mancher', 'manches', 'mein', 'meine', 'meinem', 'meinen', 'meiner', 'meines', 'mit', 'muss', 'musste', 'nach', 'nicht', 'nichts', 'noch', 'nun', 'nur', 'ob', 'oder', 'ohne', 'sehr', 'sein', 'seine', 'seinem', 'seinen', 'seiner', 'seines', 'selbst', 'sich', 'sie', 'ihnen', 'sind', 'so', 'solche', 'solchem', 'solchen', 'solcher', 'solches', 'soll', 'sollte', 'sondern', 'sonst', 'über', 'um', 'und', 'uns', 'unse', 'unsem', 'unsen', 'unser', 'unses', 'unter', 'viel', 'vom', 'von', 'vor', 'während', 'war', 'waren', 'warst', 'was', 'weg', 'weil', 'weiter', 'welche', 'welchem', 'welchen', 'welcher', 'welches', 'wenn', 'werde', 'werden', 'wie', 'wieder', 'will', 'wir', 'wird', 'wirst', 'wo', 'wollen', 'wollte', 'würde', 'würden', 'zu', 'zum', 'zur', 'zwar', 'zwischen'];
        
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

    // SEO Analyse-Funktionen
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
        
        // Wortanzahl (0-25 Punkte)
        if (metrics.words >= 800 && metrics.words <= 2000) score += 25;
        else if (metrics.words >= 500) score += 15;
        else if (metrics.words >= 300) score += 10;
        
        // Satzlänge (0-15 Punkte)
        if (metrics.avgWordsPerSentence <= 20) score += 15;
        else if (metrics.avgWordsPerSentence <= 25) score += 10;
        
        // Überschriften (0-20 Punkte)
        if (metrics.headings >= 3) score += 20;
        else if (metrics.headings >= 2) score += 15;
        else if (metrics.headings >= 1) score += 10;
        
        // Links (0-15 Punkte)
        if (metrics.links >= 3) score += 15;
        else if (metrics.links >= 2) score += 10;
        else if (metrics.links >= 1) score += 5;
        
        // Bilder (0-10 Punkte)
        if (metrics.images >= 2) score += 10;
        else if (metrics.images >= 1) score += 7;
        
        // Lesezeit (0-15 Punkte)
        const readingTime = Math.ceil(metrics.words / 200); // 200 Wörter pro Minute
        if (readingTime >= 3 && readingTime <= 8) score += 15;
        else if (readingTime >= 2 && readingTime <= 10) score += 10;
        
        return Math.min(score, 100);
    }

    // Utility-Funktionen für DOM-Manipulation
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

// Globale Blog-Manager-Instanz
window.blogManager = new BlogManager();

// Utility-Funktionen für den globalen Scope
window.formatDate = (dateString) => window.blogManager.formatDate(dateString);
window.generateSlug = (title) => window.blogManager.generateSlug(title);
window.generateKeywords = (title, content) => window.blogManager.generateKeywords(title, content);

// Event-Listener für DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back-to-top Button (falls vorhanden)
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});