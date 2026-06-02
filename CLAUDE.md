# Weather Fit Website

Marketing website for the Weather Fit iOS app (weatherfit.com), hosted on GitHub Pages from the `master` branch.

## Git workflow

- **Never commit automatically.** Wait for the user to explicitly say to commit before running `git commit`. Do not stage files or propose commit messages unprompted.
- Active development branch: `redesign`. Do not merge to `master` until all critical sub-pages are rebuilt (privacy-policy, terms-and-conditions, faq, de, zh-Hans, 404).
- The live site serves from `master` — changes there deploy immediately to weatherfit.com.

## Testing

- **Never run or test pages.** Do not start dev servers (`python3 -m http.server`, `npx serve`, etc.), launch headless browsers, take screenshots, or attempt to drive the page. The user tests everything manually in their own browser and reports back.
- Do not invoke the `run` or `verify` skills for this project.
- When you finish a change, describe what you did and stop — let the user verify visually.

## Project structure

- `index.html` — homepage (currently: hero section only; more sections added one at a time)
- `css/styles.css` — single tokenized stylesheet; all design tokens are CSS custom properties on `:root`
- `js/site.js` — minimal vanilla JS (Mixpanel click tracker only)
- `images/` — active assets for the new site
- `support/` — chrome-less in-app contact form loaded by the iOS app's WKWebView at `weatherfit.com/support/`; reuses the global `css/styles.css` (form styles in the "Support form" section); analytics-free, `noindex`
- `_archive/` — the previous Webflow-exported site; kept for reference, disallowed in robots.txt

## Tech stack

Pure static HTML/CSS/JS — no build step, no framework, no jQuery. GitHub Pages compatible.

## Skills

- Always invoke the `frontend-design` skill (https://claude.com/plugins/frontend-design) before doing any HTML/CSS/JS work on this site.

## Design

- Mobile-first; two breakpoints only: `768px` and `1024px`
- Flighty-inspired: clean white, near-black text, iOS system blue accent (`#007AFF`), sunshine warm accent (`#FFB341`)
- Typography: SF Pro system stack via `-apple-system, BlinkMacSystemFont`
- Fluid type using `clamp()`; spacing via CSS custom properties

## Copy source

New homepage copy lives at `_source/homepage-copy.md`. Use it as the authoritative text source for all sections.

## Analytics

Click events use `data-tracker="ACTION|LABEL"` attributes routed through `js/site.js`.
