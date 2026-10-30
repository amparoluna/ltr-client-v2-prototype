import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './button';

const colors = ['primary', 'secondary', 'neutral', 'destruct'] as const;
const shades = ['dark', 'light', 'ghost'] as const;

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A button with \`color\`, \`shade\`, and \`size\` variants. Optionally renders an
icon before and/or after the label, and supports the native \`disabled\` state.

## Import

\`\`\`tsx
import { Button } from '@petscreeninginc/fido-ui/button';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label.',
    },
    color: {
      control: 'select',
      options: [...colors],
      description: 'Color scheme (Figma: Primary, Secondary, Neutral, Destruct).',
      table: { defaultValue: { summary: 'primary' } },
    },
    shade: {
      control: 'select',
      options: [...shades],
      description: 'Visual weight (Figma: Dark, Light, Ghost).',
      table: { defaultValue: { summary: 'dark' } },
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Size (Figma: MD → md, SM → sm).',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (native button prop).',
    },
    leftIcon: {
      control: false,
      description: 'Icon component before the label (lucide-react or Heroicons).',
    },
    rightIcon: {
      control: false,
      description: 'Icon component after the label (lucide-react or Heroicons).',
    },
    className: {
      control: false,
      description: 'Additional class names for the button element.',
    },
  },
  args: {
    children: 'Button',
    color: 'primary',
    shade: 'dark',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Primary Docs example — single instance; use Args to change behavior. */
export const Examples: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: Plus,
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: XMarkIcon,
  },
};

export const BothIcons: Story = {
  args: {
    leftIcon: Plus,
    rightIcon: XMarkIcon,
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      {colors.map((color) => (
        <div key={color} className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {shades.map((shade) => (
              <Button key={`${color}-${shade}`} color={color} shade={shade}>
                {shade}
              </Button>
            ))}
            <Button color={color} shade="dark" disabled>
              disabled
            </Button>
            <Button color={color} shade="dark" size="sm">
              sm
            </Button>
            <Button color={color} shade="dark" leftIcon={Plus}>
              icon
            </Button>
          </div>
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
