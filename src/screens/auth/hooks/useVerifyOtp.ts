import { useMutation } from "@tanstack/react-query";

// import { verifyEmailApi, verifyPhoneApi, changeEmailApi, changePhoneApi } from "@/api/otpApis";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { useAuth } from "@/hooks/useAuth";
import {
  verifyEmailApi,
  verifyPhoneApi,
  changeEmailApi,
  changePhoneApi,
  generateResetPasscodeOtpApi,
  resetPasscodeApi,
} from "@/apis/auth";
import {
  GenerateResetPasscodeOtpPayload,
  ResetPasscodePayload,
  VerifyEmailPayload,
  VerifyPhonePayload,
} from "@/apis/auth/types";
import { VerifyOtpPurposes } from "../constants";

export default function useVerifyOtp() {
  const { handleLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      purpose,
    }: {
      payload: VerifyEmailPayload | VerifyPhonePayload | ResetPasscodePayload;
      purpose: VerifyOtpPurposes;
    }) => {
      console.log("mutant hitted");
      switch (purpose) {
        case VerifyOtpPurposes.VERIFY_EMAIL:
          return verifyEmailApi(payload as VerifyEmailPayload);
        case VerifyOtpPurposes.VERIFY_PHONE:
          return verifyPhoneApi(payload as VerifyPhonePayload);
        case VerifyOtpPurposes.CHANGE_EMAIL:
          return changeEmailApi(payload as VerifyEmailPayload);
        case VerifyOtpPurposes.CHANGE_PHONE:
          return changePhoneApi(payload as VerifyPhonePayload);
        case VerifyOtpPurposes.RESET_PASSCODE:
          const resetPayload = payload as ResetPasscodePayload;
          console.log({ resetPayload });
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
    onSuccess: (res, variables) => {
      const { purpose } = variables;
      if (purpose === VerifyOtpPurposes.VERIFY_EMAIL) {
        console.log("Email verified successfully");
        handleLogin(res.data?.data!); // login user after email verification
      }
      console.log("OTP verification successful:", res.data);
    },
    onError: (err) => {
      // handleLogin({
      //   token: "token",
      //   user: {
      //     firstName: "John",
      //     lastName: "Doe",
      //     email: "email@m.com",
      //     id: "1",
      //     middleName: "middleName",
      //     phoneNumber: "phoneNumber",
      //     phoneStatus: "UNVERIFIED",
      //     emailStatus: "VERIFIED",
      //     createdAt: "string", // ISO date string
      //   },
      // }); // login user after email verification

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
