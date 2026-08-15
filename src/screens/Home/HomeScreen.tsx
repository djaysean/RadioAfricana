import React, {
  useEffect,
  useState,
} from 'react';

import {
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
import RadioHeader from '../../components/common/RadioHeader';
import LatestStory from '../../components/stories/LatestStory';

import Colors from '../../constants/colors';

import {
  usePlayback,
} from '../../playback/PlaybackContext';

import {
  subscribeToLiveVideo,
  LiveVideo,
} from '../../services/liveVideo';

export default function HomeScreen() {
  const {
    nowPlaying,
  } = usePlayback();

  const [
    liveVideo,
    setLiveVideo,
  ] = useState<LiveVideo | null>(
    null,
  );

  const [refreshing, setRefreshing] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  useEffect(() => {
    const unsubscribe =
      subscribeToLiveVideo(
        video => {
          setLiveVideo(video);
        },
      );

    return unsubscribe;
  }, []);

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
            <RadioHeader />
          </View>

          <BannerCarousel
            key={`banners-${refreshKey}`}
          />

          <LiveHero
            key={`live-hero-${refreshKey}`}
            picture={nowPlaying.picture}
            videoUrl={
              liveVideo?.link ?? null
            }
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
});