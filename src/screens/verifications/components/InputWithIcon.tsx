import FormInput from "@/components/forms/formInput";
import { IconName } from "@/helpers/icons";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  rightIconName?: IconName;
  onPress: () => void;
//   onContinue: () => void; //I WILL USE THIS TO BRING IN PASSCODE MODAL
}
const InputWithIcon: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onPress, //ON PRESS SHOULD ACTIVATE CONFIRMATION MODAL which on continue of it bring passcode modal to live
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FormInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        rightIconName="pencilSimpleLine"
        disabled={true}
      />
    </TouchableOpacity>
  );
};

export default InputWithIcon;
