<!--
  component: AveGrid + AveCard
  structure: N card grid layout, each card contains icon, title and description
  notes: Card count must be divisible by cols for a complete rectangle (e.g. 2x2, 2x3, 3x3).
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
