import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DateTimePickerProps {
  label: string;
  value: string;
  onPress: () => void;
  icon: React.ReactNode;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onPress,
  icon,
}) => (
  <View style={styles.pickerContainer}>
    <Text style={styles.pickerLabel}>{label}</Text>
    <TouchableOpacity style={styles.pickerButton} onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.pickerValue}>{value}</Text>
      <Text style={styles.chevron}>▼</Text>
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
