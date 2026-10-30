'use client';

import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { selectVariants, type SelectVariants } from './select.variants';
import { Tooltip } from '../tooltip/tooltip';
import { ErrorIcon, InfoIcon } from '../../utils/icons';
import type { FieldLabelPlacement } from '../../utils/field-variants';
import { cn } from '../../utils/cn';

/** Determines the visual indicator shown next to each select item — a checkbox square, a checkmark icon, or nothing */
export type SelectIndicator = 'checkbox' | 'checkmark' | 'none';

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M4.5 6.75L9 11.25L13.5 6.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Checkbox: empty square when unselected, filled blue with checkmark when selected */
const CheckboxIndicator: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn(
      'inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-fido-ui-neutral-500',
      'group-data-[selected]:border-fido-ui-primary-700 group-data-[selected]:bg-fido-ui-primary-700',
      className,
    )}
  >
    <svg
      className="hidden text-white group-data-[selected]:block"
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 1L3.5 6.5L1 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/** Checkmark: only visible when selected (via Base UI ItemIndicator) */
const CheckmarkIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
    <path
      d="M11 1L4 8L1 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Select Context (for passing indicator to items)                            */
/* -------------------------------------------------------------------------- */

/** Internal context used to pass the selected indicator style down to SelectItem components */
const SelectContext = React.createContext<{ indicator: SelectIndicator }>({ indicator: 'checkmark' });

/* -------------------------------------------------------------------------- */
/*  Select                                                                     */
/* -------------------------------------------------------------------------- */

export interface SelectProps extends SelectVariants {
  /** The controlled selected value (string for single, string[] for multi-select) */
  value?: string | string[] | null;
  /** The default selected value when uncontrolled */
  defaultValue?: string | string[] | null;
  /** Callback invoked when the selection changes */
  onValueChange?: (value: string | string[] | null, eventDetails?: unknown) => void;
  /** When true, enables multi-select mode allowing multiple items to be chosen */
  multiple?: boolean;
  /** Visual indicator style shown next to each item — defaults to "checkmark" for single-select, "checkbox" for multi-select */
  indicator?: SelectIndicator;
  /**
   * Text label for the select. When `labelPlacement="internal"`, rendered inside
   * the trigger above the value (same as Field / Textarea).
   */
  label?: string;
  /** Visually hides the label while keeping it available to assistive technology. */
  hideLabel?: boolean;
  /** When true, shows an "(Optional)" indicator next to the label */
  optional?: boolean;
  /** Tooltip text shown on hover of the info icon next to the label */
  tooltip?: string;
  /** Placeholder text shown in the trigger when no value is selected */
  placeholder?: string;
  /** Helper text displayed below the select when there is no error */
  description?: string;
  /** Error message displayed below the select; also sets the select to an error state */
  error?: string;
  /** When true, disables the entire select */
  disabled?: boolean;
  /** HTML name attribute for the underlying form control */
  name?: string;
  /**
   * Item labels for the selected value display. Forwarded to Base UI `Select.Root`
   * so `<Select.Value>` can resolve labels instead of raw values.
   * @see https://base-ui.com/react/components/select#formatting-the-value
   */
  items?:
    | Record<string, React.ReactNode>
    | Array<{ label: React.ReactNode; value: string | null }>;
  /** Additional CSS class applied to the root wrapper */
  className?: string;
  /** Maximum selected values to show as text before switching to count (multi only) */
  maxDisplayedValues?: number;
  /**
   * Where the label renders (shared with Field / Textarea):
   * - `'stacked'` — above the trigger (FidoUI DS default)
   * - `'internal'` — inside the trigger above the value
   */
  labelPlacement?: FieldLabelPlacement;
  /** Visual state variant of the select — overridden to "disabled" when `disabled` is true, or "error" when `error` is set */
  state?: SelectVariants['state'];
  /** Select items, groups, and separators to render in the dropdown */
  children: React.ReactNode;
}

