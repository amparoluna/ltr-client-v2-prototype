import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Combobox,
  ComboboxItem,
  ComboboxGroup,
  ComboboxSeparator,
  type ComboboxProps,
} from './combobox';

type ComboboxStoryArgs = Omit<ComboboxProps, 'children'>;

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

/** Id-keyed data, the shape that made the raw value leak into the input. */
const BREEDS_BY_ID: Record<string, string> = {
  '66': 'Golden Retriever',
  '77': 'Standard Poodle',
  '88': 'Border Collie',
  '99': 'German Shepherd',
};

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

/**
 * Controlled wrapper so the Docs/Playground canvases stay interactive while the
 * Args table remains the source of truth. Tracks the selection locally and
 * supports both single and multiple modes.
 */
function ControlledCombobox({
  children,
  ...args
}: ComboboxStoryArgs & { children?: React.ReactNode }) {
  const [value, setValue] = React.useState<string | string[]>(
    args.multiple ? [] : '',
  );

  React.useEffect(() => {
    setValue(args.multiple ? [] : '');
  }, [args.multiple]);

  return (
    <Combobox
      {...args}
      value={value}
      onValueChange={(next) => {
        args.onValueChange?.(next);
        setValue(next);
      }}
    >
      {children ??
        FRAMEWORKS.map((item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        ))}
    </Combobox>
  );
}

const meta: Meta<ComboboxStoryArgs> = {
  title: 'Components/Combobox',
  component: ControlledCombobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An autocomplete that pairs a search input with a filterable dropdown, supporting
single and multi-select (with removable badges). It shares the FidoUI Field
anatomy — stacked / internal label, bordered control box, and description /
error rows — so it aligns visually with \`Field\` and \`Select\` across the
Primary and FidoAlert themes.

## Import

\`\`\`tsx
import { Combobox, ComboboxItem } from '@petscreeninginc/fido-ui/combobox';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <div className="w-[28rem]">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text', description: 'Label text for the field.' },
    labelPlacement: {
      control: 'select',
      options: ['stacked', 'internal'],
      description: 'Where the label renders relative to the control box.',
      table: { defaultValue: { summary: 'stacked' } },
    },
    placeholder: { control: 'text', description: 'Search input placeholder.' },
    description: { control: 'text', description: 'Helper text below the control.' },
    error: { control: 'text', description: 'Error message; also sets error state.' },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
      description: 'Visual state variant.',
      table: { defaultValue: { summary: 'default' } },
    },
    indicator: {
      control: 'select',
      options: ['checkbox', 'checkmark', 'none'],
      description: 'Selected-item indicator style in the dropdown.',
    },
    multiple: {
      control: 'boolean',
      description: 'Enables multi-select with removable badges.',
    },
    optional: { control: 'boolean', description: 'Shows an "(Optional)" hint.' },
    hideLabel: { control: 'boolean', description: 'Visually hides the label.' },
    tooltip: { control: 'text', description: 'Info tooltip shown next to the label.' },
    disabled: { control: 'boolean', description: 'Disables the whole combobox.' },
    emptyText: { control: 'text', description: 'Text shown when no items match.' },
    showTags: { control: false },
    tagLabels: { control: false },
    itemToStringLabel: { control: false },
    isItemEqualToValue: { control: false },
    className: { control: false },
    children: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
    onSearchChange: { control: false },
    name: { control: false },
  },
  args: {
    label: 'Framework',
    labelPlacement: 'stacked',
    placeholder: 'Type to search...',
    description: 'Helper Text',
    state: 'default',
    multiple: false,
    optional: false,
    hideLabel: false,
  },
};

export default meta;
type Story = StoryObj<ComboboxStoryArgs>;

/** Primary Docs example — single instance; use Args to change behavior. */
export const Examples: Story = {
  render: (args) => <ControlledCombobox {...args} />,
};

export const InternalLabel: Story = {
  args: { labelPlacement: 'internal' },
  render: (args) => <ControlledCombobox {...args} />,
};

export const Multiple: Story = {
  args: {
    label: 'Frameworks',
    placeholder: 'Search frameworks...',
    multiple: true,
    description: 'Selected values appear as removable badges.',
  },
  render: (args) => <ControlledCombobox {...args} />,
};

export const WithGroups: Story = {
  args: { label: 'Food', placeholder: 'Search food...', description: '' },
  render: (args) => (
    <Combobox {...args}>
      <ComboboxGroup label="Fruits">
        <ComboboxItem value="apple">Apple</ComboboxItem>
        <ComboboxItem value="banana">Banana</ComboboxItem>
        <ComboboxItem value="cherry">Cherry</ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup label="Vegetables">
        <ComboboxItem value="carrot">Carrot</ComboboxItem>
        <ComboboxItem value="broccoli">Broccoli</ComboboxItem>
      </ComboboxGroup>
    </Combobox>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Country',
    description: '',
    error: 'Please select a country',
  },
  render: (args) => <ControlledCombobox {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, description: '' },
  render: (args) => <ControlledCombobox {...args} />,
};

/** Long option list — useful for scroll / filter behavior checks. */
export const LongList: Story = {
  name: 'Long list',
  args: {
    label: 'State',
    placeholder: 'Search states...',
    description: 'All 50 US states',
  },
  render: (args) => {
    const labelsByValue = Object.fromEntries(US_STATES.map((s) => [s.value, s.label]));
    return (
      <ControlledCombobox
        {...args}
        itemToStringLabel={(code) => labelsByValue[code] ?? code}
      >
        {US_STATES.map(({ value, label }) => (
          <ComboboxItem key={value} value={value}>
            {label}
          </ComboboxItem>
        ))}
      </ControlledCombobox>
    );
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex w-full flex-col items-start gap-10">
      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Stacked label
        </p>
        <Combobox label="Framework" placeholder="Type to search..." description="Helper Text">
          {FRAMEWORKS.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </Combobox>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Internal label
        </p>
        <Combobox
          label="Framework"
          labelPlacement="internal"
          placeholder="Type to search..."
        >
          {FRAMEWORKS.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </Combobox>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Multiple (removable badges)
        </p>
        <Combobox
          label="Frameworks"
          placeholder="Search frameworks..."
          multiple
          defaultValue={['react', 'svelte']}
        >
          {FRAMEWORKS.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </Combobox>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Error
        </p>
        <Combobox label="Country" placeholder="Search..." error="Please select a country">
          {FRAMEWORKS.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </Combobox>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Disabled
        </p>
        <Combobox label="Framework" placeholder="Type to search..." disabled>
          {FRAMEWORKS.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </Combobox>
      </div>
    </div>
  ),
};

/**
 * When item values are ids, pass `itemToStringLabel` so the input shows the
 * readable label instead of the id. It also feeds the built-in search filter,
 * and supplies tag labels in multi-select unless `tagLabels` overrides them.
 */
export const IdValues: Story = {
  name: 'Id values with labels',
  args: {
    label: 'Breed',
    placeholder: 'Search breeds...',
    description: 'Values are ids; the input shows the breed name.',
  },
  render: (args) => (
    <ControlledCombobox {...args} itemToStringLabel={(id) => BREEDS_BY_ID[id] ?? id}>
      {Object.entries(BREEDS_BY_ID).map(([id, name]) => (
        <ComboboxItem key={id} value={id}>
          {name}
        </ComboboxItem>
      ))}
    </ControlledCombobox>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => <ControlledCombobox {...args} />,
};
