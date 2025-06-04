class SEOBoostState {
    constructor() {
        this.data = {
            posts: JSON.parse(localStorage.getItem('seo_boost_posts') || '[]'),
            currentPost: JSON.parse(localStorage.getItem('seo_boost_current_post') || 'null'),
            analytics: JSON.parse(localStorage.getItem('seo_boost_analytics') || '{}'),
            live_stats: {}
        };

        this.channel = new BroadcastChannel('seo_boost_admin');
        this.setupChannelListeners();
        this.startLiveUpdates();
    }

    shareData(key, data) {
        this.data[key] = data;
        localStorage.setItem(`seo_boost_${key}`, JSON.stringify(data));
        this.channel.postMessage({
            type: 'state_update',
            key,
            data,
            timestamp: Date.now()
        });
    }

    setupChannelListeners() {
        this.channel.onmessage = (event) => {
            const { type, key, data } = event.data;
            if (type === 'state_update') {
                this.data[key] = data;
                document.dispatchEvent(new CustomEvent('seoBoostUpdate', {
                    detail: { key, data }
                }));
            }
        };
    }

    startLiveUpdates() {
        setInterval(() => {
            this.fetchLiveMetrics();
        }, 30000);
    }

    async fetchLiveMetrics() {
        try {
            const response = await fetch('../api/posts.php?action=list&limit=1000');
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    const posts = result.data.posts;
                    const stats = {
                        totalPosts: posts.length,
                        publishedPosts: posts.filter(p => p.status === 'published').length,
                        draftPosts: posts.filter(p => p.status === 'draft').length,
                        avgSeoScore: this.calculateAvgSEO(posts),
                        lastUpdate: new Date().toISOString()
                    };
                    this.shareData('live_stats', stats);
                }
            }
        } catch (err) {
            console.warn('Live metrics update failed:', err);
        }
    }

    calculateAvgSEO(posts) {
        const scores = posts.map(p => p.seo_score || 0).filter(s => s > 0);
        return scores.length ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0;
    }
}

window.SEOBoost = new SEOBoostState();

