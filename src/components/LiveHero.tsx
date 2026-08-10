import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import AppText from './ui/AppText';

import { usePlayback } from '../playback';

type LiveHeroProps = {
  title: string;
  artist: string;
  picture?: string | null;
};

export default function LiveHero({
  title,
  artist,
  picture,
}: LiveHeroProps) {
  const { play, isPlaying } = usePlayback();

  const artwork: ImageSourcePropType = picture
    ? { uri: picture }
    : require('../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <AppText
        variant="label"
        style={styles.heading}
      >
        NOW PLAYING
      </AppText>

      <Image
        source={artwork}
        resizeMode="cover"
        style={styles.artwork}
      />

      <AppText
        variant="heading3"
        numberOfLines={2}
        style={styles.title}
      >
        {title}
      </AppText>

      <AppText
        variant="meta"
        numberOfLines={1}
        style={styles.artist}
      >
        {artist}
      </AppText>

      <View style={styles.liveContainer}>
        <View style={styles.liveDot} />

        <AppText
          variant="label"
          style={styles.liveText}
        >
          {isPlaying ? 'LIVE' : 'READY'}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={play}
      >
        <AppText
          variant="button"
          style={styles.buttonText}
        >
          {isPlaying ? 'Playing Live' : 'Listen Live'}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'center',
  },

  heading: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    color: Colors.text,
    letterSpacing: 0.5,
  },

  artwork: {
    width: 230,
    height: 230,
    borderRadius: 22,
    backgroundColor: '#EFEFEF',
  },

  title: {
    marginTop: 14,
    color: Colors.text,
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  artist: {
    marginTop: 2,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.live,
    marginRight: 8,
  },

  liveText: {
    color: Colors.live,
    letterSpacing: 0.5,
  },

  button: {
    marginTop: 14,
    width: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 20,
    paddingVertical: 13,
    alignItems: 'center',
  },

  buttonText: {
    color: Colors.buttonText,
  },
});