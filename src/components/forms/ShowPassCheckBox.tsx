import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type CheckBoxProps = {
  checked: boolean;
  onPress: () => void;
};

const ShowPassCheckBox: React.FC<CheckBoxProps> = ({ checked, onPress }) => {
  const isChecked = !checked;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
      <View style={[styles.box, isChecked && styles.boxChecked]}>
        {isChecked && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={styles.label}>Show passcode</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#404040",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  boxChecked: {
    borderColor: "#126415",
    backgroundColor: "#126415",
  },
  checkMark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "400",
    fontSize: 14,
    color: "#333333",
    marginLeft: 4,
  },
});

export default ShowPassCheckBox;
