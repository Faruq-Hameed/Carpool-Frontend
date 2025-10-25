import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";

import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { userSchemas } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";

import SmallSpacer from "@/components/others/SmallSpacer";

import InputWithIcon from "./components/InputWithIcon";
import PseudoModalScreen from "@/components/modals/PseudoModalScreen";
import { useAuth } from "@/hooks/useAuth";
import VerifiedLabel from "@/components/others/LabelWithIcon";
import { ApiStatus } from "@/utils/constants/ApiStatus";

type Props = StackScreenProps<VerificationStackParamList, "ContactInfo">;

const ContactInfoScreen: React.FC<Props> = () => {
  const navigation = useVerificationNavigation();
  const {
    currentUser: { email, emailStatus, phoneNumber, phoneStatus },
  } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      {/* Account verification header */}
      <UpperTextsFrame header="Contact Information" />
      <SmallSpacer />

      <View style={styles.formContainer}>
        <InputWithIcon
          label={
            emailStatus === ApiStatus.VERIFIED ? (
              <VerifiedLabel label="Email" />
            ) : (
              "Email"
            )
          }
          title="Email"
          value={email}
          onPasscodeContinue={(passcode) =>
            navigation.navigate("ChangeContactInfo", {
              type: "email",
              passcode,
            })
          }
        />

        <InputWithIcon
          label={
            phoneStatus === ApiStatus.VERIFIED ? (
              <VerifiedLabel label="Phone number" />
            ) : (
              "Phone number"
            )
          }
          title="Phone"
          value={phoneNumber??""}
          onPasscodeContinue={(passcode) =>
            navigation.navigate("ChangeContactInfo", {
              type: "phone",
              passcode,
            })
          }
        />

        {/* <InputWithIcon
          label={
            emailStatus === ApiStatus.VERIFIED ? (
              <VerifiedLabel label="Phone number" />
            ) : (
              "Phone number"
            )
          }
          value={phoneNumber ?? " "} //added space to the string to remove placeholder
          onPasscodeContinue={(passcode) =>
            navigation.navigate("ChangeContactInfo", {
              type: "phone",
              passcode,
            })
          }
        /> */}
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
    // borderWidth: 2,
    // marginVertical: 20,
    marginBottom: 50,
  },
  textsError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -20,
    paddingHorizontal: 10,
  },
});

export default ContactInfoScreen;
