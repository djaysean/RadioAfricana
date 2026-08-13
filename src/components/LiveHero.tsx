import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../constants/colors';

type LiveHeroProps = {
  picture?: string | null;
};

export default function LiveHero({
  picture,
}: LiveHeroProps) {
  const artwork: ImageSourcePropType = picture
    ? {uri: picture}
    : require('../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <Image
        source={artwork}
        resizeMode="cover"
        blurRadius={2}
        style={styles.backgroundArtwork}
      />

      <View style={styles.content}>
        <View style={styles.artworkFrame}>
          <Image
            source={artwork}
            resizeMode="cover"
            style={styles.artwork}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    marginTop: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Colors.background,
  },

  backgroundArtwork: {
    ...StyleSheet.absoluteFill,
    opacity: 0.72,
    transform: [
      {
        scale: 1.08,
      },
    ],
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  artworkFrame: {
    width: 176,
    height: 176,
    borderRadius: 22,
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },

  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: Colors.divider,
  },
});