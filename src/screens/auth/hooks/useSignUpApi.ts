import { useMutation } from "@tanstack/react-query";
import { parseError } from "@/apis/errorParser";
import { SignUpApi } from "@/apis/auth";
import { RegisterRequestPayload } from "@/apis/auth/types";
import { AxiosApiError } from "@/apis/types";


export default function useSignUpApi() {
  const mutation = useMutation({
    mutationFn: async (payload: RegisterRequestPayload) => {
      return SignUpApi(payload);
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
