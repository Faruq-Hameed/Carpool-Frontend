import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Text } from "@rneui/themed";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { useAuth } from "@/hooks/useAuth";
import ErrorTexts from "@/components/texts/ErrorTexts";

type Props = StackScreenProps<AuthStackParamList, "ForgotPasscode">;
const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const { handleLogin } = useAuth();
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [inputError, setInputError] = useState("");
  const isValid = /^\d{11}$/.test(phoneNumber); // updates as user types

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setInputError("Phone number is required");
      return;
    }

    if (!/^\d{11}$/.test(phoneNumber)) {
      setInputError("Phone number must be 11 digits");
      return;
    }

    setInputError("");
    //call api for my otp creation for forget password
    navigation.navigate("EnterOTP", {
      // Pass the phone number to EnterOTPScreen
      phonenumber: phoneNumber,
      onVerify: () => handleLogin("token12345"),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*upper container */}
      <UpperTextsFrame
        header="Forgot Passcode"
        normalText="Enter the phone number linked to your account to regain access"
      />
      {/*lower container */}
      <View>
        <FormInput
          label="Phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {/* show text if input is not valid and user has typed something */}
        {!isValid && phoneNumber.length > 0 && (
          <ErrorTexts
            message="Please type in valid phone number"
            style={styles.errorStyle}
          />
        )}
        <NavButton
          title="Send OTP"
          onPress={() => {
            //call api for my otp creation for forget password
            navigation.navigate("EnterOTP", {
              // Pass the phone number to EnterOTPScreen
              phonenumber: phoneNumber,
              onVerify: () => handleLogin("token12345"),
            });
          }}
          disabled={!isValid}
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
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
