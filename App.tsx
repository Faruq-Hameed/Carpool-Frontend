import 'react-native-gesture-handler'; // This MUST be at the very top
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import AuthNavigator from "./src/navigation/AuthNavigator";
import RootStackNavigator from './AppNavigator';
import MainNavigator from './src/navigation/MainNavigator';

const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: "Poppins_400Regular",
      },
      h1Style: {
        fontFamily: "Poppins_700Bold",
      },
      h2Style: {
        fontFamily: "Poppins_700Bold",
      },
      h3Style: {
        fontFamily: "Poppins_700Bold",
      },
      h4Style: {
        fontFamily: "Poppins_700Bold",
      },
    },
    Button: {
      titleStyle: {
        fontFamily: "Poppins_700Bold",
      },
    },
  },
});
// Root component for the app
// This component wraps the entire app and manages navigation state
export default function App(): React.ReactElement {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return <></>; //this should return loading state
  return (
    //  the navigation container to manage navigation state
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        {/* <MainNavigator /> */}
        <RootStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
