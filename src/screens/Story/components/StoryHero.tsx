import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import Colors from '../../../constants/colors';

type Props = {
  image: string;
  category: string;
  title: string;
  publishedAt: string;
};

export default function StoryHero({
  image,
  category,
  title,
  publishedAt,
}: Props) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.icon}>
            ←
          </Text>
        </Pressable>

        <Text style={styles.brand}>
          RADIO AFRICANA
        </Text>

        <Pressable
          style={styles.iconButton}
        >
          <Text style={styles.icon}>
            ⤴
          </Text>
        </Pressable>
      </View>

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.category}>
          {category.toUpperCase()}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.date}>
          Published{' '}
          {new Date(
            publishedAt,
          ).toLocaleDateString(
            'en-GB',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            },
          )}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  iconButton: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 24,
    color: Colors.gold,
    fontWeight: '700',
  },

  brand: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    letterSpacing: 1.6,
  },

  image: {
    width: '100%',
    height: 260,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  category: {
    color: Colors.gold,
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },

  title: {
    color: Colors.text,
    fontFamily: 'Lora-Bold',
    fontSize: 34,
    lineHeight: 44,
  },

  date: {
    marginTop: 18,
    color: Colors.textSecondary,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});