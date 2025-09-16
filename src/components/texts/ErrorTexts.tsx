import React from "react";

import { StyleSheet, View, ViewStyle } from "react-native";
import Text from ".";

const ErrorTexts: React.FC<{ style?: ViewStyle; message: string }> = ({
  style,
  message,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.textColor}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  textColor: {
    marginTop: 0,
    color: "#CC0000",
    fontSize: 12,
  },
});

export default ErrorTexts;
