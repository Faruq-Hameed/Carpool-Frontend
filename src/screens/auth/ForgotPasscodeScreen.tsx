import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet,  } from "react-native";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { useAuth } from "@/hooks/useAuth";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { VerifyOtpApis } from "./constants";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { User } from "@/contexts/AuthContext";

type Props = StackScreenProps<AuthStackParamList, "ForgotPasscode">;

const ForgotPasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const [useEmailInstead, setUseEmailInstead] = useState(false);

  const isPhoneValid = /^\d{11}$/.test(phoneNumber);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { initiateApiCall, isLoading, error, message, data } = useMutationHandler<User>(
    "generateResetPasscodeOtp", // mutation key for requesting forgot passcode OTP
    (data, message) => {
      console.log({error})
      navigation.navigate("EnterOTP", {
        message,
        email,
        phoneNumber,
        purpose: VerifyOtpApis.RESET_PASSCODE,
      });
    }
  );

  const handleSendOtp = () => {
    if (useEmailInstead) {
      if (!email || !isEmailValid) {
        setInputError("Please enter a valid email address");
        return;
      }
      initiateApiCall({ email, purpose: VerifyOtpApis.RESET_PASSCODE });
    } else {
      if (!phoneNumber || !isPhoneValid) {
        setInputError("Phone number must be 11 digits");
        return;
      }
      initiateApiCall({  phoneNumber , purpose: VerifyOtpApis.RESET_PASSCODE });
    }

    setInputError("");
  };

  useEffect(() => {
    console.log("Error ocuue", error)
    // If error suggests phone not found, switch to email input
    if (error?.code === "USER_NOT_FOUND" && !useEmailInstead) {
      setUseEmailInstead(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <UpperTextsFrame
        header="Forgot Passcode"
        normalText={
          useEmailInstead
            ? "Enter the email linked to your account to regain access"
            : "Enter the phone number linked to your account to regain access"
        }
      />

      <View>
        {!useEmailInstead ? (
          <FormInput
            label="Phone number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        ) : (
          <FormInput
            label="Email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        )}

        {inputError && (
          <ErrorTexts message={inputError} style={styles.errorStyle} />
        )}

        <NavButton
          title="Send OTP"
          onPress={handleSendOtp}
          disabled={isLoading || (!useEmailInstead ? !isPhoneValid : !isEmailValid)}
        />
      </View>
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
