import React from 'react';

import {
  Pressable,
  Share,
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../../../components/ui/AppText';
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
      console.error(
  'Share failed:',
  error,
);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <AppText
        variant="heading3"
        style={styles.heading}
      >
        Enjoyed this story?
      </AppText>

      <AppText
        variant="body"
        style={styles.subheading}
      >
        Share it with someone who might
        enjoy it too.
      </AppText>

      <Pressable
        style={styles.button}
        onPress={handleShare}
      >
        <AppText
          variant="button"
          style={styles.buttonText}
        >
          Share Story
        </AppText>
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
    color: Colors.text,
    marginBottom: 10,
  },

  subheading: {
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
    color: Colors.white,
  },
});