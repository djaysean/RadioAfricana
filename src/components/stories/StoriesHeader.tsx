import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../ui/AppText';

export default function StoriesHeader() {
  return (
    <View style={styles.container}>
      <AppText
        variant="heading2"
        style={styles.title}
      >
        African Stories, Culture & Diaspora
      </AppText>

      <AppText
        variant="bodySmall"
        style={styles.subtitle}
      >
        Explore stories celebrating African culture, history,
        travel, languages and diaspora life from Radio Africana.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },

  title: {
    color: '#111111',
  },

  subtitle: {
    marginTop: 8,
    color: '#666666',
  },
});