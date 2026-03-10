import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";
import Text from "../texts";

type FormInputProps = {
  label: string | React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  placeholder?: string;
  maxLength?: number;
};

/**  Reusable modal input component. Expecting title, placeholder, value, onChangeText, keyboardType */
const ModalInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  placeholder = "",
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={
          placeholder ||
          (typeof label === "string" ? `Enter your ${label}` : "")
        }
        placeholderTextColor="#404040"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  inputStyle: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#404040",
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginTop: 5,
    color: "#1A1A1A",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1A1A1A",
    marginLeft: 10,
  },
});

export default ModalInput;
