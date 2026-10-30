import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumericCounter, type NumericCounterProps } from './numeric-counter';

function ControlledNumericCounter(args: NumericCounterProps) {
  const [value, setValue] = React.useState(Number(args.value) || 0);

  React.useEffect(() => {
    setValue(Number(args.value) || 0);
  }, [args.value]);

  return (
    <NumericCounter
      {...args}
      value={value}
      onDecrement={(event) => {
        args.onDecrement?.(event);
        setValue((current) => current - 1);
      }}
      onIncrement={(event) => {
        args.onIncrement?.(event);
        setValue((current) => current + 1);
      }}
    />
  );
}

const meta: Meta<typeof NumericCounter> = {
  title: 'Components/NumericCounter',
  component: NumericCounter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A stateless numeric counter with default and compact sizes. Consumers own the
value, bounds, and increment/decrement behavior (disable buttons at min/max).

## Import

\`\`\`tsx
import { NumericCounter } from '@petscreeninginc/fido-ui/numeric-counter';
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
    size: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual size (Figma: Default, Compact).',
      table: { defaultValue: { summary: 'default' } },
    },
    value: {
      control: 'number',
      description: 'Current value rendered between the controls.',
      table: { defaultValue: { summary: '0' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the whole counter.',
    },
    decrementDisabled: {
      control: 'boolean',
      description: 'Disables only the decrement button (e.g. at the minimum bound).',
    },
    incrementDisabled: {
      control: 'boolean',
      description: 'Disables only the increment button (e.g. at the maximum bound).',
    },
    decrementAriaLabel: {
      control: 'text',
      description: 'Accessible label for the decrement button.',
      table: { defaultValue: { summary: 'Decrease value' } },
    },
    incrementAriaLabel: {
      control: 'text',
      description: 'Accessible label for the increment button.',
      table: { defaultValue: { summary: 'Increase value' } },
    },
    valueAriaLabel: {
      control: 'text',
      description: 'Accessible label for the numeric value output.',
      table: { defaultValue: { summary: 'Value' } },
    },
    className: {
      control: false,
      description: 'Additional class names for the root element.',
    },
    onDecrement: {
      control: false,
      description: 'Called when the decrement button is clicked.',
    },
    onIncrement: {
      control: false,
      description: 'Called when the increment button is clicked.',
    },
  },
  args: {
    size: 'default',
    value: 0,
    disabled: false,
    decrementDisabled: false,
    incrementDisabled: false,
    valueAriaLabel: 'Quantity',
    decrementAriaLabel: 'Decrease quantity',
    incrementAriaLabel: 'Increase quantity',
  },
};

export default meta;
type Story = StoryObj<typeof NumericCounter>;

// /** Primary Docs example — single counter; use Args to change behavior. */
// export const Examples: Story = {
//   render: (args) => <ControlledNumericCounter {...args} />,
// };

export const Compact: Story = {
  args: {
    size: 'compact',
    value: 2,
  },
  render: (args) => <ControlledNumericCounter {...args} />,
};

export const Bounded: Story = {
  name: 'Bounded (0–5)',
  args: {
    value: 1,
  },
  render: function Render(args) {
    const [value, setValue] = React.useState(Number(args.value) || 0);

    React.useEffect(() => {
      setValue(Number(args.value) || 0);
    }, [args.value]);

    return (
      <NumericCounter
        {...args}
        value={value}
        decrementDisabled={value <= 0}
        incrementDisabled={value >= 5}
        onDecrement={() => setValue((current) => Math.max(0, current - 1))}
        onIncrement={() => setValue((current) => Math.min(5, current + 1))}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [defaultValue, setDefaultValue] = React.useState(0);
    const [compactValue, setCompactValue] = React.useState(2);
    const [boundedValue, setBoundedValue] = React.useState(1);

    return (
      <div className="flex flex-col items-start gap-10">
        <div className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            Default
          </p>
          <NumericCounter
            value={defaultValue}
            valueAriaLabel="Default quantity"
            decrementAriaLabel="Decrease default quantity"
            incrementAriaLabel="Increase default quantity"
            decrementDisabled={defaultValue <= 0}
            onDecrement={() => setDefaultValue((current) => Math.max(0, current - 1))}
            onIncrement={() => setDefaultValue((current) => current + 1)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            Compact
          </p>
          <NumericCounter
            size="compact"
            value={compactValue}
            valueAriaLabel="Compact quantity"
            decrementAriaLabel="Decrease compact quantity"
            incrementAriaLabel="Increase compact quantity"
            decrementDisabled={compactValue <= 0}
            onDecrement={() => setCompactValue((current) => Math.max(0, current - 1))}
            onIncrement={() => setCompactValue((current) => current + 1)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            Bounded (0–5)
          </p>
          <NumericCounter
            value={boundedValue}
            valueAriaLabel="Bounded quantity"
            decrementAriaLabel="Decrease bounded quantity"
            incrementAriaLabel="Increase bounded quantity"
            decrementDisabled={boundedValue <= 0}
            incrementDisabled={boundedValue >= 5}
            onDecrement={() => setBoundedValue((current) => Math.max(0, current - 1))}
            onIncrement={() => setBoundedValue((current) => Math.min(5, current + 1))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            Disabled
          </p>
          <NumericCounter
            value={3}
            disabled
            valueAriaLabel="Disabled quantity"
            decrementAriaLabel="Decrease disabled quantity"
            incrementAriaLabel="Increase disabled quantity"
          />
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
  render: (args) => <ControlledNumericCounter {...args} />,
};
