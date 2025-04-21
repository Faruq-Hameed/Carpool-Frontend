import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { Text, Button } from "@rneui/themed";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/formInput";
import PassCodeInput from "../../components/PassCodeInput";
import ShowPassCheckBox from "../../components/ShowPassCheckBox";
import NavButton from "../../components/greenButton";
import UnderlineButton from "../../components/UnderLineBtn";
import UpperTextsFrame from "../../components/upperTextsFrame";

type Props = StackScreenProps<AuthStackParamList, "SignUp">;
const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [passCode, setPassCode] = useState<string>("");
  const [hidePasscode, setHidePasscode] = useState(true);

  // Handle sign up button press
  const handleSignUp = async () => {
    // API endpoint for sign up
    const apiUrl = "https://4e9c-102-219-53-33.ngrok-free.app/api/users/";

    // Request body for the API call
    const requestBody = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phonenumber: phoneNumber,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*upper container. i.e create account*/}
      <UpperTextsFrame
        header="Create your account"
        normalText="Enter your details to create your account"
      />
      {/* middle container */}
      <View>
        {/*Input form container */}
        <View>
          <FormInput
            label="Surname"
            value={lastName}
            onChangeText={setLastName}
          />
          <FormInput
            label="surname"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FormInput
            label="phonenumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
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
        </View>
        {/* Button container */}
        <View>
          <NavButton
            title="create account"
            onPress={() => navigation.navigate("SignUp")}
          />
          <UnderlineButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
      <Text>
        Creating an account with us means you agree with our
        <UnderlineButton
          title="Terms of use"
          bold={false}
          onPress={() => console.log("Terms of use pressed")}
        />
        <UnderlineButton
          title="Privacy policy"
          bold={false}
          onPress={() => console.log("Privacy policy pressed")}
        />
      </Text>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    color: "#4CAF50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "column",
    height: 70,
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
  },
});

export default SignUpScreen;
