import LowerActionButtons from "@/screens/dashboard/profile/components/LowerActionButtons";
import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import Spacer from "../others/Spacer";
import Text from "../texts";
import GreenNavButton from "../buttons/GreenButton";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
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
          <Text h4 style={{ textAlign: "center" }}>
            {message}
          </Text>
          <Spacer />
          <GreenNavButton title={title} onPress={onPress} width={0.7} />
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
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: "90%",
    alignItems: "center",
  },
});

export default ContinueModal;
