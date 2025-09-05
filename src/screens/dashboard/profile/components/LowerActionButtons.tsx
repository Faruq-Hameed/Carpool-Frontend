import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/Text";
import NavButton from "@/components/greenButton";
import Spacer from "@/components/Spacer";
import SmallSpacer from "@/components/SmallSpacer";

interface ActionsButtonsProps {
  upperBtnTitle: string;
  lowerBtnTitle: string;
  onUpperBtnPress: () => void;
  onLowerBtnPress: () => void;
  lowerBtnColour?: string;
  width?: number;
}
/**Reusable action buttons for nav  used during account delete and signout*/
const LowerActionButtons: React.FC<ActionsButtonsProps> = ({
  upperBtnTitle,
  lowerBtnTitle,
  onUpperBtnPress,
  onLowerBtnPress,
  lowerBtnColour,
  width = 0.85, //This was the value before I make this dynamic
}) => {
  return (
    <View>
      <NavButton
        title={upperBtnTitle}
        width={width}
        onPress={onUpperBtnPress}
      />
      <NavButton
        title={lowerBtnTitle}
        width={width}
        onPress={onLowerBtnPress}
        btnType="clear"
        bgColor="#FFFFFF"
        titleColor={lowerBtnColour ?? "#126415"}
        borderColor={lowerBtnColour}
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
  // frame: {
  //   borderRadius: 5,
  //   backgroundColor: "#FFFFFF",
  //   borderWidth: 2,
  // },
});

export default LowerActionButtons;
