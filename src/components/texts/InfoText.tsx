import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { AppIcon } from "../AppIcon";
import { IconName } from "@/helpers/icons";
import Text from ".";

interface InfoTextFrameProps {
  title: string;
  leftIcon: IconName;
  // children: React.ReactNode;
  rightComponent?: React.ReactNode;
  containerStyles?: ViewStyle; //styles type
  titleStyles?: ViewStyle; //styles type
}

/** 

/**A frame with texts and icon in left.*/
const InfoTextFrame: React.FC<InfoTextFrameProps> = ({
  title,
  leftIcon,
  rightComponent,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <AppIcon name={leftIcon} />
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      {rightComponent && rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F0F6EE",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    columnGap: 10,
    borderRadius: 4,
  },
  title: {
    textAlign: "left",
    lineHeight: 25,
    rowGap: 25,
    fontSize: 14,
  },
});

export default InfoTextFrame;
