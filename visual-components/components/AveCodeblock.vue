<!--
  component: AveCodeblock
  structure: macOS-style terminal code block with window chrome dots and syntax highlighting
  notes: Syntax highlight colors are intentionally hardcoded (code theme, not affected by --ave-* variables).
-->
<script setup lang="ts">
defineProps<{
  lang?: string
}>()
</script>

<template>
  <div class="ave-code-card">
    <div class="top-bar">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div v-if="lang" class="lang-label">{{ lang }}</div>
    </div>
    <div class="code-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ave-code-card {
  max-width: 720px;
  width: 100%;
  border-radius: var(--ave-card-radius);
  overflow: hidden;
  background: rgba(30, 30, 36, 0.75);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}
.top-bar {
  display: flex;
  align-items: center;
  padding: 12px 18px;
  background: rgba(42, 42, 50, 0.75);
  gap: 8px;
}
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }
.lang-label {
  margin-left: auto;
  font-size: var(--ave-small-size);
  color: rgba(255, 255, 255, 0.4);
  font-family: var(--ave-font-family-mono);
}
.code-body { padding: 20px 22px; overflow-x: auto; }
.code-body :deep(pre) {
  margin: 0;
  font-family: var(--ave-font-family-mono);
  font-size: var(--ave-code-size);
  line-height: 1.65;
  color: #e4e4e8;
  white-space: pre;
  tab-size: 4;
}
/* Syntax colors (code theme, intentionally hardcoded) */
.code-body :deep(.kw) { color: #c792ea; }
.code-body :deep(.fn) { color: #82aaff; }
.code-body :deep(.str) { color: #c3e88d; }
.code-body :deep(.cmt) { color: #676e95; }
.code-body :deep(.cls) { color: #ffcb6b; }
.code-body :deep(.op) { color: #89ddff; }
.code-body :deep(.num) { color: #f78c6c; }
.code-body :deep(.param) { color: #e4e4e8; }
.code-body :deep(.self) { color: #f07178; }
.code-body :deep(.await) { color: #c792ea; font-style: italic; }
</style>
