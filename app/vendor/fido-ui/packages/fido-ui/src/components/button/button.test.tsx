import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Plus } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-fido-ui-primary-700');
    expect(btn.className).toContain('text-fido-ui-h5');
    expect(btn.className).toContain('rounded-fido-ui-md');
  });

  it('applies md size padding', () => {
    render(<Button>Medium</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('px-fido-ui-base');
    expect(btn.className).toContain('py-fido-ui-md');
  });

  it('applies color and shade variants', () => {
    render(
      <Button color="destruct" shade="light">
        Delete
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-fido-ui-destruct-50');
    expect(btn.className).toContain('outline');
    expect(btn.className).toContain('outline-fido-ui-destruct-300');
    expect(btn.className).toContain('text-fido-ui-destruct-900');
  });

  it('gives every light shade a tinted fill and a 300 stroke', () => {
    const { rerender } = render(<Button shade="light">Light</Button>);
    expect(screen.getByRole('button').className).toContain('bg-fido-ui-primary-50');
    expect(screen.getByRole('button').className).toContain('outline-fido-ui-primary-300');

    rerender(
      <Button color="secondary" shade="light">
        Light
      </Button>,
    );
    expect(screen.getByRole('button').className).toContain('bg-fido-ui-secondary-50');
    expect(screen.getByRole('button').className).toContain('outline-fido-ui-secondary-300');

    rerender(
      <Button color="neutral" shade="light">
        Light
      </Button>,
    );
    expect(screen.getByRole('button').className).toContain('bg-fido-ui-neutral-50');
    expect(screen.getByRole('button').className).toContain('outline-fido-ui-neutral-300');
  });

  it('darkens the fill on focus for dark shades', () => {
    render(<Button>Focus</Button>);
    expect(screen.getByRole('button').className).toContain('focus-visible:bg-fido-ui-primary-800');
  });

  it('fills ghost shades white on focus', () => {
    render(<Button shade="ghost">Ghost</Button>);
    expect(screen.getByRole('button').className).toContain('focus-visible:bg-fido-ui-neutral-white');
  });

  it('applies secondary color variant', () => {
    render(
      <Button color="secondary" shade="dark">
        Secondary
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-fido-ui-secondary-700');
  });

  it('applies ghost shade variant', () => {
    render(
      <Button color="neutral" shade="ghost">
        Cancel
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-fido-ui-neutral-700');
    expect(btn.className).not.toContain('bg-fido-ui-neutral-600');
  });

  it('applies sm size typography and padding', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-fido-ui-p3');
    expect(btn.className).toContain('px-fido-ui-lg');
    expect(btn.className).toContain('py-fido-ui-xs');
  });

  it('merges custom className', () => {
    render(<Button className="my-custom-class">Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('my-custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies disabled styling for dark shade', () => {
    render(
      <Button color="primary" shade="dark" disabled>
        Disabled
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('disabled:bg-fido-ui-neutral-100');
    expect(btn.className).toContain('disabled:text-fido-ui-neutral-500');
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <Button disabled onClick={() => (clicked = true)}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(false);
  });

  it('renders a left icon (lucide-react) before the label', () => {
    const { container } = render(<Button leftIcon={Plus}>Add</Button>);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a right icon (Heroicons) after the label', () => {
    const { container } = render(<Button rightIcon={XMarkIcon}>Dismiss</Button>);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders both icons in order around the label', () => {
    const { container } = render(
      <Button leftIcon={Plus} rightIcon={XMarkIcon}>
        Label
      </Button>,
    );
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with icons', async () => {
    const { container } = render(
      <Button leftIcon={Plus} rightIcon={XMarkIcon}>
        Test
      </Button>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
