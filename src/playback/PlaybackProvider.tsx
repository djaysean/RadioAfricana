import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {StyleSheet} from 'react-native';

import Video from 'react-native-video';

import PlaybackContext from './PlaybackContext';

import {
  fetchNowPlaying,
  getCachedNowPlaying,
} from '../services/nowPlaying';

const STREAM_URL =
  'https://radioafricana.radioca.st/stream';

type Props = {
  children: React.ReactNode;
};

export default function PlaybackProvider({
  children,
}: Props) {
  const [isPlaying, setIsPlaying] =
    useState(false);

  const [playerKey, setPlayerKey] =
    useState(0);

  const [nowPlaying, setNowPlaying] =
    useState({
      artist: '',
      title: 'Radio Africana',
      picture: null as string | null,
    });

  useEffect(() => {
    let mounted = true;

    const restoreCachedNowPlaying =
      async () => {
        try {
          const cached =
            await getCachedNowPlaying();

          if (
            mounted &&
            cached
          ) {
            setNowPlaying(cached);
          }
        } catch (error) {
          console.error(
            'Cached Now Playing Error:',
            error,
          );
        }
      };

    const loadNowPlaying =
      async () => {
        try {
          const data =
            await fetchNowPlaying();

          if (mounted) {
            setNowPlaying(data);
          }
        } catch (error) {
          console.error(
            'Now Playing Error:',
            error,
          );
        }
      };

    restoreCachedNowPlaying();
    loadNowPlaying();

    const interval =
      setInterval(
        loadNowPlaying,
        5000,
      );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /*
   * --------------------------------------------------
   * PLAYBACK CONTROLS
   * --------------------------------------------------
   *
   * These callbacks are intentionally stable so that
   * screens using usePlayback() can safely coordinate
   * playback with navigation focus changes.
   */

  const play =
    useCallback(() => {
      setPlayerKey(
        current =>
          current + 1,
      );

      setIsPlaying(true);
    }, []);

  const pause =
    useCallback(() => {
      setIsPlaying(false);
    }, []);

  const toggle =
    useCallback(() => {
      setIsPlaying(current => {
        if (!current) {
          setPlayerKey(
            key => key + 1,
          );
        }

        return !current;
      });
    }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      nowPlaying,
      play,
      pause,
      toggle,
    }),
    [
      isPlaying,
      nowPlaying,
      play,
      pause,
      toggle,
    ],
  );

  return (
    <PlaybackContext.Provider
      value={value}
    >
      {children}

      {isPlaying && (
        <Video
          key={playerKey}
          source={{
            uri: STREAM_URL,

            metadata: {
              title:
                nowPlaying.title ||
                'Radio Africana',

              subtitle:
                'Radio Africana',

              artist:
                nowPlaying.artist ||
                'Radio Africana',

              description:
                nowPlaying.artist
                  ? `${nowPlaying.artist} • Radio Africana`
                  : 'Live Radio',

              imageUri:
                nowPlaying.picture ??
                undefined,
            },
          }}
          paused={!isPlaying}
          playInBackground
          playWhenInactive
          showNotificationControls
          ignoreSilentSwitch="ignore"
          onError={error => {
            console.error(
              'Playback Error:',
              error,
            );

            setIsPlaying(false);
          }}
          style={styles.hiddenPlayer}
        />
      )}
    </PlaybackContext.Provider>
  );
}

const styles =
  StyleSheet.create({
    hiddenPlayer: {
      width: 0,
      height: 0,
    },
  });