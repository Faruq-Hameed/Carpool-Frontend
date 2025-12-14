import React, { useReducer } from "react";
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
  actionTypes,
} from "@/reducers/faceCaptureReducer";
import PleaseWaitModal from "@/components/modals/PleaseWaitModal";
import { ErrorToast } from "@/components/modals/ErrorToast";
import ContinueModal from "@/components/modals/ContinueModal";
import Spacer from "@/components/others/Spacer";
import SmallSpacer from "@/components/others/SmallSpacer";
import { useAuth } from "@/hooks/useAuth";
import { ApiStatus } from "@/utils/constants/ApiStatus";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import UserKycStatus from "@/models/UserKycStatus";

/**Face Capture verification prep screen */
const FaceCaptureScreen: React.FC = () => {
  // const [state, dispatch] = useReducer(
  //   faceCaptureReducer,
  //   BaseFaceCaptureState
  // );
  const { setUserKycStatus, UserKycStatus } = useAuth();

  const { initiateApiCall, isLoading, error, message } = useMutationHandler<{
    userKyc: UserKycStatus;
  }>("faceVeriication", (data, message) => {
    console.log({ data, message });
    setUserKycStatus(data?.userKyc as UserKycStatus);
  });

  // const { isLoading, error, completionMessage } = state;
  const navigation = useVerificationNavigation();

  const handleVerificationCall = (success = false) => {
    console.log("Face capture initiated");
    // dispatch({ type: actionTypes.SET_LOADING, payload: true });
    console.log({ isLoading });
    const message = success
      ? "Face captured successfully"
      : "Face verification failed!";
    //handle the provider call
    //simulating for now
    // setTimeout(() => {
    //   if (!success) {
    //     //simulating error
    //     dispatch({ type: actionTypes.SET_ERROR, payload: message });
    //     dispatch({ type: actionTypes.SET_LOADING, payload: false });
    //     return;
    //   }
    //   //simulate success
    //   else {
    //     dispatch({ type: actionTypes.SET_LOADING, payload: false });
    //     dispatch({
    //       type: actionTypes.SET_COMPLETION_MESSAGE,
    //       payload: message,
    //     });
    //     setUserKycStatus({
    //       ninStatus: UserKycStatus.ninStatus,
    //       dobStatus: UserKycStatus.dobStatus,
    //       faceCapture: ApiStatus.VERIFIED,
    //     });
    //   }
    // }, 3000);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <View style={styles.container}> */}
      <ErrorToast message={error} />
      <PleaseWaitModal visible={isLoading} onClose={() => {}} />
      {!error &&
        message && ( //if no error and we got our final completion message
          <ContinueModal
            title="Continue"
            message={message} // ✅ Dynamic message from provider or my api
            visible={message ? true : false}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
      <View style={styles.upperContainer}>
        <UpperTextsFrame header="Face Capture" />
        <Spacer />
        <SmallSpacer />
        <AppIcon name="faceIcon" size={122} />
        <Spacer />
        <SmallSpacer />
      </View>

      <View style={styles.midContainer}>
        <Text h4>Face capture</Text>
        <Text style={styles.text}>
          Your face needs to be verified against government database. For a
          successful face capture, please make sure;
        </Text>
        <Text style={styles.text}>
          * You are in a space with enough light to take a clear photo of your
          face
        </Text>
        <Text style={styles.text}>
          * You're not wearing hats, sunglasses, or face coverings
        </Text>
        <Text style={styles.text}>
          * You’re facing the camera directly with a neutral expression
        </Text>
      </View>
      <Spacer />
      <SmallSpacer />
      <InfoTextFrame
        leftIcon="info"
        title="Photo captured will also be used as your profile picture."
      />
      <View style={styles.btnContainer}>
        <NavButton
          title="I'm ready, Continue"
          onPress={initiateApiCall}
        />
        {/* <NavButton
            title="I'm ready, Continue"
            onPress={() => handleVerificationCall(true)}
          /> */}
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  // container: {
  //   flex: 1,
  //   paddingHorizontal: 10,
  // },
  upperContainer: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  midContainer: {
    // flex: 0.35,
    rowGap: 10,
    padding: 10,
  },
  btnContainer: {
    flex: 0.15,
    marginTop: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default FaceCaptureScreen;
