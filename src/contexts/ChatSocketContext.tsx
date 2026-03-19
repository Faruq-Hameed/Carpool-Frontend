/**
 * ChatSocketContext — manages a socket.io connection to the /chat namespace.
 *
 * Install before use:
 *   npx expo install socket.io-client
 *
 * Usage:
 *   const { socket, joinConversation, sendMessage } = useChatSocket();
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, ACCESS_TOKEN_STORAGE_KEY } from "@/utils/constants/apiConstants";
import { ChatMessage } from "@/apis/chat/types";

interface ChatSocketContextValue {
  connected: boolean;
  joinConversation: (conversationId: string) => void;
  sendSocketMessage: (conversationId: string, content: string) => void;
  markReadSocket: (conversationId: string) => void;
}

const ChatSocketContext = createContext<ChatSocketContextValue>({
  connected: false,
  joinConversation: () => {},
  sendSocketMessage: () => {},
  markReadSocket: () => {},
});

export function ChatSocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    let socket: Socket;

    const init = async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (!token) return;

      const socketUrl = API_BASE_URL.replace(/\/api(\/v\d+)?$/, ""); // strip /api path

      socket = io(`${socketUrl}/chat`, {
        auth: { token },
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 2000,
      });

      socketRef.current = socket;

      socket.on("connect", () => setConnected(true));
      socket.on("disconnect", () => setConnected(false));

      // When a new message arrives in any joined room, update the cache
      socket.on("new_message", (message: ChatMessage) => {
        qc.setQueryData(
          ["messages", message.conversationId, 1],
          (old: any) => {
            if (!old) return old;
            const alreadyExists = old.docs?.some((m: ChatMessage) => m.id === message.id);
            if (alreadyExists) return old;
            return {
              ...old,
              docs: [...(old.docs ?? []), message],
              total_docs: (old.total_docs ?? 0) + 1,
            };
          },
        );
        // Refresh conversation list to update lastMessage + unread counts
        qc.invalidateQueries({ queryKey: ["conversations"] });
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [qc]);

  const joinConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("join_conversation", { conversationId });
  }, []);

  const sendSocketMessage = useCallback(
    (conversationId: string, content: string) => {
      socketRef.current?.emit("send_message", { conversationId, content });
    },
    [],
  );

  const markReadSocket = useCallback((conversationId: string) => {
    socketRef.current?.emit("mark_read", { conversationId });
  }, []);

  return (
    <ChatSocketContext.Provider
      value={{ connected, joinConversation, sendSocketMessage, markReadSocket }}
    >
      {children}
    </ChatSocketContext.Provider>
  );
}

export function useChatSocket() {
  return useContext(ChatSocketContext);
}
