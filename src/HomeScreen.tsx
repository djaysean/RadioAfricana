import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import BannerCarousel from './components/BannerCarousel';

function HomeScreen() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <SafeAreaView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Now Playing */}
        <View style={styles.content}>

          <Text style={styles.sectionTitle}>
            NOW PLAYING
          </Text>

          <Image
            source={require('../assets/images/logo.png')}
            style={styles.artwork}
            resizeMode="cover"
          />

          <Text style={styles.trackTitle}>
            Bless Me
          </Text>

          <Text style={styles.artist}>
            Chinko Ekun
          </Text>

          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>
              ● LIVE
            </Text>
          </View>

        </View>

        <BannerCarousel />

        {/* Persistent Player */}
        <View style={styles.player}>
          <View>
            <Text style={styles.live}>● LIVE NOW</Text>
            <Text style={styles.station}>Radio Africana</Text>
          </View>

          <Text style={styles.play}>▶</Text>
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },

  logo: {
    width: 220,
    height: 80,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1,
    marginBottom: 20,
  },

  artwork: {
    width: 220,
    height: 220,
    borderRadius: 12,
  },

  trackTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginTop: 24,
  },

  artist: {
    fontSize: 18,
    color: '#666',
    marginTop: 6,
  },

  liveBadge: {
    marginTop: 24,
    backgroundColor: '#D32F2F',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  liveBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },

  live: {
    color: '#D32F2F',
    fontWeight: '700',
    fontSize: 12,
  },

  station: {
    color: '#111',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 2,
  },

  play: {
    fontSize: 28,
    color: '#111',
  },
});

export default HomeScreen;