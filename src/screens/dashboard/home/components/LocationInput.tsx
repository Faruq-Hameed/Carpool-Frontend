import { AppIcon } from "@/components/others/AppIcon";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

interface LocationInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.locationInputContainer}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.iconWrapper}>{icon}</View>
    <TextInput
      style={styles.locationInput}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      editable={!onPress}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 8,
  },
  locationInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
