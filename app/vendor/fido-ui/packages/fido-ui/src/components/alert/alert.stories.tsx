import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, type AlertProps } from './alert';
import { Button } from '../button';

const purposes = ['primary', 'secondary', 'inform', 'warning', 'destruct', 'success'] as const;

type AlertStoryArgs = AlertProps & {
  showClose: boolean;
  showActions: boolean;
};

function AlertExample(args: AlertStoryArgs) {
  const {
    title,
    description,
    showClose,
    showActions,
    purpose,
    showIcon,
    showRemainingTimeSpinner,
    icon,
    className,
    ...props
  } = args;
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);
  }, [purpose, title, description, showIcon, showRemainingTimeSpinner, showClose, showActions]);

  if (!open) {
    return (
      <button
        type="button"
        className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-primary-700 underline"
        onClick={() => setOpen(true)}
      >
        Show alert
      </button>
    );
  }

  const buttonColor =
    purpose === 'primary' ? 'primary' : purpose === 'destruct' ? 'destruct' : 'neutral';

  return (
    <Alert
      purpose={purpose}
      title={title}
      description={description}
      showIcon={showIcon}
      showRemainingTimeSpinner={showRemainingTimeSpinner}
      icon={icon}
      className={className}
      onClose={showClose ? () => setOpen(false) : undefined}
      {...props}
    >
      {showActions ? (
        <Alert.Actions>
          <Button color={buttonColor} shade="light">
            Button
          </Button>
          <Button color={buttonColor} shade="ghost">
            Button
          </Button>
        </Alert.Actions>
      ) : null}
    </Alert>
  );
}

