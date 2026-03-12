import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CarStatus } from "@/apis/cars/types";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

interface VerificationStatusCardProps {
  status: CarStatus;
}

const config: Record<
  CarStatus,
  {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    bg: string;
    text: string;
    border: string;
  }
> = {
  NOT_VERIFIED: {
    icon: "hourglass-outline",
    title: "Pending Verification",
    description:
      "Your car is awaiting review by our team. This usually takes 1–2 business days. You will be notified once it is approved.",
    bg: Colors.warningBg,
    text: Colors.warning,
    border: "#FDE68A",
  },
  VERIFIED: {
    icon: "shield-checkmark-outline",
    title: "Verified",
    description:
      "This car has been verified and is approved for use on rides. Passengers can see the verified badge on your trips.",
    bg: Colors.primaryLight,
    text: Colors.primary,
    border: "#BBF7D0",
  },
  REJECTED: {
    icon: "close-circle-outline",
    title: "Verification Rejected",
    description:
      "This car was not approved. Please check that all details (plate number, make, model) are accurate and that clear photos have been added, then contact support if the issue persists.",
    bg: Colors.errorBg,
    text: Colors.error,
    border: "#FECACA",
  },
};

export const VerificationStatusCard: React.FC<VerificationStatusCardProps> = ({
  status,
}) => {
  const { icon, title, description, bg, text, border } = config[status];

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: border }]}>
      <View style={styles.titleRow}>
        <Ionicons name={icon} size={20} color={text} />
        <Text style={[styles.title, { color: text }]}>{title}</Text>
      </View>
      <Text style={[styles.description, { color: text }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
});
