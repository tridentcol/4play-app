import { colors } from '@4play/ui';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoPlaceholder } from '../../components/PhotoPlaceholder';
import { useAuthState } from '../../lib/auth';
import { type ConversationListItem, useConversations } from '../../lib/chat';

export default function ChatList() {
  const auth = useAuthState();
  const userId = auth.status === 'authenticated' ? auth.session.user.id : undefined;
  const { data, isLoading } = useConversations(userId);

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <View className="px-5 pt-2 pb-2">
        <Text className="font-mono text-mono-m uppercase text-court tracking-mono">
          CONVERSACIONES
        </Text>
        <Text className="mt-1 font-display font-bold text-display-xs text-ink">Tus matches</Text>
      </View>

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.court} />
        </View>
      )}

      {!isLoading && data && data.length === 0 && (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="font-display font-bold text-display-xs text-ink text-center">
            Aún no hay matches
          </Text>
          <Text className="mt-2 max-w-[280px] text-body-s text-ash text-center">
            Empieza a hacer swipe para conocer jugadores cerca tuyo.
          </Text>
        </View>
      )}

      {data && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.conversation.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          renderItem={({ item }) => <ConversationRow item={item} />}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 4 }} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function ConversationRow({ item }: { item: ConversationListItem }) {
  return (
    <Link
      href={{
        pathname: '/chat/[conversationId]',
        params: { conversationId: item.conversation.id },
      }}
      asChild
    >
      <Pressable className="flex-row items-center gap-3 py-3">
        <View
          className="overflow-hidden rounded-pill"
          style={{ width: 52, height: 52, backgroundColor: colors.bone }}
        >
          <PhotoPlaceholder tone="coral" style={{ width: 52, height: 52, padding: 0 }}>
            {' '}
          </PhotoPlaceholder>
        </View>
        <View className="flex-1">
          <Text className="font-body font-semibold text-ink text-body-l" numberOfLines={1}>
            {item.other.full_name}
          </Text>
          <Text className="text-body-s text-ash" numberOfLines={1}>
            {item.conversation.last_message_preview ?? 'Empieza la conversación'}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
