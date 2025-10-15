import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { VerifyOtpApis } from "./constants";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { User } from "@/contexts/AuthContext";
import { Formik } from "formik";
import { ResetPasscodeSchema } from "@/validations/userValidation";
import UnderlineButton from "@/components/buttons/UnderLineBtn";
import { ErrorToast } from "@/components/modals/ErrorToast";

type Props = StackScreenProps<AuthStackParamList, "ForgotPasscode">;

const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const [useEmailInstead, setUseEmailInstead] = useState(false);
  const [email, setEmail] = useState(""); //I SHOULDN'T HAVE DONE LOCAL STATE BUTI NEEDED THIS DATA
  const [phoneNumber, setPhoneNumber] = useState("");
  const { initiateApiCall, isLoading, error, message, data } =
    useMutationHandler<User>(
      "generateResetPasscodeOtp", // mutation key for requesting forgot passcode OTP
      (data, message) => {
        console.log({ error, message });
        navigation.navigate("EnterOTP", {
          message,
          email,
          phoneNumber,
          purpose: VerifyOtpApis.RESET_PASSCODE,
        });
      }
    );

  useEffect(() => {
    console.log("Error ocuue", error);
    // If error suggests phone not found, switch to email input
    if (error?.code === "USER_NOT_FOUND" && !useEmailInstead) {
      setUseEmailInstead(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={error} title="Action Failed" top={50} />

      <UpperTextsFrame
        header="Forgot Passcode"
        normalText={
          useEmailInstead
            ? "Enter the email linked to your account to regain access"
            : "Enter the phone number linked to your account to regain access"
        }
      />

      <Formik
        initialValues={{ phoneNumber: "", email: "" }}
        validationSchema={ResetPasscodeSchema}
        onSubmit={(values) => initiateApiCall(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View key={useEmailInstead ? "email" : "phone"}>
            {!useEmailInstead ? (
              <>
                <FormInput
                  label="Phone number"
                  keyboardType="numeric"
                  value={values.phoneNumber}
                  maxLength={11}
                  onBlur={handleBlur("phoneNumber")}
                  onChangeText={(texts) => {
                    setPhoneNumber(texts); // optional,since I am using this elsewhere
                    handleChange("phoneNumber")(texts);
                  }}
                />

                {touched.phoneNumber && errors.phoneNumber && (
                  <ErrorTexts
                    message={errors.phoneNumber}
                    style={styles.errorStyle}
                  />
                )}
              </>
            ) : (
              <>
                <FormInput
                  label="Email address"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={(texts) => {
                    handleChange("email")(texts);
                    setEmail(texts);
                  }}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <ErrorTexts
                    message={errors.email}
                    style={styles.errorStyle}
                  />
                )}
              </>
            )}

            {/* {inputError && (
              <ErrorTexts message={inputError} style={styles.errorStyle} />
            )} */}

            <NavButton
              title="Send OTP"
              onPress={handleSubmit}
              disabled={!!(!errors.email || !errors.phoneNumber)}
              loading={isLoading}
            />
            <UnderlineButton
              title={
                !useEmailInstead
                  ? "Use email instead"
                  : "Use phone number instead"
              }
              onPress={() => {
                const newValue = !useEmailInstead;
                setUseEmailInstead(newValue);
              }}

              // onPress={() => setUseEmailInstead(!useEmailInstead)}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

// const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
//   // State variables for input fields
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [inputError, setInputError] = useState("");
//   const isValid = /^\d{11}$/.test(phoneNumber); // updates as user types
//   // useEffect(() => {
//   //   if (!isLoading && !error && message && data) {
//   //     navigation.navigate("EnterOTP", {
//   //       message,
//   //       email: data.email,
//   //       purpose: VerifyOtpApis.VERIFY_EMAIL,
//   //       // onVerify: (code: string) => {
//   //       //   console.log("Verified with code:", code);
//   //       // },
//   //     });
//   //   }
//   // }, [isLoading, message]);
//   const handleSendOtp = async () => {
//     if (!phoneNumber) {
//       setInputError("Phone number is required");
//       return;
//     }

//     if (!/^\d{11}$/.test(phoneNumber)) {
//       setInputError("Phone number must be 11 digits");
//       return;
//     }

//     setInputError("");
//     //call api for my otp creation for forget password
//     navigation.navigate("EnterOTP", {
//       message: "Enter the OTP sent to your phone",
//       purpose: VerifyOtpApis.FORGOT_PASSCODE,
//       // Pass the phone number to EnterOTPScreen
//       // phonenumber: phoneNumber,
//       // onVerify: () => handleLogin("token12345"),
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/*upper container */}
//       <UpperTextsFrame
//         header="Forgot Passcode"
//         normalText="Enter the phone number linked to your account to regain access"
//       />
//       {/*lower container */}
//       <View>
//         <FormInput
//           label="Phone number"
//           keyboardType="numeric"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />
//         {/* show text if input is not valid and user has typed something */}
//         {!isValid && phoneNumber.length > 0 && (
//           <ErrorTexts
//             message="Please type in valid phone number"
//             style={styles.errorStyle}
//           />
//         )}
//         <NavButton
//           title="Send OTP"
//           onPress={() => {
//             //call api for my otp creation for forget password
//             navigation.navigate("EnterOTP", {
//               // Pass the phone number to EnterOTPScreen
//               // phonenumber: phoneNumber,
//               // onVerify: () => handleLogin("token12345"),
//               message: "Enter the OTP sent to your phone",
//               purpose: VerifyOtpApis.FORGOT_PASSCODE,
//             });

//           }}
//           disabled={!isValid}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  errorStyle: {
    top: -20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
export default ForgotPasscodeScreen;
