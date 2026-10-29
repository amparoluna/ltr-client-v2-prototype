import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Input } from './input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input aria-label="Field" placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Input aria-label="Disabled" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Field" placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input aria-label="Field" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges custom className', () => {
    render(<Input aria-label="Field" className="mt-4" />);
    expect(screen.getByRole('textbox')).toHaveClass('mt-4');
  });

  it('passes name to the input element', () => {
    render(<Input aria-label="Email" name="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email');
  });

  it('applies error state classes', () => {
    render(<Input aria-label="Email" state="error" />);
    expect(screen.getByRole('textbox').className).toContain('border-fido-ui-destruct-600');
  });

  it('applies success state classes', () => {
    render(<Input aria-label="Email" state="success" />);
    expect(screen.getByRole('textbox').className).toContain('border-fido-ui-success-600');
  });

  it('has no accessibility violations with an accessible name', async () => {
    const { container } = render(<Input aria-label="Email" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
