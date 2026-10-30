/// <reference path="./css-raw.d.ts" />
import * as React from 'react';
import { fidoUIThemes, type FidoUIThemeId } from '../../src/tokens/themes';
import baseCss from '../../src/tokens/fido-ui-theme.css?raw';
import fidoAlertCss from '../../src/tokens/themes/fido-alert.css?raw';

/* -------------------------------------------------------------------------- */
/*  Live token resolution                                                     */
/*                                                                             */
/*  Values are parsed straight out of the source CSS files (via Vite's `raw`  */
/*  import) rather than read from computed styles. Tailwind v4's `@theme`    */
/*  block only emits variables that are referenced by a scanned utility      */
/*  class, so relying on `getComputedStyle` would silently drop tokens (e.g. */
/*  `--border-width-fido-ui-xs`) that aren't used as a literal class anywhere  */
/*  in this Storybook build. Parsing the source directly always reflects    */
/*  exactly what's declared in `fido-ui-theme.css` + the active theme file.   */
/* -------------------------------------------------------------------------- */

function parseCssVars(css: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const re = /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(css))) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

const baseVars = parseCssVars(baseCss);
const themeOverrides: Record<FidoUIThemeId, Record<string, string>> = {
  primary: {},
  fidoAlert: parseCssVars(fidoAlertCss),
};

/** Resolve a token, following `var(--other-token)` chains (e.g. semantic → primitive). */
function resolveVar(
  name: string,
  vars: Record<string, string>,
  seen: Set<string> = new Set(),
): string {
  if (seen.has(name)) return '';
  seen.add(name);
  const raw = vars[name];
  if (!raw) return '';
  const varRef = raw.match(/^var\((--[a-zA-Z0-9-]+)\)$/);
  return varRef ? resolveVar(varRef[1], vars, seen) : raw;
}

function useResolvedTokens(varNames: string[], activeTheme: FidoUIThemeId) {
  const values = React.useMemo(() => {
    const merged = { ...baseVars, ...themeOverrides[activeTheme] };
    const next: Record<string, string> = {};
    for (const name of varNames) {
      next[name] = resolveVar(name, merged);
    }
    return next;
  }, [varNames, activeTheme]);

  return { values };
}

/* -------------------------------------------------------------------------- */
/*  Token definitions (names only — values are always resolved live)         */
/* -------------------------------------------------------------------------- */

const scale10 = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const scale11 = [...scale10, '950'];

const colorScales: Array<{ name: string; prefix: string; shades: string[] }> = [
  { name: 'Primary', prefix: 'primary', shades: scale10 },
  { name: 'Secondary', prefix: 'secondary', shades: scale10 },
  { name: 'Neutral', prefix: 'neutral', shades: ['white', ...scale11, 'black'] },
];

const semanticGroups: Array<{ name: string; prefix: string; shades: string[] }> = [
  { name: 'Destruct', prefix: 'destruct', shades: ['100', '600', '900'] },
  { name: 'Success', prefix: 'success', shades: ['100', '600', '900'] },
  { name: 'Warning', prefix: 'warning', shades: ['100', '600', '900'] },
  { name: 'Info', prefix: 'info', shades: ['100', '600', '900'] },
  { name: 'Alert', prefix: 'alert', shades: ['100', '600', '900'] },
];

const typeColors = [
  { name: 'type-heading', cls: 'bg-fido-ui-type-heading' },
  { name: 'type-body', cls: 'bg-fido-ui-type-body' },
  { name: 'type-action-dark', cls: 'bg-fido-ui-type-action-dark' },
  { name: 'type-action-light', cls: 'bg-fido-ui-type-action-light' },
  { name: 'type-callout-dark', cls: 'bg-fido-ui-type-callout-dark' },
  { name: 'type-callout-light', cls: 'bg-fido-ui-type-callout-light' },
];

const headingSizes = ['h1', 'h2', 'h3', 'h4', 'h5'];
const paragraphSizes = ['p1', 'p2', 'p3', 'p4', 'p5'];
const spacingScale = ['2xs', 'xs', 'sm', 'md', 'lg', 'base', 'xl', '2xl', '3xl', '4xl', '5xl'];
const strokeWidths = ['xs', 'sm', 'md', 'lg', 'xl'];
const radii = ['xs', 'sm', 'md', 'lg', 'xl'];
const shadowNames = ['sm', 'md', 'lg'];

