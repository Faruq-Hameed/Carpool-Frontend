import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useMyConversations } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import ConversationRow from "./components/ConversationRow";
import { Colors, FontSize, Spacing } from "@/theme";
import { ChatStackParamList } from "@/navigation/ChatStackNavigator";

type NavProp = StackNavigationProp<ChatStackParamList, "Conversations">;

const ConversationsScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { currentUser } = useAuth();
  const { data, isLoading, isRefetching, refetch } = useMyConversations();

  const conversations = data?.docs ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : conversations.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="chatbubbles-outline" size={56} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptyBody}>
            Start chatting with a ride owner or passenger from the ride details screen.
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationRow
              conversation={item}
              currentUserId={currentUser.id}
              onPress={() =>
                navigation.navigate("Chat", {
                  conversationId: item.id,
                  otherUserName: item.participant1Id === currentUser.id
                    ? `${item.participant2.firstName} ${item.participant2.lastName}`
                    : `${item.participant1.firstName} ${item.participant1.lastName}`,
                })
              }
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={Colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: "#111827",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: "#374151",
  },
  emptyBody: {
    fontSize: FontSize.sm,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ConversationsScreen;
