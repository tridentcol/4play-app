import type { TablesInsert } from '@4play/core';
import { reportReasonSchema } from '@4play/core';
import { IconArrow, colors } from '@4play/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthState } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

const REASONS: { id: string; label: string; description: string }[] = [
  { id: 'spam', label: 'Spam', description: 'Mensajes repetidos o publicidad' },
  { id: 'harassment', label: 'Acoso', description: 'Comportamiento agresivo o intimidante' },
  { id: 'fake', label: 'Perfil falso', description: 'No parece una persona real' },
  {
    id: 'inappropriate_content',
    label: 'Contenido inapropiado',
    description: 'Fotos o mensajes ofensivos',
  },
  { id: 'other', label: 'Otro', description: 'Cuéntanos en el espacio de abajo' },
];

export default function Report() {
  const { reportedId, messageId } = useLocalSearchParams<{
    reportedId?: string;
    messageId?: string;
  }>();
  const auth = useAuthState();
  const userId = auth.status === 'authenticated' ? auth.session.user.id : undefined;
  const [reason, setReason] = useState<string>('spam');
  const [context, setContext] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!userId || !reportedId) {
      Alert.alert('Faltan datos', 'No pudimos identificar a quién reportas.');
      return;
    }
    const parsed = reportReasonSchema.safeParse(reason);
    if (!parsed.success) {
      Alert.alert('Razón inválida', 'Selecciona una razón válida.');
      return;
    }

    setSubmitting(true);
    const payload: TablesInsert<'reports'> = {
      reporter_id: userId,
      reported_id: reportedId,
      reason: parsed.data,
      context: context.trim() || null,
      message_id: messageId ?? null,
    };
    const { error } = await supabase.from('reports').insert(payload);
    setSubmitting(false);
    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
    Alert.alert('Reporte enviado', 'Gracias por avisarnos. Lo revisaremos pronto.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Text className="font-display font-bold text-display-xs text-ink">Reportar</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-body-l text-ash">Cancelar</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <Text className="text-body-s text-ash">
          Tu reporte es anónimo. Lo revisamos en menos de 24 horas.
        </Text>

        <View className="gap-2">
          {REASONS.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => setReason(r.id)}
              className="rounded-card p-4"
              style={{
                backgroundColor: reason === r.id ? colors.ink : colors.bone,
                borderColor: reason === r.id ? colors.ink : colors.line,
                borderWidth: 1,
              }}
            >
              <Text
                className="font-body font-semibold text-body-l"
                style={{ color: reason === r.id ? colors.cream : colors.ink }}
              >
                {r.label}
              </Text>
              <Text
                className="text-body-s mt-0.5"
                style={{
                  color: reason === r.id ? 'rgba(244,240,232,0.7)' : colors.ash,
                }}
              >
                {r.description}
              </Text>
            </Pressable>
          ))}
        </View>

        <View>
          <Text className="font-mono text-mono-s uppercase text-ash mb-2 tracking-mono">
            Contexto adicional (opcional)
          </Text>
          <TextInput
            value={context}
            onChangeText={setContext}
            multiline
            numberOfLines={4}
            placeholder="Cuéntanos lo que pasó…"
            placeholderTextColor={colors.ash}
            className="rounded-card bg-bone px-4 py-3 text-body-l text-ink"
            style={{
              borderColor: colors.line,
              borderWidth: 1,
              minHeight: 100,
              textAlignVertical: 'top',
            }}
          />
        </View>

        <Pressable
          onPress={submit}
          disabled={submitting}
          className="rounded-pill py-[16px] flex-row items-center justify-between px-5"
          style={{ backgroundColor: colors.coral }}
        >
          {submitting ? (
            <ActivityIndicator color={colors.cream} />
          ) : (
            <>
              <Text className="text-cream font-body font-semibold text-body-l">Enviar reporte</Text>
              <IconArrow size={18} stroke={colors.cream} />
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
