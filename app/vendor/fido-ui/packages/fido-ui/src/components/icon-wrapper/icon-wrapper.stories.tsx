import type { Meta, StoryObj } from '@storybook/react-vite';
import { Building2 } from 'lucide-react';
import { IconWrapper } from './icon-wrapper';
import type { IconWrapperVariants } from './icon-wrapper.variants';

const colors: Array<NonNullable<IconWrapperVariants['color']>> = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'info',
  'warning',
  'destruct',
];

const sizes: Array<NonNullable<IconWrapperVariants['size']>> = ['lg', 'md', 'sm'];

const meta: Meta<typeof IconWrapper> = {
  title: 'Components/IconWrapper',
  component: IconWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A presentational wrapper that applies FidoUI color, size, padding, and radius
tokens to consumer-provided icon content.

## Import

\`\`\`tsx
import { IconWrapper } from '@petscreeninginc/fido-ui/icon-wrapper';
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-fido-ui-xl">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: colors,
      description: 'Semantic foreground/background color family.',
      table: { defaultValue: { summary: 'primary' } },
    },
    shade: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Light or dark color treatment.',
      table: { defaultValue: { summary: 'light' } },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Wrapper and icon size.',
      table: { defaultValue: { summary: 'lg' } },
    },
    children: { control: false, description: 'Consumer-provided icon or image.' },
    className: { control: false },
  },
  args: {
    color: 'primary',
    shade: 'light',
    size: 'lg',
    children: <Building2 aria-hidden="true" />,
  },
};

export default meta;
type Story = StoryObj<typeof IconWrapper>;

/** Primary Docs example using a Lucide icon that inherits the wrapper color. */
export const Examples: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-fido-ui-xl">
      {sizes.map((size) => (
        <IconWrapper key={size} size={size}>
          <Building2 aria-hidden="true" />
        </IconWrapper>
      ))}
    </div>
  ),
};

export const Dark: Story = {
  args: {
    shade: 'dark',
    children: <Building2 aria-hidden="true" />,
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-fido-ui-xl">
      {colors.map((color) => (
        <div key={color} className="grid grid-cols-2 gap-fido-ui-xl">
          {(['light', 'dark'] as const).map((shade) => (
            <div key={shade} className="flex items-center gap-fido-ui-xl">
              {sizes.map((size) => (
                <IconWrapper key={size} color={color} shade={shade} size={size}>
                  <Building2 aria-hidden="true" />
                </IconWrapper>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Interactive canvas with Controls — excluded from Docs so it stays its own page. */
export const Playground: Story = {
  parameters: { docs: { disable: true } },
  args: {
    children: <Building2 aria-hidden="true" />,
  },
};
