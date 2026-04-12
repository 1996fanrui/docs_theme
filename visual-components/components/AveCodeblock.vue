<!--
  component: AveCodeblock
  structure: macOS-style terminal code block with window chrome dots and syntax highlighting
  notes: Syntax highlight colors are intentionally hardcoded (code theme, not affected by --ave-* variables).
         Each line is an array of segments with optional token type for syntax coloring.
  usage-markdown: |
    <AveCodeblock lang="python" :lines='[
      [{"text":"def ","token":"kw"},{"text":"hello","token":"fn"},{"text":"():"}],
      [{"text":"    return ","token":"kw"},{"text":"\"world\"","token":"str"}]
    ]' />
  usage-json: |
    {
      "component": "AveCodeblock",
      "props": {
        "lang": "python",
        "lines": [
          [{"text":"def ","token":"kw"},{"text":"hello","token":"fn"},{"text":"():"}],
          [{"text":"    return ","token":"kw"},{"text":"\"world\"","token":"str"}]
        ]
      }
    }
-->
<script setup lang="ts">
interface Segment {
  text: string
  token?: 'kw' | 'fn' | 'str' | 'cmt' | 'cls' | 'op' | 'num' | 'param' | 'self' | 'await'
}

defineProps<{
  lang?: string
  lines: Segment[][]
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
      <pre><template v-for="(line, li) in lines" :key="li"><template v-for="(seg, si) in line" :key="si"><span v-if="seg.token" :class="seg.token">{{ seg.text }}</span><template v-else>{{ seg.text }}</template></template>
</template></pre>
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
pre {
  margin: 0;
  font-family: var(--ave-font-family-mono);
  font-size: var(--ave-code-size);
  line-height: 1.65;
  color: #e4e4e8;
  white-space: pre;
  tab-size: 4;
}
/* Syntax colors (code theme, intentionally hardcoded) */
.kw { color: #c792ea; }
.fn { color: #82aaff; }
.str { color: #c3e88d; }
.cmt { color: #676e95; }
.cls { color: #ffcb6b; }
.op { color: #89ddff; }
.num { color: #f78c6c; }
.param { color: #e4e4e8; }
.self { color: #f07178; }
.await { color: #c792ea; font-style: italic; }
</style>
