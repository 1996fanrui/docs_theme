<!--
  component: AveCompareTable
  structure: Multi-column comparison table with highlight/dim/good/bad styling
  notes: Fully data-driven through props. Each column and cell supports semantic classes.
  usage-markdown: |
    <AveCompareTable
      :columns='[{"label":"Feature"},{"label":"Ours","class":"highlight"},{"label":"Other","class":"dim"}]'
      :rows='[
        [{"text":"Speed"},{"text":"Fast","class":"highlight good"},{"text":"Slow","class":"dim bad"}],
        [{"text":"Cost"},{"text":"$10","class":"highlight"},{"text":"$50","class":"dim"}]
      ]'
    />
  usage-json: |
    {
      "component": "AveCompareTable",
      "props": {
        "columns": [{"label":"Feature"},{"label":"Ours","class":"highlight"},{"label":"Other","class":"dim"}],
        "rows": [
          [{"text":"Speed"},{"text":"Fast","class":"highlight good"},{"text":"Slow","class":"dim bad"}],
          [{"text":"Cost"},{"text":"$10","class":"highlight"},{"text":"$50","class":"dim"}]
        ]
      }
    }
  layout-constraints: |
    - columns: 2-5 (3 recommended: 1 label + 2 comparison; beyond 5 cells get cramped at min-width 500px)
    - rows: 3-10 (5-7 recommended; no max-height, long tables push content down)
    - column header label: max ~20 chars EN / ~10 chars CJK
    - cell text: max ~30 chars EN / ~15 chars CJK (longer text wraps within cell)
    - cell sub: max ~40 chars EN / ~20 chars CJK (smaller font, displayed below main text)
    - first column acts as row label; keep it concise: max ~15 chars EN / ~8 chars CJK
    - highlight column: 1 recommended (the "recommended" option); dim columns for competitors
    - recommended viewport width: ≥768px (horizontal scroll activates below 500px)
-->
<script setup lang="ts">
interface Column {
  label: string
  class?: string
}

interface Cell {
  text: string
  sub?: string
  class?: string
}

defineProps<{
  columns: Column[]
  rows: Cell[][]
}>()
</script>

<template>
  <div class="ave-table-wrap">
    <div class="ave-table-scroll">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.label" :class="col.class">{{ col.label }}</th>
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
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}
th, td {
  padding: 14px 18px;
  text-align: left;
  font-size: var(--ave-body-size);
  line-height: 1.4;
}

/* -- Table header row -- */
thead th {
  font-size: var(--ave-subtitle-size);
  padding: 16px 18px;
  font-weight: 600;
  color: var(--ave-text-primary);
  border-bottom: 2px solid var(--ave-border-color, rgba(0, 0, 0, 0.06));
}

/* -- Data rows: alternating background -- */
tbody tr:nth-child(odd) {
  background: var(--ave-card-bg);
}
tbody tr:nth-child(even) {
  background: var(--ave-card-bg-light);
}

/* -- First column (row labels) -- */
th:first-child {
  color: var(--ave-text-muted);
  font-weight: 400;
}
td:first-child {
  color: var(--ave-text-secondary);
  font-weight: 500;
}

/* -- Highlight column (recommended) -- */
th.highlight {
  color: var(--ave-accent-contrast, #fff);
  background: var(--ave-accent);
}
td.highlight {
  background: var(--ave-accent-bg);
  color: var(--ave-text-primary);
  font-weight: 500;
}

/* -- Dim column (competitors) -- */
th.dim { color: var(--ave-text-muted); font-weight: 400; }
td.dim { color: var(--ave-text-muted); }

/* -- Semantic cell colors -- */
.good { color: var(--ave-color-good); }
.bad { color: var(--ave-color-bad); }
td.good { background: rgba(16, 185, 129, 0.08); }
td.bad { background: rgba(220, 38, 38, 0.08); }
td.highlight.good { background: rgba(16, 185, 129, 0.12); }
td.dim.bad { background: rgba(220, 38, 38, 0.06); }
.neutral { color: var(--ave-text-secondary); }
.sub {
  font-size: var(--ave-small-size);
  color: var(--ave-text-muted);
  display: block;
  margin-top: 2px;
}
</style>
