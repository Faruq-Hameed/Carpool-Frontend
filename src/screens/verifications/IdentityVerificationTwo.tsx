import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LightStackFrame from "@components/navigation/NavigationChildFrame";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";

/**Identity verification list screen showing various verification item */
const IdentityVerificationTwoScreen: React.FC = () => {
  const navigation = useVerificationNavigation();
  const {
    currentUser: { phoneStatus, emailStatus },
    UserKycStatus: { ninStatus, dobStatus, selfieStatus },
  } = useAuth();
  const contactVerified =
    phoneStatus === ApiStatus.VERIFIED && emailStatus === ApiStatus.VERIFIED;

  const personalInfoVerified =
    ninStatus === ApiStatus.VERIFIED && dobStatus === ApiStatus.VERIFIED;

  const faceCaptured = selfieStatus === ApiStatus.VERIFIED;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <UpperTextsFrame header="Identity Verification" />
      <LightStackFrame
        title="Contact Information"
        onPress={() => navigation.navigate("ContactInfo")}
        showVerifiedIcon={contactVerified} //show verified seal if contacts are verified
      />
      <LightStackFrame
        title="Personal Information/NIN"
        onPress={() => {
          if (!personalInfoVerified) {
            navigation.navigate("PersonalInfo"); //only clickable if personal inf is not verified
          }
        }}
        showVerifiedIcon={personalInfoVerified}
        //   onPress={() => {}}
      />
      <LightStackFrame
        title="Face Capture"
        onPress={() => {
          if (!faceCaptured) {
            //only clickable if face hasn't been verified
            navigation.navigate("FaceCapture");
          }
        }}
        showVerifiedIcon={faceCaptured}
      />
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
