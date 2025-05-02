
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
// import { width } from '../utils/constants/constants';

/**Reusable texts component frame with header and optional normal text */
const UpperTextsFrame: React.FC<{
  header: string;
  normalText?: string;
  viewWidth?: number; //though this is compulsory but don't want to affect existing code when addedborderBlockColor
}> = ({ header, normalText, viewWidth = 285 }) => {
  return (
    <View style={[{...styles.container, width: viewWidth}]}>
      <Text h4 h4Style={styles.header}>{header}</Text>
      {normalText && <Text style={styles.normalText}>{normalText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderWidth: 2,
    margin: "auto",
    lineHeight:2,
  },
  header: {
    textAlign: "center"
  },
  normalText: {
    textAlign: "center"
  }

});

export default UpperTextsFrame;