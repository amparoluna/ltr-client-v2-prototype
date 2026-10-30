import * as React from 'react';
import { Building2 } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { IconWrapper } from './icon-wrapper';

function TestIcon() {
  return <Building2 data-testid="icon" aria-hidden="true" />;
}

describe('IconWrapper', () => {
  it('renders the default Primary / LG / Light treatment', () => {
    render(
      <IconWrapper data-testid="wrapper">
        <TestIcon />
      </IconWrapper>,
    );

    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toHaveClass('size-fido-ui-4xl');
    expect(wrapper).toHaveClass('rounded-fido-ui-md');
    expect(wrapper).toHaveClass('p-fido-ui-sm');
    expect(wrapper).toHaveClass('bg-fido-ui-primary-100');
    expect(wrapper).toHaveClass('text-fido-ui-primary-700');
    expect(screen.getByTestId('icon').parentElement).toHaveClass('size-fido-ui-sm');
    expect(screen.getByTestId('icon')).toHaveAttribute('stroke', 'currentColor');
    expect(screen.getByTestId('icon').parentElement).toHaveClass('[&>svg]:stroke-current');
  });

  it.each([
    ['primary', 'light', 'bg-fido-ui-primary-100', 'text-fido-ui-primary-700'],
    ['primary', 'dark', 'bg-fido-ui-primary-700', 'text-fido-ui-neutral-white'],
    ['secondary', 'light', 'bg-fido-ui-secondary-200', 'text-fido-ui-secondary-700'],
    ['secondary', 'dark', 'bg-fido-ui-secondary-700', 'text-fido-ui-neutral-white'],
    ['neutral', 'light', 'bg-fido-ui-neutral-100', 'text-fido-ui-neutral-500'],
    ['neutral', 'dark', 'bg-fido-ui-neutral-600', 'text-fido-ui-neutral-white'],
    ['success', 'light', 'bg-fido-ui-success-100', 'text-fido-ui-success-700'],
    ['success', 'dark', 'bg-fido-ui-success-700', 'text-fido-ui-neutral-white'],
    ['info', 'light', 'bg-fido-ui-info-100', 'text-fido-ui-info-700'],
    ['info', 'dark', 'bg-fido-ui-info-700', 'text-fido-ui-neutral-white'],
    ['warning', 'light', 'bg-fido-ui-warning-100', 'text-fido-ui-warning-700'],
    ['warning', 'dark', 'bg-fido-ui-warning-500', 'text-fido-ui-neutral-white'],
    ['destruct', 'light', 'bg-fido-ui-destruct-100', 'text-fido-ui-destruct-700'],
    ['destruct', 'dark', 'bg-fido-ui-destruct-600', 'text-fido-ui-neutral-white'],
  ] as const)('maps %s / %s to Figma color tokens', (color, shade, background, foreground) => {
    render(
      <IconWrapper color={color} shade={shade} data-testid="wrapper">
        <TestIcon />
      </IconWrapper>,
    );

    expect(screen.getByTestId('wrapper')).toHaveClass(background);
    expect(screen.getByTestId('wrapper')).toHaveClass(foreground);
  });

  it.each([
    ['lg', 'size-fido-ui-4xl', 'rounded-fido-ui-md', 'p-fido-ui-sm', 'size-fido-ui-sm'],
    ['md', 'size-fido-ui-md', 'rounded-fido-ui-sm', 'p-fido-ui-xs', 'size-fido-ui-xs'],
    ['sm', 'size-fido-ui-sm', 'rounded-fido-ui-xs', 'p-fido-ui-2xs', 'size-fido-ui-2xs'],
  ] as const)(
    'maps %s to the Figma wrapper and icon dimensions',
    (size, wrapperSize, radius, padding, iconSize) => {
      render(
        <IconWrapper size={size} data-testid="wrapper">
          <TestIcon />
        </IconWrapper>,
      );

      const wrapper = screen.getByTestId('wrapper');
      expect(wrapper).toHaveClass(wrapperSize);
      expect(wrapper).toHaveClass(radius);
      expect(wrapper).toHaveClass(padding);
      expect(screen.getByTestId('icon').parentElement).toHaveClass(iconSize);
    },
  );

  it('merges className and forwards the root ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <IconWrapper ref={ref} className="mt-4" data-testid="wrapper">
        <TestIcon />
      </IconWrapper>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(screen.getByTestId('wrapper')).toHaveClass('mt-4');
  });

  it('has no accessibility violations with decorative icon content', async () => {
    const { container } = render(
      <IconWrapper>
        <TestIcon />
      </IconWrapper>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
