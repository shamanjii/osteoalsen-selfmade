function unifyNavigation() {
    const currentPage = location.pathname.split('/').pop().replace('.html', '');
    const logoHTML = `
        <a href="../index.html" class="logo">
            <div class="logo-icon">OA</div>
            <div class="logo-text">
                <div class="logo-title">Osteopathie Alsen</div>
                <div class="logo-subtitle">SEO Boost Machine</div>
            </div>
        </a>
    `;

    const menuHTML = `
        <ul class="nav-menu" id="navMenu">
            <li><a href="index.html" ${currentPage === 'index' ? 'class="active"' : ''}>📊 Dashboard</a></li>
            <li><a href="editor.html" ${currentPage === 'editor' ? 'class="active"' : ''}>✏️ Editor</a></li>
            <li><a href="media.html" ${currentPage === 'media' ? 'class="active"' : ''}>🖼️ Medien</a></li>
            <li><a href="seo.html" ${currentPage === 'seo' ? 'class="active"' : ''}>🔍 SEO-Tools</a></li>
            <li><a href="content-optimizer.html" ${currentPage === 'content-optimizer' ? 'class="active"' : ''}>🎯 Optimierer</a></li>
            <li><a href="automation.html" ${currentPage === 'automation' ? 'class="active"' : ''}>🤖 Automatisierung</a></li>
            <li><a href="performance.html" ${currentPage === 'performance' ? 'class="active"' : ''}>⚡ Performance</a></li>
            <li><a href="analytics.html" ${currentPage === 'analytics' ? 'class="active"' : ''}>📈 Analytics</a></li>
            <li><a href="content-workflow.html" ${currentPage === 'content-workflow' ? 'class="active"' : ''}>📝 Workflow</a></li>
            <li><a href="../index.html" class="nav-cta">🌐 Blog ansehen</a></li>
        </ul>
    `;

    const navContainer = document.querySelector('nav') || document.querySelector('header nav');
    if (navContainer) {
        navContainer.innerHTML = logoHTML + menuHTML + '<button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>';
    }
}

document.addEventListener('DOMContentLoaded', unifyNavigation);

