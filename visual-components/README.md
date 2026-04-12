# Visual Components

Reusable Vue components for article visual enhancement, used directly in VitePress Markdown and styled via `ave-bridge.css`.

## Component Matching

Scan `components/*.vue` file header comments for `component` and `structure` fields. Match content semantically to the best-fitting component.

## Usage Patterns

Components follow two patterns depending on content type. Check each `.vue` file's `<script setup>` for the exact props/slots interface.

### Slot Pattern — nested child components or free-form text

Used when content is compositional (parent + children, or parent + text). Parent provides layout, children provide content via `<slot />`.

```markdown
<AveGrid :cols="2">
  <AveCard icon="🔓" bg="rgba(52,168,83,0.15)" title="Title">
    Description text
  </AveCard>
</AveGrid>
```

### Props Pattern — structured data via JSON

Used when all content is structured data (arrays, objects). Pass data directly as props, no child components needed.

```markdown
<AveForkDecision
  question="Which approach?"
  leftLabel="Option A"
  rightLabel="Option B"
  :leftItems='[{"name":"Fast","detail":"Lower quality"}]'
  :rightItems='[{"name":"Safe","detail":"Higher cost"}]'
  :leftConsequence='{"icon":"⚡","text":"Quick but risky"}'
  :rightConsequence='{"icon":"🛡️","text":"Slow but safe"}'
  verdictMain="Choose based on context"
/>
```

### How to decide

- Content has **child elements or free-form text** → Slot pattern
- Content is **structured data (lists, objects)** → Props pattern
- Specific props/slots for each component are defined in its `.vue` file (`defineProps` + header comment)

## Adding a New Component

### File and Naming

- Create `components/Ave<Name>.vue` — all components use the `Ave` prefix
- File name must match the component name (PascalCase)

### Header Comment

Every `.vue` file must start with an HTML comment block containing:

```html
<!--
  component: Ave<Name>
  structure: <one-line description of the visual layout>
  notes: <usage hints, slot expectations, prop conventions>
  usage-markdown: |
    <Ave<Name> prop="value">Slot content</Ave<Name>>
  usage-json: |
    { "component": "Ave<Name>", "props": { "prop": "value" }, "slot": "Slot content" }
-->
```

- `usage-markdown`: Markdown slot syntax for embedding in VitePress docs
- `usage-json`: JSON format for `render.mjs` (screenshot/HTML rendering scenario)
- Both fields are required — all components must support JSON rendering
- When modifying a component's props or slots, update both usage fields to stay in sync

This is the single source of truth for what the component looks like and how to use it. Do not duplicate this information elsewhere.

### Component Granularity

- Single component when it is self-contained (e.g. `AveForkDecision` — one component, all data via props)
- Parent + child split when items need individual slot content or the parent only provides layout (e.g. `AveGrid` + `AveCard`, `AveVerticalList` + `AveListItem`)
- If child components are only used inside one specific parent, keep them as a pair; do not create standalone children that only make sense within a particular parent

### Styling Rules

- All font sizes use `--ave-*-size` variables
- All fonts use `--ave-font-*` variables
- Text colors use `--ave-text-*` variables (semantic colors excepted)
- Backgrounds use `--ave-card-bg` or palette colors via props
- Border radius uses `--ave-card-radius`
- No hardcoded grays (`#555`, `#666`, `#777`, etc.)

These CSS variables are defined in `styles/ave-variables.css` (standalone) and mapped from VitePress theme tokens in `styles/ave-bridge.css`.

When a new component needs a new CSS variable:
1. Add the variable to both `ave-variables.css` (with a default value) and `ave-bridge.css` (mapped from `--vp-*` tokens)
2. Use the `--ave-` prefix for all new variables
3. Always use `<style scoped>` — all components must scope their styles

### Registration

Register the component in `.vitepress/theme/index.ts`:

```ts
import Ave<Name> from '../../../visual-components/components/Ave<Name>.vue'
// ...
app.component('Ave<Name>', Ave<Name>)
```

### Props and Slots

- Use `defineProps` with TypeScript interface for type safety
- TypeScript interfaces for props must be defined inside the component file, not in external type files
- Structured data (arrays, objects) → props pattern, no child components needed
- Free-form content (text, nested components) → slot pattern with `<slot />`
- Each component's exact interface is defined in its `.vue` file — do not duplicate prop/slot docs elsewhere

### JSON Render Compatibility

Components are used in two scenarios: VitePress Markdown (slot syntax) and screenshot rendering via `render.mjs` (JSON input). All components **must** support both:

- No named slots — `render.mjs` only supports default slot
- No raw HTML in slots — use props for structured content (`render.mjs` treats slot as plain text)
- Slot content must be plain text only; complex structures (tables, code with syntax tokens) must be modeled as props
