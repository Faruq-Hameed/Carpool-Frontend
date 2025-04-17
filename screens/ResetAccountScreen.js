import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
} from "react-native";

const RecoverAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleRecover = () => {
    // Handle account recovery
    navigation.navigate("VerifyAccount");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recover your account</Text>
      <Text style={styles.subtitle}>
        Please enter the email linked to your account.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.subtitle, styles.label]}> Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.button}>
          {/* This is the real callback  */}
          <Button
            title="Login"
            onPress={handleRecover}
            color="#fff"
            onSubmitEditing={Keyboard.dismiss} // Dismiss keyboard on submit
            returnKeyType="done" // Show "Done" button on keyboard
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  label: {
    marginTop: 50,
    marginBottom: 5,
  },

  input: {
    marginBottom: 40,
    borderRadius: 5,
    height: 60,
    width: "100%",
    borderColor: "#ced4da",
    borderWidth: 1,

    // borderLeftColor: "#ced4da",
    // paddingLeft: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
  },
});

export default RecoverAccountScreen;
