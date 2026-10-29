import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip';
import { Button } from '../button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Short contextual labels shown on hover or keyboard focus. Built on Base UI Tooltip.
Use for supplementary hints only — not for critical information, errors, or actions.
The trigger must be a single React element with an accessible name.

## Install

\`\`\`bash
npm install @petscreeninginc/fido-ui
\`\`\`

## Import

\`\`\`tsx
import { Tooltip } from '@petscreeninginc/fido-ui/tooltip';
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
    content: {
      control: 'text',
      description: 'Content shown inside the tooltip popup.',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred placement relative to the trigger.',
      table: { defaultValue: { summary: 'top' } },
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Delay in milliseconds before the tooltip opens.',
      table: { defaultValue: { summary: '200' } },
    },
    className: {
      control: false,
      description: 'Additional class names for the popup element.',
    },
    children: {
      control: false,
      description: 'Trigger element. Must be a single React element.',
    },
  },
  args: {
    content: 'This is a tooltip',
    side: 'top',
    delay: 200,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="light">
        Hover me
      </Button>
    </Tooltip>
  ),
};

export const Top: Story = {
  args: { side: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="light">
        top
      </Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { side: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="light">
        bottom
      </Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: { side: 'left' },
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="light">
        left
      </Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: { side: 'right' },
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="light">
        right
      </Button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      'Account verification usually finishes within a few minutes. You will get an email when it is done.',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="light">
        Why is this pending?
      </Button>
    </Tooltip>
  ),
};

export const Instant: Story = {
  name: 'No delay',
  args: { delay: 0, content: 'Settings' },
  render: (args) => (
    <Tooltip {...args}>
      <Button color="neutral" shade="ghost">
        Settings
      </Button>
    </Tooltip>
  ),
};

export const AllPlacements: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Tooltip key={side} content="This is a tooltip" side={side} delay={0}>
          <Button color="neutral" shade="light">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};
