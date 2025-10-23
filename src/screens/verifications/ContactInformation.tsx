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
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import { userSchemas } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";

import SmallSpacer from "@/components/SmallSpacer";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import ContactInfoModal from "./components/ContactInfoModal";
import CustomModal from "@/components/modals/CustomModal";
import { VerifyOtpApis } from "../auth/constants";
import InputWithIcon from "./components/InputWithIcon";
import PseudoModalScreen from "@/components/modals/PseudoModalScreen";
import { useAuth } from "@/hooks/useAuth";

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

      <View style={styles.formContainer}>
        <InputWithIcon
          label="Email"
          value={"user@email"}
          onChangeText={() => {}}
          onPress={() => {
            console.log("change email pressed");
            // setModalVisible(true);
          }}
          onPasscodeContinue={() =>
            navigation.navigate("ChangeContactInfo", { type: "email" })
          }
        />
        <InputWithIcon
          label="Phone number"
          value={"08100623821"}
          onChangeText={() => {}}
          onPress={() => {
            console.log("change phone pressed");

            // setModalVisible(true);
          }}
          onPasscodeContinue={() =>
            navigation.navigate("ChangeContactInfo", { type: "phone" })
          }
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
