import React, {
  useEffect,
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
  Text,
  View,
} from 'react-native';

import BannerCard from './BannerCard';
import Colors from '../../constants/colors';

import {
  Banner,
  fetchBanners,
} from '../../services/banners';

const {width} = Dimensions.get('window');

const CARD_WIDTH = width - 48;
const SPACING = 16;

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

  useEffect(() => {
    let mounted = true;

    const loadBanners = async () => {
      setState({
        loading: true,
        error: false,
      });

      try {
        const data = await fetchBanners();

        if (!mounted) {
          return;
        }

        setBanners(data);
        setActiveIndex(0);

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

    loadBanners();

    return () => {
      mounted = false;
    };
  }, []);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        (CARD_WIDTH + SPACING),
    );

    setActiveIndex(index);
  };

  const retry = async () => {
    setState({
      loading: true,
      error: false,
    });

    try {
      const data = await fetchBanners();

      setBanners(data);
      setActiveIndex(0);

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
        <Text style={styles.heading}>
          BANNERS
        </Text>

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
        <Text style={styles.heading}>
          BANNERS
        </Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Unable to load banners right now.
          </Text>

          <Pressable
            onPress={retry}
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
      </View>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        BANNERS
      </Text>

      <FlatList
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
    marginTop: 20,
  },

  heading: {
    paddingHorizontal: 24,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.5,
  },

  content: {
    paddingLeft: 24,
    paddingRight: 8,
  },

  card: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: SPACING,
    borderRadius: 22,
    overflow: 'hidden',
  },

  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 6,
  },

  dot: {
    width: 8,
    height: 8,
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
    fontSize: 13,
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
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
});