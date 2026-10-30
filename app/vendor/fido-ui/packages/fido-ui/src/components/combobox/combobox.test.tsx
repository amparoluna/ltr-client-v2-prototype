import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Combobox, ComboboxItem } from './combobox';

describe('Combobox', () => {
  it('renders with a search input', () => {
    render(
      <Combobox placeholder="Search...">
        <ComboboxItem value="a">Option A</ComboboxItem>
      </Combobox>,
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(
      <Combobox label="Country">
        <ComboboxItem value="us">United States</ComboboxItem>
      </Combobox>,
    );
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('focuses the input and opens the popup when its label is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Combobox label="Country" placeholder="Search...">
        <ComboboxItem value="us">United States</ComboboxItem>
      </Combobox>,
    );

    await user.click(screen.getByText('Country'));

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'United States' })).toBeInTheDocument();
  });

  it('sets the popup min-width to the trigger width', async () => {
    const user = userEvent.setup();
    render(
      <Combobox label="Country">
        <ComboboxItem value="us">US</ComboboxItem>
      </Combobox>,
    );

    await user.click(screen.getByText('Country'));

    const listbox = await screen.findByRole('listbox');
    expect(listbox.parentElement).toHaveClass('min-w-[var(--anchor-width)]');
  });

  it('renders error message', () => {
    render(
      <Combobox error="Required">
        <ComboboxItem value="a">A</ComboboxItem>
      </Combobox>,
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <Combobox description="Pick one">
        <ComboboxItem value="a">A</ComboboxItem>
      </Combobox>,
    );
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <Combobox className="mt-4">
        <ComboboxItem value="a">A</ComboboxItem>
      </Combobox>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Combobox label="Country">
        <ComboboxItem value="us">United States</ComboboxItem>
      </Combobox>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Combobox value → label resolution', () => {
  const breedNames: Record<string, string> = { '66': 'Golden Retriever', '77': 'Poodle' };

  function IdValuedCombobox({
    itemToStringLabel,
  }: {
    itemToStringLabel?: (value: string) => string;
  }) {
    return (
      <Combobox label="Breed" itemToStringLabel={itemToStringLabel}>
        <ComboboxItem value="66">Golden Retriever</ComboboxItem>
        <ComboboxItem value="77">Poodle</ComboboxItem>
      </Combobox>
    );
  }

  it('shows the raw value when no resolver is supplied', async () => {
    const user = userEvent.setup();
    render(<IdValuedCombobox />);

    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'Golden Retriever' }));

    expect(screen.getByRole('combobox')).toHaveValue('66');
  });

  it('shows the resolved label in the input after selection', async () => {
    const user = userEvent.setup();
    render(<IdValuedCombobox itemToStringLabel={(id) => breedNames[id]} />);

    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'Golden Retriever' }));

    expect(screen.getByRole('combobox')).toHaveValue('Golden Retriever');
  });

  it('filters on the label while values are ids', async () => {
    const user = userEvent.setup();
    render(<IdValuedCombobox itemToStringLabel={(id) => breedNames[id]} />);

    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('combobox'), 'poo');

    expect(await screen.findByRole('option', { name: 'Poodle' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Golden Retriever' })).not.toBeInTheDocument();
  });

  it('filters via the resolver when item children are not plain text', async () => {
    const user = userEvent.setup();
    render(
      <Combobox label="Breed" itemToStringLabel={(id: string) => breedNames[id]}>
        <ComboboxItem value="66">
          <span>Golden Retriever</span>
        </ComboboxItem>
        <ComboboxItem value="77">
          <span>Poodle</span>
        </ComboboxItem>
      </Combobox>,
    );

    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('combobox'), 'golden');

    expect(await screen.findByRole('option', { name: 'Golden Retriever' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Poodle' })).not.toBeInTheDocument();
  });

  it('matches object values through isItemEqualToValue', async () => {
    interface Breed {
      id: string;
      name: string;
    }
    const golden: Breed = { id: '66', name: 'Golden Retriever' };
    const poodle: Breed = { id: '77', name: 'Poodle' };

    const user = userEvent.setup();
    render(
      <Combobox<Breed>
        label="Breed"
        // Structurally equal but not referentially equal to the item value.
        value={{ id: '66', name: 'Golden Retriever' }}
        itemToStringLabel={(breed) => breed.name}
        isItemEqualToValue={(itemValue, value) => itemValue.id === value.id}
      >
        <ComboboxItem<Breed> value={golden}>{golden.name}</ComboboxItem>
        <ComboboxItem<Breed> value={poodle}>{poodle.name}</ComboboxItem>
      </Combobox>,
    );

    expect(screen.getByRole('combobox')).toHaveValue('Golden Retriever');

    await user.click(screen.getByRole('combobox'));
    const selected = await screen.findByRole('option', { name: 'Golden Retriever' });
    expect(selected).toHaveAttribute('data-selected');
  });

  it('falls back to the resolver for tag labels, with tagLabels still winning', async () => {
    render(
      <Combobox
        label="Breeds"
        multiple
        value={['66', '77']}
        itemToStringLabel={(id: string) => breedNames[id]}
        tagLabels={{ '77': 'Standard Poodle' }}
      >
        <ComboboxItem value="66">Golden Retriever</ComboboxItem>
        <ComboboxItem value="77">Poodle</ComboboxItem>
      </Combobox>,
    );

    expect(screen.getByText('Golden Retriever')).toBeInTheDocument();
    expect(screen.getByText('Standard Poodle')).toBeInTheDocument();
  });
});
