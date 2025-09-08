document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("postForm");
    const titleInput = document.getElementById("title");
    const slugInput = document.getElementById("slug");
    const excerptInput = document.getElementById("excerpt");
    const previewTitle = document.getElementById("previewTitle");
    const previewUrl = document.getElementById("previewUrl");
    const previewDescription = document.getElementById("previewDescription");
    const excerptCount = document.getElementById("excerptCount");

    // Auto-generate slug when typing title
    titleInput.addEventListener("input", () => {
        const slug = titleInput.value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        slugInput.value = slug;
        previewTitle.textContent = titleInput.value || "Dein Titel hier...";
        previewUrl.textContent = `https://deine-domain.de/blog/${slug}`;
    });

    // Count meta description characters
    excerptInput.addEventListener("input", () => {
        excerptCount.textContent = `${excerptInput.value.length}/160 Zeichen`;
        previewDescription.textContent = excerptInput.value || "Deine Meta Description hier...";
    });

    // Form submission handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const slug = slugInput.value.trim();
        const content = document.getElementById("content").value.trim();
        const excerpt = excerptInput.value.trim();
        const keywords = document.getElementById("keywords").value.split(",").map(k => k.trim());
        const altText = document.getElementById("altText").value.trim();

        if (!title || !slug || !content) {
            alert("Bitte fülle alle Pflichtfelder aus: Titel, Slug und Inhalt.");
            return;
        }

        // Collect selected categories
        const categories = Array.from(document.querySelectorAll('input[name="categories"]:checked')).map(el => el.value);

        // Collect selected tags
        const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(el => el.value);

        const postData = {
            title,
            slug,
            excerpt,
            content,
            keywords,
            categories,
            tags,
            image: document.getElementById("image").value || "",
            altText,
            date: new Date().toISOString()
        };

        // Save data to localStorage for now (can be replaced with backend API)
        let posts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        posts.push(postData);
        localStorage.setItem("blogPosts", JSON.stringify(posts));

        alert("Post erfolgreich gespeichert!");
        form.reset();
    });
});
