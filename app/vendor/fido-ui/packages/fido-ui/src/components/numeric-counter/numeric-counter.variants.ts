import { tv, type VariantProps } from 'tailwind-variants';

export const numericCounterVariants = tv(
  {
    slots: {
      root: 'inline-flex items-center font-fido-ui-heading',
      value: [
        // Figma reserves 22px for the digit slot so Default/Compact gaps stay stable.
        'min-w-[22px] shrink-0 text-center font-bold leading-fido-ui-tight text-fido-ui-neutral-700',
        'tabular-nums',
      ],
    },
    variants: {
      size: {
        default: {
          root: 'gap-fido-ui-2xl',
          value: 'text-fido-ui-h1',
        },
        compact: {
          root: 'gap-fido-ui-md',
          value: 'text-fido-ui-h3',
        },
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
  {
    twMerge: false,
  },
);

export type NumericCounterVariants = VariantProps<typeof numericCounterVariants>;
