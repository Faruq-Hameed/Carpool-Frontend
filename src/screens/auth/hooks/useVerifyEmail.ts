import { useMutation } from '@tanstack/react-query';
import { loginUserApi, verifyEmailApi } from '@/apis/auth';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequestPayload, VerifyEmailPayload } from '@/apis/auth/types';
import { parseError } from '@/apis/errorParser';
import { AxiosApiError } from '@/apis/types';

export default function useVerifyEmailApi() {
  const { handleLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload:VerifyEmailPayload) => {
      return verifyEmailApi(payload);
    },
    onSuccess: (res) => {
        console.log('Otp verify successful:', res.data);
      handleLogin(res.data?.data);
    },
     onError: (err) => {
        // console.log('Login successful:', res.data);
        console.log('error occurred in otp verify ',{err})
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