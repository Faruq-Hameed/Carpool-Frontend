import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMyBookings, useMyRides } from "@/hooks/useRides";
import { useRootNavigation } from "@/hooks/useTypedNavigation";
import { Ride, RideBooking } from "@/apis/rides/types";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PaginatedFlatList } from "@/components/shared/PaginatedFlatList";
import { BookingCard } from "@/components/cards/BookingCard";
import { RideCard } from "@/components/cards/RideCard";
import { Colors, Spacing } from "@/theme";
import {
  HistoryTabBar,
  HistoryTab,
} from "./history/components/HistoryTabBar";

const PAGE_SIZE = 15;

// ─── Passenger sub-screen ─────────────────────────────────────────────────────

interface PassengerHistoryProps {
  onRidePress: (rideId: string) => void;
}

const PassengerHistory: React.FC<PassengerHistoryProps> = ({ onRidePress }) => {
  const [page, setPage] = useState(1);
  const [allBookings, setAllBookings] = useState<RideBooking[]>([]);

  const { data, isLoading, isFetching, refetch } = useMyBookings(
    page,
    PAGE_SIZE
  );

  // Accumulate across pages; full reset when page goes back to 1
  useEffect(() => {
    if (!data?.docs) return;
    setAllBookings((prev) =>
      page === 1 ? data.docs : [...prev, ...data.docs]
    );
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (data && page < data.total_pages && !isFetching) {
      setPage((p) => p + 1);
    }
  }, [data, page, isFetching]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  return (
    <PaginatedFlatList
      data={allBookings}
      renderItem={(booking) => (
        <BookingCard
          booking={booking}
          onPress={() => onRidePress(booking.ride?.id ?? booking.rideId)}
          perspective="passenger"
        />
      )}
      keyExtractor={(b) => b.id}
      isLoading={isLoading && page === 1}
      isFetchingNextPage={isFetching && page > 1}
      hasNextPage={data ? page < data.total_pages : false}
      onLoadMore={handleLoadMore}
      onRefresh={handleRefresh}
      isRefreshing={isFetching && page === 1 && allBookings.length > 0}
      emptyTitle="No bookings yet"
      emptySubtitle="Rides you book as a passenger will appear here."
      contentContainerStyle={styles.list}
    />
  );
};

// ─── Driver sub-screen ────────────────────────────────────────────────────────

interface DriverHistoryProps {
  onRidePress: (rideId: string) => void;
}

const DriverHistory: React.FC<DriverHistoryProps> = ({ onRidePress }) => {
  const [page, setPage] = useState(1);
  const [allRides, setAllRides] = useState<Ride[]>([]);

  const { data, isLoading, isFetching, refetch } = useMyRides(page, PAGE_SIZE);

  useEffect(() => {
    if (!data?.docs) return;
    setAllRides((prev) =>
      page === 1 ? data.docs : [...prev, ...data.docs]
    );
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (data && page < data.total_pages && !isFetching) {
      setPage((p) => p + 1);
    }
  }, [data, page, isFetching]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  return (
    <PaginatedFlatList
      data={allRides}
      renderItem={(ride) => (
        <RideCard
          ride={ride}
          onPress={() => onRidePress(ride.id)}
          showDriver={false}
        />
      )}
      keyExtractor={(r) => r.id}
      isLoading={isLoading && page === 1}
      isFetchingNextPage={isFetching && page > 1}
      hasNextPage={data ? page < data.total_pages : false}
      onLoadMore={handleLoadMore}
      onRefresh={handleRefresh}
      isRefreshing={isFetching && page === 1 && allRides.length > 0}
      emptyTitle="No rides offered yet"
      emptySubtitle="Rides you create as a driver will appear here."
      contentContainerStyle={styles.list}
    />
  );
};

// ─── History screen ───────────────────────────────────────────────────────────

const HistoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HistoryTab>("passenger");
  const rootNavigation = useRootNavigation();

  const handleRidePress = useCallback(
    (rideId: string) => {
      rootNavigation.navigate("RideStack", {
        screen: "RideDetail",
        params: { rideId },
      });
    },
    [rootNavigation]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="History" />

      <View style={styles.tabWrap}>
        <HistoryTabBar activeTab={activeTab} onChange={setActiveTab} />
      </View>

      {activeTab === "passenger" ? (
        <PassengerHistory onRidePress={handleRidePress} />
      ) : (
        <DriverHistory onRidePress={handleRidePress} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabWrap: {
    paddingTop: Spacing.md,
  },
  list: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
});

export default HistoryScreen;
