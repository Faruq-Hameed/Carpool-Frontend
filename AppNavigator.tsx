import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

import AuthNavigator from "./src/navigation/AuthNavigator";
import DashboardTabs from "./src/navigation/MainNavigator";
//ONLY AUTH WORKING!!
export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
  DashboardStack: undefined;
  VerificationStack: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log({ token });
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Auth Stack - Shows when user is not authenticated
        <RootStack.Screen name="AuthStack" component={AuthNavigator} />
        // <RootStack.Screen name="MainStack" component={MainNavigator} />
      ) : (
        // <RootStack.Screen name="AuthStack" component={VerificationStack} />
        // Main Stack - Shows when user is authenticated
        // <RootStack.Screen name="MainStack" component={MainNavigator} />
        <RootStack.Screen name="VerificationStack" component={AuthNavigator}/>

        // <RootStack.Screen
        //   name="VerificationStack"
        //   component={VerificationStack}
        // />
      )}
    </RootStack.Navigator>
  );
}