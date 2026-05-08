import { IconArrow, colors } from '@4play/ui';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || password.length < 8) {
      Alert.alert('Faltan datos', 'Ingresa email y una contraseña de 8+ caracteres.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      Alert.alert('No pudimos registrarte', error.message);
      return;
    }
    if (!data.session) {
      Alert.alert('Confirma tu email', 'Te enviamos un correo para confirmar tu cuenta.');
      return;
    }
    router.replace('/(auth)/profile-setup');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-1 px-6 pt-8">
        <Text className="font-mono text-mono-m uppercase text-court tracking-[0.14em]">
          CREAR PERFIL
        </Text>
        <Text className="mt-1 font-display font-bold text-display-xs text-ink">Empezamos.</Text>
        <Text className="mt-2 text-body-s text-ash">Tu email y una contraseña para entrar.</Text>

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
            placeholder="mínimo 8 caracteres"
            secureTextEntry
          />
        </View>

        <Pressable
          onPress={onSubmit}
          disabled={loading}
          className="mt-8 bg-lime rounded-pill py-[18px] px-6 flex-row items-center justify-between"
        >
          {loading ? (
            <ActivityIndicator color={colors.ink} />
          ) : (
            <>
              <Text className="text-ink font-body font-semibold text-body-l">Crear cuenta</Text>
              <IconArrow size={18} stroke={colors.ink} />
            </>
          )}
        </Pressable>

        <View className="mt-6 flex-row justify-center gap-1">
          <Text className="text-body-s text-ash">¿Ya tienes cuenta?</Text>
          <Link href="/(auth)/login">
            <Text className="text-body-s text-court font-semibold">Iniciar sesión</Text>
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
