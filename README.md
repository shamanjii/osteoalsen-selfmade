# Osteopathie Hamburg - Joshua Alsen

A modern, high-performance osteopathy practice website built with Next.js 15, featuring static site generation, comprehensive SEO optimization, and integrated analytics.

## Tech Stack

- **Framework**: Next.js 16 (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter (MDX-like processing)
- **Analytics**: PostHog
- **Deployment**: GitHub Pages & Vercel

## Key Features

- Static site generation for optimal performance
- SEO-optimized with structured data (JSON-LD)
- Blog system with categories, tags, and RSS feed
- Dynamic treatment pages with medical condition schemas
- Integrated booking system (Terminbuchung)
- Voiceflow chatbot integration
- Reading progress bars and table of contents
- Comprehensive error boundaries
- Web vitals tracking

## Getting Started

### Prerequisites

- Node.js >= 20.18.0
- npm >= 10.8.0

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

Generates a static export in the `out/` directory.

### Production Server

```bash
npm start
```

Serves the static build using `serve`.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (site)/            # Main site layout group
│   ├── behandlungen/      # Treatment pages
│   ├── blog/              # Blog system
│   └── terminbuchung/     # Booking page
├── components/            # Reusable React components
├── lib/                   # Utility functions & configs
└── data/                  # Static data files
```

## Configuration

The site supports dual deployment modes:

- **GitHub Pages**: Set `GITHUB_PAGES=true` for basePath `/osteoalsen-selfmade`
- **Vercel/Custom**: Default deployment without basePath

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build static export
- `npm start` - Serve production build
- `npm run lint` - Run ESLint
- `npm run analytics:posthog` - PostHog analytics utilities

## Deployment

The site is configured for static export and can be deployed to:

- GitHub Pages (automatic via GitHub Actions)
- Vercel
- Any static hosting provider

## License

Private - All rights reserved
