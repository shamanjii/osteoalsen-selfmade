# 📝 Blog-Management Setup Guide

## 🎯 Übersicht
Ihr Blog verfügt jetzt über ein professionelles Content Management System (Decap CMS) mit GitHub-Integration.

## 🚀 Produktions-Setup (Einmalig)

### 1. Netlify Account erstellen
1. Gehen Sie zu [netlify.com](https://netlify.com)
2. Registrieren Sie sich mit Ihrem GitHub-Account
3. Verknüpfen Sie Ihr Repository

### 2. Netlify Site einrichten
```bash
# In Netlify Dashboard:
1. "New site from Git" → GitHub → osteoalsen-selfmade
2. Build command: npm run build
3. Publish directory: .next
4. Deploy site
```

### 3. Identity & Git Gateway aktivieren
```bash
# In Netlify Site Settings:
1. Identity → Enable Identity
2. Registration → Invite only (Sicherheit)
3. Git Gateway → Enable Git Gateway
4. Services → Git Gateway → Enable
```

### 4. Admin-Benutzer hinzufügen
```bash
# In Netlify Identity:
1. Identity → Invite users
2. Ihre E-Mail-Adresse eingeben
3. E-Mail-Bestätigung abwarten
4. Passwort festlegen
```

### 5. GitHub Secrets konfigurieren
```bash
# In GitHub Repository Settings → Secrets:
NETLIFY_AUTH_TOKEN: [Ihr Netlify Personal Access Token]
NETLIFY_SITE_ID: [Ihre Netlify Site ID]
```

## ✍️ Artikel erstellen (Nach Setup)

### Online-Editor verwenden
1. Gehen Sie zu `https://ihre-domain.de/admin/`
2. Melden Sie sich mit Netlify Identity an
3. Klicken Sie "New Blog Artikel"
4. Artikel schreiben und veröffentlichen

### Lokale Entwicklung
```bash
# Terminal öffnen:
npm run dev

# Admin-Interface öffnen:
http://localhost:3000/admin/

# Für lokales CMS (ohne GitHub):
npx @decapctl/decap-server
```

## 📁 Artikel-Struktur

### Pflichtfelder
- **Titel**: Hauptüberschrift des Artikels
- **Kurzbeschreibung**: SEO-optimierte Zusammenfassung
- **Datum**: Veröffentlichungsdatum
- **Status**: Draft oder Published
- **Kategorie**: Automatische Blog-Filterung

### Optionale Felder
- **Schlüsselwörter**: SEO-Keywords (Array)
- **Artikelbild**: Hauptbild mit Alt-Text
- **Inhalt**: Markdown-formatierter Text

### Beispiel-Artikel
```markdown
---
title: "Kopfschmerzen natürlich behandeln"
excerpt: "Osteopathische Ansätze bei Spannungskopfschmerzen"
date: "2025-01-20"
keywords: ["Kopfschmerzen", "Osteopathie", "Behandlung"]
category: "kopfschmerzen"
status: "published"
---

# Ihr Artikel-Inhalt...
```

## 🔧 Erweiterte Features

### Kategorien verfügbar
- `osteopathie`: Allgemeine osteopathische Themen
- `rueckenschmerzen`: Rücken- und Wirbelsäulenprobleme
- `kopfschmerzen`: Kopfschmerz- und Migränebehandlung
- `sportverletzungen`: Sportverletzungen und Rehabilitation
- `gesundheitstipps`: Präventive Gesundheitstipps

### SEO-Optimierung
- Automatische Meta-Descriptions
- Strukturierte Daten für Google
- Optimierte URLs (Slug-Generation)
- Keyword-Integration in Blog-Filter

### Media-Management
- Bilder per Drag & Drop hochladen
- Automatische Komprimierung
- Alt-Text für Accessibility
- Responsive Bildgrößen

## 🛠️ Troubleshooting

### Admin-Interface lädt nicht
```bash
# Netlify Identity prüfen:
1. Netlify → Identity → Settings
2. Git Gateway aktiviert?
3. Benutzer eingeladen und bestätigt?
```

### Artikel erscheinen nicht im Blog
```bash
# Status prüfen:
1. Artikel-Status = "published"?
2. Datum in der Vergangenheit?
3. Build-Prozess erfolgreich?
```

### Lokale Entwicklung Probleme
```bash
# Dependencies neu installieren:
npm ci
npm run dev

# Admin-Server starten:
npx @decapctl/decap-server
```

## 📞 Support
Bei Fragen zum Blog-System:
- Dokumentation: [decapcms.org](https://decapcms.org)
- Issues: GitHub Repository Issues
- E-Mail: Ihr Entwickler

---

**🎉 Viel Erfolg beim Bloggen!**