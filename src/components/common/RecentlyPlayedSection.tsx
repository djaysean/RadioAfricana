import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/colors';
import SectionHeader from './SectionHeader';
import AppText from '../ui/AppText';

import {
  fetchRecentlyPlayed,
  RecentlyPlayed,
} from '../../services/recentlyPlayed';

const HORIZONTAL_PADDING = 20;
const CARD_GAP = 12;
const CARD_WIDTH = 116;

function TrackSeparator() {
  return <View style={styles.separator} />;
}

export default function RecentlyPlayedSection() {
  const [tracks, setTracks] =
    useState<RecentlyPlayed[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data =
          await fetchRecentlyPlayed();

        if (mounted) {
          setTracks(data.slice(0, 5));
        }
      } catch (error) {
        console.error(
          'Failed to load recently played tracks:',
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
      5000,
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const renderTrack = ({
    item,
  }: {
    item: RecentlyPlayed;
  }) => {
    const artwork: ImageSourcePropType =
      item.picture
        ? {uri: item.picture}
        : require('../../../assets/images/default_artwork.png');

    return (
      <View style={styles.card}>
        <Image
          source={artwork}
          resizeMode="cover"
          style={styles.artwork}
        />

        <AppText
          variant="bodySmall"
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </AppText>

        <AppText
          variant="meta"
          numberOfLines={1}
          style={styles.artist}
        >
          {item.artist}
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="RECENTLY PLAYED"
      />

      {loading ? (
        <View style={styles.status}>
          <ActivityIndicator
            size="small"
            color={Colors.gold}
          />
        </View>
      ) : tracks.length > 0 ? (
        <FlatList
          horizontal
          data={tracks}
          keyExtractor={track =>
            track.id ||
            track.songId ||
            `${track.artist}-${track.title}`
          }
          renderItem={renderTrack}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
          ItemSeparatorComponent={
            TrackSeparator
          }
        />
      ) : (
        <View style={styles.status} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 12,
  },

  listContent: {
    paddingHorizontal:
      HORIZONTAL_PADDING,
  },

  separator: {
    width: CARD_GAP,
  },

  card: {
    width: CARD_WIDTH,
  },

  artwork: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: Colors.divider,
  },

  title: {
    marginTop: 8,
    color: Colors.text,
  },

  artist: {
    marginTop: 3,
    color: Colors.textSecondary,
  },

  status: {
    minHeight: 76,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});