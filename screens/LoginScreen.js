import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log({ hello: "hello" });
  const handleLogin = async () => {
    const apiUrl = "https://1912-105-119-1-37.ngrok-free.app/api/users/otp/";

    try {
      const response = await axios.post(apiUrl, {
        phonenumber: phoneNumber,
      });
      Alert.alert("Success", response.data.message);
      // Navigate to Verify Account screen
      // navigation.navigate("VerifyAccount");
    } catch (error) {
      // Handle any network or unexpected errors
      error.response
        ? Alert.alert("Error", error.response.data.message)
        : error.message;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Don't have an account?{" "}
        <Text onPress={() => navigation.navigate("SignUp")} style={styles.link}>
          Register
        </Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberCode}
          placeholder="+234"
          keyboardType="phone-pad"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.button}>
        {/* This is the real callback  */}
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <Button
          title="Login"
          onPress={() => navigation.navigate("VerifyAccount")}
        />
      </View>
    </View>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    // alignItems: "center",
    padding: 20,
    paddingVertical: 100,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    borderStyle: "solid",
  },
  link: {
    color: "#4CAF50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 50,
  },
  numberCode: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
    borderLeftWidth: 1,
    height: "100%",
    borderLeftColor: "#ced4da",
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
  },
});
export default LoginScreen;
