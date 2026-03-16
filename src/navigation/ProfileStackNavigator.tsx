import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountSettingScreen, DeleteAccountScreen } from "@/screens/settings";
import { ProfileScreen } from "@/screens/dashboard";
import MyCarsScreen from "@/screens/cars/MyCarsScreen";
import AddCarScreen from "@/screens/cars/AddCarScreen";
import CarDetailScreen from "@/screens/cars/CarDetailScreen";
import WalletScreen from "@/screens/wallet/WalletScreen";
import TransactionHistoryScreen from "@/screens/wallet/TransactionHistoryScreen";
import WithdrawalScreen from "@/screens/wallet/WithdrawalScreen";
import ChangePasscodeScreen from "@/screens/settings/ChangePasscodeScreen";
import NotificationPreferencesScreen from "@/screens/settings/NotificationPreferencesScreen";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  WalletScreen: undefined;
  TransactionHistory: undefined;
  WithdrawalScreen: undefined;
  Support: undefined;
  AccountSetting: undefined;
  Privacy: undefined;
  DeleteAccount: undefined;
  MyCars: undefined;
  AddCar: undefined;
  CarDetail: { carId: string };
  ChangePasscode: undefined;
  NotificationPreferences: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="WalletScreen" component={WalletScreen} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    <Stack.Screen name="WithdrawalScreen" component={WithdrawalScreen} />
    <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
    <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <Stack.Screen name="MyCars" component={MyCarsScreen} />
    <Stack.Screen name="AddCar" component={AddCarScreen} />
    <Stack.Screen name="CarDetail" component={CarDetailScreen} />
    <Stack.Screen name="ChangePasscode" component={ChangePasscodeScreen} />
    <Stack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
  </Stack.Navigator>
);

export default function App() {
  return <ProfileStackNavigator />;
}
