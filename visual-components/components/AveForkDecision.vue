<!--
  component: AveForkDecision
  structure: Binary decision flow diagram — top question forks into two options with consequences, bottom verdict
  notes: SVG-free implementation using CSS borders for fork lines and arrows.
-->
<script setup lang="ts">
defineProps<{
  question: string
  leftLabel: string
  rightLabel: string
  leftItems: Array<{ name: string; detail: string }>
  rightItems: Array<{ name: string; detail: string }>
  leftConsequence: { icon: string; text: string }
  rightConsequence: { icon: string; text: string }
  leftCross?: string
  rightCross?: string
  verdictMain: string
  verdictSub?: string
}>()
</script>

<template>
  <div class="container">
    <div class="question">
      <div class="question-main">{{ question }}</div>
    </div>

    <div class="fork-area">
      <div class="stem"></div>
      <div class="bar"></div>
      <div class="drop-left"></div>
      <div class="drop-right"></div>
      <div class="label-left">{{ leftLabel }}</div>
      <div class="label-right">{{ rightLabel }}</div>
    </div>

    <div class="paths">
      <div class="path restrict">
        <div v-for="item in leftItems" :key="item.name" class="tool-item">
          <div class="tool-name">{{ item.name }}</div>
          <div class="tool-detail"><code>{{ item.detail }}</code></div>
        </div>
        <div class="consequence">
          <div class="consequence-icon">{{ leftConsequence.icon }}</div>
          <div class="consequence-text restrict-text" v-html="leftConsequence.text"></div>
        </div>
      </div>
      <div class="path full-open">
        <div v-for="item in rightItems" :key="item.name" class="tool-item">
          <div class="tool-name">{{ item.name }}</div>
          <div class="tool-detail"><code>{{ item.detail }}</code></div>
        </div>
        <div class="consequence">
          <div class="consequence-icon">{{ rightConsequence.icon }}</div>
          <div class="consequence-text open-text" v-html="rightConsequence.text"></div>
        </div>
      </div>
    </div>

    <div class="bottom-block">
      <div v-if="leftCross || rightCross" class="crosses-row">
        <div class="cross-col">{{ leftCross }}</div>
        <div class="cross-col">{{ rightCross }}</div>
      </div>
      <div class="verdict">
        <div class="verdict-box">
          <div class="main">{{ verdictMain }}</div>
          <div v-if="verdictSub" class="sub">{{ verdictSub }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 900px; width: 100%; position: relative; }

.question { text-align: center; margin-bottom: 0; }
.question-main {
  display: inline-block;
  font-size: var(--ave-title-size);
  font-weight: 400;
  -webkit-text-stroke: 0.6px var(--ave-text-primary);
  color: var(--ave-text-primary);
  background: var(--ave-card-bg);
  padding: 10px 42px;
  border-radius: var(--ave-card-radius);
}

.fork-area { position: relative; height: 95px; margin-bottom: 0; }
.fork-area .stem { position: absolute; top: 0; left: 50%; width: 3px; height: 59px; background: var(--ave-line-color); transform: translateX(-50%); }
.fork-area .bar { position: absolute; top: 59px; left: 12%; right: 12%; height: 3px; background: var(--ave-line-color); }
.fork-area .drop-left,
.fork-area .drop-right { position: absolute; top: 59px; width: 3px; height: 29px; background: var(--ave-line-color); }
.fork-area .drop-left { left: 12%; }
.fork-area .drop-right { right: 12%; }
.fork-area .drop-left::after,
.fork-area .drop-right::after {
  content: ''; position: absolute; bottom: -7px; left: -5px;
  border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--ave-line-color);
}
.fork-area .label-left,
.fork-area .label-right {
  position: absolute; top: 23px; font-size: var(--ave-body-size); font-weight: 700;
  padding: 2px 8px; border-radius: 6px; background: var(--ave-card-bg); white-space: nowrap;
}
.fork-area .label-left { left: 12%; transform: translateX(16px); color: var(--ave-warm-text); }
.fork-area .label-right { right: 12%; transform: translateX(-16px); color: var(--ave-danger-text-alt); }

.paths { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 8px; }
.path { border-radius: var(--ave-card-radius); padding: 24px 28px; }
.path.restrict { background: var(--ave-warm-bg); border: 2px solid var(--ave-warm-border); }
.path.full-open { background: var(--ave-warm-bg); border: 2px solid var(--ave-danger-border); }
.tool-item { margin-bottom: 14px; }
.tool-item:last-child { margin-bottom: 0; }
.tool-name {
  font-size: var(--ave-body-size); font-weight: 400;
  -webkit-text-stroke: 0.6px var(--ave-text-primary); color: var(--ave-text-primary); margin-bottom: 4px;
}
.tool-detail code {
  background: var(--ave-code-bg); padding: 3px 8px; border-radius: 5px;
  font-size: var(--ave-small-size); font-family: var(--ave-font-family-mono); color: var(--ave-text-secondary);
}
.consequence {
  display: flex; align-items: center; gap: 12px; margin-top: 16px;
  padding-top: 14px; border-top: 1px dashed var(--ave-dashed-border-color);
}
.consequence-icon { font-size: var(--ave-title-size); flex-shrink: 0; }
.consequence-text { font-size: var(--ave-body-size); font-weight: 600; line-height: 1.4; }
.restrict-text { color: var(--ave-warm-text); }
.open-text { color: var(--ave-danger-text-alt); }

.bottom-block { position: relative; display: flex; flex-direction: column; align-items: center; gap: 0; }
.crosses-row { display: flex; width: 100%; margin-bottom: 6px; }
.cross-col { flex: 1; text-align: center; font-size: var(--ave-hero-size); }
.verdict { text-align: center; margin-top: 8px; }
.verdict-box {
  display: inline-block;
  background: var(--ave-danger-bg); border: 2px solid var(--ave-danger-border);
  border-radius: var(--ave-card-radius); padding: 16px 48px;
}
.verdict-box .main {
  font-size: var(--ave-hero-size); font-weight: 400;
  -webkit-text-stroke: 0.6px var(--ave-danger-text); color: var(--ave-danger-text); letter-spacing: 1px; margin-bottom: 4px;
}
.verdict-box .sub { font-size: var(--ave-body-size); color: var(--ave-text-secondary); }
</style>
