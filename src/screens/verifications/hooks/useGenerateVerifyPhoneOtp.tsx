import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { VerifyOtpPurposes } from "@/screens/auth/constants";
import {
  GenerateVerifyPhoneOtpPayload,
} from "@/apis/verifications/types";
import { generateVerifyPhoneOtpApi  } from "@/apis/verifications";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";

/**Hook to generate otp to verify phone number*/
const useGenerateVerifyPhoneOtp = () => {
  const navigation = useVerificationNavigation();
  const [phoneNumber, setPhoneNumber] = useState("")
  const mutation = useMutation({
    mutationFn: async (value: string) => {
      setPhoneNumber(value)
      return generateVerifyPhoneOtpApi({
        phoneNumber, //i need the number to pass to the next screen
        purpose: VerifyOtpPurposes.VERIFY_PHONE
      });
    },
    onSuccess: (res) => {
      console.log("Otp created:", res.data);
      navigation.navigate("VerificationOtp", {
        phoneNumber,
        purpose: VerifyOtpPurposes.VERIFY_PHONE,
        message: res.data.message,
      });
    },
  });

  return {
    initiateApiCall: mutation.mutate,
    data: mutation.data?.data?.data,
    // status: mutation.status,
    error: mutation.error
      ? parseError(mutation.error as AxiosApiError)
      : undefined,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
};

export default useGenerateVerifyPhoneOtp;
