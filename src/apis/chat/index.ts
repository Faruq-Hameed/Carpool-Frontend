import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  Conversation,
  ChatMessage,
  PaginatedConversations,
  PaginatedMessages,
} from "./types";

const BASE = "/chat/conversations";

export function getOrCreateConversationApi(rideId: string, otherUserId: string) {
  return request.post<GenericResponse<Conversation>>(BASE, { rideId, otherUserId });
}

export function getMyConversationsApi(page = 1, size = 20) {
  return request.get<GenericResponse<PaginatedConversations>>(BASE, {
    params: { page, size },
  });
}

export function getMessagesApi(conversationId: string, page = 1, size = 50) {
  return request.get<GenericResponse<PaginatedMessages>>(
    `${BASE}/${conversationId}/messages`,
    { params: { page, size } },
  );
}

export function sendMessageApi(conversationId: string, content: string) {
  return request.post<GenericResponse<ChatMessage>>(
    `${BASE}/${conversationId}/messages`,
    { content },
  );
}

export function markAsReadApi(conversationId: string) {
  return request.patch<GenericResponse<null>>(`${BASE}/${conversationId}/read`);
}
