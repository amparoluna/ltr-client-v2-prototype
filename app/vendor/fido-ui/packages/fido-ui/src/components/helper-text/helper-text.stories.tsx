import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelperText } from './helper-text';

const types = ['default', 'inform', 'error', 'success', 'warn', 'loading'] as const;

const meta: Meta<typeof HelperText> = {
  title: 'Components/HelperText',
  component: HelperText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact inline helper text with an optional type-colored leading icon.
Use it to provide additional guidance or feedback next to form fields or actions.

## Import

\`\`\`tsx
import { HelperText } from '@petscreeninginc/fido-ui/helper-text';
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
    type: {
      control: 'select',
      options: [...types],
      description: 'Visual status type (Figma: Type).',
      table: { defaultValue: { summary: 'default' } },
    },
    leftIcon: {
      control: 'boolean',
      description: 'Show the leading status icon (Figma: Left Icon).',
      table: { defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      description: 'Label text rendered next to the icon.',
    },
    className: {
      control: false,
      description: 'Additional class names for the root element.',
    },
  },
  args: {
    children: 'Label',
    type: 'default',
    leftIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

/** Primary Docs example — single instance; use Args to change behavior. */
export const Examples: Story = {};

/** The six Figma variants shown together for visual comparison. */
export const FigmaReference: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-[238px] flex-col items-start gap-fido-ui-xl">
      {types.map((type) => (
        <HelperText key={type} type={type}>
          Label
        </HelperText>
      ))}
    </div>
  ),
};

export const Inform: Story = {
  args: {
    type: 'inform',
    children: 'Information',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    children: 'Something went wrong',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    children: 'Saved',
  },
};

export const Warn: Story = {
  args: {
    type: 'warn',
    children: 'Check this field',
  },
};

export const Loading: Story = {
  args: {
    type: 'loading',
    children: 'Loading…',
  },
};

export const WithoutIcon: Story = {
  args: {
    leftIcon: false,
    children: 'Label only',
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      {types.map((type) => (
        <div key={type} className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <HelperText type={type}>Label</HelperText>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Without icon
        </p>
        <HelperText leftIcon={false}>Label</HelperText>
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
};
