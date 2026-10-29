import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DogIcon, HeartIcon, HomeIcon } from '@petscreeninginc/fido-ui-icons';
import { Button } from '../button';
import { ChoiceCard, ChoiceCardGroup } from './choice-card';

const singleSource = `import * as React from 'react';
import { DogIcon, HeartIcon, HomeIcon } from '@petscreeninginc/fido-ui-icons';
import { ChoiceCard, ChoiceCardGroup } from '@petscreeninginc/fido-ui/choice-card';

export function PetTypeChoice() {
  const [petType, setPetType] = React.useState('household');

  return (
    <ChoiceCardGroup
      label="Pet type"
      selectionMode="single"
      name="petType"
      value={petType}
      onValueChange={setPetType}
    >
      <ChoiceCard value="household" title="Household" icon={<HomeIcon aria-hidden />} />
      <ChoiceCard
        value="assistance-animal"
        title="Assistance Animal"
        icon={<DogIcon aria-hidden />}
        badge={false}
      />
      <ChoiceCard
        value="support-animal"
        title="Support Animal"
        icon={<HeartIcon aria-hidden />}
        badge={false}
      />
    </ChoiceCardGroup>
  );
}`;

const multipleSource = `import * as React from 'react';
import { ChoiceCard, ChoiceCardGroup } from '@petscreeninginc/fido-ui/choice-card';

export function ServiceChoices() {
  const [services, setServices] = React.useState(['screening']);

  return (
    <ChoiceCardGroup
      label="Available services"
      selectionMode="multiple"
      name="services"
      value={services}
      onValueChange={setServices}
    >
      <ChoiceCard value="screening" title="Pet screening" />
      <ChoiceCard value="insurance" title="Pet insurance" />
    </ChoiceCardGroup>
  );
}`;

const actionSource = `import { Button } from '@petscreeninginc/fido-ui/button';
import { ChoiceCard } from '@petscreeninginc/fido-ui/choice-card';

<ChoiceCard
  title="Professional plan"
  description="For growing property teams"
  badge={false}
  action={<Button type="button">View plan</Button>}
/>`;

function source(code: string) {
  return {
    docs: {
      source: {
        code,
        language: 'tsx',
        type: 'code',
      },
    },
  };
}

const petTypes = [
  {
    value: 'household',
    title: 'Household',
    description: 'A companion animal.',
    icon: HomeIcon,
    recommended: true,
  },
  {
    value: 'assistance-animal',
    title: 'Assistance Animal',
    description: 'An animal trained to perform disability-related tasks.',
    icon: DogIcon,
    recommended: false,
  },
  {
    value: 'support-animal',
    title: 'Support Animal',
    description: 'An animal that provides emotional support.',
    icon: HeartIcon,
    recommended: false,
  },
];

function PetTypeExample() {
  const [value, setValue] = React.useState('household');

  return (
    <ChoiceCardGroup
      label="Pet type"
      selectionMode="single"
      name="petType"
      value={value}
      onValueChange={setValue}
    >
      {petTypes.map((option) => {
        const Icon = option.icon;

        return (
          <ChoiceCard
            key={option.value}
            value={option.value}
            title={option.title}
            description={option.description}
            icon={<Icon aria-hidden="true" />}
            badge={option.recommended ? undefined : false}
          />
        );
      })}
    </ChoiceCardGroup>
  );
}

function MultipleExample() {
  const [value, setValue] = React.useState(['screening']);

  return (
    <ChoiceCardGroup
      label="Available services"
      description="Select every service that applies."
      selectionMode="multiple"
      name="services"
      value={value}
      onValueChange={setValue}
    >
      <ChoiceCard value="screening" title="Pet screening" description="Screen household pets." />
      <ChoiceCard
        value="insurance"
        title="Pet insurance"
        description="Offer optional insurance coverage."
        badge={false}
      />
    </ChoiceCardGroup>
  );
}

const meta: Meta<typeof ChoiceCardGroup> = {
  title: 'Components/ChoiceCard',
  component: ChoiceCardGroup,
  subcomponents: { ChoiceCard },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A group-owned card selection pattern. Use \`selectionMode="single"\` for radio behavior
or \`selectionMode="multiple"\` for checkbox behavior. Standalone action cards use
\`ChoiceCard\` without a group and never render a selection control.

## Import

\`\`\`tsx
import { ChoiceCard, ChoiceCardGroup } from '@petscreeninginc/fido-ui/choice-card';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[609px] p-fido-ui-xl">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectionMode: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Single selection renders radios; multiple selection renders checkboxes.',
    },
    label: { control: 'text', description: 'Visible and accessible group label.' },
    description: { control: 'text', description: 'Helper text for the group.' },
    error: { control: 'text', description: 'Validation message for the group.' },
    name: { control: 'text', description: 'Form field name shared by the choices.' },
    disabled: { control: 'boolean', description: 'Disables every choice.' },
    readOnly: { control: 'boolean', description: 'Prevents selection changes.' },
    children: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
    className: { control: false },
  },
  args: {
    selectionMode: 'single',
    label: 'Pet type',
    name: 'petType',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof ChoiceCardGroup>;

/** Primary Docs example — a controlled single-selection radio card group. */
export const Examples: Story = {
  parameters: source(singleSource),
  render: () => <PetTypeExample />,
};

export const MultipleSelection: Story = {
  parameters: source(multipleSource),
  render: () => <MultipleExample />,
};

export const WithAction: Story = {
  parameters: source(actionSource),
  render: () => (
    <ChoiceCard
      title="Professional plan"
      description="For growing property teams"
      badge={false}
      action={
        <Button color="neutral" shade="dark" size="md" type="button">
          View plan
        </Button>
      }
    />
  ),
};

export const Disabled: Story = {
  parameters: source(`<ChoiceCardGroup selectionMode="single" disabled>
  <ChoiceCard value="unavailable" title="Unavailable option" />
</ChoiceCardGroup>`),
  render: () => (
    <ChoiceCardGroup selectionMode="single" disabled>
      <ChoiceCard value="unavailable" title="Unavailable option" />
    </ChoiceCardGroup>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    ...source(`/* See the focused Single, Multiple, and Action examples above. */`),
  },
  render: () => (
    <div className="flex flex-col gap-fido-ui-4xl">
      <PetTypeExample />
      <MultipleExample />
      <ChoiceCard
        title="Action card"
        description="This card has no selection control."
        badge={false}
        action={<Button type="button">Action</Button>}
      />
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: { docs: { disable: true } },
  render: (args) => (
    <ChoiceCardGroup {...args} selectionMode="single" defaultValue="household">
      <ChoiceCard value="household" title="Household" description="Default option" />
      <ChoiceCard value="support" title="Support Animal" description="Alternative option" />
    </ChoiceCardGroup>
  ),
};
