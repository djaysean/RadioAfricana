import React, {
  useEffect,
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

  return (
    <View
      style={styles.container}
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
        play={false}
        initialPlayerParams={{
          controls: true,
          modestbranding: true,
          rel: false,
          fs: true,
          playsinline: false,
        }}
        webViewProps={{
          androidLayerType:
            'hardware',
          allowsFullscreenVideo:
            true,
          javaScriptEnabled:
            true,
          domStorageEnabled:
            true,
        }}
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 18,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      'rgba(0, 0, 0, 0.52)',
    borderWidth: 1,
    borderColor:
      'rgba(255, 255, 255, 0.32)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  backIcon: {
    color:
      '#FFFFFF',
    fontSize: 36,
    lineHeight: 39,
    fontWeight: '300',
    marginTop: -4,
  },

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
    top: 18,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorBackIcon: {
    color:
      '#FFFFFF',
    fontSize: 36,
    lineHeight: 39,
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
    textAlign: 'center',
    lineHeight: 21,
  },
});