import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Text } from "@rneui/themed";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/greenButton";
import UpperTextsFrame from "../../components/upperTextsFrame";

type Props = StackScreenProps<AuthStackParamList, "ForgotPasscode">;
const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
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
        <NavButton
          title="Send OTP"
          onPress={() =>
            navigation.navigate("EnterOTP", { phonenumber: phoneNumber })
          } // Pass the phone number to EnterOTPScreen
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
export default ForgotPasscodeScreen;
