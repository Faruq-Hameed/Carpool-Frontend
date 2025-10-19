import React from "react";
import { View } from "react-native";

import Text from "@/components/texts";
import FormInput from "@/components/forms/formInput";
import NavButton from "@/components/buttons/GreenButton";

interface Props {
  type: "Phone" | "email";
  onContinue: () => void;
}
//HIS MODAL NOT YET PERFECT
const ContactInfoModal: React.FC<Props> = ({ type, onContinue }) => {
  const isPhone = type === "Phone";
  return (
    <View>
      <Text h4>
        {isPhone ? "Phone Number Verification" : "Email Verification"}
      </Text>
      {isPhone ? (
        <FormInput
          label="Email"
          value={""}
          onChangeText={() => {}}
          keyboardType="email-address"
          // onFocus={}
        />
      ) : (
        <FormInput
          label="Phone number"
          value={""}
          onChangeText={() => {}}
          keyboardType="numeric"
        />
      )}
      <NavButton onPress={onContinue} title="Continue" />
    </View>
  );
};

export default ContactInfoModal;
