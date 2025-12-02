import { useMutation } from "@tanstack/react-query";

import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { verifyNinApi } from "@/apis/verifications";
import { VerifyNinRequestPayload } from "@/apis/verifications/types";

export default function useVerifyNinApi() {
 const mutation = useMutation({
    mutationFn: async (payload: VerifyNinRequestPayload) => {
      return verifyNinApi(payload);
    },
  });

  return {
    initiateApiCall: mutation.mutate,
    data: mutation.data?.data?.data,
    // response: mutation.data,
    message: mutation.data?.data?.message,
    status: mutation.status,
    error: mutation.error
      ? parseError(mutation.error as AxiosApiError)
      : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}


