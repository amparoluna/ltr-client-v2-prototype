export * from './native';
export { fidoUIThemeIds } from './types';
import { fidoAlertNativeTheme, primaryNativeTheme } from './native.generated';

const { '950': _neutralAlias, ...neutralColors } = primaryNativeTheme.colors.neutral;

export const colors = {
  primary: primaryNativeTheme.colors.primary,
  secondary: primaryNativeTheme.colors.secondary,
  // Keep the established web API: `black` is canonical and the CSS-only
  // `neutral-950` alias is intentionally omitted from this object.
  neutral: neutralColors,
  destruct: primaryNativeTheme.colors.destruct,
  success: primaryNativeTheme.colors.success,
  warning: primaryNativeTheme.colors.warning,
  info: primaryNativeTheme.colors.info,
} as const;

export const fidoAlertColors = {
  primary: fidoAlertNativeTheme.colors.primary,
  secondary: fidoAlertNativeTheme.colors.secondary,
  destruct: fidoAlertNativeTheme.colors.destruct,
  warning: fidoAlertNativeTheme.colors.warning,
} as const;

export type FidoUIColors = typeof colors;

export const FIDO_UI_THEME_DATA_ATTR = 'data-fido-ui-theme';
