import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { ButtonGroup } from './button-group';

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      <ButtonGroup>
        <button>Left</button>
        <button>Center</button>
        <button>Right</button>
      </ButtonGroup>,
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('has role="group"', () => {
    render(
      <ButtonGroup>
        <button>Action</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('forwards native div attributes', () => {
    render(
      <ButtonGroup aria-labelledby="actions-label" data-testid="actions">
        <button>Action</button>
      </ButtonGroup>,
    );

    expect(screen.getByTestId('actions')).toHaveAttribute('aria-labelledby', 'actions-label');
  });

  it('applies the connected Figma geometry', () => {
    render(
      <ButtonGroup>
        <button>Left</button>
        <button>Right</button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.className).toContain('rounded-fido-ui-md');
    expect(group.className).toContain('outline-fido-ui-neutral-500');
    expect(group.className).toContain('[&>*]:rounded-none');
    expect(group.className).toContain('[&>*]:outline-none');
    expect(group.className).toContain('[&>*+*]:border-l');
  });

  it('merges custom className', () => {
    render(
      <ButtonGroup className="mt-4">
        <button>Action</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group').className).toContain('mt-4');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref}>
        <button>Action</button>
      </ButtonGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ButtonGroup aria-label="Actions">
        <button>Left</button>
        <button>Right</button>
      </ButtonGroup>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
