import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeNumber } from './badge-number';

const colors = ['primary', 'secondary', 'info', 'alert', 'warning', 'success', 'neutral'] as const;
const shades = ['dark', 'light'] as const;

const meta: Meta<typeof BadgeNumber> = {
  title: 'Components/BadgeNumber',
  component: BadgeNumber,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A fixed-size square badge for displaying a numeric status or count, with
\`color\` and \`shade\` variants matching the Badge palette.

## Import

\`\`\`tsx
import { BadgeNumber } from '@petscreeninginc/fido-ui/badge-number';
\`\`\`
`,
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The number or short character to display.',
    },
    color: {
      control: 'select',
      options: [...colors],
      description: 'Color scheme (Figma: Primary, Secondary, Info, Alert, Warning, Success, Neutral).',
      table: { defaultValue: { summary: 'primary' } },
    },
    shade: {
      control: 'select',
      options: [...shades],
      description: 'Visual weight (Figma: Dark, Light).',
      table: { defaultValue: { summary: 'dark' } },
    },
  },
  args: {
    children: '4',
    color: 'primary',
    shade: 'dark',
  },
};

export default meta;
type Story = StoryObj<typeof BadgeNumber>;

export const Default: Story = {};

export const Light: Story = {
  args: { shade: 'light' },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-3">
          <span className="w-20 text-sm capitalize text-gray-500">{color}</span>
          {shades.map((shade) => (
            <BadgeNumber key={shade} color={color} shade={shade}>
              10
            </BadgeNumber>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
};
