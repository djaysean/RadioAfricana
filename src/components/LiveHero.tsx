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

type LiveHeroProps = {
  title: string;
  artist: string;
  picture?: string |null;
  onPress?: () => void;
};

export default function LiveHero({
  title,
  artist,
  picture,
  onPress,
}: LiveHeroProps) {
  const artwork: ImageSourcePropType = picture
    ? { uri: picture }
    : require('../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        NOW PLAYING
      </Text>

      <Image
        source={artwork}
        resizeMode="cover"
        style={styles.artwork}
      />

      <Text
        numberOfLines={2}
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

      <View style={styles.liveContainer}>
        <View style={styles.liveDot} />

        <Text style={styles.liveText}>
          LIVE
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          Listen Live
        </Text>
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
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: Colors.text,
    marginBottom: 12,
  },

  artwork: {
    width: 230,
    height: 230,
    borderRadius: 22,
    backgroundColor: '#EFEFEF',
  },

  title: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 27,
    paddingHorizontal: 12,
  },

  artist: {
    marginTop: 2,
    fontSize: 15,
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
    fontSize: 13,
    fontWeight: '700',
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
    fontWeight: '700',
    fontSize: 16,
  },
});