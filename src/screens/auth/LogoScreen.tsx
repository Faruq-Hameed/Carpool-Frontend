import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<AuthStackParamList, "MainScreen">;
const LogoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default LogoScreen;
