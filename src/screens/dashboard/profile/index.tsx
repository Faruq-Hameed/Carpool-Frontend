import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LightStackFrame from "../../../components/LightStackFrame";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="headset" />
      {/* <LightStackFrame />
      <LightStackFrame />
      <LightStackFrame /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Profile;
