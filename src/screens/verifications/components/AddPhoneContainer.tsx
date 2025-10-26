import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from "@/components/texts";
import FormInput from "@/components/forms/formInput";
import GreenNavButton from "@/components/buttons/GreenButton";
import useGenerateVerifyPhoneOtp from "../hooks/useGenerateVerifyPhoneOtp";
import { isValidInput } from "@/validations/phoneEmailValidator";
import { ErrorToast } from "@/components/modals/ErrorToast";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { useAuth } from "@/hooks/useAuth";
//NEEDED TO HANDLE API ERROR AGAIN
interface Prop {
  errorMessage?: string;
  onError?: (error: string) => void;
}
/** Input field with button container */
const AddPhoneContainer: React.FC<Prop> = ({ errorMessage, onError }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { error, isLoading, initiateApiCall, reset } =
    useGenerateVerifyPhoneOtp();
  const [displayError, setDisplayError] = useState("");
  const inputError = isValidInput("phone", phoneNumber);
  return (
    <View style={styles.container}>
      <FormInput
        label={"Phone number"}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={11}
      />
      {error && <ErrorTexts message={error} />}
      <GreenNavButton
        title="Verify Phone number"
        onPress={() => {
          console.log("phone number before call : ", phoneNumber);
          //THE CALL NOT CALLING AS EXPECTED. BUT ERROR IS FROM THE API CALL HANLDER
          initiateApiCall(phoneNumber);
        }}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

export default AddPhoneContainer;
