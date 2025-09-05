import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LightStackFrame from "../../../components/NavigationChildFrame";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSummary from "./components/ProfileSummary";
import { useNavigation } from "@react-navigation/native";
import { useProfileNavigation } from "@/hooks/useTypedNavigation";

const Profile: React.FC = () => {
  const navigation = useProfileNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ProfileSummary />
      <LightStackFrame
        title="Account Verification"
        onPress={() => {
          navigation.navigate("AccountVerification");
        }}
        leftIcon="userGear"
      />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="wallet" />
      <LightStackFrame title="Support" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame
        title="Account Settings"
        onPress={() => {
          navigation.navigate("AccountSetting");
        }}
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
