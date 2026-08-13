import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';

import StoryScreen from '../screens/Story/StoryScreen';
import SubscribeToShowsScreen from '../screens/Subscribe/SubscribeToShowsScreen';

import {PlaybackProvider} from '../playback';

import {Routes} from './routes';
import {RootStackParamList} from './types';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <PlaybackProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Routes.HOME}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name={Routes.HOME}
            component={BottomTabs}
          />

          <Stack.Screen
            name={Routes.STORY_DETAIL}
            component={StoryScreen}
          />

          <Stack.Screen
            name={Routes.SUBSCRIBE_TO_SHOWS}
            component={SubscribeToShowsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlaybackProvider>
  );
}