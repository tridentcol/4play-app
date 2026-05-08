import { IconArrow, colors } from '@4play/ui';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from '../../lib/profile';

const ROWS: {
  id: string;
  label: string;
  subtitle?: string;
  danger?: boolean;
  onPress?: () => void;
}[] = [
  { id: 'account', label: 'Cuenta', subtitle: 'email, contraseña, datos personales' },
  { id: 'notifs', label: 'Notificaciones', subtitle: 'matches, mensajes, recordatorios' },
  { id: 'privacy', label: 'Privacidad', subtitle: 'visibilidad, bloqueos' },
  { id: 'support', label: 'Soporte', subtitle: 'ayuda · términos · privacidad' },
];

export default function Settings() {
  const onLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/onboarding');
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Text className="font-display font-bold text-display-xs text-ink">Ajustes</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-body-l text-ash">Cerrar</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          className="rounded-card overflow-hidden"
          style={{ backgroundColor: colors.bone, borderColor: colors.line, borderWidth: 1 }}
        >
          {ROWS.map((r, i) => (
            <Pressable
              key={r.id}
              className="px-4 py-3.5 flex-row items-center justify-between"
              style={{ borderTopColor: colors.line, borderTopWidth: i === 0 ? 0 : 1 }}
            >
              <View>
                <Text className="font-body font-semibold text-body-l text-ink">{r.label}</Text>
                {r.subtitle && (
                  <Text className="font-mono text-mono-s text-ash mt-0.5">{r.subtitle}</Text>
                )}
              </View>
              <IconArrow size={16} stroke={colors.ash} />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={onLogout}
          className="mt-6 rounded-pill py-4 items-center"
          style={{ backgroundColor: colors.coral }}
        >
          <Text className="font-body font-semibold text-body-l" style={{ color: colors.cream }}>
            Cerrar sesión
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
