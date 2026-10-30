import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A multi-line text field with an accessible label, optional helper or error feedback, tooltip support, and character counting.

## Import

\`\`\`tsx
import { Textarea } from '@petscreeninginc/fido-ui/textarea';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <div className="w-[525px] max-w-full">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label rendered above or inside the textarea.',
    },
    labelPlacement: {
      control: 'inline-radio',
      options: ['stacked', 'internal'],
      description: 'Positions the label above or inside the textarea.',
      table: { defaultValue: { summary: 'stacked' } },
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hides the label while preserving its accessible name.',
    },
    optional: {
      control: 'boolean',
      description: 'Shows an “(Optional)” suffix beside the label.',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text shown from the label info icon.',
    },
    description: {
      control: 'text',
      description: 'Helper text shown below the textarea when there is no error.',
    },
    error: {
      control: 'text',
      description: 'Error feedback that replaces the description.',
    },
    state: {
      control: 'select',
      options: ['default', 'filled', 'error', 'success', 'disabled'],
      description: 'Visual state. A non-empty value automatically uses the filled state.',
      table: { defaultValue: { summary: 'default' } },
    },
    maxLength: {
      control: 'number',
      description: 'Native maximum character length.',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Shows the character count when maxLength is set.',
    },
    disabled: { control: 'boolean' },
    className: { control: false },
    textareaClassName: { control: false },
    onChange: { control: false },
  },
  args: {
    label: 'Label',
    optional: true,
    placeholder: 'Placeholder',
    description: 'This is a textarea description.',
    tooltip: 'More information',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/** Primary Docs example — a single instance controlled through Args. */
export const Examples: Story = {};

export const Focus: Story = {
  args: { autoFocus: true },
};

export const InternalLabel: Story = {
  args: { labelPlacement: 'internal' },
};

export const Filled: Story = {
  args: { defaultValue: 'Placeholder' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: {
    description: undefined,
    error: 'This is a textarea description.',
  },
};

export const ErrorFocus: Story = {
  args: {
    autoFocus: true,
    description: undefined,
    error: 'This is a textarea description.',
  },
};

export const WithCharacterCount: Story = {
  args: { maxLength: 300 },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Default
        </p>
        <Textarea
          label="Label"
          optional
          tooltip="More information"
          placeholder="Placeholder"
          description="This is a textarea description."
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Filled
        </p>
        <Textarea
          label="Label"
          optional
          tooltip="More information"
          defaultValue="Placeholder"
          description="This is a textarea description."
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Internal label
        </p>
        <Textarea
          label="Label"
          labelPlacement="internal"
          optional
          tooltip="More information"
          placeholder="Placeholder"
          description="This is a textarea description."
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Disabled
        </p>
        <Textarea
          label="Label"
          optional
          tooltip="More information"
          placeholder="Placeholder"
          description="This is a textarea description."
          disabled
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Error
        </p>
        <Textarea
          label="Label"
          optional
          tooltip="More information"
          placeholder="Placeholder"
          error="This is a textarea description."
        />
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — kept separate from the Docs primary. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
};
