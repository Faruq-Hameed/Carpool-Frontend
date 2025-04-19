import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import SplashScreen from "../screens/auth/SplashScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ResetAccountScreen from "../screens/auth/ResetAccountScreen";
import VerifyAccountScreen from "../screens/auth/VerifyAccountScreen";
import MainScreen from "../screens/MainScreen";

// the auth stack parameter list
export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  VerifyAccount: undefined;
  ResetAccount: undefined;
  MainScreen: undefined;
};

// a typed stack navigator
const Stack = createStackNavigator<AuthStackParamList>();

// the auth navigation stack
const AuthNavigator: React.FC = () => (
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
    {/* Main screen, with header */}
    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default function App() {
  return <AuthNavigator />;
}
// export default AuthNavigator;
