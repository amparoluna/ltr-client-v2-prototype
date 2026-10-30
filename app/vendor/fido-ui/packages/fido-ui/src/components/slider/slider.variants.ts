import { tv, type VariantProps } from 'tailwind-variants';

export const sliderVariants = tv({
  slots: {
    root: 'relative flex w-full touch-none select-none items-center font-fido-ui-paragraph',
    track: 'relative h-1.5 w-full grow rounded-full bg-fido-ui-neutral-200',
    range: 'h-full rounded-full bg-fido-ui-primary-700',
    thumb: [
      'block size-4 rounded-full border border-fido-ui-neutral-300 bg-fido-ui-neutral-white',
      'shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] cursor-pointer transition-colors',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fido-ui-primary-500',
      'hover:border-fido-ui-neutral-400',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    label: 'text-fido-ui-p3 font-bold leading-fido-ui-normal text-fido-ui-neutral-950 mb-2',
    output: 'text-fido-ui-p4 text-fido-ui-neutral-500',
  },
  variants: {
    disabled: {
      true: {
        root: 'opacity-50 pointer-events-none',
        thumb: 'cursor-not-allowed',
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
