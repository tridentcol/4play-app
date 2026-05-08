export type IconShape =
  | { readonly kind: 'path'; readonly d: string }
  | { readonly kind: 'circle'; readonly cx: number; readonly cy: number; readonly r: number }
  | {
      readonly kind: 'rect';
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
      readonly rx?: number;
    };

export type IconDef = readonly IconShape[];

export const icons = {
  home: [{ kind: 'path', d: 'M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z' }],
  search: [
    { kind: 'circle', cx: 11, cy: 11, r: 7 },
    { kind: 'path', d: 'M21 21l-4.3-4.3' },
  ],
  calendar: [
    { kind: 'rect', x: 3, y: 5, width: 18, height: 16, rx: 2 },
    { kind: 'path', d: 'M3 10h18M8 3v4M16 3v4' },
  ],
  chat: [{ kind: 'path', d: 'M21 15a4 4 0 01-4 4H8l-5 4V7a4 4 0 014-4h10a4 4 0 014 4z' }],
  user: [
    { kind: 'circle', cx: 12, cy: 8, r: 4 },
    { kind: 'path', d: 'M4 21a8 8 0 0116 0' },
  ],
  heart: [
    {
      kind: 'path',
      d: 'M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 12C19 16.5 12 21 12 21z',
    },
  ],
  x: [{ kind: 'path', d: 'M5 5l14 14M19 5L5 19' }],
  pin: [
    { kind: 'path', d: 'M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z' },
    { kind: 'circle', cx: 12, cy: 10, r: 2.5 },
  ],
  star: [{ kind: 'path', d: 'M12 2l3 7 7 .8-5.5 4.7 1.7 7-6.2-3.8L5.8 21.5 7.5 14.5 2 9.8 9 9z' }],
  bolt: [{ kind: 'path', d: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' }],
  check: [{ kind: 'path', d: 'M5 13l4 4L20 6' }],
  arrow: [{ kind: 'path', d: 'M5 12h14M13 5l7 7-7 7' }],
  filter: [{ kind: 'path', d: 'M3 5h18M6 12h12M10 19h4' }],
  send: [{ kind: 'path', d: 'M22 2L11 13M22 2l-7 20-4-9-9-4z' }],
} as const satisfies Record<string, IconDef>;

export type IconName = keyof typeof icons;
