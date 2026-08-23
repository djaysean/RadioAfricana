import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '@react-native-firebase/messaging';

import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

const FOREGROUND_CHANNEL_ID =
  'radio-africana-foreground';

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

async function createForegroundChannel(): Promise<void> {
  if (Platform.OS !== 'android') {
    return;
  }

  await notifee.createChannel({
    id: FOREGROUND_CHANNEL_ID,
    name: 'Radio Africana',
    importance: AndroidImportance.DEFAULT,
  });
}

export async function initializeNotifications(): Promise<
  () => void
> {
  /*
   * iOS Firebase Messaging initialization is currently
   * disabled. Do not invoke the native Firebase Messaging
   * module on iOS until iOS notification support is explicitly
   * enabled and verified.
   */
  if (Platform.OS === 'ios') {
    return () => {};
  }

  const permissionGranted =
    await requestNotificationPermission();

  if (!permissionGranted) {
    return () => {};
  }

  const messaging =
    getMessaging();

  try {
    await getToken(messaging);
  } catch (error) {
    console.error(
      'Failed to get Radio Africana FCM token:',
      error,
    );
  }

  await createForegroundChannel();

  const unsubscribeTokenRefresh =
    onTokenRefresh(
      messaging,
      (_token: string) => {},
    );

  const unsubscribeMessage =
    onMessage(
      messaging,
      async remoteMessage => {
        const title =
          remoteMessage.notification?.title ??
          'Radio Africana';

        const body =
          remoteMessage.notification?.body ??
          'You have a new notification.';

        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId:
              FOREGROUND_CHANNEL_ID,
            pressAction: {
              id: 'default',
            },
          },
        });
      },
    );

  return () => {
    unsubscribeTokenRefresh();
    unsubscribeMessage();
  };
}

export async function subscribeToShow(
  topic: string,
): Promise<void> {
  const trimmedTopic = topic.trim();

  if (!trimmedTopic) {
    throw new Error(
      'Cannot subscribe to an empty Firebase topic.',
    );
  }

  /*
   * iOS Firebase Messaging topic subscriptions are currently
   * disabled. Do not invoke the native messaging module on iOS
   * until iOS notification support is explicitly enabled and
   * verified.
   */
  if (Platform.OS === 'ios') {
    return;
  }

  const messaging =
    getMessaging();

  await subscribeToTopic(
    messaging,
    trimmedTopic,
  );
}

export async function unsubscribeFromShow(
  topic: string,
): Promise<void> {
  const trimmedTopic = topic.trim();

  if (!trimmedTopic) {
    throw new Error(
      'Cannot unsubscribe from an empty Firebase topic.',
    );
  }

  /*
   * iOS Firebase Messaging topic subscriptions are currently
   * disabled. Do not invoke the native messaging module on iOS
   * until iOS notification support is explicitly enabled and
   * verified.
   */
  if (Platform.OS === 'ios') {
    return;
  }

  const messaging =
    getMessaging();

  await unsubscribeFromTopic(
    messaging,
    trimmedTopic,
  );
}