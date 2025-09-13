import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/texts/Text";
import NavButton from "@/components/buttons/GreenButton";
import Spacer from "@/components/Spacer";
import SmallSpacer from "@/components/SmallSpacer";
import LowerActionButtons from "../../screens/dashboard/profile/components/LowerActionButtons";

interface PseudoModalScreenProp {
  headerText: string;
  description: string;
  upperBtnTitle: string;
  lowerBtnTitle: string;
  onUpperBtnPress: () => void;
  onLowerBtnPress: () => void;
  lowerBtnColour?: string;
}
/**Reusable modal container. Full modal that appears like a screen*/
const PseudoModalScreen: React.FC<PseudoModalScreenProp> = ({
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

export default PseudoModalScreen;
