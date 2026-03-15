import { useMutation } from "@tanstack/react-query";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { uploadSelfieApi } from "@/apis/verifications";

export default function useFaceVerification() {
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return uploadSelfieApi(formData);
    },
  });

  return {
    initiateApiCall: mutation.mutate,
    data: mutation.data?.data?.data,
    message: mutation.data?.data?.message,
    status: mutation.status,
    error: mutation.error
      ? parseError(mutation.error as AxiosApiError)
      : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}
