import * as React from 'react';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Adds an accessible name. Icons without a name are decorative by default. */
  title?: string;
}

export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export function createIcon(
  displayName: string,
  paths: React.ReactNode,
  viewBox = '0 0 24 24',
): IconComponent {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    (
      {
        title,
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-hidden': ariaHidden,
        ...props
      },
      ref,
    ) => {
      const hasAccessibleName = Boolean(title || ariaLabel || ariaLabelledBy);

      return (
        <svg
          width="1em"
          height="1em"
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
          ref={ref}
          role={role ?? (hasAccessibleName ? 'img' : undefined)}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-hidden={ariaHidden ?? (hasAccessibleName ? undefined : true)}
        >
          {title ? <title>{title}</title> : null}
          {paths}
        </svg>
      );
    },
  );

  Icon.displayName = displayName;
  return Icon;
}
