<!--
  component: AveVerticalList + AveListItem
  structure: Vertical list with alternating row backgrounds, each row has icon + title + description
  notes: Uses AveListItem children in default slot.
  usage-markdown: |
    <AveVerticalList>
      <AveListItem icon="📦" bg="rgba(66,133,244,0.15)" title="Packaging">
        Automated build and release
      </AveListItem>
      <AveListItem icon="🔍" bg="rgba(52,168,83,0.15)" title="Testing">
        End-to-end validation
      </AveListItem>
    </AveVerticalList>
  usage-json: |
    {
      "component": "AveVerticalList",
      "children": [
        { "component": "AveListItem", "props": { "icon": "📦", "bg": "rgba(66,133,244,0.15)", "title": "Packaging" }, "slot": "Automated build and release" },
        { "component": "AveListItem", "props": { "icon": "🔍", "bg": "rgba(52,168,83,0.15)", "title": "Testing" }, "slot": "End-to-end validation" }
      ]
    }
  layout-constraints: |
    - items: 3-8 (4-6 recommended; list has no max-height and max-width is 820px)
    - item title: max ~30 chars EN / ~15 chars CJK (single line preferred)
    - item description (slot): max ~80 chars EN / ~40 chars CJK (1-2 lines; longer text wraps)
    - item icon: single emoji character (displayed in 48px circle)
    - recommended viewport width: ≥820px (list is capped at 820px, centered)
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
