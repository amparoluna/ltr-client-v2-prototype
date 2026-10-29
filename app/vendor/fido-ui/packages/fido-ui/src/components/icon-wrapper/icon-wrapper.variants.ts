import { tv, type VariantProps } from 'tailwind-variants';

export const iconWrapperVariants = tv({
  slots: {
    root: 'inline-flex shrink-0 items-center justify-center overflow-clip',
    icon: 'block shrink-0 text-current [&>svg]:size-full [&>svg]:stroke-current',
  },
  variants: {
    color: {
      primary: {},
      secondary: {},
      neutral: {},
      success: {},
      info: {},
      warning: {},
      destruct: {},
    },
    shade: {
      light: {},
      dark: {},
    },
    size: {
      lg: {
        root: 'size-fido-ui-4xl rounded-fido-ui-md p-fido-ui-sm',
        icon: 'size-fido-ui-sm',
      },
      md: {
        root: 'size-fido-ui-md rounded-fido-ui-sm p-fido-ui-xs',
        icon: 'size-fido-ui-xs',
      },
      sm: {
        root: 'size-fido-ui-sm rounded-fido-ui-xs p-fido-ui-2xs',
        icon: 'size-fido-ui-2xs',
      },
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      shade: 'light',
      class: { root: 'bg-fido-ui-primary-100 text-fido-ui-primary-700' },
    },
    {
      color: 'primary',
      shade: 'dark',
      class: { root: 'bg-fido-ui-primary-700 text-fido-ui-neutral-white' },
    },
    {
      color: 'secondary',
      shade: 'light',
      class: { root: 'bg-fido-ui-secondary-200 text-fido-ui-secondary-700' },
    },
    {
      color: 'secondary',
      shade: 'dark',
      class: { root: 'bg-fido-ui-secondary-700 text-fido-ui-neutral-white' },
    },
    {
      color: 'neutral',
      shade: 'light',
      class: { root: 'bg-fido-ui-neutral-100 text-fido-ui-neutral-500' },
    },
    {
      color: 'neutral',
      shade: 'dark',
      class: { root: 'bg-fido-ui-neutral-600 text-fido-ui-neutral-white' },
    },
    {
      color: 'success',
      shade: 'light',
      class: { root: 'bg-fido-ui-success-100 text-fido-ui-success-700' },
    },
    {
      color: 'success',
      shade: 'dark',
      class: { root: 'bg-fido-ui-success-700 text-fido-ui-neutral-white' },
    },
    {
      color: 'info',
      shade: 'light',
      class: { root: 'bg-fido-ui-info-100 text-fido-ui-info-700' },
    },
    {
      color: 'info',
      shade: 'dark',
      class: { root: 'bg-fido-ui-info-700 text-fido-ui-neutral-white' },
    },
    {
      color: 'warning',
      shade: 'light',
      class: { root: 'bg-fido-ui-warning-100 text-fido-ui-warning-700' },
    },
    {
      color: 'warning',
      shade: 'dark',
      class: { root: 'bg-fido-ui-warning-500 text-fido-ui-neutral-white' },
    },
    {
      color: 'destruct',
      shade: 'light',
      class: { root: 'bg-fido-ui-destruct-100 text-fido-ui-destruct-700' },
    },
    {
      color: 'destruct',
      shade: 'dark',
      class: { root: 'bg-fido-ui-destruct-600 text-fido-ui-neutral-white' },
    },
  ],
  defaultVariants: {
    color: 'primary',
    shade: 'light',
    size: 'lg',
  },
});

export type IconWrapperVariants = VariantProps<typeof iconWrapperVariants>;
