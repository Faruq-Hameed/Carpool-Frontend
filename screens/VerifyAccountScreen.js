import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
const VerifyAccountScreen = ({ navigation }) => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");

  const handleVerify = () => {
    // Handle account verification
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your account</Text>
      <Text style={styles.subtitle}>
        Please enter the 4 digit code we sent to 08012345789 via SMS.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.codeInput}
          keyboardType="numeric"
          value={code1}
          onChangeText={setCode1}
          maxLength={1}
        />
        <TextInput
          style={styles.codeInput}
          keyboardType="numeric"
          value={code2}
          onChangeText={setCode2}
          maxLength={1}
        />
        <TextInput
          style={styles.codeInput}
          keyboardType="numeric"
          value={code3}
          onChangeText={setCode3}
          maxLength={1}
        />
        <TextInput
          style={styles.codeInput}
          keyboardType="numeric"
          value={code4}
          onChangeText={setCode4}
          maxLength={1}
        />
      </View>

      <View style={styles.button}>
        <Button title="Verify my account" onPress={handleVerify} color="#fff" />
      </View>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("ResetAccount")}
      >
        Tap here to resend code in 50s
      </Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 60,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  codeInput: {
    height: 60,
    width: 60,
    margin: 4,
    textAlign: "center",
    fontSize: 20,
    borderColor: "#74A676",
    borderWidth: 1,
    borderRadius: 10,
  },
  resendText: {
    textAlign: "center",
    marginTop: 20,
    color: "#4CAF50",
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
  },
  link: {
    // display: "flex",
    color: "#4CAF50",
    marginTop: 20,
    alignSelf: "center",
  },
});

export default VerifyAccountScreen;
