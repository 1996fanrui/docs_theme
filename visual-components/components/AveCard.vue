<!--
  component: AveCard
  structure: Single card with circular icon, title, and description text
  notes: |
    Used inside AveGrid. Colors passed via props (bg, cardBg, cardBorder).
    Refer to color-palettes.md for available palettes and their rgba values.
    Dark mode is handled automatically: cardBg is overridden with a subtle
    tint derived from cardBorder's RGB channels — no dark-specific props needed.
  usage-markdown: |
    <AveCard icon="🔓" bg="rgba(52,168,83,0.15)" title="Title"
             cardBg="rgba(235,250,240,0.75)" cardBorder="rgba(52,168,83,0.3)">
      Description text (slot content)
    </AveCard>
  usage-json: |
    { "component": "AveCard", "props": { "icon": "🔓", "bg": "rgba(52,168,83,0.15)", "title": "Title", "cardBg": "rgba(235,250,240,0.75)", "cardBorder": "rgba(52,168,83,0.3)" }, "slot": "Description text" }
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  bg: string
  title: string
  cardBg?: string
  cardBorder?: string
}>()

// Extract RGB from an rgba/rgb string
function extractRgb(color: string): [string, string, string] | null {
  const m = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/)
  return m ? [m[1], m[2], m[3]] : null
}

// Derive dark-mode card background from border color (visible tint)
const darkCardBg = computed(() => {
  if (!props.cardBorder) return undefined
  const rgb = extractRgb(props.cardBorder)
  if (!rgb) return undefined
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.15)`
})

// Derive dark-mode icon background from bg prop (boost alpha for visibility)
const darkIconBg = computed(() => {
  const rgb = extractRgb(props.bg)
  if (!rgb) return undefined
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.25)`
})
</script>

<template>
  <div
    class="ave-card"
    :style="{
      '--_card-bg': cardBg,
      '--_card-bg-dark': darkCardBg,
      '--_card-border': cardBorder,
      '--_icon-bg': bg,
      '--_icon-bg-dark': darkIconBg,
    }"
  >
    <div class="header">
      <div class="icon">{{ icon }}</div>
      <h3>{{ title }}</h3>
    </div>
    <p><slot /></p>
  </div>
</template>

<style scoped>
.ave-card {
  border-radius: var(--ave-card-radius);
  padding: 28px;
  background: var(--_card-bg, var(--ave-card-bg));
  border: 2px solid var(--_card-border, transparent);
}
/* Dark mode: use derived tinted background instead of hardcoded light cardBg */
:global(.dark) .ave-card {
  background: var(--_card-bg-dark, var(--ave-card-bg)) !important;
}
.header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}
.icon {
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background: var(--_icon-bg);
}
:global(.dark) .icon {
  background: var(--_icon-bg-dark, var(--_icon-bg)) !important;
}
.ave-card h3 {
  color: var(--ave-text-primary);
  font-size: var(--ave-title-size);
  font-weight: 400;
  -webkit-text-stroke: 0.8px var(--ave-text-primary);
  margin: 0;
  line-height: 1.2;
}
.ave-card p {
  color: var(--ave-text-muted);
  font-size: var(--ave-body-size);
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
}
</style>
