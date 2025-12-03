import { useMutation } from "@tanstack/react-query";
import { generatePrivateOtpApi } from "@/apis/verifications";
import { VerifyOtpPurposes } from "@/screens/auth/constants";
import { generatePublicOtpApi } from "@/apis/auth";
type ResendOtpPayload = {
  email?: string;
  phoneNumber?: string;
  purpose: VerifyOtpPurposes;
  passcode?: string;
};

//ON RESENT OTP IS NOT FUNCTIONAL AT ALL YET

export default function useResendOtp() {
  const mutation = useMutation({
    mutationFn: async ({
      email,
      phoneNumber,
      purpose,
      passcode,
    }: ResendOtpPayload) => {
      switch (purpose) {
        // case VerifyOtpPurposes.VERIFY_EMAIL:

        case VerifyOtpPurposes.VERIFY_EMAIL: //on sign up
          return generatePublicOtpApi({
            email,
            purpose: VerifyOtpPurposes.VERIFY_EMAIL,
          });

        case VerifyOtpPurposes.RESET_EMAIL:
          //   if (!email) throw new Error("Email is required for email OTP");
          return generatePrivateOtpApi({
            email,
            purpose: VerifyOtpPurposes.RESET_EMAIL,
            passcode,
          });

        case VerifyOtpPurposes.VERIFY_PHONE:
          //   if (!phoneNumber) throw new Error("Phone number is required for phone OTP");
          return generatePrivateOtpApi({
            phoneNumber,
            purpose: VerifyOtpPurposes.VERIFY_PHONE,
          });

        case VerifyOtpPurposes.CHANGE_PHONE:
          return generatePrivateOtpApi({
            phoneNumber,
            purpose: VerifyOtpPurposes.CHANGE_PHONE,
            passcode,
          });

        case VerifyOtpPurposes.RESET_PASSCODE:
          return generatePrivateOtpApi({
            phoneNumber,
            purpose: VerifyOtpPurposes.RESET_PASSCODE,
            email,
          });

        default:
          throw new Error("Unsupported OTP purpose");
      }
    },
    onSuccess: (res) => {
    },
    onError: (err) => {
    },
  });

  return {
    resendOtp: mutation.mutate,
    isResending: mutation.isPending,
    message: mutation.data?.data?.message,
    error: mutation.error,
  };
}
