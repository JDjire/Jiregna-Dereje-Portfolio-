# DEV_CORE — Cinematic Developer Portfolio

Production-ready full-stack developer portfolio built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**. Visual design follows the `design/stitch_nexgen_full_stack_portfolio` glassmorphism system (electric blue / purple, Montserrat + Inter + JetBrains Mono).

## Features

- Cinematic hero with Three.js particle galaxy, gradient mesh, and typing animation
- GitHub API: repos, stats, contribution heatmap
- Project filtering (all / react / node / fullstack / other)
- Animated skill cards (HTML, CSS, JS, React, Tailwind, Git, GitHub, Node, Express, MongoDB)
- Contact form with validation (EmailJS or Formspree)
- Dark / light mode, magnetic CTAs, scroll animations, mouse parallax
- Code splitting, lazy loading, SEO (react-helmet-async), accessibility (skip link, ARIA)
## Quick start

```bash
npm install
# Create a local .env file and add VITE_GITHUB_USERNAME and EmailJS keys
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_GITHUB_USERNAME` | Public GitHub username for repos & stats |
| `GITHUB_TOKEN` | Optional server-only token for GitHub API rate limits; never use the `VITE_` prefix |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_FORMSPREE_ENDPOINT` | Optional Formspree URL fallback |

Without GitHub username, curated sample projects are shown. Without EmailJS/Formspree, the form runs in demo mode (console log).

## Customize

Edit `src/config/site.js` for name, bio, social links, typing phrases, and featured projects.

## Performance

- Manual chunks for `three` and `framer-motion`
- Lazy-loaded sections and 3D canvas
- `prefers-reduced-motion` respected throughout
- Run Lighthouse in production build for 95+ targets
