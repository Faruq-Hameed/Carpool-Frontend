import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
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
import useVerifyOtp from "./hooks/useVerifyOtp";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { useAuthNavigation } from "@/hooks/useTypedNavigation";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import User from "@/models/User";

// type Props = StackScreenProps<AuthStackParamList, "EnterOTP">;
const EnterOTPScreen: React.FC<EnterOTPProps> = ({ route }) => {
  const {
    email,
    message: messageParam,
    purpose,
    phoneNumber,
    onContinue,
  } = route.params;
  const { setOtp, state } = useResetPasscode(); //this is needed for passcode reset
  const navigation = useAuthNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30); // timer for resend OTP button
  const [modalMessage, setModalMessage] = useState("");

  const { initiateApiCall, isLoading, error, data } = useMutationHandler<User>(
    "verifyOtp",
    (data, message) => {
      setModalMessage(message); //the api message
      console.log("Final message and date", { message, data });
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
  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={error} title="Verification Failed" top={40} />

      {modalVisible && (
        <ContinueModal
          title="Continue"
          message={modalMessage} // ✅ Dynamic message from mutation
          visible={modalVisible}
          onPress={() => {
            console.log("confirmed pressed");
            if (onContinue) { //THIS IS NOT EFFECTIVE WHEN I PASSED NAVIGATION, IT JUST HANDLE IT SELF INSTEAD
              onContinue();
            }
            setModalVisible(false);
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
        <FormInput
          label="Enter OTP"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={4}
        />
        <NavButton
          title="Verify"
          loading={isLoading}
          onPress={
            async () => {
              setModalVisible(true);
              await handleVerifyOtp(code);
            }
            // () => handleLogin("token12345") //API TO VERIFY NEEDED TO BE CALLED. ALSO AUTH TOKEN WILL BE RECEIVED
          }
          disabled={code && code.length === 4 ? false : true} // Disable button if input is not complete //LATER
        />
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
