import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import Spacer from "@/components/others/Spacer";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import { EnterOTPProps } from "@/helpers/enterOtpProp";
import ContinueModal from "@/components/modals/ContinueModal";
import useVerifyEmailApi from "./hooks/useVerifyEmail";
import { VerifyOtpPurposes } from "./constants";
import { ErrorToast } from "@/components/modals/ErrorToast";
import useVerifyOtp from "../../hooks/useVerifyOtp";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import {
  useAuthNavigation,
  useVerificationNavigation,
} from "@/hooks/useTypedNavigation";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import User from "@/models/User";
import useResendOtp from "@/hooks/useResendOtp";
import ResendOtp from "@/components/buttons/ResentOtp";
import { parseError } from "@/apis/errorParser";
import { useMutation } from "@tanstack/react-query";
import { generatePrivateOtpApi } from "@/apis/verifications";
import { generatePublicOtpApi } from "@/apis/auth";
import Text from "@/components/texts";
import OtpBoxInput from "@/components/forms/OtpBoxInput";

// type Props = StackScreenProps<AuthStackParamList, "EnterOTP">;
const EnterOTPScreen: React.FC<EnterOTPProps> = ({ route }) => {
  const { setOtp, state } = useResetPasscode(); //this is needed for passcode reset

  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30); // timer for resend OTP button
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigation = useAuthNavigation();
  const verificationNavigation = useVerificationNavigation();
  const {
    email,
    message: messageParam,
    purpose,
    passcode,
    phoneNumber,
  } = route.params;

  const { initiateApiCall, isLoading, error, data } = useMutationHandler<User>(
    "verifyOtp",
    (data, message) => {
      setModalMessage(message); //the api message
      setModalVisible(true);
      // I can also navigate or do other things here maybe based on purpose
    }
  );
  const handleVerifyOtp = async (otp: string) => {
    /** api is not called from here if it the otp is for reset passcode*/
    if (purpose === VerifyOtpPurposes.RESET_PASSCODE) {
      setOtp(otp);
      navigation.navigate("CreatePasscode");
    } else
      initiateApiCall({
        payload: { email: email, phoneNumber, otp },
        purpose,
      });
    // setModalVisible(true);
  };


  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: async () => {
      switch (purpose) {
        case VerifyOtpPurposes.VERIFY_PHONE:
        case VerifyOtpPurposes.CHANGE_PHONE:
          return generatePrivateOtpApi({ phoneNumber, purpose, passcode });
        case VerifyOtpPurposes.VERIFY_EMAIL:
          return generatePublicOtpApi({ email, phoneNumber, purpose });

        case VerifyOtpPurposes.RESET_EMAIL:
          return generatePrivateOtpApi({ email, purpose, passcode });
        case VerifyOtpPurposes.RESET_PASSCODE:
          return generatePublicOtpApi({ email, phoneNumber, purpose });
        default:
          throw new Error("Unsupported purpose for resend OTP");
      }
    },
    onSuccess: (res) => {
      setModalMessage(res.data.message || "OTP resent successfully!");
      // setModalVisible(true);
      setTimer(30);
      setIsError(false);
    },
    onError: (err) => {
      setModalMessage(err.message);
      setIsError(true);
      // setModalVisible(true);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={error} title="Verification Failed" top={40} />

      {!error && modalVisible && (
        <ContinueModal
          title="Continue"
          message={modalMessage} // ✅ Dynamic message from mutation
          visible={modalVisible}
          onPress={() => {
            // if (onContinue) {
            //   onContinue();
            //   setModalVisible(false);
            // }
            console.log(purpose);

            switch (purpose) {
              case VerifyOtpPurposes.VERIFY_PHONE:
                verificationNavigation.goBack(); // this will take me to the contact info screen
                setModalVisible(false);
                break;

              case VerifyOtpPurposes.CHANGE_PHONE:
              case VerifyOtpPurposes.RESET_EMAIL:
                verificationNavigation.pop(2); // this will take me to the contact info screen
                setModalVisible(false);
                break;

              default:

              setModalVisible(false);
            }
          }}
        />
      )}
      <UpperTextsFrame
        header="Enter code"
        normalText={messageParam} //API MESSAGE WILL BE USED
      />
      <Spacer />
      {/* OTP input container */}
      <View>
        <OtpBoxInput length={4} value={code} onChange={setCode} />
        {/* <FormInput
          label="Enter OTP"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={4}
        /> */}
        <NavButton
          title="Verify"
          loading={isLoading}
          onPress={async () => {
            setModalVisible(true);
            await handleVerifyOtp(code);
          }}
          disabled={code && code.length === 4 ? false : true} // Disable button if input is not complete //LATER
        />
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <TouchableOpacity
            disabled={timer > 0 || isResending}
            onPress={() => resendOtp()}
            style={{ opacity: timer > 0 ? 0.5 : 1 }}
          >
            <Text style={{ color: "#1B5E20", fontWeight: "bold" }}>
              {isResending
                ? "Sending..."
                : timer > 0
                ? `Resend OTP in ${timer}s`
                : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getResponsiveWidth(),
    alignItems: "center",
  },
});

export default EnterOTPScreen;
