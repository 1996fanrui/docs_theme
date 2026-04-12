<!--
  component: AveNestedBoundary
  structure: Nested container diagram — outer boundary (host) containing inner isolated element (sandbox)
  notes: Fully data-driven through props. Each item has icon, badge, title and description.
  usage-markdown: |
    <AveNestedBoundary hostLabel="🖥️ Host" hostSubtitle="Accessible resources"
                       sandboxLabel="🔒 Sandbox" isolationLabel="Isolation Boundary"
      :hostItems='[
        {"icon":"📁","badge":"blocked","title":"File System","desc":"Restricted access"},
        {"icon":"🌐","badge":"allowed","title":"Network","desc":"Allowed with limits"}
      ]'
      :sandboxItems='[
        {"icon":"📦","badge":"clean","title":"Dependencies","desc":"Clean environment"},
        {"icon":"⚙️","badge":"inject","title":"Config","desc":"Injected at start"}
      ]'
    />
  usage-json: |
    {
      "component": "AveNestedBoundary",
      "props": {
        "hostLabel": "🖥️ Host",
        "hostSubtitle": "Accessible resources",
        "sandboxLabel": "🔒 Sandbox",
        "isolationLabel": "Isolation Boundary",
        "hostItems": [
          {"icon":"📁","badge":"blocked","title":"File System","desc":"Restricted access"},
          {"icon":"🌐","badge":"allowed","title":"Network","desc":"Allowed with limits"}
        ],
        "sandboxItems": [
          {"icon":"📦","badge":"clean","title":"Dependencies","desc":"Clean environment"},
          {"icon":"⚙️","badge":"inject","title":"Config","desc":"Injected at start"}
        ]
      }
    }
-->
<script setup lang="ts">
interface BoundaryItem {
  icon: string
  badge: 'blocked' | 'inject' | 'allowed' | 'clean'
  title: string
  desc: string
}

defineProps<{
  hostLabel: string
  hostSubtitle?: string
  sandboxLabel: string
  isolationLabel?: string
  hostItems: BoundaryItem[]
  sandboxItems: BoundaryItem[]
}>()
</script>

<template>
  <div class="host">
    <div class="host-label">{{ hostLabel }}</div>
    <div class="content">
      <div class="host-items">
        <div v-if="hostSubtitle" class="host-subtitle">{{ hostSubtitle }}</div>
        <div v-for="item in hostItems" :key="item.title" class="boundary-item">
          <div class="icon-badge" :class="item.badge">{{ item.icon }}</div>
          <div><strong>{{ item.title }}</strong><br />{{ item.desc }}</div>
        </div>
      </div>

      <div class="isolation-border">
        <div v-if="isolationLabel" class="isolation-label">{{ isolationLabel }}</div>
        <div class="sandbox">
          <div class="sandbox-label">{{ sandboxLabel }}</div>
          <div class="sandbox-items">
            <div v-for="item in sandboxItems" :key="item.title" class="boundary-item">
              <div class="icon-badge" :class="item.badge">{{ item.icon }}</div>
              <div><strong>{{ item.title }}</strong><br />{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.host {
  border-radius: var(--ave-card-radius);
  background: var(--ave-zone-blue-bg);
  border: 2px solid var(--ave-zone-blue-border);
  padding: 28px;
}
.host-label {
  font-size: var(--ave-title-size); font-weight: 600; color: var(--ave-zone-blue-text);
  margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
}
.content { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; padding-top: 8px; }

.host-items {
  display: flex; flex-direction: column; gap: 6px; justify-content: center; min-width: 0;
}
.host-subtitle {
  font-size: var(--ave-body-size); color: var(--ave-text-muted);
  margin-bottom: 2px; -webkit-text-stroke: 0.3px var(--ave-text-muted);
}

.isolation-border {
  border: 3px dashed var(--ave-danger-border);
  border-radius: 14px; padding: 4px; position: relative; min-width: 0;
}
.isolation-label {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  background: var(--ave-zone-blue-bg-solid); padding: 2px 16px;
  font-size: var(--ave-body-size); color: var(--ave-color-bad); font-weight: 600;
  border-radius: 8px; white-space: nowrap;
}

.sandbox {
  border-radius: var(--ave-card-radius);
  background: var(--ave-zone-green-bg);
  border: 2px solid var(--ave-zone-green-border);
  padding: 24px; height: 100%; box-sizing: border-box;
}
.sandbox-label {
  font-size: var(--ave-title-size); font-weight: 600; color: var(--ave-zone-green-text);
  margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
}
.sandbox-items { display: flex; flex-direction: column; gap: 6px; }

/* -- Boundary item (inline, no longer a separate component dependency) -- */
.boundary-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: var(--ave-subtitle-size);
  line-height: 1.4;
  color: var(--ave-text-secondary);
  word-break: break-word;
}
.icon-badge {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}
.blocked { background: var(--ave-badge-blocked); }
.inject { background: var(--ave-badge-inject); }
.allowed { background: var(--ave-badge-allowed); }
.clean { background: var(--ave-badge-clean); }
.boundary-item strong { font-weight: 600; color: var(--ave-text-primary); }
</style>
