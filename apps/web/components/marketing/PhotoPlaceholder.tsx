import type { CSSProperties, ReactNode } from 'react';

export type PhotoTone = 'green' | 'coral' | 'ink' | 'sand' | 'cream';

const tones: Record<PhotoTone, { bg: string; stripe: string; text: string }> = {
  green: { bg: '#0B5D3B', stripe: 'rgba(212,255,58,0.10)', text: '#D4FF3A' },
  coral: { bg: '#FF6B4A', stripe: 'rgba(255,255,255,0.12)', text: '#FFE4DC' },
  ink: { bg: '#0E1B2C', stripe: 'rgba(212,255,58,0.10)', text: '#D4FF3A' },
  sand: { bg: '#E8DFD0', stripe: 'rgba(14,27,44,0.06)', text: '#5C5247' },
  cream: { bg: '#F4F0E8', stripe: 'rgba(14,27,44,0.05)', text: '#5C5247' },
};

type Props = {
  label?: string;
  tone?: PhotoTone;
  children?: ReactNode;
  style?: CSSProperties;
};

export function PhotoPlaceholder({ label = 'foto', tone = 'green', children, style }: Props) {
  const t = tones[tone];
  return (
    <div
      className="font-mono uppercase flex items-end justify-start"
      style={{
        background: `repeating-linear-gradient(135deg, ${t.bg}, ${t.bg} 14px, ${t.stripe} 14px, ${t.stripe} 28px)`,
        color: t.text,
        fontSize: 10,
        letterSpacing: '0.12em',
        padding: 14,
        ...style,
      }}
    >
      {children ?? label}
    </div>
  );
}
