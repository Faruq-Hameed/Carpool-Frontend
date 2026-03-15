import React, { useState, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Ride } from "@/apis/rides/types";
import { PlacesInput, PlaceSelection } from "@/screens/dashboard/home/components/PlacesInput";
import { useBookRide } from "@/hooks/useRides";
import { haversineKm, computeFare, computePlatformFee, PLATFORM_FEE_PERCENT } from "@/utils/haversine";
import { Colors, Spacing, Radius, FontSize, formatNaira } from "@/theme";

interface BookingSheetProps {
  visible: boolean;
  ride: Ride;
  /** Pre-fill boarding from search context (if user searched) */
  defaultBoarding?: PlaceSelection;
  /** Pre-fill alighting from search context (if user searched) */
  defaultAlighting?: PlaceSelection;
  onClose: () => void;
  onSuccess: () => void;
}

const COORD_TOLERANCE = 0.0001;

function isFullRouteBooking(
  ride: Ride,
  boarding: PlaceSelection,
  alighting: PlaceSelection,
): boolean {
  const sorted = [...ride.routePoints].sort((a, b) => a.orderIndex - b.orderIndex);
  if (sorted.length === 0) return true;
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return (
    Math.abs(boarding.lat - Number(first.latitude)) < COORD_TOLERANCE &&
    Math.abs(boarding.lng - Number(first.longitude)) < COORD_TOLERANCE &&
    Math.abs(alighting.lat - Number(last.latitude)) < COORD_TOLERANCE &&
    Math.abs(alighting.lng - Number(last.longitude)) < COORD_TOLERANCE
  );
}

