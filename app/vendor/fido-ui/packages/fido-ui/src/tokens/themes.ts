/**
 * Product theme registry (Primary default / FidoAlert).
 *
 * CSS: import theme.css (Primary default).
 * FidoAlert: themes/fido-alert.css + data-fido-ui-theme="fidoAlert".
 */

export const fidoUIThemeIds = ['primary', 'fidoAlert'] as const;

export type FidoUIThemeId = (typeof fidoUIThemeIds)[number];

export const fidoUIThemes: ReadonlyArray<{
  id: FidoUIThemeId;
  label: string;
  /** Published CSS path (Primary uses theme.css only). */
  cssImport?: string;
}> = [
  {
    id: 'primary',
    label: 'Primary',
  },
  {
    id: 'fidoAlert',
    label: 'FidoAlert',
    cssImport: '@petscreeninginc/fido-ui/tokens/themes/fido-alert.css',
  },
];

export const FIDO_UI_THEME_DATA_ATTR = 'data-fido-ui-theme';

export function fidoUIThemeDataAttribute(theme: FidoUIThemeId): Record<string, string> {
  return { [FIDO_UI_THEME_DATA_ATTR]: theme };
}
