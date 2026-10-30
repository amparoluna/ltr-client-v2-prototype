'use client';

import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Field as BaseField } from '@base-ui/react/field';
import { comboboxVariants, type ComboboxVariants } from './combobox.variants';
import type { FieldLabelPlacement } from '../../utils/field-variants';
import {
  InfoIcon,
  ErrorIcon,
  CloseIcon,
  ChevronDownIcon,
  ClearIcon,
  CheckboxIcon,
  CheckmarkIcon,
} from '../../utils/icons';
import { Tooltip } from '../tooltip/tooltip';
import { cn } from '../../utils/cn';

export type ComboboxIndicator = 'checkbox' | 'checkmark' | 'none';

/** The props accepted by the underlying Base UI `Combobox.Root`. */
type ComboboxRootProps = React.ComponentProps<typeof BaseCombobox.Root>;
/** The value type accepted by the underlying Base UI `Combobox.Root`. */
type ComboboxRootValue = ComboboxRootProps['value'];

/* -------------------------------------------------------------------------- */
/*  Combobox Context                                                           */
/* -------------------------------------------------------------------------- */

const ComboboxContext = React.createContext<{ indicator: ComboboxIndicator }>({ indicator: 'checkmark' });

/* -------------------------------------------------------------------------- */
/*  Combobox                                                                   */
/* -------------------------------------------------------------------------- */

export interface ComboboxProps<V = string> extends ComboboxVariants {
  /** The controlled selected value (or array of values when `multiple` is true) */
  value?: V | V[];
  /** The initial selected value when uncontrolled */
  defaultValue?: V | V[];
  /** Callback fired when the selected value changes */
  onValueChange?: (value: V | V[], event?: unknown) => void;
  /** Whether multiple items can be selected at once */
  multiple?: boolean;
  /** The visual indicator style for selected items in the dropdown */
  indicator?: ComboboxIndicator;
  /** Label text displayed above the input */
  label?: string;
  /**
   * Where the label renders:
   * - `stacked` — bold label above the control box (FidoUI DS default)
   * - `internal` — label inside the control box, above the search input
   */
  labelPlacement?: FieldLabelPlacement;
  /** Visually hides the label (still available to assistive technology) */
  hideLabel?: boolean;
  /** Whether to show an "(Optional)" hint next to the label */
  optional?: boolean;
  /** Tooltip text displayed when hovering the info icon next to the label */
  tooltip?: string;
  /** Placeholder text shown in the search input */
  placeholder?: string;
  /** Helper text displayed below the input */
  description?: string;
  /** Error message displayed below the input, replaces description when set */
  error?: string;
  /** Whether the combobox is disabled and non-interactive */
  disabled?: boolean;
  /** The form field name for the combobox */
  name?: string;
  /** Additional CSS class names applied to the root wrapper */
  className?: string;
  /** Called when the search input changes. If not provided, built-in filtering is used. */
  onSearchChange?: (value: string) => void;
  /** Text shown when no items match the search */
  emptyText?: string;
  /**
   * Resolves a selected value to the text shown in the input (and used by the
   * built-in search filter). Supply this whenever values are ids or objects
   * rather than the text the user should read — without it Base UI serializes
   * the value itself, so `value="66"` renders as `66`.
   * @see https://base-ui.com/react/components/combobox#object-values
   */
  itemToStringLabel?: (itemValue: V) => string;
  /**
   * Custom equality used to match an item against the selected value. Required
   * when values are objects that are not referentially equal; Base UI defaults
   * to `Object.is`.
   */
  isItemEqualToValue?: (itemValue: V, value: V) => boolean;
  /** Show removable tags below the input for selected values (multi-select only). Default true when multiple. */
  showTags?: boolean;
  /**
   * Map of value → display label for tags. Takes precedence over
   * `itemToStringLabel`; when neither is set the value itself is shown.
   */
  tagLabels?: Record<string, string>;
  /** The combobox items, groups, and separators to render in the dropdown */
  children: React.ReactNode;
}

/**
 * An autocomplete combobox that combines a text input with a filterable dropdown list, supporting single and multi-select modes.
 *
 * @example
 * ```tsx
 * <Combobox label="Country" placeholder="Search countries...">
 *   <ComboboxItem value="us">United States</ComboboxItem>
 *   <ComboboxItem value="gb">United Kingdom</ComboboxItem>
 * </Combobox>
 * ```
 *
 * @example When values are ids, map them to labels so the input shows text:
 * ```tsx
 * <Combobox itemToStringLabel={(id) => breedsById[id]}>
 *   <ComboboxItem value="66">Golden Retriever</ComboboxItem>
 * </Combobox>
 * ```
 */
