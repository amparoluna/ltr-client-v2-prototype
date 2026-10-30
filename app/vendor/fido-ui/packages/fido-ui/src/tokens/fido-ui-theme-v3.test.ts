import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import fidoUITheme from './fido-ui-theme-v3';

const namespaceMap = {
  color: 'colors',
  spacing: 'spacing',
  radius: 'borderRadius',
  'border-width': 'borderWidth',
  size: 'size',
  width: 'width',
  height: 'height',
  font: 'fontFamily',
  'font-size': 'fontSize',
  text: 'fontSize',
  'line-height': 'lineHeight',
  leading: 'lineHeight',
  shadow: 'boxShadow',
  animate: 'animation',
  'z-index': 'zIndex',
} as const;

type CssNamespace = keyof typeof namespaceMap;

const namespacePrefixes = Object.keys(namespaceMap).sort(
  (a, b) => b.length - a.length,
) as CssNamespace[];

function parseThemeTokens(css: string) {
  return [...css.matchAll(/--([a-z-]+-fido-ui-[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => ({
    name,
    value: value.trim(),
  }));
}

function resolveTokenValue(tokens: Record<string, string>, value: string): string {
  const ref = value.match(/^var\(--([a-z-]+-fido-ui-[\w-]+)\)$/);

  if (!ref) {
    return normalizeTokenValue(value);
  }

  return resolveTokenValue(tokens, tokens[ref[1]]);
}

function normalizeTokenValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(normalizeTokenValue).join(', ');
  }

  return String(value).replaceAll("'", '');
}

function flattenThemeValues(value: unknown, prefix = ''): Record<string, string> {
  if (Array.isArray(value)) {
    const normalized = value.every((item) => typeof item === 'string')
      ? normalizeTokenValue(value)
      : normalizeTokenValue(value[0]);

    return { [prefix]: normalized };
  }

  if (typeof value !== 'object' || value === null) {
    return { [prefix]: normalizeTokenValue(value) };
  }

  return Object.entries(value).reduce<Record<string, string>>((result, [key, child]) => {
    const nextPrefix = prefix ? `${prefix}-${key}` : key;

    return {
      ...result,
      ...flattenThemeValues(child, nextPrefix),
    };
  }, {});
}

describe('FidoUI Tailwind v3 theme', () => {
  it('maps Primary tokens (fido-ui-theme.css) to Tailwind v3 theme values', () => {
    const baseCss = readFileSync('src/tokens/fido-ui-theme.css', 'utf8');
    const baseTokens = parseThemeTokens(baseCss);
    const cssTokens = [...baseTokens];
    const tokenValues = Object.fromEntries(cssTokens.map(({ name, value }) => [name, value]));
    const expectedByThemeNamespace = new Map<string, Record<string, string>>();

    for (const { name, value } of cssTokens) {
      const cssNamespace = namespacePrefixes.find((namespace) => name.startsWith(`${namespace}-`));

      expect(cssNamespace, `Unknown CSS token namespace for ${name}`).toBeDefined();

      const themeNamespace = namespaceMap[cssNamespace as CssNamespace];
      const tokenKey = name.replace(`${cssNamespace}-`, '');
      const expected = expectedByThemeNamespace.get(themeNamespace) ?? {};

      expected[tokenKey] = resolveTokenValue(tokenValues, value);
      expectedByThemeNamespace.set(themeNamespace, expected);
    }

    for (const [themeNamespace, expected] of expectedByThemeNamespace) {
      const actual = flattenThemeValues(fidoUITheme[themeNamespace as keyof typeof fidoUITheme]);

      expect(actual).toEqual(expected);
    }
  });
});