/* -------------------------------------------------------------------------- */
/*  Full list of CSS variables this showcase needs resolved live             */
/* -------------------------------------------------------------------------- */

const allColorVars = [
  ...colorScales.flatMap(({ prefix, shades }) => shades.map((s) => `--color-fido-ui-${prefix}-${s}`)),
  ...semanticGroups.flatMap(({ prefix, shades }) => shades.map((s) => `--color-fido-ui-${prefix}-${s}`)),
  ...typeColors.map(({ name }) => `--color-fido-ui-${name}`),
];
const allSpacingVars = spacingScale.map((s) => `--spacing-fido-ui-${s}`);
const allRadiusVars = radii.map((s) => `--radius-fido-ui-${s}`);
const allStrokeVars = strokeWidths.map((s) => `--border-width-fido-ui-${s}`);
const allFontSizeVars = [...headingSizes, ...paragraphSizes].flatMap((s) => [
  `--font-size-fido-ui-${s}`,
  `--font-size-fido-ui-${s}-tablet`,
  `--font-size-fido-ui-${s}-mobile`,
]);
const allShadowVars = shadowNames.map((s) => `--shadow-fido-ui-${s}`);

const allTokenVars = [
  ...allColorVars,
  ...allSpacingVars,
  ...allRadiusVars,
  ...allStrokeVars,
  ...allFontSizeVars,
  ...allShadowVars,
];

/* -------------------------------------------------------------------------- */
/*  Static bgClass lookups                                                   */
/*  Written as full literal strings (not template-built) so Tailwind's JIT   */
/*  scanner can detect every class at build time.                            */
/* -------------------------------------------------------------------------- */

const colorBgClass: Record<string, string> = {
  'primary-50': 'bg-fido-ui-primary-50',
  'primary-100': 'bg-fido-ui-primary-100',
  'primary-200': 'bg-fido-ui-primary-200',
  'primary-300': 'bg-fido-ui-primary-300',
  'primary-400': 'bg-fido-ui-primary-400',
  'primary-500': 'bg-fido-ui-primary-500',
  'primary-600': 'bg-fido-ui-primary-600',
  'primary-700': 'bg-fido-ui-primary-700',
  'primary-800': 'bg-fido-ui-primary-800',
  'primary-900': 'bg-fido-ui-primary-900',
  'secondary-50': 'bg-fido-ui-secondary-50',
  'secondary-100': 'bg-fido-ui-secondary-100',
  'secondary-200': 'bg-fido-ui-secondary-200',
  'secondary-300': 'bg-fido-ui-secondary-300',
  'secondary-400': 'bg-fido-ui-secondary-400',
  'secondary-500': 'bg-fido-ui-secondary-500',
  'secondary-600': 'bg-fido-ui-secondary-600',
  'secondary-700': 'bg-fido-ui-secondary-700',
  'secondary-800': 'bg-fido-ui-secondary-800',
  'secondary-900': 'bg-fido-ui-secondary-900',
  'neutral-white': 'bg-fido-ui-neutral-white',
  'neutral-50': 'bg-fido-ui-neutral-50',
  'neutral-100': 'bg-fido-ui-neutral-100',
  'neutral-200': 'bg-fido-ui-neutral-200',
  'neutral-300': 'bg-fido-ui-neutral-300',
  'neutral-400': 'bg-fido-ui-neutral-400',
  'neutral-500': 'bg-fido-ui-neutral-500',
  'neutral-600': 'bg-fido-ui-neutral-600',
  'neutral-700': 'bg-fido-ui-neutral-700',
  'neutral-800': 'bg-fido-ui-neutral-800',
  'neutral-900': 'bg-fido-ui-neutral-900',
  'neutral-950': 'bg-fido-ui-neutral-950',
  'neutral-black': 'bg-fido-ui-neutral-black',
  'destruct-100': 'bg-fido-ui-destruct-100',
  'destruct-600': 'bg-fido-ui-destruct-600',
  'destruct-900': 'bg-fido-ui-destruct-900',
  'success-100': 'bg-fido-ui-success-100',
  'success-600': 'bg-fido-ui-success-600',
  'success-900': 'bg-fido-ui-success-900',
  'warning-100': 'bg-fido-ui-warning-100',
  'warning-600': 'bg-fido-ui-warning-600',
  'warning-900': 'bg-fido-ui-warning-900',
  'info-100': 'bg-fido-ui-info-100',
  'info-600': 'bg-fido-ui-info-600',
  'info-900': 'bg-fido-ui-info-900',
  'alert-100': 'bg-fido-ui-alert-100',
  'alert-600': 'bg-fido-ui-alert-600',
  'alert-900': 'bg-fido-ui-alert-900',
  'type-heading': 'bg-fido-ui-type-heading',
  'type-body': 'bg-fido-ui-type-body',
  'type-action-dark': 'bg-fido-ui-type-action-dark',
  'type-action-light': 'bg-fido-ui-type-action-light',
  'type-callout-dark': 'bg-fido-ui-type-callout-dark',
  'type-callout-light': 'bg-fido-ui-type-callout-light',
};

