import { describe, it, expect } from 'vitest';
import {
  fidoUIThemeIds,
  fidoUIThemes,
  fidoUIThemeDataAttribute,
  FIDO_UI_THEME_DATA_ATTR,
} from './themes';

describe('fidoUIThemes', () => {
  it('exposes primary and fidoAlert', () => {
    expect(fidoUIThemeIds).toEqual(['primary', 'fidoAlert']);
    expect(fidoUIThemes.map((t) => t.id)).toEqual(['primary', 'fidoAlert']);
  });

  it('builds data attribute for theme switching', () => {
    expect(fidoUIThemeDataAttribute('primary')).toEqual({
      [FIDO_UI_THEME_DATA_ATTR]: 'primary',
    });
    expect(fidoUIThemeDataAttribute('fidoAlert')).toEqual({
      [FIDO_UI_THEME_DATA_ATTR]: 'fidoAlert',
    });
  });

  it('fidoAlert has a published cssImport; primary uses theme.css only', () => {
    expect(fidoUIThemes.find((t) => t.id === 'primary')?.cssImport).toBeUndefined();
    expect(fidoUIThemes.find((t) => t.id === 'fidoAlert')?.cssImport).toMatch(/fido-alert\.css$/);
  });
});
