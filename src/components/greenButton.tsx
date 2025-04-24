//green button component for navigation
import React from "react";
import { Button, Text } from "@rneui/base";

import { Dimensions, StyleSheet, View } from "react-native";
import Spacer from "./Spacer";

const screenWidth =  Dimensions.get("window").width; // Get the screen width
/**Reusable button nav component */
const NavButton = ({
  title,
  onPress,//call a function when the button is pressed
  titleColor = "#FFFFFF", //default title color is white
  bgColor = "#126415", //default button color is #126415
  btnType = "solid", //default button type is solid
  disabled = false, //default button is not disabled
}: {
  title: string;
  onPress: () => void; 
  titleColor?: string;
  bgColor?: string;
  btnType?: "solid" | "clear" | "outline";
  disabled?: boolean;
}) => {
  return (
    <Spacer>
      <Button
        title={title}
        disabled={disabled}
        onPress={onPress}
        type={btnType}
        titleStyle={{
          fontSize: 16,
          fontWeight: "bold",
          color: titleColor,
        }}
        buttonStyle={{
          margin: "auto",
          backgroundColor: bgColor,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: "#126415",
          height: 56,
          width: 343, 
        }}

      />
    </Spacer>
  );
};

export default NavButton;
