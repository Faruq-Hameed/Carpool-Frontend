import React from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";


// const LoginScreen: React.FC<Props> = ({ navigation }) => {
// type Props = StackScreenProps<MainTabParamList, "DashBoard">;

const EnterNINScreen: React.FC= () => {
   return (
     <SafeAreaView>
       <Text>Welcome to the EnterNINScreen!</Text>
     </SafeAreaView>
   );
};

export default EnterNINScreen;