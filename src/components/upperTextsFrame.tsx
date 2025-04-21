
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

/**Reusable texts component frame with header and optional normal text */
const UpperTextsFrame: React.FC<{
  header: string;
  normalText?: string;
}> = ({ header, normalText }) => {
  return (
    <View>
      <Text h1>{header}</Text>
      {normalText && <Text>{normalText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default UpperTextsFrame;