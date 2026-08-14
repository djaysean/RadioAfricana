import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/colors';
import AppText from '../ui/AppText';

import {
  fetchUpNext,
  UpNext,
} from '../../services/upNext';

export default function UpNextSection() {
  const [track, setTrack] =
    useState<UpNext | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchUpNext();

        if (mounted) {
          setTrack(data);
        }
      } catch (error) {
        console.error(
          'Failed to load Up Next:',
          error,
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    const interval = setInterval(
      load,
      15000,
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const artwork: ImageSourcePropType =
    track?.picture
      ? {uri: track.picture}
      : require('../../../assets/images/default_artwork.png');

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.status}>
          <ActivityIndicator
            size="small"
            color={Colors.gold}
          />
        </View>
      ) : track ? (
        <View style={styles.card}>
          <Image
            source={artwork}
            resizeMode="cover"
            style={styles.artwork}
          />

          <View style={styles.info}>
            <AppText
              variant="label"
              numberOfLines={1}
              style={styles.label}
            >
              UP NEXT
            </AppText>

            <AppText
              variant="body"
              numberOfLines={2}
              style={styles.title}
            >
              {track.title}
            </AppText>

            <AppText
              variant="meta"
              numberOfLines={1}
              style={styles.artist}
            >
              {track.artist}
            </AppText>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginHorizontal: 20,
    marginBottom: 8,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 150,
    padding: 16,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },

  artwork: {
    width: 100,
    height: 100,
    borderRadius: 18,
    backgroundColor: Colors.divider,
  },

  info: {
    flex: 1,
    minWidth: 0,
    marginLeft: 17,
  },

  label: {
    color: Colors.gold,
    letterSpacing: 0.9,
    marginBottom: 6,
  },

  title: {
    color: Colors.text,
  },

  artist: {
    marginTop: 5,
    color: Colors.textSecondary,
  },

  status: {
    minHeight: 132,
    alignItems: 'center',
    justifyContent: 'center',
  },
});