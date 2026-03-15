import React, { useState, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
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

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlacesInputProps {
  placeholder: string;
  onSelect: (place: PlaceSelection) => void;
  icon?: React.ReactNode;
  showCurrentLocation?: boolean;
  /** Pre-fill the input with this value (e.g. from search context or ride defaults) */
  defaultValue?: PlaceSelection;
}

export const PlacesInput: React.FC<PlacesInputProps> = ({
  placeholder,
  onSelect,
  icon,
  showCurrentLocation = false,
  defaultValue,
}) => {
  const [query, setQuery] = useState(defaultValue?.label ?? "");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPredictions = useCallback(async (text: string) => {
    if (text.length < 2) {
      setPredictions([]);
      return;
    }
    setLoading(true);
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${GOOGLE_PLACES_API_KEY}&language=en&components=country:ng`;
      const res = await fetch(url);
      const json = await res.json();
      setPredictions(json.predictions ?? []);
    } catch (e) {
      console.error("[PlacesInput] autocomplete error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(text), 350);
  };

  const handleSelect = async (prediction: Prediction) => {
    setQuery(prediction.description);
    setPredictions([]);
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=geometry&key=${GOOGLE_PLACES_API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();
      const loc = json.result?.geometry?.location;
      onSelect({
        label: prediction.description,
        lat: loc?.lat ?? 0,
        lng: loc?.lng ?? 0,
      });
    } catch (e) {
      console.error("[PlacesInput] place details error:", e);
      onSelect({ label: prediction.description, lat: 0, lng: 0 });
    }
  };

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
      setQuery(label);
      setPredictions([]);
      onSelect({ label, lat: latitude, lng: longitude });
    } catch (err) {
      console.error("[PlacesInput] current location error:", err);
      Alert.alert("Error", "Could not get your current location. Try again.");
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Input row */}
      <View style={styles.inputContainer}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          value={query}
          onChangeText={handleChangeText}
          autoCorrect={false}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={styles.loader}
          />
        )}
        {showCurrentLocation && !loading && (
          <TouchableOpacity
            onPress={handleCurrentLocation}
            style={styles.locateBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="locate" size={18} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Suggestions dropdown */}
      {predictions.length > 0 && (
        <View style={styles.listView}>
          {predictions.map((item, index) => (
            <TouchableOpacity
              key={item.place_id}
              style={[styles.row, index < predictions.length - 1 && styles.rowBorder]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.75}
            >
              <View style={styles.pinIconWrap}>
                <Ionicons name="location" size={16} color={Colors.primary} />
              </View>
              <View style={styles.rowTextWrap}>
                <Text style={styles.mainText} numberOfLines={1}>
                  {item.structured_formatting?.main_text ?? item.description}
                </Text>
                {!!item.structured_formatting?.secondary_text && (
                  <Text style={styles.secondaryText} numberOfLines={1}>
                    {item.structured_formatting.secondary_text}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  },
  loader: {
    paddingHorizontal: Spacing.md,
  },
  locateBtn: {
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  listView: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
    marginTop: 4,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    gap: Spacing.sm,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pinIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EAF2EA",
    alignItems: "center",
    justifyContent: "center",
  },
  rowTextWrap: {
    flex: 1,
  },
  mainText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
  },
  secondaryText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
});
