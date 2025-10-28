import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header } from "@rneui/themed"; //TO BE USED LATER
import {
  EnterLicenseScreen,
  EnterNINScreen,
  PersonalInfoScreen,
  VerificationTypeScreen,
  IdentityVerificationScreen,
  IdentityVerificationTwoScreen,
  ContactInfoScreen,
  ChangeContactInfoScreen,
} from "@/screens/verifications";
import EnterOTPScreen from "@/screens/auth/EnterOTPScreen";
import { VerifyOtpPurposes } from "@/screens/auth/constants";

// the verification stack parameter list
export type VerificationStackParamList = {
  VerificationType: undefined;
  IdentityVerification: undefined;
  IdentityVerificationTwo: undefined;
  PersonalInfo: undefined;
  ContactInfo: undefined;
  EnterNIN: undefined;
  EntireLicense: undefined;
  ConfirmImage: undefined;
  VehicleInformation: undefined;
  // EnterOTP: //to pass the phone number to the EnterOTPScreen from screen we came from

  VerificationOtp: {
    message: string; //api message
    email?: string; //api message
    passcode?: string; 
    phoneNumber?: string; // to pass the phone number to the EnterOTPScreen from screen we came from
    purpose: VerifyOtpPurposes; // to know which api to call for verification
  };
  ChangeContactInfo: {
    type: "email" | "phone";
    passcode: string;
  };
};

// a typed stack navigator
const Stack = createStackNavigator<VerificationStackParamList>();

//I want a tab navigator that contains the verification stack

const tab = createBottomTabNavigator<VerificationStackParamList>();

// the Verification navigation stack
const VerificationNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="VerificationType"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name="VerificationType"
      component={VerificationTypeScreen}
      // options={{ headerShown: false }}
    />
    {/*Identity verification info screen */}
    <Stack.Screen
      name="IdentityVerification"
      component={IdentityVerificationScreen}
      // options={{ headerShown: false }}
    />
    {/*Identity verification two screen */}
    <Stack.Screen
      name="IdentityVerificationTwo"
      component={IdentityVerificationTwoScreen}
      // options={{ headerShown: false }}
    />
    {/*PersonalInfo screen */}
    <Stack.Screen
      name="PersonalInfo"
      component={PersonalInfoScreen}
      // options={{ headerShown: false }}
    />
    {/* Contact info screen */}
    <Stack.Screen name="ContactInfo" component={ContactInfoScreen} />
    {/* NIN screen, no header */}
    <Stack.Screen
      name="EnterNIN"
      component={EnterNINScreen}
      // options={{ headerShown: false }}
    />
    {/* Entire Driver License */}
    <Stack.Screen
      name="EntireLicense"
      component={EnterLicenseScreen}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VerificationOtp"
      component={EnterOTPScreen}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChangeContactInfo"
      component={ChangeContactInfoScreen}
      // options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default VerificationNavigator;
