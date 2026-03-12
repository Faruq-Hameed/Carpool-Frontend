import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerDeviceApi,
  removeDeviceApi,
  getNotificationPreferencesApi,
  updateNotificationPreferencesApi,
} from "@/apis/notifications";
import { RegisterDeviceDto, UpdatePreferencesDto } from "@/apis/notifications/types";

export const notificationKeys = {
  preferences: () => ["notifications", "preferences"] as const,
};

export function useNotificationPreferences() {
  return useQuery({
    queryKey: notificationKeys.preferences(),
    queryFn: () => getNotificationPreferencesApi().then((r) => r.data.data),
  });
}

export function useRegisterDevice() {
  return useMutation({
    mutationFn: (dto: RegisterDeviceDto) => registerDeviceApi(dto).then((r) => r.data),
  });
}

export function useRemoveDevice() {
  return useMutation({
    mutationFn: (deviceId: string) => removeDeviceApi(deviceId).then((r) => r.data),
  });
}

export function useUpdateNotificationPreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdatePreferencesDto) =>
      updateNotificationPreferencesApi(dto).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.preferences() }),
  });
}