/**
 * A dropdown select component with support for single and multi-select modes,
 * labels, tooltips, descriptions, and error messages.
 *
 * Built on Base UI Select. Field chrome (label / helper / error) follows the same
 * stacked / internal patterns as {@link Field} and {@link Textarea}.
 *
 * @example
 * ```tsx
 * <Select label="Country" placeholder="Choose an option">
 *   <SelectItem value="us">United States</SelectItem>
 *   <SelectItem value="ca">Canada</SelectItem>
 * </Select>
 * ```
 */
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      hideLabel,
      optional,
      tooltip,
      placeholder = 'Choose an option',
      description,
      error,
      state: stateProp,
      labelPlacement = 'stacked',
      disabled,
      multiple = false,
      indicator = multiple ? 'checkbox' : 'checkmark',
      maxDisplayedValues: _maxDisplayedValues,
      children,
      value,
      defaultValue,
      onValueChange,
      name,
      items,
      ...props
    },
    ref,
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : stateProp;
    const styles = selectVariants({ state, labelPlacement });
    const showStackedLabel = Boolean(label) && labelPlacement === 'stacked' && !hideLabel;
    const showInternalLabel = Boolean(label) && labelPlacement === 'internal' && !hideLabel;
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);

    const labelExtras = (
      <>
        {optional && <span className={styles.optionalText()}>(Optional)</span>}
        {tooltip && (
          <Tooltip content={tooltip} side="top">
            <span className={styles.tooltipIcon()}>
              <InfoIcon />
            </span>
          </Tooltip>
        )}
      </>
    );

    // Base UI Select.Label is a non-native <div> that focuses the trigger on
    // click, but does not open the popup. Mirror Field / DatePicker label UX by
    // focusing and opening — skip when an interactive adornment (tooltip) was hit.
    const handleLabelClick = (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        return;
      }
      if (disabled) return;
      triggerRef.current?.focus();
      setOpen(true);
    };

    return (
      <SelectContext.Provider value={{ indicator }}>
        <div ref={ref} className={cn(styles.root(), className)} {...props}>
          <BaseSelect.Root
            value={value as never}
            defaultValue={defaultValue as never}
            onValueChange={onValueChange as never}
            disabled={disabled}
            name={name}
            multiple={multiple}
            items={items as never}
            open={open}
            onOpenChange={setOpen}
          >
            {/* Accessible name — always via Select.Label per Base UI docs */}
            {label && (
              <BaseSelect.Label
                className={showStackedLabel ? styles.label() : 'sr-only'}
                onClick={handleLabelClick}
              >
                {label}
                {showStackedLabel ? labelExtras : optional ? <span>(Optional)</span> : null}
              </BaseSelect.Label>
            )}

            <BaseSelect.Trigger ref={triggerRef} className={styles.trigger()}>
              <span className={styles.triggerContent()}>
                {showInternalLabel && (
                  <span className={styles.internalLabel()} aria-hidden="true">
                    {label}
                    {labelExtras}
                  </span>
                )}
                <BaseSelect.Value className={styles.value()} placeholder={placeholder} />
              </span>
              <BaseSelect.Icon className={styles.icon()}>
                <ChevronDown />
              </BaseSelect.Icon>
            </BaseSelect.Trigger>

            <BaseSelect.Portal>
              {/*
                alignItemWithTrigger=false keeps the popup below the field
                (standard form-select layout). Base UI defaults to overlapping
                the trigger to align the selected item with the value text.
              */}
              <BaseSelect.Positioner
                className={styles.positioner()}
                sideOffset={4}
                alignItemWithTrigger={false}
              >
                <BaseSelect.Popup className={cn(styles.popup(), 'min-w-[var(--anchor-width)]')}>
                  <BaseSelect.List>{children}</BaseSelect.List>
                </BaseSelect.Popup>
              </BaseSelect.Positioner>
            </BaseSelect.Portal>
          </BaseSelect.Root>

          {error && (
            <p role="alert" className={styles.error()}>
              <span className={styles.errorIcon()}>
                <ErrorIcon className="size-4 shrink-0" />
              </span>
              {error}
            </p>
          )}
          {description && !error && (
            <p className={styles.description()}>{description}</p>
          )}
        </div>
      </SelectContext.Provider>
    );
  },
);

Select.displayName = 'Select';

/* -------------------------------------------------------------------------- */
/*  SelectItem                                                                 */
/* -------------------------------------------------------------------------- */

export interface SelectItemProps {
  /** The value submitted when this item is selected */
  value: string;
  /** Content displayed as the item label */
  children: React.ReactNode;
  /** When true, prevents this item from being selected */
  disabled?: boolean;
  /** Additional CSS class applied to the item element */
  className?: string;
}

/**
 * An individual option within a Select dropdown.
 *
 * @example
 * ```tsx
 * <SelectItem value="apple">Apple</SelectItem>
 * ```
 */
export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const styles = selectVariants();
    const { indicator } = React.useContext(SelectContext);

    return (
      <BaseSelect.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(styles.item(), className)}
        {...props}
      >
        {indicator === 'checkbox' && <CheckboxIndicator className={styles.itemIndicator()} />}
        <BaseSelect.ItemText className="flex-1">{children}</BaseSelect.ItemText>
        {indicator === 'checkmark' && (
          <span className={styles.itemIndicator()}>
            <BaseSelect.ItemIndicator>
              <CheckmarkIcon />
            </BaseSelect.ItemIndicator>
          </span>
        )}
      </BaseSelect.Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';

/* -------------------------------------------------------------------------- */
/*  SelectGroup                                                                */
/* -------------------------------------------------------------------------- */

export interface SelectGroupProps {
  /** Text label displayed as the group heading */
  label: string;
  /** SelectItem elements belonging to this group */
  children: React.ReactNode;
  /** Additional CSS class applied to the group element */
  className?: string;
}

/**
 * A labelled group of SelectItem elements within a Select dropdown.
 *
 * @example
 * ```tsx
 * <SelectGroup label="Fruits">
 *   <SelectItem value="apple">Apple</SelectItem>
 *   <SelectItem value="banana">Banana</SelectItem>
 * </SelectGroup>
 * ```
 */
export const SelectGroup: React.FC<SelectGroupProps> = ({ label, children, className }) => {
  const styles = selectVariants();

  return (
    <BaseSelect.Group className={className}>
      <BaseSelect.GroupLabel className={styles.groupLabel()}>{label}</BaseSelect.GroupLabel>
      {children}
    </BaseSelect.Group>
  );
};

SelectGroup.displayName = 'SelectGroup';

/* -------------------------------------------------------------------------- */
/*  SelectSeparator                                                            */
/* -------------------------------------------------------------------------- */

/**
 * A visual divider used to separate groups or items within a Select dropdown.
 *
 * @example
 * ```tsx
 * <SelectGroup label="Fruits">...</SelectGroup>
 * <SelectSeparator />
 * <SelectGroup label="Vegetables">...</SelectGroup>
 * ```
 */
export const SelectSeparator: React.FC<{ className?: string }> = ({ className }) => {
  const styles = selectVariants();
  return <BaseSelect.Separator className={cn(styles.separator(), className)} />;
};

SelectSeparator.displayName = 'SelectSeparator';
