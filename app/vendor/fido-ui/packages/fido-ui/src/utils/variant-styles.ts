/**
 * Shared class-list fragments reused across interactive control variants
 * (e.g. Button, IconButton). Centralized so color/shade/state treatments stay
 * consistent and aren't duplicated per component.
 */

/**
 * Neutral 3px ring as a plain `box-shadow` utility, applied via component state
 * rather than `:focus-visible` (e.g. the active OTP slot). Mirrors the value of
 * {@link focusRing} — keep the two in sync. (The full class strings must stay
 * literal so Tailwind can detect them.)
 */
export const focusRingShadow = 'shadow-[0_0_0_3px_rgba(212,212,212,0.8)]';

/** Subtle elevation utility for grouped controls (e.g. joined OTP slots). */
export const dropShadowSm = 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.1)]';

/** Focus ring rendered as a neutral halo via box-shadow. */
export const focusRing = 'focus-visible:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]';

/** Focus ring tinted for destructive controls. */
export const focusRingDestruct = 'focus-visible:shadow-[0_0_0_3px_rgba(210,50,40,0.3)]';

/**
 * Border drawn with `outline` (so it doesn't add to the element height) on a
 * white background, with the outline reset on hover/active. Prefer keeping the
 * stroke through interaction when matching current Figma Button/IconButton
 * light shades — those components use a local `lightOutline` instead.
 */
export const outlineBorder =
  'outline outline-1 -outline-offset-1 bg-fido-ui-neutral-white hover:outline-transparent active:outline-transparent';

/** Disabled appearance for filled (dark) shades (Figma: neutral-100 / 500). */
export const disabledDark = 'disabled:bg-fido-ui-neutral-100 disabled:text-fido-ui-neutral-500';

/** Disabled appearance for outlined (light) shades (Figma: fill, no stroke). */
export const disabledLight =
  'disabled:outline-transparent disabled:bg-fido-ui-neutral-100 disabled:text-fido-ui-neutral-500';