export function Combobox<V = string>({
  className,
  label,
  labelPlacement = 'stacked',
  hideLabel,
  optional,
  tooltip,
  placeholder = 'Search...',
  description,
  error,
  state: stateProp,
  disabled,
  multiple = false,
  indicator = multiple ? 'checkbox' : 'checkmark',
  children,
  value,
  defaultValue,
  onValueChange,
  onSearchChange,
  emptyText = 'No results found.',
  itemToStringLabel,
  isItemEqualToValue,
  showTags = multiple,
  tagLabels,
  name,
  ...props
}: ComboboxProps<V>) {
  const state = disabled ? 'disabled' : error ? 'error' : stateProp;
  const styles = comboboxVariants({ state, labelPlacement });
  const showStackedLabel = Boolean(label) && labelPlacement === 'stacked' && !hideLabel;
  const showInternalLabel = Boolean(label) && labelPlacement === 'internal' && !hideLabel;
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  // Field.Root nests its own LabelableProvider inside Combobox.Root, so Field.Label
  // cannot see Combobox's control id. Wire htmlFor/id so label clicks focus the
  // input, and open the popup explicitly (native label activation does not always
  // go through Base UI's openOnInputClick path).
  const inputId = React.useId();

  const handleLabelClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, [role="button"]')) {
      return;
    }
    if (disabled) return;
    setOpen(true);
  };

  const handleValueChange = React.useCallback((val: ComboboxRootValue, event?: unknown) => {
    onValueChange?.(val as V | V[], event);
  }, [onValueChange]);

  const handleInputValueChange = React.useCallback((val: string) => {
    setQuery(val);
    onSearchChange?.(val);
  }, [onSearchChange]);

  // Base UI's root is generic over the value type; these adapters keep the
  // public `V` generic while satisfying its `unknown`-valued prop signatures.
  const rootItemToStringLabel = React.useMemo<ComboboxRootProps['itemToStringLabel']>(
    () => (itemToStringLabel ? (itemValue) => itemToStringLabel(itemValue as V) : undefined),
    [itemToStringLabel],
  );

  const rootIsItemEqualToValue = React.useMemo<ComboboxRootProps['isItemEqualToValue']>(
    () =>
      isItemEqualToValue
        ? (itemValue, selected) => isItemEqualToValue(itemValue as V, selected as V)
        : undefined,
    [isItemEqualToValue],
  );

  // Client-side filtering: match item value, rendered text, or resolved label
  const filteredChildren = React.useMemo(() => {
    if (!query) return React.Children.toArray(children);
    const lowerQuery = query.toLowerCase();
    return React.Children.toArray(children).filter((child) => {
      if (!React.isValidElement(child)) return true;
      const p = child.props as Record<string, unknown>;
      if (p.value == null || p.value === '') return true;
      const haystack = [String(p.value), String(p.children ?? '')];
      if (itemToStringLabel) haystack.push(itemToStringLabel(p.value as V));
      return haystack.some((text) => text.toLowerCase().includes(lowerQuery));
    });
  }, [children, query, itemToStringLabel]);

  const hasResults = filteredChildren.length > 0;

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

  return (
    <ComboboxContext.Provider value={{ indicator }}>
      <BaseCombobox.Root
        value={value as ComboboxRootValue}
        defaultValue={defaultValue as ComboboxRootValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
        multiple={multiple}
        open={open}
        onOpenChange={setOpen}
        onInputValueChange={handleInputValueChange}
        itemToStringLabel={rootItemToStringLabel}
        isItemEqualToValue={rootIsItemEqualToValue}
      >
        <BaseField.Root
          className={cn(styles.root(), className)}
          disabled={disabled}
          {...props}
        >
          {label && hideLabel && (
            <BaseField.Label htmlFor={inputId} className="sr-only" onClick={handleLabelClick}>
              {label}
              {optional && <span>(Optional)</span>}
            </BaseField.Label>
          )}
          {showStackedLabel && (
            <BaseField.Label
              htmlFor={inputId}
              className={styles.label()}
              onClick={handleLabelClick}
            >
              {label}
              {labelExtras}
            </BaseField.Label>
          )}
          <BaseCombobox.InputGroup className={styles.inputGroup()}>
            <div className={styles.content()}>
              {showInternalLabel && (
                <BaseField.Label
                  htmlFor={inputId}
                  className={styles.internalLabel()}
                  onClick={handleLabelClick}
                >
                  {label}
                  {labelExtras}
                </BaseField.Label>
              )}
              <BaseCombobox.Input
                id={inputId}
                className={styles.input()}
                placeholder={placeholder}
              />
            </div>
            <BaseCombobox.Clear className={styles.clear()}>
              <ClearIcon />
            </BaseCombobox.Clear>
            <BaseCombobox.Trigger className={styles.trigger()}>
              <BaseCombobox.Icon>
                <ChevronDownIcon />
              </BaseCombobox.Icon>
            </BaseCombobox.Trigger>
          </BaseCombobox.InputGroup>
          {showTags && multiple && (
            <BaseCombobox.Chips className={styles.chips()}>
              <BaseCombobox.Value>
                {(selected: V | V[]) =>
                  (Array.isArray(selected) ? selected : []).map((val) => {
                    const tagLabel =
                      tagLabels?.[String(val)] ?? itemToStringLabel?.(val) ?? String(val);
                    return (
                      <BaseCombobox.Chip
                        key={String(val)}
                        className={styles.chip()}
                        aria-label={tagLabel}
                      >
                        {tagLabel}
                        <BaseCombobox.ChipRemove
                          className={styles.chipRemove()}
                          aria-label={`Remove ${tagLabel}`}
                        >
                          <CloseIcon className="size-3" />
                        </BaseCombobox.ChipRemove>
                      </BaseCombobox.Chip>
                    );
                  })
                }
              </BaseCombobox.Value>
            </BaseCombobox.Chips>
          )}
          {description && !error && (
            <BaseField.Description className={styles.description()}>
              {description}
            </BaseField.Description>
          )}
          {error && (
            <p role="alert" className={styles.error()}>
              <span className={styles.errorIcon()}>
                <ErrorIcon className="size-4 shrink-0" />
              </span>
              {error}
            </p>
          )}
        </BaseField.Root>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className={styles.positioner()} sideOffset={8}>
            <BaseCombobox.Popup className={cn(styles.popup(), 'min-w-[var(--anchor-width)]')}>
              <BaseCombobox.List>
                {filteredChildren}
              </BaseCombobox.List>
              {!hasResults && (
                <div className={styles.empty()}>{emptyText}</div>
              )}
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </ComboboxContext.Provider>
  );
}

