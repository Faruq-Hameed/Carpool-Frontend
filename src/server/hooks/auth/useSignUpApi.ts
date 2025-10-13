import { useMutation } from "@tanstack/react-query";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { RegisterRequestPayload } from "@/server/apis/auth/types";
import { SignUpApi } from "@/server/apis/auth";

export default function useSignUpApi() {
  const mutation = useMutation({
    mutationFn: async (payload: RegisterRequestPayload) => {
      return SignUpApi(payload);
    },
    // onSuccess: (res) => {
    //     console.log('Login successful:', res.data);
    //     console.log({message: res.data.message})
    //   // handleLogin(res.data?.data);
    // },
    // onError: (err) => {
    //   console.log({err})
    // },
  });

  return {
    initiateSignUp: mutation.mutate,
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
