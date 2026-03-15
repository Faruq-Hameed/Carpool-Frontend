import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RideStackParamList } from "@/navigation/RideStackNavigator";
import { useRideNavigation } from "@/hooks/useTypedNavigation";
import { useSearchRides } from "@/hooks/useRides";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PaginatedFlatList } from "@/components/shared/PaginatedFlatList";
import { RideCard } from "@/components/cards/RideCard";
import { Ride } from "@/apis/rides/types";
import { RideSearchSummaryBar } from "./components/RideSearchSummaryBar";
import { Colors } from "@/theme";

type RouteProps = RouteProp<RideStackParamList, "RideResults">;

const RideResultsScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useRideNavigation();
  const { query } = route.params;

  const { data, isLoading, refetch, isRefetching } = useSearchRides(query);

  const rides: Ride[] = data?.docs ?? [];

  const handleEdit = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRidePress = useCallback(
    (rideId: string) => {
      // Pass search origin/destination so booking sheet can pre-fill boarding/alighting
      const searchOrigin =
        query.originLat != null && query.originLng != null
          ? { label: query.origin ?? "", lat: query.originLat, lng: query.originLng }
          : undefined;
      const searchDestination =
        query.destinationLat != null && query.destinationLng != null
          ? { label: query.destination ?? "", lat: query.destinationLat, lng: query.destinationLng }
          : undefined;
      navigation.navigate("RideDetail", { rideId, searchOrigin, searchDestination });
    },
    [navigation, query]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title="Available Rides"
        onBack={() => navigation.goBack()}
      />

      <RideSearchSummaryBar query={query} onEdit={handleEdit} />

      <PaginatedFlatList
        data={rides}
        renderItem={(ride) => (
          <RideCard
            ride={ride}
            onPress={() => handleRidePress(ride.id)}
            showDriver
          />
        )}
        keyExtractor={(ride) => ride.id}
        isLoading={isLoading}
        onRefresh={refetch}
        isRefreshing={isRefetching}
        emptyTitle="No rides found"
        emptySubtitle={`No rides from ${query.origin} to ${query.destination} on this date. Try a different date or check back later.`}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: 16,
  },
});

export default RideResultsScreen;
