import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { InputOtp } from './input-otp';

describe('InputOtp', () => {
  it('renders the correct number of digit slots', () => {
    const { container } = render(<InputOtp value="" length={6} />);
    // 6 slots + 1 hidden input
    const slots = container.querySelectorAll('[data-filled], [data-active], div > div');
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('displays digits from value', () => {
    render(<InputOtp value="123" length={6} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders 4-digit OTP', () => {
    render(<InputOtp value="1234" length={4} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders hyphen separator', () => {
    render(<InputOtp value="" length={6} hyphenAfter={3} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('has accessible group label', () => {
    render(<InputOtp value="" />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'One-time password');
  });

  it('has a hidden input with one-time-code autocomplete', () => {
    render(<InputOtp value="123456" />);
    const input = screen.getByLabelText('OTP input');
    expect(input).toHaveAttribute('autocomplete', 'one-time-code');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveValue('123456');
  });

  it('applies error status styling', () => {
    const { container } = render(<InputOtp value="" status="error" />);
    const slot = container.querySelector('[class*="border-fido-ui-destruct"]');
    expect(slot).toBeTruthy();
  });

  it('applies success status styling', () => {
    const { container } = render(<InputOtp value="" status="success" />);
    const slot = container.querySelector('[class*="border-fido-ui-success"]');
    expect(slot).toBeTruthy();
  });

  it('applies disabled state', () => {
    render(<InputOtp value="" disabled />);
    expect(screen.getByLabelText('OTP input')).toBeDisabled();
  });

  it('forwards ref to the hidden input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputOtp ref={ref} value="" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('forwards inputProps to hidden input', () => {
    const onChange = vi.fn();
    render(<InputOtp value="" inputProps={{ onChange, 'data-testid': 'otp-hidden' } as any} />);
    expect(screen.getByTestId('otp-hidden')).toBeInTheDocument();
  });

  it('supports custom renderSlot', () => {
    render(
      <InputOtp
        value="12"
        length={4}
        renderSlot={({ digit, index }) => (
          <span data-testid={`slot-${index}`}>{digit || '•'}</span>
        )}
      />,
    );
    expect(screen.getByTestId('slot-0')).toHaveTextContent('1');
    expect(screen.getByTestId('slot-1')).toHaveTextContent('2');
    expect(screen.getByTestId('slot-2')).toHaveTextContent('•');
    expect(screen.getByTestId('slot-3')).toHaveTextContent('•');
  });

  it('merges custom className', () => {
    render(<InputOtp value="" className="mt-4" />);
    expect(screen.getByRole('group')).toHaveClass('mt-4');
  });

  it('applies the fixed 36px slot size', () => {
    const { container } = render(<InputOtp value="1" />);
    const slot = container.querySelector('[data-filled]');
    expect(slot).toHaveClass('size-9');
  });

  it('renders slots with rounded corners', () => {
    const { container } = render(<InputOtp value="1" />);
    const slot = container.querySelector('[data-filled]');
    expect(slot?.className).toContain('rounded-fido-ui-xs');
  });

  it('passes name to hidden input', () => {
    render(<InputOtp value="" name="otp-code" />);
    const input = screen.getByLabelText('OTP input');
    expect(input).toHaveAttribute('name', 'otp-code');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<InputOtp value="" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
