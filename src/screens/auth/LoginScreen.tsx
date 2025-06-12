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
import UpperTextsFrame from "../../components/upperTextsFrame";
import PassCodeUtils from "../../components/passcodeUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<AuthStackParamList, "Login">;
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);
  const handleLogin = async () => {
    const apiUrl = "https://1461-102-88-70-158.ngrok-free.app/api/users/otp/";

    try {
      const response = await axios.post(apiUrl, {
        phonenumber: phoneNumber,
      });
      // Alert.alert("Success", response.data.message);
      // Navigate to Verify Account screen
      navigation.navigate("VerifyAccount");
    } catch (error) {
      // Handle any network or unexpected errors
      //   error.response
      //     ? Alert.alert("Error", error.response.data.message)
      //     : error.message;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*upper container */}
      <UpperTextsFrame
        header="Welcome Back"
        normalText="Enter your details to login"
      />
      {/*lower container */}
      <View>
        {/**Form inputs container */}
        <View>
          <FormInput
            label="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          {/* <PassCodeInput
            value={passCode}
            onChangeText={setPassCode}
            hidePassCode={hidePasscode} //show password state
          /> */}
          {/*password show and forget password*/}
          <PassCodeUtils
          label="passcode"
            setPassCode={setPassCode}
            setHidePasscode={setHidePasscode} //show password state
          />
        </View>
        {/* Button container */}
        <View>
          <NavButton
            title="Login"
            onPress={() =>{
              //TEMP SET THE TOKEN TO STORAGE
              AsyncStorage.setItem("userToken", "tOKEN12345");
              console.log("Login button pressed");
              //  navigation.navigate("MainScreen")
              }} //api to be called here too
          />
          <UnderlineButton
            title="create an account"
            onPress={() => navigation.navigate("SignUp")}
          />
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    // paddingVertical: 100,
    // backgroundColor: "#fff",
  paddingHorizontal: 16,
  }
});
export default LoginScreen;
