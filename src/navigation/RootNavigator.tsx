import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

import { useAuth } from "../hooks/useAuth";
import {
  AuthNavigator,
  DashboardTabs,
  ProfileStackNavigator,
  VerificationNavigator,
  RideStackNavigator,
} from ".";
import { NavigatorScreenParams } from "@react-navigation/native";
import { ProfileStackParamList } from "./ProfileStackNavigator";
import { AuthStackParamList } from "./AuthNavigator";
import { RideStackParamList } from "./RideStackNavigator";

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  DashboardStack: undefined;
  AccountVerification: undefined;
  /** Making ts allow me to access it's a nested stack that can take screen + params. */
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  /** Ride search results and ride detail screens */
  RideStack: NavigatorScreenParams<RideStackParamList>;
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
        <>
          {/* Main dashboard tabs */}
          <RootStack.Screen name="DashboardStack" component={DashboardTabs} />
          {/* Global routes accessible from anywhere inside the app */}
          <RootStack.Screen
            name="AccountVerification"
            component={VerificationNavigator}
          />
          <RootStack.Screen
            name="ProfileStack"
            component={ProfileStackNavigator}
          />
          <RootStack.Screen name="RideStack" component={RideStackNavigator} />
        </>
      )}
    </RootStack.Navigator>
  );
}
