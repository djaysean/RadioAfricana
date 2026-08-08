import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
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

import {Routes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/types';

const STORIES_PER_PAGE = 10;

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function StoriesFeed() {
  const navigation =
    useNavigation<NavigationProp>();

  const [stories, setStories] = useState<Story[]>(
    [],
  );

  const [page, setPage] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [hasMore, setHasMore] =
    useState(true);

  const [hasLoaded, setHasLoaded] =
    useState(false);

  const [error, setError] =
    useState(false);

  const [loadingMoreError, setLoadingMoreError] =
    useState(false);

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

      if (replace) {
        setError(false);
      } else {
        setLoadingMoreError(false);
      }

      try {
        const newStories =
          await fetchLatestStories(
            pageToLoad,
          );

        if (replace) {
          setStories(newStories);
        } else {
          setStories(current => [
            ...current,
            ...newStories,
          ]);
        }

        setHasMore(
          newStories.length >=
            STORIES_PER_PAGE,
        );

        setHasLoaded(true);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.message.includes(
            'API request failed: 400',
          )
        ) {
          setHasMore(false);
          setHasLoaded(true);
        } else if (replace) {
          setError(true);
          setHasLoaded(true);
        } else {
          setLoadingMoreError(true);
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
    if (
      loadingRef.current ||
      !hasMore
    ) {
      return;
    }

    const nextPage = page + 1;

    setPage(nextPage);

    loadStories(nextPage);
  };

  const retryInitialLoad = () => {
    if (loadingRef.current) {
      return;
    }

    setPage(1);
    setHasMore(true);
    loadStories(1, true);
  };

  const retryLoadMore = () => {
    if (loadingRef.current) {
      return;
    }

    const nextPage = page + 1;

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

  const renderEmptyState = () => {
    if (!hasLoaded || loading) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <ActivityIndicator
            color={Colors.gold}
            size="small"
          />
        </View>
      );
    }

    if (error) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyTitle}>
            Unable to load Stories
          </Text>

          <Text style={styles.emptyText}>
            We couldn't load the latest
            stories right now. Please try
            again.
          </Text>

          <Pressable
            onPress={retryInitialLoad}
            style={({pressed}) => [
              styles.retryButton,
              pressed &&
                styles.retryButtonPressed,
            ]}
          >
            <Text style={styles.retryText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View
        style={styles.emptyContainer}
      >
        <Text style={styles.emptyTitle}>
          No Stories Yet
        </Text>

        <Text style={styles.emptyText}>
          There are no stories available
          right now. Please check again
          later.
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (loading && stories.length > 0) {
      return (
        <ActivityIndicator
          color={Colors.gold}
          size="small"
          style={styles.loader}
        />
      );
    }

    if (loadingMoreError) {
      return (
        <View
          style={styles.footerContainer}
        >
          <Text style={styles.footerText}>
            Couldn't load more stories.
          </Text>

          <Pressable
            onPress={retryLoadMore}
            style={({pressed}) => [
              styles.retryButton,
              pressed &&
                styles.retryButtonPressed,
            ]}
          >
            <Text style={styles.retryText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      data={stories}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.content,
        stories.length === 0 &&
          styles.emptyContent,
      ]}
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
      ListEmptyComponent={
        renderEmptyState
      }
      ListFooterComponent={
        renderFooter
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  emptyContent: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    minHeight: 280,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  emptyTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },

  emptyText: {
    maxWidth: 300,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.text,
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: Colors.gold,
  },

  retryButtonPressed: {
    opacity: 0.7,
  },

  retryText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },

  loader: {
    marginVertical: 24,
  },

  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },

  footerText: {
    marginBottom: 4,
    fontSize: 13,
    color: Colors.text,
    textAlign: 'center',
  },
});