import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Spacing, Radius, FontSize } from "@/theme";
import { PlacesInput, PlaceSelection } from "./PlacesInput";
import { DateTimePicker } from "./DateTimePicker";

interface RideSearchFormProps {
  selectedDate: string;
  selectedTime: string;
  onOriginSelect: (place: PlaceSelection) => void;
  onDestinationSelect: (place: PlaceSelection) => void;
  onDatePress: () => void;
  onTimePress: () => void;
  onFindRide: () => void;
  mapPinIcon: React.ReactNode;
  navigationIcon: React.ReactNode;
  calendarIcon: React.ReactNode;
  clockIcon: React.ReactNode;
}

export const RideSearchForm: React.FC<RideSearchFormProps> = ({
  selectedDate,
  selectedTime,
  onOriginSelect,
  onDestinationSelect,
  onDatePress,
  onTimePress,
  onFindRide,
  mapPinIcon,
  navigationIcon,
  calendarIcon,
  clockIcon,
}) => (
  <View style={styles.formContainer}>
    {/* Location Section */}
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Leaving from</Text>
      <PlacesInput
        placeholder="Enter your pick-up location"
        onSelect={onOriginSelect}
        icon={mapPinIcon}
        showCurrentLocation
      />

      <Text style={styles.sectionLabel}>Going to</Text>
      <PlacesInput
        placeholder="Enter your destination"
        onSelect={onDestinationSelect}
        icon={navigationIcon}
      />
    </View>

    {/* Date and Time Section */}
    <View style={styles.dateTimeSection}>
      <DateTimePicker
        label="Date"
        value={selectedDate}
        onPress={onDatePress}
        icon={calendarIcon}
      />
      <DateTimePicker
        label="Time"
        value={selectedTime}
        onPress={onTimePress}
        icon={clockIcon}
      />
    </View>

    {/* Find Ride Button */}
    <TouchableOpacity style={styles.findRideButton} onPress={onFindRide}>
      <Text style={styles.findRideButtonText}>Find a ride</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  section: {
    marginBottom: Spacing.sm,
    zIndex: 2,
    overflow: "visible",
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  dateTimeSection: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  findRideButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  findRideButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: "600",
  },
});
