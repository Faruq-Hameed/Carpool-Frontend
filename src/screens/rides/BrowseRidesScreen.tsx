import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useRideNavigation } from "@/hooks/useTypedNavigation";
import { useSearchRides } from "@/hooks/useRides";
import { Ride } from "@/apis/rides/types";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PaginatedFlatList } from "@/components/shared/PaginatedFlatList";
import { RideCard } from "@/components/cards/RideCard";
import { Colors, Spacing, FontSize, Radius } from "@/theme";

const PAGE_SIZE = 15;

const BrowseRidesScreen: React.FC = () => {
  const navigation = useRideNavigation();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [page, setPage] = useState(1);
  const [allRides, setAllRides] = useState<Ride[]>([]);

  const dateString = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : undefined;

  const { data, isLoading, isFetching, refetch } = useSearchRides({
    page,
    size: PAGE_SIZE,
    date: dateString,
  });

  useEffect(() => {
    if (!data?.docs) return;
    setAllRides((prev) => (page === 1 ? data.docs : [...prev, ...data.docs]));
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

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setPage(1);
      setAllRides([]);
    }
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    setPage(1);
    setAllRides([]);
  };

  const handleRidePress = useCallback(
    (rideId: string) => {
      navigation.navigate("RideDetail", { rideId });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Browse Rides" onBack={() => navigation.goBack()} />

      {/* Date filter bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
          <Text style={styles.dateBtnText}>
            {selectedDate
              ? selectedDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Filter by date"}
          </Text>
        </TouchableOpacity>

        {selectedDate && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearDate}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate ?? new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      <PaginatedFlatList
        data={allRides}
        renderItem={(ride) => (
          <RideCard
            ride={ride}
            onPress={() => handleRidePress(ride.id)}
            showDriver
          />
        )}
        keyExtractor={(ride) => ride.id}
        isLoading={isLoading && page === 1}
        isFetchingNextPage={isFetching && page > 1}
        hasNextPage={data ? page < data.total_pages : false}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        isRefreshing={isFetching && page === 1 && allRides.length > 0}
        emptyTitle="No rides available"
        emptySubtitle="There are no upcoming rides right now. Check back later or search for a specific route."
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
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  dateBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
  },
  dateBtnText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
  clearBtn: {
    padding: 4,
  },
  list: {
    padding: Spacing.base,
  },
});

export default BrowseRidesScreen;
