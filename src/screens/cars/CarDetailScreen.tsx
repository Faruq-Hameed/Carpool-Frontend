import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { ProfileStackParamList } from "@/navigation/ProfileStackNavigator";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { useCarById, useDeleteCar } from "@/hooks/useCars";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { InlineAlert } from "@/components/shared/InlineAlert";
import { VerificationStatusCard } from "./components/VerificationStatusCard";
import { CarImageGrid } from "./components/CarImageGrid";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

type RouteProps = RouteProp<ProfileStackParamList, "CarDetail">;

// ─── Labelled info row ────────────────────────────────────────────────────────
const InfoRow: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={16} color={Colors.textSecondary} style={styles.infoIcon} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const CarDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useProfileNavigation();
  const { carId } = route.params;

  const { data: car, isLoading, error } = useCarById(carId);
  const deleteCarMutation = useDeleteCar();

  const handleDelete = () => {
    Alert.alert(
      "Delete Car",
      "Are you sure you want to remove this car? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteCarMutation.mutate(carId, {
              onSuccess: () => {
                Alert.alert("Deleted", "Car has been removed.", [
                  { text: "OK", onPress: () => navigation.navigate("MyCars") },
                ]);
              },
              onError: (err: any) => {
                const message =
                  err?.response?.data?.message ?? "Could not delete car. Try again.";
                Alert.alert("Error", message);
              },
            });
          },
        },
      ]
    );
  };

  if (isLoading) return <LoadingState message="Loading car details..." />;

  if (error || !car) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScreenHeader title="Car Details" onBack={() => navigation.goBack()} />
        <View style={styles.pad}>
          <InlineAlert type="error" message="Could not load car details. Go back and try again." />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title={`${car.vehicleMake} ${car.vehicleModel}`}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Verification status */}
        <VerificationStatusCard status={car.carStatus} />

        {/* Car details */}
        <View style={styles.card}>
          <SectionHeader title="Vehicle Details" />
          <InfoRow icon="card-outline" label="Plate Number" value={car.plateNumber} />
          <InfoRow icon="car-outline" label="Make" value={car.vehicleMake} />
          <InfoRow icon="layers-outline" label="Model" value={car.vehicleModel} />
          <InfoRow icon="grid-outline" label="Category" value={car.vehicleCategory} />
          <InfoRow
            icon="color-palette-outline"
            label="Color"
            value={car.color.charAt(0).toUpperCase() + car.color.slice(1)}
          />
        </View>

        {/* Photos */}
        <View style={styles.photosSection}>
          <SectionHeader title="Photos" />
          {car.images && car.images.length === 0 && (
            <InlineAlert
              type="info"
              message="No photos added yet. Clear photos of front, back, interior, and sides help get your car verified faster."
            />
          )}
          <CarImageGrid images={car.images ?? []} />
        </View>

        {/* Danger zone */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
            disabled={deleteCarMutation.isPending}
            activeOpacity={0.85}
          >
            {deleteCarMutation.isPending ? (
              <ActivityIndicator size="small" color={Colors.error} />
            ) : (
              <>
                <Ionicons name="trash-outline" size={16} color={Colors.error} />
                <Text style={styles.deleteBtnText}>Remove this car</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  pad: {
    padding: Spacing.base,
  },

  // Details card
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoIcon: {
    marginRight: Spacing.sm,
    width: 20,
  },
  infoLabel: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "right",
    flexShrink: 1,
  },

  // Photos
  photosSection: {
    marginBottom: Spacing.base,
  },

  // Danger zone
  dangerZone: {
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: Radius.md,
    padding: Spacing.base,
    backgroundColor: Colors.errorBg,
  },
  dangerTitle: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.error,
    marginBottom: Spacing.md,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  deleteBtnText: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.error,
  },
});

export default CarDetailScreen;
