import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RideBooking } from "@/apis/rides/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

interface BookingRequestCardProps {
  booking: RideBooking;
  onAccept: (bookingId: string) => void;
  onReject: (bookingId: string) => void;
  isAccepting: boolean;
  isRejecting: boolean;
}

/**
 * Driver-facing card for a single booking request.
 * Shows passenger info, seats requested, current status, and
 * Accept / Reject buttons when the booking is still PENDING.
 */
export const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  booking,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
}) => {
  const isPending = booking.status === "PENDING";
  const isBusy = isAccepting || isRejecting;

  const passengerName = booking.passenger
    ? `${booking.passenger.firstName} ${booking.passenger.lastName}`
    : "Passenger";

  return (
    <View style={styles.card}>
      {/* Passenger info row */}
      <View style={styles.topRow}>
        <View style={styles.avatarWrap}>
          <Ionicons name="person-circle-outline" size={36} color={Colors.textSecondary} />
        </View>

        <View style={styles.nameBlock}>
          <Text style={styles.name} numberOfLines={1}>
            {passengerName}
          </Text>
          <Text style={styles.seats}>
            {booking.seatsBooked} seat{booking.seatsBooked !== 1 ? "s" : ""} requested
          </Text>
        </View>

        <StatusBadge status={booking.status} size="sm" />
      </View>

      {/* Action buttons — only shown while PENDING */}
      {isPending && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, styles.btnReject]}
            onPress={() => onReject(booking.id)}
            disabled={isBusy}
            activeOpacity={0.8}
          >
            {isRejecting ? (
              <ActivityIndicator size="small" color={Colors.error} />
            ) : (
              <>
                <Ionicons name="close-outline" size={16} color={Colors.error} />
                <Text style={[styles.btnText, styles.btnTextReject]}>Decline</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnAccept]}
            onPress={() => onAccept(booking.id)}
            disabled={isBusy}
            activeOpacity={0.8}
          >
            {isAccepting ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <>
                <Ionicons name="checkmark-outline" size={16} color={Colors.white} />
                <Text style={[styles.btnText, styles.btnTextAccept]}>Accept</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  seats: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  btnAccept: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  btnReject: {
    backgroundColor: Colors.white,
    borderColor: Colors.error,
  },
  btnText: {
    fontSize: FontSize.base,
    fontWeight: "600",
  },
  btnTextAccept: {
    color: Colors.white,
  },
  btnTextReject: {
    color: Colors.error,
  },
});
