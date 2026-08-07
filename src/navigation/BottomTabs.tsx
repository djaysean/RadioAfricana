import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  House,
  Menu,
  Newspaper,
} from 'lucide-react-native';

import Colors from '../constants/colors';

import HomeScreen from '../screens/Home/HomeScreen';
import MoreScreen from '../screens/More/MoreScreen';
import StoriesScreen from '../screens/Stories/StoriesScreen';

import {Routes} from './routes';

const Tab = createBottomTabNavigator();

const ICON_SIZE = 22;
const ICON_STROKE = 2.25;

function getTabIcon(
  routeName: string,
  color: string,
) {
  switch (routeName) {
    case Routes.HOME:
      return (
        <House
          size={ICON_SIZE}
          color={color}
          strokeWidth={ICON_STROKE}
        />
      );

    case Routes.STORIES:
      return (
        <Newspaper
          size={ICON_SIZE}
          color={color}
          strokeWidth={ICON_STROKE}
        />
      );

    case Routes.MORE:
      return (
        <Menu
          size={ICON_SIZE}
          color={color}
          strokeWidth={ICON_STROKE}
        />
      );

    default:
      return null;
  }
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: '#8C8C8C',

        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: '#ECECEC',
        },

        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 11,
          marginBottom: 2,
        },

        tabBarIcon: ({color}) =>
          getTabIcon(route.name, color),
      })}
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