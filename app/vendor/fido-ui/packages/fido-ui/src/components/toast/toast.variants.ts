import { tv, type VariantProps } from 'tailwind-variants';

/** Figma models this component as Type × Color. */
export const toastVariants = tv({
  slots: {
    root: ['flex w-full font-fido-ui-paragraph shadow-fido-ui-md', 'rounded-fido-ui-md'],
    icon: 'relative flex shrink-0 items-center justify-center',
    content: 'min-w-0 flex-1',
    title: 'm-0',
    description: 'm-0 text-fido-ui-p3 leading-fido-ui-normal',
    extra: 'mt-fido-ui-xs',
    action: 'shrink-0',
    close: [
      'inline-flex size-fido-ui-xs shrink-0 items-center justify-center',
      'cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    ],
  },
  variants: {
    type: {
      loading: {
        root: 'items-center gap-fido-ui-md p-fido-ui-base',
        content: 'text-fido-ui-p2 leading-fido-ui-normal',
        title: 'font-fido-ui-paragraph font-normal text-fido-ui-p2 leading-fido-ui-normal',
      },
      info: {
        root: 'items-start gap-fido-ui-md p-fido-ui-base',
        content: 'py-fido-ui-xs',
        title: 'font-fido-ui-heading font-bold text-fido-ui-h5 leading-fido-ui-tight',
      },
    },
    iconType: {
      success: {
        icon: 'text-fido-ui-success-600',
      },
      error: {
        icon: 'text-fido-ui-destruct-600',
      },
      warning: {
        icon: 'text-fido-ui-warning-500',
      },
      info: {
        icon: 'text-fido-ui-primary-700',
      },
    },
    iconSize: {
      sm: {
        icon: 'size-4',
      },
      md: {
        icon: 'size-fido-ui-md',
      },
    },
    color: {
      white: {
        root: 'bg-fido-ui-neutral-white text-fido-ui-neutral-700',
        description: 'text-fido-ui-neutral-700',
        close: 'text-fido-ui-neutral-700 focus-visible:outline-fido-ui-neutral-700',
      },
      black: {
        root: 'bg-fido-ui-neutral-black text-fido-ui-neutral-white',
        description: 'text-fido-ui-neutral-white',
        close: 'text-fido-ui-neutral-white focus-visible:outline-fido-ui-neutral-white',
      },
    },
  },
  defaultVariants: {
    type: 'loading',
    color: 'white',
    iconSize: 'md',
  },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
