import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Centralized haptics so the same swipe/match/booking moments use a
 * consistent intensity across the app. No-op on web.
 *
 * Mapping (BLUEPRINT 19):
 *   tap      → Light  (chip select, switch tab)
 *   choose   → Medium (swipe direction picked)
 *   success  → Notification.Success (match!, booking confirmed)
 *   warning  → Notification.Warning (validation error)
 *   error    → Notification.Error (request failed)
 */
export const haptics = {
  tap: () => {
    if (Platform.OS === 'web') return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  choose: () => {
    if (Platform.OS === 'web') return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },
  success: () => {
    if (Platform.OS === 'web') return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  warning: () => {
    if (Platform.OS === 'web') return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },
  error: () => {
    if (Platform.OS === 'web') return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
};
