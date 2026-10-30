import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Plus } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('renders with an accessible name from aria-label', () => {
    render(<IconButton icon={Plus} aria-label="Add item" />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('renders the icon (lucide-react) as aria-hidden', () => {
    const { container } = render(<IconButton icon={Plus} aria-label="Add" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a Heroicons icon', () => {
    const { container } = render(<IconButton icon={XMarkIcon} aria-label="Close" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('is circular', () => {
    render(<IconButton icon={Plus} aria-label="Add" />);
    expect(screen.getByRole('button').className).toContain('rounded-fido-ui-full');
  });

  it('uses the Figma 56px hit target (size-14)', () => {
    render(<IconButton icon={Plus} aria-label="Add" />);
    expect(screen.getByRole('button').className).toContain('size-14');
  });

  it('renders the icon at the Figma 18px size', () => {
    const { container } = render(<IconButton icon={Plus} aria-label="Add" />);
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('size-[18px]');
  });

  it('applies default variant classes (primary/dark uses primary-700 per Figma)', () => {
    render(<IconButton icon={Plus} aria-label="Add" />);
    expect(screen.getByRole('button').className).toContain('bg-fido-ui-primary-700');
  });

  it('applies color and shade variants', () => {
    render(<IconButton color="destruct" shade="light" icon={Plus} aria-label="Delete" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-fido-ui-destruct-50');
    expect(btn.className).toContain('outline');
    expect(btn.className).toContain('outline-fido-ui-destruct-700');
    expect(btn.className).toContain('text-fido-ui-destruct-700');
  });

  it('applies secondary color variants', () => {
    render(<IconButton color="secondary" shade="dark" icon={Plus} aria-label="Secondary" />);
    expect(screen.getByRole('button').className).toContain('bg-fido-ui-secondary-700');
  });

  it('applies ghost shade variants', () => {
    render(<IconButton color="primary" shade="ghost" icon={Plus} aria-label="Ghost" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('text-fido-ui-primary-700');
    expect(btn.className).toContain('active:bg-fido-ui-primary-100');
  });

  it('merges custom className', () => {
    render(<IconButton icon={Plus} aria-label="Add" className="my-custom-class" />);
    expect(screen.getByRole('button').className).toContain('my-custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon={Plus} aria-label="Add" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<IconButton icon={Plus} aria-label="Add" onClick={() => (clicked = true)} />);
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('is disabled when disabled prop is set', () => {
    render(<IconButton icon={Plus} aria-label="Add" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies disabled styling for dark shade', () => {
    render(<IconButton color="primary" shade="dark" icon={Plus} aria-label="Add" disabled />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('disabled:bg-fido-ui-neutral-100');
    expect(btn.className).toContain('disabled:text-fido-ui-neutral-400');
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<IconButton icon={Plus} aria-label="Add" disabled onClick={() => (clicked = true)} />);
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(false);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<IconButton icon={Plus} aria-label="Add item" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
