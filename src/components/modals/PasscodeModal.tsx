import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Text from "../texts";
import CustomModal from "./CustomModal";
import PassCodeUtils from "../forms/passcodeUtils";

interface PasscodeModalProps {
  visible: boolean;
  message?: string;
  onClose?: () => void;
}

const PasscodeModal: React.FC<PasscodeModalProps> = ({
  visible,
  message = "Enter passcode to verify It's you.",
  onClose = () => {},
}) => {
  const [passcode, setPassCode] = useState("");
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <PassCodeUtils
          label={message}
          setPassCode={setPassCode} // Update Formik state
          value={passcode} // Formik state for passcode field
          hideForgetPassword={true}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
  },
});

export default PasscodeModal;
