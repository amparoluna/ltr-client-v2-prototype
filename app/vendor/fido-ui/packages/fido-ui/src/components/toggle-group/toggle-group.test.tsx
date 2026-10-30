import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

describe('ToggleGroup', () => {
  it('renders toggle items', () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('toggles item on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ToggleGroup onValueChange={onChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    await user.click(screen.getByText('A'));
    expect(onChange.mock.calls[0][0]).toContain('a');
  });

  it('respects defaultValue', () => {
    render(
      <ToggleGroup defaultValue={['b']}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText('B')).toHaveAttribute('data-pressed', '');
  });

  it('supports disabled state', () => {
    render(
      <ToggleGroup disabled>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText('A')).toBeDisabled();
  });

  it('merges custom className', () => {
    const { container } = render(
      <ToggleGroup className="mt-4">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
