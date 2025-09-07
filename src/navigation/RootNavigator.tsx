import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

import { useAuth } from "../hooks/useAuth";
import {
  AuthNavigator,
  DashboardTabs,
  ProfileStackNavigator,
  VerificationNavigator,
} from ".";
import { NavigatorScreenParams } from "@react-navigation/native";
import { ProfileStackParamList } from "./ProfileStackNavigator";

export type RootStackParamList = {
  AuthStack: undefined;
  DashboardStack: undefined;
  AccountVerification: undefined;
  /**Making ts allow me to access it’s a nested stack that can take screen + params. */
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <RootStack.Screen name="AuthStack" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="DashboardStack" component={DashboardTabs} />
      )}
      {/* Global navigation routes */}
      <RootStack.Screen
        name="AccountVerification"
        component={VerificationNavigator}
      />
      <RootStack.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </RootStack.Navigator>
  );
}
