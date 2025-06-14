import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { Text, Input } from "@rneui/themed";

import { StackScreenProps } from "@react-navigation/stack";
import { VerificationStackParamList } from "../../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../../components/upperTextsFrame";
import FormInput from "../../../components/formInput";
import NavButton from "../../../components/greenButton";

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
      {/*upper container. */}
      <UpperTextsFrame
        header="Personal Information"
        normalText="Only your name will be visible to other users"
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
          <FormInput
            label="Date of birth"
            value={dob}
            onChangeText={setDob}
          />

          <FormInput //THIS WILL BE UPDATED LATER TO A DATE PICKER
          label="Date of birth"
          value={dob}
          onChangeText={setDob}
          placeholder="-- -- ----"
        />
          <FormInput
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
   
        </View>
        {/* Button container */}
        <View>
          <NavButton
            title="Next"
            onPress={
              () =>
               navigation.navigate("EnterNIN") // Navigate to the next screen
              
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
  lowerContainer: {
    textAlign: "center",
  },
  hint: {
    // textAlign: "center",
    color: '#404040',  
    fontSize: 14,
    // borderWidth: 1,
    // borderBlockColor: "red",
    bottom: 20,
    paddingHorizontal: 8,
  },
});

export default PersonalInfoScreen;
