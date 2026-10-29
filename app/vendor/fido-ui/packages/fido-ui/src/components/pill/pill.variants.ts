import { tv, type VariantProps } from 'tailwind-variants';

export const pillVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-1',
    'font-fido-ui-paragraph font-normal text-fido-ui-p3 leading-fido-ui-normal',
    'rounded-fido-ui-full px-3 py-1',
    'whitespace-nowrap',
  ],
  variants: {
    variant: {
      primary: 'bg-fido-ui-primary-800 text-fido-ui-neutral-white',
      light: 'bg-fido-ui-neutral-100 text-fido-ui-primary-700',
      outline: 'bg-fido-ui-neutral-50 text-fido-ui-neutral-900 border border-fido-ui-neutral-300',
      neutral: 'bg-fido-ui-neutral-100 text-fido-ui-neutral-900 border border-fido-ui-neutral-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type PillVariants = VariantProps<typeof pillVariants>;
