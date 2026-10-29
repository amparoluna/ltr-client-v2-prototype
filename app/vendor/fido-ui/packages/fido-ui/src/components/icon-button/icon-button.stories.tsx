import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Plus } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton } from './icon-button';

const colors = ['primary', 'secondary', 'neutral', 'destruct'] as const;
const shades = ['dark', 'light', 'ghost'] as const;

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['ltr'],
  argTypes: {
    color: {
      control: 'select',
      options: [...colors],
      description: 'Color scheme (Figma: Primary, Secondary, Neutral, Destruct)',
    },
    shade: {
      control: 'select',
      options: [...shades],
      description: 'Visual weight (Figma: Dark, Light, Ghost)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (native button prop)',
    },
    icon: {
      control: false,
      description: 'Icon component rendered in the button (lucide-react or Heroicons). Required.',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the icon-only button. Required.',
    },
  },
  args: {
    color: 'primary',
    shade: 'dark',
    icon: Plus,
    'aria-label': 'Add item',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Light: Story = {
  args: { shade: 'light' },
};

export const Ghost: Story = {
  args: { shade: 'ghost' },
};

export const Secondary: Story = {
  args: { color: 'secondary' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const HeroIcon: Story = {
  args: { icon: XMarkIcon, 'aria-label': 'Close' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {colors.map((color) => (
        <div key={color} className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold capitalize text-fido-ui-neutral-600">
            {color}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {shades.map((shade) => (
              <IconButton
                key={`${color}-${shade}`}
                color={color}
                shade={shade}
                icon={Plus}
                aria-label={`${color} ${shade}`}
              />
            ))}
            <IconButton
              color={color}
              shade="dark"
              icon={Plus}
              aria-label={`${color} disabled`}
              disabled
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
