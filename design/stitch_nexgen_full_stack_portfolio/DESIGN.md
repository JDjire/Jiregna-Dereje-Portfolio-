---
name: Cinematic Developer Portfolio
colors:
  surface: '#0f1321'
  surface-dim: '#0f1321'
  surface-bright: '#353849'
  surface-container-lowest: '#0a0d1c'
  surface-container-low: '#171b2a'
  surface-container: '#1b1f2e'
  surface-container-high: '#262939'
  surface-container-highest: '#303444'
  on-surface: '#dfe1f6'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dfe1f6'
  inverse-on-surface: '#2c303f'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#d7def9'
  on-tertiary: '#283044'
  tertiary-container: '#bbc2dc'
  on-tertiary-container: '#485065'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#0f1321'
  on-background: '#dfe1f6'
  surface-variant: '#303444'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 72px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '900'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
---

## Brand & Style

This design system is engineered for a high-end, futuristic developer portfolio that balances technical precision with cinematic depth. The brand personality is "Expert-Futurist"—authoritative, cutting-edge, and highly polished. It targets tech recruiters and potential clients who value high-performance engineering and sophisticated aesthetics.

The visual style is a refined **Glassmorphism** set against a **Deep Space** backdrop. It utilizes translucent layers, high-index background blurs, and micro-interactions that feel responsive and tactile. The overall atmosphere should evoke the feeling of a premium SaaS command center or a futuristic operating system, utilizing subtle neon accents to draw attention to key conversion points and interactive elements.

## Colors

The palette is built on a foundation of "absolute depth" to allow the glass effects to shimmer.

- **Primary (Electric Blue):** Used for primary actions, success states, and glowing accents. It represents energy and connectivity.
- **Secondary (Purple):** Used for branding elements, linear gradients, and "intelligence" indicators (e.g., AI or Full-stack logic).
- **Surface Neutrals:** The base is a near-black `#050816`. Surfaces and "glass" panes use the Dark Navy `#0F172A` at varying opacities (30% to 70%).
- **Accents:** Neon glows are achieved using the primary and secondary colors with high-spread, low-opacity shadows.

## Typography

The typography system relies on a high-contrast pairing of **Montserrat** for impactful displays and **Inter** for legible, systematic body text. 

- **Display Text:** Uses Montserrat with heavy weights and tight tracking for a bold, cinematic "poster" feel.
- **Body Text:** Inter provides a clean, neutral balance, ensuring technical descriptions are easy to digest.
- **Monospace:** JetBrains Mono is introduced for small labels, code snippets, and metadata to reinforce the "developer" identity of the portfolio.
- **Hierarchy:** Maintain generous vertical rhythm. Use the `label-mono` style for section overlines (e.g., "PROJECT 01") to create a structured, engineered look.

## Layout & Spacing

This design system employs a **Fluid Grid** model centered within a max-width container for desktop, ensuring a premium "widescreen" experience on 4K monitors.

- **Grid:** A 12-column layout with 24px gutters. 
- **Rhythm:** Spacing follows an 8px base unit. Section vertical padding should be aggressive (120px+) to allow the content to breathe and maintain a "luxury" feel.
- **Responsive Behavior:** On mobile, margins reduce to 20px, and columns collapse to a single stack. Use "Safe Area" insets for navigation bars on mobile devices.

## Elevation & Depth

Depth is the core differentiator of this design system. It is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional drop shadows.

- **Glass Layers:** Surfaces use `#0F172A` at 40% opacity with a `backdrop-filter: blur(20px)`. 
- **Borders:** "Ghost borders" are essential. Use a 1px solid border with a linear gradient (Top-Left: White @ 20% to Bottom-Right: White @ 5%) to simulate a light-catching edge.
- **Glows:** Interactive elements (like active cards or buttons) emit a soft `box-shadow` using the Primary or Secondary color (e.g., `0 0 30px rgba(0, 212, 255, 0.2)`).
- **Z-Index:** Content is arranged in three tiers: 
    1. Background (Particles/Gradients)
    2. Midground (Glass Panes/Cards)
    3. Foreground (Text/Icons/Interactive Elements)

## Shapes

The shape language is "Soft-Tech." While the grid is rigid and structured, the corners are rounded to provide a modern, SaaS-like approachable feel.

- **Cards & Panes:** Use `rounded-lg` (16px) for standard components.
- **Inputs & Buttons:** Use `rounded-md` (8px) for a sharper, more functional appearance.
- **Decorative Elements:** Progress bars and tags should use a full pill-shape (`rounded-full`) to contrast against the rectangular grid.

## Components

### Buttons
- **Primary:** Background is a gradient of Primary to Secondary. On hover, it gains a "neon" outer glow and scales slightly (1.02x).
- **Ghost:** Transparent background with a 1px white border at 20% opacity. Text remains white.

### Glassmorphic Cards
- Cards must have a `backdrop-filter: blur(16px)` and a subtle 1px border gradient.
- Content inside cards should have high internal padding (32px) to maintain the premium aesthetic.

### Vertical Timelines
- Use a 2px wide line in `#0F172A`. 
- Active nodes should be small 12px circles with a 10px outer glow of Electric Blue.

### Animated Progress Indicators
- Linear bars with a "scanning" animation—a higher-opacity highlight that travels across the bar to indicate active loading or skill proficiency.

### Form Fields
- Inputs are dark and semi-transparent. On focus, the border transitions from 20% white to 100% Primary (Electric Blue) with a soft inner glow.
- Labels use `label-mono` style for a technical, precise look.