import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";

import NavigationHeader from "@/components/navigation/NavigationHeader";
import Text from "@/components/texts";
import Spacer from "@/components/others/Spacer";
import {
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from "@/hooks/useNotifications";
import { Colors, Spacing, FontSize, Radius } from "@/theme";

const NotificationPreferencesScreen: React.FC = () => {
  const { data: prefs, isLoading } = useNotificationPreferences();
  const { mutate: update, isPending } = useUpdateNotificationPreferences();

  const toggle = (key: "pushEnabled" | "emailEnabled", value: boolean) => {
    update(
      { [key]: value },
      {
        onError: () =>
          Alert.alert("Error", "Failed to update preferences. Please try again."),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="Notification Preferences" goBack />
      <Spacer />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.card}>
          <PreferenceRow
            label="Push Notifications"
            description="Receive push alerts for ride updates, bookings, and KYC status."
            value={prefs?.pushEnabled ?? true}
            onChange={(v) => toggle("pushEnabled", v)}
            disabled={isPending}
          />
          <View style={styles.divider} />
          <PreferenceRow
            label="Email Notifications"
            description="Receive email summaries for bookings, withdrawals, and account activity."
            value={prefs?.emailEnabled ?? true}
            onChange={(v) => toggle("emailEnabled", v)}
            disabled={isPending}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const PreferenceRow: React.FC<{
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled: boolean;
}> = ({ label, description, value, onChange, disabled }) => (
  <View style={styles.row}>
    <View style={styles.rowText}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowDesc}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      trackColor={{ false: "#D1D5DB", true: Colors.primaryLight }}
      thumbColor={value ? Colors.primary : "#9CA3AF"}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Spacing.base,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: Radius.md,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.base,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowLabel: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
  },
  rowDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
});

export default NotificationPreferencesScreen;
