import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "@/screens/dashboard";
import VerificationNavigator from "./VerificationNavigator";
import AccountSettingScreen from "@/screens/dashboard/profile/AccountSettingScreen";

// the auth stack parameter list
export type ProfileStackParamList = {
  Profile: undefined;
  AccountVerification: undefined;
  Wallet: undefined;
  Support: undefined;
  AccountSetting: undefined;
  Privacy: undefined;
  SignOut: undefined;
  DeleteAccount: undefined;
};

// a typed stack navigator
const Stack = createStackNavigator<ProfileStackParamList>();

// the auth navigation stack
const ProfileStackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false }}
  >
    {/* Profile screen */}
    <Stack.Screen name="Profile" component={ProfileScreen} />

    {/* Account verification stack navigator */}
    <Stack.Screen
      name="AccountVerification"
      component={VerificationNavigator}
      options={{ headerShown: false }}
    />

    {/* Account settings stack navigator */}
    <Stack.Screen
      name="AccountSetting"
      component={AccountSettingScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  return <ProfileStackNavigator />;
}
