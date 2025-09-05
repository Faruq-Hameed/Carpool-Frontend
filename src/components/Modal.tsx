import React, { ReactNode, useState } from "react";
import { View, SafeAreaView, StyleSheet, Modal } from "react-native";

interface ModalContainerProps {
  headerText: string;
  description: string;
  upperBtnTitle: string;
  lowerBtnTitle: string;
  onUpperBtnPress: () => void;
  onLowerBtnPress: () => void;
  lowerBtnColour?: string;
}

/**Reusable modal container */
const ModalContainer1: React.FC<{
  content: ReactNode;
  //   isModalVisible: boolean;
  onModalClose: () => boolean;
}> = ({
  content,
  // isModalVisible,
  onModalClose,
}) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      {onModalClose() && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={onModalClose()}
          //   onRequestClose={() => setModalVisible(false)}
        >
          {/* Modal container this can be made to be dynamic too */}
          <View style={styles.modalBackground}>
            <View style={styles.modalContentContainer}>{content}</View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: "98%",
    alignItems: "center",
  },
});

export default ModalContainer1;
