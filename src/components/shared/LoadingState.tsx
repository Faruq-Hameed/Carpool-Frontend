import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors, Spacing, FontSize } from "@/theme";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
  /** If true, fills available space (use inside ScrollView/FlatList content) */
  fullScreen?: boolean;
}

/** Centered loading indicator with optional label. */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  size = "large",
  fullScreen = true,
}) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size={size} color={Colors.primary} />
    {message ? <Text style={styles.message}>{message}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  fullScreen: {
    flex: 1,
  },
  message: {
    marginTop: Spacing.sm,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
});
