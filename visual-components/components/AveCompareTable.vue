<!--
  component: AveCompareTable
  structure: Multi-column comparison table wrapper with highlight/dim/good/bad styling
  notes: Slot expects a standard HTML table element with thead/tbody.
-->
<script setup lang="ts">
</script>

<template>
  <div class="ave-table-wrap">
    <div class="ave-table-scroll">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ave-table-wrap {
  width: 100%;
  border-radius: var(--ave-card-radius);
  overflow: hidden;
  border: 2px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
  background: var(--ave-card-bg);
}
.ave-table-scroll {
  overflow-x: auto;
}
.ave-table-wrap :deep(table) {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}
.ave-table-wrap :deep(th),
.ave-table-wrap :deep(td) {
  padding: 14px 18px;
  text-align: left;
  font-size: var(--ave-body-size);
  line-height: 1.4;
}

/* -- Table header row -- */
.ave-table-wrap :deep(thead th) {
  font-size: var(--ave-subtitle-size);
  padding: 16px 18px;
  font-weight: 600;
  color: var(--ave-text-primary);
  border-bottom: 2px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
}

/* -- Data rows: alternating background -- */
.ave-table-wrap :deep(tbody tr:nth-child(odd)) {
  background: var(--ave-card-bg);
}
.ave-table-wrap :deep(tbody tr:nth-child(even)) {
  background: var(--ave-card-bg-light);
}

/* -- First column (row labels) -- */
.ave-table-wrap :deep(th:first-child) {
  color: var(--ave-text-muted);
  font-weight: 400;
}
.ave-table-wrap :deep(td:first-child) {
  color: var(--ave-text-secondary);
  font-weight: 500;
}

/* -- Highlight column (recommended) -- */
.ave-table-wrap :deep(th.highlight) {
  color: #fff;
  background: var(--ave-accent);
}
.ave-table-wrap :deep(td.highlight) {
  background: var(--ave-accent-bg);
  color: var(--ave-text-primary);
  font-weight: 500;
}

/* -- Dim column (competitors) -- */
.ave-table-wrap :deep(th.dim) { color: var(--ave-text-muted); font-weight: 400; }
.ave-table-wrap :deep(td.dim) { color: var(--ave-text-muted); }

/* -- Semantic cell colors -- */
.ave-table-wrap :deep(.good) { color: var(--ave-color-good); }
.ave-table-wrap :deep(.bad) { color: var(--ave-color-bad); }
.ave-table-wrap :deep(.neutral) { color: var(--ave-text-secondary); }
.ave-table-wrap :deep(.sub) {
  font-size: var(--ave-small-size);
  color: var(--ave-text-muted);
  display: block;
  margin-top: 2px;
}
</style>
