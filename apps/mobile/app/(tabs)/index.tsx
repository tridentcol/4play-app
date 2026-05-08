import { LogoMark } from '@4play/ui';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <View className="flex-1 px-6 pt-4">
        <View className="flex-row items-center justify-between">
          <LogoMark size={32} />
        </View>
        <View className="mt-12">
          <Text className="font-mono text-mono-m uppercase text-court tracking-mono">HOY</Text>
          <Text className="mt-2 font-display font-bold text-display-xs text-ink">¿A jugar?</Text>
          <Text className="mt-3 text-body-s text-ash">Empieza por encontrar tu próximo rival.</Text>
        </View>
        <Link href="/(tabs)/swipe" asChild>
          <Pressable className="mt-8 bg-court rounded-card p-5">
            <Text className="text-cream font-body font-semibold text-body-l">Buscar match →</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
