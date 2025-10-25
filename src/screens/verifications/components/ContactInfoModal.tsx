import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/texts";
import NavButton from "@/components/buttons/GreenButton";
import CustomModal from "@/components/modals/CustomModal";
import ModalInput from "@/components/forms/ModalInput";

interface Props {
  visible: boolean;
  onClose: () => void;
  type?: "phone" | "email";
}
/**Modal for input of phone number if the user don't have it registered */
const ContactInfoModal: React.FC<Props> = ({
  type = "phone",
  visible,
  onClose,
}) => {
  const [value, setValue] = useState("");

  const isPhone = type === "phone";
  return (
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
              label="Email"
              value={value}
              onChangeText={setValue}
              keyboardType="email-address"
            />
          ) : (
            <ModalInput
              label="Phone number"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
          )}
          <NavButton
            onPress={() => {
              console.log("Phone api will be called after validation");
            }}
            title="Continue"
          />
        </View>
      }
    />
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
