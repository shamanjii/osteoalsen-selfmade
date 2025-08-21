/**
 * FINALE NAVIGATION - Zentriertes OSTEOPATHIE ALSEN Logo
 * Menüpunkte symmetrisch links und rechts verteilt
 */

document.addEventListener("DOMContentLoaded", function() {
    initializeCenteredNavigation();
});

function initializeCenteredNavigation() {
    console.log("🎯 Initialisiere zentrierte Navigation...");
    
    const headerElement = document.querySelector("header.header");
    if (!headerElement) {
        console.log("❌ Header-Element nicht gefunden");
        return;
    }
    
    // Navigation HTML generieren
    const navigationHTML = generateCenteredNavigationHTML();
    headerElement.innerHTML = navigationHTML;
    
    // Interaktivität hinzufügen
    setupNavigationInteractions();
    markActiveLink();
    
    console.log("✅ Zentrierte Navigation geladen");
}

function generateCenteredNavigationHTML() {
    // Intelligente Pfad-Erkennung
    const currentPath = window.location.pathname;
    const isInBlog = currentPath.includes("/blog/");
    const isInBlogPost = currentPath.includes("/blog/posts/");
    
    let baseUrl = "";
    if (isInBlogPost) {
        baseUrl = "../../";
    } else if (isInBlog) {
        baseUrl = "../";
    } else {
        baseUrl = "";
    }
    
    let blogUrl = "";
    if (isInBlogPost) {
        blogUrl = "../";
    } else if (isInBlog) {
        blogUrl = "";
    } else {
        blogUrl = "blog/";
    }
    
    return `
        <nav class="centered-navigation">
            <div class="nav-container">
                <!-- LINKE NAVIGATION -->
                <div class="nav-section nav-left">
                    <a href="${baseUrl}#home" class="nav-link" data-text="Home">Home</a>
                    <a href="${baseUrl}#was-ist-osteopathie" class="nav-link" data-text="Osteopathie">Osteopathie</a>
                    <a href="${baseUrl}#behandlungen" class="nav-link" data-text="Behandlungen">Behandlungen</a>
                    <a href="${baseUrl}#anwendungsbereiche" class="nav-link" data-text="Anwendungen">Anwendungen</a>
                </div>
                
                <!-- ZENTRIERTES LOGO -->
                <div class="logo-center">
                    <a href="${baseUrl}" class="brand-logo">
                        <img src="${baseUrl}blog/assets/images/logo.webp" alt="Osteopathie Alsen Logo" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="logo-text-fallback" style="display: none;">OSTEOPATHIE ALSEN</span>
                    </a>
                </div>
                
                <!-- RECHTE NAVIGATION -->
                <div class="nav-section nav-right">
                    <a href="${baseUrl}#ueber-mich" class="nav-link" data-text="Über mich">Über mich</a>
                    <a href="${baseUrl}#faq" class="nav-link" data-text="FAQ">FAQ</a>
                    <a href="${baseUrl}${blogUrl}" class="nav-link" data-text="Blog">Blog</a>
                    <a href="${baseUrl}terminbuchung.html" class="cta-link">
                        <span class="cta-icon">📅</span>
                        <span>Termin buchen</span>
                    </a>
                </div>
                
                <!-- MOBILE MENU BUTTON -->
                <button class="mobile-toggle" id="mobileToggle" aria-label="Menü öffnen">
                    <span class="toggle-line"></span>
                    <span class="toggle-line"></span>
                    <span class="toggle-line"></span>
                </button>
                
                <!-- MOBILE MENU -->
                <div class="mobile-menu" id="mobileMenu">
                    <div class="mobile-menu-content">
                        <a href="${baseUrl}#home" class="mobile-nav-link">Home</a>
                        <a href="${baseUrl}#was-ist-osteopathie" class="mobile-nav-link">Osteopathie</a>
                        <a href="${baseUrl}#behandlungen" class="mobile-nav-link">Behandlungen</a>
                        <a href="${baseUrl}#anwendungsbereiche" class="mobile-nav-link">Anwendungen</a>
                        <a href="${baseUrl}#ueber-mich" class="mobile-nav-link">Über mich</a>
                        <a href="${baseUrl}#faq" class="mobile-nav-link">FAQ</a>
                        <a href="${baseUrl}${blogUrl}" class="mobile-nav-link">Blog</a>
                        <a href="${baseUrl}terminbuchung.html" class="mobile-cta-link">
                            📅 Termin buchen
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

function setupNavigationInteractions() {
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    
    if (mobileToggle && mobileMenu) {
        // Mobile Menu Toggle
        mobileToggle.addEventListener("click", function() {
            const isOpen = mobileMenu.classList.contains("active");
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Menu schließen bei Link-Klick
        const mobileLinks = mobileMenu.querySelectorAll(".mobile-nav-link, .mobile-cta-link");
        mobileLinks.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });
        
        // Menu schließen bei Außerhalb-Klick
        document.addEventListener("click", function(event) {
            if (!mobileToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        // ESC-Taste zum Schließen
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileToggle = document.getElementById("mobileToggle");
    
    mobileMenu.classList.add("active");
    mobileToggle.classList.add("active");
    document.body.classList.add("menu-open");
    mobileToggle.setAttribute("aria-label", "Menü schließen");
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileToggle = document.getElementById("mobileToggle");
    
    mobileMenu.classList.remove("active");
    mobileToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileToggle.setAttribute("aria-label", "Menü öffnen");
}

function markActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .cta-link, .mobile-cta-link");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        
        if (currentPath.includes("/blog/") && href.includes("blog")) {
            link.classList.add("active");
        } else if (currentPath === "/" && href.includes("#home")) {
            link.classList.add("active");
        } else if (currentPath.includes("terminbuchung") && href.includes("terminbuchung")) {
            link.classList.add("active");
        }
    });
}

// PREMIUM CSS für zentrierte Navigation
function injectCenteredNavigationCSS() {
    const centeredCSS = `
        
        /* Layout-optimierte Navigation */
        .nav-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
        }
        
        /* Responsive Container */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem !important;
            }
        }
        
        /* Entferne mögliche Sidebar-Navigation */
        .nav-sidebar,
        .sidebar-nav {
            display: none !important;
        }
        /* ====================================
           ZENTRIERTE PREMIUM NAVIGATION
        ==================================== */
        
        .header {
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .header.scrolled {
            background: rgba(45, 55, 72, 0.95);
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }
        
        .centered-navigation {
            width: 100%;
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1rem;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            height: 80px;
            gap: 1rem;
        }
        
        
        /* Layout-optimierte Navigation */
        .nav-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
        }
        
        /* Responsive Container */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem !important;
            }
        }
        
        /* Entferne mögliche Sidebar-Navigation */
        .nav-sidebar,
        .sidebar-nav {
            display: none !important;
        }
        /* ====================================
           NAVIGATION SECTIONS
        ==================================== */
        
        .nav-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .nav-left {
            justify-content: flex-end;
        }
        
        .nav-right {
            justify-content: flex-start;
        }
        
        .nav-link {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-family: "Instrument Sans", sans-serif;
            font-weight: 500;
            font-size: 0.95rem;
            padding: 0.8rem 1.2rem;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            white-space: nowrap;
        }
        
        .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.8);
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 1px;
        }
        
        .nav-link:hover::before,
        .nav-link.active::before {
            width: 100%;
        }
        
        .nav-link:hover,
        .nav-link.active {
            color: white;
            background: transparent;
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 3px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
        }
        
        
        /* Layout-optimierte Navigation */
        .nav-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
        }
        
        /* Responsive Container */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem !important;
            }
        }
        
        /* Entferne mögliche Sidebar-Navigation */
        .nav-sidebar,
        .sidebar-nav {
            display: none !important;
        }
        /* ====================================
           ZENTRIERTES LOGO
        ==================================== */
        
        .logo-center {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .brand-logo {
            text-decoration: none;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 0.5rem;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .brand-logo::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.8s ease;
        }
        
        .brand-logo:hover::before {
            left: 100%;
        }
        
        .brand-logo:hover {
            transform: translateY(-2px);
        }
        
        .logo-image {
            height: clamp(35px, 5vw, 50px);
            width: auto;
            max-width: 280px;
            object-fit: contain;
            transition: all 0.3s ease;
            filter: brightness(1) contrast(1.1);
        }
        
        .brand-logo:hover .logo-image {
            filter: brightness(1.1) contrast(1.2);
            transform: scale(1.02);
        }
        
        .logo-text-fallback {
            color: white;
            font-family: "Epilogue", sans-serif;
            font-size: clamp(1.2rem, 2.5vw, 2rem);
            font-weight: 800;
            letter-spacing: 0.15em;
            line-height: 1;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            white-space: nowrap;
            text-transform: uppercase;
        }
        
        .brand-logo:hover .logo-text-fallback {
            color: rgba(255, 255, 255, 0.95);
            text-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
        }
        
        
        /* Layout-optimierte Navigation */
        .nav-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
        }
        
        /* Responsive Container */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem !important;
            }
        }
        
        /* Entferne mögliche Sidebar-Navigation */
        .nav-sidebar,
        .sidebar-nav {
            display: none !important;
        }
        /* ====================================
           CTA BUTTON
        ==================================== */
        
        .cta-link {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            font-family: "Epilogue", sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            padding: 0.85rem 1.5rem;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            white-space: nowrap;
        }
        
        .cta-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.8s ease;
        }
        
        .cta-link:hover::before {
            left: 100%;
        }
        
        .cta-link:hover {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border-color: rgba(255, 255, 255, 0.3);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .cta-icon {
            font-size: 1rem;
        }
        
        
        /* Layout-optimierte Navigation */
        .nav-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
        }
        
        /* Responsive Container */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem !important;
            }
        }
        
        /* Entferne mögliche Sidebar-Navigation */
        .nav-sidebar,
        .sidebar-nav {
            display: none !important;
        }
        /* ====================================
           MOBILE NAVIGATION
        ==================================== */
        
        .mobile-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            gap: 4px;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1001;
        }
        
        .toggle-line {
            width: 28px;
            height: 3px;
            background: white;
            border-radius: 2px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-toggle.active .toggle-line:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .mobile-toggle.active .toggle-line:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
        }
        
        .mobile-toggle.active .toggle-line:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        
        .mobile-menu {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: calc(100vh - 80px);
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            overflow-y: auto;
            backdrop-filter: blur(20px);
            z-index: 1000;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        .mobile-menu-content {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .mobile-nav-link {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-family: "Instrument Sans", sans-serif;
            font-weight: 500;
            font-size: 1.1rem;
            padding: 1.2rem 1.5rem;
            border-radius: 10px;
            transition: all 0.3s ease;
            border: 1px solid transparent;
        }
        
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
            color: white;
            background: transparent;
            border-bottom: 2px solid rgba(255, 255, 255, 0.8);
            transform: translateX(5px);
        }
        
        .mobile-cta-link {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            font-family: "Epilogue", sans-serif;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 1.2rem 1.5rem;
            border-radius: 12px;
            text-align: center;
            margin-top: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-cta-link:hover {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        
        /* Layout-optimierte Navigation */
        .nav-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
        }
        
        /* Responsive Container */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem !important;
            }
        }
        
        /* Entferne mögliche Sidebar-Navigation */
        .nav-sidebar,
        .sidebar-nav {
            display: none !important;
        }
        /* ====================================
           RESPONSIVE BREAKPOINTS
        ==================================== */
        
        /* Large Desktop */
        @media (min-width: 1400px) {
            .nav-container {
                max-width: 1600px;
            }
            
            .logo-text {
                font-size: 2rem;
            }
        }
        
        /* Tablet */
        @media (max-width: 1024px) {
            .nav-container {
                padding: 0 1rem;
                gap: 0.5rem;
            }
            
            .nav-link {
                padding: 0.7rem 0.8rem;
                font-size: 0.85rem;
            }
            
            .logo-text {
                font-size: clamp(1rem, 2.2vw, 1.4rem);
                letter-spacing: 0.12em;
            }
            
            .cta-link {
                padding: 0.8rem 1rem;
                font-size: 0.8rem;
            }
        }
        
        /* Mobile */
        @media (max-width: 768px) {
            .nav-container {
                grid-template-columns: 1fr auto auto;
                height: 70px;
                padding: 0 0.75rem;
                gap: 0.5rem;
            }
            
            .nav-section {
                display: none;
            }
            
            .logo-center {
                order: -1;
                flex: 1;
                justify-content: flex-start;
            }
            
            .logo-image {
                height: clamp(28px, 4vw, 35px);
                max-width: 200px;
            }
            
            .logo-text-fallback {
                font-size: clamp(0.9rem, 4vw, 1.2rem);
                letter-spacing: 0.1em;
                font-weight: 800;
            }
            
            .mobile-toggle {
                display: flex;
            }
            
            .mobile-menu {
                top: 70px;
                height: calc(100vh - 70px);
            }
            
            body.menu-open {
                overflow: hidden;
            }
        }
        
        /* Small Mobile */
        @media (max-width: 480px) {
            .nav-container {
                padding: 0 0.5rem;
            }
            
            .logo-image {
                height: clamp(25px, 3.5vw, 30px);
                max-width: 160px;
            }
            
            .logo-text-fallback {
                font-size: clamp(0.8rem, 3.5vw, 1rem);
                letter-spacing: 0.08em;
                font-weight: 800;
            }
            
            .mobile-menu-content {
                padding: 1.5rem;
            }
        }
        
        /* Body Padding für Fixed Header */
        body {
            padding-top: 80px;
        }
        
        @media (max-width: 768px) {
            body {
                padding-top: 70px;
            }
        }
        
        /* Smooth Scroll */
        html {
            scroll-behavior: smooth;
        }
        
        /* Performance Optimierungen */
        .centered-navigation {
            will-change: transform;
        }
        
        .nav-link, .cta-link, .brand-logo {
            will-change: transform;
        }
        
        /* Focus States für Accessibility */
        .nav-link:focus,
        .cta-link:focus,
        .brand-logo:focus,
        .mobile-nav-link:focus,
        .mobile-cta-link:focus {
            outline: 3px solid rgba(255, 255, 255, 0.6);
            outline-offset: 2px;
        }
        
        .mobile-toggle:focus {
            outline: 2px solid rgba(255, 255, 255, 0.6);
            outline-offset: 2px;
        }
    `;
    
    // Prüfen ob bereits geladen
    if (document.getElementById('centered-navigation-styles')) {
        return;
    }
    
    // CSS injizieren
    const styleElement = document.createElement("style");
    styleElement.id = 'centered-navigation-styles';
    styleElement.textContent = centeredCSS;
    document.head.appendChild(styleElement);
}

// CSS sofort laden
injectCenteredNavigationCSS();

// Scroll-Effekt
let scrollTimeout;
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (header) {
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        scrollTimeout = setTimeout(() => {
            // Performance optimization
        }, 10);
    }
});

// Debug
console.log("🎯 Zentrierte Navigation geladen");
console.log("📱 Mobile-responsive aktiv");
console.log("✨ Premium Animationen aktiviert");
// === SIDEBAR KILLER - Hinzugefügt durch PHP Script ===
document.addEventListener("DOMContentLoaded", function() {
    console.log("🔥 Sidebar Killer aktiviert in shared-header.js");
    
    // Sofortige Sidebar-Elimination
    setTimeout(function() {
        const sidebarElements = document.querySelectorAll(
  ".sidebar:not(.legitimate):not([data-sidebar-killer-ignore]), " +
  ".side-nav:not(.legitimate):not([data-sidebar-killer-ignore]), " +
  "aside:not(.legitimate):not([data-sidebar-killer-ignore])"
);
// Schütze spezifische Elemente vor Löschung
const protectedElements = document.querySelectorAll('[data-sidebar-killer-ignore], .legitimate, .newsletter-form, .author-card, .toc-list');
protectedElements.forEach(el => {
    el.setAttribute('data-protected', 'true');
});
        sidebarElements.forEach(el => {
            if (!el.closest("header") && !el.closest(".centered-navigation")) {
                el.remove();
                console.log("🗑️ Sidebar entfernt:", el);
            }
        });
    }, 2000);
    
    // Layout korrigieren
    document.body.style.overflowX = "hidden";
    
    // Container optimieren
   // Container-Optimierung entfernt, damit Grid und Layout erhalten bleiben
});
