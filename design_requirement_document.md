# Design Requirement Document
**Project:** Latar Balai Mulyoarjo Digital Platform
**Version:** 1.0
**Status:** Active

---

## 1. Brand Overview

### Narrative
The design system is built on a **"Modern Organic"** narrative, bridging the gap between traditional village values and digital-forward innovation. The brand personality is **professional, nurturing, and high-end**, positioning Desa Mulyoarjo as a destination for tourism, agriculture, and community excellence.

### Visual Style
**Minimalist with Tactile Accents** — leverages heavy white space for calm and clarity, with high-quality photography as a primary design element. The aesthetic avoids clutter, favoring a spacious, editorial feel that mimics high-end travel and lifestyle publications.

---

## 2. Color System

The palette is derived from the **natural Indonesian landscape**.

### Semantic Roles

| Token | Role | Use Case |
|---|---|---|
| **Primary (Deep Forest Green)** | Brand presence | Primary actions, authoritative UI elements |
| **Secondary (Earth Brown)** | Grounding elements | Iconography, subtle background variations |
| **Tertiary (Warm Gold)** | Premium highlights | Badges, special CTAs, value indicators |
| **Surface (Natural Beige)** | Section backgrounds | Containers, soften stark white areas |
| **Background (Soft White)** | Canvas | Expansive layout base |

### Full Palette

```yaml
# Surface & Background
surface:                  '#fdf9f0'
surface-dim:              '#dddad1'
surface-bright:           '#fdf9f0'
surface-container-lowest: '#ffffff'
surface-container-low:    '#f7f3ea'
surface-container:        '#f1eee5'
surface-container-high:   '#ece8df'
surface-container-highest:'#e6e2d9'
background:               '#fdf9f0'

# On-Surface (Text & Icons on surfaces)
on-surface:               '#1c1c16'
on-surface-variant:       '#41493e'
on-background:            '#1c1c16'
inverse-surface:          '#31302b'
inverse-on-surface:       '#f4f0e7'

# Outline
outline:                  '#717a6d'
outline-variant:          '#c0c9bb'

# Primary — Deep Forest Green
primary:                  '#00450d'
on-primary:               '#ffffff'
primary-container:        '#1b5e20'
on-primary-container:     '#90d689'
inverse-primary:          '#91d78a'
surface-tint:             '#2a6b2c'
primary-fixed:            '#acf4a4'
primary-fixed-dim:        '#91d78a'
on-primary-fixed:         '#002203'
on-primary-fixed-variant: '#0c5216'

# Secondary — Earth Brown
secondary:                '#7a5649'
on-secondary:             '#ffffff'
secondary-container:      '#fdcdbc'
on-secondary-container:   '#795548'
secondary-fixed:          '#ffdbcf'
secondary-fixed-dim:      '#ebbcac'
on-secondary-fixed:       '#2e150b'
on-secondary-fixed-variant:'#603f33'

# Tertiary — Warm Gold
tertiary:                 '#735c00'
on-tertiary:              '#ffffff'
tertiary-container:       '#cca830'
on-tertiary-container:    '#4f3e00'
tertiary-fixed:           '#ffe088'
tertiary-fixed-dim:       '#e9c349'
on-tertiary-fixed:        '#241a00'
on-tertiary-fixed-variant:'#574500'

# Error
error:                    '#ba1a1a'
on-error:                 '#ffffff'
error-container:          '#ffdad6'
on-error-container:       '#93000a'

# Surface Variant
surface-variant:          '#e6e2d9'
```

### Color Usage Rules
- **Never** use `primary` on `secondary-container` — insufficient contrast
- **Always** pair `primary` with `on-primary` for text
- Use `outline-variant` for dividers; `outline` for interactive borders
- `tertiary` (Warm Gold) is **reserved** — use sparingly for premium moments only

---

## 3. Typography

The system uses two typefaces:
- **Plus Jakarta Sans** — headings, modern alternative to Poppins with better organic curves
- **Inter** — body text, maximum legibility for data-heavy and long-form content

### Type Scale

| Token | Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `headline-xl` | Plus Jakarta Sans | 48px | 700 | 1.2 | -0.02em |
| `headline-xl-mobile` | Plus Jakarta Sans | 32px | 700 | 1.2 | — |
| `headline-lg` | Plus Jakarta Sans | 32px | 600 | 1.3 | — |
| `headline-lg-mobile` | Plus Jakarta Sans | 24px | 600 | 1.3 | — |
| `headline-md` | Plus Jakarta Sans | 24px | 600 | 1.4 | — |
| `body-lg` | Inter | 18px | 400 | 1.6 | — |
| `body-md` | Inter | 16px | 400 | 1.6 | — |
| `label-md` | Inter | 14px | 600 | 1 | 0.05em |

### Typography Rules
- **Headlines:** Use tight letter-spacing (`-0.02em`) on larger sizes for a premium, high-impact look
- **Body:** Use generous line height (`1.6`) for readability in long-form articles
- **Labels:** Use **UPPERCASE** + `letter-spacing: 0.05em` for category tags and small UI labels to contrast against body copy

---

## 4. Spacing & Layout

### Spacing Units

```yaml
unit:             8px        # Base increment — all spacing must be multiples of 8
container-max:    1280px     # Maximum content width
gutter:           24px       # Column gap
margin-desktop:   64px       # Horizontal page margin (desktop)
margin-mobile:    20px       # Horizontal page margin (mobile)
section-padding:  120px      # Vertical section spacing
```

### Grid System
- **Desktop:** 12-column grid, 1280px max-width, 24px gutter
- **Mobile:** 4-column grid, 20px margin
- All internal component spacing (padding, gaps) must follow **8px increments**

