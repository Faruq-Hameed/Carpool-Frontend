import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UnderlineButton from "@/components/buttons/UnderLineBtn";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import PassCodeUtils from "@/components/forms/passcodeUtils";
import { userSchemas } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { ErrorToast } from "@/components/modals/ErrorToast";

import useLoginApi from "./hooks/useLoginApi";

//I NEED TO MAKE THIS SCREEN DYNAMIC TO HANDLE LOGIN FOR THE CURRENT USER AND SWITCHED LOGIN
//ONE IS WELCOME FARUQ SCREEN AND THE OTHER IS WELCOME BACK(tHE)
type Props = StackScreenProps<AuthStackParamList, "Login">;
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const {isLoading, error, initiateLogin,reset, } = useLoginApi();
  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={error} title="Login Failed" top={50}/>
      {/*upper container */}
      <UpperTextsFrame
        header="Welcome Back"
        normalText="Enter your details to login"
      />
      {/*lower container */}
      <Formik
        initialValues={{ phoneNumberOrEmail: "", passcode: "" }}
        validationSchema={userSchemas.LoginSchema}
        onSubmit={async (values) => {
          // Example: store token after successful login
          initiateLogin({
            userField: values.phoneNumberOrEmail,
            passcode: values.passcode,
          });

          // navigation.navigate("VerifyAccount"); // optional
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {/**Form inputs container */}
            <View>
              <FormInput
                label="Phone number or email"
                value={values.phoneNumberOrEmail} // Formik state for phone number or email field
                onChangeText={handleChange("phoneNumberOrEmail")} // Update Formik state
                onBlur={handleBlur("phoneNumberOrEmail")} // Handle blur event when user leaves input.
                onFocus={() => error && reset()} // COMING TO PERFECT THISLATER Clear error on focus
              />
              {touched.phoneNumberOrEmail && errors.phoneNumberOrEmail && (
                <ErrorTexts
                  message={errors.phoneNumberOrEmail}
                  style={styles.emailError}
                />
              )}
              {/*password show and forget password*/}
              <PassCodeUtils
                label="passcode"
                setPassCode={handleChange("passcode")} // Update Formik state
                onBlur={handleBlur("passcode")} // Handle blur event when user leaves input.
                value={values.passcode} // Formik state for passcode field
                onFocus={()=> error && reset()} // Clear error on focus
              />
              {touched.passcode && errors.passcode && (
                <ErrorTexts
                  message={errors.passcode}
                  style={styles.passwordError}
                />
              )}
            </View>
            {/* Button container */}
            <View>
              <NavButton title="Login" onPress={handleSubmit} />
              <UnderlineButton
                title="create an account"
                onPress={() => navigation.navigate("SignUp")}
              />
              <View></View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  emailError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -55,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
export default LoginScreen;
