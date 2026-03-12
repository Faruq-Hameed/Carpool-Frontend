import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { useCreateCar } from "@/hooks/useCars";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

// ─── Vehicle categories supported by the backend ─────────────────────────────
const VEHICLE_CATEGORIES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Pickup",
  "Minivan",
  "Bus",
  "Other",
];

// ─── Labelled text field ──────────────────────────────────────────────────────
const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
}> = ({ label, value, onChange, placeholder, autoCapitalize = "words" }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={Colors.textTertiary}
      autoCapitalize={autoCapitalize}
    />
  </View>
);

const AddCarScreen: React.FC = () => {
  const navigation = useProfileNavigation();
  const createCarMutation = useCreateCar();

  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [color, setColor] = useState("");

  const isValid =
    plateNumber.trim() &&
    vehicleMake.trim() &&
    vehicleModel.trim() &&
    vehicleCategory.trim() &&
    color.trim();

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert("Missing fields", "Please fill in all fields before submitting.");
      return;
    }

    createCarMutation.mutate(
      {
        plateNumber: plateNumber.trim().toUpperCase(),
        vehicleMake: vehicleMake.trim(),
        vehicleModel: vehicleModel.trim(),
        vehicleCategory: vehicleCategory.trim(),
        color: color.trim().toLowerCase(),
      },
      {
        onSuccess: (car) => {
          navigation.navigate("CarDetail", { carId: car.id });
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.message ??
            "Failed to register car. Please try again.";
          Alert.alert("Error", Array.isArray(message) ? message.join("\n") : message);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Add a Car" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.hint}>
            Enter your vehicle details. All information will be reviewed by our
            team before your car is approved for rides.
          </Text>

          <Field
            label="Plate Number"
            value={plateNumber}
            onChange={setPlateNumber}
            placeholder="e.g. ABC-123-EF"
            autoCapitalize="characters"
          />
          <Field
            label="Vehicle Make"
            value={vehicleMake}
            onChange={setVehicleMake}
            placeholder="e.g. Toyota"
          />
          <Field
            label="Vehicle Model"
            value={vehicleModel}
            onChange={setVehicleModel}
            placeholder="e.g. Camry"
          />

          {/* Category picker */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Vehicle Category</Text>
            <View style={styles.categoryGrid}>
              {VEHICLE_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    vehicleCategory === cat && styles.categoryChipSelected,
                  ]}
                  onPress={() => setVehicleCategory(cat)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      vehicleCategory === cat && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Field
            label="Color"
            value={color}
            onChange={setColor}
            placeholder="e.g. Silver"
          />

          <TouchableOpacity
            style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!isValid || createCarMutation.isPending}
            activeOpacity={0.85}
          >
            {createCarMutation.isPending ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.submitText}>Register Car</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  hint: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },

  // Field
  fieldWrap: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    fontSize: FontSize.base,
    color: Colors.text,
    backgroundColor: Colors.white,
  },

  // Category chips
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  categoryChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  categoryChipTextSelected: {
    color: Colors.white,
    fontWeight: "700",
  },

  // Submit
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  submitBtnDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  submitText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: "700",
  },
});

export default AddCarScreen;
