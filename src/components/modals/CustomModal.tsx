import React, { ReactNode } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { AppIcon } from "../others/AppIcon";

/**Reusable modal container */
const CustomModal: React.FC<{
  visible: boolean;
  children: ReactNode;
  onClose: () => void;
  /**Cancel icon to handle closing of modal */
  withCancelIcon?: boolean;
}> = ({ visible, children, onClose, withCancelIcon = false }) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible} //visibility based on child's request
        onRequestClose={onClose} // handle Android back button
      >
        {/* Modal container this can be made to be dynamic too */}
        <View style={styles.modalBackground}>
          <View style={styles.modalChildrenContainer}>
            {children}
            {withCancelIcon && (
              /**Cancel icon to handle closing of modal */
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={onClose}
              >
                <AppIcon name="x" />
              </TouchableOpacity>
            )}
          </View>
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
  cancelContainer: {
    position: "absolute",
    right: 0,
    zIndex: 10,
    padding: 10,
  },
});

export default CustomModal;
