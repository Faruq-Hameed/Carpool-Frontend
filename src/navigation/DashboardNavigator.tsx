import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import {
  HomeScreen,
  OfferRideScreen,
  HistoryScreen,
  MessageScreen,
  ProfileScreen,
} from "../screens/dashboard";
import ProfileStackNavigator from "./ProfileStackNavigator";

export type DashboardTabParamList = {
  Home: undefined;
  Offer: undefined;
  History: undefined;
  Messages: undefined;
  //   /**TypeScript knows that the "Profile" tab isn’t just a screen — it’s a nested stack that can take screen + params. */
  // Profile:  NavigatorScreenParams<ProfileStackParamList>; //nested navigator

  Profile: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabelStyle: { fontSize: 12 },
  tabBarActiveTintColor: "#126415",
  tabBarInactiveTintColor: "#777",
};

const DashboardTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Offer"
        component={OfferRideScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        // component={ProfileScreen}
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
