//reusasble input component. Expecting title, placeholder, value, onChangeText, keyboardType

import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";

import Spacer from "./Spacer";

type PassCodeInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  hidePassCode: boolean;
  label?: string;
  genericPlaceholder?: string;
};

/**  Reusable PassCodeInput component. Expecting title, placeholder, value, onChangeText, keyboardType */
const PassCodeInput: React.FC<PassCodeInputProps> = ({
  value,
  onChangeText,
  hidePassCode = true,
  label,
  genericPlaceholder,
}) => {
  console.log({hidePassCode})
  return (
    <Spacer>
      <Input
        label={label? label : "Passcode"}
        placeholder={
          genericPlaceholder ? genericPlaceholder : `Enter your ${label}`
        }
        value={value}
        secureTextEntry={hidePassCode} //hide passcode
        onChangeText={onChangeText}
        keyboardType="number-pad"
        // containerStyle={styles.inputContainer}
        // inputContainerStyle={styles.input}
      />
    </Spacer>
  );
};

export default PassCodeInput;
