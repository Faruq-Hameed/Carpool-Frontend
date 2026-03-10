import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../texts";

interface VerifiedLabelProps {
  label: string;
}
/**A label with verified icon */
const VerifiedLabel: React.FC<VerifiedLabelProps> = ({ label }) => {
  return (
    <View style={styles.labelTextContainer}>
      <Text>{label}</Text>
      <MaterialCommunityIcons
        name="check-decagram"
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
