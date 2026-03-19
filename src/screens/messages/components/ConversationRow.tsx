import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius, FontSize } from "@/theme";
import { Conversation } from "@/apis/chat/types";

interface Props {
  conversation: Conversation;
  currentUserId: string;
  onPress: () => void;
}

function formatTime(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diffDays === 0)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { day: "2-digit", month: "short" });
}

const ConversationRow: React.FC<Props> = ({ conversation, currentUserId, onPress }) => {
  const other =
    conversation.participant1Id === currentUserId
      ? conversation.participant2
      : conversation.participant1;

  const initials =
    `${other.firstName?.[0] ?? ""}${other.lastName?.[0] ?? ""}`.toUpperCase();

  const hasUnread = (conversation.unreadCount ?? 0) > 0;

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      {/* Avatar */}
      <View style={styles.avatar}>
        {other.profilePicture ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{ width: 46, height: 46, borderRadius: 23, overflow: "hidden" }}>
            {/* RN Image — avoid inline style by using static style */}
          </View>
        ) : (
          <Text style={styles.avatarText}>{initials || "?"}</Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.name, hasUnread && styles.nameUnread]} numberOfLines={1}>
            {other.firstName} {other.lastName}
          </Text>
          <Text style={styles.time}>{formatTime(conversation.lastMessageAt)}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text
            style={[styles.preview, hasUnread && styles.previewUnread]}
            numberOfLines={1}
          >
            {conversation.lastMessage ?? "No messages yet"}
          </Text>
          {hasUnread && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: Spacing.md,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.primary,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    flex: 1,
    fontSize: FontSize.base,
    color: "#111827",
    marginRight: Spacing.sm,
  },
  nameUnread: {
    fontWeight: "700",
  },
  time: {
    fontSize: FontSize.xs,
    color: "#9CA3AF",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  preview: {
    flex: 1,
    fontSize: FontSize.sm,
    color: "#6B7280",
    marginRight: Spacing.sm,
  },
  previewUnread: {
    color: "#374151",
    fontWeight: "600",
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
});

export default ConversationRow;
