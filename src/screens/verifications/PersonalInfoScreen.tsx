import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { VerificationStackParamList } from "../../navigation/VerificationNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/forms/formInput";
import NavButton from "../../components/buttons/GreenButton";

import NavigationHeader from "../../components/navigation/NavigationHeader";
import { userSchemas } from "@/validations";
import ErrorTexts from "@/components/texts/ErrorTexts";
import HeaderWithSubText from "@/components/texts/HeaderWithSubText";
import Spacer from "@/components/others/Spacer";
import SmallSpacer from "@/components/others/SmallSpacer";
import PleaseWaitModal from "@/components/modals/PleaseWaitModal";
import DOBDatePicker from "@/components/forms/DOBDatePicker";
import { useAuth } from "@/hooks/useAuth";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import User from "@/models/User";
import { KycStatusResponsePayload } from "@/apis/verifications/types";
import { ErrorToast } from "@/components/modals/ErrorToast";
import ContinueModal from "@/components/modals/ContinueModal";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";

type Props = StackScreenProps<VerificationStackParamList, "PersonalInfo">;
type FormPayload = {
  firstName: string;
  lastName: string;
  middleName: string;
  dob: string;
  nin: string;
};

//THE UI HA BEEN TESTED BUT ALL API FLOW OR LOGIC HAVEN'T BEEN TESTED AT ALL
const PersonalInfoScreen: React.FC<Props> = () => {
  const [completionMessage, setCompletionMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const {
    initiateApiCall: initiateNamesApiCall,
    isLoading: updateNamesLoading,
    error,
  } = useMutationHandler<User>(
    "updateNames",
    (data, message) => {},
    (error) => {
      setApiError(error);
    }
  );
  const {
    initiateApiCall: initiateNinApiCall,
    isLoading: verifyNinIsLoading,
    error: verifyNinError,
  } = useMutationHandler<KycStatusResponsePayload>(
    "verifyNin",
    (data, message) => {
      //TODO: SET KYC STATUS TO CONTEXT
      // IMPLEMENT ASYNC STORAGE FOR KYC STATUS
      //on api call success callback
      setCompletionMessage(message);
      // setModalMessage(message); //the api message
      // I can also navigate or do other things here maybe based on purpose
    },
    (error) => {
      setApiError(error);
    }
  );
  const {
    currentUser: {
      firstName: savedFirstName,
      lastName: savedLastName,
      middleName: savedMiddleName,
    },
  } = useAuth();

  const navigation = useVerificationNavigation();
  /**Handle api call I NEEDED TO OPTIMIZE THIS API LOGIC AND FLOW HERE */
  const handleSubmit = (data: FormPayload) => {
    const { firstName, lastName, middleName } = data;
    const combinedSavedNames = (
      savedFirstName +
      savedLastName +
      savedMiddleName
    )
      .trim()
      .toLowerCase();
    const updatedNames = (firstName + lastName + middleName)
      .trim()
      .toLowerCase();
    /**If no name was changed the nin api only is called */
    if (combinedSavedNames === updatedNames) {
      initiateNinApiCall({
        nin: data.nin,
        dob: data.dob,
      });
    } else {
      //call names api first. This will make updateNamesLoading true until completion
      initiateNamesApiCall({
        // I NEED TO ADJUST THIS SUCH HAT ONLY CHANGED NAMES ARE SENT TO API
        firstName,
        lastName,
        middleName,
      });
        //if the api has ended without error
        //I NEED TO CHAIN THIS TWO . A STALE MIGHT BE PASSED updateNamesLoading
      if (!updateNamesLoading && !apiError) {
        initiateNinApiCall({
          nin: data.nin,
          dob: data.dob,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={apiError} />

      {!apiError && completionMessage && ( //if no api error and we got our final completion message
        <ContinueModal
          title="Continue"
          message={completionMessage} // ✅ Dynamic message from mutation
          visible={completionMessage ? true : false}
          onPress={() => {
            setCompletionMessage("");
            navigation.goBack();
          }}
        />
      )}

      {updateNamesLoading ||
        (verifyNinIsLoading && (
          <>
            <PleaseWaitModal
              visible={updateNamesLoading || verifyNinIsLoading}
              onClose={() => {}}
            />
          </>
        ))}

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
            firstName: savedFirstName ?? "",
            lastName: savedLastName ?? "",
            middleName: savedMiddleName ?? "",
            dob: "",
            nin: "",
          }}
          validationSchema={userSchemas.PersonalInfoConfirmationSchema}
          onSubmit={(values) => {
            console.log("Form submitted clicked");
            console.log({ values });
            handleSubmit(values);
          }}
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
                  loading={updateNamesLoading || verifyNinIsLoading}
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
