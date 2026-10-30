import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ProgressStepper } from './progress-stepper';

const meta: Meta<typeof ProgressStepper> = {
  title: 'Components/ProgressStepper',
  component: ProgressStepper,
  tags: ['ltr'],
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ProgressStepper>;

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    progress: 40,
    title: 'Title:',
    description: 'Description',
  },
};

export const MidProgress: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    progress: 25,
    title: 'Title:',
    description: 'Description',
  },
};

export const Complete: Story = {
  args: {
    currentStep: 4,
    totalSteps: 4,
    progress: 100,
    title: 'Title:',
    description: 'Description',
  },
};

export const NoCount: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    progress: 40,
    title: 'Title:',
    description: 'Description',
    showCount: false,
  },
};

export const NoContent: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
    progress: 10,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ProgressStepper currentStep={1} totalSteps={4} progress={40} title="Title:" description="Description" />
      <ProgressStepper currentStep={2} totalSteps={4} progress={25} title="Title:" description="Description" />
      <ProgressStepper currentStep={3} totalSteps={4} progress={0} title="Title:" description="Description" />
      <ProgressStepper currentStep={4} totalSteps={4} progress={100} title="Title:" description="Description" />
    </div>
  ),
};
