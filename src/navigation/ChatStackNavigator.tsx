import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationsScreen from "@/screens/messages/ConversationsScreen";
import ChatScreen from "@/screens/messages/ChatScreen";

export type ChatStackParamList = {
  Conversations: undefined;
  Chat: {
    conversationId: string;
    otherUserName: string;
  };
};

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Conversations" component={ConversationsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
