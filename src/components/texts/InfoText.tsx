import React from "react";
import { StyleSheet, View } from "react-native";
import { AppIcon } from "../AppIcon";
import { IconName } from "@/helpers/icons";
import Text from "../texts/Text";

interface InfoTextFrameProps {
  title: string;
  leftIcon: IconName;
  // children: React.ReactNode;
}

/** 

/**A frame with texts and icon in left.*/
const InfoTextFrame: React.FC<InfoTextFrameProps> = ({ title, leftIcon }) => {
  return (
    <View style={styles.container}>
      <AppIcon name={leftIcon} />
      <Text style={styles.title}>{title}</Text>
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
  }
});

export default InfoTextFrame;
