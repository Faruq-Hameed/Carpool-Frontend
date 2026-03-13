import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useMyWallet, useRequestWithdrawal, usePendingWithdrawal } from "@/hooks/useWallet";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { InlineAlert } from "@/components/shared/InlineAlert";
import { Colors, Spacing, Radius, FontSize, formatNaira } from "@/theme";
import { PendingWithdrawalCard } from "./components/PendingWithdrawalCard";

// ─── Labelled input ───────────────────────────────────────────────────────────

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric";
  icon?: keyof typeof Ionicons.glyphMap;
}> = ({ label, value, onChange, placeholder, keyboardType = "default", icon }) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputRow}>
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={Colors.textSecondary}
          style={styles.inputIcon}
        />
      )}
      <TextInput
        style={[styles.input, icon && styles.inputWithIcon]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
        keyboardType={keyboardType}
        returnKeyType="done"
      />
    </View>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

const WithdrawalScreen: React.FC = () => {
  const navigation = useProfileNavigation();

  const { data: wallet, isLoading: walletLoading } = useMyWallet();
  const { data: pending, isLoading: pendingLoading } = usePendingWithdrawal();
  const withdrawMutation = useRequestWithdrawal();

  const balance = Number(wallet?.balance ?? 0);

  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const parsedAmount = parseFloat(amount);
  const isValid =
    parsedAmount > 0 &&
    parsedAmount <= balance &&
    parsedAmount >= 100 &&
    bankName.trim().length > 0 &&
    accountNumber.trim().length > 0 &&
    accountName.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    Alert.alert(
      "Confirm Withdrawal",
      `Withdraw ${formatNaira(parsedAmount)} to ${accountName} (${bankName})?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Withdraw",
          onPress: () =>
            withdrawMutation.mutate(
              {
                amount: parsedAmount,
                bankDetails: {
                  bankName: bankName.trim(),
                  accountNumber: accountNumber.trim(),
                  accountName: accountName.trim(),
                },
              },
              {
                onSuccess: () => {
                  Alert.alert(
                    "Request Submitted",
                    "Your withdrawal request is under review. Funds will be sent within 24-48 hours.",
                    [{ text: "OK", onPress: () => navigation.goBack() }]
                  );
                },
                onError: (err: any) => {
                  const msg =
                    err?.response?.data?.message ??
                    "Failed to submit withdrawal. Please try again.";
                  Alert.alert("Error", msg);
                },
              }
            ),
        },
      ]
    );
  };

  if (walletLoading || pendingLoading) {
    return <LoadingState message="Loading..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Withdraw Funds" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Balance indicator */}
          <View style={styles.balanceRow}>
            <Ionicons name="wallet-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.balanceText}>
              Available: <Text style={styles.balanceAmount}>{formatNaira(balance)}</Text>
            </Text>
          </View>

          {/* Pending withdrawal card — shown if one exists */}
          {pending ? (
            <>
              <InlineAlert
                type="warning"
                message="You already have a pending withdrawal. Cancel it to submit a new request."
              />
              <PendingWithdrawalCard withdrawal={pending} />
            </>
          ) : (
            <>
              {/* Amount */}
              <View style={styles.amountSection}>
                <Text style={styles.amountLabel}>Amount (₦)</Text>
                <View style={styles.amountRow}>
                  <Text style={styles.amountPrefix}>₦</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0"
                    placeholderTextColor={Colors.textTertiary}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                {parsedAmount > 0 && parsedAmount < 100 && (
                  <Text style={styles.hint}>Minimum withdrawal is ₦100</Text>
                )}
                {parsedAmount > balance && (
                  <Text style={styles.hintError}>Amount exceeds your balance</Text>
                )}
              </View>

              {/* Bank details */}
              <View style={styles.bankSection}>
                <Text style={styles.sectionTitle}>Bank Details</Text>

                <Field
                  label="Bank Name *"
                  value={bankName}
                  onChange={setBankName}
                  placeholder="e.g. Access Bank"
                  icon="business-outline"
                />
                <Field
                  label="Account Number *"
                  value={accountNumber}
                  onChange={setAccountNumber}
                  placeholder="10-digit account number"
                  keyboardType="numeric"
                  icon="card-outline"
                />
                <Field
                  label="Account Name *"
                  value={accountName}
                  onChange={setAccountName}
                  placeholder="As it appears on the account"
                  icon="person-outline"
                />
              </View>

              {withdrawMutation.isError && (
                <InlineAlert
                  type="error"
                  message={
                    (withdrawMutation.error as any)?.response?.data?.message ??
                    "Failed to submit withdrawal."
                  }
                />
              )}

              <TouchableOpacity
                style={[styles.submitBtn, !isValid && styles.submitDisabled]}
                onPress={handleSubmit}
                disabled={!isValid || withdrawMutation.isPending}
                activeOpacity={0.85}
              >
                {withdrawMutation.isPending ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <>
                    <Ionicons name="arrow-up-outline" size={18} color={Colors.white} />
                    <Text style={styles.submitText}>Request Withdrawal</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
    gap: Spacing.base,
  },

  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  balanceText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  balanceAmount: {
    fontWeight: "700",
    color: Colors.primary,
  },

  amountSection: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  amountLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountPrefix: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  hint: {
    fontSize: FontSize.xs,
    color: Colors.warning,
  },
  hintError: {
    fontSize: FontSize.xs,
    color: Colors.error,
  },

  bankSection: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },

  field: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
  },
  inputIcon: {
    paddingLeft: Spacing.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: FontSize.base,
    color: Colors.text,
  },
  inputWithIcon: {
    paddingLeft: Spacing.sm,
  },

  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  submitDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  submitText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.white,
  },
});

export default WithdrawalScreen;
