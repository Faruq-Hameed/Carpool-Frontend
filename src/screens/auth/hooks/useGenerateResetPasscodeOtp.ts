import { useMutation } from "@tanstack/react-query";
import { generatePublicOtpApi, loginUserApi } from "@/apis/auth";
import { useAuth } from "@/hooks/useAuth";
import {
  GeneratePublicOtpPayload,
  LoginRequestPayload,
} from "@/apis/auth/types";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { useNavigation } from "@react-navigation/native";
import { VerifyOtpPurposes } from "../constants";

export default function useGenerateResetPasscodeOtp() {
  const mutation = useMutation({
    mutationFn: async (payload: GeneratePublicOtpPayload) => {
      console.log({ payload });
      return generatePublicOtpApi({
        ...payload,
        purpose: VerifyOtpPurposes.RESET_PASSCODE,
      });
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
