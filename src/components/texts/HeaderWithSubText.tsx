import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { AppIcon } from "../others/AppIcon";
import { IconName } from "@/helpers/icons";
import Text from ".";

interface HeaderWithSubTextProps {
  title: string;
  containerStyles?: ViewStyle; //styles type
  titleStyles?: ViewStyle; //styles type
  subText?: string;
  subTextStyles?: ViewStyle;
}

/** 

/**A frame with Header text and sub text.*/
const HeaderWithSubText: React.FC<HeaderWithSubTextProps> = ({
  title,
  containerStyles,
  titleStyles,
  subText,
  subTextStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]} h4>
        {title}
      </Text>
      {subText && <Text style={[subTextStyles]}>{subText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    alignSelf: "flex-start", //this was how i aligned it to the right
  },
});

export default HeaderWithSubText;
