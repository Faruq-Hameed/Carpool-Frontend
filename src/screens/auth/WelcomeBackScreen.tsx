import React from "react";
import { View, StyleSheet, Image, Button, Dimensions } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../../types/navigation";
import { useTypedNavigation } from "../../hooks/useTypedNavigation";
import NavButton from "../../components/greenButton";
import { Text } from "@rneui/base";
import { width } from "../../utils/constants/constants";

/** Welcome Back screen is the first screen that the user sees when they open the app
It displays a welcome message and a button to navigate to the SignUp screen */
const WelcomeScreen: React.FC<ScreenProps<"Welcome">> = () => {
  const navigation = useTypedNavigation<"Welcome">();
  return <SafeAreaView></SafeAreaView>;
};

// Styles for the welcome screen
const styles = StyleSheet.create({});

export default WelcomeScreen;
