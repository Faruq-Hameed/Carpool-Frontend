import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Text } from "@rneui/themed";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/formInput";
import PassCodeInput from "../../components/PassCodeInput";
import ShowPassCheckBox from "../../components/ShowPassCheckBox";
import NavButton from "../../components/greenButton";
import UnderlineButton from "../../components/UnderLineBtn";

type Props = StackScreenProps<AuthStackParamList, "Login">;
const ForgetPassCodeScreen: React.FC<Props> = ({ navigation }) => {
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  return (
    <SafeAreaView>
      {/*upper container */}
      <View>
        <Text h1>Forgot Passcode</Text>
        <Text>
          Enter the phone number linked to your account to regain access
        </Text>
      </View>
      {/*lower container */}
      <View>
        <FormInput
          label="phonenumber"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <NavButton
          title="Send OTP"
          onPress={() => console.log("send otp pressed")}
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 100,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    borderStyle: "solid",
  },
  link: {
    color: "#4CAF50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 50,
  },
  numberCode: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
    borderLeftWidth: 1,
    height: "100%",
    borderLeftColor: "#ced4da",
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
  },
});
export default ForgetPassCodeScreen;
