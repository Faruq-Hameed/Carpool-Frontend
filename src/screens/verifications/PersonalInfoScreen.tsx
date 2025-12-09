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
import { ErrorToast } from "@/components/modals/ErrorToast";
import ContinueModal from "@/components/modals/ContinueModal";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import UserKycStatus from "@/models/UserKycStatus";

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
    error: namesError,
  } = useMutationHandler<{ user: User }>(
    "updateNames",
    (data, message, context?: { nin: string; dob: string }) => {
      console.log({ data, message, context });
      saveUser(data?.user as User);
      if (context) {
        initiateNinApiCall({ nin: context.nin, dob: context.dob });
      }
    },
    (error) => {
      setApiError(error ?? namesError ?? "");
    }
  );
  const {
    initiateApiCall: initiateNinApiCall,
    isLoading: verifyNinIsLoading,
    error: verifyNinError,
  } = useMutationHandler<UserKycStatus>(
    "verifyNin",
    (data, message) => {
      //on api call success callback
      setCompletionMessage(message);
      setUserKycStatus(data!);
      // setModalMessage(message); //the api message
    },
    (error) => {
      console.log({ error, verifyNinError });
      setApiError(verifyNinError ?? error ?? "");
    }
  );
  const {
    currentUser: {
      firstName: savedFirstName,
      lastName: savedLastName,
      middleName: savedMiddleName,
    },
    saveUser,
    setUserKycStatus,
  } = useAuth();

  const navigation = useVerificationNavigation();
  // /**Handle api call I NEEDED TO OPTIMIZE THIS API LOGIC AND FLOW HERE */
  const handleSubmit = (data: FormPayload) => {
    console.log({ data });
    const { firstName, lastName, middleName, nin, dob } = data;

    //First normalize the saved names and updated names
    const normalize = (val?: string) => (val ?? "").trim().toLowerCase();
    const savedNames = {
      firstName: normalize(savedFirstName),
      lastName: normalize(savedLastName),
      middleName: normalize(savedMiddleName ?? ""),
    };
    const updatedNames = {
      firstName: normalize(firstName),
      lastName: normalize(lastName),
      middleName: normalize(middleName),
    };

    //check if any one of the names was changed
    const namesChanged =
      savedNames.firstName !== updatedNames.firstName ||
      savedNames.lastName !== updatedNames.lastName ||
      savedNames.middleName !== updatedNames.middleName;

    if (!namesChanged) {
      // Directly verify NIN if no change occurred
      initiateNinApiCall({ nin, dob });
    } else {
      //Pass only changed names to updateNames api
      const payload: Partial<FormPayload> = {};
      if (savedNames.firstName !== updatedNames.firstName)
        payload.firstName = firstName;
      if (savedNames.lastName !== updatedNames.lastName)
        payload.lastName = lastName;
      if (savedNames.middleName !== updatedNames.middleName)
        payload.middleName = middleName;

      //Keep nin/dob in closure, it will come back via on success
      initiateNamesApiCall(payload, { nin, dob });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ErrorToast message={apiError} />

      {!apiError &&
        completionMessage && ( //if no api error and we got our final completion message
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
