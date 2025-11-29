# Osteopathie Hamburg - Joshua Alsen

Modern, SEO-optimized website for osteopathy practice in Hamburg-Rotherbaum & Eimsbüttel.

## 🚀 Tech Stack

- **Framework**: Next.js 13.5.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Fonts**: Epilogue, Instrument Sans (Google Fonts)
- **CMS**: Strapi (Headless CMS for blog)
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## 🏗️ Architecture

This project uses a **hybrid architecture** combining the benefits of a one-page website with detailed SEO-optimized subpages:

- **Homepage**: One-pager with quick overview and smooth scrolling
- **Treatment Pages**: Deep-dive pages for each treatment category (SEO-focused)
- **Blog**: Dynamic blog posts from Strapi CMS
- **Legal Pages**: Impressum & Datenschutz

### Why Hybrid?

1. **UX**: One-pager provides quick overview for returning visitors
2. **SEO**: Detailed subpages rank for specific treatment keywords
3. **Best of Both**: Combines user-friendliness with search engine visibility

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (site)/                # Main site layout group
│   │   ├── components/        # Site-specific components
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Treatments.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Location.tsx
│   │   │   └── CTA.tsx
│   │   ├── page.tsx           # Homepage
│   │   └── layout.tsx
│   ├── behandlungen/          # Treatment pages
│   │   ├── components/        # Reusable treatment components
│   │   │   ├── TreatmentHero.tsx
│   │   │   ├── TreatmentCard.tsx
│   │   │   └── TreatmentCTA.tsx
│   │   ├── page.tsx           # Treatments overview
│   │   ├── rueckenschmerzen/
│   │   ├── kopfschmerzen-migraene/
│   │   ├── verdauungsbeschwerden/
│   │   ├── sportverletzungen/
│   │   ├── stress-burnout/
│   │   ├── schwangerschaft/
│   │   └── loading.tsx        # Loading skeleton
│   ├── blog/                  # Blog section
│   │   ├── [slug]/           # Dynamic blog post pages
│   │   ├── page.tsx          # Blog overview
│   │   └── loading.tsx
│   ├── terminbuchung/        # Booking page
│   ├── impressum/            # Legal: Imprint
│   ├── datenschutz/          # Legal: Privacy Policy
│   ├── layout.tsx            # Root layout
│   ├── loading.tsx           # Global loading state
│   ├── not-found.tsx         # Custom 404 page
│   └── globals.css
├── components/               # Shared components
│   ├── Breadcrumbs.tsx
│   ├── DropdownMenu.tsx
│   ├── FloatingBookingButton.tsx
│   ├── ErrorBoundary.tsx
│   ├── StructuredData.tsx
│   ├── MedicalConditionSchema.tsx
│   ├── FAQSchema.tsx
│   └── Analytics.tsx
├── lib/                      # Utility functions
│   ├── strapi.ts            # Strapi API client
│   └── utils.ts
└── types/                    # TypeScript types
    └── blog.ts

public/
├── assets/                   # Images and media
│   ├── joshua-alsen-profil.webp
│   ├── joshua-alsen-osteopath-hamburg-og.webp
│   ├── joshua-alsen-osteopath-hamburg-twitter.webp
│   └── ...
├── sitemap.xml              # SEO sitemap
├── robots.txt               # Search engine directives
└── favicon.ico

