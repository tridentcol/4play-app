import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../tokens/colors';
import type { LogoMarkProps } from './LogoMark.types';

export function LogoMark({
  size = 96,
  color = colors.court,
  ball = colors.lime,
  bg = 'transparent',
}: LogoMarkProps) {
  return (
    <Svg viewBox="0 0 100 100" width={size} height={size}>
      {bg !== 'transparent' && <Rect width="100" height="100" rx="22" fill={bg} />}
      <Rect x="62" y="14" width="14" height="72" rx="2" fill={color} />
      <Rect x="20" y="54" width="56" height="14" rx="2" fill={color} />
      <Path d="M62 14 L20 54 L20 68 L34 68 L62 40 Z" fill={color} />
      <Circle cx="38" cy="42" r="8" fill={ball} stroke={color} strokeWidth="1.5" />
      <Path
        d="M31.5 41 Q38 46.5 44.5 41"
        stroke={color}
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
    </Svg>
  );
}
