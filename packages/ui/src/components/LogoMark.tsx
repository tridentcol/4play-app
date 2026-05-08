import { colors } from '../tokens/colors';
import type { LogoMarkProps } from './LogoMark.types';

export function LogoMark({
  size = 96,
  color = colors.court,
  ball = colors.lime,
  bg = 'transparent',
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ display: 'block' }}
      aria-hidden="true"
      focusable="false"
    >
      {bg !== 'transparent' && <rect width="100" height="100" rx="22" fill={bg} />}
      <rect x="62" y="14" width="14" height="72" rx="2" fill={color} />
      <rect x="20" y="54" width="56" height="14" rx="2" fill={color} />
      <path d="M62 14 L20 54 L20 68 L34 68 L62 40 Z" fill={color} />
      <circle cx="38" cy="42" r="8" fill={ball} stroke={color} strokeWidth="1.5" />
      <path
        d="M31.5 41 Q38 46.5 44.5 41"
        stroke={color}
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
