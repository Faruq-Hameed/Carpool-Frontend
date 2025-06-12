import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import VerificationStack from './src/navigation/VerificationNavigator';

//root stack navigator parameter list
export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
  VerificationStack: undefined; //PLACEHOLDER
};

const RootStack = createStackNavigator<RootStackParamList>();

// RootNavigator component. This is the main entry point for the app's navigation.
// It determines which screens to show based on the user's authentication status.
//It uses a stack navigator to switch between the authentication stack and the main app stack.
export default function RootStackNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // I WILL ADD A SPLASH SCREEN HERE LATER
    console.log('Loading...');
    return null;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Auth Stack - Shows when user is not authenticated
        // <RootStack.Screen name="AuthStack" component={AuthNavigator} />
        <RootStack.Screen name="AuthStack" component={VerificationStack} />
      ) : (
        // Main Stack - Shows when user is authenticated
        // <RootStack.Screen name="MainStack" component={MainNavigator} />
        <RootStack.Screen
          name="VerificationStack"
          component={VerificationStack}
        />
      )}
    </RootStack.Navigator>
  );
}
