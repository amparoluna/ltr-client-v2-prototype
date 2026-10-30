import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['ltr'],
  argTypes: {
    label: { control: 'text', description: 'Label text next to the checkbox' },
    disabled: { control: 'boolean', description: 'Disables the checkbox' },
    defaultChecked: { control: 'boolean', description: 'Initially checked' },
    container: { control: 'boolean', description: 'Wraps the checkbox and label in a bordered container' },
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description: 'Visual validation state; disabled and error props take precedence',
    },
    error: { control: 'text', description: 'Error text displayed below the checkbox' },
  },
  args: {
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Container: Story = {
  args: { container: true },
};

export const ContainerChecked: Story = {
  args: { container: true, defaultChecked: true },
};

export const Error: Story = {
  args: { error: 'Required field' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithoutLabel: Story = {
  args: { label: undefined },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked (default)" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Error" error="Required field" />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const rows = [
      { label: 'Default' },
      { label: 'Focus/Hover' },
      { label: 'Error', state: 'error' as const },
      { label: 'Error/Hover', state: 'error' as const },
      { label: 'Disabled', disabled: true },
    ];

    return (
      <div className="grid w-fit grid-cols-4 gap-x-12 gap-y-5">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <Checkbox label="Label" state={row.state} disabled={row.disabled} />
            <Checkbox
              label="Label"
              state={row.state}
              disabled={row.disabled}
              defaultChecked
            />
            <Checkbox
              label="Label"
              state={row.state}
              disabled={row.disabled}
              container
            />
            <Checkbox
              label="Label"
              state={row.state}
              disabled={row.disabled}
              defaultChecked
              container
            />
          </div>
        ))}
      </div>
    );
  },
};