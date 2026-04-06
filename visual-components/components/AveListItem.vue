<!--
  component: AveListItem
  structure: Single row item with circular icon, title and description
  notes: Used inside AveVerticalList. Alternating backgrounds handled by parent.
-->
<script setup lang="ts">
defineProps<{
  icon: string
  bg: string
  title: string
}>()
</script>

<template>
  <div class="ave-item">
    <div class="icon" :style="{ background: bg }">{{ icon }}</div>
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
