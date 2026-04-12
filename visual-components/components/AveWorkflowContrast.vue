<!--
  component: AveWorkflowContrast
  structure: Side-by-side comparison of two workflows — left shows a looping cycle (bad), right shows a linear pipeline (good). Steps are color-coded by actor.
  notes: |
    Left column renders steps in a vertical chain with a visible loop-back arrow from bottom to top.
    Right column renders steps in a straight vertical chain ending at a final checkpoint.
    Each step has an actor field that determines color: "human" = danger/red, "ai" = safe/green.
    Fully data-driven through props.
  usage-markdown: |
    <AveWorkflowContrast
      leftTitle="Before"
      rightTitle="After"
      :leftSteps='[{"icon":"🤖","label":"AI codes","actor":"ai"},{"icon":"👀","label":"I review","actor":"human"}]'
      :rightSteps='[{"icon":"🤖","label":"AI codes","actor":"ai"},{"icon":"🔍","label":"AI reviews","actor":"ai"}]'
      leftResult="❌ Endless loop"
      rightResult="✅ Done"
      loopLabel="repeat"
    />
  usage-json: |
    {
      "component": "AveWorkflowContrast",
      "props": {
        "leftTitle": "Before",
        "rightTitle": "After",
        "leftSteps": [{"icon":"🤖","label":"AI codes","actor":"ai"},{"icon":"👀","label":"I review","actor":"human"}],
        "rightSteps": [{"icon":"🤖","label":"AI codes","actor":"ai"},{"icon":"🔍","label":"AI reviews","actor":"ai"}],
        "leftResult": "❌ Endless loop",
        "rightResult": "✅ Done",
        "loopLabel": "repeat"
      }
    }
-->
<script setup lang="ts">
defineProps<{
  leftTitle: string
  rightTitle: string
  leftSteps: Array<{ icon: string; label: string; actor?: string }>
  rightSteps: Array<{ icon: string; label: string; actor?: string }>
  leftResult: string
  rightResult: string
  loopLabel?: string
}>()
</script>

<template>
  <div class="workflow-contrast">
    <!-- Left: loop workflow -->
    <div class="workflow-column workflow-left">
      <div class="workflow-title workflow-title--bad">{{ leftTitle }}</div>
      <div class="workflow-body">
        <div class="steps-area">
          <div
            v-for="(step, i) in leftSteps"
            :key="i"
            class="step-row"
          >
            <div
              class="step-node"
              :class="{
                'step-node--left-human': step.actor === 'human',
                'step-node--left-ai': step.actor === 'ai' || !step.actor
              }"
            >
              <span class="step-icon">{{ step.icon }}</span>
              <span class="step-label">{{ step.label }}</span>
            </div>
            <div v-if="i < leftSteps.length - 1" class="arrow-down-wrap">
              <svg class="arrow-down" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L12 18 M7 14 L12 20 L17 14" stroke="var(--ave-line-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <!-- Loop-back arrow: pure CSS arc + arrowhead, no SVG stretch -->
        <div class="loop-arrow">
          <div class="loop-track">
            <div class="loop-arrowhead"></div>
          </div>
          <span v-if="loopLabel" class="loop-label">{{ loopLabel }}</span>
        </div>
      </div>
      <div class="workflow-result workflow-result--bad">{{ leftResult }}</div>
    </div>

    <!-- VS divider -->
    <div class="workflow-divider">
      <span class="vs-label">VS</span>
    </div>

    <!-- Right: linear workflow -->
    <div class="workflow-column workflow-right">
      <div class="workflow-title workflow-title--good">{{ rightTitle }}</div>
      <div class="workflow-body">
        <div class="steps-area">
          <div
            v-for="(step, i) in rightSteps"
            :key="i"
            class="step-row"
          >
            <div
              class="step-node"
              :class="{
                'step-node--right-human': step.actor === 'human',
                'step-node--right-ai': step.actor === 'ai' || !step.actor
              }"
            >
              <span class="step-icon">{{ step.icon }}</span>
              <span class="step-label">{{ step.label }}</span>
            </div>
            <div v-if="i < rightSteps.length - 1" class="arrow-down-wrap">
              <svg class="arrow-down" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L12 18 M7 14 L12 20 L17 14" stroke="var(--ave-line-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="workflow-result workflow-result--good">{{ rightResult }}</div>
    </div>
  </div>
</template>

<style scoped>
.workflow-contrast {
  display: flex;
  align-items: stretch;
  gap: 0;
  font-family: var(--ave-font-family);
  max-width: 960px;
  margin: 0 auto;
}

.workflow-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 24px;
  border-radius: var(--ave-card-radius);
}

