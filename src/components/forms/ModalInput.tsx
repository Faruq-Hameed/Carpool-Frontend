import React from "react";
import { Input } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";
import { AppIcon } from "../others/AppIcon";
import { IconName } from "@/helpers/icons";
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
      <Input
        style={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
        placeholder={placeholder || `Enter your ${label}`}
        placeholderTextColor={"#404040"}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...(maxLength && { maxLength })}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
//  borderWidth: 1,
//  marginTop: 10,
  },
  inputStyle: {
    fontSize: 16,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#404040",
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "popping",
    color: "#1A1A1A",
    marginLeft: 10, //to align the label with the input
    // alignSelf: "center"

    // textTransform: "capitalize",
  },
});

export default ModalInput;
