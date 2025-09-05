import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/Text";
import NavButton from "@/components/greenButton";
import Spacer from "@/components/Spacer";
import SmallSpacer from "@/components/SmallSpacer";
import LowerActionButtons from "./LowerActionButtons";

interface ModalContentProp {
  headerText: string;
  description: string;
  upperBtnTitle: string;
  lowerBtnTitle: string;
  onUpperBtnPress: () => void;
  onLowerBtnPress: () => void;
  lowerBtnColour?: string;
}
/**Reusable modal container  used during account delete and signout*/
const ModalContent: React.FC<ModalContentProp> = ({
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
      {/* <View>
        <NavButton
          title={upperBtnTitle}
          width={0.85}
          onPress={onUpperBtnPress}
        />
        <NavButton
          title={lowerBtnTitle}
          width={0.85}
          onPress={onLowerBtnPress}
          btnType="clear"
          bgColor="#FFFFFF"
          titleColor={lowerBtnColour ?? "#126415"}
          borderColor={lowerBtnColour}
        />
      </View> */}
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

export default ModalContent;
