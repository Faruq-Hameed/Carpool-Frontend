import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RideSearchQuery } from "@/apis/rides/types";
import RideResultsScreen from "@/screens/rides/RideResultsScreen";
import RideDetailScreen from "@/screens/rides/RideDetailScreen";

export type RideStackParamList = {
  RideResults: { query: RideSearchQuery };
  RideDetail: { rideId: string };
};

const Stack = createStackNavigator<RideStackParamList>();

export default function RideStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RideResults" component={RideResultsScreen} />
      <Stack.Screen name="RideDetail" component={RideDetailScreen} />
    </Stack.Navigator>
  );
}
