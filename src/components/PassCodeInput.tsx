import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { getResponsiveWidth } from "../helpers/getScreenDimension";

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
  // console.log({hidePassCode})
  return (
    // <Spacer>
    <Input
      label={label ? label : "Passcode"}
      style={styles.inputStyle}
      inputContainerStyle={styles.inputContainer}
      labelStyle={styles.label}
      placeholder={
        genericPlaceholder ? genericPlaceholder : `Enter your ${label}`
      }
      placeholderTextColor={"#404040"}
      value={value}
      secureTextEntry={hidePassCode} //hide passcode
      onChangeText={onChangeText}
      keyboardType="number-pad"
      returnKeyLabel=""
      returnKeyType="send"
      // containerStyle={styles.inputContainer}
      // inputContainerStyle={styles.input}
    />
    // </Spacer>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    // letterSpacing: 4,
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#404040",
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginTop: 5,
    width: getResponsiveWidth(0.9),
  },
  label: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "popping",
    color: "#1A1A1A",
  },
});

export default PassCodeInput;
