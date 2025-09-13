import GreenNavButton from "@/components/buttons/GreenButton";
import InfoTextFrame from "@/components/texts/InfoText";
import {
  useRootNavigation,
  useVerificationNavigation,
} from "@/hooks/useTypedNavigation";
import React from "react";

import { View, StyleSheet } from "react-native";

/**Conditional verification component which renders on home screen if
 * user has not completed kyc. WILL BE ADJUSTED TO RENDER CONDITIONALLY
 */
const VerificationBox: React.FC = () => {
  const navigation = useRootNavigation();
  // const navigation = useVerificationNavigation();
  const verificationButton = () => {};
  return (
    <View style={styles.container}>
      <InfoTextFrame
        leftIcon="info"
        title="Verify your account to offer or join a ride."
        rightComponent={
          <GreenNavButton
            title="Verify"
            iconRight={true}
            onPress={() => navigation.navigate("AccountVerification")}
            width={0.24}
            iconName="caretRightW"
          />
        }
        containerStyles={styles.frameContainer}
        titleStyles={styles.description}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  frameContainer: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#008000",
    backgroundColor: "#F6FCF6",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 3,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  description: {
    width: "65%",
    textAlign: "center",
  },
});

export default VerificationBox;
