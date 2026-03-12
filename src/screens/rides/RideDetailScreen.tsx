import React, { useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RideStackParamList } from "@/navigation/RideStackNavigator";
import { useRideNavigation, useRootNavigation } from "@/hooks/useTypedNavigation";
import { useRideById, useBookRide, useCancelBooking } from "@/hooks/useRides";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { InlineAlert } from "@/components/shared/InlineAlert";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Colors, Spacing, Radius, FontSize, formatNaira, formatShortDate, formatTime } from "@/theme";
import { RideInfoRow } from "./components/RideInfoRow";
import { DriverInfo } from "./components/DriverInfo";
import { BookingStatusBar } from "./components/BookingStatusBar";

type RouteProps = RouteProp<RideStackParamList, "RideDetail">;

const RideDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const rideNavigation = useRideNavigation();
  const rootNavigation = useRootNavigation();
  const { rideId } = route.params;

  const { currentUser, UserKycStatus } = useAuth();

  const isVerified =
    UserKycStatus.dobStatus === ApiStatus.VERIFIED &&
    UserKycStatus.ninStatus === ApiStatus.VERIFIED;

  const { data: ride, isLoading, error } = useRideById(rideId);

  const bookRideMutation = useBookRide();
  const cancelBookingMutation = useCancelBooking();

  // Find the current user's booking on this ride (if any)
  const myBooking = ride?.bookings?.find(
    (b) => b.passengerId === currentUser?.id
  );

  const isOwner = ride?.ownerId === currentUser?.id;

  const handleBook = useCallback(() => {
    if (!ride) return;
    bookRideMutation.mutate(
      { rideId: ride.id, dto: { seatsBooked: 1 } },
      {
        onSuccess: () => {
          Alert.alert(
            "Booking Confirmed!",
            "Your seat has been requested. You will be notified once the driver accepts.",
            [{ text: "OK" }]
          );
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.message ?? "Failed to book ride. Please try again.";
          Alert.alert("Booking Failed", message);
        },
      }
    );
  }, [ride, bookRideMutation]);

  const handleCancelBooking = useCallback(
    (bookingId: string) => {
      if (!ride) return;
      Alert.alert(
        "Cancel Booking",
        "Are you sure you want to cancel this booking?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes, Cancel",
            style: "destructive",
            onPress: () => {
              cancelBookingMutation.mutate(
                { rideId: ride.id, bookingId },
                {
                  onSuccess: () =>
                    Alert.alert("Cancelled", "Your booking has been cancelled."),
                  onError: () =>
                    Alert.alert("Error", "Could not cancel your booking. Please try again."),
                }
              );
            },
          },
        ]
      );
    },
    [ride, cancelBookingMutation]
  );

  if (isLoading) return <LoadingState message="Loading ride..." />;

  if (error || !ride) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScreenHeader title="Ride Details" onBack={() => rideNavigation.goBack()} />
        <View style={styles.errorContainer}>
          <InlineAlert type="error" message="Could not load ride details. Please go back and try again." />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenHeader
        title="Ride Details"
        onBack={() => rideNavigation.goBack()}
        rightAction={<StatusBadge status={ride.status} size="sm" />}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Route card ─────────────────────────────────────────── */}
        <View style={styles.routeCard}>
          {/* Origin */}
          <View style={styles.routePoint}>
            <View style={[styles.dot, styles.dotOrigin]} />
            <View style={styles.routeTextBlock}>
              <Text style={styles.routePointLabel}>From</Text>
              <Text style={styles.routePointValue}>{ride.origin}</Text>
            </View>
          </View>

          {/* Connecting line */}
          <View style={styles.routeLineWrap}>
            <View style={styles.routeLine} />
          </View>

          {/* Destination */}
          <View style={styles.routePoint}>
            <View style={[styles.dot, styles.dotDest]} />
            <View style={styles.routeTextBlock}>
              <Text style={styles.routePointLabel}>To</Text>
              <Text style={styles.routePointValue}>{ride.destination}</Text>
            </View>
          </View>
        </View>

        {/* ── Info rows ──────────────────────────────────────────── */}
        <View style={styles.infoSection}>
          <SectionHeader title="Trip Details" />
          <RideInfoRow
            icon="calendar-outline"
            label="Date"
            value={formatShortDate(ride.departureTime)}
          />
          <RideInfoRow
            icon="time-outline"
            label="Departure time"
            value={formatTime(ride.departureTime)}
          />
          <RideInfoRow
            icon="people-outline"
            label="Seats available"
            value={`${ride.availableSeats} of ${ride.totalSeats}`}
          />
          <RideInfoRow
            icon="cash-outline"
            label="Price per seat"
            value={formatNaira(ride.pricePerSeat)}
          />
        </View>

        {/* ── Driver info ────────────────────────────────────────── */}
        {ride.owner && (
          <View style={styles.driverSection}>
            <DriverInfo driver={ride.owner} car={ride.car} />
          </View>
        )}

        {/* ── Notes ─────────────────────────────────────────────── */}
        {ride.notes ? (
          <View style={styles.notesSection}>
            <SectionHeader title="Notes from driver" />
            <Text style={styles.notesText}>{ride.notes}</Text>
          </View>
        ) : null}

        {/* ── Verification warning ───────────────────────────────── */}
        {!isVerified && !isOwner && (
          <InlineAlert
            type="warning"
            message="Verify your account to book this ride. Only verified users can join rides."
          />
        )}

        {/* ── Verify CTA ─────────────────────────────────────────── */}
        {!isVerified && !isOwner && (
          <Text
            style={styles.verifyLink}
            onPress={() => rootNavigation.navigate("AccountVerification")}
          >
            Tap here to verify your account →
          </Text>
        )}
      </ScrollView>

      {/* ── Sticky booking footer ───────────────────────────────── */}
      <BookingStatusBar
        ride={ride}
        myBooking={myBooking}
        isVerified={isVerified}
        isOwner={isOwner}
        onBook={handleBook}
        onCancelBooking={handleCancelBooking}
        isBooking={bookRideMutation.isPending}
        isCancelling={cancelBookingMutation.isPending}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  errorContainer: {
    padding: Spacing.base,
  },

  // Route card
  routeCard: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.md,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  dot: {
    width: 14,
    height: 14,
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
  routeTextBlock: {
    flex: 1,
  },
  routePointLabel: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  routePointValue: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text,
  },
  routeLineWrap: {
    paddingLeft: 5,
    marginVertical: Spacing.sm,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
    marginLeft: 5,
  },

  // Info section
  infoSection: {
    marginBottom: Spacing.base,
  },

  // Driver section
  driverSection: {
    marginBottom: Spacing.base,
  },

  // Notes
  notesSection: {
    marginBottom: Spacing.base,
  },
  notesText: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
    lineHeight: 22,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.sm,
  },

  // Verify link
  verifyLink: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.primaryMedium,
    textAlign: "center",
    marginBottom: Spacing.base,
    textDecorationLine: "underline",
  },
});

export default RideDetailScreen;
