import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import User from "@/models/User";
import { RideCar } from "@/apis/rides/types";
import { Colors, Spacing, Radius, FontSize } from "@/theme";
import { useUserReviews } from "@/hooks/useReviews";

interface DriverInfoProps {
  driver: User;
  car?: RideCar;
}

/** Driver avatar + name block with optional car info. Used in RideDetail. */
export const DriverInfo: React.FC<DriverInfoProps> = ({ driver, car }) => {
  const initials = `${driver.firstName?.charAt(0) ?? ""}${driver.lastName?.charAt(0) ?? ""}`.toUpperCase();
  const fullName = `${driver.firstName ?? ""} ${driver.lastName ?? ""}`.trim();
  const { data: reviewData } = useUserReviews(driver.id);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Owner</Text>

      <View style={styles.row}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{fullName}</Text>
          {car ? (
            <View style={styles.carRow}>
              <Ionicons
                name="car-outline"
                size={14}
                color={Colors.textSecondary}
              />
              <Text style={styles.carText} numberOfLines={1}>
                {car.vehicleMake} {car.vehicleModel} · {car.color} ·{" "}
                {car.plateNumber}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Live average rating */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={13} color="#F59E0B" />
          <Text style={styles.ratingText}>
            {reviewData?.avgRating != null
              ? reviewData.avgRating.toFixed(1)
              : "—"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.textTertiary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.primary,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  carRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  carText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#FFF8E7",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  ratingText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: "#D97706",
  },
});
