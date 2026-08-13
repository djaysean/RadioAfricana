import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/colors';
import AppText from '../ui/AppText';

type TrackRowProps = {
  title: string;
  artist: string;
  picture?: string | null;
  meta?: string;
};

export default function TrackRow({
  title,
  artist,
  picture,
  meta,
}: TrackRowProps) {
  const artwork: ImageSourcePropType = picture
    ? {uri: picture}
    : require('../../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      <Image
        source={artwork}
        style={styles.artwork}
        resizeMode="cover"
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

        {meta ? (
          <AppText
            variant="meta"
            numberOfLines={1}
            style={styles.meta}
          >
            {meta}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 10,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },

  artwork: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.divider,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },

  title: {
    color: Colors.text,
  },

  artist: {
    marginTop: 3,
    color: Colors.textSecondary,
  },

  meta: {
    marginTop: 3,
    color: Colors.textSecondary,
  },
});