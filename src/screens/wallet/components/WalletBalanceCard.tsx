import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius, FontSize, formatNaira } from "@/theme";

interface Props {
  balance: number;
  onFund: () => void;
  onWithdraw: () => void;
}

export const WalletBalanceCard: React.FC<Props> = ({
  balance,
  onFund,
  onWithdraw,
}) => (
  <View style={styles.card}>
    <Text style={styles.label}>Available Balance</Text>
    <Text style={styles.balance}>{formatNaira(balance)}</Text>

    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionBtn} onPress={onFund} activeOpacity={0.75}>
        <View style={styles.iconCircle}>
          <Ionicons name="add-outline" size={20} color={Colors.primary} />
        </View>
        <Text style={styles.actionLabel}>Fund</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.actionBtn} onPress={onWithdraw} activeOpacity={0.75}>
        <View style={styles.iconCircle}>
          <Ionicons name="arrow-up-outline" size={20} color={Colors.primary} />
        </View>
        <Text style={styles.actionLabel}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.walletBg,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xs,
    fontWeight: "500",
  },
  balance: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: Spacing.xl,
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: Radius.md,
    overflow: "hidden",
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    gap: 6,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.white,
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: Spacing.md,
  },
});
