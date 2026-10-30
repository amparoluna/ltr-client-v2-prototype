import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconCategories, iconCount } from '../src/catalog';
import { version } from '../package.json';

interface CatalogArgs {
  color: string;
  size: number;
}

function componentNameToSlug(name: string) {
  return name
    .replace(/Icon$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function IconCatalog({ color, size }: CatalogArgs) {
  const [query, setQuery] = React.useState('');
  const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleCategories = iconCategories
    .map((category) => ({
      ...category,
      icons: Object.entries(category.icons).filter(
        ([name]) =>
          name.toLowerCase().includes(normalizedQuery) ||
          category.name.toLowerCase().includes(normalizedQuery),
      ),
    }))
    .filter((category) => category.icons.length > 0);
  const visibleIconCount = visibleCategories.reduce(
    (total, category) => total + category.icons.length,
    0,
  );

  async function copyImport(categorySlug: string, name: string) {
    const slug = componentNameToSlug(name);
    const statement = `import { ${name} } from '@petscreeninginc/fido-ui-icons/${categorySlug}/${slug}';`;

    try {
      await navigator.clipboard.writeText(statement);
      setCopiedIcon(`${categorySlug}/${name}`);
    } catch {
      setCopiedIcon(null);
    }
  }

  return (
    <main className="icon-catalog">
      <div className="icon-catalog__inner">
        <header className="icon-catalog__header">
          <h1 className="icon-catalog__title">
            Icon catalog
            <span className="icon-catalog__version">v{version}</span>
          </h1>
          <p className="icon-catalog__lede">
            {iconCount} icons across {iconCategories.length} categories. Select an icon to copy its
            direct import.
          </p>
        </header>

        <div className="icon-catalog__search">
          <label className="icon-catalog__search-label" htmlFor="icon-search">
            Search icons
          </label>
          <input
            id="icon-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Try dog, arrow, payment, or bold"
            className="icon-catalog__search-input"
          />
        </div>

        <p className="icon-catalog__sr-only" aria-live="polite">
          {copiedIcon ? `${copiedIcon} import copied` : ''}
        </p>

        {visibleIconCount > 0 ? (
          <div className="icon-catalog__sections">
            {visibleCategories.map((category) => (
              <section key={category.slug} className="icon-catalog__section">
                <h2 className="icon-catalog__section-title">
                  {category.name}
                  <span className="icon-catalog__section-count">{category.icons.length}</span>
                </h2>
                <ul className="icon-catalog__grid">
                  {category.icons.map(([name, Icon]) => {
                    const copyKey = `${category.slug}/${name}`;
                    const isCopied = copiedIcon === copyKey;

                    return (
                      <li key={copyKey}>
                        <button
                          type="button"
                          onClick={() => void copyImport(category.slug, name)}
                          aria-label={`Copy direct import for ${name}`}
                          className="icon-catalog__tile"
                        >
                          <Icon aria-hidden="true" style={{ color, height: size, width: size }} />
                          <span className="icon-catalog__tile-label">
                            <code className="icon-catalog__tile-name">{name}</code>
                            <span className="icon-catalog__tile-hint">
                              {isCopied ? 'Copied' : 'Copy import'}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="icon-catalog__empty">No icons match “{query}”.</p>
        )}
      </div>
    </main>
  );
}

const meta = {
  title: 'Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Install

\`\`\`sh
pnpm add @petscreeninginc/fido-ui-icons
\`\`\`

## Use

Import from a category when you need several icons:

\`\`\`tsx
import { DogIcon, PawPrintBoldIcon } from '@petscreeninginc/fido-ui-icons';

<DogIcon width={20} height={20} style={{ color: '#1d4ed8' }} />
<PawPrintBoldIcon title="Pets" width={24} height={24} />
\`\`\`

Or use a direct subpath for the smallest, most predictable module graph:

\`\`\`tsx
import { DogIcon } from '@petscreeninginc/fido-ui-icons/pets/dog';
\`\`\`

Icons inherit \`currentColor\`, accept native SVG props, and are decorative by default. Add
\`title\`, \`aria-label\`, or \`aria-labelledby\` only when the icon conveys information that
is not already available as text.
`,
      },
    },
  },
  args: {
    color: '#404040',
    size: 24,
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Preview color applied through currentColor.',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 2 },
      description: 'Preview width and height in pixels.',
    },
  },
} satisfies Meta<CatalogArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = {
  render: (args) => <IconCatalog {...args} />,
};
