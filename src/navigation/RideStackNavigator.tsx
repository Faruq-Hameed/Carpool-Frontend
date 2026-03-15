import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RideSearchQuery } from "@/apis/rides/types";
import { PlaceSelection } from "@/screens/dashboard/home/components/PlacesInput";
import RideResultsScreen from "@/screens/rides/RideResultsScreen";
import RideDetailScreen from "@/screens/rides/RideDetailScreen";
import BrowseRidesScreen from "@/screens/rides/BrowseRidesScreen";

export type RideStackParamList = {
  RideResults: { query: RideSearchQuery };
  BrowseRides: undefined;
  RideDetail: {
    rideId: string;
    /** Pre-fill boarding point in booking sheet (from search context) */
    searchOrigin?: PlaceSelection;
    /** Pre-fill alighting point in booking sheet (from search context) */
    searchDestination?: PlaceSelection;
  };
};

const Stack = createStackNavigator<RideStackParamList>();

export default function RideStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RideResults" component={RideResultsScreen} />
      <Stack.Screen name="BrowseRides" component={BrowseRidesScreen} />
      <Stack.Screen name="RideDetail" component={RideDetailScreen} />
    </Stack.Navigator>
  );
}
