import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import PassCodeInput from "@/components/forms/PassCodeInput";
import ShowPassCheckBox from "@/components/forms/ShowPassCheckBox";

type Props = StackScreenProps<AuthStackParamList, "CreatePasscode">;
const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  // State variables for input fields
  // State variables for input fields
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  return (
    <SafeAreaView>
      {/*upper container */}
      <UpperTextsFrame header="Create new passcode" />
      {/*lower container */}
      <View>
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
        <FormInput
          label="phonenumber"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <NavButton
          title="Confirm new passcode"
          onPress={() => navigation.navigate("MainScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({});
export default ForgotPasscodeScreen;
