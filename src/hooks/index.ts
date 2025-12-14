// Add more as needed

import useGenerateResetPasscodeOtp from "@/screens/auth/hooks/useGenerateResetPasscodeOtp";
import useLoginApi from "@/screens/auth/hooks/useLoginApi";
import useSignUpApi from "@/screens/auth/hooks/useSignUpApi";
import useVerifyOtp from "@/hooks/useVerifyOtp";
import useResendOtp from "./useResendOtp";
import useUpdateNamesApi from "@/screens/verifications/hooks/useUpdateNames";
import useVerifyNinApi from "@/screens/verifications/hooks/useVerifyNin";
import useFaceVerification from "@/screens/verifications/hooks/useFaceVerification";

export const mutationRegistry = {
  signUp: useSignUpApi,
  login: useLoginApi,
  verifyOtp: useVerifyOtp, //verifyOtp to the registry
  generateResetPasscodeOtp: useGenerateResetPasscodeOtp,
  resendOtp: useResendOtp,
  updateNames: useUpdateNamesApi,
  verifyNin: useVerifyNinApi,
  faceVeriication: useFaceVerification
};
