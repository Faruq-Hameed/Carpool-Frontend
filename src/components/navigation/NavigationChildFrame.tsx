import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppIcon } from "../others/AppIcon";
import { IconName } from "@/helpers/icons";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import Text from "../texts";

interface NavigationChildFrameProps {
  title: string;
  onPress: () => void;
  leftIcon?: IconName;
  rightIcon?: IconName;
  textsStyle?: React.CSSProperties;
  lowerText?: string;
  // children: React.ReactNode;
}

/** 

/**Light background color frame. It is used as in profile that leads to various screens.*/
const NavigationChildFrame: React.FC<NavigationChildFrameProps> = ({
  title,
  onPress,
  leftIcon,
  rightIcon = "arrowRight",
  textsStyle: StyleProp,
  lowerText,
  // children
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        {leftIcon && <AppIcon name={leftIcon} />}
        <View style={styles.textContainer}>
          <Text>{title}</Text>
          {lowerText && <Text style={{ fontSize: 14 }}>{lowerText}</Text>}
        </View>
      </View>
      <AppIcon name={rightIcon} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#F0F6EE",
    marginBottom: 5,
    width: "100%",
    alignItems: "center",
    padding: 10,
    minHeight: 65,
    overflow: "scroll",
    borderRadius: 4,
  },
  leftContainer: {
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    rowGap: 5,
  },
});

export default NavigationChildFrame;
