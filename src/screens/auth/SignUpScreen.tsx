import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { Text, Button } from "@rneui/themed";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/forms/formInput";
import PassCodeInput from "../../components/forms/PassCodeInput";
import ShowPassCheckBox from "../../components/forms/ShowPassCheckBox";
import NavButton from "../../components/buttons/greenButton";
import UnderlineButton from "../../components/buttons/UnderLineBtn";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";

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
      <ScrollView>
        {/*upper container. i.e create account*/}
        <UpperTextsFrame
          header="Create your account"
          normalText="Enter your details to create your account"
        />
        {/* middle container */}
        <View style={styles.middleContainer}>
          {/*Input form container */}
          <View>
            <FormInput
              label="Surname"
              value={lastName}
              onChangeText={setLastName}
            />
            <FormInput
              label="Firstname"
              value={firstName}
              onChangeText={setFirstName}
            />
            <FormInput
              label="Phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <PassCodeInput
              label="Create 6 digit passcode"
              genericPlaceholder="Create your 6 digit passcode"
              value={passCode}
              onChangeText={setPassCode}
              hidePassCode={hidePasscode} //show password state
            />
            <Text style={styles.hint}>Your passcode must be 6 digits long</Text>
            <ShowPassCheckBox
              checked={hidePasscode}
              onPress={() => setHidePasscode(!hidePasscode)} //change show password state to opposite
            />
          </View>
          {/* Button container */}
          <View>
            <NavButton
              title="Create account"
              onPress={
                () =>
                  navigation.navigate("EnterOTP", {
                    phonenumber: phoneNumber,
                  }) /*handleSignUp()*/
              } // Call the handleSignUp function when the button is pressed
            />
            <UnderlineButton
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
        <Text style={styles.lowerContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: "8%",
  },
  middleContainer: {
    marginTop: 20,
    bottom: 20,
  },
  lowerContainer: {
    textAlign: "center",
  },
  hint: {
    color: "#404040",
    fontSize: 14,
    bottom: 20,
    paddingHorizontal: 8,
  },
});

export default SignUpScreen;
