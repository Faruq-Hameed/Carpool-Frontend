import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppIcon } from "../AppIcon";
import { IconName } from "@/helpers/icons";
import { getResponsiveWidth } from "@/helpers/getScreenDimension";
import Text from "../Text";

interface NavigationChildFrameProps {
  title: string;
  onPress: () => void;
  leftIcon: IconName;
  rightIcon?: IconName;
  textsStyle?: React.CSSProperties;
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
  // children
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <AppIcon name={leftIcon} />
        <Text>{title}</Text>
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
    // borderWidth: 2,
    // width: getResponsiveWidth(0.9),
    width: "100%",
    alignItems: "center",
    padding: 10,
    height: 65,
    borderRadius: 4,
  },
  leftContainer: {
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default NavigationChildFrame;
