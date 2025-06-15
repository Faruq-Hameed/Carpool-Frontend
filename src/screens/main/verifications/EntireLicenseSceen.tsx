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
import VerificationHeader from "../../../components/verifications/VerificationHeader";

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
// type Props = StackScreenProps<MainTabParamList, "DashBoard">;
type Props = StackScreenProps<VerificationStackParamList, "EnterNIN">;

const EnterLicenseScreen: React.FC<Props> = ({ navigation }) => {
  const [licenseNo, SetLicenseNo] = useState<string>("");
  const [licensePhoto, SetLicensePhoto] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <VerificationHeader />
      <Text h2>

      </Text>
        
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

export default EnterLicenseScreen;
