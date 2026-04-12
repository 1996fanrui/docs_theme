<!--
  component: AveListItem
  structure: Single row item with circular icon, title and description
  notes: Used inside AveVerticalList. Alternating backgrounds handled by parent.
  usage-markdown: |
    <AveListItem icon="📦" bg="rgba(66,133,244,0.15)" title="Packaging">
      Description text (slot content)
    </AveListItem>
  usage-json: |
    { "component": "AveListItem", "props": { "icon": "📦", "bg": "rgba(66,133,244,0.15)", "title": "Packaging" }, "slot": "Description text" }
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  bg: string
  title: string
}>()

// Derive dark-mode icon background (boost alpha for visibility)
const darkIconBg = computed(() => {
  const m = props.bg.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/)
  if (!m) return undefined
  return `rgba(${m[1]}, ${m[2]}, ${m[3]}, 0.25)`
})
</script>

<template>
  <div class="ave-item" :style="{ '--_icon-bg': bg, '--_icon-bg-dark': darkIconBg }">
    <div class="icon">{{ icon }}</div>
    <div class="text">
      <h3>{{ title }}</h3>
      <p><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.ave-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 22px 28px;
}
.icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: var(--_icon-bg);
}
:global(.dark) .icon {
  background: var(--_icon-bg-dark, var(--_icon-bg)) !important;
}
.text { flex: 1; min-width: 0; }
.text h3 {
  color: var(--ave-text-primary);
  font-size: var(--ave-title-size);
  font-weight: 400;
  -webkit-text-stroke: 0.6px var(--ave-text-primary);
  margin: 0 0 4px 0;
  line-height: 1.3;
}
.text p {
  color: var(--ave-text-muted);
  font-size: var(--ave-subtitle-size);
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
}
</style>
