import React, { useState } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { authValidation } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";
//I NEED TO MAKE THIS SCREEN DYNAMIC TO HANDLE LOGIN FOR THE CURRENT USER AND SWITCHED LOGIN
//ONE IS WELCOME FARUQ SCREEN AND THE OTHER IS WELCOME BACK(tHE)
type Props = StackScreenProps<AuthStackParamList, "Login">;
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { handleLogin } = useAuth();
  // const handleLogin = async () => {
  //   const apiUrl = "https://1461-102-88-70-158.ngrok-free.app/api/users/otp/";

  //   try {
  //     const response = await axios.post(apiUrl, {
  //       phonenumber: phoneNumber,
  //     });
  //     // Alert.alert("Success", response.data.message);
  //     // Navigate to Verify Account screen
  //     navigation.navigate("VerifyAccount");
  //   } catch (error) {
  //     // Handle any network or unexpected errors
  //     //   error.response
  //     //     ? Alert.alert("Error", error.response.data.message)
  //     //     : error.message;
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      {/*upper container */}
      <UpperTextsFrame
        header="Welcome Back"
        normalText="Enter your details to login"
      />
      {/*lower container */}
      <Formik
        initialValues={{ phoneNumberOrEmail: "", passCode: "" }}
        validationSchema={authValidation.LoginSchema}
        onSubmit={async (values) => {
          // Example: store token after successful login
          await handleLogin("token12345");

          console.log(values);
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
                setPassCode={handleChange("passCode")} // Update Formik state
                onBlur={handleBlur("passCode")} // Handle blur event when user leaves input.
                value={values.passCode} // Formik state for passcode field
              />
              {touched.passCode && errors.passCode && (
                <ErrorTexts
                  message={errors.passCode}
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
