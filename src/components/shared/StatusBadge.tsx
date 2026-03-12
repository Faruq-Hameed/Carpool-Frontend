import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusColors, Radius, FontSize } from "@/theme";

interface StatusBadgeProps {
  /** Any ApiStatus or domain status string, e.g. "PENDING", "VERIFIED" */
  status: string;
  /** "sm" for compact inline badges, "md" for cards (default) */
  size?: "sm" | "md";
}

/** Color-coded pill badge for any status string. */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
}) => {
  const colors = StatusColors[status] ?? { bg: "#F5F5F5", text: "#666666" };
  const label = status.replace(/_/g, " ");

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg },
        size === "sm" && styles.badgeSm,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: colors.text },
          size === "sm" && styles.textSm,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    alignSelf: "flex-start",
  },
  badgeSm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  textSm: {
    fontSize: FontSize.xs,
  },
});
