import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange } from 'react-day-picker';
import {
  DatePicker,
  DateRangePicker,
  type DatePickerProps,
} from './date-picker';

function ControlledDatePicker(args: DatePickerProps) {
  const [value, setValue] = React.useState<Date | undefined>(args.value);

  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <DatePicker
      {...args}
      value={value}
      onChange={(nextValue) => {
        args.onChange?.(nextValue);
        setValue(nextValue);
      }}
    />
  );
}

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A controlled date field that supports both typed input and Calendar popover selection.
Type a date in the configured \`dateFormat\`, or open the calendar via the field / calendar icon.
Consumers own the selected \`Date | undefined\`, validation, and form-library integration.

## Import

\`\`\`tsx
import { DatePicker, DateRangePicker } from '@petscreeninginc/fido-ui/date-picker';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: false,
      description: 'Selected date. Pair with onChange for controlled usage.',
    },
    onChange: {
      control: false,
      description: 'Called with the selected date, or undefined when cleared.',
    },
    label: {
      control: 'text',
      description: 'Visible stacked field label.',
    },
    optional: {
      control: 'boolean',
      description: 'Shows an “(Optional)” indicator beside the label.',
    },
    triggerLabel: {
      control: 'text',
      description: 'Accessible name for the calendar icon button when it should differ from the visible label.',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown before a date is selected.',
      table: { defaultValue: { summary: 'MM/DD/YYYY' } },
    },
    dateFormat: {
      control: 'text',
      description: 'date-fns format used for display and exact typed-input parsing.',
      table: { defaultValue: { summary: 'MM/dd/yyyy' } },
    },
    minDate: {
      control: false,
      description: 'Earliest selectable date.',
    },
    maxDate: {
      control: false,
      description: 'Latest selectable date.',
    },
    disabledDates: {
      control: false,
      description: 'Specific dates that cannot be selected.',
    },
    defaultMonth: {
      control: false,
      description: 'Initial month shown when no value determines the month.',
    },
    showDropdowns: {
      control: 'boolean',
      description: 'Shows month and year dropdown controls in the Calendar.',
      table: { defaultValue: { summary: 'true' } },
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Shows adjacent-month dates in the Calendar grid.',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the field and Calendar trigger.',
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the field.',
    },
    open: {
      control: false,
      description: 'Controlled popover open state.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial popover open state when uncontrolled.',
    },
    onOpenChange: {
      control: false,
      description: 'Called when the Calendar popover opens or closes.',
    },
    className: {
      control: false,
      description: 'Additional class names for the root element.',
    },
  },
  args: {
    label: 'Date',
    triggerLabel: 'Open calendar',
    placeholder: 'MM/DD/YYYY',
    dateFormat: 'MM/dd/yyyy',
    optional: false,
    showDropdowns: true,
    showOutsideDays: true,
    disabled: false,
    defaultOpen: false,
    className: 'w-[263px]',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/** Primary Docs example — one interactive field driven by Args. */
export const Examples: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
};

export const Optional: Story = {
  args: {
    label: 'Move-in date',
    triggerLabel: 'Open move-in calendar',
    optional: true,
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const Selected: Story = {
  args: {
    label: 'Appointment date',
    triggerLabel: 'Open appointment calendar',
    value: new Date(2026, 0, 15),
    defaultMonth: new Date(2026, 0, 1),
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const TypedInput: Story = {
  args: {
    label: 'Birth date',
    triggerLabel: 'Open birth date calendar',
    placeholder: 'MM/DD/YYYY',
    dateFormat: 'MM/dd/yyyy',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type a date matching `dateFormat` and press Enter or blur to commit. The calendar icon (or focusing the field) opens the popover for visual selection.',
      },
    },
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const WithMinAndMax: Story = {
  args: {
    label: 'Reservation date',
    triggerLabel: 'Open reservation calendar',
    minDate: new Date(2026, 0, 10),
    maxDate: new Date(2026, 2, 31),
    defaultMonth: new Date(2026, 0, 1),
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const Error: Story = {
  args: {
    label: 'Start date',
    triggerLabel: 'Open start date calendar',
    error: 'Select a valid date to continue.',
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Expanded: Story = {
  args: {
    label: 'Start date',
    triggerLabel: 'Open start date calendar',
    defaultMonth: new Date(2026, 0, 1),
    defaultOpen: true,
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const Range: Story = {
  render: function Render() {
    const [value, setValue] = React.useState<DateRange>();

    return (
      <DateRangePicker
        className="w-[263px]"
        label="Trip dates"
        triggerLabel="Trip dates"
        value={value}
        onChange={setValue}
        defaultMonth={new Date(2026, 0, 1)}
        numberOfMonths={1}
      />
    );
  },
};

const variantLabelClass =
  'font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600';

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function Render() {
    const [defaultValue, setDefaultValue] = React.useState<Date>();
    const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
      new Date(2026, 0, 15),
    );

    return (
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col gap-2">
          <p className={variantLabelClass}>Default</p>
          <DatePicker
            className="w-[263px]"
            label="Date"
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className={variantLabelClass}>Optional</p>
          <DatePicker className="w-[263px]" label="Move-in date" optional />
        </div>

        <div className="flex flex-col gap-2">
          <p className={variantLabelClass}>Selected</p>
          <DatePicker
            className="w-[263px]"
            label="Appointment date"
            value={selectedValue}
            onChange={setSelectedValue}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className={variantLabelClass}>Error</p>
          <DatePicker
            className="w-[263px]"
            label="Start date"
            error="Select a valid date to continue."
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className={variantLabelClass}>Disabled</p>
          <DatePicker className="w-[263px]" label="Date" disabled />
        </div>
      </div>
    );
  },
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => <ControlledDatePicker {...args} />,
};
