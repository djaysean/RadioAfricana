import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  House,
  Menu,
  Newspaper,
} from 'lucide-react-native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Colors from '../constants/colors';

import HomeScreen from '../screens/Home/HomeScreen';
import MoreScreen from '../screens/More/MoreScreen';
import StoriesScreen from '../screens/Stories/StoriesScreen';
import StoryScreen from '../screens/Story/StoryScreen';
import SubscribeToShowsScreen from '../screens/Subscribe/SubscribeToShowsScreen';
import PageScreen from '../screens/Page/PageScreen';
import ContactUsScreen from '../screens/ContactUs/ContactUsScreen';
import MeetTheTeamScreen from '../screens/MeetTheTeam/MeetTheTeamScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy/PrivacyPolicyScreen';
import LiveVideoScreen from '../screens/LiveVideo/LiveVideoScreen';

import {Routes} from './routes';

import {
  HomeStackParamList,
  MoreStackParamList,
  StoriesStackParamList,
} from './types';

const Tab =
  createBottomTabNavigator();

const HomeStack =
  createNativeStackNavigator<
    HomeStackParamList
  >();

const StoriesStack =
  createNativeStackNavigator<
    StoriesStackParamList
  >();

const MoreStack =
  createNativeStackNavigator<
    MoreStackParamList
  >();

export const TAB_BAR_HEIGHT = 68;

const TAB_BAR_TOP_PADDING = 8;
const TAB_BAR_BOTTOM_PADDING = 8;

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

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation:
          'slide_from_right',
      }}
    >
      <HomeStack.Screen
        name={Routes.HOME}
        component={HomeScreen}
      />

      <HomeStack.Screen
        name={Routes.LIVE_VIDEO}
        component={LiveVideoScreen}
      />

      <HomeStack.Screen
        name={
          Routes.STORY_DETAIL
        }
        component={StoryScreen}
      />
    </HomeStack.Navigator>
  );
}

function StoriesStackNavigator() {
  return (
    <StoriesStack.Navigator
      screenOptions={{
        headerShown: false,
        animation:
          'slide_from_right',
      }}
    >
      <StoriesStack.Screen
        name={Routes.STORIES}
        component={StoriesScreen}
      />

      <StoriesStack.Screen
        name={
          Routes.STORY_DETAIL
        }
        component={StoryScreen}
      />
    </StoriesStack.Navigator>
  );
}

function MoreStackNavigator() {
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerShown: false,
        animation:
          'slide_from_right',
      }}
    >
      <MoreStack.Screen
        name={Routes.MORE}
        component={MoreScreen}
      />

      <MoreStack.Screen
        name={Routes.SUBSCRIBE_TO_SHOWS}
        component={
          SubscribeToShowsScreen
        }
      />

      <MoreStack.Screen
        name={Routes.CONTACT_US}
        component={
          ContactUsScreen
        }
      />

      <MoreStack.Screen
        name={Routes.MEET_THE_TEAM}
        component={
          MeetTheTeamScreen
        }
      />

      <MoreStack.Screen
        name={Routes.PRIVACY_POLICY}
        component={
          PrivacyPolicyScreen
        }
      />

      <MoreStack.Screen
        name={Routes.PAGE}
        component={PageScreen}
      />
    </MoreStack.Navigator>
  );
}

export default function BottomTabs() {
  const insets =
    useSafeAreaInsets();

  const bottomInset =
    insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor:
          Colors.gold,

        tabBarInactiveTintColor:
          '#8C8C8C',

        tabBarStyle: {
          height:
            TAB_BAR_HEIGHT +
            bottomInset,

          paddingTop:
            TAB_BAR_TOP_PADDING,

          paddingBottom:
            TAB_BAR_BOTTOM_PADDING +
            bottomInset,

          backgroundColor:
            Colors.white,

          borderTopWidth: 1,

          borderTopColor:
            '#ECECEC',
        },

        tabBarLabelStyle: {
          fontFamily:
            'Inter-SemiBold',

          fontSize: 11,

          marginBottom: 2,
        },

        tabBarIcon: ({color}) =>
          getTabIcon(
            route.name,
            color,
          ),
      })}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={
          HomeStackNavigator
        }
      />

      <Tab.Screen
        name={Routes.STORIES}
        component={
          StoriesStackNavigator
        }
      />

      <Tab.Screen
        name={Routes.MORE}
        component={
          MoreStackNavigator
        }
      />
    </Tab.Navigator>
  );
}