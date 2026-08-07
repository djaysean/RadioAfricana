import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

import PlaybackContext from './PlaybackContext';

const STREAM_URL = 'https://radioafricana.radioca.st/stream';

type Props = {
  children: React.ReactNode;
};

export default function PlaybackProvider({
  children,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const toggle = () => {
    setIsPlaying(current => !current);
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
        source={{ uri: STREAM_URL }}
        paused={!isPlaying}
        playInBackground
        playWhenInactive
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