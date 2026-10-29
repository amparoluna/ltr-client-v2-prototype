# @petscreeninginc/fido-ui-tokens

Canonical cross-platform design tokens for FidoUI. This package owns the Primary and FidoAlert token sources and generates the compatibility outputs consumed by both the web and React Native libraries.

## Exports

- `@petscreeninginc/fido-ui-tokens` — token metadata and theme types.
- `@petscreeninginc/fido-ui-tokens/native` — typed mobile and tablet theme objects.
- `@petscreeninginc/fido-ui-tokens/v3` — generated Tailwind v3 compatibility object.
- `@petscreeninginc/fido-ui-tokens/theme.css` — canonical Primary CSS theme.
- `@petscreeninginc/fido-ui-tokens/themes/fido-alert.css` — FidoAlert CSS overrides.

Run `pnpm --filter @petscreeninginc/fido-ui-tokens generate` after changing token CSS. CI runs `generate:check` and fails when generated native, Tailwind, or web compatibility outputs drift.

Token changes are cross-platform changes. Review every affected web and native component under both Primary and FidoAlert themes, update stories/tests when visual or semantic behavior changes, and include each publishable package whose runtime output changed in the Changeset.
