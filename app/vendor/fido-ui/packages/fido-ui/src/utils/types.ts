import type * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import type { VariantProps } from 'tailwind-variants';

/**
 * Extract variant props from a tailwind-variants definition.
 * Re-exported for convenience so consumers don't need to import tailwind-variants directly.
 */
export type { VariantProps };

/**
 * Polymorphic component helper.
 * Allows a component to render as a different element via the `asChild` pattern.
 */
export type AsChildProps<T> = T & { asChild?: boolean };

/**
 * A Heroicons icon component, e.g. one imported from
 * `@heroicons/react/24/outline` or `@heroicons/react/24/solid`.
 */
type HeroIcon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

/**
 * Icon component accepted by FidoUI components that render an icon (Button,
 * IconButton, Pill, …). Pass the icon component itself (not a rendered
 * element) — the consuming component sizes and renders it.
 *
 * Accepts either a `lucide-react` icon (e.g. `Plus`) or a Heroicons icon
 * (e.g. `PlusIcon` from `@heroicons/react/24/outline`).
 */
export type IconComponent = LucideIcon | HeroIcon;
