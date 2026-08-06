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
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import { DashboardTabParamList } from "@/navigation/DashboardNavigator";
import { useRootNavigation, useProfileNavigation } from "@/hooks/useTypedNavigation";
import { useMyCars } from "@/hooks/useCars";
import { useCreateRide } from "@/hooks/useRides";
import { CarCard } from "@/components/cards/CarCard";
import { InlineAlert } from "@/components/shared/InlineAlert";
import { Colors, Spacing, Radius, FontSize } from "@/theme";
import { Car } from "@/apis/cars/types";
import { RideRoutePointDto } from "@/apis/rides/types";
import { PlacesInput, PlaceSelection } from "@/screens/dashboard/home/components/PlacesInput";

type Props = BottomTabScreenProps<DashboardTabParamList, "Offer">;

// ─── Section wrapper (OfferRideFormSection) ───────────────────────────────────
const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// ─── Labelled text input ──────────────────────────────────────────────────────
const LabeledInput: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  icon?: keyof typeof Ionicons.glyphMap;
}> = ({ label, value, onChange, placeholder, keyboardType = "default", icon }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={Colors.textSecondary}
          style={styles.inputIcon}
        />
      )}
      <TextInput
        style={[styles.input, icon && styles.inputWithIcon]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

// ─── Seat counter ─────────────────────────────────────────────────────────────
const SeatCounter: React.FC<{
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}> = ({ value, min = 1, max = 8, onChange }) => (
  <View style={styles.counterRow}>
    <TouchableOpacity
      style={[styles.counterBtn, value <= min && styles.counterBtnDisabled]}
      onPress={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
      activeOpacity={0.75}
    >
      <Ionicons
        name="remove"
        size={20}
        color={value <= min ? Colors.textTertiary : Colors.text}
      />
    </TouchableOpacity>
    <Text style={styles.counterValue}>{value}</Text>
    <TouchableOpacity
      style={[styles.counterBtn, value >= max && styles.counterBtnDisabled]}
      onPress={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      activeOpacity={0.75}
    >
      <Ionicons
        name="add"
        size={20}
        color={value >= max ? Colors.textTertiary : Colors.text}
      />
    </TouchableOpacity>
  </View>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function combineDateAndTime(date: Date, time: Date): Date {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return combined;
}

function buildRoutePoints(
  origin: PlaceSelection,
  stops: (PlaceSelection | null)[],
  destination: PlaceSelection
): RideRoutePointDto[] {
  const points: RideRoutePointDto[] = [
    { orderIndex: 0, pointType: "START", latitude: origin.lat, longitude: origin.lng, label: origin.label },
  ];

  stops.forEach((stop, i) => {
    if (stop) {
      points.push({
        orderIndex: i + 1,
        pointType: "INTERMEDIATE",
        latitude: stop.lat,
        longitude: stop.lng,
        label: stop.label,
      });
    }
  });

  points.push({
    orderIndex: points.length,
    pointType: "END",
    latitude: destination.lat,
    longitude: destination.lng,
    label: destination.label,
  });

  return points;
}

// ─── Screen ───────────────────────────────────────────────────────────────────
const OfferRideScreen: React.FC<Props> = () => {
  const rootNavigation = useRootNavigation();
  const profileNavigation = useProfileNavigation();

  const { data: carsData, isLoading: loadingCars } = useMyCars(1, 50);
  const cars: Car[] = carsData?.docs ?? [];
  const verifiedCars = cars.filter((c) => c.carStatus === "VERIFIED");

  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<PlaceSelection | null>(null);
  const [destination, setDestination] = useState<PlaceSelection | null>(null);
  const [stops, setStops] = useState<(PlaceSelection | null)[]>([]);
  const [totalSeats, setTotalSeats] = useState(4);
  const [pricePerSeat, setPricePerSeat] = useState("");
  const [notes, setNotes] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const createRideMutation = useCreateRide();

  const addStop = () => setStops((prev) => [...prev, null]);
  const removeStop = (index: number) =>
    setStops((prev) => prev.filter((_, i) => i !== index));
  const updateStop = (index: number, value: PlaceSelection | null) =>
    setStops((prev) => prev.map((s, i) => (i === index ? value : s)));

  const isValid =
    !!selectedCarId &&
    !!origin &&
    !!destination &&
    pricePerSeat.trim().length > 0 &&
    parseFloat(pricePerSeat) > 0;

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert("Incomplete", "Please select a car and fill in all required fields.");
      return;
    }

    const combinedDeparture = combineDateAndTime(departureDate, departureTime);
    if (combinedDeparture <= new Date()) {
      Alert.alert("Invalid time", "Departure time must be in the future.");
      return;
    }

    createRideMutation.mutate(
      {
        carId: selectedCarId!,
        origin: origin!.label,
        destination: destination!.label,
        departureTime: combinedDeparture.toISOString(),
        totalSeats,
        pricePerSeat: parseFloat(pricePerSeat),
        notes: notes.trim() || undefined,
        routePoints: buildRoutePoints(origin!, stops, destination!),
      },
      {
        onSuccess: (ride) => {
          setSelectedCarId(null);
          setOrigin(null);
          setDestination(null);
          setStops([]);
          setPricePerSeat("");
          setNotes("");
          setTotalSeats(4);
          setDepartureDate(new Date());
          setDepartureTime(new Date());

          Alert.alert(
            "Ride Posted!",
            "Your ride has been published. Passengers can now request to join.",
            [
              {
                text: "View Ride",
                onPress: () =>
                  rootNavigation.navigate("RideStack", {
                    screen: "RideDetail",
                    params: { rideId: ride.id },
                  }),
              },
              { text: "OK" },
            ]
          );
        },
        onError: (err: any) => {
          const raw = err?.response?.data?.message;
          const message = Array.isArray(raw) ? raw.join("\n") : (raw ?? "Failed to create ride.");
          Alert.alert("Error", message);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Offer a Ride</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          {/* ── 1. Car selection ──────────────────────────────────────── */}
          <FormSection title="Select Your Car">
            {loadingCars ? (
              <ActivityIndicator
                size="small"
                color={Colors.primary}
                style={{ marginVertical: Spacing.base }}
              />
            ) : cars.length === 0 ? (
              <>
                <InlineAlert
                  type="info"
                  message="You have no registered cars yet. Add a car before offering rides."
                />
                <TouchableOpacity
                  style={styles.outlineBtn}
                  onPress={() => profileNavigation.navigate("MyCars")}
                  activeOpacity={0.85}
                >
                  <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
                  <Text style={styles.outlineBtnText}>Register a Car</Text>
                </TouchableOpacity>
              </>
            ) : verifiedCars.length === 0 ? (
              <>
                <InlineAlert
                  type="warning"
                  message="Your car(s) are awaiting verification. Only verified cars can be used for rides."
                />
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </>
            ) : (
              verifiedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  selected={selectedCarId === car.id}
                  onPress={() =>
                    setSelectedCarId((prev) => (prev === car.id ? null : car.id))
                  }
                />
              ))
            )}
          </FormSection>

          {/* ── 2. Route ──────────────────────────────────────────────── */}
          <FormSection title="Route">
            <Text style={styles.label}>Leaving from *</Text>
            <PlacesInput
              placeholder="Enter pick-up location"
              onSelect={setOrigin}
              icon={<Ionicons name="location-outline" size={18} color={Colors.textSecondary} />}
              showCurrentLocation
            />

            {stops.map((stop, index) => (
              <View key={index} style={styles.stopRow}>
                <View style={styles.stopInputWrap}>
                  <PlacesInput
                    placeholder={`Stop ${index + 1}`}
                    onSelect={(place) => updateStop(index, place)}
                    defaultValue={stop?.label}
                    icon={
                      <Ionicons
                        name="ellipse-outline"
                        size={14}
                        color={Colors.textTertiary}
                      />
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={() => removeStop(index)}
                  style={styles.removeStopBtn}
                  hitSlop={8}
                >
                  <Ionicons name="close-circle" size={22} color={Colors.textTertiary} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addStopBtn}
              onPress={addStop}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={16} color={Colors.primaryMedium} />
              <Text style={styles.addStopText}>Add a stop along the route</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Going to *</Text>
            <PlacesInput
              placeholder="Enter drop-off location"
              onSelect={setDestination}
              icon={<Ionicons name="navigate-outline" size={18} color={Colors.textSecondary} />}
            />
          </FormSection>

          {/* ── 3. Departure ──────────────────────────────────────────── */}
          <FormSection title="Departure">
            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeField}>
                <Text style={styles.label}>Date *</Text>
                <TouchableOpacity
                  style={styles.pickerBtn}
                  onPress={() => setDatePickerVisible(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.pickerBtnText}>
                    {format(departureDate, "EEE, d MMM")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateTimeField}>
                <Text style={styles.label}>Time *</Text>
                <TouchableOpacity
                  style={styles.pickerBtn}
                  onPress={() => setTimePickerVisible(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.pickerBtnText}>
                    {format(departureTime, "h:mm a")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </FormSection>

          {/* ── 4. Seats & price ──────────────────────────────────────── */}
          <FormSection title="Seats & Price">
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Total seats available *</Text>
              <SeatCounter
                value={totalSeats}
                min={1}
                max={8}
                onChange={setTotalSeats}
              />
            </View>

            <LabeledInput
              label="Price per seat (₦) *"
              value={pricePerSeat}
              onChange={setPricePerSeat}
              placeholder="e.g. 2500"
              keyboardType="numeric"
              icon="cash-outline"
            />
          </FormSection>

          {/* ── 5. Notes ──────────────────────────────────────────────── */}
          <FormSection title="Notes (optional)">
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Any instructions? e.g. Meet at the petrol station entrance, no food allowed..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </FormSection>

          {/* ── Submit ────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!isValid || createRideMutation.isPending}
            activeOpacity={0.85}
          >
            {createRideMutation.isPending ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <>
                <Ionicons name="car-outline" size={20} color={Colors.white} />
                <Text style={styles.submitText}>Post Ride</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        date={departureDate}
        minimumDate={new Date()}
        onConfirm={(d) => {
          setDatePickerVisible(false);
          setDepartureDate(d);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        date={departureTime}
        onConfirm={(t) => {
          setTimePickerVisible(false);
          setDepartureTime(t);
        }}
        onCancel={() => setTimePickerVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  scroll: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm,
  },

  // Section
  section: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
  },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  // Fields
  fieldWrap: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: 13,
    fontSize: FontSize.base,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
  },
  inputWithIcon: {
    borderWidth: 0,
    paddingLeft: 0,
  },
  inputIcon: {
    paddingLeft: Spacing.md,
  },

  // Stops
  stopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  stopInputWrap: {
    flex: 1,
  },
  removeStopBtn: {
    padding: 4,
  },
  addStopBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  addStopText: {
    fontSize: FontSize.sm,
    color: Colors.primaryMedium,
    fontWeight: "600",
  },

  // Date / time
  dateTimeRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  dateTimeField: {
    flex: 1,
  },
  pickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    backgroundColor: Colors.white,
  },
  pickerBtnText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: "500",
  },

  // Seat counter
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  counterBtnDisabled: {
    backgroundColor: Colors.surface,
  },
  counterValue: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
    minWidth: 32,
    textAlign: "center",
  },

  // Notes
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: FontSize.base,
    color: Colors.text,
    minHeight: 90,
    backgroundColor: Colors.white,
  },

  // Outline button
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    justifyContent: "center",
    marginTop: Spacing.sm,
  },
  outlineBtnText: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.primary,
  },

  // Submit
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
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

export default OfferRideScreen;
