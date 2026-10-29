import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import * as PetsIcons from './index';
import { DogIcon } from './dog';

describe('Pets icons', () => {
  it('exports all 29 Figma glyphs', () => {
    expect(Object.keys(PetsIcons)).toHaveLength(29);
  });

  it('is decorative by default and inherits currentColor', () => {
    const { container } = render(<DogIcon data-testid="dog" />);
    const icon = screen.getByTestId('dog');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });

  it('accepts native SVG sizing and class props', () => {
    render(<DogIcon data-testid="dog" width={32} height={32} className="custom-icon" />);
    const icon = screen.getByTestId('dog');

    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(icon).toHaveClass('custom-icon');
  });

  it('uses a title as an accessible name', () => {
    render(<DogIcon title="Dog" />);
    expect(screen.getByRole('img', { name: 'Dog' })).toBeInTheDocument();
  });

  it('supports aria-label without requiring a title', () => {
    render(<DogIcon aria-label="Dog profile" />);
    expect(screen.getByRole('img', { name: 'Dog profile' })).toBeInTheDocument();
  });

  it('forwards its SVG ref', () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<DogIcon ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<DogIcon title="Dog" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
