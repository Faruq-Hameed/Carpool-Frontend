import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSize } from "@/theme";

interface RideInfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

/** Single labelled info line: icon + label + value. Used inside RideDetail. */
export const RideInfoRow: React.FC<RideInfoRowProps> = ({
  icon,
  label,
  value,
}) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={18} color={Colors.primary} style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  icon: {
    width: 28,
  },
  label: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
    maxWidth: "55%",
    textAlign: "right",
  },
});
