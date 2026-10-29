/**
 * Shared class-list fragments for form-field components (Field, Textarea, Select).
 * Keep strings literal so Tailwind's JIT can detect them. Do not rely on
 * twMerge for `fido-ui-*` token conflicts.
 */

/** P3 body type (14px) + normal line-height — field text rows. */
export const fieldTextP3 = 'text-fido-ui-p3 leading-fido-ui-normal';

/** P4 caption type (12px) — in-field labels, optional text, tooltips. */
export const fieldTextP4 = 'text-fido-ui-p4 leading-fido-ui-normal';

/**
 * Textarea field wrapper (`gap-1.5`). Field uses its own root slot so stacked /
 * internal gaps stay independent of this fragment.
 */
export const fieldRoot =
  'group/field relative flex flex-col gap-1.5 font-fido-ui-paragraph';

/** Stacked (outside) label above the control — FidoUI Field default. */
export const fieldLabelStacked = [
  'flex items-center gap-1',
  `font-fido-ui-paragraph font-bold ${fieldTextP3} text-fido-ui-neutral-700`,
].join(' ');

/** In-field label for `labelPlacement="internal"`. */
export const fieldLabelInternal = [
  'flex w-full min-w-0 items-center gap-fido-ui-xs overflow-hidden',
  `font-fido-ui-paragraph font-normal ${fieldTextP4} leading-none text-fido-ui-neutral-700`,
  'whitespace-nowrap text-ellipsis',
].join(' ');

/**
 * Floating label sitting on the top border (border-cut).
 * Used by Textarea.
 */
export const fieldLabelBase = [
  'absolute -top-2 left-2 z-[1] flex items-center gap-1.5 px-1.5',
  `${fieldTextP4} text-fido-ui-type-heading`,
  'bg-fido-ui-neutral-white transition-colors duration-150',
].join(' ');

/**
 * On focus the field fills blue. Paint only the label's lower half blue (hard
 * color stop at 50%, where the top border sits) so it reads as a notch cut by
 * the fill: white above the border, blue below.
 */
export const fieldLabelFocusFill =
  'group-has-focus/field:bg-linear-to-b group-has-focus/field:from-fido-ui-neutral-white group-has-focus/field:from-50% group-has-focus/field:to-fido-ui-primary-100 group-has-focus/field:to-50%';

/** Focus treatment for the bordered control box (blue border + fill). */
export const fieldFocusBorderFill =
  'focus-within:border-fido-ui-primary-800 focus-within:bg-fido-ui-primary-100';

/** "(Optional)" suffix shown next to the label (size follows labelPlacement). */
export const fieldOptionalText = 'text-fido-ui-neutral-500';

/** Help-tooltip trigger icon next to the label (14px — Figma InfoTooltip). */
export const fieldTooltipIcon =
  'inline-flex size-[14px] items-center justify-center rounded-full text-fido-ui-neutral-600 cursor-help';

/** Helper / description text below the control. */
export const fieldDescription = `${fieldTextP3} text-fido-ui-neutral-700`;

/** Error row below the control (icon + message). */
export const fieldError = `flex items-center gap-fido-ui-xs ${fieldTextP3} text-fido-ui-destruct-600`;

export const fieldErrorIcon = 'inline-flex shrink-0 items-center justify-center';

/** Shared control-box chrome (height/padding applied per labelPlacement). */
export const fieldControlBox = [
  'flex w-full items-center rounded-fido-ui-sm border bg-fido-ui-neutral-white',
  'transition-[border-color,box-shadow,background-color] duration-150',
].join(' ');

/** Stacked placement: 40px control height. */
export const fieldControlBoxStacked = 'h-10 gap-fido-ui-sm px-fido-ui-lg';

/** Internal placement: 50px control height. */
export const fieldControlBoxInternal = 'h-[50px] gap-fido-ui-md px-fido-ui-xl';

/** Default state borders for a field control box. */
export const fieldControlStateDefault = [
  'border-fido-ui-neutral-300',
  'focus-within:border-fido-ui-primary-600',
  'focus-within:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
].join(' ');

/** Error state borders for a field control box. */
export const fieldControlStateError = [
  'border-fido-ui-destruct-600',
  'focus-within:border-fido-ui-destruct-600',
  'focus-within:shadow-[0_0_0_3px_rgba(210,50,40,0.3)]',
].join(' ');

/** Success state borders for a field control box. */
export const fieldControlStateSuccess = [
  'border-fido-ui-success-600',
  'focus-within:border-fido-ui-success-600',
  'focus-within:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
].join(' ');

/** Disabled state for a field control box. */
export const fieldControlStateDisabled = 'border-fido-ui-neutral-300';

/** Disabled root treatment. */
export const fieldRootDisabled = 'opacity-50 pointer-events-none';

/**
 * Public prop vocabulary for the FidoUI `Field` wrapper.
 */
export type FieldLabelPlacement = 'stacked' | 'internal';

export interface FieldChromeProps {
  /** Accessible text label. Required — use `hideLabel` to hide visually. */
  label: string;
  /** Visually hides the label (still available to assistive technology). */
  hideLabel?: boolean;
  /**
   * Where the label renders:
   * - `stacked` — above the field (FidoUI DS default)
   * - `internal` — inside the field above the value
   */
  labelPlacement?: FieldLabelPlacement;
  /** When true, shows an "(Optional)" indicator next to the label. */
  optional?: boolean;
  /** Tooltip text shown on hover of the info icon next to the label. */
  tooltip?: string;
  /** Helper text displayed below the control. */
  description?: string;
  /** Error message displayed below the control; also sets error state. */
  error?: string;
  /** When true, disables the entire field. */
  disabled?: boolean;
}
