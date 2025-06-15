
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
// import { width } from '../utils/constants/constants';

/**Reusable PersonalInfoHeader component frame with header and normal text */
const PersonalInfoHeader: React.FC= () => {
  return (
    <View style={[{...styles.container}]}>
      <Text h4 h4Style={styles.header}>Personal Information</Text>
      <Text style={styles.normalText}>Only your name will be visible to other users</Text>
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

export default PersonalInfoHeader;