### Layout Rules
- Section vertical spacing is intentionally large (`120px`) to give content "room to breathe," mirroring the openness of the village environment
- Content lines are capped at `1280px` to maintain readability on wide displays
- Never use arbitrary spacing values — only `8 · n` multiples

---

## 5. Shape Language

The shape language is defined by **Smoothness**. Sharp corners are avoided to maintain an organic, approachable feel.

```yaml
rounded:
  sm:      0.25rem   # 4px  — small elements (badges, chips)
  DEFAULT: 0.5rem    # 8px  — buttons, inputs
  md:      0.75rem   # 12px — small cards
  lg:      1rem      # 16px — cards & containers (friendly appearance)
  xl:      1.5rem    # 24px — featured gallery images (focal points)
  full:    9999px    # — pill buttons, tags
```

### Shape Rules
- **Standard elements** (buttons, inputs): `0.5rem` (8px)
- **Cards & containers**: `rounded-lg` (16px) — soft and friendly
- **Featured/gallery images**: `rounded-xl` (24px) — emphasizes premium quality
- **Never** use sharp `border-radius: 0` on user-facing components

---

## 6. Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers** — not harsh drop shadows.

| Level | Context | Blur | Y-Offset | Opacity |
|---|---|---|---|---|
| **Low** | Surface-level cards (default) | 20px | 4px | 4% |
| **Mid** | Hovered or active cards | 30px | 10px | 8% |
| **High** | Modals, dropdowns | 40px | 20px | 12% |
| **Glass** | Navigation header over imagery | `backdrop-blur(12px)` | — | 70% white |

### Elevation Rules
- Use **ambient (low-opacity) shadows** only — no hard colored shadows
- Shadow color is always the `on-surface` color (`#1c1c16`), not black
- Glassmorphism is **reserved** for the navigation bar only — used sparingly

---

## 7. Components

### 7.1 Navigation
```
Position:         fixed, top
Background:       rgba(255, 255, 255, 0.70)
Backdrop filter:  blur(12px)
Border-bottom:    1px solid outline-variant (#c0c9bb)
Link style:       label-md (14px, 600, UPPERCASE, 0.05em spacing)
Primary CTA:      filled primary button (no outline)
```

---

### 7.2 Buttons

| Variant | Background | Text | Border |
|---|---|---|---|
| **Primary** | `primary` `#00450d` | `on-primary` `#ffffff` | none |
| **Secondary** | `surface-container-low` `#f7f3ea` | `secondary` `#7a5649` | none |
| **Text Link** | transparent | `tertiary` `#735c00` | none |

- All buttons: `rounded-DEFAULT` (0.5rem)
- Button padding: `12px 24px` (1.5 × 3 grid units)
- Hover: Slight darkening of background (`hover:brightness-90`)
- No harsh borders on any button variant

---

### 7.3 Cards

```
Border-radius:    rounded-lg (1rem / 16px)
Image ratio:      16:9 (top-aligned)
Padding:          24px internal
Border:           1px solid #E5E1D8 (surface-container-highest variant)
Shadow (default): 0 4px 20px rgba(28, 28, 22, 0.04)
Shadow (hover):   0 10px 30px rgba(28, 28, 22, 0.08)
Hover effect:     translateY(-4px) + increased shadow
```

---

### 7.4 Input Fields

```
Background:    surface-container-lowest (#ffffff)
Border:        1px solid outline-variant (#c0c9bb)
Border-radius: rounded-DEFAULT (0.5rem)
Padding:       12px 16px
Font:          body-md (Inter, 16px)

Focus state:
  Border:      2px solid primary (#00450d)
  Box-shadow:  0 0 0 3px rgba(0, 69, 13, 0.12)  ← green glow
```

---

### 7.5 Featured / Hero Sections

```
Image treatment:   Full-width, high-resolution photography
Overlay:           linear-gradient(dark 20–30% opacity) for text legibility
Category tags:     tertiary color (#735c00 / Warm Gold), label-md styling, UPPERCASE
Heading:           headline-xl (Plus Jakarta Sans, 700, -0.02em)
Min-height:        100vh (full viewport)
```

---

## 8. Imagery & Photography Guidelines

- Use **high-resolution** photos (minimum 1920px wide for heroes)
- Prefer **warm, natural light** photography consistent with the earthy palette
- **No** stock-photo aesthetics — authentic village and nature imagery only
- Gallery images must use `rounded-xl` (24px) border-radius
- Always apply a **subtle dark overlay** on hero backgrounds to ensure `on-primary` text legibility
- Image aspect ratio for cards: **16:9**

---

## 9. Do's & Don'ts

### ✅ Do
- Use the 8px spacing grid consistently
- Apply `label-md` uppercase for all category tags
- Reserve Warm Gold (`tertiary`) for premium, achievement-oriented elements only
- Use ambient, low-opacity shadows
- Keep section padding at 120px on desktop

### ❌ Don't
- Use arbitrary spacing values (e.g., 13px, 37px)
- Apply Glassmorphism outside of the navigation bar
- Use pure black (`#000000`) — use `on-surface` (`#1c1c16`) instead
- Use harsh, fully-opaque drop shadows
- Mix typefaces beyond Plus Jakarta Sans + Inter
- Use sharp corners (`border-radius: 0`) on any user-facing component

---

## 10. Accessibility

- All text on `primary` background must meet **WCAG AA** contrast ratio (≥ 4.5:1)
- Focus states on interactive elements must have a **visible ring** (green glow on inputs, outline on buttons)
- Minimum touch target size: **44 × 44px** on mobile
- Never rely on color alone to convey information — pair with icons or labels