const fontSizeClass: Record<string, string> = {
  h1: 'text-fido-ui-h1',
  h2: 'text-fido-ui-h2',
  h3: 'text-fido-ui-h3',
  h4: 'text-fido-ui-h4',
  h5: 'text-fido-ui-h5',
  p1: 'text-fido-ui-p1',
  p2: 'text-fido-ui-p2',
  p3: 'text-fido-ui-p3',
  p4: 'text-fido-ui-p4',
  p5: 'text-fido-ui-p5',
};

const radiusClass: Record<string, string> = {
  xs: 'rounded-fido-ui-xs',
  sm: 'rounded-fido-ui-sm',
  md: 'rounded-fido-ui-md',
  lg: 'rounded-fido-ui-lg',
  xl: 'rounded-fido-ui-xl',
};

const shadowClass: Record<string, string> = {
  sm: 'shadow-fido-ui-sm',
  md: 'shadow-fido-ui-md',
  lg: 'shadow-fido-ui-lg',
};

/* -------------------------------------------------------------------------- */
/*  Shared sub-components                                                     */
/* -------------------------------------------------------------------------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-fido-ui-paragraph text-fido-ui-h2 font-semibold text-fido-ui-neutral-950 mb-2 mt-10 first:mt-0">
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-fido-ui-paragraph text-fido-ui-h3 font-medium text-fido-ui-neutral-700 mb-3 mt-6">
      {children}
    </h3>
  );
}

function ThemeBadge({ activeTheme }: { activeTheme: FidoUIThemeId }) {
  return (
    <div className="text-fido-ui-p2 flex flex-wrap items-center gap-2 mb-8 p-3 rounded-fido-ui-md border border-fido-ui-neutral-200 bg-fido-ui-neutral-50">
      <span className="font-fido-ui-paragraph text-fido-ui-neutral-600">
        Live values for theme:
      </span>
      {fidoUIThemes.map((theme) => (
        <span
          key={theme.id}
          className={`font-fido-ui-paragraph text-fido-ui-p4 font-medium px-2 py-1 rounded-fido-ui-full border ${
            theme.id === activeTheme
              ? 'bg-fido-ui-primary-600 text-white border-fido-ui-primary-600'
              : 'bg-transparent text-fido-ui-neutral-700 border-fido-ui-neutral-200'
          }`}
        >
          {theme.label}
        </span>
      ))}
      <br/>
      <span className="font-fido-ui-paragraph text-fido-ui-p2 text-fido-ui-neutral-600">
        Switch via the <strong>Theme</strong> toolbar above
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Color swatch                                                              */
/* -------------------------------------------------------------------------- */

