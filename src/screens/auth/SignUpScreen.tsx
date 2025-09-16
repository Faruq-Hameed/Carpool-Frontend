import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
// import Text from "@/components/texts";
import FormInput from "@/components/forms/formInput";
import PassCodeInput from "@/components/forms/PassCodeInput";
import ShowPassCheckBox from "@/components/forms/ShowPassCheckBox";
import NavButton from "@/components/buttons/GreenButton";
import UnderlineButton from "@/components/buttons/UnderLineBtn";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { authValidation } from "@/validations";
import PassCodeUtils from "@/components/forms/passcodeUtils";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = StackScreenProps<AuthStackParamList, "SignUp">;
const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  // State variables for input fields

  // Handle sign up button press
  const handleSignUp = async () => {
    // API endpoint for sign up
    const apiUrl = "https://4e9c-102-219-53-33.ngrok-free.app/api/users/";

    // Request body for the API call
    // const requestBody = {
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    // };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/*upper container. i.e create account*/}
        <UpperTextsFrame
          header="Create your account"
          normalText="Enter your details to create your account"
        />
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
              firstname: "",
              lastname: "",
              email: "",
              passcode: "",
            }}
            validationSchema={authValidation.SignUpSchema}
            onSubmit={(values) =>
              navigation.navigate("EnterOTP", {
                email: values.email,
                //this should construct the request body and also api to call
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
              <View style={styles.middleContainer}>
                {/*Input form container */}

                <View>
                  <FormInput
                    label="Firstname"
                    value={values.firstname}
                    onChangeText={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                  />
                  {touched.firstname && errors.firstname && (
                    <ErrorTexts
                      style={styles.textsError}
                      message={errors.firstname}
                    />
                  )}

                  <FormInput
                    label="Surname"
                    value={values.lastname}
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                  />
                  {touched.lastname && errors.lastname && (
                    <ErrorTexts
                      style={styles.textsError}
                      message={errors.lastname}
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
    top: -55,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;
