import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WalletTransaction, TransactionReason } from "@/apis/wallet/types";
import { Colors, Spacing, Radius, FontSize, formatNaira, formatShortDate } from "@/theme";

// ─── Icon + label config per reason ──────────────────────────────────────────

type ReasonConfig = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

const REASON_CONFIG: Record<TransactionReason, ReasonConfig> = {
  FUND:                 { icon: "wallet-outline",          label: "Wallet Top-up"       },
  RIDE_PAYMENT:         { icon: "car-outline",             label: "Ride Payment"         },
  RIDE_EARNING:         { icon: "cash-outline",            label: "Ride Earning"         },
  RIDE_REFUND:          { icon: "refresh-outline",         label: "Ride Refund"          },
  WITHDRAWAL:           { icon: "arrow-up-circle-outline", label: "Withdrawal"           },
  WITHDRAWAL_REVERSAL:  { icon: "return-down-back-outline",label: "Withdrawal Reversal"  },
  DIRECT_CREDIT:        { icon: "arrow-down-circle-outline",label: "Account Credit"      },
  DIRECT_DEBIT:         { icon: "arrow-up-circle-outline", label: "Account Debit"       },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface TransactionRowProps {
  transaction: WalletTransaction;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const isCredit = transaction.type === "CREDIT";
  const config = REASON_CONFIG[transaction.reason] ?? {
    icon: "receipt-outline",
    label: transaction.reason,
  };

  return (
    <View style={styles.row}>
      {/* Icon */}
      <View style={[styles.iconWrap, isCredit ? styles.iconCredit : styles.iconDebit]}>
        <Ionicons
          name={config.icon}
          size={18}
          color={isCredit ? Colors.primary : Colors.error}
        />
      </View>

      {/* Label + date */}
      <View style={styles.info}>
        <Text style={styles.label} numberOfLines={1}>
          {config.label}
        </Text>
        <Text style={styles.date}>{formatShortDate(transaction.createdAt)}</Text>
      </View>

      {/* Amount */}
      <Text style={[styles.amount, isCredit ? styles.amountCredit : styles.amountDebit]}>
        {isCredit ? "+" : "-"}{formatNaira(transaction.amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCredit: {
    backgroundColor: Colors.primaryLight,
  },
  iconDebit: {
    backgroundColor: Colors.errorBg,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  amount: {
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  amountCredit: {
    color: Colors.primary,
  },
  amountDebit: {
    color: Colors.error,
  },
});
