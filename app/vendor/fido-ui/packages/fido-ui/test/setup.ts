import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

// Polyfill PointerEvent for jsdom (required by Base UI)
if (typeof PointerEvent === 'undefined') {
  // @ts-expect-error - minimal polyfill for testing
  globalThis.PointerEvent = class PointerEvent extends MouseEvent {
    readonly pointerId: number;
    readonly width: number;
    readonly height: number;
    readonly pressure: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly pointerType: string;
    readonly isPrimary: boolean;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.width = params.width ?? 1;
      this.height = params.height ?? 1;
      this.pressure = params.pressure ?? 0;
      this.tiltX = params.tiltX ?? 0;
      this.tiltY = params.tiltY ?? 0;
      this.pointerType = params.pointerType ?? '';
      this.isPrimary = params.isPrimary ?? false;
    }
  };
}