.workflow-left {
  background: var(--ave-danger-bg);
  border: 2px solid var(--ave-danger-border);
}

.workflow-right {
  background: var(--ave-safe-bg);
  border: 2px solid var(--ave-safe-border);
}

.workflow-divider {
  width: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-label {
  font-size: var(--ave-body-size);
  font-weight: 800;
  color: var(--ave-text-muted);
  letter-spacing: 2px;
}

.workflow-title {
  font-size: var(--ave-subtitle-size);
  font-weight: 700;
  margin-bottom: 24px;
}

.workflow-title--bad {
  color: var(--ave-danger-text);
}

.workflow-title--good {
  color: var(--ave-safe-text);
}

.workflow-body {
  display: flex;
  align-items: stretch;
  flex: 1;
}

.steps-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  background: var(--ave-card-bg);
  border: 1.5px solid var(--ave-border-color);
  min-width: 180px;
  justify-content: center;
}

/* Left column (bad): all nodes red-tinted, human nodes darker red */
.step-node--left-human {
  background: var(--ave-danger-bg);
  border-color: var(--ave-danger-border);
}

.step-node--left-human .step-label {
  color: var(--ave-danger-text);
  font-weight: 700;
}

.step-node--left-ai {
  background: var(--ave-host-bg);
  border-color: var(--ave-host-border);
}

.step-node--left-ai .step-label {
  color: var(--ave-host-text);
  font-weight: 500;
}

/* Right column (good): all nodes green-tinted, human node blue accent */
.step-node--right-ai {
  background: var(--ave-safe-bg);
  border-color: var(--ave-safe-border);
}

.step-node--right-ai .step-label {
  color: var(--ave-safe-text);
  font-weight: 500;
}

.step-node--right-human {
  background: var(--ave-zone-blue-bg);
  border-color: var(--ave-zone-blue-border);
}

.step-node--right-human .step-label {
  color: var(--ave-zone-blue-text);
  font-weight: 600;
}

.step-icon {
  font-size: var(--ave-body-size);
}

.step-label {
  font-size: var(--ave-body-size);
  color: var(--ave-text-primary);
  font-weight: 500;
}

.arrow-down-wrap {
  display: flex;
  justify-content: center;
  padding: 2px 0;
}

.arrow-down {
  width: 24px;
  height: 24px;
}

.loop-arrow {
  position: relative;
  width: 64px;
  margin-left: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
}

.loop-track {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  width: 48px;
  border: 4px dashed var(--ave-color-bad);
  border-left: none;
  border-radius: 0 30px 30px 0;
}

.loop-arrowhead {
  position: absolute;
  top: -10px;
  left: -8px;
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 16px solid var(--ave-color-bad);
}

.loop-label {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-size: var(--ave-small-size);
  color: var(--ave-color-bad);
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.workflow-result {
  margin-top: 24px;
  font-size: var(--ave-body-size);
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 12px;
  text-align: center;
}

.workflow-result--bad {
  color: var(--ave-danger-text);
  background: rgba(220, 38, 38, 0.1);
}

.workflow-result--good {
  color: var(--ave-safe-text);
  background: rgba(16, 185, 129, 0.1);
}
</style>
