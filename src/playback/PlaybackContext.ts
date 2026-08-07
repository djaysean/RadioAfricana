import { createContext, useContext } from 'react';

export type PlaybackContextValue = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const PlaybackContext = createContext<PlaybackContextValue | undefined>(
  undefined,
);

export function usePlayback() {
  const context = useContext(PlaybackContext);

  if (!context) {
    throw new Error(
      'usePlayback must be used within a PlaybackProvider',
    );
  }

  return context;
}

export default PlaybackContext;