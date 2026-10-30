import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { colors, fidoAlertColors } from './colors';

type Palette = Record<string, string>;

function parseColorTokens(css: string): Record<string, string> {
  return Object.fromEntries(
    [...css.matchAll(/--color-fido-ui-([\w-]+):\s*(#[\da-f]+);/gi)].map(
      ([, name, value]) => [name, value.toLowerCase()],
    ),
  );
}

function expectPalettesToMatch(
  palettes: Record<string, Palette>,
  tokens: Record<string, string>,
) {
  for (const [paletteName, palette] of Object.entries(palettes)) {
    for (const [shade, value] of Object.entries(palette)) {
      expect(tokens[`${paletteName}-${shade}`], `${paletteName}.${shade}`).toBe(value);
    }
  }
}

describe('programmatic color tokens', () => {
  it('matches the Primary CSS variables', () => {
    const primaryTokens = parseColorTokens(readFileSync('src/tokens/fido-ui-theme.css', 'utf8'));

    expectPalettesToMatch(colors as unknown as Record<string, Palette>, primaryTokens);
  });

  it('matches the FidoAlert CSS variable overrides', () => {
    const fidoAlertTokens = parseColorTokens(
      readFileSync('src/tokens/themes/fido-alert.css', 'utf8'),
    );

    expectPalettesToMatch(
      fidoAlertColors as unknown as Record<string, Palette>,
      fidoAlertTokens,
    );
  });
});
