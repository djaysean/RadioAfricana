import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BannerCard from './banners/BannerCard';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width - 48;
const SPACING = 16;

const banners = [
  {
    id: '1',
    image: require('../../assets/images/logo.png'),
  },
  {
    id: '2',
    image: require('../../assets/images/logo.png'),
  },
  {
    id: '3',
    image: require('../../assets/images/logo.png'),
  },
];

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        (CARD_WIDTH + SPACING),
    );

    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        BANNERS
      </Text>

      <FlatList
        horizontal
        data={banners}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        disableIntervalMomentum
        pagingEnabled={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <BannerCard image={item.image} />
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
});