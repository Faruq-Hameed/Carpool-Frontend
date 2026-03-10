import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NavigationHeaderProps = {
  title: string;
  goBack?: boolean; // Optional prop to control back navigation in case of screens without back button
  // onGoBack?:()=>void; //go to other screen if we route from nested stack to here which go back cannot work
};

/** The reusable header component for  screens  */
const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  goBack = true,
  // onGoBack
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {goBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : null}
        {/* {onGoBack ? (
        <TouchableOpacity
          onPress={onGoBack}
          style={styles.iconContainer}
        >
        </TouchableOpacity>
      ) : null} */}
      <Text style={[styles.title, { fontSize: 22, fontWeight: "700" }]}>
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
    // borderWidth: 1,
    // borderColor: "red",
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
