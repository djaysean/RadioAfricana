/**
 * Radio Africana Mobile
 * Release 0.6
 *
 * Bottom Tab Navigation
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen';
import FeaturedStories from '../components/stories/FeaturedStories';

import { Routes } from './routes';

const Tab = createBottomTabNavigator();

function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text>More</Text>
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeScreen}
      />

      <Tab.Screen
        name={Routes.STORIES}
        component={FeaturedStories}
      />

      <Tab.Screen
        name={Routes.MORE}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});