import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    multiple: { control: 'boolean', description: 'Allow multiple items to be selected' },
    disabled: { control: 'boolean', description: 'Disable all toggle items' },
  },
  args: {
    multiple: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: (args) => (
    <ToggleGroup {...args} defaultValue={['center']}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SingleSelect: Story = {
  render: () => (
    <ToggleGroup defaultValue={['monthly']}>
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['bold']}>
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup disabled defaultValue={['center']}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <ToggleGroup defaultValue={['a']}>
      <ToggleGroupItem value="a">Active</ToggleGroupItem>
      <ToggleGroupItem value="b" disabled>Disabled</ToggleGroupItem>
      <ToggleGroupItem value="c">Active</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-gray-400 mb-2">Single select (default)</p>
        <ToggleGroup defaultValue={['center']}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Multiple select</p>
        <ToggleGroup multiple defaultValue={['bold', 'italic']}>
          <ToggleGroupItem value="bold">B</ToggleGroupItem>
          <ToggleGroupItem value="italic">I</ToggleGroupItem>
          <ToggleGroupItem value="underline">U</ToggleGroupItem>
          <ToggleGroupItem value="strike">S</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Disabled</p>
        <ToggleGroup disabled defaultValue={['a']}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};
