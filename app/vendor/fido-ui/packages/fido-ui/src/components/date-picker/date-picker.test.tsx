import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { DatePicker, DateRangePicker } from './date-picker';
import { Calendar } from '../calendar';

function getDateInput(label = 'Date') {
  return screen.getByRole('textbox', { name: label });
}

function getCalendarTrigger(name = 'Date') {
  return screen.getByRole('button', { name });
}

describe('DatePicker', () => {
  it('renders with label', () => {
    render(<DatePicker label="Start date" />);
    expect(screen.getByText('Start date')).toBeInTheDocument();
  });

  it('focuses the text input when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Start date" />);

    await user.click(screen.getByText('Start date'));

    expect(getDateInput('Start date')).toHaveFocus();
  });

  it('shows placeholder text when no value', () => {
    render(<DatePicker label="Date" placeholder="MM/DD/YYYY" />);
    expect(getDateInput()).toHaveAttribute('placeholder', 'MM/DD/YYYY');
  });

  it('shows formatted date when value is provided', () => {
    const date = new Date(2025, 0, 15); // January 15, 2025
    render(<DatePicker label="Date" value={date} />);
    expect(getDateInput()).toHaveValue('01/15/2025');
  });

  it('uses triggerLabel as the accessible calendar trigger name', () => {
    render(<DatePicker label="Select Date" triggerLabel="Open date calendar" />);
    expect(getCalendarTrigger('Open date calendar')).toBeInTheDocument();
    expect(getDateInput('Select Date')).toBeInTheDocument();
  });

  it('matches the shared stacked field chrome', () => {
    render(<DatePicker label="Date" optional />);
    expect(screen.getByText('Date').className).toMatch(/font-bold/);
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Date/ }).className).toMatch(/text-fido-ui-p2/);
    expect(getCalendarTrigger().className).toMatch(/size-\[18px\]/);
  });

  it('has aria-haspopup="dialog" on the calendar trigger', () => {
    render(<DatePicker label="Date" />);
    expect(getCalendarTrigger()).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('opens the calendar when the text input is focused', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" defaultMonth={new Date(2026, 2, 1)} />);

    await user.click(getDateInput());

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(getCalendarTrigger()).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens the calendar when the calendar icon is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" defaultMonth={new Date(2026, 2, 1)} />);

    await user.click(getCalendarTrigger());

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('can render expanded by default', () => {
    render(<DatePicker label="Date" defaultOpen defaultMonth={new Date(2026, 2, 1)} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <DatePicker
        label="Date"
        open={false}
        onOpenChange={onOpenChange}
        defaultMonth={new Date(2026, 0, 1)}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(getCalendarTrigger());
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <DatePicker
        label="Date"
        open
        onOpenChange={onOpenChange}
        defaultMonth={new Date(2026, 0, 1)}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('sizes the popup to calendar content (theme padding safe)', () => {
    render(<DatePicker label="Date" defaultOpen />);
    expect(screen.getByRole('dialog')).toHaveClass('w-fit');
  });

  it('type → Enter commits the date into controlled state and the input', async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = React.useState<Date | undefined>();
      return (
        <div>
          <DatePicker
            label="Date"
            value={value}
            onChange={setValue}
            dateFormat="MM/dd/yyyy"
            defaultMonth={new Date(2026, 0, 1)}
          />
          <output data-testid="committed-date">
            {value
              ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
              : 'empty'}
          </output>
        </div>
      );
    }

    render(<Harness />);

    const input = getDateInput();
    await user.click(input);
    await user.clear(input);
    await user.type(input, '03/20/2026{Enter}');

    expect(input).toHaveValue('03/20/2026');
    expect(screen.getByTestId('committed-date')).toHaveTextContent('2026-03-20');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the popover and moves focus on Tab', async () => {
    const user = userEvent.setup();
    render(
      <>
        <DatePicker label="Date" defaultOpen defaultMonth={new Date(2026, 0, 1)} />
        <button type="button">Next field</button>
      </>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    getDateInput().focus();
    await user.tab();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next field' })).toHaveFocus();
  });

  it('commits a typed date on blur', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <DatePicker label="Date" onChange={onChange} dateFormat="MM/dd/yyyy" />
        <button type="button">Outside</button>
      </>,
    );

    const input = getDateInput();
    await user.click(input);
    await user.clear(input);
    await user.type(input, '03/20/2026');
    await user.click(screen.getByRole('button', { name: 'Outside' }));

    expect(onChange).toHaveBeenCalled();
    const committed = onChange.mock.calls.at(-1)?.[0] as Date;
    expect(committed.getFullYear()).toBe(2026);
    expect(committed.getMonth()).toBe(2);
    expect(committed.getDate()).toBe(20);
  });

  it('keeps invalid typed drafts without calling onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <DatePicker label="Date" onChange={onChange} dateFormat="MM/dd/yyyy" />
        <button type="button">Outside</button>
      </>,
    );

    const input = getDateInput();
    await user.click(input);
    await user.type(input, 'not a date');
    await user.click(screen.getByRole('button', { name: 'Outside' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('not a date');
  });

  it('rejects typed dates that do not exactly match dateFormat', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <DatePicker label="Date" onChange={onChange} dateFormat="MM/dd/yyyy" />
        <button type="button">Outside</button>
      </>,
    );

    const input = getDateInput();
    await user.click(input);
    await user.type(input, 'January 15, 2026');
    await user.keyboard('{Enter}');

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('January 15, 2026');
  });

  it('rejects typed dates outside min/max constraints', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <DatePicker
          label="Date"
          onChange={onChange}
          dateFormat="MM/dd/yyyy"
          minDate={new Date(2026, 0, 10)}
          maxDate={new Date(2026, 0, 20)}
        />
        <button type="button">Outside</button>
      </>,
    );

    const input = getDateInput();
    await user.click(input);
    await user.type(input, '01/05/2026{Enter}');

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('01/05/2026');
  });

  it('navigates the calendar to a typed date while the popover is open', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Date"
        defaultOpen
        defaultMonth={new Date(2026, 0, 1)}
        dateFormat="MM/dd/yyyy"
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const input = getDateInput();
    await user.click(input);
    await user.clear(input);
    await user.type(input, '06/15/2026');

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByLabelText('June 2026')).toBeInTheDocument();
    expect(
      within(dialog).getByRole('button', { name: /Monday, June 15th, 2026/i }).className,
    ).toMatch(/bg-fido-ui-primary/);
  });

  it('keeps a typed date when the matching calendar day is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        label="Date"
        onChange={onChange}
        defaultOpen
        defaultMonth={new Date(2026, 0, 1)}
        dateFormat="MM/dd/yyyy"
      />,
    );

    const input = getDateInput();
    await user.click(input);
    await user.type(input, '01/15/2026');

    const dialog = screen.getByRole('dialog');
    await user.click(
      within(dialog).getByRole('button', { name: /Thursday, January 15th, 2026/i }),
    );

    expect(input).toHaveValue('01/15/2026');
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('syncs the input when a calendar date is selected', async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = React.useState<Date | undefined>();
      return (
        <DatePicker
          label="Date"
          value={value}
          onChange={setValue}
          defaultOpen
          defaultMonth={new Date(2026, 0, 1)}
        />
      );
    }

    render(<Harness />);

    const dialog = screen.getByRole('dialog');
    const dayButton = within(dialog).getByRole('button', { name: /15/i });
    await user.click(dayButton);

    expect(getDateInput()).toHaveValue('01/15/2026');
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('syncs the input when the controlled value changes externally', () => {
    const { rerender } = render(<DatePicker label="Date" value={new Date(2026, 0, 1)} />);
    expect(getDateInput()).toHaveValue('01/01/2026');

    rerender(<DatePicker label="Date" value={new Date(2026, 5, 10)} />);
    expect(getDateInput()).toHaveValue('06/10/2026');
  });

  it('clears the value when the input is emptied and committed', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <DatePicker
          label="Date"
          value={new Date(2026, 0, 15)}
          onChange={onChange}
          dateFormat="MM/dd/yyyy"
        />
        <button type="button">Outside</button>
      </>,
    );

    const input = getDateInput();
    await user.clear(input);
    await user.click(screen.getByRole('button', { name: 'Outside' }));

    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<DatePicker label="Date" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DateRangePicker', () => {
  it('renders with label', () => {
    render(<DateRangePicker label="Trip dates" />);
    expect(screen.getByText('Trip dates')).toBeInTheDocument();
  });

  it('focuses the trigger when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker label="Trip dates" />);

    await user.click(screen.getByText('Trip dates'));

    expect(screen.getByRole('button', { name: 'Trip dates' })).toHaveFocus();
  });

  it('shows placeholder when no range', () => {
    render(<DateRangePicker placeholder="Choose range" />);
    expect(screen.getByText('Choose range')).toBeInTheDocument();
  });

  it('has aria-haspopup="dialog" on trigger', () => {
    render(<DateRangePicker label="Trip dates" />);
    const trigger = screen.getByRole('button', { name: 'Trip dates' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('uses triggerLabel as the accessible trigger name', () => {
    render(<DateRangePicker label="Trip dates" triggerLabel="Dates" />);
    expect(screen.getByRole('button', { name: 'Dates' })).toBeInTheDocument();
    expect(screen.queryByText('Dates')).not.toBeInTheDocument();
  });

  it('sizes the popup to calendar content (theme padding safe)', () => {
    render(<DateRangePicker label="Trip dates" defaultOpen numberOfMonths={2} />);
    expect(screen.getByRole('dialog')).toHaveClass('w-fit');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<DateRangePicker label="Range" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Calendar', () => {
  it('renders with mode="single"', () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container.querySelector('.rdp-root, [class*="font-fido-ui-paragraph"]')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Calendar mode="single" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15_000);
});
