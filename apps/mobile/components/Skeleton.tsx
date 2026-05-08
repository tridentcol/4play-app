import { colors } from '@4play/ui';
import { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

/**
 * Shimmer-style skeleton block. Used while data loads on profile,
 * chat list, venues. Falls back to a static block when the device
 * has reduceMotion enabled.
 */
export function Skeleton({ style }: { style?: ViewStyle }) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.85, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View
      style={[
        {
          backgroundColor: colors.line,
          borderRadius: 8,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[{ width: '100%', height: '100%', backgroundColor: colors.sand }, animatedStyle]}
      />
    </View>
  );
}
