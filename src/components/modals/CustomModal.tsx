import React, { ReactNode, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";

/**Reusable modal container */
const CustomModal: React.FC<{
  visible: boolean;
  children: ReactNode;
  onClose: () => void;
}> = ({ visible, children, onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      {/* {onModalClose() && ( */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}//visibility based on child's request
           onRequestClose={onClose} // handle Android back button
      >
        {/* Modal container this can be made to be dynamic too */}
        <View style={styles.modalBackground}>
          <View style={styles.modalChildrenContainer}>{children}</View>
        </View>
      </Modal>
      {/* )} */}
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
  modalChildrenContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: "98%",
    alignItems: "center",
  },
});

export default CustomModal;
