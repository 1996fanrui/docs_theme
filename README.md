# docs-theme

共享文档主题仓库，为多个项目提供统一的文档站点构建能力。

## 架构

采用 N+1 仓库模式：

- **N 个项目主仓库**：各自维护代码、文档、主页
- **1 个 docs-theme 仓库**（本仓库）：只管文档的渲染风格和构建脚本

### 每个项目主仓库的目录约定

```
project-repo/
├── docs/                    # 纯 Markdown 文档（平铺，不混入主题配置）
│   ├── architecture_overview.md
│   ├── configuration_reference.md
│   └── ...
├── website/                 # 网站相关资源
│   ├── landing/
│   │   └── index.html       # 产品主页（直接部署到 Cloudflare Pages）
│   ├── theme.json           # 项目特定的主题配置（颜色、标题、侧边栏结构）
│   └── public/
│       └── logo.svg         # 项目 Logo
├── src/                     # 项目代码
└── ...
```

### 本仓库（docs-theme）的结构

```
docs-theme/
├── .vitepress/
│   ├── config.mts           # VitePress 配置（动态读取项目配置）
│   └── theme/
│       ├── index.ts          # 自定义主题入口
│       └── style.css         # 统一的文档样式（严格匹配设计稿）
├── scripts/
│   ├── dev.sh               # 本地开发：从本地仓库读取 docs
│   └── build.sh             # 构建：从 Git 仓库拉取 docs 并构建
├── projects/                # 各项目的配置
│   ├── zero-qa.json
│   └── agents-sandbox.json
├── package.json
└── README.md
```

## 使用方式

### 本地开发

```bash
# 为 zero-qa 项目启动文档开发服务器（读取本地仓库）
./scripts/dev.sh zero-qa /path/to/zero-qa

# 为 agents-sandbox 项目
./scripts/dev.sh agents-sandbox /path/to/agents-sandbox
```

### 构建部署

```bash
# 构建 zero-qa 文档站
./scripts/build.sh zero-qa

# 构建 agents-sandbox 文档站
./scripts/build.sh agents-sandbox
```

### 部署到 Cloudflare Pages

每个项目的文档站是独立的 Cloudflare Pages 项目，构建时：
1. 本仓库的构建脚本从项目主仓库拉取 docs/ 和 website/ 目录
2. 用 VitePress + 本仓库的主题渲染成静态 HTML
3. 部署到 Cloudflare Pages

## 文档分级

docs/ 目录下的文件可以平铺，UI 上的分组通过 website/theme.json 中的 sidebar 配置实现：

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

文件平铺，但页面上看起来是分级的。

## Cloudflare 部署域名规划

| 项目 | 主页域名 | 文档域名 | 内容来源 |
|------|---------|---------|---------|
| Zero QA | zero-qa.com | docs.zero-qa.com | zero-qa 仓库 docs/ |
| Agents Sandbox | agents-sandbox.com | docs.agents-sandbox.com | agents-sandbox 仓库 docs/ |

## 设计风格

所有项目共享同一套基础布局和交互，各项目通过 website/theme.json 自定义：
- accent 主色调
- 项目名称和 Logo
- 侧边栏结构
- GitHub 仓库链接

基础风格固定不变（字体、字号、间距、背景色、代码块样式、暗色模式等）。
