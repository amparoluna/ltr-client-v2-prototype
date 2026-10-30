import { tv, type VariantProps } from 'tailwind-variants';
import { fieldTextP3 } from '../../utils/field-variants';

/**
 * Drag & drop file surface (Figma: Drag & drop).
 * States: Default, Active (drag-over), Disabled, Error.
 *
 * Text/icon colors live on state variants — twMerge is off for typography
 * tokens, so base + state color classes would both stick.
 */
export const dragDropVariants = tv(
  {
    slots: {
      root: 'flex w-full flex-col gap-fido-ui-xs font-fido-ui-paragraph',
      dropzone: [
        'relative flex w-full cursor-pointer flex-col items-center justify-center',
        'gap-fido-ui-2xl rounded-fido-ui-md border border-dashed',
        'px-fido-ui-lg py-fido-ui-2xl',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2',
        'has-[:focus-visible]:outline-fido-ui-primary-500',
      ].join(' '),
      content: 'flex w-full flex-col items-center gap-fido-ui-base',
      icon: 'inline-flex size-fido-ui-md shrink-0 items-center justify-center overflow-hidden',
      title: [
        'w-full text-center font-fido-ui-heading font-bold',
        'text-fido-ui-h5 leading-fido-ui-tight',
      ].join(' '),
      textBlock: 'flex w-full flex-col items-center justify-center text-center',
      secondaryText: [
        'w-full font-fido-ui-paragraph font-normal',
        'text-fido-ui-p3 leading-fido-ui-normal',
      ].join(' '),
      tertiaryText: [
        'w-full font-fido-ui-paragraph font-normal',
        'text-fido-ui-p4 leading-fido-ui-normal',
      ].join(' '),
      description: `w-full font-fido-ui-paragraph font-normal ${fieldTextP3}`,
      error: [
        'flex w-full items-start gap-fido-ui-xs',
        'font-fido-ui-paragraph font-normal',
        'text-fido-ui-p3 leading-fido-ui-normal text-fido-ui-destruct-600',
      ].join(' '),
      errorIcon: 'inline-flex size-fido-ui-xs shrink-0 items-center justify-center pt-0.5',
      input: 'sr-only',
    },
    variants: {
      state: {
        default: {
          dropzone:
            'border-fido-ui-primary-700 bg-fido-ui-neutral-white hover:bg-fido-ui-primary-50',
          icon: 'text-fido-ui-primary-700',
          title: 'text-fido-ui-primary-700',
          secondaryText: 'text-fido-ui-neutral-700',
          tertiaryText: 'text-fido-ui-neutral-700',
          description: 'text-fido-ui-neutral-700',
        },
        active: {
          dropzone: 'border-fido-ui-primary-700 bg-fido-ui-primary-50',
          icon: 'text-fido-ui-primary-700',
          title: 'text-fido-ui-primary-700',
          secondaryText: 'text-fido-ui-neutral-700',
          tertiaryText: 'text-fido-ui-neutral-700',
          description: 'text-fido-ui-neutral-700',
        },
        disabled: {
          dropzone: [
            'cursor-not-allowed border-fido-ui-neutral-300 bg-fido-ui-neutral-100',
            'pointer-events-none',
          ].join(' '),
          icon: 'text-fido-ui-neutral-400',
          title: 'text-fido-ui-neutral-500',
          secondaryText: 'text-fido-ui-neutral-500',
          tertiaryText: 'text-fido-ui-neutral-500',
          description: 'text-fido-ui-neutral-500',
        },
        error: {
          dropzone: 'border-fido-ui-destruct-700 bg-fido-ui-neutral-white',
          icon: 'text-fido-ui-primary-700',
          title: 'text-fido-ui-primary-700',
          secondaryText: 'text-fido-ui-neutral-700',
          tertiaryText: 'text-fido-ui-neutral-700',
          description: 'text-fido-ui-neutral-700',
        },
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
  // Preserve text-fido-ui-h5/p3/p4 alongside text-fido-ui-* color classes
  { twMerge: false },
);

export type DragDropVariants = VariantProps<typeof dragDropVariants>;
