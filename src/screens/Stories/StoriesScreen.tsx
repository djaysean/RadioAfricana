import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import StoriesHeader from '../../components/stories/StoriesHeader';
import StoriesFeed from '../../components/stories/StoriesFeed';

import MiniPlayer from '../../components/MiniPlayer';

import Colors from '../../constants/colors';

import {
  fetchNowPlaying,
  NowPlaying,
} from '../../services/nowPlaying';

export default function StoriesScreen() {
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <StoriesHeader />

          <Text style={styles.heading}>
            LATEST STORIES
          </Text>

          <View style={styles.feedContainer}>
            <StoriesFeed />
          </View>
        </View>

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
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: Colors.text,
  },

  feedContainer: {
    flex: 1,
  },
});