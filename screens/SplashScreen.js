import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Navigate to the Welcome screen after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Display logo image */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      {/* Display logo text */}
      <Text style={styles.text}>Logo</Text>
    </View>
  );
};

// Styles for the splash screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
