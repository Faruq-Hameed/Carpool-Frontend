import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Spacing, FontSize } from "@/theme";

interface SectionHeaderProps {
  title: string;
  /** Label for the right-side action button (e.g. "See all") */
  actionLabel?: string;
  onAction?: () => void;
}

/** Section title row with an optional "See all" / action link on the right. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {actionLabel && onAction ? (
      <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
        <Text style={styles.action}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  action: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.primaryMedium,
  },
});
