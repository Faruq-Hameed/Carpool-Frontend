import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/dashboard/Home";
import ProfileScreen from "../screens/dashboard/Profile";

export type DashboardStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DashboardStackParamList>();

const DashboardStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, // You can set this to false if you don't want headers
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardStack;