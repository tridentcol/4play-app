import type { ReactNode } from 'react';
import { Text, View, type ViewStyle } from 'react-native';

export type PhotoTone = 'green' | 'coral' | 'ink' | 'sand' | 'cream';

const tones: Record<PhotoTone, { bg: string; text: string }> = {
  green: { bg: '#0B5D3B', text: '#D4FF3A' },
  coral: { bg: '#FF6B4A', text: '#FFE4DC' },
  ink: { bg: '#0E1B2C', text: '#D4FF3A' },
  sand: { bg: '#E8DFD0', text: '#5C5247' },
  cream: { bg: '#F4F0E8', text: '#5C5247' },
};

type Props = {
  label?: string;
  tone?: PhotoTone;
  children?: ReactNode;
  style?: ViewStyle;
};

/**
 * RN flavor of the striped photo placeholder. RN doesn't support
 * repeating-linear-gradient natively, so we render a flat tinted block —
 * good enough for skeleton layout until real photos land in Storage.
 */
export function PhotoPlaceholder({ label = 'foto', tone = 'green', children, style }: Props) {
  const t = tones[tone];
  return (
    <View
      style={[
        {
          backgroundColor: t.bg,
          padding: 14,
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      <Text
        style={{
          color: t.text,
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          fontFamily: 'JetBrainsMono_500Medium',
        }}
      >
        {children ?? label}
      </Text>
    </View>
  );
}
