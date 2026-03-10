import React from "react";
// import Text from "../../components/Text";
import { StackScreenProps } from "@react-navigation/stack";
import { DashboardTabParamList } from "../../navigation/DashboardNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
type Props = BottomTabScreenProps<DashboardTabParamList, "Messages">;

const MessageScreen: React.FC<Props> = ({ navigation }) => {
  return <Text>Welcome to the Message!</Text>;
};

export default MessageScreen;
