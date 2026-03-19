import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RideStackParamList } from "@/navigation/RideStackNavigator";
import { useRideNavigation, useRootNavigation } from "@/hooks/useTypedNavigation";
import { BookingSheet } from "./components/BookingSheet";
import {
  useRideById,
  useRideBookings,
  useCancelBooking,
  useAcceptBooking,
  useRejectBooking,
  useStartRide,
  useCompleteRide,
  useCancelRide,
} from "@/hooks/useRides";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { InlineAlert } from "@/components/shared/InlineAlert";
import { SectionHeader } from "@/components/shared/SectionHeader";
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
import { RideInfoRow } from "./components/RideInfoRow";
import { DriverInfo } from "./components/DriverInfo";
import { BookingStatusBar } from "./components/BookingStatusBar";
import { BookingRequestCard } from "./components/BookingRequestCard";
import { RideStatusActions } from "./components/RideStatusActions";
import RouteMap from "./components/RouteMap";
import RatingModal from "./components/RatingModal";
import { useRideTracking } from "@/contexts/RideTrackingContext";
import { useMyReviewForRide } from "@/hooks/useReviews";

type RouteProps = RouteProp<RideStackParamList, "RideDetail">;

const RideDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const rideNavigation = useRideNavigation();
  const rootNavigation = useRootNavigation();
  const { rideId, searchOrigin, searchDestination } = route.params;

  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  const { currentUser, UserKycStatus } = useAuth();

  const isVerified =
    UserKycStatus.dobStatus === ApiStatus.VERIFIED &&
    UserKycStatus.ninStatus === ApiStatus.VERIFIED &&
    UserKycStatus.selfieStatus === ApiStatus.VERIFIED;

  const { data: ride, isLoading, error } = useRideById(rideId);

  const isOwner = ride?.ownerId === currentUser?.id;

  // ── Rating — show modal for passengers on completed rides ─────────────────
  const { data: myReview } = useMyReviewForRide(rideId);
  const canRate =
    !isOwner &&
    ride?.status === "COMPLETED" &&
    myBooking?.status === "COMPLETED" &&
    myReview === null;

  // ── Live tracking ─────────────────────────────────────────────────────────
  const { driverLocation } = useRideTracking(
    rideId,
    !!isOwner,
    ride?.status === "ONGOING"
  );

  // ── Passenger mutations ───────────────────────────────────────────────────
  const cancelBookingMutation = useCancelBooking();

  // ── Driver mutations ──────────────────────────────────────────────────────
  const acceptBookingMutation = useAcceptBooking();
  const rejectBookingMutation = useRejectBooking();
  const startRideMutation = useStartRide();
  const completeRideMutation = useCompleteRide();
  const cancelRideMutation = useCancelRide();

  // Fetch booking requests only when user is the owner
  const { data: rideBookings = [] } = useRideBookings(isOwner ? rideId : "");

  // Current user's booking (passenger view)
  const myBooking = ride?.bookings?.find(
    (b) => b.passengerId === currentUser?.id
  );

  // ── Passenger handlers ────────────────────────────────────────────────────
  const handleBook = useCallback(() => {
    setBookingSheetOpen(true);
  }, []);

  const handleCancelBooking = useCallback(
    (bookingId: string) => {
      if (!ride) return;
      Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () =>
            cancelBookingMutation.mutate(
              { rideId: ride.id, bookingId },
              {
                onSuccess: () =>
                  Alert.alert("Cancelled", "Your booking has been cancelled."),
                onError: () =>
                  Alert.alert("Error", "Could not cancel booking. Please try again."),
              }
            ),
        },
      ]);
    },
    [ride, cancelBookingMutation]
  );

  // ── Driver handlers ───────────────────────────────────────────────────────
  const handleAcceptBooking = useCallback(
    (bookingId: string) => {
      acceptBookingMutation.mutate(
        { rideId, bookingId },
        {
          onError: (err: any) => {
            const message =
              err?.response?.data?.message ?? "Failed to accept booking.";
            Alert.alert("Error", message);
          },
        }
      );
    },
    [rideId, acceptBookingMutation]
  );

  const handleRejectBooking = useCallback(
    (bookingId: string) => {
      Alert.alert("Decline Booking", "Decline this passenger's request?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Decline",
          style: "destructive",
          onPress: () =>
            rejectBookingMutation.mutate(
              { rideId, bookingId },
              {
                onError: (err: any) => {
                  const message =
                    err?.response?.data?.message ?? "Failed to decline booking.";
                  Alert.alert("Error", message);
                },
              }
            ),
        },
      ]);
    },
    [rideId, rejectBookingMutation]
  );

  const handleStartRide = useCallback(() => {
    Alert.alert("Start Ride", "Are you ready to start this ride?", [
      { text: "Not yet", style: "cancel" },
      {
        text: "Start",
        onPress: () =>
          startRideMutation.mutate(rideId, {
            onSuccess: () =>
              Alert.alert("Ride Started", "Your ride is now underway."),
            onError: (err: any) => {
              const message =
                err?.response?.data?.message ?? "Could not start ride.";
              Alert.alert("Error", message);
            },
          }),
      },
    ]);
  }, [rideId, startRideMutation]);

  const handleCompleteRide = useCallback(() => {
    Alert.alert(
      "Complete Ride",
      "Mark this ride as completed? All accepted passengers will be marked as dropped off.",
      [
        { text: "Not yet", style: "cancel" },
        {
          text: "Complete",
          onPress: () =>
            completeRideMutation.mutate(
              { id: rideId },
              {
                onSuccess: () =>
                  Alert.alert(
                    "Ride Completed",
                    "This ride has been marked as complete."
                  ),
                onError: (err: any) => {
                  const message =
                    err?.response?.data?.message ?? "Could not complete ride.";
                  Alert.alert("Error", message);
                },
              }
            ),
        },
      ]
    );
  }, [rideId, completeRideMutation]);

  const handleCancelRide = useCallback(() => {
    Alert.alert(
      "Cancel Ride",
      "Are you sure you want to cancel this ride? All passengers will be notified.",
      [
        { text: "Keep Ride", style: "cancel" },
        {
          text: "Cancel Ride",
          style: "destructive",
          onPress: () =>
            cancelRideMutation.mutate(rideId, {
              onSuccess: () => {
                Alert.alert("Ride Cancelled", "Your ride has been cancelled.", [
                  { text: "OK", onPress: () => rideNavigation.goBack() },
                ]);
              },
              onError: (err: any) => {
                const message =
                  err?.response?.data?.message ?? "Could not cancel ride.";
                Alert.alert("Error", message);
              },
            }),
        },
      ]
    );
  }, [rideId, cancelRideMutation, rideNavigation]);

  // ── Loading / Error states ────────────────────────────────────────────────
  if (isLoading) return <LoadingState message="Loading ride..." />;

  if (error || !ride) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScreenHeader title="Ride Details" onBack={() => rideNavigation.goBack()} />
        <View style={styles.pad}>
          <InlineAlert
            type="error"
            message="Could not load ride details. Please go back and try again."
          />
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
        {/* ── Map ──────────────────────────────────────────────────── */}
        {ride.routePoints && ride.routePoints.length >= 2 && (
          <RouteMap
            routePoints={ride.routePoints}
            driverLocation={driverLocation}
          />
        )}

        {/* ── Route card ─────────────────────────────────────────────── */}
        <View style={styles.routeCard}>
          <View style={styles.routePoint}>
            <View style={[styles.dot, styles.dotOrigin]} />
            <View style={styles.routeTextBlock}>
              <Text style={styles.routePointLabel}>From</Text>
              <Text style={styles.routePointValue}>{ride.origin}</Text>
            </View>
          </View>

          <View style={styles.routeLineWrap}>
            <View style={styles.routeLine} />
          </View>

          {/* Intermediate stops */}
          {ride.routePoints
            ?.filter((p) => p.pointType === "INTERMEDIATE")
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((stop) => (
              <React.Fragment key={stop.id}>
                <View style={styles.routePoint}>
                  <View style={[styles.dot, styles.dotStop]} />
                  <View style={styles.routeTextBlock}>
                    <Text style={styles.routePointLabel}>Stop</Text>
                    <Text style={[styles.routePointValue, styles.routePointValueStop]}>
                      {stop.label ?? `Stop ${stop.orderIndex}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.routeLineWrap}>
                  <View style={styles.routeLine} />
                </View>
              </React.Fragment>
            ))}

          <View style={styles.routePoint}>
            <View style={[styles.dot, styles.dotDest]} />
            <View style={styles.routeTextBlock}>
              <Text style={styles.routePointLabel}>To</Text>
              <Text style={styles.routePointValue}>{ride.destination}</Text>
            </View>
          </View>
        </View>

        {/* ── Trip details ────────────────────────────────────────────── */}
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
          {ride.distanceKm != null && (
            <RideInfoRow
              icon="navigate-outline"
              label="Total distance"
              value={`~${Number(ride.distanceKm).toFixed(1)} km`}
            />
          )}
        </View>

        {/* ── Driver info (passenger view only) ──────────────────────── */}
        {ride.owner && !isOwner && (
          <View style={styles.driverSection}>
            <DriverInfo driver={ride.owner} car={ride.car} />
          </View>
        )}

        {/* ── Notes ──────────────────────────────────────────────────── */}
        {ride.notes ? (
          <View style={styles.notesSection}>
            <SectionHeader title="Notes from owner" />
            <Text style={styles.notesText}>{ride.notes}</Text>
          </View>
        ) : null}

        {/* ── Rate driver (completed rides, passenger only) ───────────── */}
        {canRate && (
          <TouchableOpacity
            style={styles.rateDriverBanner}
            onPress={() => setRatingModalOpen(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="star-outline" size={20} color="#D97706" />
            <Text style={styles.rateDriverText}>Rate your driver</Text>
            <Ionicons name="chevron-forward" size={16} color="#D97706" />
          </TouchableOpacity>
        )}

        {/* ── Verification warning (passenger only) ───────────────────── */}
        {!isVerified && !isOwner && (
          <>
            <InlineAlert
              type="warning"
              message="Verify your account to book this ride. Only verified users can join rides."
            />
            <Text
              style={styles.verifyLink}
              onPress={() => rootNavigation.navigate("AccountVerification")}
            >
              Tap here to verify your account →
            </Text>
          </>
        )}

        {/* ── 6c: Driver — Booking requests ──────────────────────────── */}
        {isOwner && (
          <View style={styles.bookingsSection}>
            <SectionHeader
              title={`Booking Requests (${rideBookings.length})`}
            />

            {rideBookings.length === 0 ? (
              <View style={styles.emptyBookings}>
                <Text style={styles.emptyBookingsText}>
                  No booking requests yet. Share your ride so passengers can find it.
                </Text>
              </View>
            ) : (
              rideBookings.map((booking) => (
                <BookingRequestCard
                  key={booking.id}
                  booking={booking}
                  onAccept={handleAcceptBooking}
                  onReject={handleRejectBooking}
                  isAccepting={
                    acceptBookingMutation.isPending &&
                    (acceptBookingMutation.variables as any)?.bookingId === booking.id
                  }
                  isRejecting={
                    rejectBookingMutation.isPending &&
                    (rejectBookingMutation.variables as any)?.bookingId === booking.id
                  }
                />
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* ── Passenger sticky footer ─────────────────────────────────── */}
      {!isOwner && (
        <BookingStatusBar
          ride={ride}
          myBooking={myBooking}
          isVerified={isVerified}
          isOwner={false}
          onBook={handleBook}
          onCancelBooking={handleCancelBooking}
          isBooking={false}
          isCancelling={cancelBookingMutation.isPending}
        />
      )}

      {/* ── Rating modal ────────────────────────────────────────────── */}
      {ride && ride.owner && (
        <RatingModal
          visible={ratingModalOpen}
          rideId={rideId}
          driverName={`${ride.owner.firstName} ${ride.owner.lastName}`}
          onDismiss={() => setRatingModalOpen(false)}
        />
      )}

      {/* ── Booking sheet ───────────────────────────────────────────── */}
      {ride && !isOwner && (
        <BookingSheet
          visible={bookingSheetOpen}
          ride={ride}
          defaultBoarding={searchOrigin}
          defaultAlighting={searchDestination}
          onClose={() => setBookingSheetOpen(false)}
          onSuccess={() =>
            Alert.alert(
              "Booking Requested!",
              "Your seat has been requested. You will be notified once the owner accepts."
            )
          }
        />
      )}

      {/* ── 6d: Driver sticky footer — lifecycle controls ────────────── */}
      {isOwner && (
        <RideStatusActions
          rideStatus={ride.status}
          onStart={handleStartRide}
          onComplete={handleCompleteRide}
          onCancel={handleCancelRide}
          isStarting={startRideMutation.isPending}
          isCompleting={completeRideMutation.isPending}
          isCancelling={cancelRideMutation.isPending}
        />
      )}
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
  pad: {
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
  dotStop: {
    backgroundColor: Colors.white,
    borderColor: Colors.warning,
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
  routePointValueStop: {
    fontSize: FontSize.base,
    fontWeight: "500",
    color: Colors.textMuted,
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

  // Driver bookings section
  bookingsSection: {
    marginBottom: Spacing.base,
  },
  emptyBookings: {
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    alignItems: "center",
  },
  emptyBookingsText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  rateDriverBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: "#FFF8E7",
    borderRadius: Radius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  rateDriverText: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: "600",
    color: "#D97706",
  },
});

export default RideDetailScreen;
