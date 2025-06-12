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
import ForgotPasscodeScreen from "../screens/auth/ForgotPasscodeScreen";
import EnterOTPScreen from "../screens/auth/EnterOTPScreen";
import CreatePasscodeScreen from "../screens/auth/CreatePasscodeScreen";
// import WelcomeUserScreen from "../screens/auth/WelcomeUserScreen";

// the auth stack parameter list
export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  VerifyAccount: undefined;
  ResetAccount: undefined;
  ForgotPasscode: undefined;
  EnterOTP: { phonenumber: string };//to pass the phone number to the EnterOTPScreen from screen we came from
  CreatePasscode: undefined;
  WelcomeUser: undefined;
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
    <Stack.Screen
      name="ForgotPasscode"
      component={ForgotPasscodeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EnterOTP"
      component={EnterOTPScreen}
      options={{ headerShown: false }}
    />
      <Stack.Screen
      name="CreatePasscode"
      component={CreatePasscodeScreen}
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
