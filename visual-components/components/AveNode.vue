<!--
  component: AveNode
  structure: Single lifecycle node with icon circle and label, positioned around a ring
  notes: Used inside AveLifecycleRing. Position (top/right/bottom/left) and color determine placement.
  usage-markdown: |
    <AveNode icon="📝" label="Plan" position="top" color="blue" />
  usage-json: |
    { "component": "AveNode", "props": { "icon": "📝", "label": "Plan", "position": "top", "color": "blue" } }
-->
<script setup lang="ts">
const positionStyles: Record<string, { icon: Record<string, string>; label: Record<string, string> }> = {
  top: {
    icon: { left: '246px', top: '106px' },
    label: { left: '280px', top: '52px', transform: 'translateX(-50%)' },
  },
  right: {
    icon: { left: '386px', top: '246px' },
    label: { left: '462px', top: '260px' },
  },
  bottom: {
    icon: { left: '246px', top: '386px' },
    label: { left: '280px', top: '462px', transform: 'translateX(-50%)' },
  },
  left: {
    icon: { left: '106px', top: '246px' },
    label: { right: 'calc(100% - 100px)', top: '260px' },
  },
}

const colorMap: Record<string, string> = {
  green: 'rgba(52, 168, 83, 0.75)',
  blue: 'rgba(91, 155, 213, 0.75)',
  yellow: 'rgba(244, 180, 0, 0.75)',
  orange: 'rgba(232, 113, 26, 0.75)',
}

const props = defineProps<{
  icon: string
  label: string
  position: 'top' | 'right' | 'bottom' | 'left'
  color: 'green' | 'blue' | 'yellow' | 'orange'
}>()

const styles = positionStyles[props.position]
const bgColor = colorMap[props.color]
</script>

<template>
  <div class="icon-node" :style="{ ...styles.icon, background: bgColor }">{{ icon }}</div>
  <div class="label-node" :style="styles.label">{{ label }}</div>
</template>

<style scoped>
.icon-node {
  position: absolute; width: 68px; height: 68px;
  display: flex; align-items: center; justify-content: center;
  font-size: 40px; border-radius: 50%; z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.label-node {
  position: absolute; font-size: var(--ave-subtitle-size); color: var(--ave-text-secondary);
  -webkit-text-stroke: 0.3px var(--ave-text-secondary);
  background: var(--ave-card-bg); padding: 5px 14px; border-radius: 8px;
  white-space: nowrap; z-index: 2;
}
</style>
