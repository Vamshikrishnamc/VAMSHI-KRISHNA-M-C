---
name: Kinetic Obsidian
colors:
  surface: '#0e1321'
  surface-dim: '#0e1321'
  surface-bright: '#343948'
  surface-container-lowest: '#090e1c'
  surface-container-low: '#161b2a'
  surface-container: '#1a1f2e'
  surface-container-high: '#252a39'
  surface-container-highest: '#303444'
  on-surface: '#dee2f6'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#dee2f6'
  inverse-on-surface: '#2b303f'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#f2e9ff'
  on-tertiary: '#3c0091'
  tertiary-container: '#d9c8ff'
  on-tertiary-container: '#6834d1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0e1321'
  on-background: '#dee2f6'
  surface-variant: '#303444'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system expresses high-velocity precision, academic technical rigor, and futuristic software craftsmanship. It reflects the portfolio of an ambitious Computer Science & AI/ML engineer—merging cutting-edge computation with refined digital aesthetics.

### Aesthetic Persona
- **Architectural Style:** High-Tech Dark Glassmorphism meets Minimalist IDE Ergonomics.
- **Tone:** Methodical, visionary, technically fluent, understated yet commanding.
- **Emotional Response:** Inspires deep technical trust, intellectual authority, and forward-thinking engineering capabilities without unnecessary ornamentation.
- **Visual Motif:** Deep spatial voids illuminated by focused electromagnetic accents, razor-sharp vector grids, and sub-pixel micro-borders.

## Colors

The palette is engineered around spatial depth and optical fluorescence. The foundation consists of rich obsidian-tinted slates, overlaid with high-energy luminescent emitters that evoke command-line terminals and photonic neural pipelines.

### Color Tokens & Semantic Roles
- **Base Canvas (`neutral-950` / `#0A0F1D`):** The deep obsidian baseline substrate across all views.
- **Surface Elevation 1 (`neutral-900` / `#111827`):** Primary card background, providing high tonal distinction from the canvas.
- **Surface Elevation 2 (`neutral-800` / `#1E293B`):** Elevated modals, floating controls, and hover substrates.
- **Primary Energy (`primary` / `#00E5FF`):** Hyper-focused electric cyan reserved for primary actions, active code states, key metrics, and dynamic focus indicators.
- **Secondary Beam (`secondary` / `#3B82F6`):** Pure spectrum blue for flow connections, subtle structural gradients, and contextual tags.
- **Tertiary Accent (`tertiary` / `#8B5CF6`):** Deep synthetic violet used exclusively for advanced AI/ML badges, algorithmic visualizations, and ambient glow dispersals.
- **Text Primary (`#F8FAFC`):** Crisp high-legibility off-white for titles and critical body copy.
- **Text Muted (`#94A3B8`):** Low-contrast steel gray for secondary technical descriptors.
- **Border Stroke Neutral (`#1E293B`):** Structural grid separators and card boundaries.
- **Border Stroke Active (`#00E5FF40`):** Electric translucent cyan boundaries for hovered and interactive states.

## Typography

The typographic hierarchy pairs the contemporary geometric clarity of **Plus Jakarta Sans** with the developer-grade mechanical utility of **JetBrains Mono**.

- **Editorial Hierarchy:** Display and headline levels leverage tight negative tracking (`-0.03em` to `-0.02em`) to produce authoritative, poster-like impact.
- **Engineering Markers:** All functional tags, metric labels, commit hashes, code blocks, and category indicators must use `label_font` (`JetBrains Mono`).
- **Pacing & Readability:** Body text retains open vertical clearance with high line-height ratios to ensure long technical breakdowns, project retrospectives, and architecture explainers remain fatigue-free.

## Layout & Spacing

The layout model is anchored by a structural 12-column responsive fluid grid wrapped within a maximum container width of `1280px`.

### Grid & Breakpoints
- **Mobile (< 640px):** 4-column layout, `1rem` margin, `1rem` gutter. Content cards stack vertically into singular focused threads.
- **Tablet (641px - 1024px):** 8-column layout, `1.5rem` margin, `1.25rem` gutter. Sidebars and secondary modules reflow into balanced dual-column cards.
- **Desktop (> 1024px):** 12-column layout, `2rem` margin, `1.5rem` gutter. Enables asymmetrical layouts, project showcase grids, and terminal-inspired side panes.

