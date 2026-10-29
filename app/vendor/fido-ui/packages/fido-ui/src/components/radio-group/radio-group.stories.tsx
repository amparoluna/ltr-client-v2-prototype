import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioItem } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A group of radio buttons that lets the user select a single option from a set. Each \`RadioItem\`
supports a bold label, an optional description, a bordered \`container\` treatment, and error/disabled
states. The group is dumb — selection can be controlled via \`value\`/\`onValueChange\` or left
uncontrolled with \`defaultValue\`; validation copy is supplied by the consumer.

## Import

\`\`\`tsx
import { RadioGroup, RadioItem } from '@petscreeninginc/fido-ui/radio-group';
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
    label: { control: 'text', description: 'Text label displayed above the group' },
    description: { control: 'text', description: 'Helper text shown below the label when there is no error' },
    error: { control: 'text', description: 'Error message shown below the group; sets items to an error state' },
    disabled: { control: 'boolean', description: 'Disable all radio items in the group' },
    name: { control: false, description: 'Shared HTML name for the underlying inputs' },
    value: { control: false, description: 'Controlled selected value' },
    defaultValue: { control: false, description: 'Uncontrolled initial value' },
    onValueChange: { control: false, description: 'Fired when the selected value changes' },
    children: { control: false, description: 'RadioItem elements' },
    className: { control: false, description: 'Class applied to the group root' },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/** Primary Docs example — item labels and descriptions follow the Figma anatomy. */
export const Examples: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="pro" className="max-w-sm">
      <RadioItem value="free" label="Free" description="For individuals getting started." />
      <RadioItem value="pro" label="Pro" description="For small teams that need more room." />
      <RadioItem value="enterprise" label="Enterprise" description="Advanced controls and support." />
    </RadioGroup>
  ),
};

/** Radio items with descriptions and no labels. */
export const DescriptionOnly: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="pro" className="max-w-sm">
      <RadioItem value="free" description="For individuals getting started." />
      <RadioItem value="pro" description="For small teams that need more room." />
      <RadioItem value="enterprise" description="Advanced controls and support." />
    </RadioGroup>
  ),
};

/** Labels only, without descriptions. */
export const LabelOnly: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="a">
      <RadioItem value="a" label="Option A" />
      <RadioItem value="b" label="Option B" />
      <RadioItem value="c" label="Option C" />
    </RadioGroup>
  ),
};

/** Each option wrapped in a bordered container card. */
export const Container: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="pro" className="max-w-sm">
      <RadioItem value="free" label="Free" description="For individuals getting started." container />
      <RadioItem value="pro" label="Pro" description="For small teams that need more room." container />
      <RadioItem value="enterprise" label="Enterprise" description="Advanced controls and support." container />
    </RadioGroup>
  ),
};

/** Validation error treatment applied directly to each radio item. */
export const WithError: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="c">
      <RadioItem value="a" label="Option A" description="First choice." state="error" />
      <RadioItem value="b" label="Option B" description="Second choice." state="error" container />
      <RadioItem value="c" label="Option C" description="Selected choice." state="error" container />
    </RadioGroup>
  ),
};

/** All items disabled and non-interactive. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="a" label="Option A" description="First choice." />
      <RadioItem value="b" label="Option B" description="Second choice." />
    </RadioGroup>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Default
        </p>
        <RadioGroup defaultValue="a">
          <RadioItem value="a" label="Radio Button Text" description="This is a radio description." />
          <RadioItem value="b" label="Radio Button Text" description="This is a radio description." />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Container
        </p>
        <RadioGroup defaultValue="a" className="w-60">
          <RadioItem value="a" label="Radio Button Text" description="This is a radio description." container />
          <RadioItem value="b" label="Radio Button Text" description="This is a radio description." container />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Error
        </p>
        <RadioGroup>
          <RadioItem value="a" label="Radio Button Text" description="This is a radio description." state="error" />
          <RadioItem value="b" label="Radio Button Text" description="This is a radio description." state="error" container />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Disabled
        </p>
        <RadioGroup disabled>
          <RadioItem value="a" label="Radio Button Text" description="This is a radio description." />
          <RadioItem value="b" label="Radio Button Text" description="This is a radio description." container />
        </RadioGroup>
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup {...args} defaultValue="pro" className="max-w-sm">
      <RadioItem value="free" label="Free" description="For individuals getting started." />
      <RadioItem value="pro" label="Pro" description="For small teams that need more room." />
      <RadioItem value="enterprise" label="Enterprise" description="Advanced controls and support." />
    </RadioGroup>
  ),
};
