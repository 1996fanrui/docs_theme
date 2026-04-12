<!--
  component: AveSimpleTable
  structure: Plain striped table with alternating row backgrounds, no column highlights
  notes: Use this when you want a clean, neutral data table without any column emphasis.
         Supports sub-text per cell and semantic good/bad/neutral cell colors.
  usage-markdown: |
    <AveSimpleTable
      :columns='["Feature","Value A","Value B"]'
      :rows='[
        [{"text":"Speed"},{"text":"Fast","class":"good"},{"text":"Slow","class":"bad"}],
        [{"text":"Cost"},{"text":"$10"},{"text":"$50"}],
        [{"text":"Support"},{"text":"24/7"},{"text":"Business hours","sub":"Mon–Fri only"}]
      ]'
    />
  usage-json: |
    {
      "component": "AveSimpleTable",
      "props": {
        "columns": ["Feature","Value A","Value B"],
        "rows": [
          [{"text":"Speed"},{"text":"Fast","class":"good"},{"text":"Slow","class":"bad"}],
          [{"text":"Cost"},{"text":"$10"},{"text":"$50"}],
          [{"text":"Support"},{"text":"24/7"},{"text":"Business hours","sub":"Mon–Fri only"}]
        ]
      }
    }
  layout-constraints: |
    - columns: 2-5 (3 recommended; beyond 5 cells become too narrow at min-width 400px)
    - rows: 3-10 (5-7 recommended; table has no max-height so long tables push content down)
    - column header: max ~20 chars EN / ~10 chars CJK
    - cell text: max ~30 chars EN / ~15 chars CJK (longer text wraps within cell)
    - cell sub: max ~40 chars EN / ~20 chars CJK (smaller font, displayed below main text)
    - first column acts as row label; keep it concise: max ~15 chars EN / ~8 chars CJK
    - recommended viewport width: ≥768px (horizontal scroll activates below 400px)
-->
<script setup lang="ts">
interface Cell {
  text: string
  sub?: string
  class?: string
}

defineProps<{
  columns: string[]
  rows: Cell[][]
}>()
</script>

<template>
  <div class="ave-simple-table-wrap">
    <div class="ave-simple-table-scroll">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in rows" :key="ri">
            <td v-for="(cell, ci) in row" :key="ci" :class="cell.class">
              {{ cell.text }}
              <span v-if="cell.sub" class="sub">{{ cell.sub }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ave-simple-table-wrap {
  width: 100%;
  border-radius: var(--ave-card-radius);
  overflow: hidden;
  border: 2px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
  background: var(--ave-card-bg);
}
.ave-simple-table-scroll {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
}
th, td {
  padding: 14px 18px;
  text-align: left;
  font-size: var(--ave-body-size);
  line-height: 1.4;
}

/* -- Table header row -- */
thead tr {
  background: var(--ave-accent-bg);
}
thead th {
  font-size: var(--ave-subtitle-size);
  padding: 16px 18px;
  font-weight: 600;
  color: var(--ave-text-primary);
  border-bottom: 2px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
}

/* -- Striped rows -- */
tbody tr:nth-child(odd) {
  background: var(--ave-card-bg);
}
tbody tr:nth-child(even) {
  background: var(--ave-stripe-bg, rgba(0, 0, 0, 0.03));
}
.dark tbody tr:nth-child(even) {
  background: var(--ave-stripe-bg-dark, rgba(255, 255, 255, 0.04));
}

/* -- First column (row labels) -- */
td:first-child {
  color: var(--ave-text-secondary);
  font-weight: 500;
}

/* -- Semantic cell colors -- */
.good { color: var(--ave-color-good); }
.bad { color: var(--ave-color-bad); }
.neutral { color: var(--ave-text-secondary); }
.sub {
  font-size: var(--ave-small-size);
  color: var(--ave-text-muted);
  display: block;
  margin-top: 2px;
}
</style>
