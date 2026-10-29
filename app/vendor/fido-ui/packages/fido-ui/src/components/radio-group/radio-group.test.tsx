import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { RadioGroup, RadioItem } from './radio-group';

describe('RadioGroup', () => {
  it('renders radio items', () => {
    render(
      <RadioGroup>
        <RadioItem value="a" label="Option A" />
        <RadioItem value="b" label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('renders with a group label', () => {
    render(
      <RadioGroup label="Choose one">
        <RadioItem value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toHaveAccessibleName('Choose one');
  });

  it('renders description', () => {
    render(
      <RadioGroup description="Pick your favorite">
        <RadioItem value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByText('Pick your favorite')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription('Pick your favorite');
  });

  it('renders error and hides description', () => {
    render(
      <RadioGroup description="Help" error="Selection required">
        <RadioItem value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByText('Selection required')).toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription('Selection required');
  });

  it('selects a radio on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup onValueChange={onChange}>
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>,
    );
    await user.click(screen.getByText('A'));
    expect(onChange.mock.calls[0][0]).toBe('a');
  });

  it('respects defaultValue', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioItem value="a" label="A" />
        <RadioItem value="b" label="B" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('data-checked', '');
  });

  it('merges custom className', () => {
    const { container } = render(
      <RadioGroup className="mt-4">
        <RadioItem value="a" label="A" />
      </RadioGroup>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RadioGroup label="Choose one">
        <RadioItem value="a" label="Option A" />
        <RadioItem value="b" label="Option B" />
      </RadioGroup>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('RadioItem', () => {
  it('renders without a label', () => {
    render(
      <RadioGroup>
        <RadioItem value="a" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders a description', () => {
    render(
      <RadioGroup>
        <RadioItem value="a" label="Plan" description="Best for small teams" />
      </RadioGroup>,
    );
    expect(screen.getByText('Best for small teams')).toBeInTheDocument();
  });

  it('keeps semantic typography and color classes together', () => {
    render(
      <RadioGroup>
        <RadioItem value="a" label="Plan" description="Best for small teams" />
      </RadioGroup>,
    );

    expect(screen.getByText('Plan')).toHaveClass('text-fido-ui-h5', 'text-fido-ui-neutral-950');
    expect(screen.getByText('Best for small teams')).toHaveClass('text-fido-ui-p2', 'text-fido-ui-neutral-500');
  });

  it('renders with container variant', () => {
    render(
      <RadioGroup>
        <RadioItem value="a" label="Contained" container />
      </RadioGroup>,
    );
    const label = screen.getByText('Contained').closest('label');
    expect(label?.className).toContain('border');
    expect(label?.className).toContain('rounded');
    expect(label).toHaveClass('gap-fido-ui-lg', 'px-fido-ui-base', 'py-fido-ui-lg');
  });

  it('matches the Figma control geometry and selected colors', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioItem value="a" label="Selected" />
      </RadioGroup>,
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveClass('size-fido-ui-2xs', 'border-fido-ui-neutral-500');
    expect(radio).not.toHaveClass('data-[checked]:border-fido-ui-primary-600');
    expect(radio.querySelector('[data-checked]')).toHaveClass('bg-fido-ui-primary-700');
  });

  it('applies the disabled visual state inherited from the group', () => {
    render(
      <RadioGroup disabled>
        <RadioItem value="a" label="Unavailable" description="Not selectable" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio')).toHaveClass('border-fido-ui-neutral-300');
    expect(screen.getByText('Unavailable')).toHaveClass('!text-fido-ui-neutral-400');
    expect(screen.getByText('Not selectable')).toHaveClass('!text-fido-ui-neutral-400');
  });

  it('applies the error border to an unchecked container', () => {
    render(
      <RadioGroup>
        <RadioItem value="a" label="Invalid option" container state="error" />
      </RadioGroup>,
    );
    const label = screen.getByText('Invalid option').closest('label');
    expect(label).toHaveClass('border-fido-ui-destruct-600');
  });

  it('keeps the error border on a checked container', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioItem value="a" label="Selected invalid option" container state="error" />
      </RadioGroup>,
    );
    const label = screen.getByText('Selected invalid option').closest('label');
    expect(label).toHaveClass('has-[[data-checked]]:border-fido-ui-destruct-600');
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <RadioGroup>
        <RadioItem ref={ref} value="a" />
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
