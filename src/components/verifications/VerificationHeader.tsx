import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Header } from "@rneui/themed";
import { Icon } from "@rneui/base";

// //THE COMPONENT HAS VERTICAL ALIGNMENT ISSUES
/** The reusable header component for the verification screens  */

const VerificationHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Header
      centerComponent={{
        text: "Account Verification",
        style: styles.title,
      }}
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      }
      backgroundColor="#fff"
      
      statusBarProps={{ barStyle: "dark-content" }}
    containerStyle={styles.container}     
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderBlockColor: "red"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    width: 253,
    //  borderWidth: 2,
    // borderBlockColor: "red"
  },
});

export default VerificationHeader;