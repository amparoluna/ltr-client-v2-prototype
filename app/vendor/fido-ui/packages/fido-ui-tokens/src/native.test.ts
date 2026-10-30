import { describe, expect, it } from 'vitest';
import { fidoAlertNativeTheme, nativeThemes, primaryNativeTheme } from './native';

describe('native themes', () => {
  it('uses mobile values by default', () => {
    expect(primaryNativeTheme.spacing.md).toBe(6);
    expect(primaryNativeTheme.typography.fontSizes.h1).toBe(30);
  });

  it('resolves product-theme aliases', () => {
    expect(fidoAlertNativeTheme.colors.alert['600']).toBe(
      fidoAlertNativeTheme.colors.destruct['600'],
    );
    expect(nativeThemes.primary.tablet.spacing.md).toBe(8);
  });
});
