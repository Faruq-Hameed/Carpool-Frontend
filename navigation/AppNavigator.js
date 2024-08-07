import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the navigation stack
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    {/* Splash screen, no header */}
    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
    {/* Welcome screen, no header */}
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    {/* Sign up screen, no header */}
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false}} />
    {/* Login screen, with no header */}
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </Stack.Navigator>

);

export default AppNavigator;

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import SplashScreen from "../screens/SplashScreen";
// import WelcomeScreen from "../screens/WelcomeScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import LoginScreen from "../screens/LoginScreen";
// import VerifyAccountScreen from "../screens/VerifyAccountScreen";
// import RecoverAccountScreen from "../screens/RecoverAccountScreen";

// // Create a stack navigator
// const Stack = createStackNavigator();


// // Define the navigation stack
// const AppNavigator = () => (
//   <Stack.Navigator initialRouteName="Splash">
//     {/* Splash screen, no header */}
//     <Stack.Screen
//       name="Splash"
//       component={SplashScreen}
//       options={{ headerShown: false }}
//     />
//     {/* Welcome screen */}
//     <Stack.Screen
//       name="Welcome"
//       component={WelcomeScreen}
//       options={{ headerShown: true }}
//     />
//     {/* Sign up screen, no header */}
//     <Stack.Screen
//       name="SignUp"
//       component={SignUpScreen}
//       options={{ headerShown: false }}
//     />
//     {/* Login screen */}
//     <Stack.Screen
//       name="Login"
//       component={LoginScreen}
//       options={{ headerShown: true }}
//     />
//     {/* Verify account screen */}
//     <Stack.Screen
//       name="VerifyAccount"
//       component={VerifyAccountScreen}
//       options={{ headerShown: true }}
//     />
//     {/* Recover account screen */}
//     <Stack.Screen
//       name="RecoverAccount"
//       component={RecoverAccountScreen}
//       options={{ headerShown: true }}
//     />
//   </Stack.Navigator>
// );

// export default AppNavigator;
