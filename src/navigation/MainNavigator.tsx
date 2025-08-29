import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import VerificationStack from './VerificationNavigator';
import MainScreen from '../screens/MainScreen';
//NOTHING IN THIS ENTIRE FLE WORKS FOR NOW!!!
export type DashboardTabParamList = {
  Home: undefined;
  Offer: undefined;
  History: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabelStyle: { fontSize: 12 },
  tabBarActiveTintColor: '#126415',
  tabBarInactiveTintColor: '#777',
};

const DashboardTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Offer"
        component={VerificationStack}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={VerificationStack}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={VerificationStack}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={VerificationStack}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardTabs;
