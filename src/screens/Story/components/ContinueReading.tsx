import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import Colors from '../../../constants/colors';
import AppText from '../../../components/ui/AppText';

import {
  fetchLatestStories,
  Story,
} from '../../../services/stories';

import { Routes } from '../../../navigation/routes';

import ContinueReadingCard from './ContinueReadingCard';

type Props = {
  currentSlug: string;
};

export default function ContinueReading({
  currentSlug,
}: Props) {
  const navigation = useNavigation<any>();

  const [stories, setStories] =
    useState<Story[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadStories() {
      try {
        const latest =
          await fetchLatestStories();

        const filtered = latest
          .filter(
            story =>
              story.slug !== currentSlug,
          )
          .slice(0, 3);

        setStories(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, [currentSlug]);

  return (
    <View style={styles.container}>
      <AppText
        variant="heading1"
        style={styles.heading}
      >
        Continue Reading
      </AppText>

      {loading ? (
        <ActivityIndicator
          color={Colors.gold}
        />
      ) : (
        stories.map(story => (
          <ContinueReadingCard
            key={story.id}
            image={story.image}
            category={story.category}
            title={story.title}
            onPress={() =>
              navigation.push(
                Routes.STORY_DETAIL,
                {
                  slug: story.slug,
                },
              )
            }
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  heading: {
    color: Colors.text,
    marginBottom: 28,
  },
});