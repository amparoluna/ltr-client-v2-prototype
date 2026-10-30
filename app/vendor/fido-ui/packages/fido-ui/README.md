# @petscreeninginc/fido-ui

**FidoUI** is a React component library for the FidoUI Design System. It provides accessible, customizable UI components built on [Base UI](https://base-ui.com/) primitives with [Tailwind CSS](https://tailwindcss.com/) styling.

**[Storybook (live docs)](https://petscreeninginc.github.io/fido-ui/)** | Published to **AWS CodeArtifact** (`petscreening/petscreening-repo`)

## Features

- **Accessible by default** - Built on Base UI (from the Radix, Floating UI & Material UI teams), all components meet WCAG 2.1 AA standards
- **Tailwind CSS styling** - Design tokens exposed as Tailwind theme values; components use Tailwind utility classes
- **Tree-shakeable** - Per-component imports ensure you only bundle what you use
- **TypeScript-first** - Full type safety with autocomplete for all variants and props
- **Framework-compatible** - Works with Next.js (App Router + Pages Router), Vite/TanStack, and Rails apps
- **SSR-ready** - `'use client'` directives ensure compatibility with React Server Components
- **Customizable** - Override any component styling via `className` prop with Tailwind Merge conflict resolution

---

## Quick Start

### 1. Point npm at the PetScreening registry

FidoUI is published to **AWS CodeArtifact** (domain `petscreening`, repository `petscreening-repo`) — the same registry that serves the JVM libraries like `com.petscreening:spring-nats`.

**One-time setup** — add a `.npmrc` file to your project root:

```
@petscreeninginc:registry=https://artifact.proxy.network.petscreening.com/npm/petscreening-repo/
```

That's it — **no token, no PAT**. `artifact.proxy.network.petscreening.com` is our CodeArtifact reverse proxy; it injects AWS credentials on every request, so clients need none. It's the same host Platform and the integrations already resolve `spring-nats` through, just under `/npm/` instead of `/maven/`.

> The proxy is on the **internal network** — you need to be on the VPN. In GitHub Actions it's reachable from `runs-on: github-runner` (our self-hosted runners); GitHub-hosted runners can't see it, so those need the fallback below.

**Fallback — talk to CodeArtifact directly.** Off-VPN, or on a GitHub-hosted runner, authenticate against AWS instead:

```bash
aws sso login

aws codeartifact login --tool npm \
  --domain petscreening --domain-owner 503561434282 \
  --repository petscreening-repo --region us-east-2 --profile petscreening-network \
  --namespace petscreeninginc
```


### 2. Install

```bash
npm install @petscreeninginc/fido-ui
```

### 3. Configure Tailwind

**Tailwind v4** (recommended):

```css
/* app.css or globals.css */
@import "tailwindcss";
@import "@petscreeninginc/fido-ui/tokens/theme.css";
@source "../node_modules/@petscreeninginc/fido-ui/dist";
```

**Tailwind v3**:

```js
// tailwind.config.js
const fidoUITheme = require('@petscreeninginc/fido-ui/tokens/v3');

module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}',
    './node_modules/@petscreeninginc/fido-ui/dist/**/*.{js,cjs}', // IMPORTANT
  ],
  theme: {
    extend: fidoUITheme,
  },
};
```

### 4. Use components

```tsx
import { Button } from '@petscreeninginc/fido-ui/button';
import { Badge } from '@petscreeninginc/fido-ui/badge';

function MyPage() {
  return (
    <div>
      <Button color="primary" shade="dark">
        Save Changes
      </Button>
      <Badge color="success" shade="light">Active</Badge>
    </div>
  );
}
```

---

## Framework Setup Guides

### Next.js (App Router)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@petscreeninginc/fido-ui/tokens/theme.css";
@source "../node_modules/@petscreeninginc/fido-ui/dist";
```

```tsx
// app/page.tsx — Server Component (works because FidoUI uses 'use client' internally)
import { Button } from '@petscreeninginc/fido-ui/button';

export default function Page() {
  return <Button color="primary" shade="dark">Click me</Button>;
}
```

No changes to `next.config.js` are needed.

### Next.js (Pages Router)

Same CSS setup. Components work as-is in both `pages/` and `components/` directories.

### Vite + TanStack Router

```css
/* src/index.css */
@import "tailwindcss";
@import "@petscreeninginc/fido-ui/tokens/theme.css";
@source "../node_modules/@petscreeninginc/fido-ui/dist";
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Rails (with esbuild/Vite + Tailwind v3)

```js
// tailwind.config.js
const fidoUITheme = require('@petscreeninginc/fido-ui/tokens/v3');

module.exports = {
  content: [
    './app/views/**/*.{html,erb}',
    './app/javascript/**/*.{ts,tsx}',
    './node_modules/@petscreeninginc/fido-ui/dist/**/*.{js,cjs}',
  ],
  theme: {
    extend: fidoUITheme,
  },
};
```

```tsx
// app/javascript/components/MyComponent.tsx
import { Button } from '@petscreeninginc/fido-ui/button';

export function MyComponent() {
  return <Button color="neutral" shade="light">Submit</Button>;
}
```

### Rails (with Tailwind v4)

```css
/* app/assets/stylesheets/application.css */
@import "tailwindcss";
@import "@petscreeninginc/fido-ui/tokens/theme.css";
@source "../node_modules/@petscreeninginc/fido-ui/dist";
```

---

## Component Documentation

Browse all components, interactive examples, and auto-generated prop tables in **[Storybook](https://petscreeninginc.github.io/fido-ui/)**:

```bash
# Or run locally:
npm run storybook
```

The icon catalog lives in its own Storybook: **[Icons Storybook](https://petscreeninginc.github.io/fido-ui/icons/)** (run locally with `pnpm storybook:icons` from the repo root, port 6007).

Every component has:
- **JSDoc on all props** — hover in your IDE for inline documentation
- **Storybook stories** — interactive playground with controls for every variant
- **Autodocs** — auto-generated prop tables from TypeScript types

### Available Components

| Category | Components |
|----------|-----------|
| **Actions** | Button, Badge, Pill |
| **Form Inputs** | Input, Textarea, InputOtp, Select, Combobox, Switch, Checkbox, RadioGroup, Slider |
| **Navigation** | Tabs, Breadcrumb, Pagination, ToggleGroup, Stepper |
| **Feedback** | Alert, Toast, Dialog, Tooltip, Progress, Spinner |

### Import Pattern

```tsx
// Per-component (recommended — tree-shakeable)
import { Button } from '@petscreeninginc/fido-ui/button';
import { Select, SelectItem } from '@petscreeninginc/fido-ui/select';

// Barrel (convenient for prototyping)
import { Button, Select, SelectItem } from '@petscreeninginc/fido-ui';
```

---

## Contributing

See the root **[CONTRIBUTING.md](../../CONTRIBUTING.md)** for the full guide covering:

- Build pipeline (how tsup produces ESM/CJS/DTS)
- Adding new components (step-by-step)
- Component architecture (3-layer pattern)
- Coding conventions
- Versioning policy (semver)
- Release workflow with Changesets
- Consumer version pinning guide

The repository maintains matching web and React Native component-family catalogs. Web component additions and API, behavior, visual, theme, or accessibility changes require a native-parity impact review in the same PR. See the root [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for the native implementation checklist and shared icon workflow.

### Quick start

```bash
pnpm install
pnpm --filter @petscreeninginc/fido-ui dev
pnpm --filter @petscreeninginc/fido-ui test
pnpm storybook
pnpm --filter @petscreeninginc/fido-ui build
```

---

## Troubleshooting

### Styles are missing / components look unstyled

**Most common cause:** Tailwind is not scanning the FidoUI package files.

**Tailwind v4 fix:** Add `@source` directive:
```css
@source "../node_modules/@petscreeninginc/fido-ui/dist";
```

**Tailwind v3 fix:** Add to `content` array:
```js
content: ['./node_modules/@petscreeninginc/fido-ui/dist/**/*.{js,cjs}']
```

### "use client" errors in Next.js

FidoUI components that use Base UI already include `'use client'` directives. If you see errors, ensure you're importing from the correct path:

```tsx
// Correct
import { Button } from '@petscreeninginc/fido-ui/button';

// May cause issues in some bundler configs
import { Button } from '@petscreeninginc/fido-ui';
```

### TypeScript can't find module

Ensure your `tsconfig.json` has `"moduleResolution": "bundler"` or `"node16"`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Font not loading

FidoUI uses the [Archivo](https://fonts.google.com/specimen/Archivo) font family. You need to load it in your app:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" rel="stylesheet">
```

Or via your CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap');
```

### Tailwind Merge not resolving custom classes

If `className` overrides aren't working as expected, ensure you're using the `cn()` utility or importing from FidoUI (which uses it internally). FidoUI configures Tailwind Merge to handle `fido-ui-*` custom classes.

---

## Peer Dependencies

| Package | Version |
|---------|---------|
| `react` | `^17 \|\| ^18 \|\| ^19` |
| `react-dom` | `^17 \|\| ^18 \|\| ^19` |
| `tailwindcss` | `>=3.4 \|\| >=4.0` (optional) |

---

## Roadmap (pre-1.0)

- [ ] Finish Figma pixel-matching pass on remaining components (Tabs, Dialog, Toast, Progress, Spinner, ToggleGroup)
- [ ] Audit and fix Checkbox/Switch visual states against Figma
- [ ] Add pre-compiled `fido-ui.css` export for consumers without Tailwind
- [ ] Integrate FidoUI into pet-screening (Rails + Shakapacker + Tailwind v4 via `@tailwindcss/postcss`)
- [x] Set up CI/CD pipeline (GitHub Actions: lint, test, build, publish)
- [x] Publish to AWS CodeArtifact as a private org-scoped package
- [x] Deploy Storybook to GitHub Pages (versioned: `/latest/`, `/v0.1.0/`, etc.)
- [x] Build synchronized web and React Native icon packages from the shared SVG catalog
- [ ] Visual regression testing (Chromatic or Playwright screenshots)

---

## License

MIT
