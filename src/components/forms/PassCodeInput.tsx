import React from "react";
import { TextInput, View, Text, StyleSheet, ViewStyle } from "react-native";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";

type PassCodeInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void; //optional onBlur prop for handling blur events will be compulsory if other screen have been adjusted
  onFocus?: (e: any) => void; //optional onFocus prop for handling focus events will be compulsory if other screen have been adjusted
  hidePassCode: boolean;
  label?: string;
  genericPlaceholder?: string;
  labelStyle?: ViewStyle;
};

/**  Reusable PassCodeInput component. Expecting title, placeholder, value, onChangeText, keyboardType */
const PassCodeInput: React.FC<PassCodeInputProps> = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
  hidePassCode = true,
  label,
  genericPlaceholder,
  labelStyle,
}) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, labelStyle]}>{label ?? "Passcode"}</Text>
      <View style={[styles.inputContainer, focus && styles.inputFocus]}>
        <TextInput
          style={styles.inputStyle}
          placeholder={genericPlaceholder ?? `Enter your ${label ?? "passcode"}`}
          placeholderTextColor="#404040"
          value={value}
          secureTextEntry={hidePassCode}
          onChangeText={onChangeText}
          onBlur={(e) => {
            onBlur?.(e);
            setFocus(false);
          }}
          onFocus={(e) => {
            onFocus?.(e);
            setFocus(true);
          }}
          keyboardType="number-pad"
          returnKeyType="send"
          maxLength={6}
        />
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
});

export default PassCodeInput;