### Rhythm
Component internals follow a disciplined 8-point baseline scale. Spacing expands dramatically between sections (`space-2xl` to `space-3xl`) to establish museum-grade gallery pacing, counterbalanced by compact, high-density padding (`space-sm` to `space-md`) within technical code chips and status modules.

## Elevation & Depth

Visual hierarchy uses a multi-layered glass-and-aperture strategy rather than traditional drop shadows.

### Layering Blueprint
1. **Background Plane:** Dark obsidian `#0A0F1D` decorated with subtle mathematical dot/grid patterns at 3% opacity, intersected by diffused radial gradients of electric cyan (`#00E5FF`) and violet (`#8B5CF6`) at 8% opacity with a `120px` gaussian blur.
2. **Surface Layer (Cards & Panels):** Dark indigo `#111827` blended with 70% opacity and `backdrop-filter: blur(16px)`. Border is a crisp `1px solid rgba(255, 255, 255, 0.08)`.
3. **Elevated Layer (Interactive & Hover):** Ambient outer glow using dual offsets: `box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.3), 0 8px 32px -4px rgba(0, 229, 255, 0.15)`.
4. **Terminal / Code Layer:** Matte near-black `#080C17` recessed surfaces with interior gradient highlights on top borders (`1px solid rgba(255, 255, 255, 0.12)`).

## Shapes

The geometric signature uses deliberate, calibrated roundedness (radius value `2`):
- **Base Containers & Cards:** `1rem` (`rounded-lg`) corner radius, striking a balance between software precision and humanized modernism.
- **Interactive Controls (Buttons, Inputs):** `0.5rem` (`rounded-md`) corner radius, enforcing tactile clickability.
- **Technical Badges & Status Chips:** `9999px` (Pill-shaped) to clearly delineate inline metadata from architectural containers.
- **Code Enclosures:** Strict `0.75rem` corner radius with unified border-stroke intersections.

## Components

### Buttons
- **Primary Action:** Solid electric cyan background (`#00E5FF`) with deep obsidian text (`#0A0F1D`), font weight `600`. Subtle hover glow (`0 0 20px rgba(0, 229, 255, 0.4)`), scale factor `1.01`.
- **Secondary / Ghost Action:** Translucent dark slate background (`rgba(17, 24, 39, 0.8)`), `1px` border of `rgba(255, 255, 255, 0.12)`, text in `#F8FAFC`. On hover, border shifts to `#00E5FF` with text tinted electric cyan.
- **Size Specs:** Padding `0.625rem 1.25rem`, typography set to `Plus Jakarta Sans` 14px weight 600.

### Technical Chips & Badges
- **Framework & Model Badges:** Styled using `JetBrains Mono` at `11px` in uppercase (`label-caps`). Background: `rgba(0, 229, 255, 0.06)`, border: `1px solid rgba(0, 229, 255, 0.2)`, text: `#00E5FF`.
- **Status Indicators (e.g., "Available for AI/ML Roles"):** Integrated pill with a dynamic pulsing green/cyan status dot (`#10B981`) next to `12px` monospaced label text.

### Interactive Project Cards
- **Construction:** Composed of surface `#111827` at 75% opacity, backdrop blur `16px`, and an internal top highlight stroke.
- **Interaction:** On hover, cards transition their borders smoothly from neutral gray to an electric gradient stroke, accompanied by a subtle upward translation (`-3px`) and soft cyan drop-glow.

### Code Snippets & Interactive Terminals
- **Window Frame:** Top titlebar containing macOS-style minimal window pips (dimmed red, yellow, green dots), file path rendered in muted `JetBrains Mono 12px`.
- **Body:** `#070B14` high-contrast background with custom syntax-highlighting tokens mapped directly to cyan, cobalt, and violet.

### Inputs & Contact Elements
- **Input Fields:** Recessed surface `#0A0F1D`, stroke `1px solid #1E293B`, placeholder text in `#64748B`. Active focus state triggers an outer `0 0 0 2px rgba(0, 229, 255, 0.25)` ring and border color transition to `#00E5FF`.