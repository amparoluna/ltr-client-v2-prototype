import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { Pill } from './pill';

const meta: Meta<typeof Pill> = {
  title: 'Components/Pill',
  component: Pill,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'light', 'outline', 'neutral'],
    },
    leftIcon: { control: false, description: 'Icon component rendered before the label' },
  },
  args: {
    children: 'Pill',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {};

export const WithLeftIcon: Story = {
  args: { leftIcon: Plus, children: 'Label' },
};

export const Dismissible: Story = {
  args: { onDismiss: () => {}, children: 'Label' },
};

export const WithLeftIconAndDismiss: Story = {
  args: { leftIcon: Plus, onDismiss: () => {}, children: 'Label' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Pill variant="primary" leftIcon={Plus}>Label</Pill>
      <Pill variant="light" leftIcon={Plus}>Label</Pill>
      <Pill variant="outline" leftIcon={Plus}>Label</Pill>
      <Pill variant="neutral" leftIcon={Plus}>Label</Pill>
    </div>
  ),
};
