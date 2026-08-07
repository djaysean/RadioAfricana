import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/colors';
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
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.artist}
        >
          {artist}
        </Text>

        <Text style={styles.status}>
          {isPlaying ? '● LIVE' : '● READY'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={toggle}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>
          {isPlaying ? '❚❚' : '▶'}
        </Text>
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
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },

  artist: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  status: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 2,
  },
});