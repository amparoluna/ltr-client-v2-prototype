import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts custom label', () => {
    render(<Spinner label="Processing" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing');
  });

  it('applies size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    const sizeClasses = { xs: 'size-3', sm: 'size-4', md: 'size-6', lg: 'size-8' };
    for (const size of sizes) {
      const { unmount } = render(<Spinner size={size} />);
      expect(screen.getByRole('status').className).toContain(sizeClasses[size]);
      unmount();
    }
  });

  it('applies color variants', () => {
    const { rerender } = render(<Spinner color="error" />);
    expect(screen.getByRole('status').className).toContain('text-fido-ui-destruct-600');

    rerender(<Spinner color="current" />);
    expect(screen.getByRole('status').className).toContain('text-current');
  });

  it('has spin animation', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').className).toContain('animate-spin');
  });

  it('merges custom className', () => {
    render(<Spinner className="ml-2" />);
    expect(screen.getByRole('status')).toHaveClass('ml-2');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