function Swatch({
  bgClass,
  label,
  hex,
}: {
  bgClass: string;
  label: string;
  hex: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${bgClass} w-16 h-16 rounded-fido-ui-md border border-fido-ui-neutral-200 flex items-center justify-center`}
      >
        {/* Solid backdrop (rather than a dark/light text toggle) guarantees
            legible contrast regardless of the swatch's underlying color. */}
        <span className="font-fido-ui-paragraph text-[9px] font-medium select-all text-fido-ui-neutral-900 bg-fido-ui-neutral-white/90 rounded-fido-ui-xs px-1 py-0.5">
          {hex || '—'}
        </span>
      </div>
      <span className="font-fido-ui-paragraph text-fido-ui-p5 text-fido-ui-neutral-600 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main showcase                                                             */
/* -------------------------------------------------------------------------- */

export function TokenShowcase({
  activeTheme = 'primary',
}: {
  /** Active `data-fido-ui-theme` value, resolved from the Storybook Theme toolbar. */
  activeTheme?: FidoUIThemeId;
}) {
  const { values } = useResolvedTokens(allTokenVars, activeTheme);

  const colorValue = (prefix: string, shade: string) =>
    values[`--color-fido-ui-${prefix}-${shade}`] ?? '';
  const spacingValue = (name: string) => values[`--spacing-fido-ui-${name}`] ?? '';
  const radiusValue = (name: string) => values[`--radius-fido-ui-${name}`] ?? '';
  const strokeValue = (name: string) => values[`--border-width-fido-ui-${name}`] ?? '';
  const fontSizeValue = (name: string) => values[`--font-size-fido-ui-${name}`] ?? '';
  const shadowValue = (name: string) => values[`--shadow-fido-ui-${name}`] ?? '';

  return (
    <div className="font-fido-ui-paragraph space-y-4 max-w-[1000px] mx-auto">
      <ThemeBadge activeTheme={activeTheme} />

      {/* ---------------------------------------------------------------- */}
      {/*  Colors                                                          */}
      {/* ---------------------------------------------------------------- */}
      <SectionTitle>Color Palette</SectionTitle>

      {colorScales.map(({ name, prefix, shades }) => (
        <React.Fragment key={name}>
          <SubTitle>{name}</SubTitle>
          <div className="flex flex-wrap gap-3">
            {shades.map((shade) => (
              <Swatch
                key={shade}
                bgClass={colorBgClass[`${prefix}-${shade}`]}
                label={`${prefix}-${shade}`}
                hex={colorValue(prefix, shade)}
              />
            ))}
          </div>
        </React.Fragment>
      ))}

      {/* Type (semantic text) */}
      <SubTitle>Type (semantic)</SubTitle>
      <div className="flex flex-wrap gap-3">
        {typeColors.map(({ name, cls }) => (
          <Swatch
            key={name}
            bgClass={cls}
            label={name}
            hex={values[`--color-fido-ui-${name}`] ?? ''}
          />
        ))}
      </div>

      {/* Semantic palettes */}
      <SubTitle>Semantic palettes</SubTitle>
      <div className="grid grid-cols-1 gap-6">
        {semanticGroups.map(({ name, prefix, shades }) => (
          <div key={name}>
            <p className="font-fido-ui-paragraph text-fido-ui-p2 font-medium text-fido-ui-neutral-800 mb-2">
              {name}
            </p>
            <div className="flex gap-2">
              {shades.map((shade) => (
                <Swatch
                  key={shade}
                  bgClass={colorBgClass[`${prefix}-${shade}`]}
                  label={shade}
                  hex={colorValue(prefix, shade)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Typography                                                      */}
      {/* ---------------------------------------------------------------- */}
      <SectionTitle>Typography</SectionTitle>

      <p className="font-fido-ui-paragraph text-fido-ui-p2 text-fido-ui-neutral-600 mb-4">
        Font family:{' '}
        <code className="bg-fido-ui-neutral-100 px-1.5 py-0.5 rounded-fido-ui-xs text-fido-ui-neutral-800">
          Archivo, ui-sans-serif, system-ui, sans-serif
        </code>
      </p>

      <SubTitle>Heading scale (H1–H5)</SubTitle>
      <div className="space-y-3 mb-6">
        {headingSizes.map((name) => (
          <div
            key={name}
            className="flex items-baseline gap-4 border-b border-fido-ui-neutral-100 pb-3"
          >
            <code className="font-fido-ui-paragraph text-fido-ui-p2 text-fido-ui-neutral-500 w-56 shrink-0">
              text-fido-ui-{name}{' '}
              <span className="text-fido-ui-neutral-600">
                ({fontSizeValue(name) || '…'} / {fontSizeValue(`${name}-tablet`) || '…'} /{' '}
                {fontSizeValue(`${name}-mobile`) || '…'})
              </span>
            </code>
            <span
              className={`${fontSizeClass[name]} font-fido-ui-heading font-semibold leading-fido-ui-tight text-fido-ui-neutral-950`}
            >
              Heading {name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <SubTitle>Paragraph scale (P1–P5)</SubTitle>
      <div className="space-y-4">
        {paragraphSizes.map((name) => (
          <div
            key={name}
            className="flex items-baseline gap-4 border-b border-fido-ui-neutral-100 pb-3"
          >
            <code className="font-fido-ui-paragraph text-fido-ui-p2 text-fido-ui-neutral-500 w-56 shrink-0">
              text-fido-ui-{name}{' '}
              <span className="text-fido-ui-neutral-600">
                ({fontSizeValue(name) || '…'} / {fontSizeValue(`${name}-tablet`) || '…'} /{' '}
                {fontSizeValue(`${name}-mobile`) || '…'})
              </span>
            </code>
            <span
              className={`${fontSizeClass[name]} font-fido-ui-paragraph leading-fido-ui-normal text-fido-ui-neutral-950`}
            >
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>

      <p className="font-fido-ui-paragraph text-fido-ui-p2 text-fido-ui-neutral-600 mt-4">
        Sizes are shown as desktop / tablet / mobile. Canonical utilities (e.g.{' '}
        <code>text-fido-ui-h1</code>) use the desktop value; tablet and mobile values are opt-in
        via <code>--font-size-fido-ui-*-tablet</code> / <code>-mobile</code> variables. Line-height
        tokens (<code>leading-fido-ui-tight|normal|relaxed</code>) are FidoUI conventions, not
        Figma-synced.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/*  Spacing (Gaps, desktop)                                         */}
      {/* ---------------------------------------------------------------- */}
      <SectionTitle>Spacing (Gaps)</SectionTitle>
      <p className="font-fido-ui-paragraph text-fido-ui-p2 text-fido-ui-neutral-600 mb-8">
        Bar width is set inline from the live <code>--spacing-fido-ui-*</code> value (desktop
        token). Switch the <strong>Theme</strong> toolbar to compare Primary and
        FidoAlert. Tablet/mobile: <code>--spacing-fido-ui-{'{name}'}-tablet</code> /{' '}
        <code>-mobile</code>.
      </p>
      <div className="flex flex-wrap gap-4">
        {spacingScale.map((name) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div
              className="bg-fido-ui-primary-200 rounded-fido-ui-xs h-6"
              style={{ width: spacingValue(name) || 4 }}
            />
            <code className="font-fido-ui-paragraph text-fido-ui-p5 text-fido-ui-neutral-600">
              fido-ui-{name} ({spacingValue(name) || '…'})
            </code>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Strokes                                                         */}
      {/* ---------------------------------------------------------------- */}
      <SectionTitle>Border width (Strokes)</SectionTitle>
      <div className="flex flex-wrap gap-6 mt-2">
        {strokeWidths.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-fido-ui-md border-fido-ui-primary-500"
              style={{ borderWidth: strokeValue(name) || undefined }}
            />
            <code className="font-fido-ui-paragraph text-fido-ui-p5 text-fido-ui-neutral-600">
              border-fido-ui-{name}
            </code>
            <span className="font-fido-ui-paragraph text-fido-ui-p4-mobile text-fido-ui-neutral-600">
              {strokeValue(name) || '…'}
            </span>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Border Radius                                                   */}
      {/* ---------------------------------------------------------------- */}
      <SectionTitle>Border Radius</SectionTitle>

      <div className="flex flex-wrap gap-5">
        {radii.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className={`${radiusClass[name]} w-20 h-20 bg-fido-ui-primary-100 border-2 border-fido-ui-primary-500`}
            />
            <code className="font-fido-ui-paragraph text-fido-ui-p5 text-fido-ui-neutral-600">{name}</code>
            <span className="font-fido-ui-paragraph text-fido-ui-p4-mobile text-fido-ui-neutral-600">
              {radiusValue(name) || '…'}
            </span>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Shadows                                                         */}
      {/* ---------------------------------------------------------------- */}
      <SectionTitle>Shadows</SectionTitle>

      <div className="flex flex-wrap gap-8 mt-2">
        {shadowNames.map((name) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div
              title={shadowValue(name)}
              className={`${shadowClass[name]} w-32 h-24 bg-fido-ui-neutral-white rounded-fido-ui-md`}
            />
            <code className="font-fido-ui-paragraph text-fido-ui-p5 text-fido-ui-neutral-600">
              shadow-fido-ui-{name}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenShowcase;
