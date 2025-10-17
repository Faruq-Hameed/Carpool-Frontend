import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import PassCodeInput from "@/components/forms/PassCodeInput";
import ShowPassCheckBox from "@/components/forms/ShowPassCheckBox";
import ContinueModal from "@/components/modals/ContinueModal";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import { User } from "@/contexts/AuthContext";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { VerifyOtpApis } from "./constants";
import { ErrorToast } from "@/components/modals/ErrorToast";

type Props = StackScreenProps<AuthStackParamList, "CreatePasscode">;
const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const { state, setError, setCompletionMessage, setPasscode } =
    useResetPasscode();
  const { completionMessage, passcode, error : stateError } = state;
  // State variables for passcode visibility
  const [hidePasscode, setHidePasscode] = useState(true);

  const { initiateApiCall, isLoading, error } = useMutationHandler<User>(
    "verifyOtp",
    (data, message) => {
      //on api call success callback
      setCompletionMessage(message);
      // setModalMessage(message); //the api message
      // I can also navigate or do other things here maybe based on purpose
    }
  );
  /**simple validation function */
  const isValidInput = () => {
    return !!passcode && /^\d{6,6}$/.test(passcode);
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

  return (
    <SafeAreaView style={styles.container}>
      {/*upper container */}
      <UpperTextsFrame header="Create new passcode" />

      {/*lower container */}
      <View>
      <ErrorToast message={error|| stateError} />

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
          value={passcode}
          onChangeText={setPasscode}
          hidePassCode={hidePasscode} //show password state
        />
        <ShowPassCheckBox
          checked={hidePasscode}
          onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
        />
       
        <NavButton
          title="Confirm new passcode"
          loading={isLoading}
          disabled={!isValidInput()}
          onPress={() => {
            // setCompletionMessage("Passcode reset successfully. Kindly login");
            handleSubmit();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  errorStyle: {
    top: -20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
export default ForgotPasscodeScreen;
