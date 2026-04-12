<!--
  component: AveInstance
  structure: Single isolated instance column with name, icon, agent, task and permission badge
  notes: Used inside AveParallelIsolated. Color determines the background palette.
  usage-markdown: |
    <AveInstance name="Agent-1" icon="🤖" agent="Claude" task="Code review" perm="read-only" color="green" />
  usage-json: |
    { "component": "AveInstance", "props": { "name": "Agent-1", "icon": "🤖", "agent": "Claude", "task": "Code review", "perm": "read-only", "color": "green" } }
-->
<script setup lang="ts">
defineProps<{
  name: string
  icon: string
  agent: string
  task: string
  perm: string
  color?: 'green' | 'blue' | 'yellow'
}>()
</script>

<template>
  <div class="sandbox-col" :class="color || 'green'">
    <div class="sandbox-name">{{ name }}</div>
    <div class="sandbox-icon">{{ icon }}</div>
    <div class="sandbox-agent">{{ agent }}</div>
    <div class="sandbox-task">{{ task }}</div>
    <div class="sandbox-perm">{{ perm }}</div>
  </div>
</template>

<style scoped>
.sandbox-col {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  padding: 24px 14px 22px; border-radius: var(--ave-card-radius);
}
.sandbox-col.green { background: var(--ave-instance-green-bg); border: 2px solid var(--ave-instance-green-border); }
.sandbox-col.blue { background: var(--ave-instance-blue-bg); border: 2px solid var(--ave-instance-blue-border); }
.sandbox-col.yellow { background: var(--ave-instance-yellow-bg); border: 2px solid var(--ave-instance-yellow-border); }
.sandbox-name { font-size: var(--ave-body-size); color: var(--ave-text-muted); margin-bottom: 14px; letter-spacing: 0.5px; }
.sandbox-icon { font-size: 50px; margin-bottom: 12px; }
.sandbox-agent {
  font-size: var(--ave-subtitle-size); -webkit-text-stroke: 0.4px currentColor;
  color: var(--ave-text-primary); margin-bottom: 6px; text-align: center;
}
.sandbox-task { font-size: var(--ave-subtitle-size); color: var(--ave-text-secondary); text-align: center; line-height: 1.4; }
.sandbox-perm {
  margin-top: 16px; font-size: var(--ave-small-size); color: var(--ave-instance-perm-text);
  background: var(--ave-instance-perm-bg); padding: 6px 16px; border-radius: 8px;
}
</style>
