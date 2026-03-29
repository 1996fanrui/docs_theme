# docs-theme

Shared documentation theme repository that provides a unified VitePress-based documentation site for multiple projects.

## Architecture

Uses an N+1 repository model:

- **N project repositories**: each maintains its own code, docs, and landing page
- **1 docs-theme repository** (this repo): owns only the rendering theme and build scripts

### Directory convention for each project repository

```
project-repo/
├── docs/                    # Plain Markdown files (flat layout, no theme config mixed in)
│   ├── architecture_overview.md
│   ├── configuration_reference.md
│   └── ...
├── website/                 # Website-related assets
│   ├── landing/
│   │   └── index.html       # Product landing page (deployed directly to Cloudflare Pages)
│   ├── theme.json           # Project-specific theme config (colors, title, sidebar structure)
│   └── public/
│       └── logo.svg         # Project logo
├── src/                     # Project source code
└── ...
```

### This repository's structure

```
docs-theme/
├── .vitepress/
│   ├── config.mts           # VitePress config (dynamically reads project config)
│   └── theme/
│       ├── index.ts          # Custom theme entry point
│       └── style.css         # Unified documentation styles
├── scripts/
│   ├── dev.sh               # Local dev: reads docs from a local repo path
│   └── build.sh             # Build: clones docs from a remote repo and builds
├── projects/                # Per-project configuration files
│   ├── zero-qa.json
│   └── agents-sandbox.json
├── package.json
└── README.md
```

## Usage

### Local development

```bash
# Start the VitePress dev server for zero-qa (reads from a local repo)
./scripts/dev.sh zero-qa /path/to/zero-qa

# Start the VitePress dev server for agents-sandbox
./scripts/dev.sh agents-sandbox /path/to/agents-sandbox
```

### Build

```bash
# Build the zero-qa documentation site
./scripts/build.sh zero-qa

# Build the agents-sandbox documentation site
./scripts/build.sh agents-sandbox
```

### Deploy to Cloudflare Pages

Each project's docs site is an independent Cloudflare Pages project. The build process:
1. The build script fetches `docs/` from the project's main repository
2. VitePress renders it into static HTML using this repository's theme
3. The output is deployed to Cloudflare Pages

## Sidebar grouping

Files under `docs/` are stored flat. Sidebar grouping is defined in the project's `projects/<name>.json` (or `website/theme.json` in the project repo):

```json
{
  "sidebar": [
    {
      "text": "Getting Started",
      "items": [
        { "text": "Architecture Overview", "link": "/architecture_overview" }
      ]
    },
    {
      "text": "Design",
      "items": [
        { "text": "State Management", "link": "/daemon_state_management" }
      ]
    }
  ]
}
```

Files are flat on disk but appear grouped in the UI.

## Cloudflare deployment domains

| Project        | Landing domain        | Docs domain                | Source              |
|----------------|-----------------------|----------------------------|---------------------|
| Zero QA        | zero-qa.com           | docs.zero-qa.com           | zero-qa repo docs/  |
| Agents Sandbox | agents-sandbox.com    | docs.agents-sandbox.com    | agents-sandbox repo docs/ |

## Theme design

All projects share the same base layout and interactions. Each project customizes via its config:
- `accent` color
- Project name and logo
- Sidebar structure
- GitHub repository link

Base styles are fixed across all projects (fonts, sizes, spacing, background, code block style, dark mode, etc.).
