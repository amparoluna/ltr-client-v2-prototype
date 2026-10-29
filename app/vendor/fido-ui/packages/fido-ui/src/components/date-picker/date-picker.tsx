'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { format, isMatch, isSameDay, isValid, parse, startOfDay } from 'date-fns';
import { type DateRange, type Matcher } from 'react-day-picker';
import { Popover } from '@base-ui/react/popover';
import { Calendar } from '../calendar';
import { datePickerVariants } from './date-picker.variants';
import { cn } from '../../utils/cn';
import { ChevronDownIcon } from '../../utils/icons';

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M5.25 2.25v2.25M12.75 2.25v2.25M2.8125 6.75h12.375M14.25 4.5H3.75A1.125 1.125 0 0 0 2.625 5.625v8.25A1.125 1.125 0 0 0 3.75 15h10.5a1.125 1.125 0 0 0 1.125-1.125v-8.25A1.125 1.125 0 0 0 14.25 4.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
): boolean {
  if (minDate && date < startOfDay(minDate)) return true;
  if (maxDate && date > startOfDay(maxDate)) return true;
  if (disabledDates?.some((disabled) => isSameDay(disabled, date))) return true;
  return false;
}

function buildDisabledMatcher(
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
): Matcher | Matcher[] | undefined {
  const matchers: Matcher[] = [];
  if (minDate) matchers.push({ before: minDate });
  if (maxDate) matchers.push({ after: maxDate });
  if (disabledDates) matchers.push(...disabledDates);
  return matchers.length > 0 ? matchers : undefined;
}

/** Keep calendar month state stable unless year/month actually change. */
function sameCalendarMonth(a: Date | undefined, b: Date): boolean {
  return Boolean(a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth());
}

/**
 * Parses typed text against the configured date-fns format exactly.
 * Returns `undefined` for empty input, `null` for invalid / constrained dates.
 * Pass `ignoreConstraints` to navigate/preview dates outside min/max/disabled.
 */
function parseExactDate(
  text: string,
  dateFormat: string,
  options?: {
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    ignoreConstraints?: boolean;
  },
): Date | undefined | null {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  if (!isMatch(trimmed, dateFormat)) return null;

  const parsed = parse(trimmed, dateFormat, new Date());
  if (!isValid(parsed)) return null;
  // Guard against date-fns accepting tokens that format differently (e.g. overflow).
  if (format(parsed, dateFormat) !== trimmed) return null;
  if (
    !options?.ignoreConstraints &&
    isDateDisabled(parsed, options?.minDate, options?.maxDate, options?.disabledDates)
  ) {
    return null;
  }
  return parsed;
}

const RangeDatePickerTrigger = React.forwardRef<
  HTMLButtonElement,
  {
    id: string;
    ariaLabel?: string;
    displayValue?: string | null;
    placeholder: string;
    disabled?: boolean;
    error?: string;
  }
>(function RangeDatePickerTrigger(
  { id, ariaLabel, displayValue, placeholder, disabled, error },
  ref,
) {
  const state = disabled ? 'disabled' : error ? 'error' : 'default';
  const styles = datePickerVariants({ state, hasValue: !!displayValue });

  return (
    <span className={styles.triggerWrap()}>
      <Popover.Trigger
        ref={ref}
        id={id}
        className={styles.trigger()}
        disabled={disabled}
        aria-label={ariaLabel || displayValue || placeholder}
        aria-haspopup="dialog"
      >
        <span className={styles.triggerText()}>{displayValue ?? placeholder}</span>
        <span className={styles.rangeTriggerIcon()} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </Popover.Trigger>
    </span>
  );
});

/* -------------------------------------------------------------------------- */
/*  DatePicker (single date)                                                   */
/* -------------------------------------------------------------------------- */

