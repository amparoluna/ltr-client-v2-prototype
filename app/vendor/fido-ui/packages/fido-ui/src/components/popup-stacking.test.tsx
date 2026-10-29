import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import fidoUITheme from '../tokens/fido-ui-theme-v3';
import { fidoUIThemeIds } from '../tokens/themes';
import { Select, SelectItem } from './select/select';
import { Combobox, ComboboxItem } from './combobox/combobox';
import { DatePicker, DateRangePicker } from './date-picker/date-picker';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu/dropdown-menu';
import { Tooltip } from './tooltip/tooltip';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog/dialog';

/**
 * Regression coverage for popups painting behind app-owned overlays.
 *
 * Base UI keeps `position: absolute` on the Positioner; the Popup is static, so
 * a `z-index` declared on the Popup is inert. These tests pin the stacking
 * token to the Positioner for every portalled FidoUI component.
 */

const OVERLAY_Z_INDEX = 1050;
const FIDO_UI_OVERLAY_Z_INDEX = Number(fidoUITheme.zIndex['fido-ui-overlay']);

/**
 * jsdom does not ship Tailwind's generated utilities, so mirror the single rule
 * under test from the published v3 token (kept in sync with the v4 theme CSS by
 * `fido-ui-theme-v3.test.ts`).
 */
let tokenStylesheet: HTMLStyleElement;

beforeAll(() => {
  tokenStylesheet = document.createElement('style');
  tokenStylesheet.textContent = `.z-fido-ui-overlay { z-index: ${FIDO_UI_OVERLAY_Z_INDEX}; }`;
  document.head.appendChild(tokenStylesheet);
});

afterAll(() => {
  tokenStylesheet.remove();
});

/** Base UI renders the Positioner as the portal's direct `data-side` child. */
function getPositioners(): HTMLElement[] {
  return Array.from(document.querySelectorAll('[data-base-ui-portal] > [data-side]'));
}

function getPositioner(): HTMLElement {
  const positioners = getPositioners();
  expect(positioners).toHaveLength(1);
  return positioners[0];
}

function getPopup(): HTMLElement {
  return getPositioner().firstElementChild as HTMLElement;
}

/** jsdom reports an unset `z-index` as `''` rather than `'auto'`. */
function computedZIndex(element: HTMLElement): string {
  return getComputedStyle(element).zIndex || 'auto';
}

const openers: Array<{
  name: string;
  render: () => React.ReactElement;
  open: (user: ReturnType<typeof userEvent.setup>) => Promise<void>;
}> = [
  {
    name: 'Select',
    render: () => (
      <Select label="Country">
        <SelectItem value="us">United States</SelectItem>
      </Select>
    ),
    open: async (user) => {
      await user.click(screen.getByRole('combobox'));
      await screen.findByRole('option', { name: 'United States' });
    },
  },
  {
    name: 'Combobox',
    render: () => (
      <Combobox label="Country">
        <ComboboxItem value="us">United States</ComboboxItem>
      </Combobox>
    ),
    open: async (user) => {
      await user.click(screen.getByRole('combobox'));
      await screen.findByRole('option', { name: 'United States' });
    },
  },
  {
    name: 'DatePicker',
    render: () => <DatePicker label="Start date" />,
    open: async (user) => {
      await user.click(screen.getByRole('button'));
      await screen.findByRole('grid');
    },
  },
  {
    name: 'DateRangePicker',
    render: () => <DateRangePicker label="Trip dates" />,
    open: async (user) => {
      await user.click(screen.getByRole('button'));
      await screen.findAllByRole('grid');
    },
  },
  {
    name: 'DropdownMenu',
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenu>
    ),
    open: async (user) => {
      await user.click(screen.getByRole('button', { name: 'Options' }));
      await screen.findByRole('menu');
    },
  },
  {
    name: 'Tooltip',
    render: () => (
      <Tooltip content="More info" delay={0}>
        <button>Info</button>
      </Tooltip>
    ),
    open: async (user) => {
      await user.hover(screen.getByRole('button', { name: 'Info' }));
      await screen.findByText('More info');
    },
  },
];

describe.each(openers)('$name popup stacking', ({ render: renderComponent, open }) => {
  it('puts the stacking token on the positioner, not the popup', async () => {
    const user = userEvent.setup();
    render(renderComponent());
    await open(user);

    expect(getPositioner()).toHaveClass('z-fido-ui-overlay');
    expect(getPopup()).not.toHaveClass('z-fido-ui-overlay');
  });

  it('resolves a z-index on the positioned element only', async () => {
    const user = userEvent.setup();
    render(renderComponent());
    await open(user);

    const positioner = getPositioner();
    expect(getComputedStyle(positioner).position).toBe('absolute');
    expect(computedZIndex(positioner)).toBe(String(FIDO_UI_OVERLAY_Z_INDEX));
    // A z-index here would be dead weight: the popup is not positioned.
    expect(computedZIndex(getPopup())).toBe('auto');
  });

  it('stacks above a non-FidoUI fixed overlay', async () => {
    const user = userEvent.setup();
    render(
      <div style={{ position: 'fixed', inset: 0, zIndex: OVERLAY_Z_INDEX }} data-testid="app-overlay">
        {renderComponent()}
      </div>,
    );
    await open(user);

    const appOverlay = screen.getByTestId('app-overlay');
    expect(Number(computedZIndex(getPositioner()))).toBeGreaterThan(
      Number(computedZIndex(appOverlay)),
    );
  });

  it.each(fidoUIThemeIds)('keeps the stacking token under the %s theme', async (theme) => {
    const user = userEvent.setup();
    render(<div data-fido-ui-theme={theme}>{renderComponent()}</div>);
    await open(user);

    expect(getPositioner()).toHaveClass('z-fido-ui-overlay');
  });
});

describe('popups inside a FidoUI Dialog', () => {
  it('renders the Select popup after the dialog viewport in the same portal', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Pick a country</DialogTitle>
          <Select label="Country">
            <SelectItem value="us">United States</SelectItem>
          </Select>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    await user.click(screen.getByRole('combobox'));
    await screen.findByRole('option', { name: 'United States' });

    const positioner = getPositioner();
    const dialogPopup = screen.getByRole('dialog');

    // Base UI nests the select's portal inside the dialog's, so the popup shares
    // the dialog stacking context and wins on document order.
    expect(dialogPopup.contains(positioner)).toBe(false);
    expect(
      dialogPopup.compareDocumentPosition(positioner) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(Number(computedZIndex(positioner))).toBeGreaterThanOrEqual(FIDO_UI_OVERLAY_Z_INDEX);
  });
});
