// Add more as needed

import useGenerateResetPasscodeOtp from "@/screens/auth/hooks/useGenerateResetPasscodeOtp";
import useLoginApi from "@/screens/auth/hooks/useLoginApi";
import useSignUpApi from "@/screens/auth/hooks/useSignUpApi";
import useVerifyOtp from "@/hooks/useVerifyOtp";

export const mutationRegistry = {
  signUp: useSignUpApi,
  login: useLoginApi,
  verifyOtp: useVerifyOtp, //verifyOtp to the registry
  generateResetPasscodeOtp: useGenerateResetPasscodeOtp,
};
