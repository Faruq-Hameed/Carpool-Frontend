import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Car } from "@/apis/cars/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

interface CarCardProps {
  car: Car;
  onPress?: () => void;
  /** Highlight with green border when selected (e.g. in car picker) */
  selected?: boolean;
}

/** Card displaying a car: make/model, plate, color, category, and status. */
export const CarCard: React.FC<CarCardProps> = ({
  car,
  onPress,
  selected = false,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* ── Header: car icon + make/model ────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="car-outline"
            size={24}
            color={selected ? Colors.primary : Colors.textSecondary}
          />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.makeModel} numberOfLines={1}>
            {car.vehicleMake} {car.vehicleModel}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {car.vehicleCategory}
          </Text>
        </View>

        <StatusBadge status={car.carStatus} size="sm" />
      </View>

      {/* ── Details: plate + color ───────────────────────────────── */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons
            name="card-outline"
            size={13}
            color={Colors.textSecondary}
          />
          <Text style={styles.detailText}>{car.plateNumber}</Text>
        </View>

        <View style={styles.detailItem}>
          <View
            style={[
              styles.colorDot,
              { backgroundColor: resolveColorHex(car.color) },
            ]}
          />
          <Text style={styles.detailText}>{car.color}</Text>
        </View>
      </View>

      {/* ── Selected indicator ───────────────────────────────────── */}
      {selected && (
        <View style={styles.selectedBadge}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </Wrapper>
  );
};

/**
 * Best-effort map of common color names to hex. Falls back to a neutral gray
 * so the dot is always visible regardless of what string comes from the API.
 */
function resolveColorHex(color: string): string {
  const map: Record<string, string> = {
    white:   "#FFFFFF",
    black:   "#1A1A1A",
    silver:  "#C0C0C0",
    gray:    "#808080",
    grey:    "#808080",
    red:     "#CE0000",
    blue:    "#1D4ED8",
    green:   "#126415",
    yellow:  "#F59E0B",
    orange:  "#EA580C",
    brown:   "#78350F",
    gold:    "#D97706",
    maroon:  "#7F1D1D",
    purple:  "#7E22CE",
    pink:    "#EC4899",
    beige:   "#D4B896",
    cream:   "#FFFDD0",
  };
  return map[color.toLowerCase()] ?? "#CCCCCC";
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  cardSelected: {
    borderColor: Colors.primaryMedium,
    borderWidth: 2,
    backgroundColor: Colors.primaryLight,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: {
    flex: 1,
  },
  makeModel: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  category: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    textTransform: "capitalize",
  },

  // Details
  detailsRow: {
    flexDirection: "row",
    gap: Spacing.base,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: "capitalize",
  },

  // Selected
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.primaryLight,
  },
  selectedText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
});
