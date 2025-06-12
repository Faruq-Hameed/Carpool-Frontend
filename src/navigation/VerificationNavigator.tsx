import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PersonalInfoScreen from "../screens/main/verifications/PersonalInfoScreen";
import EnterNINScreen from "../screens/main/verifications/EnterNINScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


// the verification stack parameter list
export type VerificationStackParamList = {
  PersonalInfo: undefined;
  EnterNIN: undefined;
};

// a typed stack navigator
const Stack = createStackNavigator<VerificationStackParamList>();

//I want a tab navigator that contains the verification stack

const tab = createBottomTabNavigator<VerificationStackParamList>();



// the Verification navigation stack
const VerificationNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="PersonalInfo">
    {/* PersonalInfo screen, no header */}
    <Stack.Screen
      name="PersonalInfo"
      component={PersonalInfoScreen}
      options={{ headerShown: false }}
    />
    {/* NIN screen, no header */}
    <Stack.Screen
      name="EnterNIN"
      component={EnterNINScreen}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

export default function App() {
  return <VerificationNavigator />;
}
// export default VerificationNavigator;
