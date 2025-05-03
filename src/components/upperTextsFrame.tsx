
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
// import { width } from '../utils/constants/constants';

/**Reusable texts component frame with header and optional normal text */
const UpperTextsFrame: React.FC<{
  header: string;
  normalText?: string;
  viewWidth?: number; //though this is compulsory but don't want to affect existing code when addedborderBlockColor
}> = ({ header, normalText, viewWidth = 300 }) => {
  return (
    <View style={[{...styles.container, width: viewWidth}]}>
      <Text h4 h4Style={styles.header}>{header}</Text>
      {normalText && <Text style={styles.normalText}>{normalText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
    lineHeight:2,
    padding: 0,
  },
  header: {
    textAlign: "center",
    color: "#262626",
  },
  normalText: {
    textAlign: "center",
    color: "#333333",
  }

});

export default UpperTextsFrame;