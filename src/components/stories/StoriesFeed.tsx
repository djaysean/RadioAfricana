import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Colors from '../../constants/colors';

import StoryCard, {
  StoryCardData,
} from './StoryCard';

import {
  fetchLatestStories,
  Story,
} from '../../services/stories';

import { Routes } from '../../navigation/routes';
import { RootStackParamList } from '../../navigation/types';

const STORIES_PER_PAGE = 10;

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function StoriesFeed() {
  const navigation = useNavigation<NavigationProp>();

  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const loadStories = useCallback(
    async (
      pageToLoad: number,
      replace = false,
    ) => {
      if (loading) {
        return;
      }

      setLoading(true);

      try {
        const newStories =
          await fetchLatestStories(pageToLoad);

        if (replace) {
          setStories(newStories);
        } else {
          setStories((current) => [
            ...current,
            ...newStories,
          ]);
        }

        if (
          newStories.length < STORIES_PER_PAGE
        ) {
          setHasMore(false);
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes(
            'API request failed: 400',
          )
        ) {
          setHasMore(false);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    loadStories(1, true);
  }, [loadStories]);

  const loadMore = () => {
    if (loading || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    setPage(nextPage);

    loadStories(nextPage);
  };

  const refresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);

    loadStories(1, true);
  };

  const renderItem = ({
    item,
  }: {
    item: Story;
  }) => {
    const storyCard: StoryCardData = {
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      image: item.image,
      onPress: () => {
        navigation.navigate(
          Routes.STORY_DETAIL,
          {
            slug: item.slug,
          },
        );
      },
    };

    return (
      <StoryCard story={storyCard} />
    );
  };

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={Colors.gold}
        />
      }
      ListFooterComponent={
        loading && hasMore ? (
          <ActivityIndicator
            color={Colors.gold}
            size="small"
            style={styles.loader}
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  loader: {
    marginVertical: 24,
  },
});