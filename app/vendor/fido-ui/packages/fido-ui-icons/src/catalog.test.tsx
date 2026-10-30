import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChevronLeftIcon } from './arrows/chevron-left';
import { iconCategories, iconCount } from './catalog';
import { DogIcon } from './index';
import { VisaIcon } from './payment-methods/visa';

describe('icon catalog', () => {
  it('exports Pets icons from the package root', () => {
    expect(DogIcon).toBeDefined();
  });

  it('contains every Figma icon in every category', () => {
    const exportedIconCount = iconCategories.reduce(
      (total, category) => total + Object.keys(category.icons).length,
      0,
    );

    expect(iconCategories).toHaveLength(21);
    expect(iconCount).toBe(515);
    expect(exportedIconCount).toBe(iconCount);
  });

  it('converts monochrome icons to currentColor', () => {
    const { container } = render(<ChevronLeftIcon />);
    expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });

  it('preserves payment brand colors and viewBox', () => {
    const { container } = render(<VisaIcon data-testid="visa" />);
    const icon = container.querySelector('[data-testid="visa"]');

    expect(icon).toHaveAttribute('viewBox', '0 0 35 24');
    expect(container.querySelector('[fill="#172B85"]')).toBeInTheDocument();
  });
});
