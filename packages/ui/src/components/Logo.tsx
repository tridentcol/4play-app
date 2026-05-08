import { colors } from '../tokens/colors';
import { fontFamily, fontWeight } from '../tokens/typography';
import { LogoMark } from './LogoMark';
import type { LogoProps } from './LogoMark.types';

export function Logo({
  size = 32,
  color = colors.court,
  ball = colors.lime,
  dark = false,
  stacked = false,
}: LogoProps) {
  const wordmarkColor = dark ? colors.cream : color;

  if (stacked) {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: size * 0.15,
        }}
      >
        <LogoMark size={size * 2.2} color={color} ball={ball} />
        <span
          style={{
            fontFamily: fontFamily.display,
            fontWeight: fontWeight.bold,
            fontSize: size * 0.85,
            letterSpacing: '0.02em',
            color: wordmarkColor,
            lineHeight: 1,
          }}
        >
          PLAY
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.22,
      }}
    >
      <LogoMark size={size * 1.15} color={color} ball={ball} />
      <span
        style={{
          fontFamily: fontFamily.display,
          fontWeight: fontWeight.bold,
          fontSize: size * 1.05,
          letterSpacing: '-0.02em',
          color: wordmarkColor,
          lineHeight: 1,
        }}
      >
        PLAY
      </span>
    </div>
  );
}
