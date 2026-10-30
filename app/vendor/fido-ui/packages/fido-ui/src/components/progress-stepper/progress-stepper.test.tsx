import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { ProgressStepper } from './progress-stepper';

describe('ProgressStepper', () => {
  it('renders one progressbar per step', () => {
    render(<ProgressStepper currentStep={1} totalSteps={4} progress={40} />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(4);
  });

  it('sets correct aria values on each segment', () => {
    render(<ProgressStepper currentStep={2} totalSteps={4} progress={25} />);
    const bars = screen.getAllByRole('progressbar');

    expect(bars[0]).toHaveAttribute('aria-valuenow', '100');
    expect(bars[1]).toHaveAttribute('aria-valuenow', '25');
    expect(bars[2]).toHaveAttribute('aria-valuenow', '0');
    expect(bars[3]).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows the step count', () => {
    render(<ProgressStepper currentStep={1} totalSteps={4} title="Title:" description="Description" />);
    expect(screen.getByText('1/4')).toBeInTheDocument();
  });

  it('right-aligns the step count when title and description are absent', () => {
    render(<ProgressStepper currentStep={1} totalSteps={4} />);
    expect(screen.getByText('1/4').parentElement).toHaveClass('justify-end');
  });

  it('hides the step count when showCount is false', () => {
    render(
      <ProgressStepper
        currentStep={1}
        totalSteps={4}
        title="Title:"
        description="Description"
        showCount={false}
      />,
    );
    expect(screen.queryByText('1/4')).not.toBeInTheDocument();
  });

  it('renders title and description', () => {
    render(<ProgressStepper currentStep={1} totalSteps={4} title="Title:" description="Description" />);
    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<ProgressStepper currentStep={1} totalSteps={4} className="mt-4" />);
    expect(screen.getByRole('group')).toHaveClass('mt-4');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressStepper ref={ref} currentStep={1} totalSteps={4} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ProgressStepper currentStep={1} totalSteps={4} progress={40} title="Title:" description="Description" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
