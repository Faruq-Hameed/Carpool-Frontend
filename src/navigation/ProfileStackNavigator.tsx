import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {AccountSettingScreen, DeleteAccountScreen} from "@/screens/settings";
import { ProfileScreen } from "@/screens/dashboard";

// the profile stack parameter list
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  // AccountVerification: undefined;
  Wallet: undefined;
  Support: undefined;
  AccountSetting: undefined;
  Privacy: undefined;
  DeleteAccount: undefined;
};

// a typed stack navigator
const Stack = createStackNavigator<ProfileStackParamList>();

// the auth navigation stack
const ProfileStackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{ headerShown: false }}
  >
    {/* Profile screen */}
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

    {/* Account verification stack navigator */}
    {/* <Stack.Screen
      name="AccountVerification"
      component={VerificationNavigator}
      options={{ headerShown: false }}
    /> */}

    {/* Account settings stack navigator */}
    <Stack.Screen
      name="AccountSetting"
      component={AccountSettingScreen}
      options={{ headerShown: false }}
    />

    {/* Account settings stack navigator */}
    {/* <Stack.Screen
      name="SignOut"
      component={SignOutScreen}
      options={{ headerShown: false }}
    /> */}

    <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccountScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  return <ProfileStackNavigator />;
}
