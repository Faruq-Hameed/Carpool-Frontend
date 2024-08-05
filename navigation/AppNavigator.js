import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the navigation stack
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    {/* Splash screen, no header */}
    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
    {/* Welcome screen, no header */}
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: true }} />
    {/* Sign up screen, no header */}
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;
