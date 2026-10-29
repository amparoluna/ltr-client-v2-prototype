import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DragDrop, type DragDropProps } from './drag-drop';

function DemoDragDrop(args: DragDropProps) {
  const [files, setFiles] = React.useState<FileList | null>(null);

  return (
    <div className="flex w-sm flex-col gap-fido-ui-md">
      <DragDrop
        {...args}
        onFilesChange={(next) => {
          setFiles(next);
          args.onFilesChange?.(next);
        }}
      />
      {files && files.length > 0 ? (
        <p className="font-fido-ui-paragraph text-fido-ui-p4 text-fido-ui-neutral-500">
          Selected: {Array.from(files).map((file) => file.name).join(', ')}
        </p>
      ) : null}
    </div>
  );
}

const meta: Meta<typeof DragDrop> = {
  title: 'Components/DragDrop',
  component: DragDrop,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Drag-and-drop / click-to-choose file surface. Consumers own validation, upload,
and selected-file UI via \`inputProps\` and \`onFilesChange\`.

## Import

\`\`\`tsx
import { DragDrop } from '@petscreeninginc/fido-ui/drag-drop';
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
    state: {
      control: 'select',
      options: ['default', 'active', 'disabled', 'error'],
      description: 'Forced visual state. When omitted, derives from disabled/error/drag-over.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the dropzone and file input.',
    },
    error: {
      control: 'text',
      description: 'Error message; also sets the Error visual state when state is unset.',
    },
    description: {
      control: 'text',
      description: 'Helper text below the dropzone. Stacks with error when both are set.',
    },
    supportingText: {
      control: 'boolean',
      description: 'When false, hides the helper description. Errors still render when set.',
      table: { defaultValue: { summary: 'true' } },
    },
    title: {
      control: 'text',
      description: 'Primary call-to-action label.',
      table: { defaultValue: { summary: 'Drag & drop or choose file' } },
    },
    secondaryText: {
      control: 'text',
      description: 'Accepted formats line.',
      table: { defaultValue: { summary: 'PNG, JPG, PDF, ZIP.' } },
    },
    tertiaryText: {
      control: 'text',
      description: 'Size / constraint line.',
      table: { defaultValue: { summary: 'Maximum file size: 2 MB' } },
    },
    className: {
      control: false,
      description: 'Additional class names for the root element.',
    },
    inputProps: {
      control: false,
      description: 'Props forwarded to the hidden file input.',
    },
    onFilesChange: {
      control: false,
      description: 'Called when files are chosen via click or drop.',
    },
  },
  args: {
    description: 'Helper Text',
    supportingText: true,
    disabled: false,
    title: 'Drag & drop or choose file',
    secondaryText: 'PNG, JPG, PDF, ZIP.',
    tertiaryText: 'Maximum file size: 2 MB',
    inputProps: { accept: '.png,.jpg,.jpeg,.pdf,.zip', multiple: true },
  },
};

export default meta;
type Story = StoryObj<typeof DragDrop>;

/** Primary Docs example — single instance; use Args to change behavior. */
export const Examples: Story = {
  render: (args) => <DemoDragDrop {...args} />,
};

export const Active: Story = {
  args: {
    state: 'active',
    description: 'Helper Text',
  },
  render: (args) => <DemoDragDrop {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    description: 'Helper Text',
  },
  render: (args) => <DemoDragDrop {...args} />,
};

export const Error: Story = {
  args: {
    error: 'This is an error message',
    description: 'Helper Text',
  },
  render: (args) => <DemoDragDrop {...args} />,
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      {(
        [
          { label: 'Default', props: { description: 'Helper Text' } },
          { label: 'Active', props: { state: 'active' as const, description: 'Helper Text' } },
          { label: 'Disabled', props: { disabled: true, description: 'Helper Text' } },
          {
            label: 'Error',
            props: { error: 'This is an error message', description: 'Helper Text' },
          },
        ] as const
      ).map(({ label, props }) => (
        <div key={label} className="flex w-[367px] flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
            {label}
          </p>
          <DragDrop {...props} />
        </div>
      ))}
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => <DemoDragDrop {...args} />,
};
