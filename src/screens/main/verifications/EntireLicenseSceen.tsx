import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "@rneui/themed";

import { VerificationStackParamList } from "../../../navigation/VerificationNavigator";
import FormInput from "../../../components/formInput";
import NavButton from "../../../components/greenButton";
import PersonalInfoHeader from "../../../components/verifications/PersonalInfoHeader";
import VerificationHeader from "../../../components/NavigationHeader";
import VerificationStepsBar from "../../../components/verifications/ProgressBar";

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
      <Text h2>Enter License Details</Text>
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
