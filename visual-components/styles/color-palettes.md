---
description: "Color palette lookup data: base text colors, contrast pairs, neutral tones, and 5 extended palettes. Referenced when choosing colors for visual components."
---

# Color Palettes

## Base Text Colors

| Purpose | Value | Notes |
|---------|-------|-------|
| Primary text | `#1a1a1a` | Not pure black |
| Secondary text | `#333` | Unified gray, avoid #555/#666/#777 |
| Lines/arrows | `#888` or `#999` | Visible on both light and dark backgrounds |

## Google Material Four-Color

Suitable for parallel instances, cycle nodes, and other scenarios that need distinct element differentiation.

| Name | Solid (icon bg) | Semi-transparent (card bg 0.75) | Border (0.3) | Semantic |
|------|------|------|------|------|
| Green | `#34a853` | `rgba(235,250,240,0.75)` | `rgba(52,168,83,0.3)` | Create, success, safe |
| Blue | `#5b9bd5` | `rgba(235,245,255,0.75)` | `rgba(91,155,213,0.3)` | Execute, build, in-progress |
| Yellow | `#f4b400` | `rgba(255,250,235,0.75)` | `rgba(244,180,0,0.3)` | Output, result, warning |
| Orange | `#e8711a` | `rgba(255,243,235,0.75)` | `rgba(232,113,26,0.3)` | Destroy, delete, danger |

## Contrast Dual-Color

Suitable for binary choices, pros/cons comparison.

| Name | Card bg | Border | Text accent | Semantic |
|------|------|------|------|------|
| Warm orange (conservative) | `rgba(255,247,237,0.75)` | `rgba(245,158,66,0.3)` | `#b45309` | Restricted, slow, conservative |
| Light red (aggressive) | `rgba(254,242,242,0.75)` | `rgba(239,68,68,0.3)` | `#b91c1c` | Full access, dangerous, out of control |
| Light green (recommended) | `rgba(240,253,244,0.75)` | `rgba(16,185,129,0.25)` | `#047857` | Recommended, safe, success |

## Neutral Tones

Suitable for tables, feature cards, and other scenarios without color differentiation.

| Name | Value | Usage |
|------|-------|-------|
| Cream card bg | `rgba(245,243,240,0.75)` | General card/container background |
| Blue highlight column | `#4a7cff` (header) / `rgba(74,124,255,0.06)` (cell) | Highlighted column in comparison tables |

## Color Principles

1. **Solid for small areas** (icon backgrounds, tags), **semi-transparent for large areas** (card backgrounds)
2. **Max 4 main colors per image** — more becomes cluttered
3. **Colors must have semantic meaning**: green = good/safe/create, red = bad/danger/delete, blue = in-progress/neutral, yellow = output/result
4. **Card backgrounds use 0.75 opacity** — ensures text readability on dark themes
5. **Do not replace saturated colors with desaturated grays** — saturated colors are actually more readable on dark backgrounds
6. **Color usage is not limited to icons** — the same palette applies to: icon backgrounds, card backgrounds, table row/column highlights, borders, tags, etc.
7. **Unrelated elements must use distant hues**: related elements may use similar hues; unrelated elements must use colors with large hue distance to avoid implying a false relationship

## Extended Palettes

### A. Morandi (muted gray tones) — formal technical docs

| Name | Solid | Card bg | Border |
|------|-------|---------|--------|
| Mist green | `#7c9885` | `rgba(235,243,238,0.75)` | `rgba(124,152,133,0.3)` |
| Gray purple | `#8b7e9b` | `rgba(240,237,245,0.75)` | `rgba(139,126,155,0.3)` |
| Milk tea | `#c4956a` | `rgba(248,241,234,0.75)` | `rgba(196,149,106,0.3)` |
| Mist blue | `#7a9bb5` | `rgba(236,242,248,0.75)` | `rgba(122,155,181,0.3)` |

### B. Cyber Tech — AI/DevOps themes

| Name | Solid | Card bg | Border |
|------|-------|---------|--------|
| Indigo | `#6366f1` | `rgba(238,238,255,0.75)` | `rgba(99,102,241,0.3)` |
| Cyan | `#06b6d4` | `rgba(232,250,255,0.75)` | `rgba(6,182,212,0.3)` |
| Purple | `#8b5cf6` | `rgba(243,237,255,0.75)` | `rgba(139,92,246,0.3)` |
| Mint | `#14b8a6` | `rgba(232,252,249,0.75)` | `rgba(20,184,166,0.3)` |

### C. Warm Sunset — product intros, user stories

| Name | Solid | Card bg | Border |
|------|-------|---------|--------|
| Orange | `#f97316` | `rgba(255,243,235,0.75)` | `rgba(249,115,22,0.3)` |
| Coral red | `#ef4444` | `rgba(254,240,240,0.75)` | `rgba(239,68,68,0.3)` |
| Rose pink | `#ec4899` | `rgba(253,238,248,0.75)` | `rgba(236,72,153,0.3)` |
| Amber | `#eab308` | `rgba(254,249,232,0.75)` | `rgba(234,179,8,0.3)` |

### D. Natural Forest — green tones, steady and reliable

| Name | Solid | Card bg | Border |
|------|-------|---------|--------|
| Emerald | `#16a34a` | `rgba(235,250,240,0.75)` | `rgba(22,163,74,0.3)` |
| Turquoise | `#0d9488` | `rgba(232,249,247,0.75)` | `rgba(13,148,136,0.3)` |
| Grass green | `#65a30d` | `rgba(243,252,235,0.75)` | `rgba(101,163,13,0.3)` |
| Tree brown | `#854d0e` | `rgba(250,243,235,0.75)` | `rgba(133,77,14,0.3)` |

### E. Ocean Gradient — professional and calm

| Name | Solid | Card bg | Border |
|------|-------|---------|--------|
| Deep blue | `#1d4ed8` | `rgba(233,238,255,0.75)` | `rgba(29,78,216,0.3)` |
| Royal blue | `#2563eb` | `rgba(235,242,255,0.75)` | `rgba(37,99,235,0.3)` |
| Sky blue | `#3b82f6` | `rgba(238,245,255,0.75)` | `rgba(59,130,246,0.3)` |
| Light blue | `#60a5fa` | `rgba(240,248,255,0.75)` | `rgba(96,165,250,0.3)` |
