import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/Text";
import NavButton from "@/components/greenButton";
import Spacer from "@/components/Spacer";
import SmallSpacer from "@/components/SmallSpacer";
import LowerActionButtons from "./LowerActionButtons";

interface SettingModalContentProp {
  headerText: string;
  description: string;
  upperBtnTitle: string;
  lowerBtnTitle: string;
  onUpperBtnPress: () => void;
  onLowerBtnPress: () => void;
  lowerBtnColour?: string;
}
/**Reusable modal container  used during account delete and signout*/
const SettingModalContent: React.FC<SettingModalContentProp> = ({
  headerText,
  description,
  upperBtnTitle,
  lowerBtnTitle,
  onUpperBtnPress,
  onLowerBtnPress,
  lowerBtnColour,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text h4>{headerText}</Text>
        <SmallSpacer />
        <Text>{description}</Text>
      </View>
      <Spacer />
      <LowerActionButtons
        upperBtnTitle={upperBtnTitle}
        onUpperBtnPress={onUpperBtnPress}
        lowerBtnColour={lowerBtnColour}
        lowerBtnTitle={lowerBtnTitle}
        onLowerBtnPress={onLowerBtnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "98%",
    alignItems: "center",
  },
});

export default SettingModalContent;
