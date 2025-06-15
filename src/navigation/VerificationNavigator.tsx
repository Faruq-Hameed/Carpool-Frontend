import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header } from "@rneui/themed"; //TO BE USED LATER

import PersonalInfoScreen from "../screens/main/verifications/PersonalInfoScreen";
import EnterNINScreen from "../screens/main/verifications/EnterNINScreen";


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
      options={{ headerShown: false, 
       }} 
    />
    {/* NIN screen, no header */}
    <Stack.Screen
      name="EnterNIN"
      component={EnterNINScreen}
      options={{ headerShown: false, title: "Account Verification" }}
    />

  </Stack.Navigator>
);

export default function App() {
  return <VerificationNavigator />;
}
// export default VerificationNavigator;
