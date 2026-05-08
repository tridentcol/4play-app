/**
 * Tailwind preset for 4 PLAY. Mirrors the design tokens in src/tokens/*
 * so web (Next.js + NativeWind) consumers share the same scale.
 */
const colors = {
  court: '#0B5D3B',
  lime: '#D4FF3A',
  cream: '#F4F0E8',
  ink: '#0E1B2C',
  bone: '#FAF7F1',
  ash: '#5C5247',
  line: '#E2DCCF',
  coral: '#FF6B4A',
  sand: '#E8DFD0',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['92px', { lineHeight: '0.95', letterSpacing: '-0.05em' }],
        'display-l': ['72px', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-m': ['56px', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-s': ['40px', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-xs': ['32px', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'body-l': ['17px', { lineHeight: '1.5' }],
        'body-m': ['15px', { lineHeight: '1.5' }],
        'body-s': ['14px', { lineHeight: '1.5' }],
        'body-xs': ['13px', { lineHeight: '1.5' }],
        'mono-l': ['13px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'mono-m': ['11px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'mono-s': ['10px', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        'mono-xs': ['9px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      borderRadius: {
        chip: '6px',
        card: '14px',
        hero: '22px',
        swipe: '28px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 6px 18px rgba(14,27,44,0.12)',
        swipe: '0 12px 40px rgba(14,27,44,0.18)',
        float: '0 12px 30px rgba(14,27,44,0.18)',
        hero: '0 30px 80px rgba(14,27,44,0.25)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        display: '-0.03em',
        body: '-0.01em',
        wide: '0.08em',
        mono: '0.12em',
        'mono-wide': '0.18em',
      },
    },
  },
};
