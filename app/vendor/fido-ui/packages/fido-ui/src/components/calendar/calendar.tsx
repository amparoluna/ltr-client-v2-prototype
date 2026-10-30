'use client';

import * as React from 'react';
import { DayPicker, useDayPicker, type DayPickerProps } from 'react-day-picker';
import { calendarVariants } from './calendar.variants';
import { cn } from '../../utils/cn';
import { focusRing } from '../../utils/variant-styles';

/* -------------------------------------------------------------------------- */
/*  SVG Icons                                                                  */
/* -------------------------------------------------------------------------- */

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M10 12L6 8l4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Custom DayPicker parts                                                     */
/* -------------------------------------------------------------------------- */

function FidoUIMonthCaption({
  calendarMonth: _calendarMonth,
  displayIndex: _displayIndex,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  calendarMonth?: unknown;
  displayIndex?: number;
}) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const styles = calendarVariants();

  return (
    <div {...props}>
      <div className={styles.captionRow()}>
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          className={styles.navButton()}
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>
        <div className={styles.dropdowns()}>{children}</div>
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className={styles.navButton()}
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function FidoUIDay({
  day,
  modifiers,
  className,
  ...props
}: React.ComponentProps<'td'> & {
  day: { date: Date };
  modifiers: Record<string, boolean>;
}) {
  const isInRange = modifiers.range_start || modifiers.range_end || modifiers.range_middle;
  const dayOfWeek = day.date.getDay();

  return (
    <td
      className={cn(
        className,
        isInRange && dayOfWeek === 0 && 'rounded-l-fido-ui-md',
        isInRange && dayOfWeek === 6 && 'rounded-r-fido-ui-md',
      )}
      {...props}
    />
  );
}

function FidoUIDayButton({
  day,
  modifiers,
  children,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  day: { date: Date };
  modifiers: Record<string, boolean>;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const styles = calendarVariants();
  const isRangeStart = modifiers.range_start;
  const isRangeEnd = modifiers.range_end;
  const isRangeMiddle = modifiers.range_middle;
  const isSameDayRange = isRangeStart && isRangeEnd;
  const isRangeSelected = isRangeStart || isRangeEnd || isRangeMiddle;
  const isSingleSelected = modifiers.selected && !isRangeSelected;
  const isSelected = modifiers.selected || isRangeSelected;
  const dayOfWeek = day.date.getDay();
  const isWeekStart = dayOfWeek === 0;
  const isWeekEnd = dayOfWeek === 6;

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      className={cn(
        className,
        // Current — primary-700 text + bottom dot (hidden when selected).
        modifiers.today && !isSelected && 'text-fido-ui-primary-700',
        // Selected (single) — primary-900 fill, full radius (Figma Selected/Default).
        (isSingleSelected || isSameDayRange) &&
          'rounded-fido-ui-md bg-fido-ui-primary-900 text-fido-ui-neutral-white',
        // Range start/end text; fill lives on the day cell.
        (isRangeStart || isRangeEnd) &&
          !isSameDayRange &&
          'text-fido-ui-neutral-white',
        isRangeMiddle && 'text-fido-ui-neutral-700',
        // Match day-cell radii so focus chrome follows Start/End/week-edge shape.
        isRangeSelected &&
          !isSameDayRange && [
            (isRangeStart || isWeekStart) && 'rounded-l-fido-ui-md',
            (isRangeEnd || isWeekEnd) && 'rounded-r-fido-ui-md',
          ],
        // Hover/focus — primary-800 border + white fill + Focal Ring/Neutral (Figma Hover).
        // Literal hover:shadow class kept for Tailwind detection (see focusRingShadow).
        !isSelected && [
          'rounded-fido-ui-md',
          'hover:border-fido-ui-primary-800 hover:bg-fido-ui-neutral-white',
          'hover:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
          'focus-visible:border-fido-ui-primary-800 focus-visible:bg-fido-ui-neutral-white',
          'focus-visible:outline-none',
          focusRing,
        ],
        // Single selected: outer Focal Ring (fully rounded button).
        (isSingleSelected || isSameDayRange) && ['focus-visible:outline-none', focusRing],
        // Range selected: inset ring so the continuous bar isn’t cut by an outer halo.
        isRangeSelected &&
          !isSameDayRange && [
            'focus-visible:outline-none',
            'focus-visible:shadow-[inset_0_0_0_2px_rgba(212,212,212,0.8)]',
          ],
      )}
      {...props}
    >
      {children}
      {modifiers.today && !isSelected && (
        <span className={styles.todayDot()} aria-hidden="true" />
      )}
    </button>
  );
}

function createFidoUIDropdown(_label: string) {
  function FidoUIDropdown({
    options,
    className: _className,
    components: _c,
    classNames: _cn,
    ...selectProps
  }: {
    options?: Array<{ value: number | string; label: string; disabled?: boolean }>;
    className?: string;
    components?: unknown;
    classNames?: unknown;
  } & React.SelectHTMLAttributes<HTMLSelectElement>) {
    const styles = calendarVariants();
    const selectedOption = options?.find(({ value }) => value === selectProps.value);

    return (
      <span className={styles.dropdownRoot()}>
        <span className={styles.dropdownFace()}>
          <select className={styles.dropdownSelect()} {...selectProps}>
            {options?.map(({ value, label: optionLabel, disabled }) => (
              <option key={value} value={value} disabled={disabled}>
                {optionLabel}
              </option>
            ))}
          </select>
          <span className={styles.dropdownValue()}>{selectedOption?.label}</span>
          <span className={styles.dropdownIcon()} aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </span>
      </span>
    );
  }
  FidoUIDropdown.displayName = `FidoUIDropdown(${_label})`;
  return FidoUIDropdown;
}

/* -------------------------------------------------------------------------- */
/*  Class names + components map                                               */
/* -------------------------------------------------------------------------- */

function buildCalendarClassNames(framed: boolean): Record<string, string> {
  const styles = calendarVariants({ framed });

  return {
    root: styles.root(),
    months: styles.months(),
    month: styles.month(),
    month_grid: styles.monthGrid(),
    weeks: styles.weeks(),
    month_caption: styles.monthCaption(),
    caption_label: 'text-fido-ui-p3 font-normal text-fido-ui-neutral-700',
    nav: 'hidden',
    button_previous: '',
    button_next: '',
    chevron: '',
    weekdays: styles.weekdays(),
    weekday: styles.weekday(),
    week: styles.week(),
    day: styles.day(),
    day_button: styles.dayButton(),
    selected: '',
    range_start: 'rounded-l-fido-ui-md bg-fido-ui-primary-700',
    range_end: 'rounded-r-fido-ui-md bg-fido-ui-primary-700',
    range_middle: 'bg-fido-ui-primary-100',
    today: '',
    outside: '!text-fido-ui-neutral-500',
    disabled: '!text-fido-ui-neutral-300 pointer-events-none',
    hidden: 'invisible',
    focused: '',
    dropdowns: styles.dropdowns(),
    dropdown_root: styles.dropdownRoot(),
    dropdown: cn(styles.dropdownFace(), 'appearance-none w-full cursor-pointer'),
    months_dropdown: '',
    years_dropdown: '',
  };
}

const fidoUICalendarComponents = {
  Chevron: ({ orientation }: { orientation?: string }) => {
    if (orientation === 'left') return <ChevronLeftIcon />;
    if (orientation === 'right') return <ChevronRightIcon />;
    return <ChevronDownIcon />;
  },
  MonthCaption: FidoUIMonthCaption,
  Day: FidoUIDay,
  DayButton: FidoUIDayButton,
  MonthsDropdown: createFidoUIDropdown('Month'),
  YearsDropdown: createFidoUIDropdown('Year'),
};

/** Shared classNames for consumers that compose DayPicker directly (e.g. DatePicker). */
export const fidoUICalendarClassNames = buildCalendarClassNames(false);

/** Shared custom components for DayPicker composition. */
export { fidoUICalendarComponents };

/** Figma weekday abbreviations (Sun + two-letter Mon–Sat). */
const WEEKDAY_LABELS = ['Sun', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

/** Figma month dropdown labels (Jan, Feb, …). */
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const fidoUICalendarFormatters = {
  formatWeekdayName: (date: Date) => WEEKDAY_LABELS[date.getDay()] ?? '',
  formatMonthDropdown: (date: Date) => MONTH_LABELS[date.getMonth()] ?? '',
};

/* -------------------------------------------------------------------------- */
/*  Calendar                                                                   */
/* -------------------------------------------------------------------------- */

export type CalendarProps = DayPickerProps & {
  /** Additional CSS class name on the root */
  className?: string;
  /**
   * When true, renders the Figma card chrome (border, radius, padding, shadow).
   * Set false when embedding inside a surface that already provides framing (e.g. DatePicker popup).
   */
  framed?: boolean;
};

/**
 * A calendar for selecting dates, built on react-day-picker.
 * Supports single, range, and multiple selection modes.
 *
 * @example
 * ```tsx
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
 * ```
 */
export function Calendar({
  className,
  classNames,
  components,
  formatters,
  framed = true,
  captionLayout = 'dropdown',
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = buildCalendarClassNames(framed);

  return (
    <DayPicker
      captionLayout={captionLayout}
      showOutsideDays={showOutsideDays}
      classNames={{ ...defaultClassNames, ...classNames }}
      components={{ ...fidoUICalendarComponents, ...components }}
      formatters={{ ...fidoUICalendarFormatters, ...formatters }}
      className={className}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';
