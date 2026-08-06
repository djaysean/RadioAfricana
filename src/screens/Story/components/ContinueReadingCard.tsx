import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../../constants/colors';

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
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.category}>
          {category.toUpperCase()}
        </Text>

        <Text
          style={styles.title}
          numberOfLines={3}
        >
          {title}
        </Text>
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
    fontFamily: 'Inter-SemiBold',
    color: Colors.gold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    fontFamily: 'Lora-Bold',
    color: Colors.text,
    fontSize: 21,
    lineHeight: 30,
  },
});