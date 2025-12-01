import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperTextsFrame from "../../components/navigation/upperTextsFrame";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/GreenButton";

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
import Spacer from "@/components/others/Spacer";
import SmallSpacer from "@/components/others/SmallSpacer";
import PleaseWaitModal from "@/components/modals/PleaseWaitModal";
import DOBDatePicker from "@/components/forms/DOBDatePicker";
import { useAuth } from "@/hooks/useAuth";

type Props = StackScreenProps<VerificationStackParamList, "PersonalInfo">;

const PersonalInfoScreen: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    currentUser: { firstName, lastName, middleName },
  } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <>
          <PleaseWaitModal
            visible={isLoading}
            onClose={() => setIsLoading(false)}
          />
        </>
      )}

      {/* Account verification header */}
      {/* <VerificationHeader /> */}
      <NavigationHeader title="Account Verification" goBack={false} />
      {/* <VerificationStepsBar currentStep={1} /> */}
      <SmallSpacer />
      {/*upper container. */}
      {/* <PersonalInfoHeader /> */}

      {/* middle container */}
      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: "center" }}
        extraScrollHeight={100} //this makes sure the input is visible above the keyboard
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <HeaderWithSubText
          title="Please confirm your details"
          subText="Confirm that these details are the same with what you have on your NIN"
        />
        <Spacer />

        <Formik
          initialValues={{
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            middleName: middleName ?? "",
            dob: "",
            nin: "",
          }}
          validationSchema={userSchemas.PersonalInfoConfirmationSchema}
          onSubmit={
            (values) => {
              console.log("Form submitted clicked");
              console.log({ values });
              setIsLoading(true);
            }
            // navigation.navigate("VerificationOtp", {
            //   phonenumber: values.phoneNumber,
            //   onVerify: (code: string) =>
            //     console.log("Verified with code:", code),
            // })
          }
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
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
                  label="Middle Name"
                  value={values.middleName}
                  onChangeText={handleChange("middleName")}
                  onBlur={handleBlur("middleName")}
                />
                {touched.middleName && errors.middleName && (
                  <ErrorTexts
                    style={styles.textsError}
                    message={errors.middleName}
                  />
                )}

                {/*FORM CONTROLLED DOB PICKER */}
                <DOBDatePicker
                  value={values.dob}
                  touched={touched.dob}
                  error={errors.dob}
                  setFieldValue={setFieldValue}
                />

                <FormInput
                  label="NIN"
                  value={values.nin}
                  onChangeText={handleChange("nin")}
                  onBlur={handleBlur("nin")}
                  keyboardType="numeric"
                />
                {touched.nin && errors.nin && (
                  <ErrorTexts style={styles.textsError} message={errors.nin} />
                )}
              </View>
              {/* Button container */}
              <View>
                <NavButton
                  title="Next"
                  onPress={handleSubmit}
                  loading={isLoading}
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
  },
  textsError: {
    //added this because the component is not staying where it should be and I don't know why
    top: -20,
    paddingHorizontal: 10,
  },
});

export default PersonalInfoScreen;
