import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {
  RouteProp,
  useRoute,
} from '@react-navigation/native';

import Colors from '../../constants/colors';

import AppText from '../../components/ui/AppText';

import {
  fetchStoryBySlug,
  StoryDetail,
} from '../../services/stories';

import {
  Routes,
} from '../../navigation/routes';

import {
  StoryStackParamList,
} from '../../navigation/types';

import StoryHero from './components/StoryHero';
import StoryBody from './components/StoryBody';
import StoryFooter from './components/StoryFooter';
import ContinueReading from './components/ContinueReading';

type StoryScreenRouteProp =
  RouteProp<
    StoryStackParamList,
    typeof Routes.STORY_DETAIL
  >;

export default function StoryScreen() {
  const route =
    useRoute<StoryScreenRouteProp>();

  const {slug} =
    route.params;

  const [story, setStory] =
    useState<StoryDetail | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadStory =
      async () => {
        try {
          const article =
            await fetchStoryBySlug(slug);

          setStory(article);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    loadStory();
  }, [slug]);

  if (loading) {
    return (
      <SafeAreaView
        style={styles.loading}
      >
        <ActivityIndicator
          size="large"
          color={Colors.gold}
        />
      </SafeAreaView>
    );
  }

  if (!story) {
    return (
      <SafeAreaView
        style={styles.loading}
      >
        <AppText
          variant="body"
          style={styles.error}
        >
          Story could not be loaded.
        </AppText>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
        >
          <StoryHero
            image={story.image}
            category={story.category}
            title={story.title}
            publishedAt={
              story.publishedAt
            }
            url={story.link}
          />

          <StoryBody
            content={story.content}
          />

          <StoryFooter
            title={story.title}
            url={story.link}
          />

          <ContinueReading
            currentSlug={story.slug}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      Colors.background,
  },

  error: {
    color: Colors.text,
  },
});