import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../constants/colors';
import FeaturedStoryCard, {
  FeaturedStory,
} from './FeaturedStoryCard';

import {
  fetchFeaturedStory,
  Story,
} from '../../services/stories';

export default function FeaturedStories() {
  const [story, setStory] = useState<Story>({
    id: '',
    title: '',
    excerpt: '',
    category: '',
    slug: '',
    image: require('../../../assets/images/logo.png'),
  });

  useEffect(() => {
    const loadStory = async () => {
      try {
        const featuredStory = await fetchFeaturedStory();
        setStory(featuredStory);
      } catch (error) {
        console.error(error);
      }
    };

    loadStory();
  }, []);

  const cardStory: FeaturedStory = {
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
    <View style={styles.container}>
      <Text style={styles.heading}>
        FEATURED STORIES
      </Text>

      <FeaturedStoryCard story={cardStory} />
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
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 18,
    letterSpacing: 0.5,
  },
});