// Add more as needed

import useGenerateResetPasscodeOtp from "@/screens/auth/hooks/useGenerateResetPasscodeOtp";
import useLoginApi from "@/screens/auth/hooks/useLoginApi";
import useSignUpApi from "@/screens/auth/hooks/useSignUpApi";
import useVerifyOtp from "@/hooks/useVerifyOtp";
import useResendOtp from "./useResendOtp";

export const mutationRegistry = {
  signUp: useSignUpApi,
  login: useLoginApi,
  verifyOtp: useVerifyOtp, //verifyOtp to the registry
  generateResetPasscodeOtp: useGenerateResetPasscodeOtp,
  resendOtp: useResendOtp,
};
