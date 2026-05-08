export const colors = {
  court: '#0B5D3B',
  lime: '#D4FF3A',
  cream: '#F4F0E8',
  ink: '#0E1B2C',
  bone: '#FAF7F1',
  ash: '#5C5247',
  line: '#E2DCCF',
  coral: '#FF6B4A',
  sand: '#E8DFD0',
} as const;

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];
