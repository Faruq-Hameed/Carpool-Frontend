import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Text from "../texts";
import CustomModal from "./CustomModal";
import PassCodeUtils from "../forms/passcodeUtils";
import { useResetPasscode } from "@/hooks/useResetPasscode";
import GreenNavButton from "../buttons/GreenButton";

interface PasscodeModalProps {
  visible: boolean;
  message?: string;
  onClose?: () => void; //also handles onContinue
}

/**Passcode modal to be called when passcode is required for some tasks */
const PasscodeModal: React.FC<PasscodeModalProps> = ({
  visible,
  message = "Enter passcode to verify It's you.",
  onClose = () => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    state: { passcode },
    setPasscode,
  } = useResetPasscode();

  // Sync external visibility prop with internal state
  useEffect(() => {
    if (visible !== undefined) {
      setModalVisible(visible);
    }
  }, [visible]);

  const handleClose = () => {
    setModalVisible(false);
    onClose(); // trigger external close if needed
  };

  return (
    <CustomModal visible={visible ?? modalVisible} onClose={handleClose}>
      <View style={styles.container}>
        <PassCodeUtils
          label={message}
          setPassCode={setPasscode} // Update Formik state
          value={passcode} // Formik state for passcode field
          hideForgetPassword={true}
          labelStyle={styles.label as any}
        />
        <GreenNavButton
          title="Continue"
          onPress={() => {
            console.log("Api to confirm passcode will be called");
            //then navigate to change contact info screen
            handleClose(); // close locally
          }}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
  },
  label: {
    fontSize: 20,
    fontWeight: "700"
  }
});

export default PasscodeModal;
