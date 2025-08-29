import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { getResponsiveWidth } from "../helpers/getScreenDimension";
// import { width } from '../utils/constants/constants';

/**Reusable texts component frame with header and optional normal text */
const UpperTextsFrame: React.FC<{
  header: string;
  normalText?: string;
  viewWidth?: number; //though this is compulsory but don't want to affect existing code when addedborderBlockColor
  goBack?: boolean; // Optional prop to control back navigation incase of screens without back button
}> = ({ header, normalText, viewWidth = 300, goBack = true }) => {
  const navigation = useNavigation();

  return (
    <View style={[{ ...styles.container, width: viewWidth }]}>
      <View style={styles.headerContainer}>
        {goBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}
          >
            <Icon name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>
        ) : null}
        <Text h3 style={styles.header}>
          {header}
        </Text>
        {/* Empty view to balance the layout */}
        <View style={styles.iconPlaceholder} />
      </View>

      {/* <Text h3 h4Style={styles.header}>
       
      </Text> */}
      {normalText && <Text style={styles.normalText}>{normalText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    lineHeight: 2,
    padding: 0,
    alignSelf: "center",

    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    width: getResponsiveWidth(),
    left: -30,
    paddingVertical: 12,
    paddingLeft: 5,
    alignItems: "center",
  },
  iconContainer: {
    borderBlockColor: "red",
    width: 30, // Fixed width for consistent spacing
  },
  header: {
    flex: 1, // Takes remaining space and centers content
    textAlign: "center",
    color: "#262626",
  },
  iconPlaceholder: {
    width: 30, // Same width as iconContainer to maintain balance
  },
  normalText: {
    textAlign: "center",
    color: "#333333",
  },
});

export default UpperTextsFrame;
