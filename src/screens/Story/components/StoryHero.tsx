import React from 'react';

import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Share2 } from 'lucide-react-native';

import Colors from '../../../constants/colors';

type Props = {
  image: string;
  category: string;
  title: string;
  publishedAt: string;
  url: string;
};

export default function StoryHero({
  image,
  category,
  title,
  publishedAt,
  url,
}: Props) {
  const navigation = useNavigation();

  async function handleShare() {
    try {
      await Share.share({
        title,
        message: `I'm reading "${title}" on Radio Africana.\n\n${url}\n\nDiscover more stories on Radio Africana.`,
      });
    } catch (error) {
      console.warn(
        'Share failed',
        error,
      );
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Pressable
          style={styles.iconButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <ArrowLeft
            size={24}
            color={Colors.gold}
            strokeWidth={2.25}
          />
        </Pressable>

        <View style={styles.spacer} />

        <Pressable
          style={styles.iconButton}
          onPress={handleShare}
        >
          <Share2
            size={22}
            color={Colors.gold}
            strokeWidth={2.25}
          />
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
          Published •{' '}
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
    height: 72,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    backgroundColor:
      Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  spacer: {
    flex: 1,
  },


  image: {
    width: '100%',
    height: 260,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 28,
  },

  category: {
    color: Colors.gold,
    fontFamily:
      'Inter-SemiBold',
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
    marginTop: 22,
    color: '#8A8A8A',
    fontFamily:
      'Inter-Regular',
    fontSize: 14,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
});