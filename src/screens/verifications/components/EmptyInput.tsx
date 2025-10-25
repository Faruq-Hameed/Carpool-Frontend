import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ContactInfoModal from "./ContactInfoModal";
import Text from "@/components/texts";

interface Props {}
/**Empty box component  */
const EmptyInputBox: React.FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <ContactInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Phone number</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor:"#126415",
    height: 50,
    borderRadius: 5,
    width: "95%",
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  label: {
    position: "absolute",
    top: -25,
    // borderWidth: 1,
    // borderColor: "red",
    fontSize: 15,
  },
});

export default EmptyInputBox;
