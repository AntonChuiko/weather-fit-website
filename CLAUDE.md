# Weather Fit Website

Marketing website for the Weather Fit iOS app (weatherfit.com), hosted on GitHub Pages from the `master` branch.

## Git workflow

- **Never commit automatically.** Wait for the user to explicitly say to commit before running `git commit`. Do not stage files or propose commit messages unprompted.
- Active development branch: `redesign`, being prepared for release to `master`. The critical sub-pages have all been rebuilt (privacy-policy, terms-and-conditions, faq, press-kit, 404, and the `de`/`zh-Hans` localized homepages).
- The live site serves from `master` — changes there deploy immediately to weatherfit.com.

## Testing

- **Never run or test pages.** Do not start dev servers (`python3 -m http.server`, `npx serve`, etc.), launch headless browsers, take screenshots, or attempt to drive the page. The user tests everything manually in their own browser and reports back.
- Do not invoke the `run` or `verify` skills for this project.
- When you finish a change, describe what you did and stop — let the user verify visually.

## Project structure

- `index.html` — homepage; full multi-section page (hero, problem→promise, how-it-works, core features, widgets & lock screen, Apple Watch, FAQ, final CTA).
- `privacy-policy.html`, `terms-and-conditions.html`, `faq.html`, `press-kit.html`, `404.html` — standalone pages
- `de/`, `zh-Hans/` — localized homepages (AI-translated, not human-reviewed)
- `css/styles.css` — single tokenized stylesheet; all design tokens are CSS custom properties on `:root`
- `js/site.js` — vanilla JS: sticky-header state, scroll-reveal animations, FAQ accordion, testimonials marquee, and the Mixpanel click tracker
- `images/` — active assets for the new site
- `files/` — downloadable assets (e.g. `WeatherFit-PressKit.zip`)
- `support/` — chrome-less in-app contact form loaded by the iOS app's WKWebView at `weatherfit.com/support/`; reuses the global `css/styles.css` (form styles in the "Support form" section); analytics-free, `noindex`
- `_config.yml` — Jekyll config; `exclude:` list keeps dev-only files (e.g. `CLAUDE.md`) out of the published site
- SEO/meta: `sitemap.xml`, `robots.txt`, `llms.txt`, `app-ads.txt`, `CNAME`

## Tech stack

Pure static HTML/CSS/JS — no framework, no jQuery, no local build step. GitHub Pages serves it through its default Jekyll build, configured by `_config.yml` (used only to exclude dev files from the published site).

## Skills

- Always invoke the `frontend-design` skill (https://claude.com/plugins/frontend-design) before doing any HTML/CSS/JS work on this site.

## Design

- Mobile-first; two breakpoints only: `768px` and `1024px`
- Flighty-inspired: clean white, near-black text, iOS system blue accent (`#007AFF`), sunshine warm accent (`#FFB341`)
- Typography: SF Pro system stack via `-apple-system, BlinkMacSystemFont`
- Fluid type using `clamp()`; spacing via CSS custom properties

## Analytics

Click events use `data-tracker="ACTION|LABEL"` attributes routed through `js/site.js` to Mixpanel. The homepage also loads Google Analytics (gtag) and a PromptWatch snippet; the `support/` form is analytics-free.