const meta: Meta<AlertStoryArgs> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Contextual alert banner for informational, success, warning, or error messages.
Pass \`title\`, \`description\`, and \`onClose\` as props; compose \`Alert.Actions\` as children.
\`description\` accepts plain text or any ReactNode (lists, links, etc.).
Consumers own dismiss handling and action button behavior.

## Import

\`\`\`tsx
import { Alert } from '@petscreeninginc/fido-ui/alert';
\`\`\`

## Usage

\`\`\`tsx
<Alert
  purpose="inform"
  title="Alert heading message"
  description="Description"
  onClose={handleClose}
>
  <Alert.Actions>
    <Button color="neutral" shade="light">Confirm</Button>
    <Button color="neutral" shade="ghost">Dismiss</Button>
  </Alert.Actions>
</Alert>
\`\`\`

## Rich description

\`\`\`tsx
<Alert
  purpose="warning"
  title="Please note"
  description={
    <ul>
      <li>Registration documents are not sufficient…</li>
    </ul>
  }
/>
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <div className="w-[507px]">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    purpose: {
      control: 'select',
      options: [...purposes],
      description: 'Semantic purpose of the alert (Figma: Purpose).',
      table: { defaultValue: { summary: 'primary' } },
    },
    title: {
      control: 'text',
      description: 'Heading text of the alert.',
    },
    description: {
      control: 'text',
      description: 'Secondary content below the title — plain text or any ReactNode.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the left icon strip (Figma: icon).',
      table: { defaultValue: { summary: 'true' } },
    },
    showRemainingTimeSpinner: {
      control: 'boolean',
      description: 'Replace the icon with a spinner (Figma: spinner).',
      table: { defaultValue: { summary: 'false' } },
    },
    showClose: {
      control: 'boolean',
      description: 'Whether to provide onClose (renders dismiss control).',
      table: { defaultValue: { summary: 'true' } },
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to render Alert.Actions with sample Buttons.',
      table: { defaultValue: { summary: 'false' } },
    },
    onClose: {
      control: false,
      description: 'When provided, renders a dismiss control that calls this handler.',
    },
    icon: {
      control: false,
      description: 'Custom icon component for the strip.',
    },
    children: {
      control: false,
      description: 'Composed Alert.Actions.',
    },
    className: {
      control: false,
      description: 'Additional class names for the root element.',
    },
  },
  args: {
    purpose: 'primary',
    title: 'Alert heading message',
    description: 'Description',
    showIcon: true,
    showRemainingTimeSpinner: false,
    showClose: true,
    showActions: false,
  },
};

export default meta;
type Story = StoryObj<AlertStoryArgs>;

/** Primary Docs example — single instance; use Args to change behavior. */
export const Examples: Story = {
  render: (args) => <AlertExample {...args} />,
};

export const Secondary: Story = {
  args: { purpose: 'secondary' },
  render: (args) => <AlertExample {...args} />,
};

export const Inform: Story = {
  args: { purpose: 'inform' },
  render: (args) => <AlertExample {...args} />,
};

export const Warning: Story = {
  args: { purpose: 'warning' },
  render: (args) => <AlertExample {...args} />,
};

export const Destruct: Story = {
  args: { purpose: 'destruct' },
  render: (args) => <AlertExample {...args} />,
};

export const Success: Story = {
  args: { purpose: 'success' },
  render: (args) => <AlertExample {...args} />,
};

export const WithoutClose: Story = {
  args: {
    showClose: false,
  },
  render: (args) => <AlertExample {...args} />,
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
  },
  render: (args) => <AlertExample {...args} />,
};

export const WithoutHeading: Story = {
  args: {
    title: '',
  },
  render: (args) => <AlertExample {...args} />,
};

export const WithoutDescription: Story = {
  args: {
    description: '',
  },
  render: (args) => <AlertExample {...args} />,
};

export const WithSpinner: Story = {
  args: {
    purpose: 'inform',
    showRemainingTimeSpinner: true,
  },
  render: (args) => <AlertExample {...args} />,
};

export const WithActions: Story = {
  args: {
    purpose: 'inform',
    showIcon: false,
    showActions: true,
  },
  render: (args) => <AlertExample {...args} />,
};

const pleaseNoteDescription = (
  <ul className="list-disc space-y-fido-ui-sm pl-fido-ui-xl">
    <li>
      Registration documents (ID cards, certificates, etc.) are not sufficient to support a request
      and will result in a return for more information and a delay in processing.
    </li>
    <li>
      We ask for documentation issued within the last 12 months, unless the document indicates that
      both the disability and related need for the animal is long-term or permanent.
    </li>
    <li>
      Letters purchased from the internet based solely on completion of an online questionnaire or
      survey may be considered unreliable and insufficient to support your request.
    </li>
    <li>It is NOT necessary to send medical records or disclose any specific diagnosis.</li>
  </ul>
);

export const WithRichDescription: Story = {
  args: {
    purpose: 'warning',
    title: 'Please note',
    showClose: false,
  },
  render: () => (
    <Alert purpose="warning" title="Please note" description={pleaseNoteDescription} />
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col items-start gap-10">
      {purposes.map((purpose) => (
        <div key={purpose} className="flex w-full flex-col gap-2">
          <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold capitalize text-fido-ui-neutral-600">
            {purpose}
          </p>
          <Alert
            purpose={purpose}
            title="Alert heading message"
            description="Description"
            onClose={() => {}}
          />
        </div>
      ))}

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Without close
        </p>
        <Alert purpose="primary" title="Alert heading message" description="Description" />
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Without icon
        </p>
        <Alert
          purpose="primary"
          showIcon={false}
          title="Alert heading message"
          description="Description"
          onClose={() => {}}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Spinner
        </p>
        <Alert
          purpose="inform"
          showRemainingTimeSpinner
          title="Alert heading message"
          description="Description"
          onClose={() => {}}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Actions
        </p>
        <Alert
          purpose="inform"
          showIcon={false}
          title="Alert heading message"
          description="Description"
          onClose={() => {}}
        >
          <Alert.Actions>
            <Button color="neutral" shade="light">
              Button
            </Button>
            <Button color="neutral" shade="ghost">
              Button
            </Button>
          </Alert.Actions>
        </Alert>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="font-fido-ui-paragraph text-fido-ui-p4 font-semibold text-fido-ui-neutral-600">
          Rich description
        </p>
        <Alert purpose="warning" title="Please note" description={pleaseNoteDescription} />
      </div>
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => <AlertExample {...args} />,
};
