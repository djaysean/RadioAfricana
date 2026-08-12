import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

import PlaybackContext from './PlaybackContext';

import { fetchNowPlaying } from '../services/nowPlaying';

const STREAM_URL = 'https://radioafricana.radioca.st/stream';

type Props = {
  children: React.ReactNode;
};

export default function PlaybackProvider({
  children,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  const [nowPlaying, setNowPlaying] = useState({
    artist: '',
    title: 'Radio Africana',
    picture: null as string | null,
  });

  useEffect(() => {
    let mounted = true;

    const loadNowPlaying = async () => {
      try {
        const data = await fetchNowPlaying();

        if (mounted) {
          setNowPlaying(data);
        }
      } catch (error) {
        console.log('Now Playing Error:', error);
      }
    };

    loadNowPlaying();

    const interval = setInterval(loadNowPlaying, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const play = () => {
    setPlayerKey(current => current + 1);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const toggle = () => {
    setIsPlaying(current => {
      if (!current) {
        setPlayerKey(key => key + 1);
      }

      return !current;
    });
  };

  const value = useMemo(
    () => ({
      isPlaying,
      play,
      pause,
      toggle,
    }),
    [isPlaying],
  );

  return (
    <PlaybackContext.Provider value={value}>
      {children}

      <Video
        key={playerKey}
        source={{
          uri: STREAM_URL,
          metadata: {
            title: nowPlaying.title || 'Radio Africana',
            subtitle: 'Radio Africana',
            artist: nowPlaying.artist || 'Radio Africana',
            description: nowPlaying.artist
              ? `${nowPlaying.artist} • Radio Africana`
              : 'Live Radio',
            imageUri: nowPlaying.picture ?? undefined,
          },
        }}
        paused={!isPlaying}
        playInBackground
        playWhenInactive
        showNotificationControls
        ignoreSilentSwitch="ignore"
        onError={error => {
          console.log('Playback Error:', error);
          setIsPlaying(false);
        }}
        onLoad={() => {
          console.log('Radio stream connected');
        }}
        onBuffer={({ isBuffering }) => {
          console.log(
            isBuffering
              ? 'Radio buffering...'
              : 'Radio buffer complete',
          );
        }}
        style={styles.hiddenPlayer}
      />
    </PlaybackContext.Provider>
  );
}

const styles = StyleSheet.create({
  hiddenPlayer: {
    width: 0,
    height: 0,
  },
});