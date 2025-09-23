# Vercel Deployment Guide

## 🚀 Migration von Netlify zu Vercel

### 1. Vercel Setup

1. **Account erstellen**: https://vercel.com
2. **GitHub Repository verbinden**
3. **Import Project** auswählen

### 2. Environment Variables in Vercel

Folgende Environment Variables müssen in Vercel konfiguriert werden:

```env
# Database (Vercel Postgres)
DATABASE_URL=postgres://username:password@host:port/database

# NextAuth.js
NEXTAUTH_SECRET=your-secure-secret-key-minimum-32-characters
NEXTAUTH_URL=https://your-app.vercel.app

# Admin Setup
ADMIN_EMAIL=admin@osteoalsen.de
ADMIN_PASSWORD=secure-admin-password

# Environment
NODE_ENV=production
```

### 3. Vercel Postgres Database

1. **Storage Tab** in Vercel Dashboard
2. **Create Database** → **Postgres**
3. **Database Name**: `osteoalsen-db`
4. **Copy Connection String** zu Environment Variables

### 4. Database Migration

Nach dem ersten Deployment:

```bash
# In Vercel Dashboard Terminal oder lokal:
npx prisma db push
npm run db:seed
```

### 5. Build Configuration

Die `vercel.json` ist bereits konfiguriert:
- Build Command: `npm run build`
- Framework: Next.js
- API Function Timeout: 15 Sekunden
- Security Headers

### 6. Domain Setup

1. **Domains Tab** in Vercel
2. **Custom Domain** hinzufügen
3. **DNS Records** bei Ihrem Domain-Provider aktualisieren

### 7. Testing

Nach Deployment testen:
- Frontend: `https://your-app.vercel.app`
- Admin Login: `https://your-app.vercel.app/admin/login`
- API Health: `https://your-app.vercel.app/api/posts`

## 🔧 Lokale Entwicklung mit PostgreSQL

Für lokale Entwicklung können Sie Docker verwenden:

```bash
# PostgreSQL mit Docker
docker run --name postgres-dev -e POSTGRES_DB=osteoalsen -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

# DATABASE_URL in .env
DATABASE_URL="postgresql://admin:password@localhost:5432/osteoalsen"

# Prisma Migration
npx prisma db push
npm run db:seed
```

## 📝 Migration Checklist

- [x] PostgreSQL Schema Migration
- [x] NextAuth.js mit Prisma Integration
- [x] Vercel.json Konfiguration
- [x] Build Scripts Update
- [x] Environment Variables Dokumentation
- [ ] Domain DNS Update
- [ ] SSL Certificate Verification
- [ ] Admin Functionality Test
- [ ] Blog Performance Test

## 🚨 Wichtige Hinweise

1. **NEXTAUTH_SECRET**: Muss mindestens 32 Zeichen haben
2. **Database URL**: Vercel Postgres Connection String verwenden
3. **Admin Credentials**: Nach Deployment über Seed Script erstellen
4. **Old Netlify**: Erst nach erfolgreichem Vercel Deployment deaktivieren