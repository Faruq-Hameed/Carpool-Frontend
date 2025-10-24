import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon } from "@rneui/themed";
import Text from "../texts";

interface VerifiedLabelProps {
  label: string;
}
/**A label with verified icon */
const VerifiedLabel: React.FC<VerifiedLabelProps> = ({ label }) => {
  return (
    <View style={styles.labelTextContainer}>
      <Text>{label}</Text>
      <Icon
        name="check-decagram"
        type="material-community"
        color="#126415"
        size={24}
        style={styles.verifyIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  labelTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  verifyIcon: {
    marginLeft: 5,
  },
});

export default VerifiedLabel;
