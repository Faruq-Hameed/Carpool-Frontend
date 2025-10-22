import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { VerificationStackParamList } from "@/navigation/VerificationNavigator";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import FormInput from "@/components/forms/formInput";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import { useAuth } from "@/hooks/useAuth";
import GreenNavButton from "@/components/buttons/GreenButton";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { VerifyOtpApis } from "../auth/constants";
import ErrorTexts from "@/components/texts/ErrorTexts";

type Props = StackScreenProps<VerificationStackParamList, "ChangeContactInfo">;

/**ChangeContactInfoScreen t change email or phoneNumber */
const ChangeContactInfoScreen: React.FC<Props> = ({ route }) => {
  const type = route.params.type;
  const navigation = useVerificationNavigation();
  const { currentUser } = useAuth();
  const {
    state: { email, phoneNumber, error },
    setEmail,
    setPhoneNumber,
    setPasscode,
    setError,
  } = useResetPasscode();
  const isPhoneNumber = type === "phone";
  //need to add local validator for input
  return (
    <SafeAreaView>
      <UpperTextsFrame header={"Change" + " " + type} />
      <View
        style={styles.formContainer}
        //   key={type}
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
              value={phoneNumber ?? ""}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />
            <ErrorTexts message="Invalid phone number" />
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
              value={email ?? ""}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <ErrorTexts message="Invalid email address" />
          </>
        )}

        <GreenNavButton
          title="Continue"
          onPress={() => {
            console.log("Going to enter otp next");
            navigation.navigate("VerificationOtp", {
              message: "message",
              purpose: VerifyOtpApis.CHANGE_PHONE,
            });
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
  },
});

export default ChangeContactInfoScreen;
