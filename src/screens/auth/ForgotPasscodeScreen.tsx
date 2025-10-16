import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { VerifyOtpApis } from "./constants";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import UnderlineButton from "@/components/buttons/UnderLineBtn";
import { ErrorToast } from "@/components/modals/ErrorToast";
import { useResetPasscode } from "@/hooks/useResetPasscode";

type Props = StackScreenProps<AuthStackParamList, "ForgotPasscode">;

const ForgotPasscodeScreen: React.FC<Props> = ({ navigation, route }) => {
  console.log(route)
  const {
    state,
    setPhoneNumber,
    setEmail,
    switchToEmail,
    switchToPhone,
    setError,
  } = useResetPasscode();
  const { phoneNumber, email, useEmailInstead,error } = state;

  /**simple validation function */
  const isValidInput = () => {
    if (useEmailInstead) {
      return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    } else {
      return !!phoneNumber && /^\d{11,11}$/.test(phoneNumber);
    }
  };

  /**Submit handler */
  const handleSubmit = () => {
    if (!isValidInput()) {
      setError(
        "Please enter a valid " +
          (useEmailInstead ? "email address" : "phone number")
      );
      return;
    }

    initiateApiCall({
      email: email ?? null,
      phoneNumber: phoneNumber ?? null,
    });
  };

  const { initiateApiCall, isLoading, error: apiError, message, data } =
    useMutationHandler<null>(
      "generateResetPasscodeOtp", // mutation key for requesting forgot passcode OTP
      (data, message) => {
        console.log({ error, message, data });
        navigation.navigate("EnterOTP", {
          message,
          email: email ? email : undefined,
          phoneNumber: phoneNumber ? phoneNumber : undefined,
          purpose: VerifyOtpApis.RESET_PASSCODE,
        });
      }
    );

  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={apiError} title="Action Failed" top={50} />

      <UpperTextsFrame
        header="Forgot Passcode"
        normalText={
          useEmailInstead
            ? "Enter the email linked to your account to regain access"
            : "Enter the phone number linked to your account to regain access"
        }
      />

      <View key={useEmailInstead ? "email" : "phone"}>
        {!useEmailInstead ? (
          <FormInput
            label="Phone number"
            keyboardType="numeric"
            value={phoneNumber ?? ""}
            maxLength={11}
            onChangeText={(texts) => {
              setPhoneNumber(texts);
            }}
          />
        ) : (
          <FormInput
            label="Email address"
            keyboardType="email-address"
            value={email ?? ""}
            onChangeText={(texts) => {
              setEmail(texts);
            }}
          />
        )}
        {error && <ErrorTexts message={error} style={styles.errorStyle} />}

        <NavButton
          title="Send OTP"
          onPress={handleSubmit}
          disabled={!isValidInput()}
          loading={isLoading}
        />
        <UnderlineButton
          title={
            !useEmailInstead ? "Use email instead" : "Use phone number instead"
          }
          onPress={() => {
            useEmailInstead ? switchToPhone() : switchToEmail();
          }}

          // onPress={() => setUseEmailInstead(!useEmailInstead)}
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
