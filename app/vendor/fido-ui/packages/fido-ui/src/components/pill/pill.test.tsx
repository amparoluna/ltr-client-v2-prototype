import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Plus } from 'lucide-react';
import { Pill } from './pill';

describe('Pill', () => {
  it('renders with children', () => {
    render(<Pill>Tag</Pill>);
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('applies default variant (primary)', () => {
    render(<Pill>Default</Pill>);
    const el = screen.getByText('Default');
    expect(el.className).toContain('bg-fido-ui-primary-800');
    expect(el.className).toContain('text-fido-ui-neutral-white');
  });

  it('applies light variant', () => {
    render(<Pill variant="light">Light</Pill>);
    const el = screen.getByText('Light');
    expect(el.className).toContain('bg-fido-ui-neutral-100');
    expect(el.className).toContain('text-fido-ui-primary-700');
  });

  it('applies outline variant', () => {
    render(<Pill variant="outline">Outline</Pill>);
    const el = screen.getByText('Outline');
    expect(el.className).toContain('border');
    expect(el.className).toContain('bg-fido-ui-neutral-50');
  });

  it('applies neutral variant', () => {
    render(<Pill variant="neutral">Neutral</Pill>);
    const el = screen.getByText('Neutral');
    expect(el.className).toContain('bg-fido-ui-neutral-100');
    expect(el.className).toContain('text-fido-ui-neutral-900');
  });

  it('renders a left icon', () => {
    const { container } = render(<Pill leftIcon={Plus}>Tag</Pill>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a dismiss button when onDismiss is provided', () => {
    render(<Pill onDismiss={() => {}}>Tag</Pill>);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('has fully rounded corners', () => {
    render(<Pill>Round</Pill>);
    expect(screen.getByText('Round').className).toContain('rounded-fido-ui-full');
  });

  it('merges custom className', () => {
    render(<Pill className="ml-4">Custom</Pill>);
    expect(screen.getByText('Custom').className).toContain('ml-4');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Pill ref={ref}>Ref</Pill>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Pill>Test</Pill>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
