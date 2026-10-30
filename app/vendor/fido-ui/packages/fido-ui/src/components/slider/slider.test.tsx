import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders a slider', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(<Slider defaultValue={30} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders range slider with two thumbs', () => {
    render(<Slider defaultValue={[20, 80]} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });

  it('applies disabled styling', () => {
    const { container } = render(<Slider disabled />);
    // Disabled class is on the outer wrapper
    expect(container.querySelector('.opacity-50')).toBeTruthy();
  });

  it('merges custom className', () => {
    const { container } = render(<Slider className="mt-8" />);
    expect(container.firstChild).toHaveClass('mt-8');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Slider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders error message', () => {
    render(<Slider error="Required field" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Slider label="Volume" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
