# 🚀 Hybrid Setup: Static Site + Separate CMS

Elegante Lösung für beste Performance und einfache Verwaltung.

## 📋 Architektur-Übersicht

```
┌─────────────────────────────────────────┐
│                                         │
│  🌐 www.osteoalsen.de (Netlify)         │
│  ├── Statische Website                  │
│  ├── Blog-Anzeige (aus Markdown)        │
│  ├── Optimale Performance               │
│  └── SEO-optimiert                      │
│                                         │
└─────────────────────────────────────────┘
                    │
                    │ Redirects für /admin/*
                    │
┌─────────────────────────────────────────┐
│                                         │
│  ⚙️ cms.osteoalsen.de (Vercel)          │
│  ├── Admin-Dashboard                    │
│  ├── Blog-Verwaltung                    │
│  ├── Database & Authentication          │
│  └── Content-Bearbeitung                │
│                                         │
└─────────────────────────────────────────┘
```

## 🛠️ Setup-Schritte

### 1. Hauptseite (Netlify) - bereits konfiguriert
✅ Static Export aktiviert
✅ CMS-Abhängigkeiten entfernt
✅ Redirects zu CMS-Subdomain eingerichtet
✅ Performance-Optimierungen

### 2. CMS-Subdomain (Vercel)
📁 **Separates Repository**: `osteoalsen-cms`
🔐 **Features**: Admin-Login, Blog-Management, Database
🛡️ **Sicherheit**: noindex, nofollow, Access Control

### 3. Domain-Konfiguration (DNS)

#### Bei Ihrem Domain-Provider:
```dns
# CNAME Records hinzufügen:
cms.osteoalsen.de → cname.vercel-dns.com
```

#### Vercel Dashboard:
1. **Domains** → **Add Domain**
2. **Domain**: `cms.osteoalsen.de`
3. **SSL Certificate**: Automatisch

### 4. Deployment-Reihenfolge

#### A) CMS Repository erstellen & zu Vercel deployen:

**Schritt 1: Repository zu GitHub pushen**
```bash
# CMS ist bereit in /tmp/osteoalsen-cms/
cd /tmp/osteoalsen-cms
# Erstellen Sie ein neues GitHub Repository: "osteoalsen-cms"
git remote add origin https://github.com/IHR-USERNAME/osteoalsen-cms.git
git push -u origin main
```

**Schritt 2: Vercel Import**
1. **Vercel Dashboard** → **New Project**
2. **Import Git Repository** → `osteoalsen-cms`
3. **Root Directory**: `.` (Root)
4. **Framework Preset**: Next.js

#### B) Environment Variables in Vercel:
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=https://cms.osteoalsen.de
ADMIN_EMAIL=admin@osteoalsen.de
ADMIN_PASSWORD=secure-password
```

#### C) Database Setup:
```bash
# In Vercel Terminal oder lokal:
npm run db:push
npm run db:seed
```

#### D) Hauptseite zu Netlify deployen:
```bash
# Hauptprojekt bleibt auf Netlify
git push origin main
```

## 🎯 Vorteile dieser Lösung

### ✅ Performance
- **Hauptseite**: Blitzschnell (statisch)
- **CMS**: Nur für Admins, Performance weniger kritisch

### ✅ SEO
- **Hauptseite**: Optimale Indexierung
- **CMS**: Explizit ausgeschlossen (noindex)

### ✅ Wartung
- **Getrennte Deployments**: Unabhängige Updates
- **Saubere Trennung**: Frontend/Backend klar separiert

### ✅ Kosten
- **Netlify**: Kostenlos für statische Sites
- **Vercel**: Nur für CMS-Traffic

## 🔗 URL-Struktur

| URL | Hosting | Zweck |
|-----|---------|--------|
| `osteoalsen.de` | Netlify | Hauptwebsite |
| `osteoalsen.de/blog` | Netlify | Blog-Anzeige |
| `osteoalsen.de/admin` | → Redirect | Weiterleitung zu CMS |
| `cms.osteoalsen.de` | Vercel | Admin-Dashboard |
| `cms.osteoalsen.de/api/*` | Vercel | CMS-APIs |

## 🚀 Nächste Schritte

1. **CMS zu Vercel deployen** (separates Repository empfohlen)
2. **DNS CNAME** für cms.osteoalsen.de erstellen
3. **Environment Variables** in Vercel konfigurieren
4. **Database & Admin-User** einrichten
5. **Hauptseite** zu Netlify static deployen

Perfekte Lösung für Ihre Anforderungen! 🎉