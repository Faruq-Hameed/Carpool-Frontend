export type NotificationPlatform = "android" | "ios";

export interface NotificationPreferences {
  pushEnabled: boolean;
  emailEnabled: boolean;
}

// ─── DTOs ────────────────────────────────────────────────────────────────────

export interface RegisterDeviceDto {
  token: string;
  platform: NotificationPlatform;
}

export interface UpdatePreferencesDto {
  pushEnabled?: boolean;
  emailEnabled?: boolean;
}
