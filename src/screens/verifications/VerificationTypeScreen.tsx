import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Text from "@/components/texts/Text";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { AppIcon } from "@/components/AppIcon";
import NavigationChildFrame from "@/components/navigation/NavigationChildFrame";
import Spacer from "@/components/Spacer";
import SmallSpacer from "@/components/SmallSpacer";
import InfoTextFrame from "@/components/texts/InfoText";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";

const VerificationTypeScreen: React.FC = () => {
  const navigation = useVerificationNavigation()
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <UpperTextsFrame header="Account Verification" goBack />
        <Spacer />

        <AppIcon name="verificationBadge" size={122} />
        <Spacer />
        <Spacer />

        <Text>Verify your Account to offer or join a ride</Text>
        <SmallSpacer />

        <InfoTextFrame
          leftIcon="info"
          title="All information will be shared with third parties for verification purposes."
        />
        <Spacer />
        <Spacer />

        <NavigationChildFrame
          leftIcon="userFocus"
          rightIcon="caretRight"
          title="Identity Verification."
          lowerText="Required to offer a ride"
          onPress={() => navigation.navigate("IdentityVerification")}
        />
        <NavigationChildFrame
          leftIcon="carProfile"
          rightIcon="caretRight"
          title="Vehicle Verification."
          lowerText="Required to offer a ride"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

});

export default VerificationTypeScreen;
