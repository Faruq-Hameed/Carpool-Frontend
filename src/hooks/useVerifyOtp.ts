import { useMutation } from "@tanstack/react-query";

import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { useAuth } from "@/hooks/useAuth";
import {
  verifyEmailApi,
  verifyPhoneApi,
  changeEmailApi,
  changePhoneApi,
  resetPasscodeApi,
} from "@/apis/auth";
import {
  changeEmailPayload,
  ResetPasscodePayload,
  VerifyEmailPayload,
  VerifyPhonePayload,
} from "@/apis/auth/types";
import { VerifyOtpPurposes } from "../screens/auth/constants";

/**useVerifyOtp is a custom hook that handles OTP verification
 * by calling different APIs based on the verification purpose.
 * On success, it either logs in the user or refreshes their data,
 * depending on the action taken.
 */
export default function useVerifyOtp() {
  const { handleLogin, refetchUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      purpose,
    }: {
      payload: VerifyEmailPayload | VerifyPhonePayload | ResetPasscodePayload;
      purpose: VerifyOtpPurposes;
    }) => {
      switch (purpose) {
        case VerifyOtpPurposes.VERIFY_EMAIL:
          return verifyEmailApi(payload as VerifyEmailPayload);
        case VerifyOtpPurposes.VERIFY_PHONE:
          return verifyPhoneApi(payload as VerifyPhonePayload);
        case VerifyOtpPurposes.RESET_EMAIL:
          return changeEmailApi(payload as changeEmailPayload);
        case VerifyOtpPurposes.CHANGE_PHONE:
          return changePhoneApi(payload as VerifyPhonePayload);
        case VerifyOtpPurposes.RESET_PASSCODE:
          const resetPayload = payload as ResetPasscodePayload;
          return resetPasscodeApi({
            phoneNumber: resetPayload.phoneNumber,
            otp: resetPayload.otp,
            email: resetPayload.email,
            passcode: resetPayload.passcode,
          });
        default:
          throw new Error("Invalid verification purpose");
      }
    },
    /**My on success handlers */
    onSuccess: (res, variables) => {
      const { purpose } = variables;
      switch (purpose) {
        case VerifyOtpPurposes.VERIFY_EMAIL:
          handleLogin(res.data?.data!); // login user after email verification
          return;
        case VerifyOtpPurposes.VERIFY_PHONE:
        case VerifyOtpPurposes.CHANGE_PHONE:
        case VerifyOtpPurposes.RESET_EMAIL:
          refetchUser();
          return;
      }
    },
    onError: (err) => {
      console.log("Error occurred during OTP verification:", err);
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
