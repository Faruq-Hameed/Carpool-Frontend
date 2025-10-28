import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { VerifyOtpPurposes } from "@/screens/auth/constants";
import { GeneratePrivateOtpPayload } from "@/apis/verifications/types";
import { generatePrivateOtpApi } from "@/apis/verifications";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";

/**Hook to generate otp to verify phone number*/
const useGenerateChangeEmailOtp = () => {
  const [payload, setPayload] = useState<GeneratePrivateOtpPayload>({
    email: "",
    purpose : VerifyOtpPurposes.RESET_EMAIL,
    passcode: ""
  })

  const navigation = useVerificationNavigation();

  const mutation = useMutation({
    mutationFn: async (values: GeneratePrivateOtpPayload) => {

      setPayload(values)
      return generatePrivateOtpApi({
        ...values,
      });
    },
    onSuccess: (res) => {
      console.log("Otp created:", res.data);
      navigation.navigate("VerificationOtp", {
        ...payload, //this will also be useful for resend otp
        message: res.data.message,
      
      });
    },
    onError: (err)=>{
      console.log("unable to call api ", {err})
    }
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

export default useGenerateChangeEmailOtp;
