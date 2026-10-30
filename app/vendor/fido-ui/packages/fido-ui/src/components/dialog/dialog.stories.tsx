import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleAlert } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogProps,
} from './dialog';
import { Button } from '../button';

interface DialogExampleProps {
  showClose?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
  showPrefixIcon?: boolean;
}

function DialogExample({
  args,
  showClose = true,
  showDescription = true,
  showActions = true,
  showPrefixIcon = false,
}: DialogExampleProps & { args: DialogProps }) {
  return (
    <Dialog open={args.open} defaultOpen={args.defaultOpen} onOpenChange={args.onOpenChange}>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogContent showClose={showClose}>
        <DialogHeader>
          <DialogTitle leftIcon={showPrefixIcon ? CircleAlert : undefined}>
            Container Title
          </DialogTitle>
          {showDescription ? <DialogDescription>Description</DialogDescription> : null}
        </DialogHeader>
        <div
          className="min-h-28 w-full border border-dashed border-fido-ui-secondary-300 bg-fido-ui-secondary-50"
          aria-label="Dialog content slot"
        />
        {showActions ? (
          <DialogFooter>
            <Button color="neutral" shade="light">
              Cancel
            </Button>
            <Button>Confirm</Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state when uncontrolled.',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      control: false,
      description: 'Called when the open state changes.',
    },
    children: {
      control: false,
      description: 'DialogTrigger and DialogContent compound parts.',
    },
  },
  args: {
    defaultOpen: true,
    children: null,
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Examples: Story = {
  render: (args) => <DialogExample args={args} />,
};

export const WithoutCloseButton: Story = {
  render: (args) => <DialogExample args={args} showClose={false} />,
};

export const WithoutDescription: Story = {
  render: (args) => <DialogExample args={args} showDescription={false} />,
};

export const WithoutActions: Story = {
  render: (args) => <DialogExample args={args} showActions={false} />,
};

export const WithPrefixIcon: Story = {
  render: (args) => <DialogExample args={args} showPrefixIcon />,
};

export const AllVariants: Story = {
  args: {
    defaultOpen: false,
  },
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="flex flex-col items-start gap-8">
      {[
        ['Default', {}],
        ['Without close button', { showClose: false }],
        ['Without description', { showDescription: false }],
        ['Without actions', { showActions: false }],
        ['With prefix icon', { showPrefixIcon: true }],
      ].map(([label, options]) => (
        <div key={label as string} className="flex flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            {label as string}
          </p>
          <DialogExample args={args} {...(options as DialogExampleProps)} />
        </div>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => <DialogExample args={args} />,
};
