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

type Props = StackScreenProps<VerificationStackParamList, "PersonalInfo">;

const PersonalInfoScreen: React.FC<Props> = () => {
  const navigation = useVerificationNavigation();
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Account verification header */}
      {/* <VerificationHeader /> */}
      <NavigationHeader title="Account Verification" goBack={false} />
      {/* <VerificationStepsBar currentStep={1} /> */}
      {/*upper container. */}
      <PersonalInfoHeader />
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
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
          }}
          validationSchema={userSchemas.PersonalInfoConfirmationSchema}
          onSubmit={(values) =>
            navigation.navigate("VerificationOtp", {
              phonenumber: phoneNumber,
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
                  value={values.lastname}
                  onChangeText={handleChange("lastname")}
                  onBlur={handleBlur("lastname")}
                />
                <FormInput
                  label="Firstname"
                  value={values.firstname}
                  onChangeText={handleChange("firstname")}
                  onBlur={handleBlur("firstname")}
                />
                <FormInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormInput
                  label="Phone number"
                  value={values.phonenumber}
                  onChangeText={handleChange("phonenumber")}
                  keyboardType="numeric"
                />
              </View>
              {/* Button container */}
              <View>
                <NavButton
                  title="Next"
                  onPress={
                    handleSubmit
                    // () =>
                    //   navigation.navigate("VerificationOtp", {
                    //     phonenumber: phoneNumber,
                    //     onVerify: (code: string) =>
                    //       console.log("Verified with code:", code),
                    //   })
                    // Navigate to the next screen
                    // rootNavigation.navigate("ProfileStack", { //DEEP NESTED LEFT FOR REMINDER INCASE NEEDED
                    //   screen: "AccountSetting",
                    // });
                  } // Call the  function when the button is pressed
                />
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
    // justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    // paddingHorizontal: 16,
    borderWidth: 2,
  },
  formContainer: {
    justifyContent: "space-around",
  },
  formInputsContainer: {
    marginVertical: 20,
    marginBottom: 60,
  },
});

export default PersonalInfoScreen;
