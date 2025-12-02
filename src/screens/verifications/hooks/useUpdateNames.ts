import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { updateUserNamesApi } from "@/apis/verifications";
import { UpdateNamesRequestPayload } from "@/apis/verifications/types";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateNamesApi() {
  const {  saveUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload:UpdateNamesRequestPayload) => {
      return updateUserNamesApi(payload);
    },
    onSuccess: (res) => {
      saveUser(res.data?.data);
    },
     onError: (err) => {
        console.log('error occurred in update name',{err})
    },
  });

  return {
    initiateApiCall: mutation.mutate,
    data: mutation.data?.data?.data,
    message: mutation.data?.data?.message,
    status: mutation.status,
    error: mutation.error ? parseError(mutation.error as AxiosApiError) : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}