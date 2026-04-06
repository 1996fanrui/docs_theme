<!--
  component: AveCard
  structure: Single card with circular icon, title, and description text
  notes: Used inside AveGrid. Colors passed via props (bg, cardBg, cardBorder).
-->
<script setup lang="ts">
defineProps<{
  icon: string
  bg: string
  title: string
  cardBg?: string
  cardBorder?: string
}>()
</script>

<template>
  <div
    class="ave-card"
    :style="{
      background: cardBg || 'var(--ave-card-bg)',
      border: cardBorder ? `2px solid ${cardBorder}` : undefined,
    }"
  >
    <div class="header">
      <div class="icon" :style="{ background: bg }">{{ icon }}</div>
      <h3>{{ title }}</h3>
    </div>
    <p><slot /></p>
  </div>
</template>

<style scoped>
.ave-card {
  border-radius: var(--ave-card-radius);
  padding: 28px;
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
