export const fidoUIThemeIds = ['primary', 'fidoAlert'] as const;

export type FidoUIThemeId = (typeof fidoUIThemeIds)[number];
export type FidoUIDeviceClass = 'mobile' | 'tablet';

export type FidoUIColorScale = Readonly<Record<string, string>>;

export interface FidoUINativeTheme {
  readonly id: FidoUIThemeId;
  readonly deviceClass: FidoUIDeviceClass;
  readonly colors: {
    readonly primary: FidoUIColorScale;
    readonly secondary: FidoUIColorScale;
    readonly neutral: FidoUIColorScale;
    readonly destruct: FidoUIColorScale;
    readonly success: FidoUIColorScale;
    readonly warning: FidoUIColorScale;
    readonly info: FidoUIColorScale;
    readonly alert: FidoUIColorScale;
    readonly semantic: Readonly<Record<string, string>>;
  };
  readonly spacing: Readonly<Record<string, number>>;
  readonly radii: Readonly<Record<string, number>>;
  readonly borderWidths: Readonly<Record<string, number>>;
  readonly sizes: Readonly<Record<string, number>>;
  readonly typography: {
    readonly fontFamilies: {
      readonly regular: 'Archivo_400Regular';
      readonly bold: 'Archivo_700Bold';
    };
    readonly fontSizes: Readonly<Record<string, number>>;
    readonly lineHeights: Readonly<Record<string, number>>;
  };
}
