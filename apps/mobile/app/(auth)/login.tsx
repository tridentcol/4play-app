import { IconArrow, colors } from '@4play/ui';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Faltan datos', 'Ingresa email y contraseña.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      Alert.alert('No pudimos entrar', error.message);
      return;
    }
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-1 px-6 pt-8">
        <Text className="font-mono text-mono-m uppercase text-court tracking-[0.14em]">
          INICIAR SESIÓN
        </Text>
        <Text className="mt-1 font-display font-bold text-display-xs text-ink">¿De vuelta?</Text>
        <Text className="mt-2 text-body-s text-ash">Entra para seguir jugando.</Text>

        <View className="mt-8 gap-4">
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.co"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Field
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="•••••••"
            secureTextEntry
          />
        </View>

        <Pressable
          onPress={onSubmit}
          disabled={loading}
          className="mt-8 bg-ink rounded-pill py-[18px] px-6 flex-row items-center justify-between"
        >
          {loading ? (
            <ActivityIndicator color={colors.lime} />
          ) : (
            <>
              <Text className="text-cream font-body font-semibold text-body-l">Entrar</Text>
              <IconArrow size={18} stroke={colors.lime} />
            </>
          )}
        </Pressable>

        <View className="mt-6 flex-row justify-center gap-1">
          <Text className="text-body-s text-ash">¿No tienes cuenta?</Text>
          <Link href="/(auth)/register">
            <Text className="text-body-s text-court font-semibold">Crear perfil</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View>
      <Text className="font-mono text-mono-s uppercase text-ash mb-2">{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.ash}
        className="bg-bone rounded-card px-4 py-3.5 text-body-l text-ink"
        style={{ borderWidth: 1, borderColor: colors.line }}
      />
    </View>
  );
}
