# revmedia.ca

The Rev Media website (BrandRev Media & Designs Inc.). Plain HTML, CSS and JavaScript, hosted on GitHub Pages. Every page is pre-rendered: the full content is in the HTML that Google receives, with no build step and no framework.

## Upload

1. Open the GitHub repository that publishes revmedia.ca and choose **Add file > Upload files**.
2. Drag in everything from this folder, including the `assets` folder and the hidden `.nojekyll` file (on a Mac, press Cmd + Shift + . in Finder to show hidden files).
3. Commit to `main`. GitHub Pages republishes within a minute or two.

`CNAME` keeps the custom domain set to `revmedia.ca`.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home |
| `/services/` | All services |
| `/ai-agents/` | AI Agents & Assistants |
| `/workflow-automation/` | Workflow Automation |
| `/ai-integration/` | Systems & MCP Integration |
| `/ai-strategy/` | AI Strategy & Training |
| `/web-design/` | Web Design & Development |
| `/seo/` | SEO & Search |
| `/brand-and-marketing/` | Brand & Marketing |
| `/industries/` | Industries |
| `/work/` | Selected work |
| `/service-areas/` | Service areas |
| `/partners/` | 24 Hour Website and Lunera Smart |
| `/faq/` | FAQ |
| `/contact/` | Free AI audit form |
| `/privacy/` | Privacy policy |
| `/thank-you/` | Form confirmation (not indexed) |
| `404.html` | Custom not-found page (not indexed) |

## Forms

The audit forms on `/` and `/contact/` send to **info@revmedia.ca** through FormSubmit. The first submission triggers a one-time "Activate Form" email to info@revmedia.ca. Click it once, then test again. If a send ever fails, the form shows the phone number and email instead so no lead is lost.

## Google Analytics

Open `analytics.js`, paste your GA4 Measurement ID (starts with `G-`) between the quotes, and upload that one file. Leave it empty and nothing loads. Events sent: `generate_lead` (form sent), `click_call`, `click_email`, `click_whatsapp`.

## SEO built in

Unique title and meta description on every page, one H1 per page, canonical tags, Open Graph and Twitter images, breadcrumbs (visible and in schema), Organization, WebSite, Service, FAQPage and BreadcrumbList structured data, `sitemap.xml`, `robots.txt` open to Google and AI crawlers, WebP images with alt text and fixed dimensions, self-hosted fonts, and no redirect chains (all internal links use the final URL).
