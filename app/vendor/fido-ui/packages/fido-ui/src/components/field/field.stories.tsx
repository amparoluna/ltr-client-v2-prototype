import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eye, Mail, ChevronsUpDown } from 'lucide-react';
import { Field, type FieldProps } from './field';
import { Input } from '../input/input';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

type FieldStoryArgs = Omit<FieldProps, 'children'> & {
  placeholder?: string;
  value?: string;
};

function ControlledField(args: FieldStoryArgs) {
  const { placeholder, value: valueArg, ...fieldProps } = args;
  const [value, setValue] = React.useState(String(valueArg ?? ''));

  React.useEffect(() => {
    setValue(String(valueArg ?? ''));
  }, [valueArg]);

  return (
    <Field {...fieldProps}>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
      />
    </Field>
  );
}

const meta: Meta<FieldStoryArgs> = {
  title: 'Components/Field',
  component: ControlledField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Integrated form-field wrapper with labels, helper/error text, and adornment
slots. Wrap a FidoUI \`Input\` (or compatible control) as the child.

## Import

\`\`\`tsx
import { Field, Input } from '@petscreeninginc/fido-ui';

<Field label="Email" description="Helper text">
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
    label: { control: 'text' },
    labelPlacement: {
      control: 'select',
      options: ['stacked', 'internal'],
      table: { defaultValue: { summary: 'stacked' } },
    },
    hideLabel: { control: 'boolean' },
    optional: { control: 'boolean' },
    tooltip: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    validations: { control: 'object' },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    leftIcon: { control: false },
    fileAction: { control: false },
    badge: { control: false },
    trailingIcon: { control: false },
    control: { control: false },
    controlIcon: { control: false },
    action: { control: false },
    className: { control: false },
  },
  args: {
    label: 'Label',
    labelPlacement: 'stacked',
    hideLabel: false,
    optional: false,
    tooltip: '',
    description: 'Helper Text',
    error: '',
    placeholder: 'Placeholder',
    state: 'default',
    disabled: false,
    suffix: '',
    prefix: '',
    value: '',
  },
};

export default meta;
type Story = StoryObj<FieldStoryArgs>;

export const Examples: Story = {
  render: (args) => <ControlledField {...args} />,
};

export const InternalLabel: Story = {
  args: { labelPlacement: 'internal' },
  render: (args) => <ControlledField {...args} />,
};

export const Error: Story = {
  args: { description: '', error: 'Helper Text', value: '' },
  render: (args) => <ControlledField {...args} />,
};

export const Success: Story = {
  args: { state: 'success', description: 'Helper Text' },
  render: (args) => <ControlledField {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, value: '' },
  render: (args) => <ControlledField {...args} />,
};

export const WithTooltip: Story = {
  args: {
    optional: true,
    tooltip: 'We will never share your email with anyone.',
  },
  render: (args) => <ControlledField {...args} />,
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Email',
    leftIcon: Mail,
    placeholder: 'you@example.com',
    description: '',
  },
  render: (args) => <ControlledField {...args} />,
};

export const WithSuffix: Story = {
  args: {
    label: 'Amount',
    suffix: 'USD',
    placeholder: '0.00',
    description: '',
  },
  render: (args) => <ControlledField {...args} />,
};

export const WithPrefix: Story = {
  args: {
    label: 'Website',
    prefix: 'https://',
    placeholder: 'example.com',
    description: '',
  },
  render: (args) => <ControlledField {...args} />,
};

export const WithAdornments: Story = {
  args: {
    label: 'Email',
    leftIcon: Mail,
    badge: <Badge color="neutral">Label</Badge>,
    trailingIcon: Eye,
    suffix: 'Suffix',
    description: '',
  },
  render: (args) => <ControlledField {...args} />,
};

export const WithFileAction: Story = {
  args: {
    label: 'Upload',
    leftIcon: Mail,
    fileAction: (
      <button
        type="button"
        className="rounded-fido-ui-full bg-fido-ui-neutral-100 px-2 py-0.5 text-fido-ui-p4 text-fido-ui-neutral-700"
      >
        Choose file
      </button>
    ),
    badge: <Badge color="neutral">Label</Badge>,
    description: 'Helper Text',
  },
  render: (args) => <ControlledField {...args} />,
};

export const WithControlAndAction: Story = {
  args: {
    label: 'Quantity',
    controlIcon: ChevronsUpDown,
    action: (
      <Button color="primary" shade="dark">
        Button
      </Button>
    ),
    description: '',
  },
  render: (args) => <ControlledField {...args} />,
};

export const PasswordValidations: Story = {
  args: {
    label: 'Password',
    placeholder: '',
    description: 'Supporting text',
    error: 'Error text',
    validations: [
      'Must be at least eight characters.',
      'Must contain at least one number or symbol.',
      'Must match.',
    ],
  },
  render: (args) => <ControlledField {...args} />,
};

export const HiddenLabel: Story = {
  args: {
    label: 'Search',
    hideLabel: true,
    placeholder: 'Search…',
    description: '',
  },
  render: (args) => <ControlledField {...args} />,
};

/** Mirrors Figma "Combobox Variant Visibility" Field slot matrix. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const Section = ({
      title,
      stacked,
      internal,
    }: {
      title: string;
      stacked: React.ReactNode;
      internal: React.ReactNode;
    }) => (
      <div className="flex flex-col gap-5">
        <p className="font-fido-ui-paragraph text-fido-ui-p3 font-bold text-fido-ui-primary-700">
          {title}
        </p>
        {stacked}
        {internal}
      </div>
    );

    return (
      <div className="flex w-[320px] flex-col gap-5">
        <Section
          title="Label Tooltip"
          stacked={
            <Field label="Label" tooltip="More about this field">
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field label="Label" labelPlacement="internal" tooltip="More about this field">
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Leading Icon"
          stacked={
            <Field label="Label" leftIcon={Mail}>
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field label="Label" labelPlacement="internal" leftIcon={Mail}>
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Optional"
          stacked={
            <Field label="Label" optional>
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field label="Label" labelPlacement="internal" optional>
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Badge"
          stacked={
            <Field label="Label" badge={<Badge color="neutral">Label</Badge>}>
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field
              label="Label"
              labelPlacement="internal"
              badge={<Badge color="neutral">Label</Badge>}
            >
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Trailing Icon"
          stacked={
            <Field label="Label" trailingIcon={Eye}>
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field label="Label" labelPlacement="internal" trailingIcon={Eye}>
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Suffix Text"
          stacked={
            <Field label="Label" suffix="Suffix">
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field label="Label" labelPlacement="internal" suffix="Suffix">
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Helper Text"
          stacked={
            <Field label="Label" description="Helper Text">
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field label="Label" labelPlacement="internal" description="Helper Text">
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
        <Section
          title="Button"
          stacked={
            <Field
              label="Label"
              action={
                <Button color="primary" shade="dark">
                  Button
                </Button>
              }
            >
              <Input placeholder="Placeholder" />
            </Field>
          }
          internal={
            <Field
              label="Label"
              labelPlacement="internal"
              action={
                <Button color="primary" shade="dark">
                  Button
                </Button>
              }
            >
              <Input placeholder="Placeholder" />
            </Field>
          }
        />
      </div>
    );
  },
};

export const Playground: Story = {
  parameters: { docs: { disable: true } },
  render: (args) => <ControlledField {...args} />,
};
