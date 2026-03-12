import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Ride, RideBooking } from "@/apis/rides/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Colors, Spacing, Radius, FontSize, formatNaira } from "@/theme";

interface BookingStatusBarProps {
  ride: Ride;
  myBooking: RideBooking | undefined;
  isVerified: boolean;
  isOwner: boolean;
  onBook: () => void;
  onCancelBooking: (bookingId: string) => void;
  isBooking: boolean;
  isCancelling: boolean;
}

/**
 * Sticky footer bar at the bottom of RideDetail.
 * Adapts its UI based on booking state, ride status, and user verification.
 */
export const BookingStatusBar: React.FC<BookingStatusBarProps> = ({
  ride,
  myBooking,
  isVerified,
  isOwner,
  onBook,
  onCancelBooking,
  isBooking,
  isCancelling,
}) => {
  // Owners don't book their own ride
  if (isOwner) return null;

  // Ride is no longer bookable
  if (ride.status === "COMPLETED" || ride.status === "CANCELLED") {
    return (
      <View style={styles.container}>
        <View style={styles.infoRow}>
          <Ionicons
            name={
              ride.status === "COMPLETED"
                ? "checkmark-circle-outline"
                : "close-circle-outline"
            }
            size={18}
            color={Colors.textSecondary}
          />
          <Text style={styles.infoText}>
            This ride has been {ride.status.toLowerCase()}.
          </Text>
        </View>
      </View>
    );
  }

  // User has an active booking on this ride
  if (
    myBooking &&
    myBooking.status !== "CANCELLED" &&
    myBooking.status !== "REJECTED"
  ) {
    const canCancel = myBooking.status === "PENDING";
    return (
      <View style={styles.container}>
        <View style={styles.bookingRow}>
          <View>
            <Text style={styles.bookingLabel}>Your booking</Text>
            <StatusBadge status={myBooking.status} size="sm" />
          </View>
          {canCancel && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => onCancelBooking(myBooking.id)}
              disabled={isCancelling}
              activeOpacity={0.8}
            >
              {isCancelling ? (
                <ActivityIndicator size="small" color={Colors.error} />
              ) : (
                <Text style={styles.cancelText}>Cancel Booking</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // No seats left
  if (ride.availableSeats === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.bookBtn, styles.bookBtnDisabled]}>
          <Text style={styles.bookBtnText}>No Seats Available</Text>
        </View>
      </View>
    );
  }

  // Unverified user — show warning instead of book button
  if (!isVerified) {
    return (
      <View style={styles.container}>
        <View style={[styles.bookBtn, styles.bookBtnDisabled]}>
          <Ionicons name="lock-closed-outline" size={16} color={Colors.white} />
          <Text style={styles.bookBtnText}>Verify account to book</Text>
        </View>
      </View>
    );
  }

  // Ready to book
  return (
    <View style={styles.container}>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Price per seat</Text>
        <Text style={styles.price}>{formatNaira(ride.pricePerSeat)}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={onBook}
        disabled={isBooking}
        activeOpacity={0.85}
      >
        {isBooking ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.bookBtnText}>Book a Seat</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  // Info state
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    justifyContent: "center",
    paddingVertical: Spacing.sm,
  },
  infoText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  // Existing booking
  bookingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookingLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  cancelBtn: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    minWidth: 120,
    alignItems: "center",
  },
  cancelText: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.error,
  },
  // Price row
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
  },
  // Book button
  bookBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.sm,
  },
  bookBtnDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  bookBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: "700",
  },
});
