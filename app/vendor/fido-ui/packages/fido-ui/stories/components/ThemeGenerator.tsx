import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Convert Figma RGBA (0-1 floats) to hex string */
function rgbaToHex(color: { r: number; g: number; b: number; a?: number }): string {
  const toHex = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, '0');
  const hex = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  if (color.a !== undefined && color.a < 1) {
    return `${hex}${toHex(color.a)}`;
  }
  return hex;
}

/** Map a Figma variable name to a FidoUI CSS custom property name */
function mapTokenName(name: string): string | null {
  // Normalize separators: "primary/500" or "primary-500" → ["primary", "500"]
  const parts = name
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .split('-')
    .filter(Boolean);

  if (parts.length < 2) return null;

  // Detect category from the first part
  const colorGroups = ['primary', 'neutral', 'destruct', 'success', 'warning', 'info', 'secondary', 'alert'];
  const first = parts[0];

  if (colorGroups.includes(first)) {
    return `--color-fido-ui-${parts.join('-')}`;
  }
  if (first === 'color' || first === 'colors') {
    return `--color-fido-ui-${parts.slice(1).join('-')}`;
  }
  if (first === 'radius' || first === 'corner' || first === 'corners') {
    return `--radius-fido-ui-${parts.slice(1).join('-')}`;
  }
  if (first === 'spacing' || first === 'space') {
    return `--spacing-fido-ui-${parts.slice(1).join('-')}`;
  }
  if (first === 'font' && parts[1] === 'size') {
    return `--font-size-fido-ui-${parts.slice(2).join('-')}`;
  }
  if (first === 'font') {
    return `--font-fido-ui-${parts.slice(1).join('-')}`;
  }
  if (first === 'shadow') {
    return `--shadow-fido-ui-${parts.slice(1).join('-')}`;
  }

  // Fallback: assume color if value looks like a color
  return `--color-fido-ui-${parts.join('-')}`;
}

interface ParsedToken {
  cssVar: string;
  value: string;
  isColor: boolean;
}

/** Try to parse input as Figma Variables JSON, simple JSON, or CSS variables */
function parseInput(text: string): ParsedToken[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  // Try Figma REST API Variables JSON format
  try {
    const json = JSON.parse(trimmed);

    // Figma format: { variables: { "id": { name, resolvedType, valuesByMode: { modeId: value } } } }
    if (json.variables && typeof json.variables === 'object') {
      const tokens: ParsedToken[] = [];
      for (const variable of Object.values(json.variables) as any[]) {
        const name = variable.name;
        const resolvedType = variable.resolvedType;
        const valuesByMode = variable.valuesByMode;
        if (!name || !valuesByMode) continue;

        // Get the first mode's value
        const modeValue = Object.values(valuesByMode)[0] as any;
        if (!modeValue) continue;

        const cssVar = mapTokenName(name);
        if (!cssVar) continue;

        if (resolvedType === 'COLOR' && typeof modeValue === 'object' && 'r' in modeValue) {
          tokens.push({ cssVar, value: rgbaToHex(modeValue), isColor: true });
        } else if (resolvedType === 'FLOAT' || resolvedType === 'STRING') {
          const val = typeof modeValue === 'number' ? `${modeValue}px` : String(modeValue);
          tokens.push({ cssVar, value: val, isColor: false });
        }
      }
      if (tokens.length > 0) return tokens;
    }

    // Simple JSON format: { "primary-500": "#hex", ... }
    if (typeof json === 'object' && !Array.isArray(json)) {
      const tokens: ParsedToken[] = [];
      for (const [key, value] of Object.entries(json)) {
        if (typeof value !== 'string') continue;
        const cssVar = mapTokenName(key);
        if (!cssVar) continue;
        const isColor = /^#[0-9a-fA-F]{3,8}$/.test(value) || value.startsWith('rgb');
        tokens.push({ cssVar, value, isColor });
      }
      if (tokens.length > 0) return tokens;
    }
  } catch {
    // Not JSON — try CSS variable format
  }

  // CSS variable format: --color-fido-ui-primary-500: #hex;
  const cssVarRegex = /--([\w-]+)\s*:\s*([^;]+)/g;
  const tokens: ParsedToken[] = [];
  let match;
  while ((match = cssVarRegex.exec(trimmed)) !== null) {
    const varName = `--${match[1]}`;
    const value = match[2].trim();
    const isColor = /^#[0-9a-fA-F]{3,8}$/.test(value) || value.startsWith('rgb');
    tokens.push({ cssVar: varName, value, isColor });
  }

  return tokens;
}

