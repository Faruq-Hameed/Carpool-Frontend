import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// Root component for the app
// This component wraps the entire app and manages navigation state
export default function App(): React.ReactElement {
  return (
    // Wrap the navigation container to manage navigation state
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}