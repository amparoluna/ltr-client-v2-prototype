import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Check } from 'lucide-react';
import { Badge } from './badge';

const colors = ['primary', 'secondary', 'neutral', 'success', 'info', 'warning', 'alert'] as const;
const shades = ['dark', 'light'] as const;
const sizes = ['lg', 'md', 'sm'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A small label for showing status, count, or classification, with \`color\`,
\`shade\`, and \`size\` variants plus optional leading/trailing icons and a
dismiss action.

## Import

\`\`\`tsx
import { Badge } from '@petscreeninginc/fido-ui/badge';
\`\`\`
`,
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge label.',
    },
    color: {
      control: 'select',
      options: [...colors],
      description: 'Color scheme (Figma: Primary, Secondary, Neutral, Success, Info, Warning, Alert).',
      table: { defaultValue: { summary: 'primary' } },
    },
    shade: {
      control: 'select',
      options: [...shades],
      description: 'Visual weight (Figma: Dark, Light).',
      table: { defaultValue: { summary: 'dark' } },
    },
    size: {
      control: 'select',
      options: [...sizes],
      description: 'Size (Figma: LG → lg, MED → md, SM → sm).',
      table: { defaultValue: { summary: 'lg' } },
    },
    leftIcon: { control: false, description: 'Icon component rendered before the label.' },
    rightIcon: {
      control: false,
      description: 'Icon component rendered after the label (ignored when `onDismiss` is set).',
    },
    onDismiss: { control: false, description: 'Renders a trailing dismiss (X) button.' },
  },
  args: {
    children: 'Label',
    color: 'primary',
    shade: 'dark',
    size: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const WithLeftIcon: Story = {
  args: { leftIcon: Check },
};

export const Dismissible: Story = {
  args: { onDismiss: () => {} },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Badge key={size} size={size}>
          Label
        </Badge>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-3">
          <span className="w-20 text-sm capitalize text-gray-500">{color}</span>
          {sizes.map((size) =>
            shades.map((shade) => (
              <Badge key={`${size}-${shade}`} color={color} shade={shade} size={size}>
                Label
              </Badge>
            )),
          )}
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The padding tightens on whichever side holds an icon, matching Figma’s Icon=Left / Icon=Right variants.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-20 text-sm uppercase text-gray-500">{size}</span>
          <Badge size={size}>Label</Badge>
          <Badge size={size} leftIcon={Check}>
            Label
          </Badge>
          <Badge size={size} rightIcon={ArrowRight}>
            Label
          </Badge>
          <Badge size={size} onDismiss={() => {}}>
            Label
          </Badge>
        </div>
      ))}
    </div>
  ),
};

export const WithDismiss: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-3">
          <span className="w-20 text-sm capitalize text-gray-500">{color}</span>
          <Badge color={color} shade="dark" onDismiss={() => {}}>
            Label
          </Badge>
          <Badge color={color} shade="light" onDismiss={() => {}}>
            Label
          </Badge>
        </div>
      ))}
    </div>
  ),
};
