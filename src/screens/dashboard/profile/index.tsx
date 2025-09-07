import React from "react";
import { StyleSheet } from "react-native";
import LightStackFrame from "../../../components/navigation/NavigationChildFrame";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSummary from "./components/ProfileSummary";
import { useProfileNavigation, useRootNavigation } from "@/hooks/useTypedNavigation";
import Spacer from "@/components/Spacer";

/**Profile Screen when tap from the dashboard */
const Profile: React.FC = () => {
  const rootNavigation = useRootNavigation();
  const profileNavigation = useProfileNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <ProfileSummary />
      <Spacer />
      <LightStackFrame
        title="Account Verification"
        onPress={() => {
          rootNavigation.navigate("AccountVerification");
        }}
        leftIcon="userGear"
      />
      <LightStackFrame title="Wallet" onPress={() => {}} leftIcon="wallet" />
      <LightStackFrame title="Support" onPress={() => {}} leftIcon="headset" />
      <LightStackFrame
        title="Account Settings"
        onPress={() => {
          profileNavigation.navigate("AccountSetting");
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
    padding: 10,
  },
});

export default Profile;
