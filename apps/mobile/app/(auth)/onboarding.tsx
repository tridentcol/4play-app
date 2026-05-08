import { IconArrow, LogoMark, colors } from '@4play/ui';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line, Rect } from 'react-native-svg';

export default function Onboarding() {
  return (
    <View className="flex-1 bg-court">
      <Svg
        viewBox="0 0 390 600"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
      >
        <Rect
          x="20"
          y="60"
          width="350"
          height="540"
          rx="2"
          stroke={colors.lime}
          strokeWidth="1.5"
          fill="none"
        />
        <Line x1="20" y1="200" x2="370" y2="200" stroke={colors.lime} strokeWidth="1.5" />
        <Line x1="20" y1="460" x2="370" y2="460" stroke={colors.lime} strokeWidth="1.5" />
        <Line x1="195" y1="60" x2="195" y2="600" stroke={colors.lime} strokeWidth="1.5" />
      </Svg>

      <SafeAreaView className="flex-1 px-7 pb-7" edges={['top', 'bottom']}>
        <View className="flex-1 justify-between pt-8">
          <View>
            <LogoMark size={56} color={colors.cream} ball={colors.lime} />
            <View className="mt-14">
              <Text className="font-mono text-mono-m uppercase text-lime tracking-[0.18em] mb-4">
                CARTAGENA · 2026
              </Text>
              <Text
                className="font-display font-bold text-cream"
                style={{ fontSize: 56, lineHeight: 56, letterSpacing: -2.2 }}
              >
                Encuentra <Text style={{ color: colors.lime, fontStyle: 'italic' }}>tu match</Text>{' '}
                en la cancha.
              </Text>
              <Text
                className="mt-5 text-body-l"
                style={{ color: 'rgba(244,240,232,0.78)', lineHeight: 24, maxWidth: 300 }}
              >
                Tenis y pádel para la comunidad costera. Encuentra rivales de tu nivel, agenda
                canchas y juega más.
              </Text>
            </View>
          </View>

          <View className="gap-3">
            <Link href="/(auth)/register" asChild>
              <Pressable className="bg-lime rounded-pill py-[18px] px-6 flex-row items-center justify-between">
                <Text className="text-ink font-body font-semibold text-body-l">
                  Crear mi perfil
                </Text>
                <IconArrow size={18} stroke={colors.ink} />
              </Pressable>
            </Link>
            <Link href="/(auth)/login" asChild>
              <Pressable
                className="rounded-pill py-[18px] px-6"
                style={{ borderColor: 'rgba(244,240,232,0.3)', borderWidth: 1 }}
              >
                <Text className="text-cream font-body font-medium text-body-l text-center">
                  Ya tengo cuenta
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
