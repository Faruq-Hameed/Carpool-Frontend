import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/upperTextsFrame";
import { useNavigation } from "@react-navigation/native";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import { Input } from "@rneui/themed";
import UnderlineButton from "../../components/UnderLineBtn";
import Spacer from "../../components/Spacer";

type Props = StackScreenProps<AuthStackParamList, "EnterOTP">;
const EnterOTPScreen: React.FC<Props> = ({ route }) => {
  const navigation = useTypedNavigation();
  let { phonenumber } = route.params;
  const [code, setCode] = useState(["_", "_", "_", "_"]);
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [timer, setTimer] = useState(30); // timer for resend OTP button

  //turn the number turn the next 4 digit after first 5 digits to *
  phonenumber = phonenumber.replace(/^(.{5})(.{4})/, "$1****");
  /** function that runs every time the user types or deletes a character. */
  const handleChangeText = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 4); //remove non-numeric and trim to 4 digits
    const newCode = Array(4).fill("_");
    for (let i = 0; i < digits.length; i++) {
      newCode[i] = digits[i];
    }
    setCode(newCode);
    setIsInputComplete(!newCode.includes("_")); //this will be true if all 4 digits are filled
  };
  //set resend otp interval if is greater than 0
  setInterval(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  }, 1000);
  return (
    <SafeAreaView>
      <UpperTextsFrame
        header="Enter code"
        normalText={`A 4 digit OTP was sent to ${phonenumber} to verify your phone number`}
      />
      <Spacer />
      {/* OTP input container */}
      <View>
        <Input
          keyboardType="numeric"
          value={code.join()}
          onChangeText={(text) => {
            handleChangeText(text);
            if (isInputComplete) {
              console.log("code is complete");
            }
          }}
          maxLength={4}
        />
        {/* resend otp container */}
        <View>
          <Text>
            Didn’t receive code?
            {/* if the timer is greater than 0, don't show resend otp option */}
            {timer <= 0 ? (
              <UnderlineButton
                title="Resend OTP"
                onPress={() => {
                  // Call the API to resend OTP 
                  setTimer(30); // reset timer to 30 seconds. After success response from API
                  //also a loading state should be added a
                  console.log("resend otp pressed");
                }}
              />
            ) : null}
          </Text>
          <Text>{timer}s</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EnterOTPScreen;
