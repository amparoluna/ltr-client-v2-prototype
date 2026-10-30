import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Attachment, type AttachmentProps } from './attachment';

function DemoAttachment(args: AttachmentProps) {
  return <Attachment {...args} />;
}

const meta: Meta<typeof Attachment> = {
  title: 'Components/Attachment',
  component: Attachment,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Displays a file or image attachment with media, metadata, upload state, and an
optional remove action. Consumers own upload orchestration and progress values.

## Import

\`\`\`tsx
import { Attachment } from '@petscreeninginc/fido-ui/attachment';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        {/* Figma frame width is 254px on the Attachment itself — keep padding outside */}
        <div className="w-[254px]">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Layout size (Figma Size: MED / LG).',
      table: { defaultValue: { summary: 'md' } },
    },
    state: {
      control: 'select',
      options: ['default', 'uploading', 'success', 'error'],
      description: 'Upload lifecycle state (Figma State).',
      table: { defaultValue: { summary: 'default' } },
    },
    type: {
      control: 'select',
      options: ['document', 'image', 'loader'],
      description: 'Leading media kind (Figma Type).',
      table: { defaultValue: { summary: 'document' } },
    },
    title: {
      control: 'text',
      description: 'Filename / primary label.',
    },
    description: {
      control: 'text',
      description: 'Secondary feedback or metadata line.',
    },
    progress: {
      control: 'number',
      description: 'Used when state is uploading and description is omitted.',
    },
    showFeedback: {
      control: 'boolean',
      description: 'Whether to render the description line (Figma Feedback).',
      table: { defaultValue: { summary: 'true' } },
    },
    showAction: {
      control: 'boolean',
      description: 'Whether to render the remove action (Figma Action).',
      table: { defaultValue: { summary: 'true' } },
    },
    media: { control: false, description: 'Custom leading media; overrides type.' },
    actionIcon: { control: false, description: 'Custom remove icon component.' },
    className: { control: false },
    onRemove: { control: false, description: 'Called when the remove action is clicked.' },
    removeLabel: { control: 'text', description: 'Accessible label for the remove action.' },
  },
  args: {
    size: 'md',
    state: 'default',
    type: 'document',
    title: 'sales-dashboard.pdf',
    description: 'PDF · 2.4 MB',
    showFeedback: true,
    showAction: true,
    onRemove: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Attachment>;

/** Primary Docs example — single instance; use Args to change behavior. */
export const Examples: Story = {
  render: (args) => <DemoAttachment {...args} />,
};

export const Uploading: Story = {
  args: {
    state: 'uploading',
    type: 'loader',
    description: undefined,
    progress: 64,
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const Success: Story = {
  args: {
    state: 'success',
    description: undefined,
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    state: 'error',
    description: undefined,
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const Large: Story = {
  args: {
    size: 'lg',
    description: 'PNG · 2.4 MB',
    type: 'document',
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const LargeUploading: Story = {
  args: {
    size: 'lg',
    state: 'uploading',
    type: 'loader',
    description: undefined,
    progress: 64,
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const ImageType: Story = {
  args: {
    type: 'image',
    title: 'sales-dashboard.png',
    description: 'PNG · 2.4 MB',
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const WithoutAction: Story = {
  args: {
    showAction: false,
    onRemove: undefined,
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const WithoutFeedback: Story = {
  args: {
    showFeedback: false,
  },
  render: (args) => <DemoAttachment {...args} />,
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators: [
    (Story) => (
      <div className="p-16">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col items-start gap-10">
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Medium (list)
        </p>
        <div className="flex w-[254px] flex-col gap-2">
          <Attachment
            size="md"
            state="uploading"
            type="loader"
            title="sales-dashboard.pdf"
            progress={64}
            onRemove={() => {}}
          />
          <Attachment
            size="md"
            state="success"
            type="document"
            title="sales-dashboard.pdf"
            onRemove={() => {}}
          />
          <Attachment
            size="md"
            state="default"
            type="document"
            title="sales-dashboard.pdf"
            description="PDF · 2.4 MB"
            onRemove={() => {}}
          />
          <Attachment
            size="md"
            state="error"
            type="document"
            title="sales-dashboard.pdf"
            onRemove={() => {}}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Large (card)
        </p>
        <div className="flex w-[254px] flex-col gap-2">
          <Attachment
            size="lg"
            state="uploading"
            type="loader"
            title="sales-dashboard.pdf"
            progress={64}
            onRemove={() => {}}
          />
          <Attachment
            size="lg"
            state="success"
            type="document"
            title="sales-dashboard.pdf"
            onRemove={() => {}}
          />
          <Attachment
            size="lg"
            state="default"
            type="document"
            title="sales-dashboard.pdf"
            description="PNG · 2.4 MB"
            onRemove={() => {}}
          />
          <Attachment
            size="lg"
            state="error"
            type="document"
            title="sales-dashboard.pdf"
            onRemove={() => {}}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Type variants
        </p>
        <div className="flex w-[254px] flex-col gap-2">
          <Attachment
            type="loader"
            state="uploading"
            title="sales-dashboard.pdf"
            progress={64}
            onRemove={() => {}}
          />
          <Attachment
            type="document"
            title="sales-dashboard.pdf"
            description="PDF · 1.2 MB"
            onRemove={() => {}}
          />
          <Attachment
            type="image"
            title="sales-dashboard.png"
            description="PNG · 2.4 MB"
            onRemove={() => {}}
          />
        </div>
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => <DemoAttachment {...args} />,
};
