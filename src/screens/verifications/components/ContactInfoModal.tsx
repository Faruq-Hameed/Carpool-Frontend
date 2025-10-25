import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/texts";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";
import CustomModal from "@/components/modals/CustomModal";

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
          <Text h4>
            {isPhone ? "Phone Number Verification" : "Email Verification"}
          </Text>
          {isPhone ? (
            <FormInput
              label="Email"
              value={value}
              onChangeText={setValue}
              keyboardType="email-address"
              
            />
          ) : (
            <FormInput
              label="Phone number"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
          )}
          <NavButton
            onPress={() => {
              console.log("Phone api will be called next");
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
    // borderRadius: 10,
    // backgroundColor: "#FFFFFF",
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    width: "98%",
    // alignItems: "center",
    // borderWidth: 2,
    // justifyContent: "center",
  },
});

export default ContactInfoModal;
