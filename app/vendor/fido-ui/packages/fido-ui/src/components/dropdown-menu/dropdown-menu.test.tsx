import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from './dropdown-menu';

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  const trigger = screen.getByRole('button', { name: 'Options' });
  await user.click(trigger);
  // Wait for the menu to open
  await waitFor(() => {
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
};

describe('DropdownMenu', () => {
  it('renders the trigger button', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenu>,
    );
    expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument();
  });

  it('opens on click and renders menu items', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenu>,
    );

    await openMenu(user);
    expect(await screen.findByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls onSelect when an item is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
      </DropdownMenu>,
    );

    await openMenu(user);
    await user.click(await screen.findByRole('menuitem', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('applies destructive styling', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenu>,
    );

    await openMenu(user);
    const item = await screen.findByRole('menuitem', { name: 'Delete' });
    expect(item.className).toMatch(/destruct/);
  });

  it('renders a separator', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenu>,
    );

    await openMenu(user);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('disables an item', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem disabled onSelect={onSelect}>
          Disabled Item
        </DropdownMenuItem>
      </DropdownMenu>,
    );

    await openMenu(user);
    const item = await screen.findByRole('menuitem', { name: 'Disabled Item' });
    expect(item).toHaveAttribute('data-disabled');
  });

  it('has no accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Options</button>
        </DropdownMenuTrigger>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenu>,
    );

    await openMenu(user);
    const results = await axe(container, {
      rules: {
        // Base UI injects internal focus-guard elements; exclude from check
        'aria-command-name': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
