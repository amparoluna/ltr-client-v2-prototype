import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, type InputProps } from './input';

function ControlledInput(args: InputProps) {
  const [value, setValue] = React.useState(String(args.value ?? args.defaultValue ?? ''));

  React.useEffect(() => {
    setValue(String(args.value ?? args.defaultValue ?? ''));
  }, [args.value, args.defaultValue]);

  return (
    <Input
      {...args}
      value={value}
      onChange={(event) => {
        args.onChange?.(event);
        setValue(event.target.value);
      }}
    />
  );
}

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A styled text input primitive. Pair with \`Field\` for labels, helper text,
errors, and adornments.

## Import

\`\`\`tsx
import { Input } from '@petscreeninginc/fido-ui/input';
import { Field } from '@petscreeninginc/fido-ui/field';

<Field label="Email">
  <Input name="email" placeholder="you@example.com" />
</Field>
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-w-lg items-center justify-center p-2">
        <div className="w-full">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: { control: 'boolean' },
    className: { control: false },
    value: { control: 'text' },
    defaultValue: { control: false },
    onChange: { control: false },
  },
  args: {
    'aria-label': 'Email',
    placeholder: 'you@example.com',
    state: 'default',
    disabled: false,
    value: '',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Examples: Story = {
  render: (args) => <ControlledInput {...args} />,
};

export const Filled: Story = {
  args: { value: 'hello@example.com' },
  render: (args) => <ControlledInput {...args} />,
};

export const Error: Story = {
  args: { state: 'error', value: '' },
  render: (args) => <ControlledInput {...args} />,
};

export const Success: Story = {
  args: { state: 'success', value: 'ok@example.com' },
  render: (args) => <ControlledInput {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, value: '' },
  render: (args) => <ControlledInput {...args} />,
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col items-stretch gap-10">
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Default
        </p>
        <Input aria-label="Default" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Filled
        </p>
        <Input aria-label="Filled" defaultValue="hello@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Error
        </p>
        <Input aria-label="Error" state="error" defaultValue="" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Success
        </p>
        <Input aria-label="Success" state="success" defaultValue="ok@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Disabled
        </p>
        <Input aria-label="Disabled" disabled defaultValue="" />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  parameters: { docs: { disable: true } },
  render: (args) => <ControlledInput {...args} />,
};
