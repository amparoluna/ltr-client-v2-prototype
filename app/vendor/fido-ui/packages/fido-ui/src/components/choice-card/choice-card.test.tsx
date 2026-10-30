import * as React from 'react';
import { HomeIcon } from '@petscreeninginc/fido-ui-icons';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ChoiceCard, ChoiceCardGroup } from './choice-card';

describe('ChoiceCard', () => {
  it('renders a radio choice with the Figma-aligned default content', () => {
    const { container } = render(
      <ChoiceCardGroup selectionMode="single">
        <ChoiceCard value="building" title="Title" description="Description" />
      </ChoiceCardGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Recommended')).toBeInTheDocument();
    const iconWrapper = container.querySelector('[data-slot="icon-wrapper"]');
    expect(iconWrapper).toHaveClass('size-fido-ui-4xl', 'bg-fido-ui-primary-100');
    expect(iconWrapper?.querySelector('[data-slot="icon"] svg path')).toHaveAttribute(
      'fill',
      'currentColor',
    );
  });

  it('selects one radio value from the card surface', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(
      <ChoiceCardGroup selectionMode="single" onValueChange={onValueChange}>
        <ChoiceCard value="professional" title="Professional plan" />
        <ChoiceCard value="enterprise" title="Enterprise plan" />
      </ChoiceCardGroup>,
    );

    const cards = container.querySelectorAll('[data-slot="choice-card"]');
    await user.click(cards[0].querySelector('[data-slot="selection-label"]')!);
    await user.click(cards[1].querySelector('[data-slot="selection-label"]')!);

    expect(onValueChange).toHaveBeenNthCalledWith(1, 'professional');
    expect(onValueChange).toHaveBeenNthCalledWith(2, 'enterprise');
    expect(screen.getByRole('radio', { name: 'Professional plan' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Enterprise plan' })).toBeChecked();
  });

  it('supports radio-group arrow-key navigation', async () => {
    const user = userEvent.setup();
    render(
      <ChoiceCardGroup selectionMode="single" defaultValue="professional">
        <ChoiceCard value="professional" title="Professional plan" />
        <ChoiceCard value="enterprise" title="Enterprise plan" />
      </ChoiceCardGroup>,
    );

    await user.tab();
    expect(screen.getByRole('radio', { name: 'Professional plan' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Enterprise plan' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Enterprise plan' })).toHaveFocus();
  });

  it('renders and updates multiple checkbox values', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ChoiceCardGroup
        selectionMode="multiple"
        defaultValue={['screening']}
        onValueChange={onValueChange}
      >
        <ChoiceCard value="screening" title="Pet screening" />
        <ChoiceCard value="insurance" title="Pet insurance" />
      </ChoiceCardGroup>,
    );

    expect(screen.getByRole('checkbox', { name: 'Pet screening' })).toBeChecked();
    await user.click(screen.getByRole('checkbox', { name: 'Pet insurance' }));
    expect(onValueChange).toHaveBeenCalledWith(['screening', 'insurance']);
    expect(screen.getByRole('checkbox', { name: 'Pet insurance' })).toBeChecked();
  });

  it('applies selected card styling for either selection mode', () => {
    const { container } = render(
      <ChoiceCardGroup selectionMode="single" defaultValue="selected">
        <ChoiceCard value="selected" title="Selected option" />
      </ChoiceCardGroup>,
    );
    const card = container.querySelector('[data-slot="choice-card"]');

    expect(card?.className).toContain('has-[[data-checked]]:outline-fido-ui-primary-700');
    expect(card?.className).toContain('has-[[data-checked]]:bg-fido-ui-primary-50');
    expect(screen.getByRole('radio', { name: 'Selected option' })).toHaveAttribute(
      'data-checked',
      '',
    );
  });

  it('renders an action card without a selection control or surface', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const { container } = render(
      <ChoiceCard
        title="Option with action"
        action={
          <button type="button" onClick={onAction}>
            Details
          </button>
        }
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Details' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    expect(container.querySelector('[data-slot="selection-label"]')).not.toBeInTheDocument();
  });

  it('supports custom and hidden composition slots', () => {
    const { container } = render(
      <ChoiceCardGroup selectionMode="multiple">
        <ChoiceCard
          value="custom"
          title="Custom option"
          icon={<HomeIcon data-testid="custom-icon" aria-hidden="true" />}
          badge={<span data-testid="custom-badge">New</span>}
        >
          <span data-testid="custom-content">More information</span>
        </ChoiceCard>
        <ChoiceCard value="minimal" title="Minimal option" icon={false} badge={false} />
      </ChoiceCardGroup>,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="icon-wrapper"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-slot="badge"]')).toHaveLength(1);
  });

  it('combines group-level and item-level disabled state', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ChoiceCardGroup selectionMode="multiple" disabled onValueChange={onValueChange}>
        <ChoiceCard value="unavailable" title="Unavailable option" />
      </ChoiceCardGroup>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Unavailable option' }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox', { name: 'Unavailable option' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('keeps read-only groups focusable without changing selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ChoiceCardGroup
        selectionMode="single"
        defaultValue="professional"
        readOnly
        onValueChange={onValueChange}
      >
        <ChoiceCard value="professional" title="Professional plan" />
        <ChoiceCard value="enterprise" title="Enterprise plan" />
      </ChoiceCardGroup>,
    );

    await user.tab();
    expect(screen.getByRole('radio', { name: 'Professional plan' })).toHaveFocus();
    await user.click(screen.getByRole('radio', { name: 'Enterprise plan' }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: 'Professional plan' })).toBeChecked();
  });

  it('submits single and multiple values with their group names', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <ChoiceCardGroup selectionMode="single" name="plan" defaultValue="professional" required>
          <ChoiceCard value="professional" title="Professional plan" />
        </ChoiceCardGroup>
        <ChoiceCardGroup
          selectionMode="multiple"
          name="services"
          defaultValue={['screening', 'insurance']}
        >
          <ChoiceCard value="screening" title="Pet screening" />
          <ChoiceCard value="insurance" title="Pet insurance" />
        </ChoiceCardGroup>
        <button type="submit">Submit</button>
      </form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    const form = screen.getByRole('button', { name: 'Submit' }).closest('form')!;
    const formData = new FormData(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(formData.get('plan')).toBe('professional');
    expect(formData.getAll('services')).toEqual(['screening', 'insurance']);
  });

  it('forwards refs and merges class names', () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const cardRef = React.createRef<HTMLDivElement>();
    render(
      <ChoiceCardGroup ref={groupRef} selectionMode="single" className="max-w-lg">
        <ChoiceCard ref={cardRef} value="ref" title="Ref option" className="mt-4" />
      </ChoiceCardGroup>,
    );

    expect(groupRef.current).toHaveClass('max-w-lg');
    expect(cardRef.current).toHaveClass('mt-4');
  });

  it('rejects selectable cards outside a group', () => {
    expect(() => render(<ChoiceCard value="orphan" title="Orphan option" />)).toThrow(
      'Selectable ChoiceCard components must be rendered inside ChoiceCardGroup.',
    );
  });

  it('has no accessibility violations in single mode', async () => {
    const { container } = render(
      <ChoiceCardGroup selectionMode="single" label="Plan" defaultValue="professional">
        <ChoiceCard
          value="professional"
          title="Professional plan"
          description="For growing property teams"
        />
      </ChoiceCardGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations in multiple mode', async () => {
    const { container } = render(
      <ChoiceCardGroup selectionMode="multiple" label="Services">
        <ChoiceCard value="screening" title="Pet screening" />
        <ChoiceCard value="insurance" title="Pet insurance" />
      </ChoiceCardGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations for an action card', async () => {
    const { container } = render(
      <ChoiceCard title="Professional plan" action={<button type="button">Details</button>}>
        <a href="#terms">View terms</a>
      </ChoiceCard>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
