import {
  Platform,
} from 'react-native';

import {
  doc,
  getFirestore,
  onSnapshot,
} from '@react-native-firebase/firestore';

const LIVE_STREAM_COLLECTION =
  'liveStream';

const YOUTUBE_DOCUMENT =
  'youtube';

export type LiveVideo = {
  platform: 'youtube';
  link: string;
};

export function subscribeToLiveVideo(
  onUpdate: (
    video: LiveVideo | null,
  ) => void,
): () => void {
  /*
   * iOS Firestore initialization is intentionally
   * disabled for this diagnostic build.
   *
   * Build 6.0.0 (4) continued to crash immediately
   * after launch after Firebase Messaging initialization
   * had already been disabled on iOS.
   *
   * HomeScreen is the only caller of this service.
   * Returning a no-op unsubscribe prevents the native
   * Firestore TurboModule from being invoked on iOS.
   */
  if (Platform.OS === 'ios') {
    return () => {};
  }

  const firestore =
    getFirestore();

  const youtubeDocument = doc(
    firestore,
    LIVE_STREAM_COLLECTION,
    YOUTUBE_DOCUMENT,
  );

  return onSnapshot(
    youtubeDocument,
    snapshot => {
      if (!snapshot.exists) {
        onUpdate(null);
        return;
      }

      const data =
        snapshot.data();

      const link =
        typeof data?.link === 'string'
          ? data.link.trim()
          : '';

      if (!link) {
        onUpdate(null);
        return;
      }

      onUpdate({
        platform: 'youtube',
        link,
      });
    },
    error => {
      console.error(
        'Failed to listen for Radio Africana live video:',
        error,
      );

      onUpdate(null);
    },
  );
}