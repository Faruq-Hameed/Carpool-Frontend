import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/texts";
import NavButton from "@/components/buttons/GreenButton";
import CustomModal from "@/components/modals/CustomModal";
import ModalInput from "@/components/forms/ModalInput";
import ErrorTexts from "@/components/texts/ErrorTexts";
import { isValidInput } from "@/validations/phoneEmailValidator";
import useAddPhone from "../hooks/useGenerateVerifyPhoneOtp";
import useGenerateVerifyPhoneOtp from "../hooks/useGenerateVerifyPhoneOtp";
import { ErrorToast } from "@/components/modals/ErrorToast";

interface Props {
  visible: boolean;
  onClose: () => void;
  type?: "phone" | "email"; // ACTUALLY THIS MODAL IS FOR PHONE EMAIL WILL ALWAYS BE VERIFIED
}
/**Modal for input of phone number if the user don't have it registered */
const ContactInfoModal: React.FC<Props> = ({
  type = "phone",
  visible,
  onClose,
}) => {
  const [value, setValue] = useState("");
  const { error, isLoading, initiateApiCall } = useGenerateVerifyPhoneOtp();

  const isPhone = true;
  return (
    <>
      <CustomModal
        visible={visible}
        onClose={onClose}
        withCancelIcon
        children={
          <View style={styles.container}>
            <Text h4 style={styles.headerStyle}>
              {isPhone ? "Phone Number Verification" : "Email Verification"}
            </Text>
            {isPhone ? (
              <ModalInput
                label="Phone number"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
              />
            ) : (
              <>
                <ModalInput
                  label="Phone number"
                  value={value}
                  onChangeText={setValue}
                  keyboardType="numeric"
                />
                {error && <ErrorTexts message={error} />}
              </>
            )}
            <NavButton
              onPress={() => {
                initiateApiCall(value);
                onClose()
              }}
              title="Continue"
              loading={isLoading}
            />
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "98%",
    justifyContent: "center",
  },
  headerStyle: {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default ContactInfoModal;
