# Rev Media · Coming Soon

Single-page launch site for Rev Media (BrandRev Media & Designs Inc.).

**Live:** [revmedia.ca](https://revmedia.ca) · **Launching:** June 1, 2026

## Stack

Plain HTML, CSS, and vanilla JavaScript. No build step. Single self-contained file.

- **Type:** Fraunces (variable serif) + Geist + Geist Mono via Google Fonts
- **Logo:** embedded as base64 PNG (footer) + inline SVG (nav, favicon)
- **Animation:** scroll-linked 3D parallax, mouse-driven tilt, IntersectionObserver reveals, text scramble
- **SEO:** OG tags, Twitter card, Schema.org Organization JSON-LD, sitemap, robots.txt
- **Forms:** mailto fallback today, auto-detects HTTPS endpoints once wired

## Deploy

Push to `main`, enable GitHub Pages on the repo Settings, point to root. Custom domain handled via the included `CNAME` file.

## Form backend

Both forms (`signup`, `contact`) ship with `action="mailto:info@revmedia.ca"`. To swap in a real endpoint:

1. Sign up for [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
2. Replace each form's `action` attribute with the HTTPS URL
3. The JS automatically routes via `fetch()` instead of mailto when it sees `https://`

## Contact

- info@revmedia.ca
- 1.365.357.3006
- [@revmedia.ca](https://instagram.com/revmedia.ca)

---

© 2026 BrandRev Media & Designs Inc.
