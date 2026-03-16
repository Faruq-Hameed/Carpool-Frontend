import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProfilePictureApi,
  changePasscodeApi,
  verifyPasscodeApi,
  requestAccountDeletionApi,
} from "@/apis/auth";
import { ChangePasscodeDto, VerifyPasscodeDto } from "@/apis/auth/types";

const profileKeys = {
  me: () => ["user", "me"] as const,
};

export function useUpdateProfilePicture() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: FormData) => updateProfilePictureApi(file).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: profileKeys.me() }),
  });
}

export function useChangePasscode() {
  return useMutation({
    mutationFn: (dto: ChangePasscodeDto) => changePasscodeApi(dto).then((r) => r.data),
  });
}

export function useVerifyPasscode() {
  return useMutation({
    mutationFn: (dto: VerifyPasscodeDto) => verifyPasscodeApi(dto).then((r) => r.data),
  });
}

export function useRequestAccountDeletion() {
  return useMutation({
    mutationFn: () => requestAccountDeletionApi().then((r) => r.data),
  });
}
