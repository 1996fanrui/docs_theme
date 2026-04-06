# Visual Components

Reusable Vue components for article visual enhancement. Single source of truth for two scenarios:

- **VitePress docs**: Components used directly in Markdown, styled via `ave-bridge.css`
- **Enhancer screenshot**: Components rendered to HTML via `render.mjs`, styled via `ave-variables.css`

## Component Matching

Scan `components/*.vue` file header comments for `component` and `structure` fields. Match content semantically to the best-fitting component.

## Usage

### VitePress (Markdown)

```markdown
<AveGrid :cols="2">
  <AveCard icon="🔓" bg="rgba(52,168,83,0.15)" title="Title">
    Description text
  </AveCard>
</AveGrid>
```

### Screenshot (render.mjs)

```bash
node visual-components/scripts/render.mjs \
  --data data.json \
  --style visual-components/styles/ave-variables.css \
  --output output.html
```

## New Component Checklist

- [ ] All font sizes use `--ave-*-size` variables
- [ ] All fonts use `--ave-font-*` variables
- [ ] Text colors use `--ave-text-*` variables (semantic colors excepted)
- [ ] Backgrounds use `--ave-card-bg` or palette colors via props
- [ ] Border radius uses `--ave-card-radius`
- [ ] No `#555` / `#666` / `#777` hardcoded grays
- [ ] Header comment block with `component` and `structure` fields
- [ ] Registered in `.vitepress/theme/index.ts`
- [ ] render.mjs can render the component (verify screenshot scenario)
