import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountSettingScreen, DeleteAccountScreen } from "@/screens/settings";
import { ProfileScreen } from "@/screens/dashboard";
import MyCarsScreen from "@/screens/cars/MyCarsScreen";
import AddCarScreen from "@/screens/cars/AddCarScreen";
import CarDetailScreen from "@/screens/cars/CarDetailScreen";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  Wallet: undefined;
  Support: undefined;
  AccountSetting: undefined;
  Privacy: undefined;
  DeleteAccount: undefined;
  MyCars: undefined;
  AddCar: undefined;
  CarDetail: { carId: string };
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
    <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <Stack.Screen name="MyCars" component={MyCarsScreen} />
    <Stack.Screen name="AddCar" component={AddCarScreen} />
    <Stack.Screen name="CarDetail" component={CarDetailScreen} />
  </Stack.Navigator>
);

export default function App() {
  return <ProfileStackNavigator />;
}
