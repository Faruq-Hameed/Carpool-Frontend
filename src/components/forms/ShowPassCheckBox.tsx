import React from "react";
import { Input, CheckBox } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

//prop

type CheckBoxProps = {
  checked: boolean;
  onPress: () => void;
};
//custom checkbox component
const ShowPassCheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onPress,
}) => {
  return (
    <CheckBox
      title="Show passcode"
      checked={checked}
      onPress={onPress}
      checkedColor="#126415"
      containerStyle={{
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 0,
      }}
      textStyle={{ fontWeight: "400", fontSize: 14, color: "#333333" }}
    />
  );
};

export default ShowPassCheckBox;
