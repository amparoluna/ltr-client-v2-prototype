import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['ltr'],
  argTypes: {
    framed: {
      control: 'boolean',
      description: 'Figma card chrome (border, radius, padding, shadow)',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'Month/year caption layout',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from adjacent months',
    },
    numberOfMonths: {
      control: 'number',
      description: 'Number of months to display',
    },
  },
  args: {
    framed: true,
    captionLayout: 'dropdown',
    showOutsideDays: true,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 0, 15));
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 0, 1)}
      />
    );
  },
};

export const Range: Story = {
  render: (args) => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 0, 6),
      to: new Date(2026, 0, 10),
    });
    return (
      <Calendar
        {...args}
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date(2026, 0, 1)}
      />
    );
  },
};

export const Today: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date()}
      />
    );
  },
};

export const Unframed: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 0, 15));
    return (
      <Calendar
        {...args}
        framed={false}
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 0, 1)}
      />
    );
  },
};

export const TwoMonths: Story = {
  render: (args) => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return (
      <Calendar
        {...args}
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date(2026, 0, 1)}
      />
    );
  },
};

export const DayStates: Story = {
  name: 'Day States',
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 0, 6),
      to: new Date(2026, 0, 10),
    });
    const [single, setSingle] = React.useState<Date | undefined>(new Date(2026, 0, 20));
    return (
      <div className="flex flex-wrap items-start gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 text-fido-ui-neutral-600">
            Single — Selected (primary-900), Current, Hover/Focus, Muted outside
          </p>
          <Calendar
            mode="single"
            selected={single}
            onSelect={setSingle}
            defaultMonth={new Date(2026, 0, 1)}
            today={new Date(2026, 0, 15)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 text-fido-ui-neutral-600">
            Range — Start / Middle / End (Figma 14047:2347)
          </p>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            defaultMonth={new Date(2026, 0, 1)}
            today={new Date(2026, 0, 1)}
          />
        </div>
      </div>
    );
  },
};
