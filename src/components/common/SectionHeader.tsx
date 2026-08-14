import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../ui/AppText';
import Colors from '../../constants/colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText
        variant="heading3"
        style={styles.title}
      >
        {title}
      </AppText>

      {subtitle ? (
        <AppText
          variant="bodySmall"
          style={styles.subtitle}
        >
          {subtitle}
        </AppText>
      ) : null}
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
    color: Colors.text,
  },

  subtitle: {
    marginTop: 6,
    color: Colors.textSecondary,
  },
});