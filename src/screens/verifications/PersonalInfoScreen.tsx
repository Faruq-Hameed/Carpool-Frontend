import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Text, Input, Header, Icon } from "@rneui/themed";

import { StackScreenProps } from "@react-navigation/stack";
import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/greenButton";
import PersonalInfoHeader from "../../components/verifications/PersonalInfoHeader";
import VerificationHeader from "../../components/navigation/NavigationHeader";
import VerificationStepsBar from "../../components/verifications/ProgressBar";
import NavigationHeader from "../../components/navigation/NavigationHeader";

type Props = StackScreenProps<VerificationStackParamList, "PersonalInfo">;

const PersonalInfoScreen: React.FC<Props> = ({ navigation }) => {
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
      <VerificationStepsBar currentStep={1} />
      {/*upper container. */}
      <PersonalInfoHeader />
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
          {/* 
          <FormInput //THIS WILL BE UPDATED LATER TO A DATE PICKER
            label="Date of birth"
            value={dob}
            onChangeText={setDob}
            placeholder="-- -- ----"
          /> */}
          <FormInput label="Email" value={email} onChangeText={setEmail} />
        </View>
        {/* Button container */}
        <View>
          <NavButton
            title="Next"
            onPress={
              () => navigation.navigate("EnterNIN") // Navigate to the next screen
            } // Call the  function when the button is pressed
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    // borderWidth: 2,
    // borderColor: "red",
    // paddingBottom: 24,
  },
  middleContainer: {
    width: 343,
    margin: "auto",
    bottom: 20,
    // justifyContent: "center",
    // borderWidth: 2,
    // borderBlockColor: "green",
  },
});

export default PersonalInfoScreen;
