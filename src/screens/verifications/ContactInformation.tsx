import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/GreenButton";
import PersonalInfoHeader from "./components/PersonalInfoHeader";

import NavigationHeader from "../../components/navigation/NavigationHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useVerificationNavigation,
} from "@/hooks/useTypedNavigation";
import { userSchemas } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";

import SmallSpacer from "@/components/SmallSpacer";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import ContactInfoModal from "./components/ContactInfoModal";
import CustomModal from "@/components/modals/CustomModal";
import { VerifyOtpApis } from "../auth/constants";

type Props = StackScreenProps<VerificationStackParamList, "ContactInfo">;

const ContactInfoScreen: React.FC<Props> = () => {
  const navigation = useVerificationNavigation();
  const { setPhoneNumber, setEmail, state } = useResetPasscode();
  const [modalVisible, setModalVisible] = useState(false);

  const { email, phoneNumber } = state;

  return (
    <SafeAreaView style={styles.container}>
      {/* Account verification header */}
      <UpperTextsFrame header="Contact Information" />
      <SmallSpacer />
      {modalVisible && (
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          children={
            <ContactInfoModal
              type="Phone"
              onContinue={() => { // I WILL HANDLE THIS CORRECTLY LATER
                setModalVisible(false);
                navigation.navigate("VerificationOtp", {
                  message: "message",
                  purpose: VerifyOtpApis.CHANGE_PHONE,
                });
              }}
            />
          }
        />
      )}
      <View style={styles.formContainer}>
      <FormInput
        label="Email"
        value={email ?? ""}
        onChangeText={setEmail}
        keyboardType="email-address"
        // onFocus={}
      />
      <FormInput
        label="Phone number"
        value={phoneNumber ?? ""}
        onChangeText={(texts) => {
          setModalVisible(true);
          setPhoneNumber(texts);
        }}
        keyboardType="numeric"
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

export default ContactInfoScreen;
