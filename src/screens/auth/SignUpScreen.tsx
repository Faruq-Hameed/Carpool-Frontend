import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
// import Text from "@/components/texts";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UnderlineButton from "@/components/buttons/UnderLineBtn";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { userSchemas } from "@/validations";
import PassCodeUtils from "@/components/forms/passcodeUtils";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSignUpApi from "./hooks/useSignUpApi";
import { ErrorToast } from "@/components/modals/ErrorToast";
import { VerifyOtpPurposes } from "./constants";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import User from "@/models/User";
import Spacer from "@/components/others/Spacer";

type Props = StackScreenProps<AuthStackParamList, "SignUp">;
const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const {
    initiateApiCall: initiateSignUp,
    isLoading,
    error,
  } = useMutationHandler<User>("signUp", (data, message) => {
    navigation.navigate("EnterOTP", {
      message,
      email: data!.email,
      purpose: VerifyOtpPurposes.VERIFY_EMAIL,
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ErrorToast message={error} title="Sign up Failed" />

        {/*upper container. i.e create account*/}
        <UpperTextsFrame
          header="Create your account"
          normalText="Enter your details to create your account"
        />
        <Spacer />
        {/* middle container */}
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }} //so the scroll view expands properly.
          extraScrollHeight={200} //this makes sure the input is visible above the keyboard
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              passcode: "",
            }}
            validationSchema={userSchemas.SignUpSchema}
            onSubmit={(values) => {
              console.log("signup api called");
              initiateSignUp(values);
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.middleContainer}>
                {/*Input form container */}

                <View>
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
                    label="Enter email"
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
                  {/*password show and forget password*/}
                  <PassCodeUtils
                    label="Create 6 digit passcode"
                    genericPlaceholder="Create your 6 digit passcode"
                    setPassCode={handleChange("passcode")}
                    onBlur={handleBlur("passcode")}
                    value={values.passcode}
                    hideForgetPassword={true}
                  />
                  {touched.passcode && errors.passcode && (
                    <ErrorTexts
                      style={styles.passwordError}
                      message={errors.passcode}
                      // style={styles.passwordError}
                    />
                  )}
                </View>
                {/* Button container */}
                <View>
                  <NavButton
                    title="Create account"
                    onPress={
                      // Call the handleSignUp function when the button is pressed
                      handleSubmit
                    }
                    loading={isLoading}
                  />
                  <UnderlineButton
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                  />
                </View>
              </View>
            )}
          </Formik>
          <Text style={styles.lowerContainer}>
            Creating an account with us means you agree with our
            <UnderlineButton
              title="Terms of use"
              bold={false}
              onPress={() => console.log("Terms of use pressed")}
            />
            <UnderlineButton
              title="Privacy policy"
              bold={false}
              onPress={() => console.log("Privacy policy pressed")}
            />
          </Text>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: "8%",
    flex: 1,
  },
  middleContainer: {
    marginTop: 20,
    bottom: 20,
  },
  lowerContainer: {
    textAlign: "center",
  },
  hint: {
    color: "#404040",
    fontSize: 14,
    bottom: 20,
    paddingHorizontal: 8,
  },
  textsError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -20,
    paddingHorizontal: 10,
  },
  passwordError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -50,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;
