# Design System

See [MED.md](./MED.md) for documentation governance. Component inventory lives in [components.md](./components.md).

Command-center dark theme. Source of truth for colors, typography, and UI patterns.

## Theme Character

- **Aesthetic**: Command center, high-velocity, precision-focused
- **Mood**: Serious, premium, data-dense but uncluttered
- **Depth**: Glass layers, ambient glows, grid texture

## Implementation

| Layer | File |
|-------|------|
| Tailwind tokens | `tailwind.config.ts` |
| Component classes | `styles/globals.css` |
| Fonts | `app/layout.tsx` (Inter + JetBrains Mono) |

## Component Classes

| Class | Usage |
|-------|-------|
| `glass-card` | Card containers with blur |
| `glass-nav` | Navbar background |
| `btn-primary` | Primary CTA with blue glow |
| `btn-secondary` | Secondary actions |
| `input-field` | Form inputs |
| `badge-blue` / `badge-orange` / `badge-green` | Status and tag badges |
| `status-dot-live` | Pulsing green live indicator |
| `data-table` | Admin tables |
| `page-title` / `section-title` / `kpi-value` / `label-text` | Typography |

## Rules

- Scores and metrics always use `font-mono`
- Cards use `glass-card` with optional ambient glow
- Primary actions use `btn-primary`
- No light backgrounds