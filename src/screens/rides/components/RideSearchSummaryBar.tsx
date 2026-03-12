import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RideSearchQuery } from "@/apis/rides/types";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

interface RideSearchSummaryBarProps {
  query: RideSearchQuery;
  onEdit?: () => void;
}

/** Compact display of active search params shown at top of RideResults. */
export const RideSearchSummaryBar: React.FC<RideSearchSummaryBarProps> = ({
  query,
  onEdit,
}) => (
  <View style={styles.container}>
    {/* Route */}
    <View style={styles.routeRow}>
      <Text style={styles.location} numberOfLines={1}>
        {query.origin || "—"}
      </Text>
      <Ionicons
        name="arrow-forward"
        size={14}
        color={Colors.textSecondary}
        style={styles.arrow}
      />
      <Text style={styles.location} numberOfLines={1}>
        {query.destination || "—"}
      </Text>
    </View>

    {/* Meta: date + seats */}
    <View style={styles.metaRow}>
      {query.date ? (
        <View style={styles.chip}>
          <Ionicons name="calendar-outline" size={12} color={Colors.textSecondary} />
          <Text style={styles.chipText}>{query.date}</Text>
        </View>
      ) : null}
      {query.seats ? (
        <View style={styles.chip}>
          <Ionicons name="people-outline" size={12} color={Colors.textSecondary} />
          <Text style={styles.chipText}>
            {query.seats} seat{query.seats !== 1 ? "s" : ""}
          </Text>
        </View>
      ) : null}
    </View>

    {/* Edit button */}
    {onEdit ? (
      <TouchableOpacity onPress={onEdit} style={styles.editBtn} hitSlop={8}>
        <Ionicons name="create-outline" size={16} color={Colors.primaryMedium} />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  location: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  arrow: {
    marginHorizontal: Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  editBtn: {
    position: "absolute",
    right: Spacing.base,
    top: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  editText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.primaryMedium,
  },
});
