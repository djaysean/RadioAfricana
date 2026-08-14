import React, {
  useEffect,
  useState,
} from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import AppText from './ui/AppText';

import {
  usePlayback,
} from '../playback/PlaybackContext';

import {
  fetchUpNext,
  UpNext,
} from '../services/upNext';

export default function MiniPlayer() {
  const {
    isPlaying,
    nowPlaying,
    toggle,
  } = usePlayback();

  const [upNext, setUpNext] =
    useState<UpNext | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadUpNext = async () => {
      try {
        const data =
          await fetchUpNext();

        if (mounted) {
          setUpNext(data);
        }
      } catch (error) {
        console.error(
          'Failed to load Up Next:',
          error,
        );
      }
    };

    loadUpNext();

    const interval = setInterval(
      loadUpNext,
      15000,
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const artwork: ImageSourcePropType =
    nowPlaying.picture
      ? {uri: nowPlaying.picture}
      : require('../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <Image
        source={artwork}
        style={styles.artwork}
      />

      <View style={styles.info}>
        <AppText
          variant="bodySmall"
          numberOfLines={1}
          style={styles.title}
        >
          {nowPlaying.title}
        </AppText>

        <AppText
          variant="meta"
          numberOfLines={1}
          style={styles.artist}
        >
          {nowPlaying.artist}
        </AppText>

        <AppText
          variant="label"
          numberOfLines={1}
          style={styles.status}
        >
          {isPlaying ? '● LIVE' : '● READY'}
        </AppText>

        <View style={styles.upNextRow}>
          <AppText
            variant="meta"
            numberOfLines={1}
            style={styles.upNextLabel}
          >
            Up Next:
          </AppText>

          <AppText
            variant="meta"
            numberOfLines={1}
            style={styles.upNextTrack}
          >
            {upNext &&
            upNext.artist &&
            upNext.title
              ? ` ${upNext.artist} - ${upNext.title}`
              : ' Loading...'}
          </AppText>
        </View>
      </View>

      <TouchableOpacity
        onPress={toggle}
        style={styles.button}
        activeOpacity={0.8}
      >
        <AppText
          variant="button"
          style={styles.icon}
        >
          {isPlaying ? '❚❚' : '▶'}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderTopWidth:
      StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
  },

  artwork: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
  },

  info: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },

  title: {
    color: Colors.text,
  },

  artist: {
    color: Colors.textSecondary,
    marginTop: 1,
  },

  status: {
    marginTop: 2,
    color: Colors.live,
  },

  upNextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    marginTop: 1,
  },

  upNextLabel: {
    color: Colors.gold,
    fontWeight: '700',
  },

  upNextTrack: {
    flex: 1,
    minWidth: 0,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },

  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: Colors.buttonText,
    marginLeft: 2,
  },
});