import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { VerificationStackParamList } from "../../../navigation/VerificationNavigator";
import UpperTextsFrame from "../../../components/upperTextsFrame";
import FormInput from "../../../components/formInput";
import NavButton from "../../../components/greenButton";

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
// type Props = StackScreenProps<MainTabParamList, "DashBoard">;
type Props = StackScreenProps<VerificationStackParamList, "EnterNIN">;

const EnterNINScreen: React.FC<Props> = ({ navigation }) => {
  const [NIN, SetNin] = useState<string>("");
  const [profilePhoto, SetProfilePhoto] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <UpperTextsFrame
        header="Personal Information"
        normalText="Only your name will be visible to other users"
      />
      {/* middle container */}
      <View style={styles.middleContainer}>
        {/*Input form container */}
        <View>
          <FormInput label="NIN" value={NIN} onChangeText={SetNin} />
          <Text>Profile photo</Text>
          <Text>
            Please provide a clear portrait picture ( not a full body picture)
            of yourself. It should show your full face with no sunglasses or
            hats.
          </Text>
          <FormInput
            label="Profile Photo"
            value={profilePhoto}
            onChangeText={SetProfilePhoto}
          />
        </View>
         {/* Button container */}
        <View>
          <NavButton
            title="Next"
            onPress={
              () =>
                console.log("Next pressed")
              
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
    color: "#404040",
    fontSize: 14,
    // borderWidth: 1,
    // borderBlockColor: "red",
    bottom: 20,
    paddingHorizontal: 8,
  },
});

export default EnterNINScreen;
