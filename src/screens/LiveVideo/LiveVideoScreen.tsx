import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import YoutubePlayer from 'react-native-youtube-iframe';

import {
  HomeStackParamList,
} from '../../navigation/types';

import {
  usePlayback,
} from '../../playback/PlaybackContext';

type NavigationProp =
  NativeStackNavigationProp<
    HomeStackParamList
  >;

type LiveVideoRouteParams = {
  videoUrl: string;
};

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const PLAYER_WIDTH =
  SCREEN_WIDTH - 32;

const PLAYER_HEIGHT =
  PLAYER_WIDTH * 9 / 16;

function extractYouTubeVideoId(
  url: string,
): string | null {
  const value = url.trim();

  if (!value) {
    return null;
  }

  const watchMatch =
    value.match(
      /[?&]v=([^&#]+)/,
    );

  if (watchMatch?.[1]) {
    return watchMatch[1];
  }

  const shortMatch =
    value.match(
      /youtu\.be\/([^?&#/]+)/i,
    );

  if (shortMatch?.[1]) {
    return shortMatch[1];
  }

  const embedMatch =
    value.match(
      /youtube\.com\/embed\/([^?&#/]+)/i,
    );

  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  const shortsMatch =
    value.match(
      /youtube\.com\/shorts\/([^?&#/]+)/i,
    );

  if (shortsMatch?.[1]) {
    return shortsMatch[1];
  }

  return null;
}

export default function LiveVideoScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const route =
    useRoute();

  const {
    videoUrl,
  } =
    route.params as LiveVideoRouteParams;

  const videoId =
    extractYouTubeVideoId(videoUrl);

  const {
    isPlaying,
    play,
    pause,
  } = usePlayback();

  const wasPlayingRef =
    useRef(false);

  const [
    isFullscreen,
    setIsFullscreen,
  ] = useState(false);

  const [
    playerError,
    setPlayerError,
  ] = useState<string | null>(null);

  /*
   * --------------------------------------------------
   * REMEMBER RADIO STATE
   * --------------------------------------------------
   */

  useEffect(() => {
    wasPlayingRef.current =
      isPlaying;
  }, [isPlaying]);

  /*
   * --------------------------------------------------
   * RADIO PLAYBACK LIFECYCLE
   * --------------------------------------------------
   */

  useFocusEffect(
    useCallback(() => {
      const shouldResume =
        wasPlayingRef.current;

      pause();

      return () => {
        if (shouldResume) {
          play();
        }
      };
    }, [
      pause,
      play,
    ]),
  );

  /*
   * --------------------------------------------------
   * STATUS BAR
   * --------------------------------------------------
   */

  useEffect(() => {
    StatusBar.setHidden(
      true,
      'fade',
    );

    return () => {
      StatusBar.setHidden(
        false,
        'fade',
      );
    };
  }, []);

  /*
   * --------------------------------------------------
   * PLAYER EVENTS
   * --------------------------------------------------
   */

  const handlePlayerReady =
    useCallback(() => {
      setPlayerError(null);
    }, []);

  const handlePlayerError =
    useCallback(
      (error: string) => {
        console.error(
          'Radio Africana YouTube player error:',
          error,
        );

        setPlayerError(error);
      },
      [],
    );

  const handleFullscreenChange =
    useCallback(
      (status: boolean) => {
        setIsFullscreen(status);
      },
      [],
    );

  /*
   * --------------------------------------------------
   * INVALID VIDEO
   * --------------------------------------------------
   */

  if (!videoId) {
    return (
      <View
        style={
          styles.errorContainer
        }
      >
        <StatusBar hidden />

        <Pressable
          onPress={() =>
            navigation.goBack()
          }
          style={
            styles.errorBackButton
          }
          hitSlop={12}
        >
          <Text
            style={
              styles.errorBackIcon
            }
          >
            ‹
          </Text>
        </Pressable>

        <Text
          style={
            styles.errorTitle
          }
        >
          Video unavailable
        </Text>

        <Text
          style={
            styles.errorMessage
          }
        >
          The live video link could not
          be loaded right now.
        </Text>
      </View>
    );
  }

  /*
   * --------------------------------------------------
   * PLAYER ERROR
   * --------------------------------------------------
   */

  if (playerError) {
    return (
      <View
        style={
          styles.errorContainer
        }
      >
        <StatusBar hidden />

        <Pressable
          onPress={() =>
            navigation.goBack()
          }
          style={
            styles.errorBackButton
          }
          hitSlop={12}
        >
          <Text
            style={
              styles.errorBackIcon
            }
          >
          ‹
          </Text>
        </Pressable>

        <Text
          style={
            styles.errorTitle
          }
        >
          Video unavailable
        </Text>

        <Text
          style={
            styles.errorMessage
          }
        >
          The live video could not be
          played right now.
        </Text>
      </View>
    );
  }

  /*
   * --------------------------------------------------
   * YOUTUBE FULLSCREEN
   * --------------------------------------------------
   */

  if (isFullscreen) {
    return (
      <View
        style={
          styles.fullscreenContainer
        }
      >
        <StatusBar hidden />

        <YoutubePlayer
          height={
            SCREEN_HEIGHT
          }
          width={
            SCREEN_WIDTH
          }
          videoId={
            videoId
          }
          play={true}
          forceAndroidAutoplay={
            true
          }
          onReady={
            handlePlayerReady
          }
          onError={
            handlePlayerError
          }
          onFullScreenChange={
            handleFullscreenChange
          }
          initialPlayerParams={{
            controls: true,
            rel: false,
            preventFullScreen: false,
          }}
          webViewProps={{
            androidLayerType:
              'hardware',
            allowsFullscreenVideo:
              true,
            mediaPlaybackRequiresUserAction:
              false,
            javaScriptEnabled:
              true,
            domStorageEnabled:
              true,
          }}
        />
      </View>
    );
  }

  /*
   * --------------------------------------------------
   * MAIN SCREEN
   * --------------------------------------------------
   */

  return (
    <View
      style={styles.container}
    >
      <StatusBar hidden />

      {/* BACK BUTTON */}

      <Pressable
        onPress={() =>
          navigation.goBack()
        }
        style={
          styles.backButton
        }
        hitSlop={10}
      >
        <Text
          style={
            styles.backIcon
          }
        >
          ‹
        </Text>
      </Pressable>

      {/* MAIN COMPOSITION */}

      <View
        style={
          styles.content
        }
      >
        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >
          <Text
            style={
              styles.brand
            }
          >
            RADIO AFRICANA
          </Text>

          <Text
            style={
              styles.title
            }
          >
            LIVE VIDEO
          </Text>

          <View
            style={
              styles.headerRule
            }
          />

          <Text
            style={
              styles.tagline
            }
          >
            Tune in. Watch live. Stay connected.
          </Text>
        </View>

        {/* VIDEO */}

        <View
          style={
            styles.videoSection
          }
        >
          <View
            style={
              styles.videoFrame
            }
          >
            <YoutubePlayer
              height={
                PLAYER_HEIGHT
              }
              width={
                PLAYER_WIDTH
              }
              videoId={
                videoId
              }
              play={true}
              forceAndroidAutoplay={
                true
              }
              onReady={
                handlePlayerReady
              }
              onError={
                handlePlayerError
              }
              onFullScreenChange={
                handleFullscreenChange
              }
              initialPlayerParams={{
                controls: true,
                rel: false,
                preventFullScreen: false,
              }}
              webViewProps={{
                androidLayerType:
                  'hardware',
                allowsFullscreenVideo:
                  true,
                mediaPlaybackRequiresUserAction:
                  false,
                javaScriptEnabled:
                  true,
                domStorageEnabled:
                  true,
              }}
            />
          </View>
        </View>

        {/* INFORMATION */}

        <View
          style={
            styles.infoSection
          }
        >
          <View
            style={
              styles.infoRule
            }
          />

          <Text
            style={
              styles.liveLabel
            }
          >
            YOU'RE WATCHING LIVE
          </Text>

          <Text
            style={
              styles.instruction
            }
          >
            Press play on the video above to
            start watching.
          </Text>

          <Text
            style={
              styles.supportingText
            }
          >
            Your radio stream will pause while
            you watch and resume when you return.
          </Text>
        </View>
      </View>

      {/* FOOTER */}

      <View
        style={
          styles.footer
        }
      >
        <View
          style={
            styles.footerRule
          }
        />

        <Text
          style={
            styles.footerText
          }
        >
          RADIO AFRICANA
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      '#000000',
    alignItems: 'center',
  },

  fullscreenContainer: {
    flex: 1,
    backgroundColor:
      '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /*
   * --------------------------------------------------
   * MAIN COMPOSITION
   * --------------------------------------------------
   *
   * Everything above the persistent mini-player is
   * treated as one visual group. This prevents the
   * information section from consuming all remaining
   * space and creating a large gap beneath the video.
   */

  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 34,
    paddingBottom: 18,
  },

  header: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },

  brand: {
    color:
      '#D4AF37',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3.4,
    textAlign: 'center',
  },

  title: {
    marginTop: 6,
    color:
      '#FFFFFF',
    fontSize: 30,
    fontWeight: '300',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  headerRule: {
    width: 42,
    height: 2,
    backgroundColor:
      '#D4AF37',
    marginTop: 12,
  },

  tagline: {
    marginTop: 11,
    color:
      'rgba(255, 255, 255, 0.58)',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  /*
   * --------------------------------------------------
   * VIDEO
   * --------------------------------------------------
   */

  videoSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoFrame: {
    width:
      PLAYER_WIDTH,
    height:
      PLAYER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor:
      '#000000',
  },

  /*
   * --------------------------------------------------
   * INFORMATION
   * --------------------------------------------------
   */

  infoSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  infoRule: {
    width: 42,
    height: 2,
    backgroundColor:
      '#D4AF37',
    marginBottom: 17,
  },

  liveLabel: {
    color:
      '#D4AF37',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2.3,
    textAlign: 'center',
  },

  instruction: {
    marginTop: 10,
    color:
      '#FFFFFF',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500',
    textAlign: 'center',
  },

  supportingText: {
    marginTop: 9,
    maxWidth: 340,
    color:
      'rgba(255, 255, 255, 0.46)',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },

  /*
   * --------------------------------------------------
   * FOOTER
   * --------------------------------------------------
   */

  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },

  footerRule: {
    width: 28,
    height: 1,
    backgroundColor:
      'rgba(212, 175, 55, 0.5)',
    marginBottom: 8,
  },

  footerText: {
    color:
      'rgba(255, 255, 255, 0.28)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3.2,
  },

  /*
   * --------------------------------------------------
   * BACK BUTTON
   * --------------------------------------------------
   */

  backButton: {
    position: 'absolute',
    top: 20,
    left: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor:
      'rgba(0, 0, 0, 0.62)',
    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  backIcon: {
    color:
      '#FFFFFF',
    fontSize: 38,
    lineHeight: 41,
    fontWeight: '300',
    marginTop: -4,
  },

  /*
   * --------------------------------------------------
   * ERROR STATES
   * --------------------------------------------------
   */

  errorContainer: {
    flex: 1,
    width: '100%',
    backgroundColor:
      '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  errorBackButton: {
    position: 'absolute',
    top: 20,
    left: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor:
      'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorBackIcon: {
    color:
      '#FFFFFF',
    fontSize: 38,
    lineHeight: 41,
    fontWeight: '300',
    marginTop: -4,
  },

  errorTitle: {
    color:
      '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  errorMessage: {
    color:
      'rgba(255, 255, 255, 0.72)',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});