# docs-theme

Shared documentation theme repository that provides a unified VitePress-based documentation site for multiple projects.

## Architecture

Uses an N+1 repository model:

- **N project repositories**: each maintains its own code, docs, and `docs/theme.json`
- **1 docs-theme repository** (this repo): owns only the rendering theme and build scripts

### Convention: `docs/theme.json` in each project

Every project using this shared theme **must** provide a `docs/theme.json` at the root of its repository. This is the single source of truth for that project's VitePress configuration.

**Fixed path and name**: `docs/theme.json` — no other location or filename is accepted.

```
project-repo/
├── docs/
│   ├── theme.json               # ← required: VitePress config (colors, title, sidebar)
│   ├── architecture_overview.md
│   ├── configuration_reference.md
│   └── ...
└── ...
```

`theme.json` schema:

```json
{
  "name": "My Project",
  "docsDir": "docs",
  "base": "/",
  "description": "Short description",
  "accent": "#3B82F6",
  "github": "https://github.com/org/repo",
  "cfPagesProject": "my-project-docs",
  "sidebar": [
    {
      "text": "Getting Started",
      "items": [
        { "text": "Architecture Overview", "link": "/architecture_overview" }
      ]
    }
  ]
}
```

### This repository's structure

```
docs-theme/
├── .vitepress/
│   ├── config.mts           # VitePress config (reads .docs-src/<project>/theme.json)
│   └── theme/
│       ├── index.ts         # Custom theme entry point
│       └── style.css        # Unified documentation styles
├── scripts/
│   ├── dev.sh               # Local dev server
│   └── build.sh             # Production build
├── package.json
└── README.md
```

## Usage

### Local development

```bash
# Start the VitePress dev server (reads from a local repo path)
./scripts/dev.sh <project-name> /path/to/project-repo
```

### Build

```bash
# Build using a local repo path
./scripts/build.sh <project-name> /path/to/project-repo

# Build by cloning from GitHub (github.com/1996fanrui/<project-name>)
./scripts/build.sh <project-name>
```

### Deploy to Cloudflare Pages

Each project's docs site is an independent Cloudflare Pages project. The build process:
1. The build script reads `docs/theme.json` and `docs/*.md` from the project repo
2. VitePress renders them into static HTML using this repository's theme
3. The output is deployed to Cloudflare Pages

The GitHub Actions workflow (`deploy.yml`) handles this automatically: it checks out the target project, then calls `./scripts/build.sh <project> .target-repo`.

## Theme design

All projects share the same base layout and interactions. Each project customizes via `docs/theme.json`:
- `accent` color
- Project name
- Sidebar structure
- GitHub repository link

Base styles are fixed across all projects (fonts, sizes, spacing, background, code block style, dark mode, etc.).
