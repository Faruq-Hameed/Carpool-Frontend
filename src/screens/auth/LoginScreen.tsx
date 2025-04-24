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
    <SafeAreaView>
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
            label="phonenumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <PassCodeInput
            value={passCode}
            onChangeText={setPassCode}
            hidePassCode={hidePasscode} //show password state
          />
          {/*password show and forget password*/}
          <PassCodeUtils
            setPassCode={setPassCode}
            setHidePasscode={setHidePasscode} //show password state
          />
        </View>
        {/* Button container */}
        <View>
          <NavButton
            title="Login"
            onPress={() => navigation.navigate("MainScreen")} //api to be called here too
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
export default LoginScreen;
