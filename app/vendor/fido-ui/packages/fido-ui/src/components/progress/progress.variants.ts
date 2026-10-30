import { tv, type VariantProps } from 'tailwind-variants';

export const progressVariants = tv({
  slots: {
    root: 'font-fido-ui-paragraph',
    track: 'relative h-1 w-full overflow-hidden rounded-full bg-fido-ui-neutral-300',
    indicator: 'h-full rounded-full bg-fido-ui-primary-800 transition-all duration-300 ease-in-out',
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>;
