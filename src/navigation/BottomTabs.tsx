import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/HomeScreen';
import StoriesScreen from '../screens/Stories/StoriesScreen';
import MoreScreen from '../screens/More/MoreScreen';

import { Routes } from './routes';

const Tab = createBottomTabNavigator();

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
        component={StoriesScreen}
      />

      <Tab.Screen
        name={Routes.MORE}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
}