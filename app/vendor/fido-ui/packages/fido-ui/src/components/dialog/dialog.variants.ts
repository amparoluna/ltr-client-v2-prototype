import { tv, type VariantProps } from 'tailwind-variants';

export const dialogVariants = tv(
  {
    slots: {
      backdrop: [
        'fixed inset-0 z-fido-ui-overlay bg-fido-ui-neutral-black/50',
        'data-[open]:animate-fido-ui-fade-in',
      ],
      viewport: 'fixed inset-0 z-fido-ui-overlay flex items-center justify-center p-4',
      popup: [
        'relative flex w-full flex-col gap-fido-ui-base rounded-fido-ui-lg bg-fido-ui-neutral-white p-fido-ui-2xl',
        'font-fido-ui-paragraph shadow-fido-ui-md',
        'data-[open]:animate-fido-ui-scale-in',
      ],
      header: 'flex w-full flex-col items-start gap-fido-ui-xs',
      title: [
        'flex w-full items-center gap-fido-ui-sm pr-fido-ui-3xl',
        'font-fido-ui-heading text-fido-ui-h4 font-bold leading-fido-ui-tight text-fido-ui-neutral-950',
      ],
      description: [
        'w-full font-fido-ui-paragraph text-fido-ui-p2 font-normal leading-fido-ui-normal',
        'text-fido-ui-neutral-700',
      ],
      footer: [
        'flex w-full flex-wrap items-center justify-center gap-fido-ui-lg',
        '[&>*]:min-w-40 [&>*]:flex-1',
      ],
      close: [
        'absolute right-fido-ui-xl top-fido-ui-xl inline-flex size-8 items-center justify-center rounded-fido-ui-md',
        'text-fido-ui-neutral-700 transition-colors',
        'hover:bg-fido-ui-neutral-100 hover:text-fido-ui-neutral-700',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fido-ui-primary-500',
      ],
    },
    variants: {
      size: {
        sm: { popup: 'max-w-sm' },
        md: { popup: 'max-w-md' },
        lg: { popup: 'max-w-lg' },
        xl: { popup: 'max-w-xl' },
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
  {
    twMerge: false,
  },
);

export type DialogVariants = VariantProps<typeof dialogVariants>;
