import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
    </View>
  );
};

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
  },
});

export default LogoScreen;
