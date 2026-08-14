import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../constants/colors';
import AppText from '../ui/AppText';

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
      ? {uri: story.image}
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
        <AppText
          variant="label"
          numberOfLines={1}
          style={styles.category}
        >
          {story.category.toUpperCase()}
        </AppText>

        <AppText
          variant="heading3"
          numberOfLines={2}
          style={styles.title}
        >
          {story.title}
        </AppText>

        <AppText
          variant="bodySmall"
          numberOfLines={3}
          style={styles.excerpt}
        >
          {story.excerpt}
        </AppText>

        <AppText
          variant="meta"
          style={styles.readMore}
        >
          Read Story →
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 0,
  },

  image: {
    width: '100%',
    height: 190,
  },

  content: {
    padding: 18,
    paddingBottom: 16,
  },

  category: {
    color: Colors.gold,
    marginBottom: 10,
    letterSpacing: 1,
  },

  title: {
    color: Colors.text,
  },

  excerpt: {
    marginTop: 10,
    color: Colors.textSecondary,
  },

  readMore: {
    marginTop: 14,
    color: Colors.gold,
  },
});