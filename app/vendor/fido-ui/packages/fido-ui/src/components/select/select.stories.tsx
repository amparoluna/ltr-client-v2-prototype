import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  type SelectProps,
} from './select';

const defaultItems = {
  option1: 'Option 1',
  option2: 'Option 2',
  option3: 'Option 3',
} as const;

const defaultChildren = (
  <>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </>
);

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const;

const usStateItems = Object.fromEntries(
  US_STATES.map(({ value, label }) => [value, label]),
);

type StorySelectProps = Omit<SelectProps, 'children' | 'value' | 'defaultValue'> & {
  value?: string | null;
  children?: React.ReactNode;
};

function ControlledSelect({
  value: valueArg = null,
  onValueChange,
  multiple,
  children = defaultChildren,
  items = defaultItems,
  className = 'w-80',
  ...args
}: StorySelectProps) {
  const [value, setValue] = React.useState<string | string[] | null>(
    multiple ? [] : valueArg,
  );

  React.useEffect(() => {
    setValue(multiple ? (Array.isArray(valueArg) ? valueArg : []) : (valueArg ?? null));
  }, [valueArg, multiple]);

  return (
    <Select
      {...args}
      className={className}
      multiple={multiple}
      items={items}
      value={value}
      onValueChange={(next, eventDetails) => {
        onValueChange?.(next, eventDetails);
        setValue(next);
      }}
    >
      {children}
    </Select>
  );
}

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A dropdown select for choosing a predefined value. Supports single and
multi-select, stacked or internal labels (same as Field / Textarea),
descriptions, errors, and tooltips. Consumers own the selected value and
form validation.

## Import

