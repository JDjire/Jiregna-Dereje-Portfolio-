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

## Performance

- Manual chunks for `three` and `framer-motion`
- Lazy-loaded sections and 3D canvas
- `prefers-reduced-motion` respected throughout
- Run Lighthouse in production build for 95+ targets
