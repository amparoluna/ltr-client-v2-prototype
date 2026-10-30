import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cn } from '../../utils/cn';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
} from './accordion';

type AccordionDemoProps = Omit<AccordionProps, 'children'> & {
  itemCount?: number;
};

function AccordionDemo({ itemCount = 3, className, ...args }: AccordionDemoProps) {
  return (
    <Accordion {...args} className={cn('w-[360px]', className)}>
      {Array.from({ length: itemCount }, (_, i) => (
        <AccordionItem key={i} value={`item-${i + 1}`}>
          <AccordionTrigger>Trigger Text</AccordionTrigger>
          <AccordionContent>This is an accordion content.</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A vertically stacked set of interactive headings that reveal or hide associated
content. Supports single or multiple open panels; consumers own open state when
using controlled \`value\` / \`onValueChange\`.

## Import

\`\`\`tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@petscreeninginc/fido-ui/accordion';
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
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or many items can be open at once.',
      table: { defaultValue: { summary: 'single' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire accordion.',
    },
    defaultValue: {
      control: 'text',
      description: 'Uncontrolled open item(s). String for single; use Multiple story for arrays.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    value: {
      control: false,
      description: 'Controlled open item(s). String for single, string[] for multiple.',
    },
    onValueChange: {
      control: false,
      description: 'Called when the open item(s) change.',
    },
    className: {
      control: false,
      description: 'Additional class names for the root element.',
    },
    children: {
      control: false,
      description: 'Accordion items (`AccordionItem` with trigger + content).',
    },
  },
  args: {
    type: 'single',
    disabled: false,
    defaultValue: 'item-1',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/** Primary Docs example — single accordion; use Args to change behavior. */
export const Examples: Story = {
  render: (args) => (
    <AccordionDemo
      key={`${args.type}-${String(args.defaultValue)}-${args.disabled}`}
      {...args}
    />
  ),
};

/** Matches Figma `Accordion (Stack)` — one open item above collapsed siblings. */
export const Stack: Story = {
  args: {
    type: 'single',
    defaultValue: 'item-1',
  },
  render: (args) => <AccordionDemo {...args} itemCount={8} />,
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-2'],
  },
  render: (args) => (
    <Accordion {...args} className="min-w-[360px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>This section starts open.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>This section also starts open.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third section</AccordionTrigger>
        <AccordionContent>This section starts closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="min-w-[360px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled item</AccordionTrigger>
        <AccordionContent>This item works normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled item</AccordionTrigger>
        <AccordionContent>You should not be able to open this.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another enabled item</AccordionTrigger>
        <AccordionContent>This item also works normally.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithRichContent: Story = {
  name: 'With Rich Content',
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="max-w-[360px] min-w-[360px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p className="font-medium">Profile Information</p>
            <p>Update your name, email, and profile picture in the account settings page.</p>
            <ul className="list-inside list-disc space-y-1 text-fido-ui-p4">
              <li>Display name</li>
              <li>Email address</li>
              <li>Avatar image</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Configure how and when you receive notifications.</p>
            <div className="rounded-fido-ui-md bg-fido-ui-neutral-50 p-3 text-fido-ui-p4">
              Tip: You can also manage notification preferences from the mobile app.
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Manage your subscription and payment methods.</p>
            <p className="text-fido-ui-p4 text-fido-ui-neutral-500">
              Current plan: <span className="font-semibold text-fido-ui-primary-600">Pro</span>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function Render() {
    const [value, setValue] = React.useState('item-1');

    return (
      <div className="flex w-[360px] flex-col gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-fido-ui-md bg-fido-ui-primary-500 px-3 py-1 text-fido-ui-p4 text-white"
            onClick={() => setValue('item-1')}
          >
            Open 1
          </button>
          <button
            type="button"
            className="rounded-fido-ui-md bg-fido-ui-primary-500 px-3 py-1 text-fido-ui-p4 text-white"
            onClick={() => setValue('item-2')}
          >
            Open 2
          </button>
          <button
            type="button"
            className="rounded-fido-ui-md bg-fido-ui-primary-500 px-3 py-1 text-fido-ui-p4 text-white"
            onClick={() => setValue('item-3')}
          >
            Open 3
          </button>
        </div>
        <p className="font-fido-ui-paragraph text-fido-ui-p4 text-fido-ui-neutral-500">
          Current value: {value}
        </p>
        <Accordion type="single" value={value} onValueChange={(next) => setValue(next as string)}>
          <AccordionItem value="item-1">
            <AccordionTrigger>First section</AccordionTrigger>
            <AccordionContent>Content for the first section.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second section</AccordionTrigger>
            <AccordionContent>Content for the second section.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third section</AccordionTrigger>
            <AccordionContent>Content for the third section.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Default
        </p>
        <AccordionDemo type="single" defaultValue="item-1" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Stack
        </p>
        <AccordionDemo type="single" defaultValue="item-1" itemCount={8} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Multiple
        </p>
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-[360px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>First section</AccordionTrigger>
            <AccordionContent>This section starts open.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second section</AccordionTrigger>
            <AccordionContent>This section also starts open.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third section</AccordionTrigger>
            <AccordionContent>This section starts closed.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Disabled item
        </p>
        <Accordion type="single" defaultValue="item-1" className="w-[360px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Enabled item</AccordionTrigger>
            <AccordionContent>This item works normally.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" disabled>
            <AccordionTrigger>Disabled item</AccordionTrigger>
            <AccordionContent>You should not be able to open this.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Another enabled item</AccordionTrigger>
            <AccordionContent>This item also works normally.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Root disabled
        </p>
        <AccordionDemo type="single" defaultValue="item-1" disabled />
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <AccordionDemo
      key={`${args.type}-${String(args.defaultValue)}-${args.disabled}`}
      {...args}
    />
  ),
};
