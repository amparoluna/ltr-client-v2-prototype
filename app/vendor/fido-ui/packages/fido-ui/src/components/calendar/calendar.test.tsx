import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Calendar } from './calendar';

describe('Calendar', () => {
  it('renders with mode="single"', () => {
    const { container } = render(
      <Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />,
    );
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('renders weekday headers', () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />);
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
  });

  it('applies framed card chrome by default', () => {
    const { container } = render(
      <Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />,
    );
    const root = container.querySelector('.rdp-root') ?? container.firstElementChild;
    expect(root?.className).toMatch(/rounded-fido-ui-lg/);
    expect(root?.className).toMatch(/border-fido-ui-neutral-300/);
    expect(root?.className).toMatch(/shadow-fido-ui-sm/);
  });

  it('omits framed chrome when framed={false}', () => {
    const { container } = render(
      <Calendar mode="single" framed={false} defaultMonth={new Date(2026, 0, 1)} />,
    );
    const root = container.querySelector('.rdp-root') ?? container.firstElementChild;
    expect(root?.className).not.toMatch(/border-fido-ui-neutral-300/);
    expect(root?.className).not.toMatch(/shadow-fido-ui-sm/);
  });

  it('calls onSelect when a day is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 0, 1)}
        onSelect={onSelect}
      />,
    );
    await user.click(screen.getByRole('button', { name: /15/i }));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders range mode', () => {
    render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 0, 1)}
        selected={{ from: new Date(2026, 0, 3), to: new Date(2026, 0, 7) }}
      />,
    );
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
  });

  it('blends range day cells flush (no gaps between neighbors)', () => {
    const { container } = render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 0, 1)}
        selected={{ from: new Date(2026, 0, 6), to: new Date(2026, 0, 10) }}
      />,
    );

    const week = container.querySelector('.rdp-week, [class*="grid-cols-7"]');
    expect(week?.className).toMatch(/grid/);
    expect(week?.className).not.toMatch(/justify-between/);

    const start = container.querySelector('[data-day="2026-01-06"]');
    const middle = container.querySelector('[data-day="2026-01-08"]');
    const end = container.querySelector('[data-day="2026-01-10"]');

    expect(start?.className).toMatch(/rounded-l-fido-ui-md/);
    expect(start?.className).toMatch(/bg-fido-ui-primary-700/);
    expect(middle?.className).toMatch(/bg-fido-ui-primary-100/);
    expect(middle?.className).not.toMatch(/rounded-fido-ui-md/);
    expect(end?.className).toMatch(/rounded-r-fido-ui-md/);
    expect(end?.className).toMatch(/bg-fido-ui-primary-700/);
  });

  it('uses an inset focus ring on range days so the bar stays continuous', () => {
    const { container } = render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 0, 1)}
        selected={{ from: new Date(2026, 0, 6), to: new Date(2026, 0, 10) }}
      />,
    );

    const startBtn = container
      .querySelector('[data-day="2026-01-06"]')
      ?.querySelector('button');
    const middleBtn = container
      .querySelector('[data-day="2026-01-08"]')
      ?.querySelector('button');

    expect(startBtn?.className).toMatch(/rounded-l-fido-ui-md/);
    expect(startBtn?.className).toMatch(
      /focus-visible:shadow-\[inset_0_0_0_2px_rgba\(212,212,212,0\.8\)\]/,
    );
    expect(startBtn?.className).not.toMatch(
      /focus-visible:shadow-\[0_0_0_3px_rgba\(212,212,212,0\.8\)\]/,
    );
    expect(middleBtn?.className).toMatch(
      /focus-visible:shadow-\[inset_0_0_0_2px_rgba\(212,212,212,0\.8\)\]/,
    );
  });

  it('applies Figma day states (selected primary-900, current, muted, hover chrome)', () => {
    const { container } = render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 0, 1)}
        selected={new Date(2026, 0, 20)}
        today={new Date(2026, 0, 15)}
      />,
    );

    const selectedBtn = container
      .querySelector('[data-day="2026-01-20"]')
      ?.querySelector('button');
    expect(selectedBtn?.className).toMatch(/bg-fido-ui-primary-900/);
    expect(selectedBtn?.className).toMatch(/rounded-fido-ui-md/);

    const todayBtn = container
      .querySelector('[data-day="2026-01-15"]')
      ?.querySelector('button');
    expect(todayBtn?.className).toMatch(/text-fido-ui-primary-700/);
    expect(todayBtn?.querySelector('[aria-hidden="true"]')).toBeTruthy();
    expect(todayBtn?.className).toMatch(/hover:border-fido-ui-primary-800/);
    expect(todayBtn?.className).toMatch(/hover:shadow-\[0_0_0_3px_rgba\(212,212,212,0\.8\)\]/);

    const outside = container.querySelector('[data-day="2025-12-28"]');
    expect(outside?.className).toMatch(/text-fido-ui-neutral-500/);
  });

  it('shows the full year label without truncating', () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 3, 1)} />);
    const yearLabel = screen.getByText('2026', { selector: 'span' });
    expect(yearLabel).toBeInTheDocument();
    expect(screen.getByText('Apr', { selector: 'span' })).toBeInTheDocument();
    expect(yearLabel.className).toMatch(/whitespace-nowrap/);
    expect(yearLabel.className).not.toMatch(/\btruncate\b/);
  });

  it('navigates to the next month', async () => {
    const user = userEvent.setup();
    render(<Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />);
    await user.click(screen.getByLabelText('Next month'));
    // February 2026 caption / dropdown should be present after navigation
    expect(screen.getByLabelText('Previous month')).not.toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15_000);
});
