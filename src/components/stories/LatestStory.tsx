import React, {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Colors from '../../constants/colors';

import AppText from '../ui/AppText';

import StoryCard, {
  StoryCardData,
} from './StoryCard';

import {
  fetchLatestStory,
  Story,
} from '../../services/stories';

import {Routes} from '../../navigation/routes';

import {
  StoryStackParamList,
} from '../../navigation/types';

type NavigationProp =
  NativeStackNavigationProp<
    StoryStackParamList
  >;

export default function LatestStory() {
  const navigation =
    useNavigation<NavigationProp>();

  const [story, setStory] =
    useState<Story>({
      id: '',
      title: '',
      excerpt: '',
      category: '',
      slug: '',
      image: require(
        '../../../assets/images/logo.png',
      ),
    });

  useEffect(() => {
    const loadStory =
      async () => {
        try {
          const latestStory =
            await fetchLatestStory();

          setStory(latestStory);
        } catch (error) {
          console.error(error);
        }
      };

    loadStory();
  }, []);

  const storyCard: StoryCardData = {
    id: story.id,
    title: story.title,
    excerpt: story.excerpt,
    category: story.category,
    image: story.image,

    onPress: () => {
      navigation.navigate(
        Routes.STORY_DETAIL,
        {
          slug: story.slug,
        },
      );
    },
  };

  return (
    <View style={styles.container}>
      <AppText
        variant="heading3"
        style={styles.heading}
      >
        LATEST STORY
      </AppText>

      <StoryCard
        story={storyCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 24,
    marginBottom: 4,
  },

  heading: {
    color: Colors.text,
    marginBottom: 14,
  },
});