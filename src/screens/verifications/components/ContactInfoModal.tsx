import React from "react";
import { View } from "react-native";

import Text from "@/components/texts";
import FormInput from "@/components/forms/formInput";

interface Props {
  type: "Phone" | "email";
}

const ContactInfoModal: React.FC<Props> = ({ type }) => {
  const isPhone = type === "Phone";
  return (
    <View>
      <Text h4>
        {isPhone ? "Phone Number Verification" : "Email Verification"}
      </Text>
      {isPhone ? (
        <FormInput
          label="Email"
          value={ ""}
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
    </View>
  );
};

export default ContactInfoModal;