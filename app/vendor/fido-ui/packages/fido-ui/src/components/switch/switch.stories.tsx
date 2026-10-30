import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A binary control for enabling or disabling one setting. Use \`container\` for the bordered field treatment and \`labelPlacement\` when the control belongs on the opposite side of its text.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    container: { control: 'boolean' },
    labelPlacement: { control: 'inline-radio', options: ['end', 'start'] },
    status: { control: 'select', options: ['default', 'error', 'disabled'] },
    checked: { control: false },
    onCheckedChange: { control: false },
  },
  args: {
    label: 'Switch Text',
    description: 'This is a switch description.',
    labelPlacement: 'end',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/** Primary Docs example — use Args to explore the field treatment. */
export const Default: Story = {
  name: 'Examples',
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Container: Story = {
  args: { container: true },
};

export const LabelStart: Story = {
  args: { labelPlacement: 'start', container: true },
};

export const Error: Story = {
  args: { status: 'error' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-[820px] grid-cols-2 gap-x-12 gap-y-8">
      {(['default', 'error', 'disabled'] as const).flatMap((status) =>
        [false, true].flatMap((container) =>
          [false, true].flatMap((defaultChecked) =>
            (['end', 'start'] as const).map((labelPlacement) => (
              <Switch
                key={`${status}-${container}-${defaultChecked}-${labelPlacement}`}
                label="Switch Text"
                description="This is a switch description."
                status={status}
                container={container}
                labelPlacement={labelPlacement}
                defaultChecked={defaultChecked}
              />
            )),
          ),
        ),
      )}
    </div>
  ),
};

/** Interactive canvas with Controls — intentionally kept separate from Docs. */
export const Playground: Story = {
  parameters: { docs: { disable: true } },
};
