import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RideBooking } from "@/apis/rides/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Colors,
  Spacing,
  Radius,
  FontSize,
  formatShortDate,
  formatTime,
} from "@/theme";

interface BookingCardProps {
  booking: RideBooking;
  onPress: () => void;
  /**
   * "passenger" → shows driver info + ride route
   * "driver"    → shows passenger info + seat count
   */
  perspective?: "passenger" | "driver";
}

/** Card displaying a booking: ride route, status, seats, and person info. */
export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  perspective = "passenger",
}) => {
  const ride = booking.ride;

  // Person shown depends on perspective
  const person =
    perspective === "passenger" ? ride?.owner : booking.passenger;
  const personInitials = person
    ? `${person.firstName?.charAt(0) ?? ""}${person.lastName?.charAt(0) ?? ""}`.toUpperCase()
    : "?";
  const personName = person
    ? `${person.firstName} ${person.lastName}`
    : "Unknown";
  const personRole = perspective === "passenger" ? "Driver" : "Passenger";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* ── Header: status + seats ───────────────────────────────── */}
      <View style={styles.headerRow}>
        <StatusBadge status={booking.status} size="sm" />
        <View style={styles.seatsBadge}>
          <Ionicons name="people-outline" size={13} color={Colors.primaryMedium} />
          <Text style={styles.seatsText}>
            {booking.seatsBooked} seat{booking.seatsBooked !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      {/* ── Route (from ride) ────────────────────────────────────── */}
      {ride && (
        <View style={styles.routeRow}>
          <View style={styles.routeCol}>
            <Text style={styles.routeLabel}>From</Text>
            <Text style={styles.routeValue} numberOfLines={1}>
              {ride.origin}
            </Text>
          </View>

          <Ionicons
            name="arrow-forward"
            size={16}
            color={Colors.textTertiary}
            style={styles.routeArrow}
          />

          <View style={[styles.routeCol, styles.routeColRight]}>
            <Text style={[styles.routeLabel, { textAlign: "right" }]}>To</Text>
            <Text
              style={[styles.routeValue, { textAlign: "right" }]}
              numberOfLines={1}
            >
              {ride.destination}
            </Text>
          </View>
        </View>
      )}

      {/* ── Date/time ────────────────────────────────────────────── */}
      {ride?.departureTime && (
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
          <Text style={styles.metaText}>
            {formatShortDate(ride.departureTime)} ·{" "}
            {formatTime(ride.departureTime)}
          </Text>
        </View>
      )}

      {/* ── Person row ───────────────────────────────────────────── */}
      <View style={styles.personRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{personInitials}</Text>
        </View>
        <View>
          <Text style={styles.personRole}>{personRole}</Text>
          <Text style={styles.personName} numberOfLines={1}>
            {personName}
          </Text>
        </View>
      </View>
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
  seatsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  seatsText: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    color: Colors.primaryMedium,
  },

  // Route
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  routeCol: {
    flex: 1,
  },
  routeColRight: {
    alignItems: "flex-end",
  },
  routeArrow: {
    marginHorizontal: Spacing.sm,
  },
  routeLabel: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  routeValue: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
  },

  // Meta
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: Spacing.md,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  // Person
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  avatar: {
    width: 32,
    height: 32,
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
  personRole: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  personName: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
  },
});
