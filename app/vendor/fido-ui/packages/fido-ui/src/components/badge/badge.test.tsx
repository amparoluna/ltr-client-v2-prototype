import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Check, X } from 'lucide-react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders with children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant classes (primary dark, lg)', () => {
    render(<Badge>Default</Badge>);
    const el = screen.getByText('Default');
    expect(el.className).toContain('bg-fido-ui-primary-700');
    expect(el.className).toContain('text-fido-ui-neutral-white');
    expect(el.className).toContain('text-fido-ui-p3');
    expect(el.className).toContain('rounded-fido-ui-full');
  });

  it('applies color and shade variants', () => {
    render(
      <Badge color="success" shade="light">
        Active
      </Badge>,
    );
    const el = screen.getByText('Active');
    expect(el.className).toContain('bg-fido-ui-success-100');
    expect(el.className).toContain('text-fido-ui-success-800');
  });

  it('renders light shades without a border', () => {
    render(
      <Badge color="primary" shade="light">
        Borderless
      </Badge>,
    );
    expect(screen.getByText('Borderless').className).not.toContain('border');
  });

  it('uses the neutral 200 surface for neutral/light', () => {
    render(
      <Badge color="neutral" shade="light">
        Neutral
      </Badge>,
    );
    const el = screen.getByText('Neutral');
    expect(el.className).toContain('bg-fido-ui-neutral-200');
    expect(el.className).toContain('text-fido-ui-neutral-black');
  });

  it('uses white text for warning/dark', () => {
    render(
      <Badge color="warning" shade="dark">
        Warn
      </Badge>,
    );
    const el = screen.getByText('Warn');
    expect(el.className).toContain('text-fido-ui-neutral-white');
    expect(el.className).toContain('bg-fido-ui-warning-500');
  });

  it('applies size variants', () => {
    const { rerender } = render(<Badge size="lg">Sized</Badge>);
    expect(screen.getByText('Sized').className).toContain('text-fido-ui-p3');
    rerender(<Badge size="md">Sized</Badge>);
    expect(screen.getByText('Sized').className).toContain('text-fido-ui-p4');
    rerender(<Badge size="sm">Sized</Badge>);
    expect(screen.getByText('Sized').className).toContain('text-fido-ui-p5');
  });

  it('takes lg and md heights from the size scale', () => {
    const { rerender } = render(<Badge size="lg">Sized</Badge>);
    expect(screen.getByText('Sized').className).toContain('h-fido-ui-sm');
    rerender(<Badge size="md">Sized</Badge>);
    expect(screen.getByText('Sized').className).toContain('h-fido-ui-xs');
  });

  it('tightens the padding on whichever side holds an icon', () => {
    const { rerender } = render(<Badge>Padded</Badge>);
    expect(screen.getByText('Padded').className).toContain('pl-fido-ui-md');
    expect(screen.getByText('Padded').className).toContain('pr-fido-ui-md');

    rerender(<Badge leftIcon={Check}>Padded</Badge>);
    expect(screen.getByText('Padded').className).toContain('pl-fido-ui-xs');
    expect(screen.getByText('Padded').className).toContain('pr-fido-ui-md');

    rerender(<Badge rightIcon={X}>Padded</Badge>);
    expect(screen.getByText('Padded').className).toContain('pl-fido-ui-md');
    expect(screen.getByText('Padded').className).toContain('pr-fido-ui-xs');
  });

  it('treats the dismiss button as a trailing icon for padding', () => {
    render(<Badge onDismiss={() => {}}>Dismiss padding</Badge>);
    expect(screen.getByText('Dismiss padding').className).toContain('pr-fido-ui-xs');
  });

  it('uses the smaller padding step for md and sm', () => {
    const { rerender } = render(<Badge size="md">Small</Badge>);
    expect(screen.getByText('Small').className).toContain('pl-fido-ui-sm');

    rerender(
      <Badge size="md" leftIcon={Check}>
        Small
      </Badge>,
    );
    expect(screen.getByText('Small').className).toContain('pl-fido-ui-2xs');

    rerender(
      <Badge size="sm" leftIcon={Check}>
        Small
      </Badge>,
    );
    expect(screen.getByText('Small').className).toContain('pl-fido-ui-2xs');
  });

  it('does not render icons by default', () => {
    const { container } = render(<Badge>Plain</Badge>);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders a leading icon when leftIcon is provided', () => {
    const { container } = render(<Badge leftIcon={Check}>WithCheck</Badge>);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders a trailing icon when rightIcon is provided', () => {
    const { container } = render(<Badge rightIcon={X}>WithX</Badge>);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('sizes icons per badge size', () => {
    const { container, rerender } = render(
      <Badge size="lg" leftIcon={Check}>
        Sized
      </Badge>,
    );
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('size-4');
    rerender(
      <Badge size="md" leftIcon={Check}>
        Sized
      </Badge>,
    );
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('size-3.5');
  });

  it('renders a dismiss button when onDismiss is provided and calls it on click', () => {
    const onDismiss = vi.fn();
    render(<Badge onDismiss={onDismiss}>Dismissible</Badge>);
    const button = screen.getByRole('button', { name: 'Dismiss' });
    fireEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('prefers the dismiss button over rightIcon', () => {
    render(
      <Badge rightIcon={X} onDismiss={() => {}}>
        Both
      </Badge>,
    );
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
    // Only the dismiss button's icon is rendered.
    expect(document.querySelectorAll('svg')).toHaveLength(1);
  });

  it('applies all 7 color variants', () => {
    const colors = [
      'primary',
      'secondary',
      'info',
      'alert',
      'warning',
      'success',
      'neutral',
    ] as const;
    for (const color of colors) {
      const { unmount } = render(<Badge color={color}>{color}</Badge>);
      expect(screen.getByText(color)).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    render(<Badge className="ml-2">Custom</Badge>);
    expect(screen.getByText('Custom').className).toContain('ml-2');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders as a span element', () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText('Tag').tagName).toBe('SPAN');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Badge leftIcon={Check} onDismiss={() => {}}>
        Test
      </Badge>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
