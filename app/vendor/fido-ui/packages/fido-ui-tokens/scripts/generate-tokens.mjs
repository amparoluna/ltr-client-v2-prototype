import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = resolve(packageRoot, '../..');
const checkOnly = process.argv.includes('--check');
const primaryCssPath = join(packageRoot, 'src/theme.css');
const alertCssPath = join(packageRoot, 'src/themes/fido-alert.css');

function variables(css) {
  return Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
}

function resolveValue(name, tokens, trail = new Set()) {
  if (trail.has(name))
    throw new Error(`Circular token reference: ${[...trail, name].join(' -> ')}`);
  const value = tokens[name];
  if (value == null) throw new Error(`Unknown token: ${name}`);
  return value.replace(/var\(--([\w-]+)\)/g, (_, reference) =>
    resolveValue(reference, tokens, new Set([...trail, name])),
  );
}

const toNumber = (value) => Number.parseFloat(value);

function palette(tokens, name) {
  const prefix = `color-fido-ui-${name}-`;
  return Object.fromEntries(
    Object.keys(tokens)
      .filter((key) => key.startsWith(prefix))
      .map((key) => [key.slice(prefix.length), resolveValue(key, tokens)]),
  );
}

function scale(tokens, prefix, names, deviceClass) {
  return Object.fromEntries(
    names.map((name) => {
      const responsive = `${prefix}${name}-${deviceClass}`;
      const fallback = `${prefix}${name}`;
      return [
        name,
        toNumber(resolveValue(tokens[responsive] == null ? fallback : responsive, tokens)),
      ];
    }),
  );
}

function semanticColors(tokens) {
  const prefix = 'color-fido-ui-';
  return Object.fromEntries(
    Object.keys(tokens)
      .filter(
        (key) =>
          key.startsWith(prefix) &&
          !/^(color-fido-ui-(primary|secondary|neutral|destruct|success|warning|info|alert)-)/.test(
            key,
          ),
      )
      .map((key) => [key.slice(prefix.length), resolveValue(key, tokens)]),
  );
}

const spacingNames = ['2xs', 'xs', 'sm', 'md', 'lg', 'base', 'xl', '2xl', '3xl', '4xl', '5xl'];
const radiusNames = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
const borderNames = ['xs', 'sm', 'md', 'lg', 'xl'];
const sizeNames = ['2xs', 'xs', 'sm', 'md', 'lg'];
const typeNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'p1', 'p2', 'p3', 'p4', 'p5'];

function makeTheme(tokens, id, deviceClass) {
  return {
    id,
    deviceClass,
    colors: {
      primary: palette(tokens, 'primary'),
      secondary: palette(tokens, 'secondary'),
      neutral: palette(tokens, 'neutral'),
      destruct: palette(tokens, 'destruct'),
      success: palette(tokens, 'success'),
      warning: palette(tokens, 'warning'),
      info: palette(tokens, 'info'),
      alert: palette(tokens, 'alert'),
      semantic: semanticColors(tokens),
    },
    spacing: scale(tokens, 'spacing-fido-ui-', spacingNames, deviceClass),
    radii: scale(tokens, 'radius-fido-ui-', radiusNames, deviceClass),
    borderWidths: scale(tokens, 'border-width-fido-ui-', borderNames, deviceClass),
    sizes: scale(tokens, 'size-fido-ui-', sizeNames, deviceClass),
    typography: {
      fontFamilies: { regular: 'Archivo_400Regular', bold: 'Archivo_700Bold' },
      fontSizes: scale(tokens, 'font-size-fido-ui-', typeNames, deviceClass),
      lineHeights: {
        normal: toNumber(resolveValue('line-height-fido-ui-normal', tokens)),
        tight: toNumber(resolveValue('line-height-fido-ui-tight', tokens)),
        relaxed: toNumber(resolveValue('line-height-fido-ui-relaxed', tokens)),
      },
    },
  };
}

function flatGroup(tokens, prefix, stripPrefix = true) {
  return Object.fromEntries(
    Object.keys(tokens)
      .filter((key) => key.startsWith(prefix))
      .map((key) => [stripPrefix ? key.slice(prefix.length) : key, resolveValue(key, tokens)]),
  );
}

function v3Theme(tokens) {
  return {
    colors: flatGroup(tokens, 'color-'),
    spacing: flatGroup(tokens, 'spacing-'),
    borderRadius: flatGroup(tokens, 'radius-'),
    borderWidth: flatGroup(tokens, 'border-width-'),
    size: flatGroup(tokens, 'size-'),
    width: flatGroup(tokens, 'width-'),
    height: flatGroup(tokens, 'height-'),
    fontFamily: Object.fromEntries(
      Object.keys(tokens)
        .filter((key) => key.startsWith('font-fido-ui-'))
        .map((key) => [key.slice('font-'.length), resolveValue(key, tokens)]),
    ),
    fontSize: flatGroup(tokens, 'font-size-'),
    lineHeight: flatGroup(tokens, 'leading-'),
    boxShadow: flatGroup(tokens, 'shadow-'),
    animation: flatGroup(tokens, 'animate-'),
    zIndex: flatGroup(tokens, 'z-index-'),
  };
}

const [primaryCss, alertCss] = await Promise.all([
  readFile(primaryCssPath, 'utf8'),
  readFile(alertCssPath, 'utf8'),
]);
const primaryTokens = variables(primaryCss);
const alertTokens = { ...primaryTokens, ...variables(alertCss) };

const themes = {
  primary: {
    mobile: makeTheme(primaryTokens, 'primary', 'mobile'),
    tablet: makeTheme(primaryTokens, 'primary', 'tablet'),
  },
  fidoAlert: {
    mobile: makeTheme(alertTokens, 'fidoAlert', 'mobile'),
    tablet: makeTheme(alertTokens, 'fidoAlert', 'tablet'),
  },
};

const nativeSource = `// Generated by scripts/generate-tokens.mjs. Do not edit.\nimport type { FidoUINativeTheme } from './types';\n\nexport const nativeThemes = ${JSON.stringify(themes, null, 2)} as const satisfies Record<string, Record<string, FidoUINativeTheme>>;\n\nexport const primaryNativeTheme = nativeThemes.primary.mobile;\nexport const primaryTabletTheme = nativeThemes.primary.tablet;\nexport const fidoAlertNativeTheme = nativeThemes.fidoAlert.mobile;\nexport const fidoAlertTabletTheme = nativeThemes.fidoAlert.tablet;\n`;
const v3Source = `// Generated by scripts/generate-tokens.mjs. Do not edit.\nconst fidoUITheme = ${JSON.stringify(v3Theme(primaryTokens), null, 2)} as const;\n\nexport default fidoUITheme;\n`;

const outputs = [
  [join(packageRoot, 'src/native.generated.ts'), nativeSource],
  [join(packageRoot, 'src/fido-ui-theme-v3.generated.ts'), v3Source],
  [join(repoRoot, 'packages/fido-ui/src/tokens/fido-ui-theme.css'), primaryCss],
  [join(repoRoot, 'packages/fido-ui/src/tokens/themes/fido-alert.css'), alertCss],
];

const failures = [];
for (const [path, source] of outputs) {
  if (checkOnly) {
    const current = await readFile(path, 'utf8').catch(() => '');
    if (current !== source) failures.push(path);
  } else {
    await writeFile(path, source);
  }
}

if (failures.length) {
  throw new Error(`Generated token outputs are out of date: ${failures.join(', ')}`);
}
