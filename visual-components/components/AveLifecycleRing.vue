<!--
  component: AveLifecycleRing + AveNode
  structure: Circular lifecycle diagram with 4 icon nodes, connecting arrows, and center text
  notes: Uses SVG for circular arrows. AveNode children positioned absolutely around the ring.
-->
<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  centerLine1: string
  centerLine2?: string
}>()
</script>

<template>
  <div class="container">
    <div class="title-card"><span>{{ title }}</span></div>
    <div v-if="subtitle" class="subtitle-wrap">
      <div class="subtitle">{{ subtitle }}</div>
    </div>

    <div class="cycle-wrap">
      <svg width="560" height="560" viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" class="cycle-svg">
        <defs>
          <marker id="ah" markerWidth="7" markerHeight="6" refX="1" refY="3" orient="auto">
            <polygon points="0 0.5, 7 3, 0 5.5" fill="#999" />
          </marker>
        </defs>
        <circle cx="280" cy="280" r="140" fill="rgba(200, 200, 200, 0.06)" />
        <path d="M 339 153 A 140 140 0 0 1 407 221" fill="none" stroke="#999" stroke-width="3" stroke-linecap="round" marker-end="url(#ah)" />
        <path d="M 407 339 A 140 140 0 0 1 339 407" fill="none" stroke="#999" stroke-width="3" stroke-linecap="round" marker-end="url(#ah)" />
        <path d="M 221 407 A 140 140 0 0 1 153 339" fill="none" stroke="#999" stroke-width="3" stroke-linecap="round" marker-end="url(#ah)" />
        <path d="M 153 221 A 140 140 0 0 1 221 153" fill="none" stroke="#999" stroke-width="3" stroke-linecap="round" marker-end="url(#ah)" />
      </svg>

      <slot />

      <div class="center-circle">
        <div class="line1">{{ centerLine1 }}</div>
        <div v-if="centerLine2" class="line2" v-html="centerLine2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 640px; width: 100%; }

.title-card { text-align: center; margin-bottom: 8px; }
.title-card span {
  display: inline-block; font-size: var(--ave-title-size); -webkit-text-stroke: 0.6px var(--ave-text-primary);
  color: var(--ave-text-primary); background: var(--ave-card-bg);
  padding: 14px 36px; border-radius: 14px;
}
.subtitle-wrap { text-align: center; margin-bottom: 6px; }
.subtitle {
  display: inline-block; font-size: var(--ave-subtitle-size); color: var(--ave-text-secondary);
  background: var(--ave-card-bg-light); padding: 6px 20px; border-radius: 10px;
}

.cycle-wrap {
  position: relative; width: 560px; height: 560px;
  margin: -28px auto 0; transform: scale(1.10); transform-origin: top center;
}
.cycle-svg { position: absolute; top: 0; left: 0; }

.center-circle {
  position: absolute; width: 160px; height: 160px; border-radius: 50%;
  background: var(--ave-card-bg); top: 200px; left: 200px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; z-index: 2; padding: 10px; box-sizing: border-box;
}
.center-circle .line1 {
  font-size: var(--ave-subtitle-size); -webkit-text-stroke: 0.4px var(--ave-text-primary);
  color: var(--ave-text-primary); margin-bottom: 4px;
}
.center-circle .line2 {
  font-size: var(--ave-small-size); color: var(--ave-text-secondary); line-height: 1.4;
}
</style>
