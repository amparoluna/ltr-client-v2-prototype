import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { BadgeNumber } from './badge-number';

/** The badge root; getByText returns the inner text-box wrapper span. */
function badgeOf(text: string): HTMLElement {
  return screen.getByText(text).parentElement as HTMLElement;
}

describe('BadgeNumber', () => {
  it('renders with children', () => {
    render(<BadgeNumber>4</BadgeNumber>);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('applies default variant classes (primary dark)', () => {
    render(<BadgeNumber>1</BadgeNumber>);
    const el = badgeOf('1');
    expect(el.className).toContain('bg-fido-ui-primary-700');
    expect(el.className).toContain('text-fido-ui-neutral-white');
    expect(el.className).toContain('text-fido-ui-p4');
    expect(el.className).toContain('rounded-fido-ui-xs');
  });

  it('renders a fixed square from the size scale', () => {
    render(<BadgeNumber>2</BadgeNumber>);
    expect(badgeOf('2').className).toContain('size-fido-ui-xs');
  });

  it('trims the inner text line box for optical centering', () => {
    render(<BadgeNumber>2</BadgeNumber>);
    expect(screen.getByText('2').className).toContain('text-box');
  });

  it('applies color and shade variants', () => {
    render(
      <BadgeNumber color="success" shade="light">
        9
      </BadgeNumber>,
    );
    const el = badgeOf('9');
    expect(el.className).toContain('bg-fido-ui-success-100');
    expect(el.className).toContain('text-fido-ui-success-900');
  });

  it('uses the darker 900 step for alert/light text', () => {
    render(
      <BadgeNumber color="alert" shade="light">
        3
      </BadgeNumber>,
    );
    expect(badgeOf('3').className).toContain('text-fido-ui-alert-900');
  });

  it('uses the neutral 100 surface for neutral/light', () => {
    render(
      <BadgeNumber color="neutral" shade="light">
        5
      </BadgeNumber>,
    );
    const el = badgeOf('5');
    expect(el.className).toContain('bg-fido-ui-neutral-100');
    expect(el.className).toContain('text-fido-ui-neutral-black');
  });

  it('uses white text for warning/dark', () => {
    render(
      <BadgeNumber color="warning" shade="dark">
        7
      </BadgeNumber>,
    );
    const el = badgeOf('7');
    expect(el.className).toContain('bg-fido-ui-warning-500');
    expect(el.className).toContain('text-fido-ui-neutral-white');
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
      const { unmount } = render(<BadgeNumber color={color}>{color}</BadgeNumber>);
      expect(screen.getByText(color)).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    render(<BadgeNumber className="ml-2">8</BadgeNumber>);
    expect(badgeOf('8').className).toContain('ml-2');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<BadgeNumber ref={ref}>6</BadgeNumber>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders as a span element', () => {
    render(<BadgeNumber>0</BadgeNumber>);
    expect(badgeOf('0').tagName).toBe('SPAN');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<BadgeNumber color="info">4</BadgeNumber>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
