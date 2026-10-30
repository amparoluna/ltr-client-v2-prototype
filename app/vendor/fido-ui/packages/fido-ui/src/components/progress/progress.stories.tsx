import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['ltr'],
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = { args: { value: 50 } };

export const AllValues: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[0, 25, 50, 75, 100].map((v) => (
        <Progress key={v} value={v} />
      ))}
    </div>
  ),
};
