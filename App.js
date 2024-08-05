import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

// Root component for the app
export default function App() {
  return (
    // Wrap the navigation container to manage navigation state
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
