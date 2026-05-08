export const shadows = {
  card: '0 6px 18px rgba(14,27,44,0.12)',
  swipe: '0 12px 40px rgba(14,27,44,0.18)',
  float: '0 12px 30px rgba(14,27,44,0.18)',
  hero: '0 30px 80px rgba(14,27,44,0.25)',
  inset: 'inset 0 1px 0 rgba(255,255,255,0.08)',
} as const;

export type ShadowToken = keyof typeof shadows;
