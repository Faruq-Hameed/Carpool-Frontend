import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Text from "@/components/texts/Text";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { AppIcon } from "@/components/AppIcon";
import NavButton from "@/components/buttons/greenButton";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";

const IdentityVerificationScreen: React.FC = () => {
  const navigation = useVerificationNavigation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <UpperTextsFrame header="Identity Verification" />
          <AppIcon name="verificationBadge" size={122} />
        </View>
        <Text>To complete this verification, please have these ready:</Text>

        <View style={styles.midContainer}>
          <Text>
            1. Your active phone number (we’ll send you a one-time passcode){" "}
          </Text>
          <Text>2. Your NIN</Text>
          <Text>
            3. A space with enough light to take a clear photo of your face
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <NavButton
            title="I'm ready, Continue"
            onPress={() => navigation.navigate("PersonalInfo")} //THIS SHOULD BE CONDITIONAL BASED ON KYC LEVEL
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  upperContainer: {
    flex: 0.37,
    justifyContent: "space-around",
    alignItems: "center",
  },
  midContainer: {
    flex: 0.35,
    rowGap: 10,
    padding: 10,
  },
  btnContainer: {
    flex: 0.15,
  },
});

export default IdentityVerificationScreen;
