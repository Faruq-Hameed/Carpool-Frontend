import React from "react";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
};

/**  Reusable input component. Expecting title, placeholder, value, onChangeText, keyboardType */
const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}) => {
  return (
      <Input
        label={label}
        labelStyle={styles.label}
        placeholder={`Enter your ${label}`}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        // containerStyle={styles.inputContainer}
        // inputContainerStyle={styles.input}
      />
  );
};

const styles= StyleSheet.create({
  label: {
    fontSize: 24, //to be confirmed later if correct with other themed text
    fontWeight: 400,
  },
})

export default FormInput;
