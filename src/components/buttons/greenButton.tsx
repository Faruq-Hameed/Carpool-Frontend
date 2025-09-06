//green button component for navigation
import React from "react";
import { Button, Text } from "@rneui/themed";

import { Dimensions, StyleSheet, View } from "react-native";
import Spacer from "../Spacer";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";

/**Reusable button nav component */
const NavButton = ({
  title,
  onPress, //call a function when the button is pressed
  titleColor = "#FFFFFF", //default title color is white
  bgColor = "#126415", //default button color is #126415
  btnType = "solid", //default button type is solid
  disabled = false, //default button is not disabled
  borderColor, //button border color
  width,
}: {
  title: string;
  onPress: () => void;
  titleColor?: string;
  bgColor?: string;
  btnType?: "solid" | "clear" | "outline";
  disabled?: boolean;
  borderColor?: string;
  width?: number;
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
          backgroundColor: bgColor,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: borderColor ?? "#126415",
          height: 56,
          overflow: "hidden",
          width: getResponsiveWidth(width || 0.9),
        }}
      />
    </Spacer>
  );
};

export default NavButton;
