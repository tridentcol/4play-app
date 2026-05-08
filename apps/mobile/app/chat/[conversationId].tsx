import { track } from '@4play/core';
import { IconCalendar, IconSend, colors } from '@4play/ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoPlaceholder } from '../../components/PhotoPlaceholder';
import { useAuthState } from '../../lib/auth';
import {
  type Message,
  markRead,
  useChatPresence,
  useMessages,
  useSendMessage,
} from '../../lib/chat';

export default function ChatDetail() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const auth = useAuthState();
  const userId = auth.status === 'authenticated' ? auth.session.user.id : undefined;
  const { data: messages, isLoading } = useMessages(conversationId);
  const send = useSendMessage(conversationId, userId);
  const { typing, online, broadcastTyping } = useChatPresence(conversationId, userId);
  const [body, setBody] = useState('');
  const listRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (conversationId && userId) {
      void markRead(conversationId, userId);
    }
  }, [conversationId, userId]);

  useEffect(() => {
    if (messages?.length) {
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  }, [messages?.length]);

  const onSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setBody('');
    try {
      await send.mutateAsync(trimmed);
      track('message_sent', { conversation_id: conversationId });
    } catch {
      setBody(trimmed);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View
          className="flex-row items-center gap-3 px-4 py-3"
          style={{
            backgroundColor: colors.bone,
            borderBottomColor: colors.line,
            borderBottomWidth: 1,
          }}
        >
          <View className="overflow-hidden rounded-pill" style={{ width: 38, height: 38 }}>
            <PhotoPlaceholder tone="coral" style={{ width: 38, height: 38, padding: 0 }}>
              {' '}
            </PhotoPlaceholder>
          </View>
          <View className="flex-1">
            <Text className="font-body font-semibold text-ink text-body-m">Conversación</Text>
            <Text className="font-mono text-mono-s text-court mt-0.5">
              {typing ? '● ESCRIBIENDO…' : online ? '● ACTIVO' : '○ FUERA'}
            </Text>
          </View>
          <View
            className="rounded-pill items-center justify-center"
            style={{
              width: 36,
              height: 36,
              backgroundColor: colors.cream,
              borderColor: colors.line,
              borderWidth: 1,
            }}
          >
            <IconCalendar size={16} stroke={colors.ink} />
          </View>
        </View>

        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color={colors.court} />
          </View>
        )}

        {!isLoading && (
          <FlatList
            ref={listRef}
            data={messages ?? []}
            keyExtractor={(m) => m.id}
            contentContainerStyle={{ padding: 16, gap: 10 }}
            renderItem={({ item }) => <Bubble msg={item} mine={item.sender_id === userId} />}
          />
        )}

        <View
          className="flex-row items-center gap-2 px-3.5 py-2.5"
          style={{ backgroundColor: colors.bone, borderTopColor: colors.line, borderTopWidth: 1 }}
        >
          <View
            className="flex-1 rounded-pill px-4 py-2.5"
            style={{ backgroundColor: colors.cream, borderColor: colors.line, borderWidth: 1 }}
          >
            <TextInput
              value={body}
              onChangeText={(v) => {
                setBody(v);
                void broadcastTyping();
              }}
              onSubmitEditing={() => void onSubmit()}
              placeholder="Escribe un mensaje…"
              placeholderTextColor={colors.ash}
              style={{ color: colors.ink, fontSize: 14 }}
              multiline
            />
          </View>
          <Pressable
            onPress={() => void onSubmit()}
            disabled={!body.trim() || send.isPending}
            className="items-center justify-center rounded-pill"
            style={{
              width: 40,
              height: 40,
              backgroundColor: colors.lime,
              opacity: !body.trim() || send.isPending ? 0.5 : 1,
            }}
          >
            <IconSend size={18} stroke={colors.ink} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Bubble({ msg, mine }: { msg: Message; mine: boolean }) {
  const time = msg.created_at
    ? new Date(msg.created_at).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    : '';
  return (
    <View style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
      <View
        style={{
          backgroundColor: mine ? colors.ink : colors.bone,
          borderColor: mine ? 'transparent' : colors.line,
          borderWidth: mine ? 0 : 1,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 18,
          borderBottomRightRadius: mine ? 6 : 18,
          borderBottomLeftRadius: mine ? 18 : 6,
        }}
      >
        <Text style={{ color: mine ? colors.cream : colors.ink, fontSize: 14, lineHeight: 20 }}>
          {msg.body}
        </Text>
      </View>
      {time && (
        <Text
          style={{
            color: colors.ash,
            fontSize: 9,
            letterSpacing: 0.6,
            marginTop: 4,
            textAlign: mine ? 'right' : 'left',
          }}
        >
          {time}
        </Text>
      )}
    </View>
  );
}
