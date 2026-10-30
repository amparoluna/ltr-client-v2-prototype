# `@petscreeninginc/fido-ui-icons`

515 tree-shakeable React icons across 21 categories, generated from the FidoUI Figma visual-assets
library.

```tsx
import { DogIcon, PawPrintBoldIcon } from '@petscreeninginc/fido-ui-icons';

<DogIcon className="size-5 text-fido-ui-primary-700" />
<PawPrintBoldIcon title="Pets" width={24} height={24} />
```

Icons inherit `currentColor`, accept native SVG props, and are decorative by default. Add `title`,
`aria-label`, or `aria-labelledby` only when the icon itself conveys information that is not already
available as text.

All icons are exported directly from the package root. The utility icons whose names collide with
icons in other categories use `Utility` prefixes (`UtilityHomeIcon`, `UtilityShareIcon`, and
`UtilityShareBoldIcon`). For the smallest and most predictable module graph, individual icons also
have subpath exports:

```tsx
import { DogIcon } from '@petscreeninginc/fido-ui-icons/pets/dog';
```

Every Figma group is available as a category import, including `commerce`, `files`,
`maps-travel-business`, `outdoors`, `communication`, `devices`, `media`, `text-styling`, `utility`,
`people`, `arrows`, `finance`, `development`, `security`, `education`, `charts`, `time-date`,
`measurement`, `search`, and `payment-methods`.

```tsx
import { ChevronLeftIcon } from '@petscreeninginc/fido-ui-icons/arrows/chevron-left';
import { VisaIcon } from '@petscreeninginc/fido-ui-icons/payment-methods/visa';
```

## Preview

Browse, search, and copy imports for every icon in the icon Storybook, which renders straight from
the package source so it always shows the current version:

- Deployed: <https://petscreeninginc.github.io/fido-ui/icons/>
- Local: `pnpm storybook:icons` from the repo root (http://localhost:6007)

## Regenerating

Exact Figma exports are committed in `assets/` and are the source for both the web and React Native icon packages. After updating an asset or its manifest, regenerate both outputs from the repository root:

```sh
pnpm --filter @petscreeninginc/fido-ui-icons generate
pnpm --filter @petscreeninginc/fido-ui-icons-native generate
```

Generated component files must not be edited by hand. Keep icon names and category exports aligned across both packages, run both packages' tests, and add both packages to the Changeset when the published catalog changes.
