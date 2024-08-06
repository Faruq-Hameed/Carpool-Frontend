import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const VerifyAccountScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    // Handle account verification
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your account</Text>
      <Text style={styles.subtitle}>Please enter the 4 digit code we sent to your phone via SMS.</Text>
      <TextInput
        style={styles.codeInput}
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
        maxLength={4}
      />
      <Button title="Verify my account" onPress={handleVerify} color="#4CAF50" />
      <Text style={styles.resendText}>Tap here to resend code in 50s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  codeInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 10,
  },
  resendText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4CAF50',
  },
});

export default VerifyAccountScreen;
