import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox onCheckedChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  it('respects controlled checked prop', () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-checked', '');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox disabled />);
    const cb = screen.getByRole('checkbox');
    // Base UI Checkbox uses aria-disabled and data-disabled
    expect(cb).toHaveAttribute('aria-disabled', 'true');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges custom className', () => {
    render(<Checkbox label="Test" className="ml-4" />);
    const label = screen.getByText('Test').parentElement;
    expect(label?.className).toContain('ml-4');
  });

  it('renders error message', () => {
    render(<Checkbox error="Required field" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });

  it('renders in a bordered container', () => {
    render(<Checkbox label="Label" container />);
    const wrapper = screen.getByText('Label').parentElement;
    expect(wrapper?.className).toContain('rounded-fido-ui-sm');
    expect(wrapper?.className).toContain('border-fido-ui-neutral-300');
  });

  it('applies explicit error state styling without requiring error text', () => {
    render(<Checkbox label="Label" state="error" />);
    const label = screen.getByText('Label');
    expect(label.className).toContain('text-fido-ui-destruct-600');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in the container variant', async () => {
    const { container } = render(<Checkbox label="Accept terms" container />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
