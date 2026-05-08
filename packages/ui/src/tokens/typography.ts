export const fontFamily = {
  display: '"Bricolage Grotesque", system-ui, sans-serif',
  body: 'Inter, -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  display: {
    xl: 92,
    l: 72,
    m: 56,
    s: 40,
    xs: 32,
  },
  body: {
    l: 17,
    m: 15,
    s: 14,
    xs: 13,
  },
  mono: {
    l: 13,
    m: 11,
    s: 10,
    xs: 9,
  },
} as const;

export const letterSpacing = {
  tight: '-0.04em',
  display: '-0.03em',
  body: '-0.01em',
  normal: '0',
  wide: '0.08em',
  mono: '0.12em',
  monoWide: '0.18em',
} as const;

export const lineHeight = {
  display: 0.95,
  heading: 1.05,
  body: 1.5,
  loose: 1.6,
} as const;

export type FontFamilyToken = keyof typeof fontFamily;
export type FontWeightToken = keyof typeof fontWeight;
