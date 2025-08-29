import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Header } from "@rneui/themed";
import { Icon } from "@rneui/base";

type NavigationHeaderProps = {
  title: string;
  goBack?: boolean; // Optional prop to control back navigation incase of screens without back button
};

/** The reusable header component for  screens  */
const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  goBack = true,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {goBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Icon name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
      ) : null}
      <Text h3 style={styles.title}>
        {title}
      </Text>
      {/* Empty view to balance the layout */}
      <View style={styles.iconPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    width: 343,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    alignSelf: "center",
    marginBottom: 5,
  },

  iconContainer: {
    justifyContent: "center",
  },
  title: {
    flex: 1, // Takes remaining space and centers content
    textAlign: "center",
    color: "#262626",
    alignSelf: "center",
  },
  iconPlaceholder: {
    width: 30, // Same width as iconContainer to maintain balance
  },
});

export default NavigationHeader;
