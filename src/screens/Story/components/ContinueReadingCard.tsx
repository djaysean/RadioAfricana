import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../../constants/colors';
import AppText from '../../../components/ui/AppText';

type Props = {
  image: string;
  category: string;
  title: string;
  onPress: () => void;
};

export default function ContinueReadingCard({
  image,
  category,
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={{uri: image}}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <AppText
          variant="label"
          style={styles.category}
        >
          {category.toUpperCase()}
        </AppText>

        <AppText
          variant="heading3"
          numberOfLines={3}
          style={styles.title}
        >
          {title}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 18,
    backgroundColor: Colors.white,
    borderRadius: 18,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  image: {
    width: '100%',
    height: 175,
  },

  content: {
    padding: 18,
  },

  category: {
    color: Colors.gold,
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    color: Colors.text,
    lineHeight: 30,
  },
});