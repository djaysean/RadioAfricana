import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
} from '@react-native-firebase/messaging';

async function requestNotificationPermission(): Promise<boolean> {
  if (
    Platform.OS !== 'android' ||
    Platform.Version < 33
  ) {
    return true;
  }

  const result =
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

  return (
    result ===
    PermissionsAndroid.RESULTS.GRANTED
  );
}

export async function initializeNotifications(): Promise<
  () => void
> {
  const permissionGranted =
    await requestNotificationPermission();

  if (!permissionGranted) {
    console.log(
      'Radio Africana notifications permission denied.',
    );

    return () => {};
  }

  const messaging =
    getMessaging();

  try {
    const token =
      await getToken(messaging);

    console.log(
      'Radio Africana FCM token:',
      token,
    );
  } catch (error) {
    console.error(
      'Failed to get Radio Africana FCM token:',
      error,
    );
  }

  const unsubscribeTokenRefresh =
    onTokenRefresh(
      messaging,
      (token: string) => {
        console.log(
          'Radio Africana FCM token refreshed:',
          token,
        );
      },
    );

  const unsubscribeMessage =
    onMessage(
      messaging,
      async remoteMessage => {
        console.log(
          'Radio Africana foreground notification:',
          remoteMessage,
        );
      },
    );

  return () => {
    unsubscribeTokenRefresh();
    unsubscribeMessage();
  };
}