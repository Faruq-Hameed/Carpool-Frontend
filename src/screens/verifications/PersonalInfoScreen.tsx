import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, Input, Header, Icon } from "@rneui/themed";

import { StackScreenProps } from "@react-navigation/stack";
import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/GreenButton";
import PersonalInfoHeader from "./components/PersonalInfoHeader";
import VerificationHeader from "../../components/navigation/NavigationHeader";
import VerificationStepsBar from "./components/ProgressBar";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useRootNavigation,
  useVerificationNavigation,
} from "@/hooks/useTypedNavigation";

type Props = StackScreenProps<VerificationStackParamList, "PersonalInfo">;

const PersonalInfoScreen: React.FC<Props> = () => {
  const navigation = useVerificationNavigation();
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Account verification header */}
      {/* <VerificationHeader /> */}
      <NavigationHeader title="Account Verification" goBack={false} />
      {/* <VerificationStepsBar currentStep={1} /> */}
      {/*upper container. */}
      <PersonalInfoHeader />
      {/* middle container */}
      <KeyboardAwareScrollView
        // contentContainerStyle={{ padding: 16 }}
        extraScrollHeight={100} //this makes sure the input is visible above the keyboard
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  THIS CAN HANDLE KEYPAD DISMISS TOO*/}
        <View style={styles.formContainer}>
          {/*Input form container */}
          <View style={styles.formInputsContainer}>
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
            <FormInput label="Email" value={email} onChangeText={setEmail} />
            <FormInput
              label="Phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />
          </View>
          {/* Button container */}
          <View>
            <NavButton
              title="Next"
              onPress={
                () =>
                  navigation.navigate("VerificationOtp", {
                    phonenumber: phoneNumber,
                    onVerify: (code: string) =>
                      console.log("Verified with code:", code),
                  })
                // Navigate to the next screen
                // rootNavigation.navigate("ProfileStack", { //DEEP NESTED LEFT FOR REMINDER INCASE NEEDED
                //   screen: "AccountSetting",
                // });
              } // Call the  function when the button is pressed
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    // paddingHorizontal: 16,
    borderWidth: 2,
  },
  formContainer: {
    justifyContent: "space-around",
  },
  formInputsContainer: {
    marginVertical: 20,
    marginBottom: 60,
  },
});

export default PersonalInfoScreen;
