// Add more as needed

import useLoginApi from "@/screens/auth/hooks/useLoginApi copy";
import useSignUpApi from "@/screens/auth/hooks/useSignUpApi";
import useVerifyOtp from "@/screens/auth/hooks/useVerifyOtp";

export const mutationRegistry = {
  signUp: useSignUpApi,
  login: useLoginApi,
  verifyOtp: useVerifyOtp, //verifyOtp to the registry
};
