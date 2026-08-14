import {createContext, useContext} from 'react';

export type NowPlaying = {
  artist: string;
  title: string;
  picture: string | null;
};

export type PlaybackContextValue = {
  isPlaying: boolean;
  nowPlaying: NowPlaying;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const PlaybackContext =
  createContext<
    PlaybackContextValue | undefined
  >(undefined);

export function usePlayback() {
  const context =
    useContext(PlaybackContext);

  if (!context) {
    throw new Error(
      'usePlayback must be used within a PlaybackProvider',
    );
  }

  return context;
}

export default PlaybackContext;