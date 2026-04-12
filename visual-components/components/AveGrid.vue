<!--
  component: AveGrid + AveCard
  structure: N card grid layout, each card contains icon, title and description
  notes: Card count must be divisible by cols for a complete rectangle (e.g. 2x2, 2x3, 3x3).
  usage-markdown: |
    <AveGrid :cols="2">
      <AveCard icon="🔓" bg="rgba(52,168,83,0.15)" title="Open Source">
        Community-driven development
      </AveCard>
      <AveCard icon="⚡" bg="rgba(66,133,244,0.15)" title="Fast">
        Sub-millisecond latency
      </AveCard>
    </AveGrid>
  usage-json: |
    {
      "component": "AveGrid",
      "props": { "cols": 2 },
      "children": [
        { "component": "AveCard", "props": { "icon": "🔓", "bg": "rgba(52,168,83,0.15)", "title": "Open Source" }, "slot": "Community-driven development" },
        { "component": "AveCard", "props": { "icon": "⚡", "bg": "rgba(66,133,244,0.15)", "title": "Fast" }, "slot": "Sub-millisecond latency" }
      ]
    }
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  cols?: number
}>(), {
  cols: 2,
})
</script>

<template>
  <div class="ave-grid" :style="{ gridTemplateColumns: `repeat(${props.cols}, 1fr)` }">
    <slot />
  </div>
</template>

<style scoped>
.ave-grid {
  display: grid;
  gap: 20px;
  max-width: 900px;
  width: 100%;
}
</style>
