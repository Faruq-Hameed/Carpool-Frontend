import "react-native-gesture-handler"; // This MUST be at the very top
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import * as SplashScreen from "expo-splash-screen";

import AuthProvider from "./src/contexts/AuthContext";
import RootStackNavigator from "./src/navigation/RootNavigator";
import { ResetPasscodeProvider } from "@/contexts/ResetPasscodeContext";
import { configureForegroundNotifications } from "@/utils/registerPushToken";

// SplashScreen.preventAutoHideAsync();
// Initialize React Query Client
const queryClient = new QueryClient();

// Configure how notifications appear while the app is open (must run at module level)
configureForegroundNotifications();

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
      <AuthProvider>
        <ResetPasscodeProvider>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </ResetPasscodeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
