import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native';

import Colors from './constants/colors';

import LiveHero from './components/LiveHero';
import BannerCarousel from './components/BannerCarousel';
import MiniPlayer from './components/MiniPlayer';

import {
  fetchNowPlaying,
  NowPlaying,
} from './services/nowPlaying';

function HomeScreen() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({
    artist: '',
    title: 'Loading...',
    picture: null,
  });

  useEffect(() => {
    let mounted = true;

    const loadNowPlaying = async () => {
      try {
        const data = await fetchNowPlaying();

        if (mounted) {
          setNowPlaying(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadNowPlaying();

    const interval = setInterval(loadNowPlaying, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

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
        >
          <View style={styles.header}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <LiveHero
            title={nowPlaying.title}
            artist={nowPlaying.artist}
            picture={nowPlaying.picture}
          />

          <BannerCarousel />

          {/*
            FeaturedStories
            comes here in Release 0.5
          */}
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

export default HomeScreen;