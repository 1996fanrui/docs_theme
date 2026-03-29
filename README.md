# docs-theme

Shared documentation theme repository that provides a unified VitePress-based documentation site for multiple projects.

## Architecture

Uses an N+1 repository model:

- **N project repositories**: each maintains its own code, docs, and `docs/theme.json`
- **1 docs-theme repository** (this repo): owns only the rendering theme and build scripts

### Convention: project config files

Each project repository provides config files that this repo's build and deploy scripts consume.

```
project-repo/
├── docs/
│   ├── theme.json               # ← required for docs: VitePress config
│   ├── architecture_overview.md
│   └── ...
├── website/                     # ← optional: standalone website (landing page, etc.)
│   ├── site.json                # ← required if website/ exists: deploy config
│   └── index.html
└── ...
```

#### `docs/theme.json` — docs site config

**Fixed path and name**: `docs/theme.json` — no other location or filename is accepted.

```json
{
  "name": "My Project",
  "docsDir": "docs",
  "base": "/",
  "description": "Short description",
  "accent": "#3B82F6",
  "github": "https://github.com/org/repo",
  "cfPagesProject": "my-project-docs",
  "sidebar": [...]
}
```

#### `website/site.json` — website deploy config

**Fixed path and name**: `website/site.json` — no other location or filename is accepted.

```json
{
  "name": "My Project",
  "cfPagesProject": "my-project",
  "url": "https://my-project.com"
}
```

The website is deployed as-is (pure static files), no build step required.

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

Each project has independent Cloudflare Pages projects. The GitHub Actions workflow (`deploy.yml`) supports two deploy types:

- **docs**: builds VitePress from `docs/theme.json` + `docs/*.md`, deploys the rendered output
- **website**: deploys the `website/` directory as-is (pure static files, no build)

## Theme design

All projects share the same base layout and interactions. Each project customizes via `docs/theme.json`:
- `accent` color
- Project name
- Sidebar structure
- GitHub repository link

Base styles are fixed across all projects (fonts, sizes, spacing, background, code block style, dark mode, etc.).
