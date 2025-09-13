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

import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/GreenButton";
import PersonalInfoHeader from "./components/PersonalInfoHeader";
import VerificationHeader from "../../components/navigation/NavigationHeader";
import VerificationStepsBar from "./components/ProgressBar";

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
// type Props = StackScreenProps<MainTabParamList, "DashBoard">;
type Props = StackScreenProps<VerificationStackParamList, "EnterNIN">;

const EnterNINScreen: React.FC<Props> = ({ navigation }) => {
  const [NIN, SetNin] = useState<string>("");
  const [profilePhoto, SetProfilePhoto] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <VerificationHeader title="Account Verification" />
      <VerificationStepsBar currentStep={2} />
      {/*upper container. */}
      <PersonalInfoHeader />
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
              () => navigation.navigate("EntireLicense") // Navigate to the next screen
            }
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
    // paddingBottom: 24,
    borderWidth: 2,
    borderBlockColor: "red",
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
