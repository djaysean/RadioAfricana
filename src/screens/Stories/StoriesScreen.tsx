import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import StoriesHeader from '../../components/stories/StoriesHeader';
import FeaturedStories from '../../components/stories/LatestStories';

export default function StoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <StoriesHeader />

      <FeaturedStories />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});