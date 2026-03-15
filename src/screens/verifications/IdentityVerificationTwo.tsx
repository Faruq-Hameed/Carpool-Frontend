import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LightStackFrame from "@components/navigation/NavigationChildFrame";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import { Colors, FontSize, Spacing, Radius } from "@/theme";

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

  const selfieVerified = selfieStatus === ApiStatus.VERIFIED;
  const selfiePending = selfieStatus === ApiStatus.PENDING;
  const selfieRejected = selfieStatus === ApiStatus.REJECTED;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <UpperTextsFrame header="Identity Verification" />
      <LightStackFrame
        title="Contact Information"
        onPress={() => navigation.navigate("ContactInfo")}
        showVerifiedIcon={contactVerified}
      />
      <LightStackFrame
        title="Personal Information/NIN"
        onPress={() => {
          if (!personalInfoVerified) {
            navigation.navigate("PersonalInfo");
          }
        }}
        showVerifiedIcon={personalInfoVerified}
      />
      <LightStackFrame
        title="Face Capture"
        onPress={() => {
          if (!selfieVerified && !selfiePending) {
            navigation.navigate("FaceCapture");
          }
        }}
        showVerifiedIcon={selfieVerified}
      />
      {selfiePending && (
        <View style={styles.statusBanner}>
          <Text style={styles.statusBannerText}>
            Selfie under review — we'll notify you once it's approved.
          </Text>
        </View>
      )}
      {selfieRejected && (
        <View style={[styles.statusBanner, styles.rejectedBanner]}>
          <Text style={[styles.statusBannerText, styles.rejectedText]}>
            Selfie rejected — tap "Face Capture" above to re-submit a clearer photo.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  statusBanner: {
    marginTop: Spacing.sm,
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  statusBannerText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    lineHeight: 18,
  },
  rejectedBanner: {
    backgroundColor: "#FEF2F2",
  },
  rejectedText: {
    color: "#DC2626",
  },
});

export default IdentityVerificationTwoScreen;
