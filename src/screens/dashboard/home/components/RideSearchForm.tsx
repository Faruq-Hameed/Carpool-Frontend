import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LocationInput } from "./LocationInput";
import { DateTimePicker } from "./DateTimePicker";

interface RideSearchFormProps {
  leavingFrom: string;
  goingTo: string;
  selectedDate: string;
  selectedTime: string;
  onLeavingFromChange: (text: string) => void;
  onGoingToChange: (text: string) => void;
  onDatePress: () => void;
  onTimePress: () => void;
  onFindRide: () => void;
  mapPinIcon: React.ReactNode;
  navigationIcon: React.ReactNode;
  calendarIcon: React.ReactNode;
  clockIcon: React.ReactNode;
}

export const RideSearchForm: React.FC<RideSearchFormProps> = ({
  leavingFrom,
  goingTo,
  selectedDate,
  selectedTime,
  onLeavingFromChange,
  onGoingToChange,
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
      <LocationInput
        icon={mapPinIcon}
        placeholder="Enter your pick up location"
        value={leavingFrom}
        onChangeText={onLeavingFromChange}
      />

      <Text style={styles.sectionLabel}>Going to</Text>
      <LocationInput
        icon={navigationIcon}
        placeholder="Enter where you are going to"
        value={goingTo}
        onChangeText={onGoingToChange}
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
  // Tab Styles
  tabContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#2D7A3E",
  },
  tabIconWrapper: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#2D7A3E",
    fontWeight: "600",
  },

  // Form Container
  formContainer: {
    width: "100%",
  },

  // Section Styles
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },

  // Location Input Styles
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  locationInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    padding: 0,
  },

  // Date Time Section
  dateTimeSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  pickerValue: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    marginLeft: 8,
  },
  chevron: {
    fontSize: 10,
    color: "#666",
  },

  // Button Styles
  findRideButton: {
    backgroundColor: "#2D7A3E",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  findRideButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
