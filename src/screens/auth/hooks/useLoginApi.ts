import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "@/apis/auth";
import { useAuth } from "@/hooks/useAuth";
import { LoginRequestPayload } from "@/apis/auth/types";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { getUserKycStatusApi } from "@/apis/verifications";

// export default function useLoginApi() {
//   const { handleLogin } = useAuth();

//   const mutation = useMutation({
//     mutationFn: async (payload:LoginRequestPayload) => {
//       return loginUserApi(payload);
//     },
//     onSuccess: (res) => {
//       handleLogin(res.data?.data);
//     },
//   });

//   return {
//     initiateLogin: mutation.mutate,
//     data: mutation.data?.data?.data,
//     status: mutation.status,
//     error: mutation.error ? parseError(mutation.error as AxiosApiError) : undefined,
//     isLoading: mutation.isPending,
//     reset: mutation.reset,
//   };
// }

export default function useLoginApi() {
  const { handleLogin, setLoginStatus, setUserKycStatus } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload: LoginRequestPayload) => {
      const loginRes = await loginUserApi(payload);
      const authData = loginRes.data?.data;
      if (authData.token && authData.user) {
        console.log("Storing user and token");
        //store token in the context and storage first
        handleLogin(authData, false); // false means incomplete data for now
      }
      console.log("Fetching KYC status after login");
      // Chain KYC fetch //MORE API CALLS CAN BE CHAINED HERE IF NEEDED LATER WITH PROMISE.ALL
      const kycRes = await getUserKycStatusApi(authData.user.id);
      console.log("KYC status fetched");
      return {
        authData,
        kycData: kycRes.data.data,
      };
    },
    onSuccess: ({ authData, kycData }) => {
      console.log("Storing KYC data and marking login complete");
      setUserKycStatus(kycData); //store the kyc status
      setLoginStatus(true); //mark login complete after all data is got
    },
  });

  return {
    initiateLogin: mutation.mutate,
    data: mutation.data, // contains { authData, kycData }
    status: mutation.status,
    error: mutation.error
      ? parseError(mutation.error as AxiosApiError)
      : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}