Combobox.displayName = 'Combobox';

/* -------------------------------------------------------------------------- */
/*  ComboboxItem                                                               */
/* -------------------------------------------------------------------------- */

export interface ComboboxItemProps<V = string> {
  /** The value associated with this item, used for filtering and selection */
  value: V;
  /** The content displayed for this item in the dropdown */
  children: React.ReactNode;
  /** Whether this item is disabled and cannot be selected */
  disabled?: boolean;
  /** Additional CSS class names applied to the item element */
  className?: string;
}

const ComboboxItemImpl = React.forwardRef<HTMLDivElement, ComboboxItemProps<unknown>>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const styles = comboboxVariants();
    const { indicator } = React.useContext(ComboboxContext);

    return (
      <BaseCombobox.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(styles.item(), className)}
        {...props}
      >
        {indicator === 'checkbox' && <CheckboxIcon className={styles.itemIndicator()} />}
        <span className="flex-1">{children}</span>
        {indicator === 'checkmark' && <CheckmarkIcon className={styles.itemIndicator()} />}
      </BaseCombobox.Item>
    );
  },
);

ComboboxItemImpl.displayName = 'ComboboxItem';

/**
 * An individual selectable option within a Combobox dropdown.
 *
 * Generic over the value type so it stays in step with `Combobox<V>`; defaults
 * to `string`.
 *
 * @example
 * ```tsx
 * <ComboboxItem value="apple">Apple</ComboboxItem>
 * ```
 */
export const ComboboxItem = ComboboxItemImpl as <V = string>(
  props: ComboboxItemProps<V> & { ref?: React.Ref<HTMLDivElement> },
) => React.JSX.Element;

/* -------------------------------------------------------------------------- */
/*  ComboboxGroup                                                              */
/* -------------------------------------------------------------------------- */

export interface ComboboxGroupProps {
  /** The heading text displayed above the group of items */
  label: string;
  /** The ComboboxItem elements belonging to this group */
  children: React.ReactNode;
  /** Additional CSS class names applied to the group container */
  className?: string;
}

/**
 * A labeled group of ComboboxItem elements within a Combobox dropdown.
 *
 * @example
 * ```tsx
 * <ComboboxGroup label="Fruits">
 *   <ComboboxItem value="apple">Apple</ComboboxItem>
 *   <ComboboxItem value="banana">Banana</ComboboxItem>
 * </ComboboxGroup>
 * ```
 */
export const ComboboxGroup: React.FC<ComboboxGroupProps> = ({ label, children, className }) => {
  const styles = comboboxVariants();
  return (
    <BaseCombobox.Group className={className}>
      <BaseCombobox.GroupLabel className={styles.groupLabel()}>
        {label}
      </BaseCombobox.GroupLabel>
      {children}
    </BaseCombobox.Group>
  );
};

ComboboxGroup.displayName = 'ComboboxGroup';

/* -------------------------------------------------------------------------- */
/*  ComboboxSeparator                                                          */
/* -------------------------------------------------------------------------- */

/**
 * A visual divider used to separate groups or items within a Combobox dropdown.
 *
 * @example
 * ```tsx
 * <ComboboxGroup label="Fruits">...</ComboboxGroup>
 * <ComboboxSeparator />
 * <ComboboxGroup label="Vegetables">...</ComboboxGroup>
 * ```
 */
export const ComboboxSeparator: React.FC<{ className?: string }> = ({ className }) => {
  const styles = comboboxVariants();
  return <BaseCombobox.Separator className={cn(styles.separator(), className)} />;
};

ComboboxSeparator.displayName = 'ComboboxSeparator';
