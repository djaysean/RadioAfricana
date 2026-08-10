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

import { usePlayback } from '../playback/PlaybackContext';

type MiniPlayerProps = {
  title: string;
  artist: string;
  picture?: string | null;
};

export default function MiniPlayer({
  title,
  artist,
  picture,
}: MiniPlayerProps) {
  const { isPlaying, toggle } = usePlayback();

  const artwork: ImageSourcePropType = picture
    ? { uri: picture }
    : require('../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <Image
        source={artwork}
        style={styles.artwork}
      />

      <View style={styles.info}>
        <AppText
          variant="bodySmall"
          numberOfLines={1}
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

        <AppText
          variant="label"
          style={styles.status}
        >
          {isPlaying ? '● LIVE' : '● READY'}
        </AppText>
      </View>

      <TouchableOpacity
        onPress={toggle}
        style={styles.button}
        activeOpacity={0.8}
      >
        <AppText
          variant="button"
          style={styles.icon}
        >
          {isPlaying ? '❚❚' : '▶'}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
  },

  artwork: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: Colors.text,
  },

  artist: {
    color: Colors.textSecondary,
    marginTop: 2,
  },

  status: {
    marginTop: 4,
    color: Colors.live,
  },

  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: Colors.buttonText,
    marginLeft: 2,
  },
});