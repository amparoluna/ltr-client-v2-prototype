import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Spinner } from './spinner';


const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['ltr'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'warning', 'error', 'white'],
      description: 'Spinner color',
    },
    label: { control: 'text', description: 'Accessible label (sr-only)' },
  },
  args: { size: 'md', color: 'primary' },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner color="primary" />
      <Spinner color="neutral" />
      <Spinner color="warning" />
      <Spinner color="error" />
      <div className="rounded bg-fido-ui-neutral-900 p-2"><Spinner color="white" /></div>
    </div>
  ),
};