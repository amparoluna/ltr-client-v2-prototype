import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './stepper';

const steps = [
  { label: 'Account', description: 'Supporting' },
  { label: 'Details', description: 'Supporting' },
  { label: 'Review', description: 'Supporting' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    activeStep: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
      description: 'The currently active step (0-indexed). Set beyond last step for all-complete.',
    },
  },
  args: {
    steps,
    activeStep: 0,
  },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const Step1: Story = { args: { activeStep: 0 } };
export const Step2: Story = { args: { activeStep: 1 } };
export const Step3: Story = { args: { activeStep: 2 } };
export const Step4: Story = { args: { activeStep: 3 } };
export const AllComplete: Story = { args: { activeStep: 4 } };

export const WithoutLabels: Story = {
  args: { steps: [{}, {}, {}, {}], activeStep: 1 },
};

export const WithDisabledStep: Story = {
  args: {
    steps: [
      { label: 'Account' },
      { label: 'Details' },
      { label: 'Unavailable', disabled: true },
      { label: 'Complete' },
    ],
    activeStep: 1,
  },
};

export const TwoSteps: Story = {
  args: {
    steps: [{ label: 'Start' }, { label: 'Finish' }],
    activeStep: 0,
  },
};

export const AllSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {[0, 1, 2, 3, 4].map((step) => (
        <div key={step}>
          <p className="text-sm text-gray-400 mb-2">activeStep={step}{step === 4 ? ' (all complete)' : ''}</p>
          <Stepper steps={steps} activeStep={step} />
        </div>
      ))}
    </div>
  ),
};
