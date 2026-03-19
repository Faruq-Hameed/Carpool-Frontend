import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useMessages, useSendMessage, useMarkAsRead } from "@/hooks/useChat";
import { useChatSocket } from "@/contexts/ChatSocketContext";
import { useAuth } from "@/hooks/useAuth";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import { Colors, FontSize, Spacing } from "@/theme";
import { ChatStackParamList } from "@/navigation/ChatStackNavigator";
import { ChatMessage } from "@/apis/chat/types";

type RouteProps = RouteProp<ChatStackParamList, "Chat">;
type NavProp = StackNavigationProp<ChatStackParamList, "Chat">;

const ChatScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProp>();
  const { conversationId, otherUserName } = route.params;

  const { currentUser } = useAuth();
  const { joinConversation, sendSocketMessage, connected } = useChatSocket();

  const { data, isLoading } = useMessages(conversationId);
  const sendMessage = useSendMessage(conversationId);
  const markAsRead = useMarkAsRead(conversationId);

  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  // Join socket room + mark as read on mount
  useEffect(() => {
    if (connected) joinConversation(conversationId);
    markAsRead.mutate();
  }, [connected, conversationId]);

  // Scroll to bottom on new messages
  const messages = data?.docs ?? [];
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages.length]);

  const handleSend = useCallback(
    (text: string) => {
      // Prefer socket for real-time; fall back to REST
      if (connected) {
        sendSocketMessage(conversationId, text);
      } else {
        sendMessage.mutate(text);
      }
    },
    [connected, conversationId, sendSocketMessage, sendMessage],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {otherUserName}
          </Text>
          <Text style={styles.headerSub}>
            {connected ? "Online" : "Connecting…"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : messages.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
          <Text style={styles.emptyText}>No messages yet. Say hello!</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble message={item} isMine={item.senderId === currentUser.id} />
          )}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
        />
      )}

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isSending={sendMessage.isPending}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: Spacing.md,
  },
  backBtn: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: "#111827",
  },
  headerSub: {
    fontSize: FontSize.xs,
    color: "#6B7280",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: "#9CA3AF",
  },
  messageList: {
    paddingVertical: Spacing.md,
  },
});

export default ChatScreen;
