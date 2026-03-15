import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

export type HistoryTab = "passenger" | "driver";

interface HistoryTabBarProps {
  activeTab: HistoryTab;
  onChange: (tab: HistoryTab) => void;
}

const TABS: { key: HistoryTab; label: string }[] = [
  { key: "passenger", label: "As Passenger" },
  { key: "driver", label: "As Owner" },
];

export const HistoryTabBar: React.FC<HistoryTabBarProps> = ({
  activeTab,
  onChange,
}) => (
  <View style={styles.container}>
    {TABS.map((tab) => {
      const isActive = tab.key === activeTab;
      return (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, isActive && styles.tabActive]}
          onPress={() => onChange(tab.key)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 4,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.primary,
  },
});
