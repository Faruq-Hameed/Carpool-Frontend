import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import AuthNavigator from "./AuthNavigator";
import DashboardTabs from "./DashboardNavigator";
import { useAuth } from "../hooks/useAuth";
import { ProfileStackNavigator, VerificationNavigator } from ".";

export type RootStackParamList = {
  AuthStack: undefined;
  DashboardStack: undefined;
  AccountVerification: undefined;
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
      {/* Global navigation route */}
      <RootStack.Screen name="AccountVerification" component={VerificationNavigator} />
    </RootStack.Navigator>
  );
}
