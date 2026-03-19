export interface ChatParticipant {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string | null;
}

export interface Conversation {
  id: string;
  rideId: string;
  participant1Id: string;
  participant2Id: string;
  participant1: ChatParticipant;
  participant2: ChatParticipant;
  lastMessage: string | null;
  lastMessageAt: string | null;
  /** Unread count for the requesting user (injected by backend) */
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  sender: ChatParticipant;
  createdAt: string;
}

export interface PaginatedConversations {
  total_docs: number;
  page: number;
  total_pages: number;
  size: number;
  docs: Conversation[];
}

export interface PaginatedMessages {
  total_docs: number;
  page: number;
  total_pages: number;
  size: number;
  docs: ChatMessage[];
}
