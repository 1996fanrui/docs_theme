import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'fs'
import path from 'path'

const project = process.env.PROJECT || 'zero-qa'
// theme.json is copied from the project repo's docs/theme.json into .docs-src/<project>/theme.json
// by the build/dev scripts before vitepress starts.
const projectConfigPath = path.resolve(__dirname, `../.docs-src/${project}/theme.json`)
const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath, 'utf-8'))

export default withMermaid(defineConfig({
  title: projectConfig.name,
  description: projectConfig.description,
  base: projectConfig.base || '/',
  ignoreDeadLinks: true,
  cleanUrls: true,

  vite: {
    server: {
      allowedHosts: true,
    },
  },

  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;600;700&family=Fragment+Mono:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap' }],
  ],

  themeConfig: {
    siteTitle: projectConfig.name,

    nav: [],

    sidebar: projectConfig.sidebar,

    socialLinks: [
      { icon: 'github', link: projectConfig.github },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },

  // Mermaid diagram rendering
  mermaid: {},
}))
