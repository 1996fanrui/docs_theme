#!/usr/bin/env node

// Usage: node visual-components/scripts/render.mjs --data data.json --style ave-variables.css --output output.html
//
// Renders Vue visual components to static HTML using Vite SSR.
// Input: JSON file describing the component tree (see README.md for format).
// Output: Complete HTML file with CSS link, ready for screenshot tools.

import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parseArgs } from 'util'

const __dirname = dirname(fileURLToPath(import.meta.url))
const componentsDir = resolve(__dirname, '../components')

const { values } = parseArgs({
  options: {
    data: { type: 'string' },
    style: { type: 'string' },
    output: { type: 'string' },
  },
})

if (!values.data || !values.style || !values.output) {
  console.error('Usage: node render.mjs --data <json> --style <css> --output <html>')
  process.exit(1)
}

const data = JSON.parse(readFileSync(values.data, 'utf-8'))
const stylePath = resolve(values.style)
const outputPath = resolve(values.output)

// Start Vite in middleware mode for SFC compilation
const vite = await createServer({
  plugins: [vue()],
  server: { middlewareMode: true },
  appType: 'custom',
  root: resolve(__dirname, '../..'),
  logLevel: 'error',
})

async function loadComponent(name) {
  const modulePath = resolve(componentsDir, `${name}.vue`)
  const mod = await vite.ssrLoadModule(modulePath)
  return mod.default
}

// Collect CSS from all loaded modules in Vite's module graph
function collectStyles() {
  const styles = []
  const seen = new Set()
  for (const [id, mod] of vite.moduleGraph.idToModuleMap) {
    if (seen.has(id)) continue
    seen.add(id)
    // CSS modules loaded by Vite have the transformed CSS in ssrModule
    if (id.includes('.vue') && id.includes('type=style')) {
      const ssrMod = vite.moduleGraph.getModuleById(id)
      if (ssrMod?.ssrModule?.default) {
        styles.push(ssrMod.ssrModule.default)
      }
    }
  }
  return styles.join('\n')
}

// Build a Vue VNode tree from the JSON data
function buildVNode(node) {
  // node: { component, props, slot?, children? }
  const Component = node._resolved
  const children = []

  if (node.slot) {
    children.push(node.slot)
  }
  if (node.children) {
    for (const child of node.children) {
      children.push(buildVNode(child))
    }
  }

  return h(Component, node.props || {}, () => children)
}

// Resolve all component references in the tree
async function resolveTree(node) {
  const comp = await loadComponent(node.component)
  if (!comp) {
    throw new Error(`Component not found: ${node.component}`)
  }
  node._resolved = comp
  if (node.children) {
    for (const child of node.children) {
      await resolveTree(child)
    }
  }
}

try {
  await resolveTree(data)

  const app = createSSRApp({
    render() {
      return buildVNode(data)
    },
  })

  const html = await renderToString(app)
  const inlineStyles = collectStyles()

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="${stylePath}">
  <style>${inlineStyles}</style>
</head>
<body>${html}</body>
</html>`

  writeFileSync(outputPath, fullHtml, 'utf-8')
  console.log(`Rendered to ${outputPath}`)
} catch (err) {
  console.error('Render failed:', err.message)
  process.exit(1)
} finally {
  await vite.close()
}
