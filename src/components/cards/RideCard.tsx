import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Ride } from "@/apis/rides/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Colors,
  Spacing,
  Radius,
  FontSize,
  formatNaira,
  formatShortDate,
  formatTime,
} from "@/theme";

interface RideCardProps {
  ride: Ride;
  onPress: () => void;
  /** Show driver avatar + name row (default true). Set false when viewing own rides. */
  showDriver?: boolean;
}

/** Card displaying a ride summary: route, time, seats, price, status. */
export const RideCard: React.FC<RideCardProps> = ({
  ride,
  onPress,
  showDriver = true,
}) => {
  const driverInitials = ride.owner
    ? `${ride.owner.firstName?.charAt(0) ?? ""}${ride.owner.lastName?.charAt(0) ?? ""}`.toUpperCase()
    : "?";
  const driverName = ride.owner
    ? `${ride.owner.firstName} ${ride.owner.lastName}`
    : "Unknown driver";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* ── Header: status + price ───────────────────────────────── */}
      <View style={styles.headerRow}>
        <StatusBadge status={ride.status} size="sm" />
        <Text style={styles.price}>{formatNaira(ride.pricePerSeat)}/seat</Text>
      </View>

      {/* ── Route ────────────────────────────────────────────────── */}
      <View style={styles.routeContainer}>
        {/* Origin */}
        <View style={styles.routePoint}>
          <View style={[styles.dot, styles.dotOrigin]} />
          <Text style={styles.routeText} numberOfLines={1}>
            {ride.origin}
          </Text>
        </View>

        {/* Connecting line */}
        <View style={styles.routeLineWrap}>
          <View style={styles.routeLine} />
        </View>

        {/* Destination */}
        <View style={styles.routePoint}>
          <View style={[styles.dot, styles.dotDest]} />
          <Text style={styles.routeText} numberOfLines={1}>
            {ride.destination}
          </Text>
        </View>
      </View>

      {/* ── Meta: time + seats ───────────────────────────────────── */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
          <Text style={styles.metaText}>
            {formatShortDate(ride.departureTime)} · {formatTime(ride.departureTime)}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={13} color={Colors.textSecondary} />
          <Text style={styles.metaText}>
            {ride.availableSeats}/{ride.totalSeats} seats
          </Text>
        </View>
      </View>

      {/* ── Driver ───────────────────────────────────────────────── */}
      {showDriver && (
        <View style={styles.driverRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{driverInitials}</Text>
          </View>
          <Text style={styles.driverName} numberOfLines={1}>
            {driverName}
          </Text>
          {ride.car && (
            <Text style={styles.carLabel} numberOfLines={1}>
              {ride.car.vehicleMake} {ride.car.vehicleModel} · {ride.car.color}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  price: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.primary,
  },

  // Route
  routeContainer: {
    marginBottom: Spacing.md,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    borderWidth: 2,
  },
  dotOrigin: {
    backgroundColor: Colors.primaryMedium,
    borderColor: Colors.primaryMedium,
  },
  dotDest: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  routeText: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.text,
    fontWeight: "500",
  },
  routeLineWrap: {
    paddingLeft: 4,
    marginVertical: 4,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.border,
    marginLeft: 3,
  },

  // Meta
  metaRow: {
    flexDirection: "row",
    gap: Spacing.base,
    marginBottom: Spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  // Driver
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.primary,
  },
  driverName: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
  },
  carLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    flexShrink: 1,
  },
});
