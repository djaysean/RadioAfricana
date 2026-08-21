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
  const firestore =
    getFirestore();

  /*
   * Diagnostic:
   *
   * Android continues through the complete Firestore
   * listener implementation below.
   *
   * On iOS, stop immediately after getFirestore().
   * This isolates getFirestore() from doc()/onSnapshot()
   * so we can determine which native Firestore operation
   * is triggering the iOS crash.
   */
  if (Platform.OS === 'ios') {
    return () => {};
  }

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