posts/                       # Markdown blog posts (optional)
```

## 🎯 Key Features

### SEO Optimization

- ✅ **Meta Tags**: Optimized title, description, keywords for all pages
- ✅ **Open Graph**: Social media preview images and metadata
- ✅ **Twitter Cards**: Optimized Twitter sharing
- ✅ **Structured Data**: Schema.org markup (LocalBusiness, MedicalCondition, FAQ)
- ✅ **Canonical URLs**: Prevent duplicate content issues
- ✅ **Sitemap.xml**: Complete site structure for search engines
- ✅ **Robots.txt**: Optimized crawling directives
- ✅ **Breadcrumbs**: Navigation and SEO benefits

### Treatment Pages

6 detailed treatment pages (1000-1500 words each):
1. **Rückenschmerzen** - Back pain, disc problems, ISG blockages
2. **Kopfschmerzen & Migräne** - Headaches, migraines, CMD/TMJ
3. **Verdauungsbeschwerden** - Digestive issues, IBS, visceral osteopathy
4. **Sportverletzungen** - Sports injuries, strains, prevention
5. **Stress & Burnout** - Stress-related issues, nervous system regulation
6. **Schwangerschaft** - Pregnancy and postpartum care

Each page includes:
- Problem description and causes
- Osteopathic approach
- Treatment process
- Success outlook and duration
- FAQ section with details
- Related treatments
- CTA for booking

### Navigation

- **Desktop**: Hover dropdown menu for treatments
- **Mobile**: Accordion-style expanded menu
- **Floating Button**: Always-visible booking button
- **Smooth Scrolling**: One-pager sections with anchor links

### Performance

- **Force Dynamic Rendering**: Ensures fresh content from CMS
- **Image Optimization**: Next.js Image component with WebP
- **Loading States**: Skeleton screens for better perceived performance
- **Lazy Loading**: Components load on demand
- **Font Optimization**: Google Fonts with swap display

### Analytics & Tracking

- Google Analytics 4 (G-8E63RJG34K)
- Cookie-free tracking option
- GDPR-compliant implementation

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/shamanjii/osteoalsen-selfmade.git
cd osteoalsen-selfmade

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values
```

### Environment Variables

Create a `.env` file with:

```bash
# Strapi CMS
NEXT_PUBLIC_STRAPI_API_URL=https://cms.osteoalsen.de

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8E63RJG34K
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (automatic via Git push)
git push origin main
```

## 📝 Content Management

### Blog Posts

Add new blog posts via Strapi CMS at `https://cms.osteoalsen.de/admin`

Or add markdown files to `./posts/` directory (fallback method):

```markdown
---
title: "Post Title"
excerpt: "Short description"
date: "2025-01-15"
author: "Joshua Alsen"
image: "/assets/blog/post-image.webp"
---

Post content here...
```

### Adding New Treatment Pages

1. Create new directory in `src/app/behandlungen/`
2. Add `page.tsx` with metadata and content
3. Use `TreatmentHero`, `TreatmentCTA` components
4. Add `MedicalConditionSchema` for SEO
5. Update navigation in `SiteHeader.tsx`
6. Add to `sitemap.xml`

## 🎨 Design System

### Typography

- **Headings**: Epilogue (Bold, 700-800)
- **Body**: Instrument Sans (Regular, 400-600)
- **Accent**: Epilogue (Medium, 500-600)

### Colors

```css
/* Primary */
--slate-900: #0f172a  /* Headlines, primary text */
--slate-700: #334155  /* Secondary text */
--slate-600: #475569  /* Tertiary text */

/* Backgrounds */
--slate-50: #f8fafc   /* Light background */
--slate-100: #f1f5f9  /* Card backgrounds */
--white: #ffffff      /* Main background */

/* Accents */
--blue-600: #2563eb   /* Links, CTAs */
--blue-50: #eff6ff    /* Highlights */
```

### Spacing

- Container: `max-w-7xl` (1280px)
- Section padding: `py-16` (64px)
- Grid gap: `gap-6` or `gap-8`

## 📊 SEO Performance

### Current Optimization

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Alt text for all images
- ✅ Internal linking strategy
- ✅ Mobile-responsive design
- ✅ Fast loading times (Vercel Edge Network)
- ✅ HTTPS enabled
- ✅ Structured data for rich snippets

### Sitemap Structure

```
Priority 1.0: Homepage
Priority 0.9: Behandlungen overview
Priority 0.8: Individual treatment pages
Priority 0.7: Blog posts
Priority 0.5: Booking page
Priority 0.3: Legal pages
```

## 🔐 Legal & Privacy

- **Impressum**: `/impressum` (German legal imprint)
- **Datenschutz**: `/datenschutz` (GDPR privacy policy)
- Both pages are `noindex, nofollow`
- Contact: joshua@alsen.info

## 🤝 Contact & Support

**Joshua Alsen - Osteopath & Heilpraktiker**

- 📍 Rappstraße 7, 20146 Hamburg-Rotherbaum
- 📞 +49 176 4399 0001
- ✉️ joshua@alsen.info
- 🌐 www.osteoalsen.de

## 📄 License

Private project - All rights reserved

---

Built with ❤️ in Hamburg | Powered by Next.js & Vercel
# Cache invalidation trigger Sa 29 Nov 2025 20:35:42 CET
