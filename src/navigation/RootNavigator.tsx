import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import AuthNavigator from "./AuthNavigator";
import DashboardTabs from "./DashboardNavigator";
import { useAuth } from "../hooks/useAuth";

// import AuthNavigator from "./src/navigation/AuthNavigator";
// import DashboardTabs from "./src/navigation/MainNavigator";
//ONLY AUTH WORKING!!
export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
  DashboardStack: undefined;
  VerificationStack: undefined;
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
    </RootStack.Navigator>
  );
}
