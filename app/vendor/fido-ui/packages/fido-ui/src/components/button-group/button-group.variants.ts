import { tv } from 'tailwind-variants';

export const buttonGroupVariants = tv({
  base: [
    'inline-flex items-center',
    'rounded-fido-ui-md outline outline-1 -outline-offset-1 outline-fido-ui-neutral-500',
    '[&>*]:rounded-none [&>*]:outline-none',
    '[&>*+*]:-ml-px [&>*+*]:border-l [&>*+*]:border-fido-ui-neutral-300',
    '[&>*:first-child]:rounded-l-fido-ui-md',
    '[&>*:last-child]:rounded-r-fido-ui-md',
    '[&>*:focus-visible]:relative [&>*:focus-visible]:z-[1]',
  ],
});
