import { useMutation } from '@tanstack/react-query';
import { loginUserApi } from '@/apis/auth';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequestPayload } from '@/apis/auth/types';
import { parseError } from '@/apis/errorParser';
import { AxiosApiError } from '@/apis/types';

export default function useLoginApi() {
  const { handleLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload:LoginRequestPayload) => {
      return loginUserApi(payload);
    },
    onSuccess: (res) => {
        console.log('Login successful:', res.data);
      handleLogin(res.data?.data);
    },
  });

  return {
    initiateLogin: mutation.mutate,
    data: mutation.data?.data?.data,
    status: mutation.status,
    error: mutation.error ? parseError(mutation.error as AxiosApiError) : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}