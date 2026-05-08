import { LogoMark } from '@4play/ui';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center px-6">
        <LogoMark size={96} />
        <Text className="mt-6 text-display-xs font-display font-bold text-ink">4 PLAY</Text>
        <Text className="mt-2 text-mono-m font-mono uppercase text-court tracking-mono">
          Cartagena · 2026
        </Text>
        <Text className="mt-6 max-w-[280px] text-body-m text-center text-ash">
          App lista. Onboarding y auth llegan en el próximo step.
        </Text>
      </View>
    </SafeAreaView>
  );
}
