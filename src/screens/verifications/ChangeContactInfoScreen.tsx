import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { VerificationStackParamList } from "@/navigation/VerificationNavigator";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import FormInput from "@/components/forms/formInput";
import { useAuth } from "@/hooks/useAuth";
import GreenNavButton from "@/components/buttons/GreenButton";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { VerifyOtpPurposes } from "../auth/constants";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { isValidInput } from "@/validations/phoneEmailValidator";

type Props = StackScreenProps<VerificationStackParamList, "ChangeContactInfo">;

/**ChangeContactInfoScreen t change email or phoneNumber */
const ChangeContactInfoScreen: React.FC<Props> = ({ route }) => {
  const { type, passcode } = route.params; //passcode here will be sent to create otp
  const [value, setValue] = useState(""); //value here can be email or phone number as determine by the type in the param
  const [uiError, setUiError] = useState<string | null>(null);
  const navigation = useVerificationNavigation();
  const { currentUser } = useAuth();

  /**Handle submit based on type */
  const handleSubmit = () => {
    const error = isValidInput(type, value);
    setUiError(error);
    if (!error) {
      //call api and use the message
      navigation.navigate("VerificationOtp", {
        message: "message",
        purpose:
          type === "email"
            ? VerifyOtpPurposes.CHANGE_EMAIL
            : VerifyOtpPurposes.CHANGE_PHONE,
      });
    }
  };

  const isPhoneNumber = type === "phone";
  //need to add local validator for input
  return (
    <SafeAreaView style ={styles.container}>
      <UpperTextsFrame header={"Change" + " " + type} />
      <View
        style={styles.formContainer}
        // key={uiError}
      >
        {isPhoneNumber ? (
          <>
            <FormInput
              label="Current Phone number"
              value={currentUser.phoneNumber ?? ""}
              onChangeText={() => {}}
              disabled={true}
            />
            <FormInput
              label="Phone number"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
            {uiError && (
              <ErrorTexts message={uiError} style={styles.textsError} />
            )}
          </>
        ) : (
          <>
            <FormInput
              label="email"
              value={currentUser.email ?? ""}
              onChangeText={() => {}}
              disabled={true}
            />
            <FormInput
              label="email"
              value={value}
              onChangeText={setValue}
              keyboardType="email-address"
            />
            {uiError && (
              <ErrorTexts message={uiError} style={styles.textsError} />
            )}
          </>
        )}

        <GreenNavButton
          title="Continue"
          onPress={() => {
            handleSubmit();
          }}
        />
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
    // padding: 20,
  },
});

export default ChangeContactInfoScreen;