export interface DatePickerProps {
  /** The selected date */
  value?: Date;
  /** Called when a date is selected */
  onChange?: (date: Date | undefined) => void;
  /** Label for the input trigger */
  label?: string;
  /** Shows "(Optional)" beside the visible label */
  optional?: boolean;
  /** Accessible name for the calendar trigger when it should differ from `label` */
  triggerLabel?: string;
  /** Placeholder when no date selected */
  placeholder?: string;
  /** Date format string (date-fns format) used for display and typed input */
  dateFormat?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Specific dates to disable */
  disabledDates?: Date[];
  /** Initial calendar month shown in the popover */
  defaultMonth?: Date;
  /** Show month/year dropdowns instead of arrows */
  showDropdowns?: boolean;
  /** Show days from adjacent months to fill the calendar grid */
  showOutsideDays?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Error message displayed below the date picker */
  error?: string;
  /** Controlled popover open state */
  open?: boolean;
  /** Initial popover open state when uncontrolled */
  defaultOpen?: boolean;
  /** Called when the popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS class name */
  className?: string;
}

/**
 * A date field that accepts typed dates and opens a calendar popover.
 *
 * @example
 * ```tsx
 * <DatePicker label="Start date" value={date} onChange={setDate} />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  label,
  optional,
  triggerLabel,
  placeholder = 'MM/DD/YYYY',
  dateFormat = 'MM/dd/yyyy',
  minDate,
  maxDate,
  disabledDates,
  defaultMonth,
  showDropdowns = true,
  showOutsideDays = true,
  disabled,
  error,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: DatePickerProps) {
  const disabledMatcher = React.useMemo(
    () => buildDisabledMatcher(minDate, maxDate, disabledDates),
    [minDate, maxDate, disabledDates],
  );

  const formattedValue = value ? format(value, dateFormat) : '';
  const [inputValue, setInputValue] = React.useState(formattedValue);
  const [month, setMonth] = React.useState<Date | undefined>(defaultMonth ?? value);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = openProp ?? uncontrolledOpen;
  const suppressOpenFromFocusRef = React.useRef(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const controlId = React.useId();
  const triggerId = React.useId();

  const hasValue = Boolean(inputValue.trim());
  const styles = datePickerVariants({
    state: disabled ? 'disabled' : error ? 'error' : 'default',
    hasValue,
  });

  /** Valid typed date used to preview selection + drive the visible month. */
  const typedDate = React.useMemo(() => {
    const parsed = parseExactDate(inputValue, dateFormat, { ignoreConstraints: true });
    return parsed instanceof Date ? parsed : undefined;
  }, [dateFormat, inputValue]);

  const selectedDate = inputValue.trim() === '' ? value : typedDate;

  React.useEffect(() => {
    setInputValue(formattedValue);
  }, [formattedValue]);

  React.useEffect(() => {
    const next = typedDate ?? value;
    if (!next) return;
    setMonth((prev) => (sameCalendarMonth(prev, next) ? prev : next));
  }, [typedDate, value]);

  const commitInput = React.useCallback(
    (raw: string) => {
      const parsed = parseExactDate(raw, dateFormat, { minDate, maxDate, disabledDates });
      if (parsed === null) {
        // Invalid draft — keep text, do not emit.
        return;
      }

      const unchanged =
        (parsed === undefined && value === undefined) ||
        (parsed instanceof Date && value instanceof Date && isSameDay(parsed, value));

      setInputValue(parsed ? format(parsed, dateFormat) : '');
      if (!unchanged) {
        onChange?.(parsed);
      }
    },
    [dateFormat, disabledDates, maxDate, minDate, onChange, value],
  );

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next && inputRef.current) {
        // Commit any pending typed value before the calendar opens (e.g. icon click).
        commitInput(inputRef.current.value);
      }
      if (openProp === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [commitInput, onOpenChange, openProp],
  );

  const handleOpenChange = React.useCallback(
    (
      next: boolean,
      eventDetails: { reason: string; cancel: () => void; event?: Event },
    ) => {
      // The text input sits outside the popup/trigger, so Base UI treats field
      // clicks as "outside". Cancel those — but still allow real focus-out (Tab)
      // and outside clicks to close.
      if (!next && eventDetails.reason === 'outsidePress') {
        const eventTarget = eventDetails.event?.target as Node | null | undefined;
        if (eventTarget != null && fieldRef.current?.contains(eventTarget)) {
          eventDetails.cancel();
          return;
        }
      }
      if (!next && eventDetails.reason === 'focusOut') {
        const related = (eventDetails.event as FocusEvent | undefined)?.relatedTarget as
          | Node
          | null
          | undefined;
        // Keep open only when focus moves into the field or the calendar dialog.
        if (
          (related && fieldRef.current?.contains(related)) ||
          (related instanceof Element && related.closest('[role="dialog"]'))
        ) {
          eventDetails.cancel();
          return;
        }
      }
      setOpen(next);
    },
    [setOpen],
  );

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      // Prevent input onFocus from immediately re-opening the popover.
      suppressOpenFromFocusRef.current = true;
      onChange?.(date);
      setInputValue(date ? format(date, dateFormat) : '');
      if (date) {
        setMonth((prev) => (sameCalendarMonth(prev, date) ? prev : date));
      }
      setOpen(false);
      queueMicrotask(() => {
        inputRef.current?.focus();
      });
    },
    [dateFormat, onChange, setOpen],
  );

  const openFromInput = React.useCallback(() => {
    if (disabled || isOpen) return;
    // Defer so the initiating click isn't treated as an outside dismiss.
    queueMicrotask(() => {
      setOpen(true);
    });
  }, [disabled, isOpen, setOpen]);

  return (
    <div className={cn(styles.root(), className)}>
      {label && (
        <label
          className={styles.label()}
          htmlFor={controlId}
          onClick={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
        >
          {label}
          {optional && <span className={styles.optionalText()}>(Optional)</span>}
        </label>
      )}
      <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
        <div
          ref={fieldRef}
          className={styles.field()}
          data-popup-open={isOpen ? '' : undefined}
        >
          <input
            ref={inputRef}
            id={controlId}
            type="text"
            className={styles.input()}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            onFocus={() => {
              if (suppressOpenFromFocusRef.current) {
                suppressOpenFromFocusRef.current = false;
                return;
              }
              openFromInput();
            }}
            onClick={openFromInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                commitInput(event.currentTarget.value);
                suppressOpenFromFocusRef.current = true;
                setOpen(false);
                return;
              }
              if (event.key === 'Tab') {
                // Unmount the calendar before the browser moves focus, otherwise Tab
                // lands inside the popover instead of the next page control.
                commitInput(event.currentTarget.value);
                if (isOpen) {
                  suppressOpenFromFocusRef.current = true;
                  flushSync(() => {
                    setOpen(false);
                  });
                }
                return;
              }
              if (event.key === 'ArrowDown' && (event.altKey || !isOpen)) {
                event.preventDefault();
                openFromInput();
              }
              if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                setOpen(false);
              }
            }}
            onBlur={(event) => {
              // Don't commit/close while focus moves into the calendar icon or popover.
              const next = event.relatedTarget as Node | null;
              if (next && fieldRef.current?.contains(next)) return;
              if (next instanceof Element && next.closest('[role="dialog"]')) return;
              commitInput(event.currentTarget.value);
              if (isOpen) {
                setOpen(false);
              }
            }}
          />
          <Popover.Trigger
            id={triggerId}
            className={styles.triggerIcon()}
            disabled={disabled}
            tabIndex={-1}
            aria-label={triggerLabel || label || 'Open calendar'}
            aria-haspopup="dialog"
          >
            <CalendarIcon />
          </Popover.Trigger>
        </div>
        <Popover.Portal>
          <Popover.Positioner
            className={styles.positioner()}
            sideOffset={8}
            align="start"
            anchor={fieldRef}
          >
            <Popover.Popup
              className={styles.popup()}
              initialFocus={() => {
                // Keep typing focus on the input; calendar remains mouse/keyboard reachable.
                return false;
              }}
              // Avoid returning focus to the input on close — that re-opens via onFocus
              // and traps Tab inside the calendar.
              finalFocus={false}
            >
              <Calendar
                mode="single"
                required
                framed={false}
                selected={selectedDate}
                onSelect={handleSelect}
                disabled={disabledMatcher}
                captionLayout={showDropdowns ? 'dropdown' : 'label'}
                showOutsideDays={showOutsideDays}
                month={month}
                onMonthChange={setMonth}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
      {error && (
        <p role="alert" className={styles.error()}>
          {error}
        </p>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';

/* -------------------------------------------------------------------------- */
/*  DateRangePicker                                                            */
/* -------------------------------------------------------------------------- */

export interface DateRangePickerProps {
  /** The selected date range */
  value?: DateRange;
  /** Called when the range changes */
  onChange?: (range: DateRange | undefined) => void;
  /** Label for the input trigger */
  label?: string;
  /** Shows "(Optional)" beside the visible label */
  optional?: boolean;
  /** Accessible name for the trigger when it should differ from `label` */
  triggerLabel?: string;
  /** Placeholder when no range selected */
  placeholder?: string;
  /** Date format string (date-fns format) */
  dateFormat?: string;
  /** Number of months to display (default: 2) */
  numberOfMonths?: number;
  /** Initial calendar month shown in the popover */
  defaultMonth?: Date;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Show month/year dropdowns */
  showDropdowns?: boolean;
  /** Show days from adjacent months to fill the calendar grid */
  showOutsideDays?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Error message displayed below the date range picker */
  error?: string;
  /** Controlled popover open state */
  open?: boolean;
  /** Initial popover open state when uncontrolled */
  defaultOpen?: boolean;
  /** Called when the popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS class name */
  className?: string;
}

/**
 * A date range picker with two-month calendar view for selecting start and end dates.
 *
 * @example
 * ```tsx
 * <DateRangePicker label="Trip dates" value={range} onChange={setRange} />
 * ```
 */
export function DateRangePicker({
  value,
  onChange,
  label,
  optional,
  triggerLabel,
  placeholder = 'Select date range',
  dateFormat = 'MMM dd, yyyy',
  numberOfMonths = 2,
  defaultMonth,
  minDate,
  maxDate,
  showDropdowns = true,
  showOutsideDays = true,
  disabled,
  error,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: DateRangePickerProps) {
  const disabledMatcher = React.useMemo(
    () => buildDisabledMatcher(minDate, maxDate),
    [minDate, maxDate],
  );

  const displayValue = React.useMemo(() => {
    if (!value?.from) return null;
    if (!value.to) return format(value.from, dateFormat);
    return `${format(value.from, dateFormat)} — ${format(value.to, dateFormat)}`;
  }, [value, dateFormat]);

  const styles = datePickerVariants({ state: disabled ? 'disabled' : error ? 'error' : 'default' });
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const controlId = React.useId();

  return (
    <div className={cn(styles.root(), className)}>
      {label && (
        <label
          className={styles.label()}
          htmlFor={controlId}
          onClick={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          {label}
          {optional && <span className={styles.optionalText()}>(Optional)</span>}
        </label>
      )}
      <Popover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <RangeDatePickerTrigger
          ref={triggerRef}
          id={controlId}
          ariaLabel={triggerLabel || label}
          displayValue={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
        />
        <Popover.Portal>
          <Popover.Positioner className={styles.positioner()} sideOffset={8} align="start">
            <Popover.Popup className={styles.popup()}>
              <Calendar
                mode="range"
                framed={false}
                selected={value}
                onSelect={onChange}
                numberOfMonths={numberOfMonths}
                disabled={disabledMatcher}
                captionLayout={showDropdowns ? 'dropdown' : 'label'}
                showOutsideDays={showOutsideDays}
                defaultMonth={defaultMonth ?? value?.from}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
      {error && (
        <p role="alert" className={styles.error()}>
          {error}
        </p>
      )}
    </div>
  );
}

DateRangePicker.displayName = 'DateRangePicker';
