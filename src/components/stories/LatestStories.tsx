import React, {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/colors';
import AppText from '../ui/AppText';

import StoryCard, {
  StoryCardData,
} from './StoryCard';

import {
  fetchLatestStories,
  Story,
} from '../../services/stories';

export default function LatestStories() {
  const [stories, setStories] =
    useState<Story[]>([]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const latestStories =
          await fetchLatestStories();

        setStories(latestStories);
      } catch (error) {
        console.error(error);
      }
    };

    loadStories();
  }, []);

  return (
    <View style={styles.container}>
      <AppText
        variant="label"
        style={styles.heading}
      >
        LATEST STORIES
      </AppText>

      {stories.map((story) => {
        const storyCard: StoryCardData = {
          id: story.id,
          title: story.title,
          excerpt: story.excerpt,
          category: story.category,
          image: story.image,
          onPress: () => {
            console.log(story.slug);
          },
        };

        return (
          <StoryCard
            key={story.id}
            story={storyCard}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 24,
    marginBottom: 24,
  },

  heading: {
    color: Colors.text,
    marginBottom: 18,
    letterSpacing: 0.5,
  },
});