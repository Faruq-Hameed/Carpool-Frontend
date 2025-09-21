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
  useRootNavigation,
  useVerificationNavigation,
} from "@/hooks/useTypedNavigation";
import { userSchemas } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";
import InfoTextFrame from "@/components/texts/InfoText";
import HeaderWithSubText from "@/components/texts/HeaderWithSubText";
import Spacer from "@/components/Spacer";
import SmallSpacer from "@/components/SmallSpacer";

type Props = StackScreenProps<VerificationStackParamList, "PersonalInfo">;

const PersonalInfoScreen: React.FC<Props> = () => {
  
  const navigation = useVerificationNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Account verification header */}
      {/* <VerificationHeader /> */}
      <NavigationHeader title="Account Verification" goBack={false} />
      {/* <VerificationStepsBar currentStep={1} /> */}
      <SmallSpacer />
      {/*upper container. */}
      {/* <PersonalInfoHeader /> */}
      <HeaderWithSubText
        title="Please confirm your details"
        subText="Confirm that these details are the same with what you have on your NIN"
      />
      <Spacer />
      <Spacer />

      {/* middle container */}
      <KeyboardAwareScrollView
        // contentContainerStyle={{ padding: 16 }}
        extraScrollHeight={100} //this makes sure the input is visible above the keyboard
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          }}
          validationSchema={userSchemas.PersonalInfoConfirmationSchema}
          onSubmit={(values) =>
            navigation.navigate("VerificationOtp", {
              phonenumber: values.phoneNumber,
              onVerify: (code: string) =>
                console.log("Verified with code:", code),
            })
          }
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              {/*Input form container */}
              <View style={styles.formInputsContainer}>
                <FormInput
                  label="Surname"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                />
                {touched.lastName && errors.lastName && (
                  <ErrorTexts
                    style={styles.textsError}
                    message={errors.lastName}
                  />
                )}
                <FormInput
                  label="Firstname"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                />
                {touched.firstName && errors.firstName && (
                  <ErrorTexts
                    style={styles.textsError}
                    message={errors.firstName}
                  />
                )}
                <FormInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <ErrorTexts
                    style={styles.textsError}
                    message={errors.email}
                  />
                )}
                <FormInput
                  label="Phone number"
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  keyboardType="numeric"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <ErrorTexts
                    style={styles.textsError}
                    message={errors.phoneNumber}
                  />
                )}
              </View>
              {/* Button container */}
              <View>
                <NavButton title="Next" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      {/* </TouchableWithoutFeedback> */}
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

export default PersonalInfoScreen;
