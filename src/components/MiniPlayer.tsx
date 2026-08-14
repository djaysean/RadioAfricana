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

import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from 'react-native-svg';

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
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        >
          <Defs>
            <LinearGradient
              id="miniPlayerGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop
                offset="0"
                stopColor={Colors.gold}
                stopOpacity={0.76}
              />

              <Stop
                offset="0.38"
                stopColor={Colors.gold}
                stopOpacity={0.48}
              />

              <Stop
                offset="0.68"
                stopColor={Colors.gold}
                stopOpacity={0.18}
              />

              <Stop
                offset="1"
                stopColor={Colors.white}
                stopOpacity={0.98}
              />
            </LinearGradient>
          </Defs>

          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="18"
            ry="18"
            fill="url(#miniPlayerGradient)"
          />
        </Svg>

        <View style={styles.content}>
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
              {isPlaying
                ? '● LIVE'
                : '● READY'}
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
            activeOpacity={0.82}
          >
            <Svg
              pointerEvents="none"
              style={StyleSheet.absoluteFill}
            >
              <Defs>
                <LinearGradient
                  id="playButtonGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <Stop
                    offset="0"
                    stopColor={Colors.gold}
                    stopOpacity={1}
                  />

                  <Stop
                    offset="0.55"
                    stopColor={Colors.gold}
                    stopOpacity={0.96}
                  />

                  <Stop
                    offset="1"
                    stopColor={Colors.gold}
                    stopOpacity={0.82}
                  />
                </LinearGradient>
              </Defs>

              <Circle
                cx="50%"
                cy="50%"
                r="47%"
                fill="url(#playButtonGradient)"
              />
            </Svg>

            <AppText
              variant="button"
              style={styles.icon}
            >
              {isPlaying
                ? '❚❚'
                : '▶'}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor:
      Colors.background,
  },

  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOpacity: 0.20,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 86,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  artwork: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor:
      Colors.divider,
  },

  info: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 10,
  },

  title: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
  },

  artist: {
    marginTop: 1,
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
  },

  status: {
    marginTop: 2,
    color: Colors.live,
  },

  upNextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    marginTop: 2,
  },

  upNextLabel: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    marginRight: 3,
  },

  upNextTrack: {
    flex: 1,
    minWidth: 0,
    color: Colors.text,
    fontStyle: 'italic',
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    borderWidth: 1,
    borderColor: Colors.white,
    shadowColor: Colors.gold,
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },

  icon: {
    color: Colors.buttonText,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 2,
    zIndex: 2,
  },
});