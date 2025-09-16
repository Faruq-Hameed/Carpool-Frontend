import LowerActionButtons from "@/screens/dashboard/profile/components/LowerActionButtons";
import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import Spacer from "../Spacer";
import Text from "../texts";
//THIS IS NOT CURRENTLY USED, i PLANNED TO USE IT AS A CUSTOM CONFIRMATION MODAL CAN BE USED FOR SIGN OUT AND
// OTHER PLACES WHERE SIMILAR MODAL IS USED
interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "#CC0000",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel} // Android back button support
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContentContainer}>
          <Text h4>{title}</Text>
          <Spacer />
          <Text>{message}</Text>
          <Spacer />
          <LowerActionButtons
            upperBtnTitle={cancelText}
            onUpperBtnPress={onCancel}
            lowerBtnTitle={confirmText}
            lowerBtnColour={confirmColor}
            onLowerBtnPress={onConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#B2B2B2F2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalContentContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "90%",
    alignItems: "center",
  },
});

export default ConfirmationModal;
