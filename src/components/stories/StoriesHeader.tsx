/**
 * Radio Africana Mobile
 * Release 0.6
 *
 * Stories Header
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function StoriesHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        African Stories, Culture & Diaspora
      </Text>

      <Text style={styles.subtitle}>
        Explore stories celebrating African culture, history,
        travel, languages and diaspora life from Radio Africana.
      </Text>
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
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: '#111111',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
  },
});