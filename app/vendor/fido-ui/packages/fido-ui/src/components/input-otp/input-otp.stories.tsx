import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InputOtp } from './input-otp';

const meta: Meta<typeof InputOtp> = {
  title: 'Components/InputOtp',
  component: InputOtp,
  tags: ['ltr'],
  argTypes: {
    status: { control: 'select', options: ['default', 'error', 'success'] },
    length: { control: { type: 'number', min: 4, max: 8 } },
    hyphenAfter: { control: { type: 'number', min: 0, max: 6 } },
  },
};

export default meta;
type Story = StoryObj<typeof InputOtp>;

/**
 * Interactive demo showing how consumers handle all logic.
 * The InputOtp component is purely visual — backspace, paste, and
 * keyboard navigation are the consumer's responsibility via inputProps.
 */
const OtpDemo = (props: Partial<React.ComponentProps<typeof InputOtp>>) => {
  const [value, setValue] = React.useState(props.value ?? '');
  const maxLen = props.length ?? 6;
  return (
    <InputOtp
      {...props}
      value={value}
      inputProps={{
        onChange: (e) => {
          const v = e.target.value.replace(/\D/g, '').slice(0, maxLen);
          setValue(v);
        },
        onKeyDown: (e) => {
          if (e.key === 'Backspace') {
            e.preventDefault();
            setValue((prev) => prev.slice(0, -1));
          }
        },
        onPaste: (e) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, maxLen);
          setValue(pasted);
        },
        autoFocus: true,
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <OtpDemo {...args} />,
  args: {
    status: 'default',
    length: 6,
  },
};

export const Prefilled: Story = {
  render: () => <OtpDemo value="123456" />,
};

export const Hyphenated: Story = {
  render: () => <OtpDemo hyphenAfter={3} />,
};

export const FourDigit: Story = {
  render: () => <OtpDemo length={4} />,
};

export const Error: Story = {
  render: () => <OtpDemo value="123456" status="error" />,
};

export const Success: Story = {
  render: () => <OtpDemo value="123456" status="success" />,
};

export const Disabled: Story = {
  render: () => <OtpDemo value="123" disabled />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Default</p>
        <OtpDemo />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Hyphenated</p>
        <OtpDemo hyphenAfter={3} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Error</p>
        <OtpDemo value="123456" status="error" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Success</p>
        <OtpDemo value="123456" status="success" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Disabled</p>
        <OtpDemo value="123" disabled />
      </div>
    </div>
  ),
};
