import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import Spacer from "@/components/Spacer";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import { EnterOTPProps } from "@/helpers/enterOtpProp";
import ContinueModal from "@/components/modals/ContinueModal";
import useVerifyEmailApi from "./hooks/useVerifyEmail";
import { VerifyOtpApis } from "./constants";
import { ErrorToast } from "@/components/modals/ErrorToast";
import useVerifyOtp from "./hooks/useVerifyOtp";
import { User } from "@/contexts/AuthContext";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { useAuthNavigation } from "@/hooks/useTypedNavigation";
import { useResetPasscode } from "@/hooks/useResetPasscode";

// type Props = StackScreenProps<AuthStackParamList, "EnterOTP">;
const EnterOTPScreen: React.FC<EnterOTPProps> = ({ route }) => {
  const { email, message: messageParam, purpose, phoneNumber } = route.params;
    const { setOtp,state  } = useResetPasscode(); //this is needed for passcode reset
  console.log("state in enter otp: ", state )
  const navigation = useAuthNavigation();
  // const {
  //   isLoading,
  //   error,
  //   data,
  //   initiateApiCall,
  //   message: successMessage,
  // } = useVerifyOtp();
  //HAVING ISSUE MAKING THIS DYNAMIC FOR PARAMS

  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30); // timer for resend OTP button
  const [modalMessage, setModalMessage] = useState("");

  const { initiateApiCall, isLoading, error } = useMutationHandler<User>(
    "verifyOtp",
    (data, message) => {
      setModalMessage(message); //the api message
      setModalVisible(true);
      // I can also navigate or do other things here maybe based on purpose
    }
  );
  const handleVerifyOtp = async (otp: string) => {
    /** api is not called from here if it the otp is for reset passcode*/
    if (purpose === VerifyOtpApis.RESET_PASSCODE) {
      setOtp(otp)
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
      <ErrorToast message={error} title="Verification Failed" />

      {/* {modalVisible && (
        <ContinueModal
          title="Continue"
          message={"modalMessage modalMessage modalMessage "} // ✅ Dynamic message from mutation
          visible={modalVisible}
          onPress={() => {
            console.log("confirmed pressed");
            setModalVisible(false);
          }}
        />
      )} */}
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
