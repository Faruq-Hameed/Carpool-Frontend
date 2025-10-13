import React, {  useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UpperTextsFrame from "@/components/navigation/upperTextsFrame";
import Spacer from "@/components/Spacer";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import { EnterOTPProps } from "@/helpers/enterOtpProp";
import ContinueModal from "@/components/modals/ContinueModal";

// type Props = StackScreenProps<AuthStackParamList, "EnterOTP">;
const EnterOTPScreen: React.FC<EnterOTPProps> = ({ route }) => {
  //HAVING ISSUE MAKING THIS DYNAMIC FOR PARAMS

  const [modalVisible, setModalVisible] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  let { message, onVerify, } = route.params; //THE ON VERIFY HERE NOT PERFECT. DONT KNOW HPW TO GO TO NEXT PAGE

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30); // timer for resend OTP button

  // // //turn the number turn the next 4 digit after first 5 digits to *
  // phonenumber = phonenumber?.replace(/^(.{5})(.{4})/, "$1****");
  // email = email?.replace(/^(.{2})(.{7})/, "$1****");

  return (
    <SafeAreaView style={styles.container}>
      {modalVisible && (
        <ContinueModal
          title="Continue"
          message={apiMessage}
          visible={modalVisible}
          onPress={() => {
            console.log("confirmed pressed");
            setModalVisible(false);
          }}
        />
      )}
      <UpperTextsFrame
        header="Enter code"
        normalText={message} //API MESSAGE WILL BE USED
      />
      <Spacer />
      {/* OTP input container */}
      <View>
        <FormInput
          label="Enter OTP"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={4}
        />
        <NavButton
          title="Verify"
          onPress={
            () => {
              const message = onVerify("code")?? "Completed successfully";// WILL BE ADJUSTED LATER
              setApiMessage(message)
              setModalVisible(true);
            }
            // () => handleLogin("token12345") //API TO VERIFY NEEDED TO BE CALLED. ALSO AUTH TOKEN WILL BE RECEIVED
          }
          disabled={code && code.length === 4 ? false : true} // Disable button if input is not complete //LATER
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getResponsiveWidth(),
    alignItems: "center",
  },
});

export default EnterOTPScreen;