\`\`\`tsx
import { Select, SelectItem } from '@petscreeninginc/fido-ui/select';
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
    label: {
      control: 'text',
      description: 'Text label for the select.',
    },
    labelPlacement: {
      control: 'select',
      options: ['stacked', 'internal'],
      description:
        'stacked = label above the trigger; internal = compact label inside the trigger (matches Field).',
      table: { defaultValue: { summary: 'stacked' } },
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hides the label (still available to assistive technology).',
    },
    optional: {
      control: 'boolean',
      description: 'Shows an "(Optional)" indicator next to the label.',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text on the info icon next to the label.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when no value is selected.',
      table: { defaultValue: { summary: 'Choose an option' } },
    },
    description: {
      control: 'text',
      description: 'Helper text below the select when there is no error.',
    },
    error: {
      control: 'text',
      description: 'Error message below the select; also applies the error state.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire select.',
    },
    multiple: {
      control: 'boolean',
      description: 'Allows selecting multiple items.',
      table: { defaultValue: { summary: 'false' } },
    },
    indicator: {
      control: 'select',
      options: ['checkbox', 'checkmark', 'none'],
      description:
        'Indicator next to each item. Defaults to checkbox (single) or checkmark (multiple).',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
      description: 'Visual state; overridden by disabled/error props.',
      table: { defaultValue: { summary: 'default' } },
    },
    value: {
      control: 'text',
      description: 'Controlled selected value (single-select demos).',
    },
    name: {
      control: 'text',
      description: 'HTML name for the underlying form control.',
    },
    className: {
      control: false,
      description: 'Additional class names for the root wrapper.',
    },
    children: {
      control: false,
      description: 'SelectItem / SelectGroup / SelectSeparator children.',
    },
    items: {
      control: false,
      description: 'Label map for Select.Value (Base UI items prop).',
    },
    defaultValue: {
      control: false,
      description: 'Uncontrolled initial value.',
    },
    onValueChange: {
      control: false,
      description: 'Called when the selection changes.',
    },
    maxDisplayedValues: {
      control: false,
      description: 'Max values shown as text before switching to a count (multi only).',
    },
  },
  args: {
    label: 'Label',
    optional: true,
    hideLabel: false,
    placeholder: 'Choose an option',
    description: 'Helper Text',
    tooltip: '',
    error: '',
    disabled: false,
    multiple: false,
    indicator: 'checkbox',
    labelPlacement: 'stacked',
    state: 'default',
    value: null,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/** Primary Docs example — single select; use Args to change behavior. */
export const Examples: Story = {
  render: (args) => <ControlledSelect {...args} />,
};

export const InternalLabel: Story = {
  args: {
    labelPlacement: 'internal',
    optional: false,
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Filled: Story = {
  args: {
    optional: false,
    value: 'option1',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const WithError: Story = {
  args: {
    optional: false,
    description: undefined,
    error: 'Helper Text',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Multiple: Story = {
  args: {
    label: 'Tags',
    optional: false,
    placeholder: 'Select tags...',
    description: undefined,
    multiple: true,
    indicator: 'checkmark',
    value: null,
  },
  render: (args) => (
    <ControlledSelect
      {...args}
      items={{
        react: 'React',
        vue: 'Vue',
        angular: 'Angular',
        svelte: 'Svelte',
      }}
    >
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </ControlledSelect>
  ),
};

export const WithGroups: Story = {
  args: {
    label: 'Food',
    optional: false,
    placeholder: 'Choose a food',
    description: undefined,
  },
  render: (args) => (
    <ControlledSelect
      {...args}
      items={{
        apple: 'Apple',
        banana: 'Banana',
        cherry: 'Cherry',
        carrot: 'Carrot',
        broccoli: 'Broccoli',
      }}
    >
      <SelectGroup label="Fruits">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup label="Vegetables">
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="broccoli">Broccoli</SelectItem>
      </SelectGroup>
    </ControlledSelect>
  ),
};

export const WithTooltip: Story = {
  args: {
    label: 'Country',
    optional: true,
    tooltip: 'Select your country of residence',
    description: undefined,
  },
  render: (args) => (
    <ControlledSelect
      {...args}
      items={{ us: 'United States', uk: 'United Kingdom', ca: 'Canada' }}
    >
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
    </ControlledSelect>
  ),
};

/** Long option list — useful for scroll / virtualization behavior checks. */
export const LongList: Story = {
  name: 'Long list',
  args: {
    label: 'State',
    optional: false,
    placeholder: 'Choose a state',
    description: 'All 50 US states',
  },
  render: (args) => (
    <ControlledSelect {...args} items={usStateItems}>
      {US_STATES.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </ControlledSelect>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Stacked (default)
        </p>
        <Select
          label="Label"
          optional
          placeholder="Choose an option"
          description="Helper Text"
          items={defaultItems}
        >
          {defaultChildren}
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Internal label
        </p>
        <Select
          label="Label"
          labelPlacement="internal"
          placeholder="Choose an option"
          description="Helper Text"
          items={defaultItems}
        >
          {defaultChildren}
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Filled
        </p>
        <Select
          label="Label"
          defaultValue="option1"
          description="Helper Text"
          items={defaultItems}
        >
          {defaultChildren}
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Error
        </p>
        <Select
          label="Label"
          error="Helper Text"
          placeholder="Choose an option"
          items={defaultItems}
        >
          {defaultChildren}
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Disabled
        </p>
        <Select
          label="Label"
          optional
          disabled
          placeholder="Choose an option"
          description="Helper Text"
          items={defaultItems}
        >
          {defaultChildren}
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Multiple
        </p>
        <Select
          label="Tags"
          multiple
          placeholder="Select tags..."
          items={{
            react: 'React',
            vue: 'Vue',
            angular: 'Angular',
            svelte: 'Svelte',
          }}
        >
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          With groups
        </p>
        <Select
          label="Food"
          placeholder="Choose a food"
          items={{
            apple: 'Apple',
            banana: 'Banana',
            cherry: 'Cherry',
            carrot: 'Carrot',
            broccoli: 'Broccoli',
          }}
        >
          <SelectGroup label="Fruits">
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup label="Vegetables">
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectGroup>
        </Select>
      </div>

      <div className="flex w-80 flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          With tooltip
        </p>
        <Select
          label="Country"
          optional
          tooltip="Select your country of residence"
          placeholder="Choose an option"
          items={{ us: 'United States', uk: 'United Kingdom', ca: 'Canada' }}
        >
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </Select>
      </div>
    </div>
  ),
};

/**
 * Regression guard: the popup must stay visible when the app stacks its own
 * overlay above the default layer. The stacking token lives on Base UI's
 * Positioner (the only positioned element in the portal chain), so the dropdown
 * paints above this plain `position: fixed; z-index: 1050` panel.
 */
export const InsideAppOverlay: Story = {
  name: 'Inside a non-FidoUI overlay',
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => (
    <div className="fixed inset-0 z-[1050] flex items-start justify-center bg-fido-ui-neutral-black/40 p-16">
      <div className="w-[28rem] rounded-fido-ui-lg bg-fido-ui-neutral-white p-6 shadow-fido-ui-lg">
        <p className="mb-4 font-fido-ui-paragraph text-fido-ui-p3 text-fido-ui-neutral-700">
          This panel is a plain <code>position: fixed; z-index: 1050</code> div — not a FidoUI
          Dialog. The Select popup should still render above it.
        </p>
        <ControlledSelect label="Country" placeholder="Choose an option" className="w-full" />
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => <ControlledSelect {...args} />,
};
