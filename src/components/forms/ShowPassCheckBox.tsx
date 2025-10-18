import React from "react";
import { Input, CheckBox } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

//prop

type CheckBoxProps = {
  checked: boolean;
  onPress: () => void;
};
//custom checkbox component
const ShowPassCheckBox: React.FC<CheckBoxProps> = ({ checked, onPress }) => {
  return (
    <CheckBox
      title="Show passcode"
      checked={!checked}
      onPress={onPress}
      checkedColor="#126415"
      containerStyle={{
        backgroundColor: "transparent",
        padding: 0,
        alignItems: "center", // aligns checkbox and text
        margin: 0,
      }}
      textStyle={{
        fontWeight: "400",
        fontSize: 14,
        color: "#333333",
        marginLeft: 4, // reduce spacing between checkbox and text
      }}
    />
  );
};

export default ShowPassCheckBox;
