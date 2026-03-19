import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radius, Spacing, FontSize } from "@/theme";

interface Props {
  onSend: (text: string) => void;
  isSending?: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<Props> = ({ onSend, isSending = false, disabled = false }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isSending || disabled) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message…"
        placeholderTextColor="#9CA3AF"
        multiline
        maxLength={2000}
        editable={!disabled}
        returnKeyType="send"
        blurOnSubmit={false}
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        style={[styles.sendBtn, (!text.trim() || disabled) && styles.sendBtnDisabled]}
        onPress={handleSend}
        disabled={!text.trim() || isSending || disabled}
        activeOpacity={0.7}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="send" size={18} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: 9,
    fontSize: FontSize.base,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});

export default ChatInput;
