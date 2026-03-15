import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

import { DashboardTabParamList } from "@/navigation/DashboardNavigator";
import { useRootNavigation } from "@/hooks/useTypedNavigation";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import { Colors, Spacing, FontSize, Radius } from "@/theme";
import ProfileSummary from "../profile/components/ProfileSummary";
import VerificationBox from "./components/VerificationBox";
import { TabSelector, RideSearchForm } from "./components";
import { PlaceSelection } from "./components/PlacesInput";
import CustomModal from "@/components/modals/CustomModal";
import { PseudoModalScreen } from "../profile/components";

type Props = BottomTabScreenProps<DashboardTabParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const rootNavigation = useRootNavigation();
  const { currentUser, UserKycStatus } = useAuth();

  // ─── Verification modal ──────────────────────────────────────
  const [modalVisible, setModalVisible] = useState(false);
  const [hasModalShown, setHasShown] = useState(false);

  const isVerified =
    UserKycStatus.dobStatus === ApiStatus.VERIFIED &&
    UserKycStatus.ninStatus === ApiStatus.VERIFIED;

  useEffect(() => {
    if (!hasModalShown && !isVerified) {
      const timer = setTimeout(() => {
        setModalVisible(true);
        setHasShown(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasModalShown, isVerified]);

  // ─── Search form state ───────────────────────────────────────
  const [origin, setOrigin] = useState<PlaceSelection | null>(null);
  const [destination, setDestination] = useState<PlaceSelection | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [searchError, setSearchError] = useState("");

  // ─── Handlers ────────────────────────────────────────────────
  const handleFindRide = () => {
    if (!origin) {
      setSearchError("Please select your pick-up location.");
      return;
    }
    if (!destination) {
      setSearchError("Please select your destination.");
      return;
    }
    setSearchError("");

    rootNavigation.navigate("RideStack", {
      screen: "RideResults",
      params: {
        query: {
          origin: origin.label,
          destination: destination.label,
          originLat: origin.lat,
          originLng: origin.lng,
          destinationLat: destination.lat,
          destinationLng: destination.lng,
          date: format(selectedDate, "yyyy-MM-dd"),
          page: 1,
          size: 20,
        },
      },
    });
  };

  const displayDate = format(selectedDate, "EEE, d MMM");
  const displayTime = format(selectedTime, "h:mm a");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="always"
      >
        <ProfileSummary />

        {!isVerified && <VerificationBox />}

        {/* Find / Offer tab toggle */}
        <TabSelector
          activeTab="find"
          onTabChange={(tab) => {
            if (tab === "offer") navigation.navigate("Offer");
          }}
          findIcon={
            <Ionicons
              name="search-outline"
              size={18}
              color={Colors.primaryMedium}
            />
          }
          offerIcon={
            <Ionicons
              name="car-outline"
              size={18}
              color={Colors.textSecondary}
            />
          }
        />

        {/* Validation error */}
        {searchError ? (
          <Text style={styles.errorText}>{searchError}</Text>
        ) : null}

        {/* Search form */}
        <RideSearchForm
          selectedDate={displayDate}
          selectedTime={displayTime}
          onOriginSelect={(place) => {
            setOrigin(place);
            if (searchError) setSearchError("");
          }}
          onDestinationSelect={(place) => {
            setDestination(place);
            if (searchError) setSearchError("");
          }}
          onDatePress={() => setDatePickerVisible(true)}
          onTimePress={() => setTimePickerVisible(true)}
          onFindRide={handleFindRide}
          mapPinIcon={
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.textSecondary}
            />
          }
          navigationIcon={
            <Ionicons
              name="navigate-outline"
              size={18}
              color={Colors.textSecondary}
            />
          }
          calendarIcon={
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors.textSecondary}
            />
          }
          clockIcon={
            <Ionicons
              name="time-outline"
              size={16}
              color={Colors.textSecondary}
            />
          }
        />

        {/* Browse all rides shortcut */}
        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.8}
          onPress={() =>
            rootNavigation.navigate("RideStack", { screen: "BrowseRides" })
          }
        >
          <Ionicons name="list-outline" size={16} color={Colors.primary} />
          <Text style={styles.browseBtnText}>Browse all available rides</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </ScrollView>

      {/* Date picker modal */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        date={selectedDate}
        minimumDate={new Date()}
        onConfirm={(date) => {
          setDatePickerVisible(false);
          setSelectedDate(date);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />

      {/* Time picker modal */}
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        date={selectedTime}
        onConfirm={(time) => {
          setTimePickerVisible(false);
          setSelectedTime(time);
        }}
        onCancel={() => setTimePickerVisible(false)}
      />

      {/* Verification nudge modal (shows once, 5s after mount) */}
      {modalVisible && !isVerified && (
        <CustomModal
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
        >
          <PseudoModalScreen
            headerText={`Welcome, ${currentUser?.firstName ?? "User"}`}
            description="For everyone's safety, only verified users can join or offer rides on Share."
            upperBtnTitle="OK, Let's do it now"
            onUpperBtnPress={() => {
              rootNavigation.navigate("AccountVerification");
              setModalVisible(false);
            }}
            lowerBtnTitle="Maybe later"
            onLowerBtnPress={() => setModalVisible(false)}
          />
        </CustomModal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    marginBottom: Spacing.sm,
    marginTop: -Spacing.xs,
  },
  browseBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  browseBtnText: {
    flex: 1,
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
});

export default HomeScreen;
