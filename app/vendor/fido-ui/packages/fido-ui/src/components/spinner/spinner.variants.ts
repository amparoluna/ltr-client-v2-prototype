import { tv, type VariantProps } from 'tailwind-variants';

export const spinnerVariants = tv({
  base: 'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
    color: {
      primary: 'text-fido-ui-primary-500',
      neutral: 'text-fido-ui-neutral-500',
      warning: 'text-fido-ui-warning-500',
      error: 'text-fido-ui-destruct-600',
      white: 'text-fido-ui-neutral-white',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
