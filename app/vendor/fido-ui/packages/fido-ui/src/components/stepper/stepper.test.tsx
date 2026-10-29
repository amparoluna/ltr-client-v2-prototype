import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Stepper, Step } from './stepper';

describe('Stepper', () => {
  const steps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
    { label: 'Step 4' },
  ];

  it('renders all steps', () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
  });

  it('marks active step with aria-current', () => {
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.getByText('2')).toHaveAttribute('aria-current', 'step');
  });

  it('shows check icon for completed steps', () => {
    const { container } = render(<Stepper steps={steps} activeStep={2} />);
    // Steps 0 and 1 should be completed (show check icon SVGs)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });

  it('shows numbers for upcoming steps', () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders connectors between steps', () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} />);
    // Each step has left + right connectors = 4 steps × 2 = 8
    const connectors = container.querySelectorAll('[aria-hidden="true"]');
    expect(connectors.length).toBe(8);
  });

  it('has progress aria-label', () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Progress');
  });

  it('renders all completed when activeStep >= steps.length', () => {
    const { container } = render(<Stepper steps={steps} activeStep={4} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);
  });

  it('merges custom className', () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} className="mt-8" />);
    expect(container.firstChild).toHaveClass('mt-8');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Step', () => {
  it('renders active step', () => {
    render(<Step stepNumber={1} status="active" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders completed step with check', () => {
    const { container } = render(<Step stepNumber={1} label="Done" status="completed" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Step stepNumber={1} status="upcoming" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
