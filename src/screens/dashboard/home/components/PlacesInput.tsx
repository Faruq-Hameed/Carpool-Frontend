import React, { useRef } from "react";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

const GOOGLE_PLACES_API_KEY =
  process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";

export interface PlaceSelection {
  label: string;
  lat: number;
  lng: number;
}

interface PlacesInputProps {
  placeholder: string;
  onSelect: (place: PlaceSelection) => void;
  icon?: React.ReactNode;
  /** Show GPS "use current location" icon on the right (origin field only) */
  showCurrentLocation?: boolean;
}

export const PlacesInput: React.FC<PlacesInputProps> = ({
  placeholder,
  onSelect,
  icon,
  showCurrentLocation = false,
}) => {
  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const handleCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow location access to use your current location."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = loc.coords;

      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const parts = [
        address?.street,
        address?.district,
        address?.city,
        address?.region,
      ].filter(Boolean);

      const label =
        parts.length > 0
          ? parts.join(", ")
          : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

      inputRef.current?.setAddressText(label);
      onSelect({ label, lat: latitude, lng: longitude });
    } catch (err) {
      console.error("[PlacesInput] Current location error:", err);
      Alert.alert("Error", "Could not get your current location. Try again.");
    }
  };

  return (
    <View style={styles.wrapper}>
      <GooglePlacesAutocomplete
        ref={inputRef}
        placeholder={placeholder}
        fetchDetails
        onPress={(data, details) => {
          onSelect({
            label: data.description,
            lat: details?.geometry?.location?.lat ?? 0,
            lng: details?.geometry?.location?.lng ?? 0,
          });
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          components: "country:ng",
        }}
        renderLeftButton={() =>
          icon ? <View style={styles.iconWrapper}>{icon}</View> : null
        }
        renderRightButton={() =>
          showCurrentLocation ? (
            <TouchableOpacity
              onPress={handleCurrentLocation}
              style={styles.locateBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="locate" size={18} color={Colors.primary} />
            </TouchableOpacity>
          ) : null
        }
        onFail={(error) => console.error("[PlacesInput] onFail:", error)}
        onNotFound={() => console.log("[PlacesInput] onNotFound")}
        minLength={2}
        enablePoweredByContainer={false}
        textInputProps={{ placeholderTextColor: Colors.textTertiary }}
        styles={{
          container: { flex: 0 },
          textInputContainer: styles.inputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row,
          description: styles.description,
          separator: styles.separator,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.base,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
  },
  iconWrapper: {
    paddingLeft: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.text,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    height: undefined,
    marginBottom: 0,
    backgroundColor: "transparent",
  },
  locateBtn: {
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  listView: {
    maxHeight: 220,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    marginTop: 4,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  row: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
});
