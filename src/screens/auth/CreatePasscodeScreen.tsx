import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import PassCodeInput from "@/components/forms/PassCodeInput";
import ShowPassCheckBox from "@/components/forms/ShowPassCheckBox";
import ContinueModal from "@/components/modals/ContinueModal";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import { User } from "@/contexts/AuthContext";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { VerifyOtpApis } from "./constants";

type Props = StackScreenProps<AuthStackParamList, "CreatePasscode">;
const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const { state, setError, setOtp, setCompletionMessage } = useResetPasscode();
  const { phoneNumber, email, otp, completionMessage } = state;
  console.log("state in forgot screen : ", state);
  const { initiateApiCall, isLoading, error } = useMutationHandler<User>(
    "verifyOtp",
    (data, message) => {
      setCompletionMessage(message);
      // setModalMessage(message); //the api message
      // I can also navigate or do other things here maybe based on purpose
    }
  );
  /**simple validation function */
  const isValidInput = () => {
    console.log(
      " !!passCode && /^d{6,6}$/.test(passCode) : ",
      !!passCode && /^\d{6,6}$/.test(passCode)
    );
    return !!passCode && /^\d{6,6}$/.test(passCode);
  };

  /**Submit handler */
  const handleSubmit = () => {
    if (!isValidInput()) {
      setError("Passcode must be 6 digits numbers");
      return;
    }
    initiateApiCall({
      // payload: {
      //   email: email ?? null,
      //   phoneNumber: phoneNumber ?? null,
      //   otp,
      //   passCode,
      // },
      payload: { ...state },
      purpose: VerifyOtpApis.RESET_PASSCODE,
    });
  };
  // State variables for passcode visibility
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);

  return (
    <SafeAreaView>
      {/*upper container */}
      <UpperTextsFrame header="Create new passcode" />
      {/*lower container */}
      <View>
        {completionMessage && (
          <ContinueModal
            title="Continue"
            message={completionMessage} // ✅ Dynamic message from mutation
            visible={!!completionMessage} //visible once we have completion message
            onPress={() => {
              console.log("confirmed pressed");
              // setModalVisible(false);
              navigation.navigate("Login");
              // navigation.reset("")
            }}
          />
        )}
        <PassCodeInput
          label="create 6 digit passcode"
          genericPlaceholder="Create your 6 digit passcode"
          value={passCode}
          onChangeText={setPassCode}
          hidePassCode={hidePasscode} //show password state
        />
        <ShowPassCheckBox
          checked={hidePasscode}
          onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
        />
        {/* <FormInput
          label="phonenumber"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        /> */}
        <NavButton
          title="Confirm new passcode"
          loading={isLoading}
          disabled={!isValidInput()}
          onPress={() => {
            console.log("handlesubmit pressed");
            // setCompletionMessage("Passcode reset successfully. Kindly login");
            handleSubmit();
            // navigation.navigate("MainScreen");
          }}
        />
        {error && <ErrorTexts message={error} style={styles.errorStyle} />}
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  errorStyle: {
    top: -20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
export default ForgotPasscodeScreen;
