import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFundWallet } from "@/hooks/useWallet";
import { InlineAlert } from "@/components/shared/InlineAlert";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

interface FundWalletModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FundWalletModal: React.FC<FundWalletModalProps> = ({
  visible,
  onClose,
}) => {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const fundMutation = useFundWallet();

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;

    fundMutation.mutate(
      { amount: parsed, reference: reference.trim() || undefined },
      {
        onSuccess: () => {
          setAmount("");
          setReference("");
          onClose();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ?? "Failed to fund wallet. Try again.";
          // Error shown via InlineAlert below — we keep the modal open
          console.warn("[FundWallet] error:", msg);
        },
      }
    );
  };

  const isValid = parseFloat(amount) > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.sheet}>
          {/* Handle + header */}
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Fund Wallet</Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Ionicons name="close-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <InlineAlert
            type="info"
            message="This is a temporary top-up method. A full payment gateway will be added soon."
          />

          {/* Amount */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Amount (₦) *</Text>
            <View style={styles.inputRow}>
              <Text style={styles.prefix}>₦</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                placeholderTextColor={Colors.textTertiary}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
          </View>

          {/* Optional reference */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Reference (optional)</Text>
            <TextInput
              style={styles.inputPlain}
              value={reference}
              onChangeText={setReference}
              placeholder="e.g. bank transfer ref"
              placeholderTextColor={Colors.textTertiary}
              returnKeyType="done"
            />
          </View>

          {fundMutation.isError && (
            <InlineAlert
              type="error"
              message={
                (fundMutation.error as any)?.response?.data?.message ??
                "Failed to fund wallet."
              }
            />
          )}

          <TouchableOpacity
            style={[styles.submitBtn, !isValid && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={!isValid || fundMutation.isPending}
            activeOpacity={0.85}
          >
            {fundMutation.isPending ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.submitText}>Add Funds</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: "center",
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },
  fieldWrap: {
    gap: Spacing.sm,
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
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
  },
  prefix: {
    fontSize: FontSize.lg,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
  inputPlain: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.base,
    color: Colors.text,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radius.sm,
    alignItems: "center",
    marginTop: Spacing.sm,
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
