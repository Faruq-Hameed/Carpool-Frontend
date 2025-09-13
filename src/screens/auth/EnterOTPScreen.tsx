import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";
import { useNavigation } from "@react-navigation/native";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import { Input } from "@rneui/themed";
import UnderlineButton from "../../components/buttons/UnderLineBtn";
import Spacer from "../../components/Spacer";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/greenButton";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";

type Props = StackScreenProps<AuthStackParamList, "EnterOTP">;
const EnterOTPScreen: React.FC<Props> = ({ route }) => {
  const navigation = useTypedNavigation();
  let { phonenumber } = route.params;
  const [code, setCode] = useState("");
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [timer, setTimer] = useState(30); // timer for resend OTP button

  //turn the number turn the next 4 digit after first 5 digits to *
  phonenumber = phonenumber.replace(/^(.{5})(.{4})/, "$1****");
  const handleChangeText = (text: string) => {
    console.log("text", text);
    setCode(text);
      console.log("code length: ", code.length);

    if (code.length === 4) { //NOT WORKING AS EXPECTED
      setIsInputComplete(true); // to be done later
    }
  };
  useEffect(() => {
    handleChangeText(code);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <UpperTextsFrame
        header="Enter code"
        normalText={`A 4 digit OTP was sent to ${phonenumber} to verify your phone number`}
      />
      <Spacer />
      {/* OTP input container */}
      <View>
        <FormInput
          label="Enter OTP"
          value={code}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          maxLength={4}
        />
        <NavButton
          title="Verify"
          onPress={() => navigation.navigate("MainScreen")} //API TO VERIFY NEEDED TO BE CALLED. ALSO AUTH TOKEN WILL BE RECEIVED
          disabled={!isInputComplete} // Disable button if input is not complete //LATER
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
