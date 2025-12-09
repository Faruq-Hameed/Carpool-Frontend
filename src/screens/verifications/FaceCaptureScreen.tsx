import React, { useReducer, } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Text from "@/components/texts";
import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import { AppIcon } from "@/components/others/AppIcon";
import NavButton from "@/components/buttons/GreenButton";
import { useVerificationNavigation } from "@/hooks/useTypedNavigation";
import InfoTextFrame from "@/components/texts/InfoText";
import {
  BaseFaceCaptureState,
  faceCaptureReducer,
} from "@/reducers/faceCaptureReducer";
import PleaseWaitModal from "@/components/modals/PleaseWaitModal";
import { ErrorToast } from "@/components/modals/ErrorToast";
import ContinueModal from "@/components/modals/ContinueModal";

/**Face Capture verification prep screen */
const FaceCaptureScreen: React.FC = () => {
  const [state, dispatch] = useReducer(
    faceCaptureReducer,
    BaseFaceCaptureState
  );
  const { isLoading, error, completionMessage } = state;
  const navigation = useVerificationNavigation();

  const handleVerificationCall = async (withError = false) => {
    dispatch({ type: "SET_LOADING", payload: true });

    const message = !withError
      ? "Face captured successfully"
      : "Face verification failed!";
    //handle the provider call
    //simulating for now
    setTimeout(() => {
      if (withError) {
        //simulating error
        dispatch({ type: "SET_ERROR", payload: message });
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      //simulate success
      else {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_COMPLETION_MESSAGE", payload: message });
      }
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ErrorToast message={error} />
      <PleaseWaitModal visible={isLoading} onClose={() => {}} />
      {!error &&
        completionMessage && ( //if no error and we got our final completion message
          <ContinueModal
            title="Continue"
            message={completionMessage} // ✅ Dynamic message from provider or my api
            visible={completionMessage ? true : false}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}

      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <UpperTextsFrame header="Face Capture" />
          <AppIcon name="faceIcon" size={122} />
        </View>
        <Text h4>Face capture</Text>
        <Text>
          Your face needs to be verified against government database. For a
          successful face capture, please make sure;
        </Text>
        <View style={styles.midContainer}>
          <Text>
            1. You are in a space with enough light to take a clear photo of
            your face
          </Text>
          <Text>2. You're not wearing hats, sunglasses, or face coverings</Text>
          <Text>
            3. You’re facing the camera directly with a neutral expression
          </Text>
        </View>
        <InfoTextFrame
          leftIcon="info"
          title="Photo captured will also be used as your profile picture."
        />
        <View style={styles.btnContainer}>
          <NavButton
            title="I'm ready, Continue"
            onPress={handleVerificationCall}
          />
          <NavButton
            title="I'm ready, Continue"
            onPress={() => handleVerificationCall(true)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  upperContainer: {
    flex: 0.37,
    justifyContent: "space-around",
    alignItems: "center",
  },
  midContainer: {
    flex: 0.35,
    rowGap: 10,
    padding: 10,
  },
  btnContainer: {
    flex: 0.15,
  },
});

export default FaceCaptureScreen;