export const BookingSheet: React.FC<BookingSheetProps> = ({
  visible,
  ride,
  defaultBoarding,
  defaultAlighting,
  onClose,
  onSuccess,
}) => {
  const bookMutation = useBookRide();

  // Derive ride start/end defaults
  const sorted = [...(ride.routePoints ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);
  const rideStart: PlaceSelection = {
    label: ride.origin,
    lat: Number(sorted[0]?.latitude ?? 0),
    lng: Number(sorted[0]?.longitude ?? 0),
  };
  const rideEnd: PlaceSelection = {
    label: ride.destination,
    lat: Number(sorted[sorted.length - 1]?.latitude ?? 0),
    lng: Number(sorted[sorted.length - 1]?.longitude ?? 0),
  };

  const [boarding, setBoarding] = useState<PlaceSelection>(defaultBoarding ?? rideStart);
  const [alighting, setAlighting] = useState<PlaceSelection>(defaultAlighting ?? rideEnd);
  const [seats, setSeats] = useState(1);

  const totalKm = Number(ride.distanceKm ?? 0);
  const pricePerSeat = Number(ride.pricePerSeat);
  const isFullRoute = isFullRouteBooking(ride, boarding, alighting);

  const fareAmount = computeFare(
    boarding.lat,
    boarding.lng,
    alighting.lat,
    alighting.lng,
    totalKm,
    pricePerSeat,
    seats,
    isFullRoute,
  );
  const platformFee = computePlatformFee(fareAmount);
  const total = fareAmount + platformFee;

  const segmentKm =
    isFullRoute || totalKm === 0
      ? totalKm
      : haversineKm(boarding.lat, boarding.lng, alighting.lat, alighting.lng);

  const handleConfirm = useCallback(() => {
    if (!boarding.lat || !alighting.lat) {
      Alert.alert("Missing location", "Please select your boarding and alighting points.");
      return;
    }

    Alert.alert(
      "Confirm Booking",
      `Board: ${boarding.label}\nAlight: ${alighting.label}\n\nFare: ${formatNaira(fareAmount)}\nFee (${PLATFORM_FEE_PERCENT}%): ${formatNaira(platformFee)}\nTotal: ${formatNaira(total)}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () =>
            bookMutation.mutate(
              {
                rideId: ride.id,
                dto: {
                  seatsBooked: seats,
                  boardingLat: boarding.lat,
                  boardingLng: boarding.lng,
                  boardingLabel: boarding.label,
                  alightingLat: alighting.lat,
                  alightingLng: alighting.lng,
                  alightingLabel: alighting.label,
                },
              },
              {
                onSuccess: () => {
                  onClose();
                  onSuccess();
                },
                onError: (err: any) => {
                  const msg =
                    err?.response?.data?.message ?? "Failed to book ride. Please try again.";
                  Alert.alert("Booking Failed", msg);
                },
              }
            ),
        },
      ]
    );
  }, [boarding, alighting, seats, fareAmount, platformFee, total, ride.id, bookMutation, onClose, onSuccess]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />

      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Book a Seat</Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          {/* Boarding point */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              <Ionicons name="ellipse" size={10} color={Colors.primaryMedium} /> Board at
            </Text>
            <PlacesInput
              placeholder="Where are you boarding?"
              defaultValue={boarding}
              onSelect={(place) => setBoarding(place)}
              icon={<Ionicons name="location-outline" size={16} color={Colors.textSecondary} />}
            />
          </View>

          {/* Alighting point */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              <Ionicons name="ellipse" size={10} color={Colors.primary} /> Alight at
            </Text>
            <PlacesInput
              placeholder="Where are you alighting?"
              defaultValue={alighting}
              onSelect={(place) => setAlighting(place)}
              icon={<Ionicons name="location-outline" size={16} color={Colors.textSecondary} />}
            />
          </View>

          {/* Seats */}
          <View style={styles.seatsRow}>
            <Text style={styles.fieldLabel}>Seats</Text>
            <View style={styles.seatsControl}>
              <TouchableOpacity
                style={styles.seatsBtn}
                onPress={() => setSeats((s) => Math.max(1, s - 1))}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={18} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.seatsValue}>{seats}</Text>
              <TouchableOpacity
                style={styles.seatsBtn}
                onPress={() => setSeats((s) => Math.min(ride.availableSeats, s + 1))}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Fare breakdown */}
          <View style={styles.fareCard}>
            {totalKm > 0 && (
              <View style={styles.fareRow}>
                <Text style={styles.fareLabel}>Your segment</Text>
                <Text style={styles.fareValue}>~{segmentKm.toFixed(1)} km</Text>
              </View>
            )}
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Fare ({seats} seat{seats > 1 ? "s" : ""})</Text>
              <Text style={styles.fareValue}>{formatNaira(fareAmount)}</Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Platform fee ({PLATFORM_FEE_PERCENT}%)</Text>
              <Text style={styles.fareValue}>{formatNaira(platformFee)}</Text>
            </View>
            <View style={styles.fareDivider} />
            <View style={styles.fareRow}>
              <Text style={styles.fareTotalLabel}>Total</Text>
              <Text style={styles.fareTotalValue}>{formatNaira(total)}</Text>
            </View>
          </View>

          {/* Confirm button */}
          <TouchableOpacity
            style={[styles.confirmBtn, bookMutation.isPending && styles.confirmBtnDisabled]}
            onPress={handleConfirm}
            disabled={bookMutation.isPending}
            activeOpacity={0.85}
          >
            {bookMutation.isPending ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <>
                <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
                <Text style={styles.confirmText}>Confirm Booking</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: "85%",
    paddingBottom: Spacing.xxl,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.md,
  },
  fieldGroup: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  seatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seatsControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  seatsBtn: {
    padding: 4,
  },
  seatsValue: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    minWidth: 24,
    textAlign: "center",
  },
  fareCard: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fareLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  fareValue: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
  },
  fareDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  fareTotalLabel: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  fareTotalValue: {
    fontSize: FontSize.lg,
    fontWeight: "800",
    color: Colors.primary,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  confirmBtnDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  confirmText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.white,
  },
});
