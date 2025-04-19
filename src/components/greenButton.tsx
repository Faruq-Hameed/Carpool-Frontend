//green button component for navigation
import React from "react";
import { Button, Text } from "@rneui/base";

import { StyleSheet, View } from "react-native";
import Spacer from "./Spacer";

/**Reusable button nav component */
const NavButton = ({
  title,
  onPress,//call a function when the button is pressed
  titleColor = "#FFFFFF", //default title color is white
  bgColor = "#126415", //default button color is #126415
  btnType = "solid", //default button type is solid
}: {
  title: string;
  onPress: () => void; 
  titleColor?: string;
  bgColor?: string;
  btnType?: "solid" | "clear" | "outline";
}) => {
  return (
    <Spacer>
      <Button
        title={title}
        onPress={onPress}
        type={btnType}
        titleStyle={{
          fontSize: 16,
          fontWeight: "bold",
          color: titleColor,
        }}
        buttonStyle={{
          backgroundColor: bgColor,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: bgColor,
          //   paddingVertical: 10,
          //   paddingHorizontal: 20,
        }}
      />
    </Spacer>
  );
};

export default NavButton;
