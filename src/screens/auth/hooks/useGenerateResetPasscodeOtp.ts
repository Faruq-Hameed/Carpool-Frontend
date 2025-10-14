import { useMutation } from "@tanstack/react-query";
import { generateResetPasscodeOtpApi, loginUserApi } from "@/apis/auth";
import { useAuth } from "@/hooks/useAuth";
import {
  GenerateResetPasscodeOtpPayload,
  LoginRequestPayload,
} from "@/apis/auth/types";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { useNavigation } from "@react-navigation/native";

export default function useGenerateResetPasscodeOtp() {
  const mutation = useMutation({
    mutationFn: async (payload: GenerateResetPasscodeOtpPayload) => {
      return generateResetPasscodeOtpApi(payload);
    },
    onSuccess: (res) => {
      // navigation.navigate()
      console.log("use forgot passcode api otp created", res.data);
      // handleLogin(res.data?.data);
    },
    onError: (err) => {
      console.log("error :", err);
    },
  });

  return {
    initiateApiCall: mutation.mutate,
    message: mutation.data?.data?.message,
    data: mutation.data?.data?.data,
    status: mutation.status,
    error: mutation.error
      ? parseError(mutation.error as AxiosApiError)
      : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}
