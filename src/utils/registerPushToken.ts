import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { registerDeviceApi, removeDeviceApi } from "@/apis/notifications";
import { storePushToken, getPushToken, removePushToken } from "./asyncStorage";
import type { NotificationPlatform } from "@/apis/notifications/types";

/** EAS project ID from app.json — required by getExpoPushTokenAsync in SDK 49+ */
const PROJECT_ID = "78541a66-e60e-442c-aa7d-11151459a621";

/**
 * Configure how notifications appear while the app is in the foreground.
 * Must be called once at app startup (before any notification arrives).
 */
export function configureForegroundNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

/**
 * Request notification permissions, obtain the Expo push token, and
 * register it with the backend.  Safe to call on every login — if a
 * token is already stored it is sent again so the backend stays fresh.
 *
 * Silently no-ops on simulators / emulators (tokens don't work there).
 */
export async function registerPushToken(): Promise<void> {
  // Push tokens only work on physical devices
  if (!Device.isDevice) return;

  // Android requires an explicit notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#126415",
    });
  }

  // Request / check permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // User denied — bail out silently
  if (finalStatus !== "granted") return;

  // Get Expo push token (requires projectId in SDK 49+)
  const { data: token } = await Notifications.getExpoPushTokenAsync({
    projectId: PROJECT_ID,
  });

  const platform: NotificationPlatform =
    Platform.OS === "ios" ? "ios" : "android";

  // Register with backend (fire-and-forget errors — don't block login)
  try {
    await registerDeviceApi({ token, platform });
  } catch (err) {
    console.warn("[push] registerDeviceApi failed:", err);
  }

  // Persist token so we can deregister it on logout
  await storePushToken(token);
}

/**
 * Remove the stored push token from the backend and clear local storage.
 * Called during logout so the user stops receiving pushes on this device.
 */
export async function deregisterPushToken(): Promise<void> {
  const token = await getPushToken();
  if (!token) return;

  try {
    await removeDeviceApi(token);
  } catch (err) {
    // Non-critical — device may already be removed on backend
    console.warn("[push] removeDeviceApi failed:", err);
  } finally {
    await removePushToken();
  }
}
