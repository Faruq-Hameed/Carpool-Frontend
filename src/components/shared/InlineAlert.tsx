import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius, FontSize } from "@/theme";

type AlertType = "info" | "warning" | "error" | "success";

const config: Record<
  AlertType,
  { icon: keyof typeof Ionicons.glyphMap; bg: string; text: string; border: string }
> = {
  info:    { icon: "information-circle-outline", bg: Colors.infoBg,      text: Colors.info,    border: "#BFDBFE" },
  warning: { icon: "warning-outline",            bg: Colors.warningBg,   text: Colors.warning, border: "#FDE68A" },
  error:   { icon: "alert-circle-outline",       bg: Colors.errorBg,     text: Colors.error,   border: "#FECACA" },
  success: { icon: "checkmark-circle-outline",   bg: Colors.primaryLight, text: Colors.primary, border: "#BBF7D0" },
};

interface InlineAlertProps {
  type?: AlertType;
  message: string;
}

/** Inline banner for contextual info/warning/error/success messages. */
export const InlineAlert: React.FC<InlineAlertProps> = ({ type = "info", message }) => {
  const { icon, bg, text, border } = config[type];
  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
      <Ionicons name={icon} size={18} color={text} style={styles.icon} />
      <Text style={[styles.message, { color: text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    borderRadius: Radius.sm,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
    marginTop: 1,
  },
  message: {
    flex: 1,
    fontSize: FontSize.base,
    lineHeight: 20,
  },
});
