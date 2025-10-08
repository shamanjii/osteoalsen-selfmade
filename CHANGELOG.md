# Changelog

All notable changes to the Osteopathie Hamburg website project.

## [2.0.0] - 2025-01-08

### 🎯 Major Refactor: Hybrid Architecture Implementation

Transformed the website from a pure one-pager to a hybrid architecture combining quick-access homepage with deep-dive SEO-optimized treatment pages.

### ✨ Added

#### Phase 1: Treatment Pages Foundation
- **Treatment Section Structure**
  - Created `/behandlungen/` directory with 6 treatment subdirectories
  - Built reusable components: `TreatmentHero`, `TreatmentCard`, `TreatmentCTA`
  - Created `Breadcrumbs` component for navigation

- **6 Detailed Treatment Pages** (1000-1500 words each)
  - `/behandlungen/rueckenschmerzen` - Back pain treatment
  - `/behandlungen/kopfschmerzen-migraene` - Headaches & migraines
  - `/behandlungen/verdauungsbeschwerden` - Digestive issues
  - `/behandlungen/sportverletzungen` - Sports injuries
  - `/behandlungen/stress-burnout` - Stress & burnout
  - `/behandlungen/schwangerschaft` - Pregnancy & postpartum

- **Behandlungen Overview Page**
  - Grid layout showing all 6 treatment categories
  - USP section highlighting qualifications
  - FAQ section with common questions
  - CTA section for booking

#### Phase 2: Navigation & SEO Infrastructure
- **Navigation Improvements**
  - Created `DropdownMenu` component for desktop (hover-triggered)
  - Updated mobile navigation with accordion-style treatment menu
  - Added treatment links to all navigation contexts

- **SEO Foundation**
  - Updated `sitemap.xml` with all new pages and correct priorities
  - Optimized `robots.txt` with explicit allow/disallow rules
  - Created `MedicalConditionSchema` component for structured data

#### Phase 3: Complete SEO Implementation
- **Structured Data**
  - Added `MedicalCondition` schema to all 6 treatment pages
  - Unique symptoms and treatment descriptions per page
  - Proper JSON-LD format for search engines

- **Robots.txt Optimization**
  - Explicit allow rules for `/behandlungen/*` and `/blog/*`
  - Disallow legal pages (impressum, datenschutz)
  - Disallow technical paths (_next, api, admin)
  - Specific bot instructions for Googlebot and Bingbot

#### Phase 4: Quick Wins
- **FAQ Schema**
  - Created `FAQSchema` component
  - Added FAQ structured data to behandlungen overview
  - 5 common questions about treatments, costs, insurance

- **Custom 404 Page**
  - Enhanced `/not-found.tsx` with better UX
  - Large 404 number with Epilogue font
  - Quick links to popular pages
  - Contact information display
  - Responsive mobile layout

- **OpenGraph & Social Media**
  - Added OpenGraph metadata to all treatment pages
  - Added Twitter Card metadata for better sharing
  - Used existing OG images (1200x630) and Twitter images
  - Consistent metadata structure across all pages

- **Loading States**
  - Created root `loading.tsx` with animated spinner
  - Created `behandlungen/loading.tsx` with skeleton layout
  - Created `blog/loading.tsx` with grid skeleton
  - Improved perceived performance

- **Comprehensive Documentation**
  - Updated `README.md` with full project documentation
  - Added architecture explanation
  - Documented all features and components
  - Added setup and deployment instructions
  - Created design system documentation
  - Created `CHANGELOG.md` for version tracking

### 🔄 Changed

- **Homepage Treatment Section**
  - Refactored from 3 osteopathy types to 6 treatment categories
  - Changed from info cards to clickable cards with CTAs
  - Added icons for visual appeal
  - Linked all cards to detailed treatment pages

- **Navigation Structure**
  - Changed "Behandlungen" from anchor link to dropdown menu (desktop)
  - Expanded mobile menu to show all treatment options
  - Improved hover states and transitions

### 📦 Components Added

**Reusable Components:**
- `TreatmentHero.tsx` - Hero section for treatment pages
- `TreatmentCard.tsx` - Card component for treatment grid
- `TreatmentCTA.tsx` - Call-to-action with booking buttons
- `Breadcrumbs.tsx` - Navigation breadcrumbs
- `DropdownMenu.tsx` - Desktop dropdown navigation
- `MedicalConditionSchema.tsx` - Structured data for medical conditions
- `FAQSchema.tsx` - Structured data for FAQ pages

**Loading Components:**
- `app/loading.tsx` - Global loading state
- `app/behandlungen/loading.tsx` - Treatment section skeleton
- `app/blog/loading.tsx` - Blog grid skeleton

### 🎨 Design Improvements

- Consistent use of Epilogue font for headings
- Improved hover states and transitions
- Better mobile responsiveness
- Enhanced visual hierarchy
- Professional 404 error page

### 📈 SEO Improvements

- **Meta Tags**: Optimized for all treatment pages
- **Structured Data**: MedicalCondition + FAQ schemas
- **Sitemap**: Updated with all new pages
- **Robots.txt**: Optimized crawling directives
- **OpenGraph**: Social media preview optimization
- **Internal Linking**: Cross-linking between treatment pages

### 🔧 Technical Improvements

- Better TypeScript types for treatment data
- Reusable component architecture
- Consistent file structure
- Improved code organization
- Loading states for better UX

---

## [1.1.0] - 2024-09-26

### Added
- Legal pages: Impressum and Datenschutz
- Footer links to legal pages
- Google Analytics 4 integration (G-8E63RJG34K)

### Changed
- Updated contact email to joshua@alsen.info
- Updated contact information in root layout:
  - Phone: +49 176 4399 0001
  - Email: joshua@alsen.info
  - Address: Rappstraße 7, 20146 Hamburg

---

## [1.0.0] - Initial Release

### Features
- **One-Page Website** with smooth scrolling
- **Sections**: Hero, About, Treatments, Process, Pricing, Location, CTA
- **Blog Integration** with Strapi CMS
- **Responsive Design** with Tailwind CSS
- **SEO Optimization** with meta tags and structured data
- **Google Fonts**: Epilogue & Instrument Sans
- **Floating Booking Button**
- **Error Boundary** for error handling
- **Vercel Deployment** with automatic builds

### Components
- SiteHeader with navigation
- SiteFooter with contact info
- Hero section with CTA
- About section with profile
- Treatments overview
- Process steps
- Pricing information
- Location with embedded map
- Blog post grid
- Blog post detail pages

### Technical
- Next.js 13.5.7 (App Router)
- TypeScript
- Tailwind CSS 3.4
- Strapi CMS integration
- Force dynamic rendering
- Image optimization
- Font optimization

---

**Note**: Version numbers follow [Semantic Versioning](https://semver.org/).
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality additions
- PATCH version for backwards-compatible bug fixes
