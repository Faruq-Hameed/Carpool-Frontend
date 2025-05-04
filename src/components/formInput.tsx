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
        style={styles.inputStyle}
        inputContainerStyle={
          styles.inputContainer
        }
        labelStyle={styles.label}
        placeholder={`Enter your ${label}`}
        placeholderTextColor={"#404040"}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        // containerStyle={styles.inputContainer}
        // inputContainerStyle={styles.input}
      />
  );
};

const styles= StyleSheet.create({
  inputStyle: {
    // letterSpacing: 4,
    fontSize: 16, 

  },
  inputContainer: {borderWidth: 1,
    borderColor: '#404040',  
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginTop: 5,
  },
  label: {
    fontSize: 16, 
    fontWeight: 400,
    fontFamily: "popping",
    color: "#1A1A1A",
    // textTransform: "capitalize",
  },
})

export default FormInput;
