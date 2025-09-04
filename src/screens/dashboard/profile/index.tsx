import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LightStackFrame from "../../../components/LightStackFrame";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSummary from "./components/ProfileSummary";
import { useNavigation } from "@react-navigation/native";

const Profile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileSummary />
      <LightStackFrame
        title="Account Verification"
        onPress={() => {}}
        leftIcon="userGear"
      />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="wallet" />
      <LightStackFrame title="Support" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame
        title="Account Settings"
        onPress={() => {}}
        leftIcon="userGear"
      />
      <LightStackFrame
        title="Privacy Policy & Terms of Use"
        onPress={() => {}}
        leftIcon="lockLaminated"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 18,
  },
});

export default Profile;
