import LowerActionButtons from "@/screens/dashboard/profile/components/LowerActionButtons";
import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import Spacer from "../Spacer";
import Text from "../texts";
import GreenNavButton from "../buttons/GreenButton";
//THIS IS NOT CURRENTLY USED, i PLANNED TO USE IT AS A CUSTOM CONFIRMATION MODAL CAN BE USED FOR SIGN OUT AND
// OTHER PLACES WHERE SIMILAR MODAL IS USED
interface ContinueModalProps {
  title?: string;
  visible: boolean;
  message: string;
  onPress: () => void;
}

const ContinueModal: React.FC<ContinueModalProps> = ({
  title = "continue",
  visible,
  message,
  onPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
    //   onRequestClose={onPress} // Android back button support
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContentContainer}>
          <Text h4>{message}</Text>
          <Spacer />
          <GreenNavButton title={title} onPress={onPress} />
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

export default ContinueModal;
