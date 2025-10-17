import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import UnderlineButton from "@/components/buttons/UnderLineBtn";
import { ErrorToast } from "@/components/modals/ErrorToast";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import { VerifyOtpApis } from "./constants";


type Props = StackScreenProps<AuthStackParamList, "ForgotPasscode">;

const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    state,
    setPhoneNumber,
    setEmail,
    switchToEmail,
    switchToPhone,
    setError,
  } = useResetPasscode();
  const { phoneNumber, email, useEmailInstead,error } = state;

  /**simple validation function */
  const isValidInput = () => {
    if (useEmailInstead) {
      return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    } else {
      return !!phoneNumber && /^\d{11,11}$/.test(phoneNumber);
    }
  };

  /**Submit handler */
  const handleSubmit = () => {
    if (!isValidInput()) {
      setError(
        "Please enter a valid " +
          (useEmailInstead ? "email address" : "phone number")
      );
      return;
    }

    initiateApiCall({
      email: email ?? null,
      phoneNumber: phoneNumber ?? null,
    });
  };

  const { initiateApiCall, isLoading, error: apiError, message, data } =
    useMutationHandler<null>(
      "generateResetPasscodeOtp", // mutation key for requesting forgot passcode OTP
      (data, message) => {
        console.log("in forgot scree on success",{state });
        navigation.navigate("EnterOTP", {
          message,
          email: email ? email : undefined,
          phoneNumber: phoneNumber ? phoneNumber : undefined,
          purpose: VerifyOtpApis.RESET_PASSCODE,
        });
      }
    );

  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={apiError} title="Action Failed" top={50} />

      <UpperTextsFrame
        header="Forgot Passcode"
        normalText={
          useEmailInstead
            ? "Enter the email linked to your account to regain access"
            : "Enter the phone number linked to your account to regain access"
        }
      />

      <View key={useEmailInstead ? "email" : "phone"}>
        {!useEmailInstead ? (
          <FormInput
            label="Phone number"
            keyboardType="numeric"
            value={phoneNumber ?? ""}
            maxLength={11}
            onChangeText={(texts) => {
              setPhoneNumber(texts);
            }}
          />
        ) : (
          <FormInput
            label="Email address"
            keyboardType="email-address"
            value={email ?? ""}
            onChangeText={(texts) => {
              setEmail(texts);
            }}
          />
        )}
        {error && <ErrorTexts message={error} style={styles.errorStyle} />}

        <NavButton
          title="Send OTP"
          onPress={handleSubmit}
          disabled={!isValidInput()}
          loading={isLoading}
        />
        <UnderlineButton
          title={
            !useEmailInstead ? "Use email instead" : "Use phone number instead"
          }
          onPress={() => {
            useEmailInstead ? switchToPhone() : switchToEmail();
          }}

          // onPress={() => setUseEmailInstead(!useEmailInstead)}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  errorStyle: {
    top: -20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
export default ForgotPasscodeScreen;
