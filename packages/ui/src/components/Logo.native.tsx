import { Text, View } from 'react-native';
import { colors } from '../tokens/colors';
import { fontWeight } from '../tokens/typography';
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
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: size * 0.15,
        }}
      >
        <LogoMark size={size * 2.2} color={color} ball={ball} />
        <Text
          style={{
            fontFamily: 'BricolageGrotesque-Bold',
            fontWeight: String(fontWeight.bold) as '700',
            fontSize: size * 0.85,
            letterSpacing: 0.02 * size * 0.85,
            color: wordmarkColor,
            lineHeight: size * 0.85,
          }}
        >
          PLAY
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: size * 0.22,
      }}
    >
      <LogoMark size={size * 1.15} color={color} ball={ball} />
      <Text
        style={{
          fontFamily: 'BricolageGrotesque-Bold',
          fontWeight: String(fontWeight.bold) as '700',
          fontSize: size * 1.05,
          letterSpacing: -0.02 * size * 1.05,
          color: wordmarkColor,
          lineHeight: size * 1.05,
        }}
      >
        PLAY
      </Text>
    </View>
  );
}
