import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Calendar shell and day-cell state styles (Figma: Calendar + .Calendar Elements).
 * Day selection/range/hover/muted/current states are applied via DayPicker modifiers.
 */
export const calendarVariants = tv(
  {
    slots: {
      root: 'w-fit font-fido-ui-paragraph text-fido-ui-p3',
      months: 'flex gap-fido-ui-xl',
      month: 'flex w-max min-w-[241px] flex-col gap-fido-ui-block-h3-gap',
      monthGrid: 'border-collapse w-full',
      monthCaption: 'flex items-center w-full',
      captionRow: 'flex items-center justify-between gap-fido-ui-sm w-full',
      navButton: [
        'inline-flex size-fido-ui-sm shrink-0 items-center justify-center rounded-fido-ui-full',
        'bg-fido-ui-neutral-white text-fido-ui-neutral-700',
        'hover:bg-fido-ui-neutral-100 hover:text-fido-ui-neutral-950',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fido-ui-primary-500',
        'disabled:opacity-30 disabled:pointer-events-none cursor-pointer',
      ],
      dropdowns: 'flex flex-1 items-center justify-center gap-fido-ui-md',
      dropdownRoot: 'relative flex-1',
      dropdownFace: [
        'flex w-full items-center justify-center gap-fido-ui-sm',
        'rounded-fido-ui-md border border-fido-ui-neutral-400 bg-fido-ui-neutral-white',
        'px-fido-ui-xl py-fido-ui-sm',
        'text-fido-ui-p3 font-normal leading-fido-ui-normal text-fido-ui-neutral-700 font-fido-ui-paragraph',
        'has-[:focus]:border-fido-ui-primary-700',
      ],
      dropdownSelect: 'absolute inset-0 w-full cursor-pointer opacity-0',
      dropdownValue: 'whitespace-nowrap text-center tabular-nums',
      dropdownIcon: 'size-4 shrink-0 text-fido-ui-neutral-700',
      weekdays: 'mb-fido-ui-xs grid w-full grid-cols-7',
      weekday: [
        'flex h-8 w-full items-center justify-center text-center',
        'text-fido-ui-p4 font-normal leading-fido-ui-normal text-fido-ui-neutral-500 font-fido-ui-paragraph',
      ],
      weeks: 'flex flex-col gap-fido-ui-xs',
      // Flush 7-col grid so range backgrounds meet with no gap (Figma Days frame).
      week: 'grid w-full grid-cols-7',
      day: [
        'relative h-8 w-full p-0 text-center',
        'text-fido-ui-p3 font-normal leading-fido-ui-normal text-fido-ui-neutral-700 font-fido-ui-paragraph',
      ],
      dayButton: [
        // No base radius — range start/middle/end need square inner edges to blend.
        // Hover/focus chrome (border + Focal Ring) is applied in FidoUIDayButton.
        'relative inline-flex size-full items-center justify-center border border-transparent cursor-pointer',
      ],
      // Figma Current: 4px primary-700 dot in a 12px container near the cell bottom.
      todayDot: 'absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-fido-ui-primary-700',
    },
    variants: {
      framed: {
        true: {
          root: [
            'rounded-fido-ui-lg border border-fido-ui-neutral-300 bg-fido-ui-neutral-white',
            'p-fido-ui-lg shadow-fido-ui-sm',
          ].join(' '),
        },
        false: {
          root: '',
        },
      },
    },
    defaultVariants: {
      framed: true,
    },
  },
  // FidoUI text-size + text-color tokens collide under default twMerge
  { twMerge: false },
);

export type CalendarVariants = VariantProps<typeof calendarVariants>;
