import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";

// Root component for the app
// This component wraps the entire app and manages navigation state
export default function App(): React.ReactElement {
  return (
    //  the navigation container to manage navigation state
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
