import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import BottomTabs, {
  TAB_BAR_HEIGHT,
} from './BottomTabs';

import MiniPlayer from '../components/MiniPlayer';

import {
  PlaybackProvider,
} from '../playback';

function AppShell() {
  const insets =
    useSafeAreaInsets();

  const bottomOffset =
    TAB_BAR_HEIGHT +
    insets.bottom;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>

      <View
        style={[
          styles.miniPlayer,
          {
            bottom: bottomOffset,
          },
        ]}
      >
        <MiniPlayer />
      </View>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <PlaybackProvider>
      <SafeAreaProvider>
        <AppShell />
      </SafeAreaProvider>
    </PlaybackProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  miniPlayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 100,
  },
});