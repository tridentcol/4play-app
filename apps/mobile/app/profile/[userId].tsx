import { IconPin, colors } from '@4play/ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoPlaceholder } from '../../components/PhotoPlaceholder';
import { useProfile } from '../../lib/profile';

export default function ProfileById() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { data, isLoading } = useProfile(userId);

  if (isLoading || !data) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <ActivityIndicator color={colors.court} />
      </SafeAreaView>
    );
  }

  const { profile, sports } = data;
  const primary = sports.find((s) => s.is_primary) ?? sports[0];

  return (
    <View className="flex-1 bg-cream">
      <Stack.Screen
        options={{ headerShown: true, title: `@${profile.username}`, headerTintColor: colors.ink }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ height: 240 }}>
          <PhotoPlaceholder tone="coral" style={{ height: '100%' }}>
            foto · {profile.username}
          </PhotoPlaceholder>
        </View>

        <View className="px-5 pt-4">
          <Text
            className="font-display font-bold text-ink"
            style={{ fontSize: 28, letterSpacing: -0.84 }}
          >
            {profile.full_name}
          </Text>
          {(profile.neighborhood || profile.city) && (
            <View className="mt-1.5 flex-row items-center gap-1.5">
              <IconPin size={13} stroke={colors.ash} />
              <Text className="text-body-xs text-ash">
                {profile.neighborhood ?? ''}
                {profile.city ? ` · ${profile.city}` : ''}
              </Text>
            </View>
          )}
          {primary && (
            <Text className="mt-3 font-mono text-mono-m text-court">
              {primary.sport === 'tennis' ? 'TENIS' : 'PÁDEL'} · NIVEL {primary.level.toFixed(1)}
            </Text>
          )}
          {profile.bio && (
            <Text className="mt-4 text-body-s text-ink leading-6">{profile.bio}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
