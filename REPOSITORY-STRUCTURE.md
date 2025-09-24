# 📁 Repository Structure: Separate CMS Approach

## 🎯 Zwei unabhängige Repositories

### 1. 🌐 **osteoalsen-selfmade** (Hauptwebsite)
**Repository**: `shamanjii/osteoalsen-selfmade`
**Hosting**: Netlify (Static)
**Domain**: `www.osteoalsen.de`

```
├── src/app/(site)/          # Statische Seiten
├── posts/                   # Blog Markdown Files
├── public/assets/           # Bilder & Medien
├── netlify.toml            # Netlify Configuration
└── next.config.ts          # Static Export Config
```

### 2. ⚙️ **osteoalsen-cms** (Content Management)
**Repository**: `shamanjii/osteoalsen-cms` (zu erstellen)
**Hosting**: Vercel (SSR)
**Domain**: `cms.osteoalsen.de`

```
├── src/app/admin/          # Admin Dashboard
├── src/app/api/            # Database APIs
├── src/components/         # CMS Components
├── prisma/                 # Database Schema
└── vercel.json            # Vercel Configuration
```

---

## 🚀 **Setup Instructions**

### Schritt 1: CMS Repository erstellen

```bash
# CMS Repository ist fertig vorbereitet in:
/tmp/osteoalsen-cms/

# 1. Neues GitHub Repository erstellen:
#    Name: "osteoalsen-cms"
#    Private: Yes (empfohlen für CMS)

# 2. CMS zu GitHub pushen:
cd /tmp/osteoalsen-cms
git remote add origin https://github.com/shamanjii/osteoalsen-cms.git
git push -u origin main
```

### Schritt 2: Vercel Deployment

```bash
# Option A: Vercel CLI
npm i -g vercel
cd /tmp/osteoalsen-cms
vercel --prod

# Option B: Vercel Dashboard
# 1. Import Git Repository → osteoalsen-cms
# 2. Framework: Next.js
# 3. Domain: cms.osteoalsen.de
```

### Schritt 3: Main Repository bereinigen

```bash
# Hauptprojekt ist bereits bereinigt:
# ✅ CMS-Ordner entfernt
# ✅ Static Export aktiviert
# ✅ Netlify-Konfiguration optimiert
```

---

## 🎯 **Vorteile dieser Struktur**

### ✅ **Saubere Trennung**
- **Frontend**: Nur statische Website-Dateien
- **Backend**: Nur CMS & Admin-Funktionen
- **Keine Vermischung** von Abhängigkeiten

### ✅ **Optimale Performance**
- **Netlify**: Ultra-schnell für statische Inhalte
- **Vercel**: Perfekt für SSR & Database-Features
- **Keine Kompromisse** bei der Performance

### ✅ **Deployment-Effizienz**
- **Kleinere Repositories** = Schnellere Builds
- **Fokussierte Dependencies** = Weniger Ballast
- **Independent Releases** = Mehr Flexibilität

### ✅ **Wartung & Skalierung**
- **Klare Zuständigkeiten** pro Repository
- **Separate Versionierung** möglich
- **Team-Arbeit** einfacher (Frontend vs. Backend)

---

## 🔗 **Integration Between Repositories**

### Content Workflow:
```
CMS (osteoalsen-cms) → GitHub API → Main Repo → Netlify Rebuild
```

1. **Admin schreibt Post** in CMS
2. **CMS speichert** in Database
3. **Webhook triggert** Markdown-Export
4. **Main Repository** wird aktualisiert
5. **Netlify rebuildet** automatisch

### Alternative: File-based Integration:
- CMS schreibt direkt in shared Markdown-Ordner
- Beide Repositories lesen/schreiben gleiche Files
- Git Submodule für shared Content-Ordner

---

## 📋 **Next Steps**

1. ✅ **CMS Repository erstellen** (bereit in `/tmp/osteoalsen-cms/`)
2. ⏳ **GitHub Repository anlegen** → `osteoalsen-cms`
3. ⏳ **Vercel Import & Deploy**
4. ⏳ **Domain DNS konfigurieren** → `cms.osteoalsen.de`
5. ⏳ **Database & Admin-User einrichten**

**Perfekte Lösung für Ihre Anforderungen!** 🎉