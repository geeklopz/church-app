import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LiveStreamScreen from '../screens/LiveStreamScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import CalendarScreen from '../screens/CalendarScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-paper${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const CalendarStack = createStackNavigator({
  Links: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const LiveStreamStack = createStackNavigator({
  Links: LiveStreamScreen,
});

LiveStreamStack.navigationOptions = {
  tabBarLabel: 'Live Stream',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-videocam${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};


const AnnouncementStack = createStackNavigator({
  Settings: AnnouncementScreen,
});

AnnouncementStack.navigationOptions = {
  tabBarLabel: 'Announcments',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-albums${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const AboutUsStack = createStackNavigator({
  AboutUs: AboutUsScreen,
});

AboutUsStack.navigationOptions = {
  tabBarLabel: 'About Us',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  LiveStreamStack,
  CalendarStack,
  AnnouncementStack,
  AboutUsStack
});
