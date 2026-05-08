import { IconArrow, colors } from '@4play/ui';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthState } from '../../lib/auth';
import { pauseAccount } from '../../lib/moderation';
import { signOut } from '../../lib/profile';

const WEB_BASE = process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'https://4play.co';

export default function Settings() {
  const auth = useAuthState();
  const userId = auth.status === 'authenticated' ? auth.session.user.id : undefined;

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

  const onPause = () => {
    if (!userId) return;
    Alert.alert(
      'Pausar perfil',
      'Tu perfil dejará de aparecer en swipe. Puedes reactivarlo cuando quieras.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Pausar',
          onPress: async () => {
            try {
              await pauseAccount(userId);
              Alert.alert('Listo', 'Tu perfil quedó en pausa.');
            } catch (e) {
              Alert.alert('Error', e instanceof Error ? e.message : 'No pudimos pausar la cuenta');
            }
          },
        },
      ],
    );
  };

  const open = (path: string) => () => {
    void Linking.openURL(`${WEB_BASE}${path}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Text className="font-display font-bold text-display-xs text-ink">Ajustes</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-body-l text-ash">Cerrar</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Group>
          <Row label="Cuenta" subtitle="email, contraseña, datos personales" />
          <Row label="Notificaciones" subtitle="matches, mensajes, recordatorios" />
          <Row label="Privacidad" subtitle="visibilidad, bloqueos" />
        </Group>

        <Group>
          <Row label="Términos" subtitle="reglas de uso" onPress={open('/legal/terms')} />
          <Row
            label="Privacidad"
            subtitle="cómo manejamos tus datos"
            onPress={open('/legal/privacy')}
          />
          <Row label="Soporte" subtitle="ayuda · contacto" onPress={open('/legal/support')} />
        </Group>

        <Pressable
          onPress={onPause}
          className="rounded-pill py-3.5 items-center"
          style={{ backgroundColor: colors.bone, borderColor: colors.line, borderWidth: 1 }}
        >
          <Text className="font-body font-semibold text-body-m text-ink">Pausar mi perfil</Text>
        </Pressable>

        <Pressable
          onPress={onLogout}
          className="rounded-pill py-4 items-center"
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

function Group({ children }: { children: React.ReactNode }) {
  return (
    <View
      className="rounded-card overflow-hidden"
      style={{ backgroundColor: colors.bone, borderColor: colors.line, borderWidth: 1 }}
    >
      {children}
    </View>
  );
}

function Row({
  label,
  subtitle,
  onPress,
}: {
  label: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="px-4 py-3.5 flex-row items-center justify-between"
      style={{ borderTopColor: colors.line, borderTopWidth: 0 }}
    >
      <View className="flex-1 pr-3">
        <Text className="font-body font-semibold text-body-l text-ink">{label}</Text>
        {subtitle && <Text className="font-mono text-mono-s text-ash mt-0.5">{subtitle}</Text>}
      </View>
      <IconArrow size={16} stroke={colors.ash} />
    </Pressable>
  );
}
