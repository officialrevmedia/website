# Rev Media · AI Consulting & Implementation

Single-page site for Rev Media (BrandRev Media & Designs Inc.).

**Live:** [revmedia.ca](https://revmedia.ca)

## Positioning

AI-first. The primary offer is AI consulting and implementation (AI agents, workflow automation, MCP and systems integration, AI strategy and training). The creative studio (web design, SEO, marketing, brand) is the strong secondary offer. Two official partners are featured:

- [24hourwebsite.ca](https://24hourwebsite.ca) · web design and development, 24 hour builds
- [lunerasmart.com](https://www.lunerasmart.com) · AI-powered smart solutions for businesses and homes

## Stack

Plain HTML, CSS, and vanilla JavaScript. No build step. Single self-contained file. ~94KB.

- **Type:** Fraunces (variable serif) + Geist + Geist Mono via Google Fonts
- **Motion & effects:** scroll progress bar, hero parallax, live "REV OS" console with tilt, hero word reveal, Apple-style scroll-fill manifesto text, scroll-velocity-reactive marquee, cinematic image reveals with parallax, floating contact dock, reduced-motion safe
- **Imagery:** real portfolio work hotlinked from 24hourwebsite.ca plus Unsplash CDN photos; every below-the-fold image is lazy-loaded with explicit dimensions (no layout shift, fast first paint, tiny repo)

## SEO

Built to compete in Ontario AI / web / SEO search:

- Keyword-targeted title, meta description, and keywords
- Geo meta (region, placename, position, ICBM) for local search
- Structured data: Organization (ProfessionalService) + OfferCatalog, FAQPage, WebSite, BreadcrumbList JSON-LD
- "AI for every industry" section targeting "AI for [industry]" queries
- "Service Areas" section targeting "AI agency [city]" local queries (Hamilton, Burlington, Oakville, Toronto, GTA, etc.)
- Open Graph + Twitter cards with branded og-cover.jpg
- robots.txt allows major AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) for AI answer-engine visibility
- Image sitemap, humans.txt
- Full favicon set + web app manifest

## Lead capture

The audit form opens the visitor's email client pre-filled and addressed to info@revmedia.ca, then shows a confirmation state. Phone (tel:), WhatsApp, and mailto links appear throughout, plus a floating contact dock on scroll.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The site |
| `404.html` | Custom not-found page |
| `og-cover.jpg` | Social share image |
| `favicon.svg` / `favicon.ico` / `favicon-32.png` | Browser favicons |
| `apple-touch-icon.png` | iOS home-screen icon |
| `icon-192.png` / `icon-512.png` | PWA / Android icons |
| `site.webmanifest` | Web app manifest |
| `logo.svg` | Brand logo |
| `sitemap.xml` | Image sitemap |
| `robots.txt` | Crawl rules (AI-crawler friendly) |
| `humans.txt` | Credits |
| `CNAME` | Custom domain (revmedia.ca) |
| `.nojekyll` | Disables Jekyll on GitHub Pages |

## Deploy

Push all files to `main`, enable GitHub Pages on the repo Settings, point to root. Keep `.nojekyll` and `CNAME` in the root. Custom domain is handled by `CNAME`.

## Contact

- info@revmedia.ca
- 1 365 357 3006
- [@revmedia.ca](https://instagram.com/revmedia.ca)

---

© 2026 BrandRev Media & Designs Inc.
