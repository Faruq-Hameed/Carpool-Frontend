import React from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity, Text } from "react-native";
import { MainTabParamList } from "../../navigation/MainNavigator";
import { StackScreenProps } from "@react-navigation/stack";


// const LoginScreen: React.FC<Props> = ({ navigation }) => {
type Props = StackScreenProps<MainTabParamList, "DashBoard">;

const DashBoardScreen: React.FC<Props> = ({navigation}) => {
  return <View>Welcome to the Dashboard!</View>;
};

export default DashBoardScreen;