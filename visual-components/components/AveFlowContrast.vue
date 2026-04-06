<!--
  component: AveFlowContrast
  structure: Vertical comparison of the same task in two scenarios (before/after pattern)
  notes: Fully data-driven through props, no named slots. Each row is a pipeline of steps.
-->
<script setup lang="ts">
interface FlowStep {
  icon: string
  label: string
  type: 'step' | 'interrupt'
}

defineProps<{
  title: string
  subtitle?: string
  hostLabel: string
  sandboxLabel: string
  hostSteps: FlowStep[]
  sandboxSteps: FlowStep[]
  hostResult: string
  sandboxResult: string
}>()
</script>

<template>
  <div class="container">
    <div class="title-card"><span>{{ title }}</span></div>
    <div v-if="subtitle" class="subtitle-wrap">
      <div class="subtitle">{{ subtitle }}</div>
    </div>

    <div class="row host">
      <div class="row-inner">
        <div class="row-header"><div class="row-label">{{ hostLabel }}</div></div>
        <div class="pipeline">
          <template v-for="(step, i) in hostSteps" :key="i">
            <div v-if="step.type === 'step'" class="step host-step">
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-label">{{ step.label }}</div>
            </div>
            <div v-else class="interrupt">
              <div class="hand">🖐️</div>
              <div class="interrupt-txt">{{ step.label }}</div>
            </div>
          </template>
        </div>
        <div class="result"><span class="host-result">{{ hostResult }}</span></div>
      </div>
    </div>

    <div class="row sandbox">
      <div class="row-inner">
        <div class="row-header"><div class="row-label sandbox-label">{{ sandboxLabel }}</div></div>
        <div class="pipeline">
          <template v-for="(step, i) in sandboxSteps" :key="i">
            <div v-if="step.type === 'step'" class="step sandbox-step">
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-label">{{ step.label }}</div>
            </div>
            <div v-else class="smooth-arrow">
              <div class="line"></div>
              <div class="check">✅</div>
              <div class="line"></div>
              <div class="head"></div>
            </div>
          </template>
        </div>
        <div class="result"><span class="sandbox-result">{{ sandboxResult }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 940px; width: 100%; }

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

.row { margin-bottom: 24px; display: flex; flex-direction: column; align-items: center; }
.row-inner { display: inline-flex; flex-direction: column; }
.row-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.row-label {
  font-size: var(--ave-body-size); -webkit-text-stroke: 0.4px currentColor;
  padding: 8px 20px; border-radius: 10px; white-space: nowrap;
  background: var(--ave-host-bg); color: var(--ave-host-text);
}
.sandbox-label { background: var(--ave-safe-bg); color: var(--ave-safe-text); }

.pipeline { display: flex; align-items: center; justify-content: center; gap: 0; }
.step {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 6px; border-radius: 10px; white-space: nowrap; width: 110px;
}
.host-step { background: var(--ave-host-bg); border: 1.5px solid var(--ave-host-border); }
.sandbox-step { background: var(--ave-safe-bg); border: 1.5px solid var(--ave-safe-border); }
.step-icon { font-size: var(--ave-subtitle-size); }
.step-label { font-size: var(--ave-body-size); color: var(--ave-text-secondary); }

.interrupt {
  display: flex; flex-direction: column; align-items: center;
  padding: 0 10px; flex-shrink: 0; min-width: 60px;
}
.hand { font-size: var(--ave-body-size); }
.interrupt-txt { font-size: var(--ave-body-size); color: var(--ave-color-bad); -webkit-text-stroke: 0.3px var(--ave-color-bad); }

.smooth-arrow {
  display: flex; align-items: center; justify-content: center;
  padding: 0 10px; flex-shrink: 0; min-width: 60px;
}
.line { width: 16px; height: 3px; background: var(--ave-safe-line); border-radius: 2px; }
.check { font-size: 16px; margin: 0 1px; }
.head {
  width: 0; height: 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 7px solid var(--ave-safe-line);
}

.result { text-align: center; margin-top: 12px; }
.result span {
  display: inline-block; font-size: var(--ave-body-size);
  padding: 10px 28px; border-radius: 12px; -webkit-text-stroke: 0.3px currentColor;
}
.host-result { background: var(--ave-host-bg); color: var(--ave-host-text); }
.sandbox-result { background: var(--ave-safe-bg); color: var(--ave-safe-text); }
</style>
