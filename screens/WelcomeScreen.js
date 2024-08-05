import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Display welcome image */}
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.image}
      />
      {/* Display title */}
      <Text style={styles.title}>Ride Together, Thrive Together</Text>
      {/* Display subtitle */}
      <Text style={styles.subtitle}>
        Carpool to save money, meet new faces, and reduce traffic and carbon
        footprint.
      </Text>
      {/* Button to navigate to SignUp screen */}
      <View style={styles.button}>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate("SignUp")}
        color="#fff"
      />
      </View>
    </View>
  );
};


// Styles for the welcome screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#6c757d",
  },

  button: {
    width: '100%',
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10
  },
});

export default WelcomeScreen;
