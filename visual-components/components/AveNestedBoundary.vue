<!--
  component: AveNestedBoundary + AveBoundaryItem
  structure: Nested container diagram — outer boundary (host) containing inner isolated element (sandbox)
  notes: Two named sections via props. AveBoundaryItem used for both host and sandbox items.
-->
<script setup lang="ts">
defineProps<{
  hostLabel: string
  hostSubtitle?: string
  sandboxLabel: string
  isolationLabel?: string
}>()
</script>

<template>
  <div class="host">
    <div class="host-label">{{ hostLabel }}</div>
    <div class="content">
      <div class="host-items">
        <div v-if="hostSubtitle" class="host-subtitle">{{ hostSubtitle }}</div>
        <slot name="host-items" />
      </div>

      <div class="isolation-border">
        <div v-if="isolationLabel" class="isolation-label">{{ isolationLabel }}</div>
        <div class="sandbox">
          <div class="sandbox-label">{{ sandboxLabel }}</div>
          <div class="sandbox-items">
            <slot name="sandbox-items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.host {
  border-radius: var(--ave-card-radius);
  background: var(--ave-zone-blue-bg);
  border: 2px solid var(--ave-zone-blue-border);
  padding: 28px;
}
.host-label {
  font-size: var(--ave-title-size); font-weight: 600; color: var(--ave-zone-blue-text);
  margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
}
.content { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; padding-top: 8px; }

.host-items {
  display: flex; flex-direction: column; gap: 6px; justify-content: center; min-width: 0;
}
.host-subtitle {
  font-size: var(--ave-body-size); color: var(--ave-text-muted);
  margin-bottom: 2px; -webkit-text-stroke: 0.3px var(--ave-text-muted);
}

.isolation-border {
  border: 3px dashed var(--ave-danger-border);
  border-radius: 14px; padding: 4px; position: relative; min-width: 0;
}
.isolation-label {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  background: var(--ave-zone-blue-bg-solid); padding: 2px 16px;
  font-size: var(--ave-body-size); color: var(--ave-color-bad); font-weight: 600;
  border-radius: 8px; white-space: nowrap;
}

.sandbox {
  border-radius: var(--ave-card-radius);
  background: var(--ave-zone-green-bg);
  border: 2px solid var(--ave-zone-green-border);
  padding: 24px; height: 100%; box-sizing: border-box;
}
.sandbox-label {
  font-size: var(--ave-title-size); font-weight: 600; color: var(--ave-zone-green-text);
  margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
}
.sandbox-items { display: flex; flex-direction: column; gap: 6px; }
</style>
