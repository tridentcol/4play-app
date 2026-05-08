/**
 * Custom bottom-tab bar matching the BottomNav from design/screens.jsx.
 * Reused by (tabs)/_layout via tabBar prop.
 */
import { IconCalendar, IconChat, IconHome, IconSearch, IconUser, colors } from '@4play/ui';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS = {
  index: IconHome,
  swipe: IconSearch,
  calendar: IconCalendar,
  chat: IconChat,
  profile: IconUser,
} as const;

type IconKey = keyof typeof ICONS;

export function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors.bone,
        borderTopColor: colors.line,
        borderTopWidth: 1,
        paddingTop: 12,
        paddingBottom: Math.max(insets.bottom, 12),
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const IconCmp = ICONS[route.name as IconKey] ?? IconHome;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? colors.court : 'transparent',
            }}
          >
            <IconCmp size={22} stroke={focused ? colors.lime : colors.ash} />
          </Pressable>
        );
      })}
    </View>
  );
}
