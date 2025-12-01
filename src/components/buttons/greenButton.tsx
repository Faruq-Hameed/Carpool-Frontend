//green button component for navigation
import React, { useState } from "react";
import { Button, Text } from "@rneui/themed";

import { Dimensions, StyleSheet, View } from "react-native";
import Spacer from "../others/Spacer";
import { getResponsiveWidth } from "../../helpers/getScreenDimension";
import { AppIcon } from "../others/AppIcon";
import { IconName } from "@/helpers/icons";

/**Reusable button nav component */
const GreenNavButton = ({
  title,
  onPress, //call a function when the button is pressed
  titleColor = "#FFFFFF", //default title color is white
  bgColor = "#126415", //default button color is #126415
  btnType = "solid", //default button type is solid
  disabled = false, //default button is not disabled
  borderColor, //button border color
  width,
  iconRight = false,
  iconName, // from the icons list
  loading = false,
}: {
  title: string;
  onPress: (e?: any) => void;
  titleColor?: string;
  bgColor?: string;
  btnType?: "solid" | "clear" | "outline";
  disabled?: boolean;
  borderColor?: string;
  width?: number;
  iconRight?: boolean;
  iconName?: IconName;
  loading?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Spacer>
      <Button
        title={title}
        disabled={disabled}
        onPress={(e) => {
          setIsLoading(true);
          onPress(e);
        }}
        type={btnType}
        icon={
          iconName ? (
            <AppIcon
              name={iconName}
              size={24}
              // Optional: wrap in a View for spacing
              // style={{
              //   marginLeft: iconRight ? 8 : 0,
              //   marginRight: iconRight ? 0 : 8,
              // }}
            />
          ) : undefined
        }
        loading={loading}
        iconRight={iconRight}
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
          width: getResponsiveWidth(width ?? 0.9),
        }}
      />
    </Spacer>
  );
};

export default GreenNavButton;
