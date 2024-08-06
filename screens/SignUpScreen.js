import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { Label } from "../components/label";

const SignUpScreen = ({ navigation }) => {
  // State variables for input fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Handle sign up button press
  const handleSignUp = async () => {

    // API endpoint for sign up
    const apiUrl = 'https://ffd4-105-119-1-165.ngrok-free.app/api/users/';

    // Request body for the API call
    const requestBody = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phonenumber: phoneNumber,
    };

    try {
      // Make a POST request to the sign-up API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Parse the JSON response
      const result = await response.json();

      // Check if the response is successful
      if (response.ok) {
        // If successful, navigate to the next screen or show a success message
        Alert.alert('Success', 'You have signed up successfully');
        // You can navigate to the login screen or any other screen
        // navigation.navigate('Login');
      } else {
        // If there was an error, display an error message
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      // Handle any network or unexpected errors
      Alert.alert('Error', 'Failed to connect to the server');
  };

    // console.log("Sign Up", { phoneNumber, email, firstName, lastName });
    // Navigate to next screen if necessary
  };

  // const handleSignUp = () => {
  //   // Sample API call
  //   axios.post('http://<your_ngrok_url>/api/users/', {
  //     firstname,
  //     lastname,
  //     email,
  //     phonenumber,
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     navigation.navigate('Login');
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // };

  return (
    <View style={styles.container}>
      {/* Display title */}
      <Text style={styles.title}>Create your account</Text>
      {/* Link to login screen */}
      <Text>
        Have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
      {/* Input fields */}
      <View style={[styles.inputContainer, {marginTop: 70}]}>
        <Text> Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text> Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text> First name</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text> Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        {/* Sign up button */}
        <View style={styles.button}>
          <Button title="Sign up" onPress={handleSignUp} color="#fff" />
        </View>
      </View>
    </View>
  );
};

// Styles for the sign-up screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    color: "#4CAF50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "column",
    height: 70,
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
  },
});

export default SignUpScreen;
