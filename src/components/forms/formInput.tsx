import React from "react";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";
import { AppIcon } from "../others/AppIcon";
import { IconName } from "@/helpers/icons";

type FormInputProps = {
  label: string | React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void; //optional onBlur prop for handling blur events will be compulsory if other screen have been adjusted
  onFocus?: (e: any) => void; //optional onFocus prop for handling focus events will be compulsory if other screen have been adjusted
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  rightIconName?: IconName;
};

/**  Reusable input component. Expecting title, placeholder, value, onChangeText, keyboardType */
const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onFocus,
  keyboardType = "default",
  placeholder = "",
  maxLength,
  disabled = false,
  rightIconName, //right icon
}) => {
  return (
    <Input
      label={label}
      style={styles.inputStyle}
      inputContainerStyle={styles.inputContainer}
      labelStyle={styles.label}
      placeholder={placeholder || `Enter your ${label}`}
      placeholderTextColor={"#404040"}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      onFocus={onFocus}
      keyboardType={keyboardType}
      {...(maxLength && { maxLength })}
      autoCapitalize="none"
      autoCorrect={false}
      disabled={disabled}
      rightIcon={rightIconName ? <AppIcon name={rightIconName} /> : undefined}
      // leftIcon={{ type: 'font-awesome', name: 'chevron-left', color: '#404040', size: 16 }}
      // containerStyle={styles.inputContainer}
      // inputContainerStyle={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    // letterSpacing: 4,
    fontSize: 16,
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
    // alignSelf: "center"

    // textTransform: "capitalize",
  },
});

export default FormInput;
