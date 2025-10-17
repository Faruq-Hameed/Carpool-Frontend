import "react-native-gesture-handler"; // This MUST be at the very top
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { View, Text, ActivityIndicator } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./src/contexts/AuthContext";
import RootStackNavigator from "./src/navigation/RootNavigator";
import { ResetPasscodeProvider } from "@/contexts/ResetPasscodeContext";

// Initialize React Query Client
const queryClient = new QueryClient();

const theme = createTheme({
  lightColors: {
    primary: "#126415",
    secondary: "#777",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
  },
  darkColors: {
    primary: "#126415",
    secondary: "#777",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
  },
  components: {
    Text: {
      style: {
        fontFamily: "Poppins_400Regular",
        color: "#333333",
      },
      h1Style: {
        fontFamily: "Poppins_700Bold",
        fontSize: 32,
        fontWeight: "bold",
      },
      h2Style: {
        fontFamily: "Poppins_700Bold",
        fontSize: 28,
        fontWeight: "bold",
      },
      h3Style: {
        fontFamily: "Poppins_700Bold",
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
      },
      h4Style: {
        fontFamily: "Poppins_700Bold",
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "bold",
      },
    },
    Button: {
      titleStyle: {
        fontFamily: "Poppins_700Bold",
        fontWeight: "bold",
      },
      buttonStyle: {
        backgroundColor: "#126415",
        borderRadius: 8,
      },
    },
  },
});

// Loading component
const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    }}
  >
    <ActivityIndicator size="large" color="#126415" />
    <Text
      style={{
        marginTop: 16,
        fontSize: 16,
        color: "#666",
        fontFamily: "Poppins_400Regular",
      }}
    >
      Loading...
    </Text>
  </View>
);

// Root component for the app
export default function App(): React.ReactElement {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // Handle font loading error
  if (fontError) {
    console.error("Font loading error:", fontError);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading fonts</Text>
      </View>
    );
  }

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ResetPasscodeProvider>
            <NavigationContainer>
              <RootStackNavigator />
            </NavigationContainer>
          </ResetPasscodeProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
