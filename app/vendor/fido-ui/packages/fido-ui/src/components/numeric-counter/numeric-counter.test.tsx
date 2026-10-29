import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { NumericCounter } from './numeric-counter';

describe('NumericCounter', () => {
  it('renders the default size value output', () => {
    render(<NumericCounter value={2} valueAriaLabel="Quantity" />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toHaveTextContent('2');
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  it('renders the compact size', () => {
    const { container } = render(
      <NumericCounter size="compact" value={2} valueAriaLabel="Quantity" />,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('gap-fido-ui-md');
  });

  it('calls increment and decrement handlers', async () => {
    const user = userEvent.setup();
    let value = 1;

    render(
      <NumericCounter
        value={value}
        onDecrement={() => (value -= 1)}
        onIncrement={() => (value += 1)}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Decrease value' }));
    await user.click(screen.getByRole('button', { name: 'Increase value' }));

    expect(value).toBe(1);
  });

  it('disables the whole counter', () => {
    render(<NumericCounter value={0} disabled />);

    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled();
  });

  it('supports per-button disabled states for min/max bounds', () => {
    render(<NumericCounter value={0} decrementDisabled />);

    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase value' })).not.toBeDisabled();
  });

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<NumericCounter ref={ref} value={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className on root', () => {
    const { container } = render(<NumericCounter value={0} className="my-counter" />);
    expect(container.firstChild).toHaveClass('my-counter');
  });

  it('uses shared v3/v4 token utilities instead of CSS variable utilities', () => {
    const { container } = render(<NumericCounter value={0} />);
    const classNames = [...container.querySelectorAll('*')]
      .map((element) => element.getAttribute('class') ?? '')
      .join(' ');

    expect(classNames).not.toContain('var(--');
    expect(classNames).toContain('gap-fido-ui-2xl');
    expect(classNames).toContain('size-fido-ui-lg');
    expect(classNames).toContain('text-fido-ui-h1');
    expect(classNames).toContain('leading-fido-ui-tight');
    expect(classNames).toContain('min-w-[22px]');
    expect(classNames).toContain('text-fido-ui-neutral-700');
    // IconButton primary/light controls
    expect(classNames).toContain('bg-fido-ui-primary-50');
    expect(classNames).toContain('outline-fido-ui-primary-500');
    expect(classNames).toContain('text-fido-ui-primary-700');
  });

  it('uses compact token utilities for the compact size', () => {
    const { container } = render(<NumericCounter size="compact" value={0} />);
    const classNames = [...container.querySelectorAll('*')]
      .map((element) => element.getAttribute('class') ?? '')
      .join(' ');

    expect(classNames).toContain('gap-fido-ui-md');
    expect(classNames).toContain('size-fido-ui-sm');
    expect(classNames).toContain('text-fido-ui-h3');
    expect(classNames).toContain('min-w-[22px]');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <NumericCounter
        value={0}
        valueAriaLabel="Quantity"
        decrementAriaLabel="Decrease quantity"
        incrementAriaLabel="Increase quantity"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in the compact size', async () => {
    const { container } = render(
      <NumericCounter
        size="compact"
        value={0}
        valueAriaLabel="Quantity"
        decrementAriaLabel="Decrease quantity"
        incrementAriaLabel="Increase quantity"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
