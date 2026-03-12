import request from "../interceptor";
import { GenericResponse } from "../types";
import {
  NotificationPreferences,
  RegisterDeviceDto,
  UpdatePreferencesDto,
} from "./types";

/** Register device push token */
export function registerDeviceApi(dto: RegisterDeviceDto) {
  return request.post<GenericResponse<null>>("/notifications/devices", dto);
}

/** Remove a registered device token */
export function removeDeviceApi(deviceId: string) {
  return request.delete<GenericResponse<null>>(
    `/notifications/devices/${deviceId}`
  );
}

/** Get notification preferences */
export function getNotificationPreferencesApi() {
  return request.get<GenericResponse<NotificationPreferences>>(
    "/notifications/preferences"
  );
}

/** Update notification preferences */
export function updateNotificationPreferencesApi(dto: UpdatePreferencesDto) {
  return request.patch<GenericResponse<NotificationPreferences>>(
    "/notifications/preferences",
    dto
  );
}
