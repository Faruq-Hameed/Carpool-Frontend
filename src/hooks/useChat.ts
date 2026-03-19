import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyConversationsApi,
  getMessagesApi,
  getOrCreateConversationApi,
  sendMessageApi,
  markAsReadApi,
} from "@/apis/chat";

export function useMyConversations(page = 1, size = 20) {
  return useQuery({
    queryKey: ["conversations", page, size],
    queryFn: () =>
      getMyConversationsApi(page, size).then((r) => r.data.data),
    refetchInterval: 10_000, // poll every 10s as fallback
  });
}

export function useMessages(conversationId: string | null, page = 1, size = 50) {
  return useQuery({
    queryKey: ["messages", conversationId, page],
    queryFn: () =>
      getMessagesApi(conversationId!, page, size).then((r) => r.data.data),
    enabled: !!conversationId,
    refetchInterval: 5_000,
  });
}

export function useGetOrCreateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ rideId, otherUserId }: { rideId: string; otherUserId: string }) =>
      getOrCreateConversationApi(rideId, otherUserId).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conversations"] }),
  });
}

export function useSendMessage(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) =>
      sendMessageApi(conversationId, content).then((r) => r.data.data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["messages", conversationId] }),
  });
}

export function useMarkAsRead(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => markAsReadApi(conversationId).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["conversations"] });
      qc.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });
}
