import { colors } from '@4play/ui';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFilters } from '../../lib/filters';

const RADII = [3, 5, 10, 20, 50];

export default function Filters() {
  const f = useFilters();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Text className="font-display font-bold text-display-xs text-ink">Filtros</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-body-l text-ash">Listo</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 28 }}>
        <Section title="Deporte">
          <View className="flex-row gap-2">
            {(['tennis', 'padel'] as const).map((s) => (
              <Pressable
                key={s}
                onPress={() => f.set({ sport: s })}
                className="flex-1 rounded-card items-center px-4 py-3"
                style={{
                  backgroundColor: f.sport === s ? colors.ink : colors.bone,
                  borderColor: f.sport === s ? colors.ink : colors.line,
                  borderWidth: 1,
                }}
              >
                <Text
                  className="font-body font-semibold"
                  style={{ color: f.sport === s ? colors.cream : colors.ink, fontSize: 15 }}
                >
                  {s === 'tennis' ? 'Tenis' : 'Pádel'}
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Section title={`Radio · ${f.radiusKm} km`}>
          <View className="flex-row flex-wrap gap-2">
            {RADII.map((r) => (
              <Pressable
                key={r}
                onPress={() => f.set({ radiusKm: r })}
                className="rounded-pill px-4 py-2"
                style={{
                  backgroundColor: f.radiusKm === r ? colors.lime : colors.bone,
                  borderColor: f.radiusKm === r ? colors.lime : colors.line,
                  borderWidth: 1,
                }}
              >
                <Text className="font-mono" style={{ color: colors.ink, fontSize: 12 }}>
                  {r} km
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Section title={`Nivel · ${f.minLevel.toFixed(1)} – ${f.maxLevel.toFixed(1)}`}>
          <View>
            <Text className="font-mono text-mono-s uppercase text-ash mb-2">MÍNIMO</Text>
            <LevelRow
              value={f.minLevel}
              onChange={(v) => f.set({ minLevel: Math.min(v, f.maxLevel) })}
            />
            <Text className="font-mono text-mono-s uppercase text-ash mb-2 mt-4">MÁXIMO</Text>
            <LevelRow
              value={f.maxLevel}
              onChange={(v) => f.set({ maxLevel: Math.max(v, f.minLevel) })}
            />
          </View>
        </Section>

        <Pressable onPress={() => f.reset()} className="rounded-pill items-center py-3">
          <Text className="text-body-s text-ash">Restaurar valores</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text className="font-mono text-mono-s uppercase text-ash mb-2 tracking-mono">{title}</Text>
      {children}
    </View>
  );
}

function LevelRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const levels = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0];
  return (
    <View className="flex-row flex-wrap gap-1.5">
      {levels.map((l) => (
        <Pressable
          key={l}
          onPress={() => onChange(l)}
          className="rounded-pill px-3 py-1.5"
          style={{
            backgroundColor: value === l ? colors.ink : colors.bone,
            borderColor: value === l ? colors.ink : colors.line,
            borderWidth: 1,
          }}
        >
          <Text
            className="font-mono"
            style={{ color: value === l ? colors.cream : colors.ink, fontSize: 12 }}
          >
            {l.toFixed(1)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
