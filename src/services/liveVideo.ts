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

const FIREBASE_PROJECT_ID =
  'radio-africana';

const FIRESTORE_REST_URL =
  `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${LIVE_STREAM_COLLECTION}/${YOUTUBE_DOCUMENT}`;

const IOS_POLL_INTERVAL_MS =
  10000;

export type LiveVideo = {
  platform: 'youtube';
  link: string;
};

function parseLiveVideoResponse(
  responseData: any,
): LiveVideo | null {
  const link =
    typeof responseData?.fields?.link?.stringValue === 'string'
      ? responseData.fields.link.stringValue.trim()
      : '';

  if (!link) {
    return null;
  }

  return {
    platform: 'youtube',
    link,
  };
}

function subscribeToLiveVideoIOS(
  onUpdate: (
    video: LiveVideo | null,
  ) => void,
): () => void {
  let active = true;
  let hasReceivedSuccessfulResponse = false;

  const fetchLiveVideo =
    async () => {
      try {
        const response =
          await fetch(
            FIRESTORE_REST_URL,
            {
              method: 'GET',
              headers: {
                Accept:
                  'application/json',
              },
            },
          );

        if (!active) {
          return;
        }

        /*
         * A missing Firestore document is a valid
         * "not live" state.
         */
        if (response.status === 404) {
          hasReceivedSuccessfulResponse = true;
          onUpdate(null);
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Firestore REST request failed with HTTP ${response.status}`,
          );
        }

        const data =
          await response.json();

        if (!active) {
          return;
        }

        hasReceivedSuccessfulResponse = true;

        onUpdate(
          parseLiveVideoResponse(data),
        );
      } catch (error) {
        console.error(
          'Failed to read Radio Africana live video:',
          error,
        );

        /*
         * Do not remove an already-visible WATCH LIVE
         * button just because one network request failed.
         *
         * On the initial request, HomeScreen already has
         * a null live-video state, so there is nothing to
         * clear.
         */
        if (
          active &&
          !hasReceivedSuccessfulResponse
        ) {
          onUpdate(null);
        }
      }
    };

  /*
   * Fetch immediately when HomeScreen subscribes.
   */
  fetchLiveVideo();

  /*
   * Firestore's onSnapshot() gave us real-time updates
   * on Android. iOS uses a lightweight HTTPS poll instead
   * so it does not initialize the native Firestore module.
   */
  const interval =
    setInterval(
      fetchLiveVideo,
      IOS_POLL_INTERVAL_MS,
    );

  return () => {
    active = false;
    clearInterval(interval);
  };
}

export function subscribeToLiveVideo(
  onUpdate: (
    video: LiveVideo | null,
  ) => void,
): () => void {
  /*
   * iOS deliberately avoids @react-native-firebase/firestore.
   *
   * The Firestore REST endpoint provides the same single
   * document read without loading the native Firestore
   * TurboModule that has been implicated in the iOS startup
   * crash investigation.
   */
  if (Platform.OS === 'ios') {
    return subscribeToLiveVideoIOS(
      onUpdate,
    );
  }

  /*
   * Android retains the existing, already-working
   * Firestore realtime listener.
   */
  const firestore =
    getFirestore();

  const youtubeDocument =
    doc(
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