import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import BannerCard from './BannerCard';
import Colors from '../../constants/colors';
import AppText from '../ui/AppText';

import {
  Banner,
  fetchBanners,
} from '../../services/banners';

const {width} = Dimensions.get('window');

const CARD_WIDTH = width - 48;
const SPACING = 16;
const AUTO_SCROLL_INTERVAL = 7000;

type BannerState = {
  loading: boolean;
  error: boolean;
};

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [state, setState] =
    useState<BannerState>({
      loading: true,
      error: false,
    });

  const listRef =
    useRef<FlatList<Banner>>(null);

  const activeIndexRef =
    useRef(0);

  const userInteractingRef =
    useRef(false);

  const resumeTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const setCurrentIndex = useCallback(
    (index: number) => {
      activeIndexRef.current = index;
      setActiveIndex(index);
    },
    [],
  );

  const loadBanners = useCallback(
    async () => {
      setState({
        loading: true,
        error: false,
      });

      try {
        const data = await fetchBanners();

        setBanners(data);
        setCurrentIndex(0);

        setState({
          loading: false,
          error: false,
        });
      } catch {
        setState({
          loading: false,
          error: true,
        });
      }
    },
    [setCurrentIndex],
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchBanners();

        if (!mounted) {
          return;
        }

        setBanners(data);
        setCurrentIndex(0);

        setState({
          loading: false,
          error: false,
        });
      } catch {
        if (!mounted) {
          return;
        }

        setState({
          loading: false,
          error: true,
        });
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [setCurrentIndex]);

  useEffect(() => {
    if (banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (userInteractingRef.current) {
        return;
      }

      const currentIndex =
        activeIndexRef.current;

      const nextIndex =
        currentIndex >= banners.length - 1
          ? 0
          : currentIndex + 1;

      listRef.current?.scrollToOffset({
        offset:
          nextIndex *
          (CARD_WIDTH + SPACING),
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [banners.length, setCurrentIndex]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(
          resumeTimerRef.current,
        );
      }
    };
  }, []);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        (CARD_WIDTH + SPACING),
    );

    const safeIndex = Math.max(
      0,
      Math.min(
        index,
        banners.length - 1,
      ),
    );

    setCurrentIndex(safeIndex);

    userInteractingRef.current = false;

    if (resumeTimerRef.current) {
      clearTimeout(
        resumeTimerRef.current,
      );
    }

    resumeTimerRef.current =
      setTimeout(() => {
        userInteractingRef.current = false;
      }, AUTO_SCROLL_INTERVAL);
  };

  const retry = async () => {
    await loadBanners();
  };

  const openBannerLink = async (
    item: Banner,
  ) => {
    if (!item.hasLink || !item.link) {
      return;
    }

    try {
      await Linking.openURL(item.link);
    } catch {
      // External-link failures remain silent.
    }
  };

  if (state.loading) {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <ActivityIndicator
            color={Colors.gold}
            size="small"
          />
        </View>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <AppText
            variant="bodySmall"
            style={styles.statusText}
          >
            Unable to load banners right now.
          </AppText>

          <Pressable
            onPress={retry}
            style={({pressed}) => [
              styles.retryButton,
              pressed &&
                styles.retryButtonPressed,
            ]}
          >
            <AppText
              variant="label"
              style={styles.retryText}
            >
              Try Again
            </AppText>
          </Pressable>
        </View>
      </View>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        horizontal
        data={banners}
        keyExtractor={item =>
          item.id.toString()
        }
        showsHorizontalScrollIndicator={false}
        snapToInterval={
          CARD_WIDTH + SPACING
        }
        decelerationRate="fast"
        disableIntervalMomentum
        pagingEnabled={false}
        onMomentumScrollEnd={
          onMomentumScrollEnd
        }
        onScrollBeginDrag={() => {
          userInteractingRef.current = true;

          if (resumeTimerRef.current) {
            clearTimeout(
              resumeTimerRef.current,
            );
          }
        }}
        contentContainerStyle={
          styles.content
        }
        renderItem={({item}) => (
          <View style={styles.card}>
            <BannerCard
              image={item.image}
              onPress={() =>
                openBannerLink(item)
              }
            />
          </View>
        )}
      />

      <View style={styles.indicators}>
        {banners.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              activeIndex === index &&
                styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },

  content: {
    paddingLeft: 24,
    paddingRight: 8,
  },

  card: {
    width: CARD_WIDTH,
    height: 190,
    marginRight: SPACING,
    borderRadius: 22,
    overflow: 'hidden',
  },

  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 6,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor: Colors.gold,
  },

  statusContainer: {
    minHeight: 120,
    marginHorizontal: 24,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  statusText: {
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },

  retryButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: Colors.gold,
  },

  retryButtonPressed: {
    opacity: 0.7,
  },

  retryText: {
    color: Colors.white,
  },
});