import type { Meta, StoryObj } from '@storybook/react-vite';
import { TokenShowcase } from './components/TokenShowcase';
import type { FidoUIThemeId } from '../src/tokens/themes';

/**
 * Rendered as a real story (rather than inline in the MDX) so it inherits the
 * global "Theme" toolbar decorator from `.storybook/preview.ts`.
 *
 * The active theme is read from `context.globals.fidoUITheme` inside `render`
 * — Storybook preview hooks (e.g. `useGlobals`) only work when called
 * directly in a decorator/render function, not in a nested component, so we
 * resolve it here and pass it down as a plain prop.
 */
const meta: Meta<typeof TokenShowcase> = {
  title: 'Getting Started/Design Tokens',
  component: TokenShowcase,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof TokenShowcase>;

export const Showcase: Story = {
  render: (_args, context) => (
    <TokenShowcase activeTheme={(context.globals.fidoUITheme ?? 'primary') as FidoUIThemeId} />
  ),
};
