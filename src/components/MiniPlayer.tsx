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

type MiniPlayerProps = {
  title: string;
  artist: string;
  picture?: string | null;
  isPlaying?: boolean;
  onPress?: () => void;
};

function MiniPlayer({
  title,
  artist,
  picture,
  isPlaying = false,
  onPress,
}: MiniPlayerProps) {
  const artwork: ImageSourcePropType = picture
    ? { uri: picture }
    : require('../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <Image
        source={artwork}
        style={styles.artwork}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text
          style={styles.song}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          style={styles.artist}
          numberOfLines={1}
        >
          {artist}
        </Text>

        <Text style={styles.live}>
          ● LIVE
        </Text>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={onPress}
      >
        <Text style={styles.playIcon}>
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
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  artwork: {
    width: 58,
    height: 58,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  song: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },

  artist: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  live: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.live,
  },

  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 2,
  },
});

export default MiniPlayer;