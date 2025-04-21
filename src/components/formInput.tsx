//reusasble input component. Expecting title, placeholder, value, onChangeText, keyboardType

import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";

import { width } from "../utils/constants/constants";
import Spacer from "./Spacer";

type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
};

/**  Reusable input component. Expecting title, placeholder, value, onChangeText, keyboardType */
const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}) => {
  return (
    <Spacer>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        // containerStyle={styles.inputContainer}
        // inputContainerStyle={styles.input}
      />
    </Spacer>
  );
};
