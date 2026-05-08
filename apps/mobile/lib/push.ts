import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { supabase } from './supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const EXPO_PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID;

export async function registerForPushNotificationsAsync(profileId: string): Promise<string | null> {
  if (!Device.isDevice) {
    console.warn('Push notifications only work on physical devices');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D4FF3A',
    });
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync(
      EXPO_PROJECT_ID ? { projectId: EXPO_PROJECT_ID } : undefined,
    );
    await supabase.from('push_tokens').upsert(
      {
        profile_id: profileId,
        token: token.data,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      },
      { onConflict: 'profile_id,token' },
    );
    return token.data;
  } catch (e) {
    console.warn('Could not get Expo push token', e);
    return null;
  }
}

/** Resolves the deep-link target for a payload from push-fanout. */
export function resolveDeepLink(data: Record<string, unknown> | null | undefined): string | null {
  if (!data) return null;
  const kind = data.kind;
  if (kind === 'match' && typeof data.conversation_id === 'string') {
    return `/chat/${data.conversation_id}`;
  }
  if (kind === 'message' && typeof data.conversation_id === 'string') {
    return `/chat/${data.conversation_id}`;
  }
  if (kind === 'booking_confirmed' || kind === 'booking_reminder') {
    if (typeof data.booking_id === 'string') {
      return `/booking/${data.booking_id}/checkout`;
    }
    return '/(tabs)/calendar';
  }
  return null;
}
