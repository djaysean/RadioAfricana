import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../../components/ui/AppText';
import Colors from '../../constants/colors';

export default function SubscribeToShowsScreen() {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <AppText
            variant="body"
            style={styles.title}
          >
            Subscribe to Shows
          </AppText>

          <AppText
            variant="body"
            style={styles.description}
          >
            Choose the Radio Africana programmes
            you'd like to receive notifications for.
          </AppText>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  title: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 12,
  },

  description: {
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    lineHeight: 24,
  },
});