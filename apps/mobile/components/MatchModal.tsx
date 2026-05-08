import { IconArrow, colors } from '@4play/ui';
import { Modal, Pressable, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  onChat: () => void;
  onContinue: () => void;
};

export function MatchModal({ visible, onChat, onContinue }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onContinue}>
      <View
        className="flex-1 items-center justify-center px-8"
        style={{ backgroundColor: 'rgba(14,27,44,0.9)' }}
      >
        <Text
          className="font-mono uppercase"
          style={{ color: colors.lime, fontSize: 12, letterSpacing: 2.4 }}
        >
          ¡MATCH!
        </Text>
        <Text
          className="mt-3 font-display font-bold text-center"
          style={{ color: colors.cream, fontSize: 56, letterSpacing: -2.2, lineHeight: 56 }}
        >
          Es <Text style={{ color: colors.lime, fontStyle: 'italic' }}>recíproco</Text>.
        </Text>
        <Text
          className="mt-4 text-center"
          style={{ color: 'rgba(244,240,232,0.78)', fontSize: 15, lineHeight: 22 }}
        >
          Conversa, agenden la cancha y a jugar.
        </Text>

        <View className="mt-10 w-full gap-3">
          <Pressable
            onPress={onChat}
            className="rounded-pill flex-row items-center justify-between px-6 py-[18px]"
            style={{ backgroundColor: colors.lime }}
          >
            <Text style={{ color: colors.ink, fontWeight: '600', fontSize: 17 }}>Iniciar chat</Text>
            <IconArrow size={18} stroke={colors.ink} />
          </Pressable>
          <Pressable
            onPress={onContinue}
            className="rounded-pill px-6 py-[18px]"
            style={{ borderColor: 'rgba(244,240,232,0.3)', borderWidth: 1 }}
          >
            <Text className="text-center" style={{ color: colors.cream, fontSize: 16 }}>
              Seguir buscando
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
