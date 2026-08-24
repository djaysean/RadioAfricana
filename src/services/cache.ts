import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCachedJson<T>(
  key: string,
): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function setCachedJson<T>(
  key: string,
  value: T,
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value),
    );
  } catch {
    // Cache failures must never interrupt app operation.
  }
}

export async function removeCachedValue(
  key: string,
): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Cache failures must never interrupt app operation.
  }
}