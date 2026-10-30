import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Progress } from './progress';

describe('Progress', () => {
  it('renders a progressbar', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets correct aria values', () => {
    render(<Progress value={75} min={0} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '75');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('merges custom className', () => {
    render(<Progress value={50} className="mt-4" />);
    expect(screen.getByRole('progressbar')).toHaveClass('mt-4');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Progress value={50} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
