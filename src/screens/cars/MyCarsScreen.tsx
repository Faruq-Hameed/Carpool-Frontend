import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { useMyCars } from "@/hooks/useCars";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PaginatedFlatList } from "@/components/shared/PaginatedFlatList";
import { CarCard } from "@/components/cards/CarCard";
import { Car } from "@/apis/cars/types";
import { Colors, Spacing } from "@/theme";

const MyCarsScreen: React.FC = () => {
  const navigation = useProfileNavigation();
  const { data, isLoading, refetch, isRefetching } = useMyCars(1, 50);

  const cars: Car[] = data?.docs ?? [];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title="My Cars"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate("AddCar")}
            hitSlop={10}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={26} color={Colors.primary} />
          </TouchableOpacity>
        }
      />

      <PaginatedFlatList
        data={cars}
        renderItem={(car) => (
          <CarCard
            car={car}
            onPress={() => navigation.navigate("CarDetail", { carId: car.id })}
          />
        )}
        keyExtractor={(car) => car.id}
        isLoading={isLoading}
        onRefresh={refetch}
        isRefreshing={isRefetching}
        emptyTitle="No cars yet"
        emptySubtitle="Register your first car to start offering rides."
        contentContainerStyle={styles.list}
      />

      {/* Floating add button for empty state convenience */}
      {!isLoading && cars.length === 0 && (
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("AddCar")}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: Spacing.base,
  },
  fabContainer: {
    position: "absolute",
    bottom: Spacing.xxl,
    right: Spacing.base,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default MyCarsScreen;
