# Osteoalsen CMS

Content Management System für die Osteoalsen Website.

## Setup für Vercel

### 1. Vercel Projekt erstellen
```bash
# CMS-Projekt zu Vercel deployen
vercel --prod
```

### 2. Environment Variables
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=https://cms.osteoalsen.de
ADMIN_EMAIL=admin@osteoalsen.de
ADMIN_PASSWORD=secure-password
```

### 3. Database Setup
```bash
npm run db:push
npm run db:seed
```

### 4. Domain Configuration
- **Vercel**: `cms.osteoalsen.de`
- **DNS**: CNAME Record `cms` → `cname.vercel-dns.com`

## Local Development
```bash
npm install
npm run dev
```

## Features
- ✅ Admin Authentication
- ✅ Blog Post Management
- ✅ Categories & Tags
- ✅ Markdown Editor
- ✅ SEO Meta Fields
- ✅ Image Upload
- ✅ Content Preview

## Deployment
Das CMS läuft komplett separat auf Vercel und verwaltet Markdown-Files, die vom Hauptprojekt auf Netlify gelesen werden.