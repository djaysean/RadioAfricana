import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';

const { width } = Dimensions.get('window');

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

function BannerCarousel() {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>FEATURED</Text>

      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={item.image}
              style={styles.banner}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View style={styles.indicators}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
  },

  heading: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1,
    marginBottom: 20,
  },

  card: {
    width: width,
    alignItems: 'center',
  },

  banner: {
    width: width - 40,
    height: 180,
    borderRadius: 20,
  },

  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#111111',
  },
});

export default BannerCarousel;