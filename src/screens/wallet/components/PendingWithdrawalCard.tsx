import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WithdrawalRequest } from "@/apis/wallet/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useCancelWithdrawal } from "@/hooks/useWallet";
import { Colors, Spacing, Radius, FontSize, formatNaira, formatShortDate } from "@/theme";

interface Props {
  withdrawal: WithdrawalRequest;
}

export const PendingWithdrawalCard: React.FC<Props> = ({ withdrawal }) => {
  const cancelMutation = useCancelWithdrawal();

  const handleCancel = () => {
    Alert.alert(
      "Cancel Withdrawal",
      "Cancel this withdrawal request? The funds will be returned to your wallet.",
      [
        { text: "Keep it", style: "cancel" },
        {
          text: "Cancel Request",
          style: "destructive",
          onPress: () =>
            cancelMutation.mutate(withdrawal.id, {
              onError: (err: any) => {
                const msg =
                  err?.response?.data?.message ?? "Could not cancel. Try again.";
                Alert.alert("Error", msg);
              },
            }),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrap}>
            <Ionicons name="time-outline" size={18} color={Colors.warning} />
          </View>
          <Text style={styles.title}>Pending Withdrawal</Text>
        </View>
        <StatusBadge status={withdrawal.status} size="sm" />
      </View>

      <Text style={styles.amount}>{formatNaira(withdrawal.amount)}</Text>

      <View style={styles.bankRow}>
        <Ionicons name="business-outline" size={14} color={Colors.textSecondary} />
        <Text style={styles.bankText}>
          {withdrawal.bankDetails.bankName} · {withdrawal.bankDetails.accountNumber}
        </Text>
      </View>
      <Text style={styles.accountName}>{withdrawal.bankDetails.accountName}</Text>

      <Text style={styles.date}>
        Requested {formatShortDate(withdrawal.createdAt)}
      </Text>

      {withdrawal.status === "PENDING" && (
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={handleCancel}
          disabled={cancelMutation.isPending}
          activeOpacity={0.8}
        >
          {cancelMutation.isPending ? (
            <ActivityIndicator size="small" color={Colors.error} />
          ) : (
            <>
              <Ionicons name="close-outline" size={16} color={Colors.error} />
              <Text style={styles.cancelText}>Cancel Request</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.warningBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "#F6D860",
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: Radius.full,
    backgroundColor: "rgba(217,119,6,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  amount: {
    fontSize: FontSize.xl,
    fontWeight: "800",
    color: Colors.text,
  },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bankText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  accountName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xs,
  },
  cancelText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.error,
  },
});
