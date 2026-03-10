import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "react-native";

import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/GreenButton";
import PersonalInfoHeader from "./components/PersonalInfoHeader";
import VerificationHeader from "../../components/navigation/NavigationHeader";
import VerificationStepsBar from "./components/ProgressBar";

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
// type Props = StackScreenProps<MainTabParamList, "DashBoard">;
type Props = StackScreenProps<VerificationStackParamList, "EntireLicense">;

const EnterLicenseScreen: React.FC<Props> = ({ navigation }) => {
  const [licenseNo, SetLicenseNo] = useState<string>("");
  const [licensePhoto, SetLicensePhoto] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <VerificationHeader />
      <VerificationStepsBar currentStep={3} />
      <Text style={{ fontSize: 26, fontWeight: "700" }}>Enter License Details</Text>
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
  },
});

export default EnterLicenseScreen;
