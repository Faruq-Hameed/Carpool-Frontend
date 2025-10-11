import { useMutation } from '@tanstack/react-query';
import { loginUserApi } from '@/apis/auth';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequestPayload } from '@/apis/auth/types';

export default function useLoginApi() {
  const { handleLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload:LoginRequestPayload) => {
      return loginUserApi(payload);
    },
    onSuccess: (res) => {
      handleLogin(res.data?.data);
    },
  });

  return {
    loginUser: mutation.mutate,
    data: mutation.data?.data?.data,
    status: mutation.status,
    error: mutation.error,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}