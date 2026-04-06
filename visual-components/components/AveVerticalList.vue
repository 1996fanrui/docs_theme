<!--
  component: AveVerticalList + AveListItem
  structure: Vertical list with alternating row backgrounds, each row has icon + title + description
  notes: Uses AveListItem children in default slot.
-->
<script setup lang="ts">
</script>

<template>
  <div class="ave-list">
    <slot />
  </div>
</template>

<style scoped>
.ave-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 820px;
  width: 100%;
  border-radius: var(--ave-card-radius);
  overflow: hidden;
  border: 2px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
}
.ave-list :deep(.ave-item:not(:last-child)) {
  border-bottom: 1px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
}
.ave-list :deep(.ave-item:nth-child(odd)) {
  background: var(--ave-card-bg);
}
.ave-list :deep(.ave-item:nth-child(even)) {
  background: var(--ave-card-bg-light);
}
</style>
