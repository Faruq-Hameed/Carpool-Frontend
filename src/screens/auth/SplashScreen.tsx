import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "@rneui/base";
import { useAuthNavigation } from "@/hooks/useTypedNavigation";
import { ScreenProps } from "@/types/navigation";

//
/** a screen that shows when your app first loads */
const SplashScreen: React.FC<ScreenProps<"Splash">> = () => {
  const navigation = useAuthNavigation<"Splash">(); //this is the current screen in the stack
  // Navigate to the Welcome screen after 2 seconds
  useEffect(() => {
    // This effect runs when the component mounts. It simulate a loading time of 2 seconds before navigating to the Welcome screen
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Display logo image */}
      <Image
        source={require("../../../assets/images/logo.png")} // Path to  logo image
        style={styles.logo}
      />
      {/* Display logo text */}
      <Text h2 style={styles.text}>
        Share
      </Text>
    </View>
  );
};

// Styles for the splash screen
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
    marginBottom: 20,
  },
  text: {
    fontFamily: "Poppins",
  },
});

export default SplashScreen;
