/**
 * FINALE NAVIGATION - Zentriertes OSTEOPATHIE ALSEN Logo
 * Menüpunkte symmetrisch links und rechts verteilt
 * Version: FIXED CROSS-PAGE LINKS - Nur Pfad-Korrekturen
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
    
    // DEBUG: Verfügbare Sections loggen
    logAvailableSections();
    
    // Scroll-Offset für Navigation Links - VERBESSERT
    setupSmoothScrolling();
    
    // Prüfe ob nach dem Laden zu einer Section gescrollt werden soll
    checkForDelayedScroll();
    
    console.log("✅ Zentrierte Navigation geladen");
}

function checkForDelayedScroll() {
    // Prüfe sessionStorage für gespeicherte Scroll-Ziele
    const scrollTarget = sessionStorage.getItem('scrollToSection');
    if (scrollTarget) {
        console.log(`🎯 Verzögertes Scrollen zu: ${scrollTarget}`);
        sessionStorage.removeItem('scrollToSection');
        
        // Warte kurz bis die Seite vollständig geladen ist
        setTimeout(() => {
            const target = findScrollTarget(scrollTarget);
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Auch beim verzögerten Scrollen smooth scroll verwenden
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(targetPosition, 800);
                }
                
                highlightTargetSection(target);
                console.log(`✅ Verzögertes Scrollen erfolgreich zu: ${scrollTarget}`);
            } else {
                console.warn(`❌ Verzögertes Scroll-Ziel nicht gefunden: ${scrollTarget}`);
                tryAlternativeScrollTargets(scrollTarget, 100);
            }
        }, 500);
    }
    
    // Prüfe auch URL-Hash für direktes Laden
    const urlHash = window.location.hash;
    if (urlHash && urlHash.length > 1) {
        const hashTarget = urlHash.substring(1);
        console.log(`🔗 URL-Hash erkannt: ${hashTarget}`);
        
        setTimeout(() => {
            const target = findScrollTarget(hashTarget);
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // URL-Hash Scroll auch smooth
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(targetPosition, 800);
                }
                
                highlightTargetSection(target);
                console.log(`✅ URL-Hash Scroll erfolgreich zu: ${hashTarget}`);
            }
        }, 300);
    }
}

function logAvailableSections() {
    console.log("🔍 Verfügbare Sections auf der Seite:");
    const sections = document.querySelectorAll('section[id], div[id], article[id]');
    sections.forEach(section => {
        console.log(`- ID: "${section.id}" | Tag: ${section.tagName} | Text: "${section.textContent.substring(0, 50)}..."`);
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname;
            const currentFile = currentPath.split('/').pop() || 'index.html';
            
            console.log(`🔗 Link geklickt: ${href} | Aktuelle Seite: ${currentFile}`);
            
            // Prüfe ob Link zu einer anderen Seite mit Anchor führt
            if (href.includes('#')) {
                const [linkPath, targetId] = href.split('#');
                
                // Bestimme ob wir zur Startseite wechseln müssen
                const needsPageChange = (
                    (linkPath && linkPath.includes('index.html')) || // explizit index.html
                    (linkPath === '../' || linkPath === '../../') || // relative Pfade
                    (currentFile !== 'index.html' && linkPath === '') // auf anderer Seite, Link zu Section
                );
                
                console.log(`🔍 Needs page change: ${needsPageChange} | Link path: "${linkPath}" | Target: ${targetId}`);
                
                // Falls wir zur Startseite wechseln müssen
                if (needsPageChange && targetId) {
                    console.log(`🔄 Navigiere zur Startseite mit Section: ${targetId}`);
                    e.preventDefault();
                    
                    // Speichere Ziel-Section für nach dem Laden
                    sessionStorage.setItem('scrollToSection', targetId);
                    
                    // Bestimme korrekten Pfad zur Startseite
                    let indexPath = 'index.html';
                    if (currentPath.includes('/blog/posts/')) {
                        indexPath = '../../index.html';
                    } else if (currentPath.includes('/blog/')) {
                        indexPath = '../index.html';
                    } else if (currentPath.includes('/legal/')) {
                        indexPath = '../index.html';
                    }
                    
                    console.log(`🔄 Wechsle zu: ${indexPath}`);
                    window.location.href = indexPath;
                    return;
                }
                
                // Wenn wir bereits auf der richtigen Seite sind, scrolle direkt
                if (targetId && currentFile === 'index.html') {
                    console.log(`✅ Bereits auf Startseite, scrolle zu: ${targetId}`);
                    e.preventDefault();
                    const offset = 100;
                    
                    // Verbesserte Target-Suche mit Fallbacks
                    let target = findScrollTarget(targetId);
                    
                    if (target) {
                        console.log(`✅ Scrolle zu Section: ${targetId} (${target.tagName}#${target.id})`);
                        
                        // VERBESSERTER SMOOTH SCROLL mit verschiedenen Methoden
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        
                        // Methode 1: Moderne scroll() API mit smooth behavior
                        if ('scrollBehavior' in document.documentElement.style) {
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        } else {
                            // Fallback für ältere Browser: Animiertes Scrollen
                            smoothScrollTo(targetPosition, 800);
                        }
                        
                        // Visual Feedback: Kurz Section highlighten
                        highlightTargetSection(target);
                        
                    } else {
                        console.warn(`❌ Section nicht gefunden: ${targetId}`);
                        // Fallback: Versuche alternative IDs
                        tryAlternativeScrollTargets(targetId, offset);
                    }
                }
            }
        });
    });
}

function findScrollTarget(targetId) {
    // Direkte ID-Suche
    let target = document.getElementById(targetId);
    if (target) return target;
    
    // Fallback-Suchen für häufige Variationen
    const alternatives = getAlternativeIds(targetId);
    
    for (const altId of alternatives) {
        target = document.getElementById(altId);
        if (target) {
            console.log(`📍 Alternative gefunden: ${targetId} → ${altId}`);
            return target;
        }
    }
    
    // Suche nach data-section Attribut
    target = document.querySelector(`[data-section="${targetId}"]`);
    if (target) {
        console.log(`📍 Data-section gefunden: ${targetId}`);
        return target;
    }
    
    return null;
}

function getAlternativeIds(originalId) {
    const alternatives = [];
    
    switch(originalId) {
        case 'was-ist-osteopathie':
            // KEINE 'osteopathie' als Alternative - das ist der Hero!
            alternatives.push('about-osteopathy', 'osteopathy', 'was-ist', 'definition', 'osteopathie-info');
            break;
        case 'anwendungsbereiche':
            alternatives.push('anwendungen', 'applications', 'bereiche', 'treatment-areas', 'treatments');
            break;
        case 'behandlungen':
            alternatives.push('treatments', 'therapy', 'therapie', 'services');
            break;
        case 'ueber-mich':
            alternatives.push('about', 'about-me', 'über-mich', 'profile');
            break;
        case 'home':
            alternatives.push('hero', 'start', 'top', 'main');
            break;
    }
    
    return alternatives;
}

function tryAlternativeScrollTargets(targetId, offset) {
    // Versuche basierend auf Text-Content zu finden
    const keywords = getKeywordsForSection(targetId);
    
    for (const keyword of keywords) {
        const sections = document.querySelectorAll('section, div, article');
        for (const section of sections) {
            const text = section.textContent.toLowerCase();
            if (text.includes(keyword.toLowerCase()) && section.offsetHeight > 100) {
                console.log(`📍 Text-basierte Alternative gefunden für ${targetId}: ${keyword}`);
                const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Auch hier verbesserten Smooth Scroll verwenden
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(targetPosition, 800);
                }
                
                highlightTargetSection(section);
                return;
            }
        }
    }
    
    console.warn(`❌ Keine Alternative für ${targetId} gefunden`);
}

// Fallback Smooth Scroll für ältere Browser
function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();
    
    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + (difference * ease));
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Easing function für smooth animation
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Visual Feedback: Section kurz highlighten
function highlightTargetSection(target) {
    // Füge temporäre highlight Klasse hinzu
    target.style.transition = 'box-shadow 0.3s ease';
    target.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
    
    // Nach 1 Sekunde wieder entfernen
    setTimeout(() => {
        target.style.boxShadow = '';
        setTimeout(() => {
            target.style.transition = '';
        }, 300);
    }, 1000);
}

function getKeywordsForSection(sectionId) {
    const keywordMap = {
        'was-ist-osteopathie': ['was ist osteopathie', 'definition osteopathie', 'grundlagen osteopathie', 'osteopathie definition'],
        'anwendungsbereiche': ['anwendungsbereiche', 'anwendungen', 'bereiche', 'indikationen'],
        'behandlungen': ['behandlungen', 'therapie', 'behandlung', 'methoden'],
        'ueber-mich': ['über mich', 'praxis', 'therapeut', 'qualifikation'],
        'faq': ['faq', 'häufige fragen', 'fragen', 'antworten']
    };
    
    return keywordMap[sectionId] || [sectionId];
}

function generateCenteredNavigationHTML() {
    // KORRIGIERTE Pfad-Erkennung - nur Links angepasst für Cross-Page Navigation
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
    
    // WICHTIG: Alle Section-Links führen explizit zu index.html#section
    return `
        <nav class="centered-navigation">
        <div class="nav-container">
            <!-- LINKE NAVIGATION -->
            <div class="nav-section nav-left">
                <a href="${baseUrl}index.html#home" class="nav-link" data-text="Home">Home</a>
                <a href="${baseUrl}index.html#was-ist-osteopathie" class="nav-link" data-text="Osteopathie">Osteopathie</a>
                <a href="${baseUrl}index.html#behandlungen" class="nav-link" data-text="Behandlungen">Behandlungen</a>
                <a href="${baseUrl}index.html#anwendungsbereiche" class="nav-link" data-text="Anwendungen">Anwendungen</a>
            </div>
                
                <!-- ZENTRIERTES LOGO -->
                <div class="logo-center">
                    <a href="${baseUrl}index.html" class="brand-logo">
                        <img src="${baseUrl}blog/assets/images/logo.webp" alt="Osteopathie Alsen Logo" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="logo-text-fallback" style="display: none;">OSTEOPATHIE ALSEN</span>
                    </a>
                </div>
                
                <!-- RECHTE NAVIGATION -->
                <div class="nav-section nav-right">
                    <a href="${baseUrl}index.html#ueber-mich" class="nav-link" data-text="Über mich">Über mich</a>
                    <a href="${baseUrl}index.html#faq" class="nav-link" data-text="FAQ">FAQ</a>
                    <a href="${baseUrl}${blogUrl}index.html" class="nav-link" data-text="Blog">Blog</a>
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
        <a href="${baseUrl}index.html#home" class="mobile-nav-link">Home</a>
        <a href="${baseUrl}index.html#was-ist-osteopathie" class="mobile-nav-link">Was ist Osteopathie?</a>
        <a href="${baseUrl}index.html#behandlungen" class="mobile-nav-link">Behandlungen</a>
        <a href="${baseUrl}index.html#anwendungsbereiche" class="mobile-nav-link">Anwendungsbereiche</a>
        <a href="${baseUrl}index.html#ueber-mich" class="mobile-nav-link">Über mich</a>
        <a href="${baseUrl}index.html#faq" class="mobile-nav-link">FAQ</a>
        <a href="${baseUrl}${blogUrl}index.html" class="mobile-nav-link">Blog</a>
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
            transform: translateY(0); /* Startet sichtbar */
        }
        
        .header.scrolled {
            background: rgba(45, 55, 72, 0.95);
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }
        
        /* HEADER VERSTECKEN BEIM RUNTERSCROLLEN */
        .header.hidden {
            transform: translateY(-100%); /* Scrollt nach oben aus dem Bild */
        }
        
        /* HEADER ZEIGEN BEIM HOCHSCROLLEN */
        .header.visible {
            transform: translateY(0); /* Scrollt wieder ins Bild */
        }
        
        .centered-navigation {
            width: 100%;
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem; /* Reduziertes Container-Padding */
            display: flex;
            align-items: center;
            height: 80px;
            position: relative;
        }
        
        /* ====================================
           NAVIGATION SECTIONS - EINFACH SICHTBAR
        ==================================== */
        
        .nav-section {
            display: flex;
            align-items: center;
        }
        .logo-center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        /* Navigation Sections nehmen verfügbaren Platz - EINFACH */
        .nav-left {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1.2rem;
            justify-content: flex-end;
            padding-right: 2rem;
        }
        
        .nav-right {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1.2rem;
            justify-content: flex-start;
            padding-left: 2rem;
        }
        
        .nav-link {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-family: "Instrument Sans", sans-serif;
            font-weight: 500;
            font-size: 0.9rem; /* Kleinere Schrift */
            padding: 0.8rem 0.5rem; /* Kompaktere Links */
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
        
        /* ====================================
           ZENTRIERTES LOGO
        ==================================== */
        
        /* PERFEKTE LOGO-ZENTRIERUNG */
        .logo-center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
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
            font-size: 0.85rem; /* Kleinere Schrift */
            padding: 0.75rem 1rem; /* Kompakterer CTA */
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
        
        /* ====================================
           RESPONSIVE BREAKPOINTS
        ==================================== */
        
        /* Large Desktop - Optimiert für große Bildschirme */
        @media (min-width: 1400px) {
            .nav-container {
                max-width: 1600px;
                padding: 0 2rem; /* Mehr Platz bei großen Bildschirmen */
            }
            
            .nav-left {
                gap: 1.8rem;
                padding-right: 2rem;
                margin-right: 180px; /* Mehr Logo-Platz */
            }
            
            .nav-right {
                gap: 1.8rem;
                padding-left: 2rem;
                margin-left: 180px; /* Mehr Logo-Platz */
            }
        }
        
        /* Tablet - Ultra-kompakt */
        @media (max-width: 1024px) {
            .nav-container {
                padding: 0 0.5rem; /* Minimales Container-Padding */
            }
            
            .nav-left {
                gap: 0.6rem;
                padding-right: 0.3rem;
                margin-right: 140px; /* Angepasst für Tablet */
            }
            
            .nav-right {
                gap: 0.6rem;
                padding-left: 0.3rem;
                margin-left: 140px; /* Angepasst für Tablet */
            }
            
            .nav-link {
                padding: 0.6rem 0.4rem; /* Sehr kompakte Links */
                font-size: 0.8rem;
            }
            
            .cta-link {
                padding: 0.7rem 0.6rem; /* Sehr kompakter CTA */
                font-size: 0.75rem;
            }
        }
        
        /* Mobile - Logo links, Hamburger rechts */
        @media (max-width: 768px) {
            .nav-container {
                display: flex;
                justify-content: space-between;
                height: 70px;
                padding: 0 0.75rem;
            }
            
            .nav-section {
                display: none;
            }
            
            .logo-center {
                position: static;
                transform: none;
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
        
        /* Smooth Scroll - VERBESSERT */
        html {
            scroll-behavior: smooth;
        }
        
        /* Smooth Scroll für alle Elemente aktivieren */
        * {
            scroll-behavior: smooth;
        }
        
        /* Scroll-Padding für bessere Anchor-Positionierung */
        html {
            scroll-padding-top: 100px; /* Berücksichtigt Header-Höhe */
        }
        
        /* Für noch smoothere Scrolls in modernen Browsern */
        @supports (scroll-behavior: smooth) {
            html {
                scroll-behavior: smooth;
            }
        }
        
        /* Performance Optimierungen */
        .centered-navigation {
            will-change: transform;
        }
        
        .nav-link, .cta-link, .brand-logo {
            will-change: transform;
        }
        
        /* Focus States für Accessibility - KEIN WEISSER RAND */
        .nav-link:focus,
        .cta-link:focus,
        .brand-logo:focus,
        .mobile-nav-link:focus,
        .mobile-cta-link:focus {
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
        }
        
        .mobile-toggle:focus {
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
        }
        
        /* Entfernt alle Standard-Outline Effekte */
        .nav-link,
        .cta-link,
        .brand-logo,
        .mobile-nav-link,
        .mobile-cta-link,
        .mobile-toggle {
            outline: none !important;
        }
        
        .nav-link:active,
        .cta-link:active,
        .brand-logo:active,
        .mobile-nav-link:active,
        .mobile-cta-link:active,
        .mobile-toggle:active {
            outline: none !important;
            box-shadow: none !important;
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

// Erweiterte Scroll-Funktionalität für Auto-Hide Header
let scrollTimeout;
let lastScrollY = 0;
let ticking = false;

window.addEventListener("scroll", function() {
    lastScrollY = window.scrollY;
    requestTick();
});

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

function updateHeader() {
    const header = document.querySelector(".header");
    if (!header) {
        ticking = false;
        return;
    }
    
    const currentScrollY = lastScrollY;
    const scrollDelta = currentScrollY - (window.previousScrollY || 0);
    
    // Header-Status basierend auf Scroll-Richtung und Position
    if (currentScrollY <= 50) {
        // Oben auf der Seite - Header immer sichtbar
        header.classList.remove("hidden", "scrolled");
        header.classList.add("visible");
    } else if (currentScrollY > 50) {
        // Nicht mehr ganz oben - "scrolled" Stil aktivieren
        header.classList.add("scrolled");
        
        if (scrollDelta > 5) {
            // Runterscrollen - Header verstecken
            header.classList.remove("visible");
            header.classList.add("hidden");
        } else if (scrollDelta < -5) {
            // Hochscrollen - Header zeigen
            header.classList.remove("hidden");
            header.classList.add("visible");
        }
    }
    
    // Scroll-Position für nächste Iteration speichern
    window.previousScrollY = currentScrollY;
    ticking = false;
}

// Initialisierung
document.addEventListener("DOMContentLoaded", function() {
    window.previousScrollY = window.scrollY;
});

// Debug Logging
console.log("🎯 Zentrierte Navigation geladen");
console.log("📱 Mobile-responsive aktiv");
console.log("✨ Premium Animationen aktiviert");
console.log("🔍 Erweiterte Link-Suche aktiviert");
console.log("🔄 Cross-Page Navigation aktiviert");
console.log("📜 Auto-Hide Header aktiviert");
console.log("🚫 Sidebar Killer DEAKTIVIERT - Blog-freundlich");