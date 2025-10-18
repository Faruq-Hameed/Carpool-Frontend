import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LightStackFrame from "@components/navigation/NavigationChildFrame";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";

/**Identity verification list screen showing various verification item */
const IdentityVerificationTwoScreen: React.FC = () => {
  const navigation = useVerificationNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <UpperTextsFrame header="Identity Verification" />
      <LightStackFrame title="Contact Information" onPress={() => {}} />
      <LightStackFrame
        title="Personal Information/NIN"
        onPress={() => navigation.navigate("PersonalInfo")} //THIS SHOULD BE CONDITIONAL BASED ON KYC LEVEL

        //   onPress={() => {}}
      />
      <LightStackFrame title="Face Capture" onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default IdentityVerificationTwoScreen;
