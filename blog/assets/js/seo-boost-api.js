class SEOBoostAPI {
    static async createPost(postData) {
        const response = await fetch('../api/posts.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'create', post: postData })
        });
        const result = await response.json();
        if (result.success) {
            window.SEOBoost.shareData('post_created', {
                post: postData,
                postId: result.data.post_id
            });
            this.analyzeSEO(result.data.post_id);
        }
        return result;
    }

    static async analyzeSEO(postId) {
        try {
            const post = await this.getPost(postId);
            const response = await fetch('../api/seo.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'analyze_content',
                    title: post.title,
                    content: post.content,
                    keyword: post.focus_keyword
                })
            });
            const analysis = await response.json();
            window.SEOBoost.shareData('seo_analysis', {
                postId,
                analysis,
                timestamp: Date.now()
            });
            return analysis;
        } catch (err) {
            console.error('SEO Analysis failed:', err);
        }
    }

    static async getPost(postId) {
        const response = await fetch(`../api/posts.php?action=get&id=${postId}`);
        const result = await response.json();
        return result.success ? result.data.post : null;
    }

    static async optimizeImage(mediaId) {
        const response = await fetch('../api/media.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'optimize', id: mediaId })
        });
        const result = await response.json();
        if (result.success) {
            window.SEOBoost.shareData('media_optimized', { mediaId });
        }
        return result;
    }
}

window.SEOBoostAPI = SEOBoostAPI;

