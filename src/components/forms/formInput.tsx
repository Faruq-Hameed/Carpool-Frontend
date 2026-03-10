import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
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
  editable?: boolean;
  pointerEvents?:"auto" | "box-none" | "none" | "box-only"
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
  editable=true,
  pointerEvents="auto",
  rightIconName, //right icon
}) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <View style={styles.wrapper} pointerEvents={pointerEvents}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputContainer,
          focus && styles.inputFocus,
          (disabled || !editable) && styles.inputDisabled,
        ]}
      >
        <TextInput
          style={styles.inputStyle}
          placeholder={
            placeholder ||
            (typeof label === "string" ? `Enter your ${label}` : "")
          }
          placeholderTextColor="#404040"
          value={value}
          onChangeText={onChangeText}
          onBlur={(e) => {
            onBlur?.(e);
            setFocus(false);
          }}
          onFocus={(e) => {
            onFocus?.(e);
            setFocus(true);
          }}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled && editable}
        />
        {rightIconName && (
          <View style={styles.rightIcon}>
            <AppIcon name={rightIconName} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1A1A1A",
    marginBottom: 4,
    marginLeft: 2,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#404040",
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginTop: 5,
    width: getResponsiveWidth(0.9),
  },
  inputFocus: {
    borderColor: "#126415",
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.7,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default FormInput;
