import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: 50, label: 'Volume' },
};

export const RangeNarrow: Story = {
  args: { defaultValue: [30, 50], label: 'Price range (narrow)' },
};

export const RangeWide: Story = {
  args: { defaultValue: [10, 90], label: 'Price range (wide)' },
};

export const Disabled: Story = {
  args: { defaultValue: 50, disabled: true, label: 'Disabled' },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-md">
      <Slider label="Default" defaultValue={50} />
      <Slider label="Range narrow" defaultValue={[40, 60]} />
      <Slider label="Range wide" defaultValue={[10, 90]} />
      <Slider label="Disabled" defaultValue={50} disabled />
    </div>
  ),
};
