import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSize, Radius, Spacing } from "@/theme";
import { ChatMessage } from "@/apis/chat/types";

interface Props {
  message: ChatMessage;
  isMine: boolean;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const ChatBubble: React.FC<Props> = ({ message, isMine }) => {
  return (
    <View style={[styles.wrapper, isMine ? styles.wrapperRight : styles.wrapperLeft]}>
      <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}>
        <Text style={[styles.text, isMine ? styles.textMine : styles.textOther]}>
          {message.content}
        </Text>
        <Text style={[styles.time, isMine ? styles.timeMine : styles.timeOther]}>
          {formatTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.base,
    marginVertical: 3,
  },
  wrapperRight: {
    alignItems: "flex-end",
  },
  wrapperLeft: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: 2,
  },
  bubbleMine: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: FontSize.base,
    lineHeight: 20,
  },
  textMine: {
    color: "#fff",
  },
  textOther: {
    color: "#111827",
  },
  time: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 2,
  },
  timeMine: {
    color: "rgba(255,255,255,0.65)",
  },
  timeOther: {
    color: "#9CA3AF",
  },
});

export default ChatBubble;
