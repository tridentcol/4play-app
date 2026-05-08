import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chat() {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-mono text-mono-m uppercase text-court">CONVERSACIONES</Text>
        <Text className="mt-2 font-display font-bold text-display-xs text-ink">Próximamente</Text>
      </View>
    </SafeAreaView>
  );
}
