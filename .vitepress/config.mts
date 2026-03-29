import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

const project = process.env.PROJECT || 'zero-qa'
const projectConfigPath = path.resolve(__dirname, `../projects/${project}.json`)
const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath, 'utf-8'))

export default defineConfig({
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

    nav: [
      { text: 'Docs', link: projectConfig.sidebar?.[0]?.items?.[0]?.link || '/' },
      { text: 'GitHub', link: projectConfig.github },
    ],

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
})
