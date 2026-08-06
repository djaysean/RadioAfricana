import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import Colors from '../../../constants/colors';

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

  const [stories, setStories] = useState<
    Story[]
  >([]);

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
      <Text style={styles.heading}>
        Continue Reading
      </Text>

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
    fontFamily: 'Lora-Bold',
    fontSize: 30,
    color: Colors.text,
    marginBottom: 28,
  },
});