import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Trash2 } from 'lucide-react';
import { ButtonGroup } from './button-group';
import { Button } from '../button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A layout component that visually joins related actions while preserving each
button's native behavior and tab order.

## Import

\`\`\`tsx
import { ButtonGroup } from '@petscreeninginc/fido-ui/button-group';
\`\`\`
`,
      },
    },
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Accessible name when the surrounding context does not label the group.',
    },
    children: {
      control: false,
      description: 'Related Button elements rendered in the connected group.',
    },
    className: {
      control: false,
      description: 'Additional class names for the group container.',
    },
  },
  args: {
    'aria-label': 'Actions',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/** Figma reference composition — use Args to change the accessible name. */
export const Examples: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light">
        Button
      </Button>
      <Button color="neutral" shade="light" leftIcon={Plus} aria-label="Add" />
    </ButtonGroup>
  ),
};

/** Retains the established Storybook URL used by the Figma component documentation. */
export const Default: Story = {
  ...Examples,
  parameters: {
    docs: { disable: true },
  },
};

export const MixedActions: Story = {
  args: {
    'aria-label': 'Record actions',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button color="neutral" shade="light">
        Edit
      </Button>
      <Button color="neutral" shade="light">
        Duplicate
      </Button>
      <Button color="neutral" shade="light" leftIcon={Trash2} aria-label="Delete" />
    </ButtonGroup>
  ),
};

export const DisabledAction: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button color="neutral" shade="light">
        Previous
      </Button>
      <Button color="neutral" shade="light" disabled>
        Current
      </Button>
      <Button color="neutral" shade="light">
        Next
      </Button>
    </ButtonGroup>
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-fido-ui-xl">
      <ButtonGroup aria-label="Text actions">
        <Button color="neutral" shade="light">
          First
        </Button>
        <Button color="neutral" shade="light">
          Second
        </Button>
        <Button color="neutral" shade="light">
          Third
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Icon actions">
        <Button color="neutral" shade="light">
          Create
        </Button>
        <Button color="neutral" shade="light" leftIcon={Plus} aria-label="Add" />
      </ButtonGroup>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button color="neutral" shade="light">
        Left
      </Button>
      <Button color="neutral" shade="light">
        Center
      </Button>
      <Button color="neutral" shade="light">
        Right
      </Button>
    </ButtonGroup>
  ),
};
