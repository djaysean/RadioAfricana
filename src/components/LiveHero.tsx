import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Colors from '../constants/colors';

import {Routes} from '../navigation/routes';

import {
  HomeStackParamList,
} from '../navigation/types';

type LiveHeroProps = {
  picture?: string | null;
  videoUrl?: string | null;
};

type NavigationProp =
  NativeStackNavigationProp<
    HomeStackParamList
  >;

const WAVEFORM_BARS = 5;

export default function LiveHero({
  picture,
  videoUrl,
}: LiveHeroProps) {
  const navigation =
    useNavigation<NavigationProp>();

  const artwork: ImageSourcePropType =
    picture
      ? {uri: picture}
      : require('../../assets/images/default_artwork.png');

  /*
   * --------------------------------------------------
   * WAVEFORM
   * --------------------------------------------------
   */

  const waveformValues = useRef(
    Array.from(
      {length: WAVEFORM_BARS},
      () => new Animated.Value(0.45),
    ),
  ).current;

  /*
   * --------------------------------------------------
   * WATCH LIVE PULSE
   * --------------------------------------------------
   */

  const videoPulse = useRef(
    new Animated.Value(1),
  ).current;

  /*
   * --------------------------------------------------
   * NOW PLAYING GLOW
   * --------------------------------------------------
   */

  const nowPlayingGlow = useRef(
    new Animated.Value(0),
  ).current;

  /*
   * --------------------------------------------------
   * NOW PLAYING TEXT ANIMATION
   * --------------------------------------------------
   */

  const nowPlayingTextPulse = useRef(
    new Animated.Value(0),
  ).current;

  /*
   * --------------------------------------------------
   * WAVEFORM ANIMATION
   * --------------------------------------------------
   */

  useEffect(() => {
    const animations =
      waveformValues.map(
        (value, index) =>
          Animated.loop(
            Animated.sequence([
              Animated.delay(
                index * 90,
              ),

              Animated.timing(
                value,
                {
                  toValue: 1,
                  duration:
                    320 +
                    index * 45,
                  useNativeDriver:
                    true,
                },
              ),

              Animated.timing(
                value,
                {
                  toValue: 0.3,
                  duration:
                    320 +
                    index * 35,
                  useNativeDriver:
                    true,
                },
              ),
            ]),
          ),
      );

    animations.forEach(
      animation =>
        animation.start(),
    );

    return () => {
      animations.forEach(
        animation =>
          animation.stop(),
      );
    };
  }, [waveformValues]);

  /*
   * --------------------------------------------------
   * WATCH LIVE PULSE
   * --------------------------------------------------
   */

  const hasVideo =
    typeof videoUrl === 'string' &&
    videoUrl.trim().length > 0;

  useEffect(() => {
    if (!hasVideo) {
      videoPulse.stopAnimation();
      videoPulse.setValue(1);
      return;
    }

    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            videoPulse,
            {
              toValue: 1.035,
              duration: 900,
              useNativeDriver:
                true,
            },
          ),

          Animated.timing(
            videoPulse,
            {
              toValue: 1,
              duration: 900,
              useNativeDriver:
                true,
            },
          ),
        ]),
      );

    animation.start();

    return () => {
      animation.stop();
      videoPulse.setValue(1);
    };
  }, [
    hasVideo,
    videoPulse,
  ]);

  /*
   * --------------------------------------------------
   * NOW PLAYING BORDER GLOW
   * --------------------------------------------------
   */

  useEffect(() => {
    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            nowPlayingGlow,
            {
              toValue: 1,
              duration: 1200,
              useNativeDriver:
                true,
            },
          ),

          Animated.timing(
            nowPlayingGlow,
            {
              toValue: 0,
              duration: 1200,
              useNativeDriver:
                true,
            },
          ),
        ]),
      );

    animation.start();

    return () => {
      animation.stop();
      nowPlayingGlow.setValue(0);
    };
  }, [nowPlayingGlow]);

  /*
   * --------------------------------------------------
   * NOW PLAYING TEXT PULSE
   * --------------------------------------------------
   *
   * Very subtle opacity animation so the text feels
   * alive without looking like it is blinking.
   */

  useEffect(() => {
    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            nowPlayingTextPulse,
            {
              toValue: 1,
              duration: 1400,
              useNativeDriver:
                true,
            },
          ),

          Animated.timing(
            nowPlayingTextPulse,
            {
              toValue: 0,
              duration: 1400,
              useNativeDriver:
                true,
            },
          ),
        ]),
      );

    animation.start();

    return () => {
      animation.stop();
      nowPlayingTextPulse.setValue(0);
    };
  }, [
    nowPlayingTextPulse,
  ]);

  /*
   * --------------------------------------------------
   * ANIMATION INTERPOLATIONS
   * --------------------------------------------------
   */

  const glowOpacity =
    nowPlayingGlow.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0.15,
        0.55,
      ],
    });

  const textOpacity =
    nowPlayingTextPulse.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0.78,
        1,
      ],
    });

  const textScale =
    nowPlayingTextPulse.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0.985,
        1,
      ],
    });

  /*
   * --------------------------------------------------
   * WATCH LIVE
   * --------------------------------------------------
   */

  const handleVideoPress =
    () => {
      if (!videoUrl) {
        return;
      }

      navigation.navigate(
        Routes.LIVE_VIDEO,
        {
          videoUrl:
            videoUrl.trim(),
        },
      );
    };

  return (
    <View
      style={
        styles.container
      }
    >
      <View
        style={
          styles.artworkFrame
        }
      >
        <Image
          source={artwork}
          resizeMode="cover"
          style={
            styles.artwork
          }
        />

        {/* ==========================================
            NOW PLAYING
           ========================================== */}

        <View
          style={
            styles.nowPlayingArea
          }
        >
          {/* Soft animated gold glow */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.nowPlayingGlow,
              {
                opacity:
                  glowOpacity,
              },
            ]}
          />

          <View
            style={
              styles.nowPlayingBadge
            }
          >
            <View
              style={
                styles.waveform
              }
            >
              {waveformValues.map(
                (
                  value,
                  index,
                ) => (
                  <Animated.View
                    key={`wave-${index}`}
                    style={[
                      styles.waveBar,
                      {
                        transform: [
                          {
                            scaleY:
                              value,
                          },
                        ],
                      },
                    ]}
                  />
                ),
              )}
            </View>

            {/* Animated NOW PLAYING text */}
            <Animated.Text
              style={[
                styles.nowPlayingText,
                {
                  opacity:
                    textOpacity,
                  transform: [
                    {
                      scale:
                        textScale,
                    },
                  ],
                },
              ]}
            >
              NOW PLAYING
            </Animated.Text>
          </View>
        </View>

        {/* ==========================================
            YOUTUBE WATCH LIVE
           ========================================== */}

        {hasVideo && (
          <Animated.View
            style={[
              styles.videoButtonWrapper,
              {
                transform: [
                  {
                    scale:
                      videoPulse,
                  },
                ],
              },
            ]}
          >
            <Pressable
              onPress={
                handleVideoPress
              }
              style={
                styles.videoButton
              }
              hitSlop={8}
            >
              <View
                style={
                  styles.youtubePlayCircle
                }
              >
                <Text
                  style={
                    styles.youtubePlayIcon
                  }
                >
                  ▶
                </Text>
              </View>

              <Text
                style={
                  styles.videoButtonText
                }
              >
                WATCH LIVE
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    paddingHorizontal: 20,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      Colors.background,
  },

  artworkFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 3,
    borderColor:
      Colors.gold,
    overflow: 'hidden',
  },

  artwork: {
    width: '100%',
    height: '100%',
  },

  /*
   * --------------------------------------------------
   * NOW PLAYING
   * --------------------------------------------------
   */

  nowPlayingArea: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: '52%',
    height: 40,
  },

  nowPlayingBadge: {
    position: 'relative',
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor:
      Colors.gold,
    backgroundColor:
      'rgba(17, 17, 17, 0.84)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    overflow: 'hidden',
  },

  nowPlayingGlow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 23,
    borderWidth: 3,
    borderColor:
      Colors.gold,
  },

  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 18,
    marginRight: 9,
    gap: 2.5,
  },

  waveBar: {
    width: 3,
    height: 15,
    borderRadius: 2,
    backgroundColor:
      Colors.gold,
  },

  nowPlayingText: {
    color:
      Colors.gold,
    fontFamily:
      'Inter-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.7,
  },

  /*
   * --------------------------------------------------
   * WATCH LIVE
   * --------------------------------------------------
   */

  videoButtonWrapper: {
    position: 'absolute',
    top: 62,
    left: 14,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 7,
  },

  videoButton: {
    height: 50,
    minWidth: 156,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor:
      'rgba(255, 255, 255, 0.72)',
    backgroundColor:
      '#FF0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13,
  },

  youtubePlayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor:
      '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  youtubePlayIcon: {
    color:
      '#FF0000',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 2,
    marginTop: -1,
  },

  videoButtonText: {
    color:
      '#FFFFFF',
    fontFamily:
      'Inter-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.65,
  },
});