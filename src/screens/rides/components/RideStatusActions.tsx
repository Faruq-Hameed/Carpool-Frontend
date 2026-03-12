import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RideStatus } from "@/apis/rides/types";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

interface RideStatusActionsProps {
  rideStatus: RideStatus;
  onStart: () => void;
  onComplete: () => void;
  onCancel: () => void;
  isStarting: boolean;
  isCompleting: boolean;
  isCancelling: boolean;
}

/**
 * Driver-only sticky footer bar in RideDetail.
 * Shows the appropriate lifecycle actions based on ride status:
 *   PENDING  → Start Ride + Cancel Ride
 *   ONGOING  → Complete Ride + Cancel Ride
 *   COMPLETED / CANCELLED → nothing (returns null)
 */
export const RideStatusActions: React.FC<RideStatusActionsProps> = ({
  rideStatus,
  onStart,
  onComplete,
  onCancel,
  isStarting,
  isCompleting,
  isCancelling,
}) => {
  if (rideStatus === "COMPLETED" || rideStatus === "CANCELLED") {
    return null;
  }

  const isBusy = isStarting || isCompleting || isCancelling;

  return (
    <View style={styles.container}>
      {rideStatus === "PENDING" && (
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onStart}
          disabled={isBusy}
          activeOpacity={0.85}
        >
          {isStarting ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <>
              <Ionicons name="play-outline" size={18} color={Colors.white} />
              <Text style={styles.primaryBtnText}>Start Ride</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {rideStatus === "ONGOING" && (
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onComplete}
          disabled={isBusy}
          activeOpacity={0.85}
        >
          {isCompleting ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <>
              <Ionicons name="flag-outline" size={18} color={Colors.white} />
              <Text style={styles.primaryBtnText}>Complete Ride</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={onCancel}
        disabled={isBusy}
        activeOpacity={0.85}
      >
        {isCancelling ? (
          <ActivityIndicator size="small" color={Colors.error} />
        ) : (
          <>
            <Ionicons name="close-circle-outline" size={16} color={Colors.error} />
            <Text style={styles.cancelBtnText}>Cancel Ride</Text>
          </>
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
  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: "700",
  },
  cancelBtn: {
    paddingVertical: 12,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  cancelBtnText: {
    color: Colors.error,
    fontSize: FontSize.base,
    fontWeight: "600",
  },
});
