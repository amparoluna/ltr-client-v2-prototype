import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { HelperText } from './helper-text';

const types = ['default', 'inform', 'error', 'success', 'warn', 'loading'] as const;

describe('HelperText', () => {
  it('renders with children', () => {
    render(<HelperText>Label</HelperText>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies default type classes', () => {
    render(<HelperText>Default</HelperText>);
    const label = screen.getByText('Default');
    const root = label.parentElement!;
    expect(root.className).toContain('text-fido-ui-neutral-700');
    expect(root.className).toContain('gap-fido-ui-xs');
    expect(root.className).toContain('items-start');
    expect(label.className).toContain('break-words');
  });

  it('keeps label typography alongside the label color', () => {
    render(<HelperText type="inform">Inform</HelperText>);
    const label = screen.getByText('Inform');
    expect(label.className).toContain('text-fido-ui-p3');
    expect(label.className).toContain('leading-fido-ui-normal');
    expect(label.className).toContain('font-fido-ui-paragraph');
    expect(label.className).toContain('text-fido-ui-info-700');
  });

  it('applies type color classes', () => {
    const { rerender } = render(<HelperText type="inform">Inform</HelperText>);
    expect(screen.getByText('Inform').parentElement!.className).toContain('text-fido-ui-info-600');
    expect(screen.getByText('Inform').className).toContain('text-fido-ui-info-700');

    rerender(<HelperText type="error">Error</HelperText>);
    expect(screen.getByText('Error').parentElement!.className).toContain('text-fido-ui-destruct-600');
    expect(screen.getByText('Error').className).toContain('text-fido-ui-destruct-600');

    rerender(<HelperText type="success">Success</HelperText>);
    expect(screen.getByText('Success').parentElement!.className).toContain(
      'text-fido-ui-success-600',
    );
    expect(screen.getByText('Success').className).toContain('text-fido-ui-success-700');

    rerender(<HelperText type="warn">Warn</HelperText>);
    expect(screen.getByText('Warn').parentElement!.className).toContain('text-fido-ui-warning-500');
    expect(screen.getByText('Warn').className).toContain('text-fido-ui-warning-700');

    rerender(<HelperText type="loading">Loading</HelperText>);
    expect(screen.getByText('Loading').parentElement!.className).toContain(
      'text-fido-ui-neutral-700',
    );
  });

  it('renders a leading icon by default', () => {
    const { container } = render(<HelperText>WithIcon</HelperText>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('hides the leading icon when leftIcon is false', () => {
    const { container } = render(<HelperText leftIcon={false}>NoIcon</HelperText>);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders all type variants', () => {
    for (const type of types) {
      const { unmount } = render(<HelperText type={type}>{type}</HelperText>);
      expect(screen.getByText(type)).toBeInTheDocument();
      unmount();
    }
  });

  it('merges custom className', () => {
    render(<HelperText className="ml-2">Custom</HelperText>);
    expect(screen.getByText('Custom').parentElement!.className).toContain('ml-2');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<HelperText ref={ref}>Ref</HelperText>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders as a span element', () => {
    render(<HelperText>Tag</HelperText>);
    expect(screen.getByText('Tag').parentElement!.tagName).toBe('SPAN');
  });

  it('marks the leading icon as decorative', () => {
    const { container } = render(<HelperText type="success">Ok</HelperText>);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('reuses the decorative Spinner for the loading type', () => {
    const { container } = render(<HelperText type="loading">Loading</HelperText>);
    const spinner = container.querySelector('[role="status"]');

    expect(spinner).toBeInTheDocument();
    expect(spinner?.parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(spinner?.className).toContain('text-current');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        {types.map((type) => (
          <HelperText key={type} type={type}>
            {type}
          </HelperText>
        ))}
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
