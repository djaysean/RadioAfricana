import React, {
  useCallback,
  useEffect,
  useRef,
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

  const loadingRef = useRef(false);

  const loadStories = useCallback(
    async (
      pageToLoad: number,
      replace = false,
    ) => {
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;
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

        setHasMore(
          newStories.length >= STORIES_PER_PAGE,
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes(
            'API request failed: 400',
          )
        ) {
          setHasMore(false);
        } else {
          // Network failures are handled gracefully.
          // Existing stories remain visible.
        }
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadStories(1, true);
  }, [loadStories]);

  const loadMore = () => {
    if (loadingRef.current || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    setPage(nextPage);

    loadStories(nextPage);
  };

  const refresh = () => {
    if (loadingRef.current) {
      return;
    }

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