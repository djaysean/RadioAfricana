import React from 'react';

import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../../components/ui/AppText';
import StoriesHeader from '../../components/stories/StoriesHeader';
import StoriesFeed from '../../components/stories/StoriesFeed';

import Colors from '../../constants/colors';

export default function StoriesScreen() {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <StoriesHeader />

          <AppText
            variant="label"
            style={styles.heading}
          >
            LATEST STORIES
          </AppText>

          <View style={styles.feedContainer}>
            <StoriesFeed />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
  },

  header: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
  },

  logo: {
    width: 190,
    height: 65,
  },

  heading: {
    marginTop: 28,
    marginBottom: 18,
    marginHorizontal: 24,
    letterSpacing: 0.5,
  },

  feedContainer: {
    flex: 1,
  },
});