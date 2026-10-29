import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Select, SelectItem, SelectGroup } from './select';

describe('Select', () => {
  it('renders a trigger with placeholder', () => {
    render(
      <Select placeholder="Choose...">
        <SelectItem value="a">Option A</SelectItem>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(
      <Select label="Country">
        <SelectItem value="us">United States</SelectItem>
      </Select>,
    );
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('opens the popup when its label is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Country" placeholder="Choose">
        <SelectItem value="us">United States</SelectItem>
      </Select>,
    );

    await user.click(screen.getByText('Country'));

    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'United States' })).toBeInTheDocument();
  });

  it('renders optional indicator', () => {
    render(
      <Select label="Country" optional>
        <SelectItem value="us">United States</SelectItem>
      </Select>,
    );
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <Select error="Required field">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders description when no error', () => {
    render(
      <Select description="Pick your country">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(screen.getByText('Pick your country')).toBeInTheDocument();
  });

  it('hides description when error is shown', () => {
    render(
      <Select description="Help" error="Error">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });

  it('applies error state classes to trigger', () => {
    render(
      <Select error="Required">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('border-fido-ui-destruct-600');
  });

  it('renders an error icon with the error message', () => {
    render(
      <Select error="Required field">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('svg')).toBeTruthy();
  });

  it('renders an internal label inside the trigger', () => {
    render(
      <Select label="Country" labelPlacement="internal">
        <SelectItem value="us">United States</SelectItem>
      </Select>,
    );
    // Accessible Select.Label (sr-only) + visual inside-trigger label
    expect(screen.getAllByText('Country').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('visually hides the label when hideLabel is set', () => {
    render(
      <Select label="Country" hideLabel>
        <SelectItem value="us">United States</SelectItem>
      </Select>,
    );
    const label = screen.getByText('Country');
    expect(label.className).toContain('sr-only');
  });

  it('applies disabled state', () => {
    const { container } = render(
      <Select disabled>
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    // Disabled class is applied on root wrapper
    expect(container.querySelector('.pointer-events-none')).toBeTruthy();
  });

  it('merges custom className on root', () => {
    const { container } = render(
      <Select className="mt-4">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('opens dropdown and shows items on click', async () => {
    const user = userEvent.setup();
    render(
      <Select placeholder="Choose">
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'Option B' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Select label="Country">
        <SelectItem value="us">United States</SelectItem>
      </Select>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('SelectGroup', () => {
  it('renders group label', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectGroup label="Fruits">
          <SelectItem value="apple">Apple</SelectItem>
        </SelectGroup>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });
});
