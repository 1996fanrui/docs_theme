<!--
  component: AveParallelIsolated + AveInstance
  structure: N parallel independent instances with isolation walls between them
  notes: AveInstance children in default slot. Walls auto-generated between instances.
-->
<script setup lang="ts">
import { useSlots, computed } from 'vue'

defineProps<{
  title: string
  subtitle?: string
  note?: string
}>()

const slots = useSlots()
const children = computed(() => {
  const vnodes = slots.default?.() || []
  // Filter out text nodes and comments, keep only component vnodes
  return vnodes.filter(v => typeof v.type !== 'symbol')
})
</script>

<template>
  <div class="container">
    <div class="title-card"><span>{{ title }}</span></div>
    <div v-if="subtitle" class="subtitle-wrap">
      <div class="subtitle">{{ subtitle }}</div>
    </div>

    <div class="sandboxes">
      <template v-for="(child, i) in children" :key="i">
        <component :is="child" />
        <div v-if="i < children.length - 1" class="wall">
          <div class="wall-line"></div>
          <div class="wall-line"></div>
          <div class="wall-icon">🔒</div>
          <div class="wall-line"></div>
          <div class="wall-line"></div>
        </div>
      </template>
    </div>

    <div v-if="note" class="note"><span>{{ note }}</span></div>
  </div>
</template>

<style scoped>
.container { max-width: 860px; width: 100%; }

.title-card { text-align: center; margin-bottom: 8px; }
.title-card span {
  display: inline-block; font-size: var(--ave-title-size); -webkit-text-stroke: 0.6px var(--ave-text-primary);
  color: var(--ave-text-primary); background: var(--ave-card-bg);
  padding: 14px 36px; border-radius: 14px;
}
.subtitle-wrap { text-align: center; margin-bottom: 24px; }
.subtitle {
  display: inline-block; font-size: var(--ave-subtitle-size); color: var(--ave-text-secondary);
  background: var(--ave-card-bg-light); padding: 6px 20px; border-radius: 10px;
}

.sandboxes { display: flex; align-items: stretch; gap: 0; max-width: 780px; margin: 0 auto; }

.wall {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 36px; flex-shrink: 0; gap: 5px;
}
.wall-line { width: 3px; height: 20px; background: var(--ave-border-color, #ddd); border-radius: 2px; }
.wall-icon { font-size: 24px; }

.note { text-align: center; margin-top: 18px; }
.note span {
  display: inline-block; font-size: var(--ave-body-size); color: var(--ave-text-secondary);
  -webkit-text-stroke: 0.3px var(--ave-text-secondary); background: var(--ave-card-bg);
  padding: 10px 28px; border-radius: 12px;
}
</style>
