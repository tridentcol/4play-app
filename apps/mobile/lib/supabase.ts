import 'react-native-url-polyfill/auto';
import type { Database } from '@4play/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { env } from './env';

/**
 * Storage adapter for Supabase auth.
 *
 * Auth tokens (access_token / refresh_token) live in SecureStore (Keychain on
 * iOS, EncryptedSharedPreferences on Android) so they're not extractable from
 * disk. Everything else falls back to AsyncStorage. SecureStore values are
 * capped at ~2 KB so we keep it for tokens only.
 *
 * On web, both APIs degrade — `@supabase/supabase-js` defaults to localStorage,
 * so we hand it `undefined` and let it pick its default.
 */
const TOKEN_KEYS = ['supabase.auth.token', 'sb-auth-token'];
const isToken = (key: string) =>
  TOKEN_KEYS.some((k) => key.startsWith(k)) || key.includes('-auth-token');

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (isToken(key)) {
      return await SecureStore.getItemAsync(key);
    }
    return await AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (isToken(key)) {
      await SecureStore.setItemAsync(key, value);
      return;
    }
    await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (isToken(key)) {
      await SecureStore.deleteItemAsync(key);
      return;
    }
    await AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? undefined : ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
