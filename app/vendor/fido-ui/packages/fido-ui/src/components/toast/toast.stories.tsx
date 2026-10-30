import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button';
import { Toast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A presentational toast surface. Use your application notification manager for positioning, duration, stacking, and dismissal state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[356px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'radio',
      options: ['loading', 'info'],
      description: 'Compact loading or detailed status layout.',
      table: { defaultValue: { summary: 'loading' } },
    },
    color: {
      control: 'radio',
      options: ['white', 'black'],
      description: 'Figma surface color variant.',
      table: { defaultValue: { summary: 'white' } },
    },
    title: { control: 'text', description: 'Primary message.' },
    description: { control: 'text', description: 'Supporting copy; keep to two lines or fewer.' },
    iconType: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Semantic FidoUI icon rendered by Toast.',
    },
    iconSize: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Consistent size for the leading icon or loading spinner.',
      table: { defaultValue: { summary: 'md' } },
    },
    action: { control: false, description: 'Optional action, such as a FidoUI Button.' },
    onClose: { control: false, description: 'Shows the dismiss control and receives its click.' },
    closeLabel: { control: 'text', description: 'Accessible dismiss-control label.' },
    children: { control: false, description: 'Additional content below the description.' },
    className: { control: false, description: 'Additional root classes.' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** Primary docs example. Use Args to explore the content and surface variants. */
export const Examples: Story = {
  args: {
    type: 'loading',
    color: 'white',
    title: 'Loading...',
    onClose: () => {},
  },
};

export const LoadingDark: Story = {
  args: {
    type: 'loading',
    color: 'black',
    title: 'Loading...',
    onClose: () => {},
  },
};

export const Status: Story = {
  args: {
    type: 'info',
    color: 'white',
    title: 'Box Title',
    description: 'Description',
    iconType: 'success',
    iconSize: 'md',
    action: <Button color="neutral" shade="dark" size="sm">Undo</Button>,
    onClose: () => {},
  },
};

export const StatusDark: Story = {
  args: {
    type: 'info',
    color: 'black',
    title: 'Box Title',
    description: 'Description',
    iconType: 'success',
    iconSize: 'md',
    action: <Button color="neutral" shade="light" size="sm">Undo</Button>,
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[356px] flex-col gap-fido-ui-xl">
      <Toast type="loading" color="white" title="Loading..." onClose={() => {}} />
      <Toast type="loading" color="black" title="Loading..." onClose={() => {}} />
      <Toast
        type="info"
        color="white"
        title="Box Title"
        description="Description"
        iconType="success"
        iconSize="md"
        action={<Button color="neutral" shade="dark" size="sm">Undo</Button>}
        onClose={() => {}}
      />
      <Toast
        type="info"
        color="black"
        title="Box Title"
        description="Description"
        iconType="success"
        iconSize="md"
        action={<Button color="neutral" shade="light" size="sm">Undo</Button>}
        onClose={() => {}}
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    type: 'info',
    color: 'white',
    title: 'Notification title',
    description: 'Add context, next steps, or recovery details.',
    iconType: 'info',
    iconSize: 'md',
    onClose: () => {},
  },
  parameters: { docs: { disable: true } },
};
