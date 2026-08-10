import React, {
  useCallback,
  useEffect,
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
import MiniPlayer from '../../components/MiniPlayer';
import LatestStory from '../../components/stories/LatestStory';

import Colors from '../../constants/colors';

import {
  fetchNowPlaying,
  NowPlaying,
} from '../../services/nowPlaying';

export default function HomeScreen() {
  const [nowPlaying, setNowPlaying] =
    useState<NowPlaying>({
      artist: '',
      title: 'Loading...',
      picture: null,
    });

  const [refreshing, setRefreshing] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const loadNowPlaying = useCallback(
    async () => {
      try {
        const data =
          await fetchNowPlaying();

        setNowPlaying(data);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data =
          await fetchNowPlaying();

        if (mounted) {
          setNowPlaying(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    const interval = setInterval(
      load,
      5000,
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const refreshHome = async () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    setRefreshKey(
      current => current + 1,
    );

    await loadNowPlaying();

    setRefreshing(false);
  };

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
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
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <LiveHero
            key={`live-hero-${refreshKey}`}
            title={nowPlaying.title}
            artist={nowPlaying.artist}
            picture={nowPlaying.picture}
          />

          <BannerCarousel
            key={`banners-${refreshKey}`}
          />

          <LatestStory
            key={`latest-story-${refreshKey}`}
          />
        </ScrollView>

        <MiniPlayer
          title={nowPlaying.title}
          artist={nowPlaying.artist}
          picture={nowPlaying.picture}
        />
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
    paddingBottom: 40,
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
});