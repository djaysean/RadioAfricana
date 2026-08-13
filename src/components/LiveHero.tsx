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
        style={styles.artwork}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    paddingHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: Colors.gold,
    overflow: 'hidden',
  },
});