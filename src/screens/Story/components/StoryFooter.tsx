import React from 'react';

import {
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../../constants/colors';

type Props = {
  title: string;
  url: string;
};

export default function StoryFooter({
  title,
  url,
}: Props) {
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
    <View style={styles.container}>
      <View style={styles.divider} />

      <Text style={styles.heading}>
        Enjoyed this story?
      </Text>

      <Text style={styles.subheading}>
        Share it with someone who might
        enjoy it too.
      </Text>

      <Pressable
        style={styles.button}
        onPress={handleShare}
      >
        <Text style={styles.buttonText}>
          Share Story
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 36,
  },

  divider: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginBottom: 34,
  },

  heading: {
    fontFamily: 'Lora-Bold',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 10,
  },

  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 27,
    color: Colors.textSecondary,
    marginBottom: 28,
  },

  button: {
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});