/** Generate the @theme CSS block */
function generateCSS(tokens: ParsedToken[]): string {
  if (tokens.length === 0) return '';
  const lines = tokens.map((t) => `  ${t.cssVar}: ${t.value};`);
  return `@theme {\n${lines.join('\n')}\n}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function ThemeGenerator() {
  const [input, setInput] = React.useState('');
  const [tokens, setTokens] = React.useState<ParsedToken[]>([]);
  const [css, setCss] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleParse = () => {
    const parsed = parseInput(input);
    setTokens(parsed);
    setCss(generateCSS(parsed));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!css) return;
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colorTokens = tokens.filter((t) => t.isColor);
  const otherTokens = tokens.filter((t) => !t.isColor);

  const exampleFigma = JSON.stringify(
    {
      variables: {
        'VariableID:1': {
          name: 'primary/500',
          resolvedType: 'COLOR',
          valuesByMode: { 'modeId:1': { r: 0.545, g: 0.361, b: 0.965, a: 1 } },
        },
        'VariableID:2': {
          name: 'primary/700',
          resolvedType: 'COLOR',
          valuesByMode: { 'modeId:1': { r: 0.427, g: 0.157, b: 0.851, a: 1 } },
        },
      },
    },
    null,
    2,
  );

  const exampleSimple = JSON.stringify(
    {
      'primary-500': '#8b5cf6',
      'primary-700': '#6d28d9',
      'neutral-white': '#ffffff',
      'radius-lg': '16px',
    },
    null,
    2,
  );

  return (
    <div className="font-fido-ui-paragraph" style={{ maxWidth: 800 }}>
      {/* Input */}
      <div style={{ marginBottom: 24 }}>
        <label
          htmlFor="token-input"
          style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}
        >
          Paste Figma Variables JSON or token values:
        </label>
        <textarea
          id="token-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste Figma Variables JSON, simple JSON, or CSS variables here..."
          style={{
            width: '100%',
            minHeight: 200,
            padding: 12,
            borderRadius: 8,
            border: '1px solid #d4d4d4',
            fontFamily: 'monospace',
            fontSize: 13,
            resize: 'vertical',
          }}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            onClick={handleParse}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#3a58f5',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Generate Theme CSS
          </button>
          <button
            onClick={() => setInput(exampleFigma)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#f5f5f5',
              border: '1px solid #d4d4d4',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Load Figma example
          </button>
          <button
            onClick={() => setInput(exampleSimple)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#f5f5f5',
              border: '1px solid #d4d4d4',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Load simple example
          </button>
        </div>
      </div>

      {/* Preview */}
      {tokens.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            Parsed Tokens ({tokens.length})
          </h3>

          {colorTokens.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#595959' }}>
                Colors
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {colorTokens.map((t) => (
                  <div
                    key={t.cssVar}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        backgroundColor: t.value,
                        border: '1px solid #e5e5e5',
                      }}
                    />
                    <span style={{ fontSize: 10, color: '#595959', textAlign: 'center', maxWidth: 64, wordBreak: 'break-all' }}>
                      {t.cssVar.replace('--color-fido-ui-', '')}
                    </span>
                    <span style={{ fontSize: 10, color: '#9c9c9c' }}>{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {otherTokens.length > 0 && (
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#595959' }}>
                Other Tokens
              </h4>
              <table style={{ fontSize: 13, borderCollapse: 'collapse' }}>
                <tbody>
                  {otherTokens.map((t) => (
                    <tr key={t.cssVar}>
                      <td style={{ padding: '4px 12px 4px 0', color: '#595959', fontFamily: 'monospace' }}>
                        {t.cssVar}
                      </td>
                      <td style={{ padding: '4px 0', fontFamily: 'monospace' }}>{t.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CSS Output */}
      {css && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Generated CSS</h3>
            <button
              onClick={handleCopy}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: copied ? '#059666' : '#f5f5f5',
                color: copied ? 'white' : '#262626',
                border: '1px solid',
                borderColor: copied ? '#059666' : '#d4d4d4',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                transition: 'all 150ms',
              }}
            >
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </div>
          <pre
            style={{
              padding: 16,
              borderRadius: 8,
              background: '#0a0a0a',
              color: '#e5e5e5',
              fontSize: 13,
              fontFamily: 'monospace',
              overflow: 'auto',
              lineHeight: 1.6,
            }}
          >
            {css}
          </pre>
          <p style={{ fontSize: 12, color: '#9c9c9c', marginTop: 8 }}>
            Paste this into your CSS file <strong>after</strong> the FidoUI theme import:
          </p>
          <pre
            style={{
              padding: 12,
              borderRadius: 8,
              background: '#fafafa',
              border: '1px solid #e5e5e5',
              fontSize: 12,
              fontFamily: 'monospace',
              color: '#595959',
            }}
          >
{`@import "tailwindcss";
@import "@petscreeninginc/fido-ui/tokens/theme.css";

/* Your generated overrides */
${css}`}
          </pre>
        </div>
      )}
    </div>
  );
}
