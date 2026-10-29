import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders a switch', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders a description as an accessible description', () => {
    render(<Switch label="Notifications" description="Receive account updates." />);
    const sw = screen.getByRole('switch', { name: 'Notifications' });
    expect(sw).toHaveAccessibleDescription('Receive account updates.');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  it('respects controlled checked prop', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-checked', '');
  });

  it('respects defaultChecked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-checked', '');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch disabled />);
    const sw = screen.getByRole('switch');
    // Base UI Switch uses aria-disabled and data-disabled instead of the disabled attribute
    expect(sw).toHaveAttribute('aria-disabled', 'true');
    expect(sw).toHaveAttribute('data-disabled', '');
  });

  it('treats disabled status as disabled behavior', () => {
    render(<Switch status="disabled" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch disabled onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies error status classes and marks the switch invalid', () => {
    render(<Switch status="error" />);
    const sw = screen.getByRole('switch');
    expect(sw.className).toContain('destruct');
    expect(sw).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps field copy neutral in the error state', () => {
    render(<Switch label="Notifications" description="Receive account updates." status="error" />);
    expect(screen.getByText('Notifications').className).not.toContain('destruct');
    expect(screen.getByText('Receive account updates.').className).toContain('neutral-500');
  });

  it('renders the bordered container treatment and label at the start', () => {
    render(
      <Switch
        container
        labelPlacement="start"
        label="Notifications"
        description="Receive account updates."
      />,
    );
    const sw = screen.getByRole('switch');
    const field = sw.closest('label');
    expect(field?.className).toContain('border-fido-ui-neutral-200');
    expect(field?.className).toContain('flex-row-reverse');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} />);
    // Base UI Switch renders as a span, ref still attaches
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges custom className', () => {
    render(<Switch className="ml-4" />);
    expect(screen.getByRole('switch').className).toContain('ml-4');
  });

  it('associates the label as the accessible name', () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Switch label="Notifications" description="Receive account updates." container />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
