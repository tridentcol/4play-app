export const radii = {
  none: 0,
  chip: 6,
  card: 14,
  hero: 22,
  swipe: 28,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radii;
