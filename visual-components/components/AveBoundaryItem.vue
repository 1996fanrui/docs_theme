<!--
  component: AveBoundaryItem
  structure: Single item row with colored icon badge, bold title and description
  notes: Used inside AveNestedBoundary for both host and sandbox item lists.
-->
<script setup lang="ts">
defineProps<{
  icon: string
  badge: 'blocked' | 'inject' | 'allowed' | 'clean'
  title: string
}>()
</script>

<template>
  <div class="boundary-item">
    <div class="icon-badge" :class="badge">{{ icon }}</div>
    <div><strong>{{ title }}</strong><br /><slot /></div>
  </div>
</template>

<style scoped>
.boundary-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: var(--ave-subtitle-size);
  line-height: 1.4;
  color: var(--ave-text-secondary);
  word-break: break-word;
}
.icon-badge {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}
.blocked { background: var(--ave-badge-blocked); }
.inject { background: var(--ave-badge-inject); }
.allowed { background: var(--ave-badge-allowed); }
.clean { background: var(--ave-badge-clean); }
.boundary-item strong { font-weight: 600; color: var(--ave-text-primary); }
</style>
