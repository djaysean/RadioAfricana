import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../constants/colors';

export type StoryCardData = {
  id: string;
  title: string;
  excerpt: string;
  image: ImageSourcePropType | string;
  category: string;
  onPress?: () => void;
};

type Props = {
  story: StoryCardData;
};

export default function StoryCard({
  story,
}: Props) {
  const imageSource: ImageSourcePropType =
    typeof story.image === 'string'
      ? ({ uri: story.image } as ImageURISource)
      : story.image;

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={story.onPress}
      style={styles.container}
    >
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.category}
        >
          {story.category.toUpperCase()}
        </Text>

        <Text
          numberOfLines={2}
          style={styles.title}
        >
          {story.title}
        </Text>

        <Text
          numberOfLines={3}
          style={styles.excerpt}
        >
          {story.excerpt}
        </Text>

        <Text style={styles.readMore}>
          Read Story →
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 190,
  },

  content: {
    padding: 18,
  },

  category: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 28,
  },

  excerpt: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },

  readMore: {
    marginTop: 16,
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 14,
  },
});