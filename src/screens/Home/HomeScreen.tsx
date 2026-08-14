import React, {
  useState,
} from 'react';

import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import BannerCarousel from '../../components/banners/BannerCarousel';
import LiveHero from '../../components/LiveHero';
import RecentlyPlayedSection from '../../components/common/RecentlyPlayedSection';
import LatestStory from '../../components/stories/LatestStory';

import Colors from '../../constants/colors';

import {
  usePlayback,
} from '../../playback/PlaybackContext';

export default function HomeScreen() {
  const {
    nowPlaying,
  } = usePlayback();

  const [refreshing, setRefreshing] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const refreshHome =
    async () => {
      if (refreshing) {
        return;
      }

      setRefreshing(true);

      setRefreshKey(
        current => current + 1,
      );

      setRefreshing(false);
    };

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={
            false
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshHome}
              tintColor={Colors.gold}
            />
          }
        >
          <View style={styles.header}>
            <Image
              source={require(
                '../../../assets/images/logo.png',
              )}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <BannerCarousel
            key={`banners-${refreshKey}`}
          />

          <LiveHero
            key={`live-hero-${refreshKey}`}
            picture={nowPlaying.picture}
          />

          <RecentlyPlayedSection
            key={`recently-played-${refreshKey}`}
          />

          <LatestStory
            key={`latest-story-${refreshKey}`}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    backgroundColor:
      Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
  },

  logo: {
    width: 190,
    height: 65,
  },
});