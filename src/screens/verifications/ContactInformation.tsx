import React from "react";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { VerificationStackParamList } from "@/navigation/VerificationNavigator";
import SmallSpacer from "@/components/others/SmallSpacer";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import AddPhoneContainer from "./components/AddPhoneContainer";
import VerifiedInfoBox from "./components/VerifiedInfoBox";
import Spacer from "@/components/others/Spacer";

type Props = StackScreenProps<VerificationStackParamList, "ContactInfo">;

const ContactInfoScreen: React.FC<Props> = () => {
  const {
    currentUser: { email, phoneNumber, phoneStatus },
  } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      {/* Account verification header */}
      <UpperTextsFrame header="Contact Information" />
      <SmallSpacer />

      <View style={styles.formContainer}>
        <VerifiedInfoBox label="email" details={email} />
      <Spacer />

        {phoneStatus === ApiStatus.VERIFIED && phoneNumber ? (
          <VerifiedInfoBox label="phone" details={phoneNumber} />
        ) : (
          <AddPhoneContainer />
        )}
      </View>
    </SafeAreaView>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBlockColor: "red",
  },
  formContainer: {
    justifyContent: "space-around",
  },
  formInputsContainer: {
    marginBottom: 50,
  },
  textsError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -20,
    paddingHorizontal: 10,
  },
});

export default ContactInfoScreen;
