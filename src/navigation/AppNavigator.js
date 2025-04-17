import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import ResetAccountScreen from "../screens/ResetAccountScreen";
import VerifyAccountScreen from "../screens/VerifyAccountScreen";
import MainScreen from "../screens/MainScreen";

// Create a stack navigator
const Stack = createStackNavigator();

// Define the navigation stack
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    {/* Splash screen, no header */}
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    {/* Welcome screen, no header */}
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    {/* Sign up screen, no header */}
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
    {/* Login screen, with no header */}
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    {/* Verify Account screen, with no header */}
    <Stack.Screen
      name="VerifyAccount"
      component={VerifyAccountScreen}
      options={{ headerShown: false }}
    />
    {/* Reset Account screen, with no header */}
    <Stack.Screen
      name="ResetAccount"
      component={ResetAccountScreen}
      options={{ headerShown: false }}
    />
    {/* Reset Account screen, with no header */}
    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
